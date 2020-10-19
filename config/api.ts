export interface Api {
  [key: string]: string | { [key: string]: Api | string };
};

const api = {
  // 设置类
  mock:            '[user]oss:post./mock/test',                             // mock测试
  mock_1:          '[user]oss:post./mock/test',                             // mock测试
  mock_2:          '[user]post./mock/test/:xxx/sss',                        // mock测试
  get_mock:        '/mock/test',                                            // mock测试
  user: {
    /**
     * 登录
     */
    login:         'post./user',                                             // 用户登录
  }
};
export default api;