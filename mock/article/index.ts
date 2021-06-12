/**
 * 用户信息mock
 */
import { mock } from '@/mock/mock'

// Data Template
import { randomArray } from '@/mock/publicMock'
import { baseRes } from '../response'
import { articleBase } from './data'

// 外层框架包装
const baseResponse = data => baseRes(data)

// 接口注册
mock(/\/article\/latest/, 'get', baseResponse(randomArray(4, articleBase))) // 最新的文章
