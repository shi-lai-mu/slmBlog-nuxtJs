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
 * 为客户端
 */
const isClient = process && process.client;

/**
 * 是否为Mock数据
 * @param res AxiosResponse响应
 */
const isMockData = (res: AxiosResponse): boolean => res.request.__proto__.constructor.name === 'MockXMLHttpRequest';

/**
 * 观察者
 */
const observer: any = {
  /**
   * 响应
   */
  response: {
    /**
     * 更新token时
     */
    updateToken: [],
    /**
     * 响应错误时
     */
    error: [],
    /**
     * 默认
     */
    default: [],
  },
};

/**
 * 存储token字段名
 */
const tokenKeyStorage = 'token';

/**
 * 提示信息
 */
const tips = {
  child_server_no_config:    '%s 子服务器未在配置内!',
  frequent_req_interception: '频繁请求拦截!',
  no_group_permission:       '当前用户不在[%s]权限组内!',
  appoint_init_permission:   '[%s] 权限组未进行初始化!',
  gloabl_init_permission:    '请在全局初始化权限组',
};

export {
  localRegExp,
  isDev,
  isServer,
  isClient,
  tips,
  observer,
  tokenKeyStorage,
  isMockData,
};