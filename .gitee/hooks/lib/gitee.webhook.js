/**
 * @author 史莱姆 <https://github.com/shi-lai-mu>
 * @version v1.0.0
 * @description 码云 自动化部署 多项目方案
 */


 const http = require('http')
 const createHandler = require('gitee-webhook-handler')
 const nodemailer = require('nodemailer')
 const tasking = {}
 const tail = {}
 
 
 /**
  * ==================
  *     主  配  置
  * ==================
  */
 let configs = {
   // 方法path
   handlerPath: '/active/gitee/webhook',
   // 方法秘钥 对应码云
   handlerSecret: 'test123456789',
   // 启动端口
   listen: 7000,
   // 邮件配置
   transport: {
     host: 'smtp.163.com',
     port: 25,
     // secure: true,
     auth: {
       user: 'xxxxxx@163.com',
       pass: 'xxxxxxxxxxxxxx',
     },
   },
   // 多工程配置
   // 示例
   //    - 当用户 "478889187@qq.com" 提交 "feat: xxxx" commit
   //      到 "git://gitee.com/shi_lai_mu/slmblog_nestjs-backend.git" 的 master 分支时 执行名为 "测试作业" 的作业
   //      "测试作业" 作业执行的脚本为 ./test.sh
   projects: [
     {
       git:     'git://gitee.com/shi_lai_mu/slmblog_nestjs-backend.git', // git地址
       senders: [ '478889187@qq.com' ],                                  // 允许触发部署事件的提交者邮箱
       name:    '测试作业',                                               // * 作业名
       ref:     'refs/heads/master',                                     // * 提交分支名 产生事件用
       cmdPath: './test.sh',                                             // * 脚本位置
     },
   ]
 }
 
 // 尝试配置化管理
 try {
   const configJson = require('../webhook.json')
   if (configJson) configs = configJson
 } catch(err) {}
 
 console.log(`gitee webhook start in 0.0.0.0:${configs.listen}${configs.handlerPath}...`)
 
 /** 
  * 获取项目配置
  * @param gitUrl GitURL
  */
 function getProjectConfig(gitUrl) {
   const findIndex = configs.projects.findIndex(project => {
     return project.git === gitUrl
   })
   return ~findIndex ? configs.projects[findIndex] : false
 }
 
 
 var handler = createHandler({ path: configs.handlerPath, secret: configs.handlerSecret })
 
 function run_cmd(cmd, args, callback) {
   var spawn = require('child_process').spawn
   var child = spawn(cmd, args)
   var resp = ""
   child.stdout.on('data', function(buffer) { resp += buffer.toString() })
   child.stdout.on('end', function() { callback (resp) })
 }
 
 handler.on('error', function (err) {
   console.error('Error:', err.message)
 })
 
 handler.on('Push Hook', pushHook)
 
 function pushHook(event) {
   const { repository, ref, sender, project, head_commit } = event.payload
   console.log('Received a push event for %s to %s', repository.name, ref)
     const config = getProjectConfig(repository.git_url)
     if (config && ref === config.ref) {
       console.log(repository);
       // 当前有任务正在进行 且 重复添加任务则对队尾进行处理
       if (tasking[repository.git_url]) {
         tail[repository.git_url] = event
         return
       }
       tasking[repository.git_url] = true
       run_cmd('sh', [config.cmdPath],
       (text) => {
         console.log({ repository, text })
         const email = nodemailer.createTransport(configs.transport)
 
         // 如果存在队尾 则执行队尾 并 清空
         tasking[repository.git_url] = false
         if (tail[repository.git_url]) {
           pushHook(tail[repository.git_url])
           tail[repository.git_url] = false
         }
 
         email.sendMail({
           to: [sender.email],
           subject: `[部署通知] ${project.name}`,
           from: configs.transport.auth.user,
           html: `您于 ${head_commit.timestamp} 的 [${head_commit.message}] 提交已部署至服务器<br>
           commit url：${head_commit.url}
           
           <br><br>
 
           modified: <br>
           <code>
             ${JSON.stringify([
               ...head_commit.removed,
               ...head_commit.added,
               ...head_commit.modified,
             ]).replace(/\n/g, '<br>')}
           </code>
           
           <br><br><br>
 
           部署日志:<br>
           <code>
           ${text.replace(/\n/g, '<br>')}
           </code>
           `
         }, (err) => {
           console.log(err || `send email to ${sender.email}`)
         })
       })
     }
 }
 
 try {
   http.createServer(function (req, res) {
     handler(req, res, function (err) {
       res.statusCode = 404
       res.end('no such location')
     })
   }).listen(configs.listen)
 } catch(err) {
   console.error('Error:', err.message)
 }
 
 // 消息示例
 // {
 //   event: 'Push Hook',
 //   payload: {
 //     ref: 'refs/heads/master',
 //     before: '57fe0999ee2ef1f28947604407c543b01cd3bf61',
 //     after: 'd723edbaa73703f99d11a44954451f1055a2329b',
 //     total_commits_count: 2,
 //     commits_more_than_ten: false,
 //     created: false,
 //     deleted: false,
 //     compare: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend/compare/57fe0999ee2ef1f28947604407c543b01cd3bf61...d723edbaa73703f99d11a44954451f1055a2329b',
 //     commits: [ [Object], [Object] ],
 //     head_commit: {
 //       id: 'ea386716422020c3bc6a9357dab237b7aedfca54',
 //       tree_id: '8b7b74444699cf5e4f09dec99df13d9ddfcb1d13',
 //       parent_ids: [Array],
 //       message: 'feat: 优化Redis封装\n',
 //       timestamp: '2021-04-18T22:45:58+08:00',
 //       url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend/commit/ea386716422020c3bc6a9357dab237b7aedfca54',
 //       author: [Object],
 //       committer: [Object],
 //       distinct: true,
 //       added: [],
 //       removed: [],
 //       modified: [Array]
 //     },
 //     repository: {
 //       id: 15649024,
 //       name: '史莱姆博客 NestJs后端',
 //       path: 'slmblog_nestjs-backend',
 //       full_name: 'shi_lai_mu/slmblog_nestjs-backend',
 //       owner: [Object],
 //       private: false,
 //       html_url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend',
 //       url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend',
 //       description: '',
 //       fork: false,
 //       created_at: '2021-04-30T23:47:37+08:00',
 //       updated_at: '2021-05-01T00:31:41+08:00',
 //       pushed_at: '2021-05-01T00:31:41+08:00',
 //       git_url: 'git://gitee.com/shi_lai_mu/slmblog_nestjs-backend.git',
 //       ssh_url: 'git@gitee.com:shi_lai_mu/slmblog_nestjs-backend.git',
 //       clone_url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend.git',
 //       svn_url: 'svn://gitee.com/shi_lai_mu/slmblog_nestjs-backend',
 //       git_http_url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend.git',
 //       git_ssh_url: 'git@gitee.com:shi_lai_mu/slmblog_nestjs-backend.git',
 //       git_svn_url: 'svn://gitee.com/shi_lai_mu/slmblog_nestjs-backend',
 //       homepage: null,
 //       stargazers_count: 0,
 //       watchers_count: 1,
 //       forks_count: 0,
 //       language: null,
 //       has_issues: true,
 //       has_wiki: true,
 //       has_pages: false,
 //       license: 'ISC',
 //       open_issues_count: 0,
 //       default_branch: 'master',
 //       namespace: 'shi_lai_mu',
 //       name_with_namespace: '史莱姆/史莱姆博客 NestJs后端',
 //       path_with_namespace: 'shi_lai_mu/slmblog_nestjs-backend'
 //     },
 //     project: {
 //       id: 15649024,
 //       name: '史莱姆博客 NestJs后端',
 //       path: 'slmblog_nestjs-backend',
 //       full_name: 'shi_lai_mu/slmblog_nestjs-backend',
 //       owner: [Object],
 //       private: false,
 //       html_url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend',
 //       url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend',
 //       description: '',
 //       fork: false,
 //       created_at: '2021-04-30T23:47:37+08:00',
 //       updated_at: '2021-05-01T00:31:41+08:00',
 //       pushed_at: '2021-05-01T00:31:41+08:00',
 //       git_url: 'git://gitee.com/shi_lai_mu/slmblog_nestjs-backend.git',
 //       ssh_url: 'git@gitee.com:shi_lai_mu/slmblog_nestjs-backend.git',
 //       clone_url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend.git',
 //       svn_url: 'svn://gitee.com/shi_lai_mu/slmblog_nestjs-backend',
 //       git_http_url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend.git',
 //       git_ssh_url: 'git@gitee.com:shi_lai_mu/slmblog_nestjs-backend.git',
 //       git_svn_url: 'svn://gitee.com/shi_lai_mu/slmblog_nestjs-backend',
 //       homepage: null,
 //       stargazers_count: 0,
 //       watchers_count: 1,
 //       forks_count: 0,
 //       language: null,
 //       has_issues: true,
 //       has_wiki: true,
 //       has_pages: false,
 //       license: 'ISC',
 //       open_issues_count: 0,
 //       default_branch: 'master',
 //       namespace: 'shi_lai_mu',
 //       name_with_namespace: '史莱姆/史莱姆博客 NestJs后端',
 //       path_with_namespace: 'shi_lai_mu/slmblog_nestjs-backend'
 //     },
 //     user_id: 1774840,
 //     user_name: '史莱姆',
 //     user: {
 //       id: 1774840,
 //       name: '史莱姆',
 //       email: '478889187@qq.com',
 //       username: 'shi_lai_mu',
 //       user_name: 'shi_lai_mu',
 //       url: 'https://gitee.com/shi_lai_mu'
 //     },
 //     pusher: {
 //       id: 1774840,
 //       name: '史莱姆',
 //       email: '478889187@qq.com',
 //       username: 'shi_lai_mu',
 //       user_name: 'shi_lai_mu',
 //       url: 'https://gitee.com/shi_lai_mu'
 //     },
 //     sender: {
 //       id: 1774840,
 //       name: '史莱姆',
 //       email: '478889187@qq.com',
 //       username: 'shi_lai_mu',
 //       user_name: 'shi_lai_mu',
 //       url: 'https://gitee.com/shi_lai_mu',
 //       login: 'shi_lai_mu',
 //       avatar_url: 'https://portrait.gitee.com/uploads/avatars/user/591/1774840_shi_lai_mu_1578959630.png',
 //       html_url: 'https://gitee.com/shi_lai_mu',
 //       type: 'User',
 //       site_admin: false
 //     },
 //     enterprise: null,
 //     hook_name: 'push_hooks',
 //     hook_id: 613045,
 //     hook_url: 'https://gitee.com/shi_lai_mu/slmblog_nestjs-backend/hooks/613045/edit',
 //     password: 'test123456789',
 //     timestamp: '1619800301877',
 //     sign: ''
 //   },
 //   protocol: undefined,
 //   host: 'slmblog.com:7000',
 //   url: '/active/slmblog-server'
 // }