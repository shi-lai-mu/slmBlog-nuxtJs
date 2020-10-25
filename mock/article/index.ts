/**
 * 用户信息mock
 */
import { mock } from '@/mock/mock';

// Data Template
import { baseRes } from '../response'
import { articleData } from './data';


// 外层框架包装
const baseResponse = data => baseRes(data);

// 接口注册
mock(/\/article\/latest/, 'get', baseResponse(articleData));   // 最新的文章