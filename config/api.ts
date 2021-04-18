export interface Api {
  [key: string]: string | { [key: string]: Api | string };
};

const api = {
  // 设置类
  mock_1:          'oss:post./mock/test',                                   // mock测试
  mock_2:          'post. /mock/test/:xxx/sss',                             // mock测试
  get_mock:        'get.  /mock/test',                                      // mock测试
  // 账号类
  user: {
    info:          'get.  /user',                                           // 获取用户信息
    config:        'get.  /user/config/all',                                // 获取用户配置
    saveConfig:    'post. /user/config',                                    // 保存用户配置
    login:         'post. /user/signin',                                    // 用户登录
    register:      'post. /user/register',                                  // 注册账号
    data:          'get.  /user/:id',                                       // 获取用户信息
    validate: {
      email:       'put. /user/validate/email',                             // 验证邮箱
    }
  },
  // 文章类
  article: {
    submit:        'post. /article',                                        // 发布文章
    list:          'get.  /article/:filterMode/:page/:count',               // 最新文章
    data:          'get.  /article/:articleId',                             // 获取文章内容
    profile:       'get.  /article/profile/list',                           // 获取文章简洁信息
    submitReplay:  'post. /article/comment/:articleId',                     // 发表评论
    commentList:   'get.  /article/comment/:articleId/:page/:pageSize',     // 获取评论列表
    goodBehavior:  'post. /article/behavior/good',                          // 提交[点赞/点踩]行为
  },
  // 通知类
  notify: {
    notic:         'get.  /notic',                                          // 获取置顶公告
  },
  // 资源类
  resources: {
    avatars:       '/resources/avatars/{gender}/{nickname}.svg',            // 随机用户头像
  },
};
export default api;