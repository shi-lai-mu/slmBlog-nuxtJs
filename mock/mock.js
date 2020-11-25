/**
 * 生产模式下屏蔽MockJs导入虚拟的MockJs保留初始化变量作用
 * 
 */

import { isProd } from '@/config/system';
import axios from '@/utils/axios';

// 启动模式 default：默认  skeleton: 骨架[空值]
let model = 'default';

// 生产环境导出模拟mockjs，其他模式下如果启用mock将调用真实mockjs
const MockJS = !isProd && model === 'default' ? require('mockjs') : require('@/mock/build');

// 二次导出
export const Random = MockJS.Random;

// 二次导出并且进行数据处理
export const mock = (rurl, rtype, template) => {
  // 在启动mock时，服务端asyncData中无法获取Mock数据导致404或者响应超时
  // 解决方案：axios封装内增加mock功能，在此处进行服务端过滤，如果为服务端则注册到axios内，请求时响应
  axios.mock.reg(rurl, rtype, template);

  return MockJS.mock(rurl, rtype, template);
}