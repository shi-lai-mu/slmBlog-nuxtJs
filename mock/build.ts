/**
 * Mock模拟 在生产模式下禁止打包真实mock，保留Random随机内容功能
 */
import mockjs from 'mockjs'

// 初始化内容
export const random = {
  integer: () => '',
  name: () => '',
  image: () => '',
  cname: () => '',
  cparagraph: () => '',
  datetime: () => '',
  word: () => '',
  url: () => '',
  natural: () => '',
  boolean: () => '',
  title: () => '',
  ctitle: () => '',
} as unknown as mockjs.MockjsRandom

// 绕过ts判断，实际上给出默认值都为空字符串
export const Random: mockjs.MockjsRandom = random

// 伪mock接口
export const mock = (_url, _rtype, _template) => {}
