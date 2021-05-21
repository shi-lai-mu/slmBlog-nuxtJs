<div align="center">
  <img width="300"src="https://slmblog.com/git_slmblog_logo_mini.png" alt="SLM-BLOG LOGO"/>

  <p align="center">
    <a href="https://github.com/vuejs/vue">
      <img src="https://img.shields.io/badge/vue-2.6.12-brightgreen" alt="vue">
    </a>
    <a href="https://github.com/Microsoft/TypeScript">
      <img src="https://img.shields.io/badge/typescript-4.0.3-brightgreen" alt="typescript">
    </a>
    <a href="https://opensource.org/licenses/ISC">
      <img src="https://img.shields.io/badge/License-ISC-blue" alt="ISC License" />
    </a>
    <a href="https://github.com/vueComponent/ant-design-vue">
      <img src="https://img.shields.io/badge/antdUI-1.6.5-lightgrey" alt="antd">
    </a>
  </p>
</div>


## [SLM BLOG](https://slmblog.com) NuxtJs SSR版 [此版本暂未上线，处于内测开发阶段]
SLMBLOG 是使用 NuxtJs(前端) + NestJs(后端) + TypeScript(语言) + Redis(缓存) + OSS(存储) + GitHub Actions(自动化) +  等技术开发的个人博客系统，前后端分离扁平化UI。<br>
前后端均为开源项目通过简单的修改配置就能实现自动部署项目

---
### 开发流程
线上分为预发环境staging和真线环境，主开发流程：[开发环境](#开发环境) > [mock本地化测试](#mock本地化测试) > [YApi测试](#YApi测试) > [冒烟测试](#冒烟测试) > [预发环境](#预发环境) > [真线环境](#预发环境)
> 后面还会加入jest测试单元，尽量的去完善完整的流程。


---

web主站:

 - 页面
    + [x] 首页
      - [x] 推荐文章布局切换
      - [x] 博主信息卡
      - [x] 全站公告
      - [x] 焦点文章卡
      - [ ] 推荐文章类型筛选 (dev ing...)
      - [ ] 推荐文章设置
    + [x] 博文页
      - [x] 在列表页的展开动画
      - [x] 文章评论功能
      - [x] 点赞/点踩 文章/评论 功能
      - [x] 上下文章翻页
      - [x] 文章结构解析 (存在问题)
      + [x] 表情评论
      - [ ] 文章代码块
    + [x] 登录弹窗
      - [x] 登录功能
      - [x] 注册功能
      - [x] 找回密码
      - [ ] 三方登录[QQ、微博]
    + [ ] 个人中心 (dev ing...)
    + [x] 发布博文页
      - [x] 标题
      - [x] 头图
      - [x] 简介
      - [x] 类目
      - [x] 内容
      - [x] 当前内容目录解析
      - [x] 发布注意事项
      - [ ] 增强设置
      - [ ] 保存草稿
    + [x] 条款与免责 (dev ing...)
    + [x] 友链页 (dev ing...)
      - [x] 友链卡
    + [ ] 使用3D/2D场景作为背景
    + 待定....

 - 功能
    + [x] 自定义主题皮肤
      - [x] 自定义背景
      - [x] 自定义主题色
      - [x] 自定义全站字体大小
    + [x] 悬浮物 live2D猫
    + [x] 背景开关
    + [x] 基础组件包含骨架
    + [x] 全局图片状态插件
    + [x] mock封装
    + [x] axios封装

---


### 其他计划

NestJs 后端工程: [链接](https://github.com/shi-lai-mu/slmblog-server)(开发中...)

Flutter 移动端: (待开发...)


### 如何使用本项目？
```shell
git clone https://github.com/shi-lai-mu/slmBlog-nuxtJs.git
cd slmBlog-nuxtJs
npm i --registry=https://registry.npm.taobao.org


# 开发模式 (包含编译主题皮肤 | 端口 8881)
npm run dev

# 编译 (包含编译主题皮肤)
npm run build

# 启动正式生产环境 需先运行 "npm run build" (端口 8881)
npm run start

# 无网/无yapi平台 本地mock调试模式 (包含编译本地mock为json5 | 端口 8881)
npm run mock

# 编译本地mock(包含注释)为json5输出到 /mock/YAPI/dist
npm run build:yapi

# 运行demo预发环境 (端口 4000)
npm run staging

# 编译主题皮肤
npm run themes

# 运行jest
npm run test

# tslint 检查
npm run lint

# 生成静态文件
npm run generate

```
> 在开发环境下运行`npm i`后输入`npm run dev`,线上环境请使用`npm run build; npm run start` 或 `pm2 start process.json`(前提是已安装pm2)。<br>
> 如想修改站点内容可进行快速配置：
> + [配置目录](https://github.com/shi-lai-mu/slmBlog-nuxtJs/tree/master/config)
> + [主 配置](https://github.com/shi-lai-mu/slmBlog-nuxtJs/tree/master/config/default.ts)
> + [API 配置](https://github.com/shi-lai-mu/slmBlog-nuxtJs/tree/master/config/api.ts)
> + [主题 配置](https://github.com/shi-lai-mu/slmBlog-nuxtJs/tree/master/config/themes.ts)
> + [站点设置 配置](https://github.com/shi-lai-mu/slmBlog-nuxtJs/tree/master/config/websetting.ts)
> + [三方登录 配置](https://github.com/shi-lai-mu/slmBlog-nuxtJs/blob/master/config/note/tripartite.ts)



### 自动化部署
当前项目对github和gitee进行了自动化部署处理，默认对push master操作进行部署

+ github 自动化部署方法:<br>
  在`fork项目`点击的`settings > secrets > New repository secret`分别新建以下内容<br>
  Name：`SERVER` | Value：`服务器IP`<br>
  Name：`WFP_ID_RSA` | Value：`服务器普通用户~/.ssh/id_rsa免登录私钥内容`<br>
  以上首先要运行服务器被ssh私钥登录，不行的需要修改`/etc/ssh/ssh_config`然后重启sshd服务(需谨慎如果修改错误会导致无法ssh登录包括控制台远程，需要救援链接补救别问我是怎么知道的)<br>
  配置部署内容可参考 (.github/workflows/build.yml)[https://github.com/shi-lai-mu/slmBlog-nuxtJs/blob/master/.github/workflows/build.yml]<br>
  当前部署方案：
    - push到master时
    - 安装`checkout@v2`和`setup-node@v1`
    - 在虚拟机内安装本项目依赖并打包编译
    - 设置虚拟机known_hosts和id_rsa实现免密登录自己的服务器
    - 免密连接服务器删除项目下之前的.nuxt编译文件夹所有内容
    - 上传虚拟机内刚刚编译的文件到服务器项目文件夹下 (为了减少自己服务器压力，编译在虚拟机内操作)
    - 同步项目，安装依赖
    - pm2删除名"slmblogFrontend"，新建"slmblogFrontend"并run start
    - 删除虚拟机内的免登录ssh rsa

+ gitee 自动化部署方法:<br>
  项目上传到gitee点击`管理 > WebHooks`设置为 ${服务器IP}/active/gitee/webhook<br>
  然后将本项目.gitee下的hooks上传到服务器/opt/webhook并启动`sh /opt/webhook/start-webhook.sh`<br>
  配置部署内容可参考 (.gitee/hooks/webhook.json)[https://github.com/shi-lai-mu/slmBlog-nuxtJs/tree/master/.gitee/hooks/webhook.json]<br>


---
### 开发环境
包含UI设计、创新尝试、BUG修复、性能优化及最主要的新功能开发和基础冒烟

### mock本地化测试
mockjs去模拟 请求响应的(异常值、空值、延迟、错误、文字溢出、图过大过小) 和 跨权限组调用等情况
对于不清楚接口响应参数及没有yapi平台的用户，可以通过mock数据进行一定程度上的了解，且这里严格要求mock数据必须包含完整且有意义的注释

### YApi测试
自己搭建了一个YApi平台，除了本地的mock我想在线上也有完整的接口文档，好后续开发和导出文档
对于线上和本地后端接口进行测试集合测试，确保后端迭代不会导致其他功能塌陷

### 冒烟测试
前段主流程走通，首页及新功能无明显BUG

### 预发环境
预发工程到线上服务器，走测试数据库避免脏数据，尽可能模拟[真线](#真线环境)确保无 跨域、超时、过期 等问题

### 真线环境
正式发布到线上，确保发布效果与预期相符


-------
喜欢的欢迎 star 或 fork 鼓励一下，谢谢各位大佬!