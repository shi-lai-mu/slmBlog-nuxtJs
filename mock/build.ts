/**
 * Mock模拟 在生产模式下禁止打包真实mock，保留Random随机内容功能
 */

// 初始化内容
export const Random = {
  integer: () => 1,
  name: () => '',
  image: () => '',
  cparagraph: () => '',
  datetime: () => '',
  word: () => '',
  url: () => '',
  natural: () => 1,
};

// 伪mock接口
export const mock = (_url, _rtype, _template) => {};