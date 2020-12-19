export interface Api {
  [key: string]: string | { [key: string]: Api | string };
};

const api = {
  // 设置类
  mock_1:          'oss:post./mock/test',                             // mock测试
  mock_2:          'post./mock/test/:xxx/sss',                        // mock测试
  get_mock:        '/mock/test',                                            // mock测试
  user: {
    // 登录
    login:         'post./user/signin',                                      // 用户登录
    data:          '/user/:id',                                       // 获取用户信息
  },
  article: {
    latest:        '/article/latest',                                 // 最新文章
  }
};
export default api;