import axios from '@/utils/axios';
import { AxiosRequestConfig } from 'axios/index';

import { Request } from '@/interface/request';
import { User } from '@/interface/request/user';
import { themesdefaultConfig } from '@/config/themes';


/**
 * 获取用户配置信息
 */
export const getUserConfig = (axiosConfig?: AxiosRequestConfig) => (axios.send(axios.user.config, axiosConfig) || themesdefaultConfig) as Promise<Request.Result<User.Config>>;


/**
 * 保存用户配置信息
 */
export const saveUserConfig = (config: User.Config) => axios.send(axios.user.saveConfig, { data: { json: JSON.stringify(config) } }) as Promise<Request.Result<User.Config>>;


/**
 * 获取用户基础信息
 */
export const getUserBaseData = (userId: User.Base['id']) => axios.send(axios.user.data, {
  params: { id: userId },
}) as Promise<Request.Result<User.Base>>;


/**
 * 登录账号
 */
export const loginAccount = (acc: User.LoginDto['account'], pass: User.LoginDto['password']) => axios.send(axios.user.login, {
  data: { account: acc, password: pass },
}) as Promise<Request.Result<User.Base>>;