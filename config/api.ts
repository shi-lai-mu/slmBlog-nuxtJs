export interface Api {
  [key: string]: string | { [key: string]: Api | string }
}

const api = {
  /**
   * 设置类
   */
  mock_1: 'oss:POST./mock/test', // mock测试
  mock_2: 'POST./mock/test/:xxx/sss', // mock测试
  mock: '/mock/test', // mock测试

  /**
   * 账号类
   */
  user: {
    /** 获取用户信息 */
    info: '/user',
    /** 获取用户配置 */
    config: '/user/config/all',
    /** 保存用户配置 */
    saveConfig: 'POST./user/config',
    /** 用户登录 */
    login: 'POST./user/signin',
    /** 注册账号 */
    register: 'POST./user/register',
    /** 获取用户信息 */
    data: '/user/:id',
    /** 验证类 */
    validate: {
      /** 验证邮箱 */
      email: 'PUT./user/validate/email',
    },
  },

  /**
   * 文章类
   */
  article: {
    /** 发布文章 */
    submit: 'POST./article',
    /** 最新文章 */
    list: '/article/:filterMode/:page/:count',
    /** 获取文章内容 */
    data: '/article/:articleId',
    /** 获取文章简洁信息 */
    profile: '/article/profile/list',
    /** 发表评论 */
    submitReplay: 'POST./article/comment/:articleId',
    /** 获取评论列表 */
    commentList: '/article/comment/:articleId/:page/:pageSize',
    /** 提交[点赞/点踩]行为 */
    goodBehavior: 'POST./article/behavior/good',
  },

  /**
   * 通知类
   */
  notify: {
    /** 获取置顶公告 */
    notic: '/notic',
    /** 友链 */
    friend: {
      /** 获取友链 */
      get: '/friend/link',
      /** 提交友链申请 */
      submit: 'POST./friend/link',
    },
  },

  /**
   * 资源类
   */
  resources: {
    /** 随机用户头像 */
    avatars: '/resources/avatars/{gender}/{nickname}.svg',
  },
}
export default api
