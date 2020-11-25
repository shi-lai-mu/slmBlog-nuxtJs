/**
 * 用户信息mock
 */
import { mock } from '@/mock/mock';

// Data Template
import { baseRes } from '../response'
import { userData } from './data/user';


// 外层框架包装
const baseResponse = data => baseRes(data);

// 接口注册
mock(/\/user\/\d+/, 'get', baseResponse(userData));  // 用户信息