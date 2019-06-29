// 前端配置

const config = {
  // 服务器域名
  server: {
    // 主接口
    main: 'https://api.slmblog.com/',
    // 图片服务器
    img:  'https://img.slmblog.com/',
    // IO服务器
    io:   'https://io.slmblog.com/',
  },
}

// 上传服务器
config.server.uploadImg = config.server.img + 'img/upload/'

// 请求API
config.API = {
  // 首页 热门 右侧
  HOME_HOT:           'blog/hot',
  HOME_RIGHT:         'blog/right',
  HOME_NOTICE:        'blog/special/1?tag=公告',
  HOME_TOP:           'blog/special/1?tag=置顶',
  // 友情链接
  FIRENDSHIP:         'blog/friendship',
  
  // 文章 内容
  ARTCILE_CONTENT:    'article/:id',

  // 用户
  USER_INFO:          'user/info/:id',
  USER_ALL_ARTCILE:   'article/getUserAll/:id',
  USER_LOGIN:         'user/login',
  USER_REGISTER:      'user/register',
  
  // IO接口
  IMAGER_UPLOAD:       config.server.io + 'i.php?token=:token',
  ARTICLE_ADD:         'article/add',
  ARTICLE_UNEDITOR:    'article/unEditor',
  ARTICLE_ADD_MESSAGE: 'article/addMessage',

  /* IP 接口 */
  IP:                   config.server
}


export default {
  ...config
}
