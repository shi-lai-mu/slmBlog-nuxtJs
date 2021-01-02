export interface Api {
  [key: string]: string | { [key: string]: Api | string };
};

const api = {
  // 设置类
  mock_1:          'oss:post./mock/test',                             // mock测试
  mock_2:          'post./mock/test/:xxx/sss',                        // mock测试
  get_mock:        '/mock/test',                                      // mock测试
  // 账号类
  user: {
    login:         'post./user/signin',                               // 用户登录
    data:          '/user/:id',                                       // 获取用户信息
  },
  // 文章类
  article: {
    list:          '/article/:filterMode/:page/:count',               // 最新文章
    data:          '/article/:articleId',                             // 获取文章内容
  },
  // 通知类
  notify: {
    notic:         '/notic',                                          // 获取置顶公告
  }
};
export default api;