/**
 * 用户信息mock
 */
import MockJs, { mock } from 'mockjs';

// Data Template
import { baseRes } from '../response'
import { userData } from './data/user';


// 外层框架包装
const baseResponse = data => mock(baseRes(data));

// 接口注册
mock(/\/user\/\d+/, 'get', baseResponse(userData));