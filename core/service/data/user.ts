import axios from '@/utils/axios'
import { AxiosRequestConfig } from 'axios/index'

import { Request } from '@/interface/request'
import { AccountValidateDto, User } from '@/interface/request/user'
import { themesDefaultConfig } from '@/config/themes'

/**
 * 获取用户信息
 */
export const getSelfInfo = (axiosConfig?: AxiosRequestConfig) =>
  axios.send<Request.Result<User.Base>>(axios.api.user.info, axiosConfig)

/**
 * 获取用户配置信息
 */
export const getUserConfig = (axiosConfig?: AxiosRequestConfig) =>
  axios.send<Request.Result<User.Config>>(axios.api.user.config, axiosConfig) || themesDefaultConfig

/**
 * 保存用户配置信息
 */
export const saveUserConfig = (config: User.Config) =>
  axios.send<Request.Result<User.Config>>(axios.api.user.saveConfig, {
    data: {
      json: JSON.stringify(config),
    },
  })

/**
 * 获取用户基础信息
 */
export const getUserBaseData = (userId: User.Base['id']) =>
  axios.send<Request.Result<User.Base>>(axios.api.user.data, {
    params: { id: userId },
  })

/**
 * 登录账号
 */
export const loginAccount = (acc: User.LoginDto['account'], pass: User.LoginDto['password']) =>
  axios.send<Request.Result<User.Base>>(axios.api.user.login, {
    data: {
      account: acc,
      password: pass,
    },
    appendCookie: true,
  })

/**
 * 注册账号
 */
export const registerAccount = (
  account: User.RegisterDto['account'],
  password: User.RegisterDto['password'],
  email?: User.RegisterDto['email']
) =>
  axios.send<Request.Result<User.Base>>(axios.api.user.register, {
    data: {
      account,
      password,
      email,
    },
  })

/**
 * 获取用户信息
 */
export const validateAccountEmail = (validateEmailData?: AccountValidateDto.Email) =>
  axios.send<Request.Result<string>>(axios.api.user.validate.email, {
    data: validateEmailData,
  })
