import { AxiosResponse } from "axios";


/**
 * 本地IP判断
 */
const localRegExp = /(127|192)\.\d+\.\d+\.\d+|localhost/;

/**
 * 为开发模式
 */
const isDev = process.env.NODE_ENV === 'development';

/**
 * 为服务环境
 */
const isServer = process && process.server;

/**
 * 是否为Mock数据
 * @param res AxiosResponse响应
 */
const isMockData = (res: AxiosResponse): boolean => res.request.__proto__.constructor.name === 'MockXMLHttpRequest';

/**
 * 提示信息
 */
const tips = {

};

export {
  localRegExp,
  isDev,
  isServer,
  tips,
  isMockData,
};