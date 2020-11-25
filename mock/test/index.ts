import * as MockJs from 'mockjs';

/**
 * Mock测试
 */
MockJs.mock(/\/mock\/test/, 'get', () => {
  console.log('[MOCK] 测试请求成功!');
  return MockJs.mock({
    'list|1-10': [{
      'id|+1': 1
    }]
  });
});
