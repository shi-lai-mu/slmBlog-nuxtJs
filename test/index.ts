import * as MockJs from 'mockjs'

/**
 * Mock测试
 */
MockJs.mock(/\/mock\/test/, 'get', () => {
  return MockJs.mock({
    'list|1-10': [
      {
        'id|+11': 1,
      },
    ],
  })
})
