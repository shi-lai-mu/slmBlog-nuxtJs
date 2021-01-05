'use strict';
/**
 * Axios 二次封装 [未启用加密版]
 * author:  ShiLaiMu
 * version: v1.3.0
 * type:    TypeScript
 * encrypt: false
 * 
 * 依赖:
 * @/config/api.config.ts
 * @/config/default.config.ts
 * npm install @types/axios @types/qs --save
 * 
 * 全局:
 * [main.ts] Vue.prototype.$axios = axios;
 * 
 * 功能:
 * - 全局统一：  请求api配置中的接口，实现一改配置修改全部请求
 * - 统一配置化: 请求信息，分离 [服务器配置文件] 和 [请求配置文件]，实现可配置 [主和子服务器/请求延迟/请求路由/请求方式/请求的目标服务器]
 * - 身份携带：  token自动化加入请求头，读取本地缓存
 * - 请求权重：  调用时指定的请求信息必定覆盖配置内的请求信息
 * - 路由参数：  配置文件中支持路由
 * - 临时令牌：  如果response header内存在token则会将它作为临时token，下次请求时使用
 * - 线上线下域：生产模式下自动切换为线上请求域，开发模式自动切换为内网域或开发本地域   ——   V1.1.6+
 * - 全局监听：  全局监听axios的事件，统一处理请求指定事件并及时响应   ——   V1.2.0+
 * - 内网请求：  内网访问及调试时，后端请求自动切换为内网域   ——   V1.2.1+
 * 
 * 调用方法:
 * - 推荐:
 *   $axios.send($axios.login, RequestConfig).then(console.log).catch(console.error)
 *   请求「@/config/api.config.ts」文件中 login 路由，并携带RequestConfig内的参数
 *   此方法的请求主机和和方法均为配置中的指向，如 testServer1:post./user/login 默认指向 testServer1 主机，使用post方法请求/user/login
 * 
 * - 权重法:
 *   $axios.send($axios.login).get(RequestConfig).then(console.log).catch(console.error)
 *   请求 login 路由，并携带RequestConfig内的参数，但会强制使用get方法请求，并非配置中的post请求，此时post可视为默认请求，但get为指定所以权重更高
 * 
 * - 路由参数:
 *   RequestConfig 内可传入 params 对象，如路由为 testServer1:post./user/:username/login
 *   传入 RequestConfig = { params: { username: 'slm' } } 则会被转换为 testServer1:post./user/slm/login
 *
 * - 内网请求
 *   当请求为127.0.0.1或loaclhost且前端的域非两者之一，自动将请求域替换为当前前端的域，以实现内网请求及调试
 * 
 * - 全局监听
 *   $axios.observer.emit(EventKey, callback)  绑定
 *   $axios.observer.off(EventKey, callback)   解绑
 *   EventKey: 
 *      + response.updateToken  请求响应更新token时
 *      + response.error        请求响应错误时
 *      + response.default      请求默认响应时
 * 
 * 配置方法：
 * - @/config/api.config.ts
 *   {  路由名: '服务器名:请求方法.路由' } 如 { login: 'test1:post./user/:user' } 服务器名和请求方法均为可选参数
 *   如 'post./user/:user' 或 'test1:/user/:user' 或 '/user/:user' 当请求方法不存在时默认为GET请求，当服务器名不存在时默认为主服务器
 */

import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
// get数据
import axiosQs from 'qs';
// api调用
import API from '@/config/api';
// 配置文件
import config from '@/config/default';
import Axios from 'axios';
import { namespace, Vue } from 'nuxt-property-decorator';
// 内部配置
import {
  localRegExp,
  isDev,
  isServer,
  isMockData,
  tokenKeyStorage,
  observer,
} from './lib/config';
import { message } from './lib/log';
import AxiosMock from './lib/mock';
// 服务器配置
const serverConfig = config.apiServer;
// 频繁请求处理
const requestClock: any = {};
// 当前域
const locaHostName = !isServer ? window.location.hostname : '127.0.0.1';

// 创建axios实例
let $axios: AxiosInstance = axios.create({
  baseURL: !isDev || serverConfig.devHost === undefined
    ? serverConfig.host
    : localRegExp.test(serverConfig.devHost) && !localRegExp.test(locaHostName)
      ? serverConfig.devHost.replace(localRegExp, locaHostName)
      : serverConfig.devHost,
  timeout: serverConfig.timeout || 15000,
  withCredentials: true
});

const mock = new AxiosMock($axios);

/**
 * 响应拦截
 */
$axios.interceptors.response.use(
  (res: AxiosResponse) => {
    let { data } = res;
    // token 自动化更新
    // const headersToken = res.headers.token;
    // if (headersToken) {
    //   token = headersToken;
    //   observer.response.updateToken.forEach((cb: any) => cb(token));
    // }
    observer.response.default.forEach((cb: any) => cb(res));
    
    data = Object.defineProperty(data || {}, '_res', {
      enumerable: false,
      get: () => res,
    });

    // mock 数据判断
    res.isMockData = isMockData(res);
    // if (isDev) console.log(`[${res.config.method?.toLocaleUpperCase()}: ${res.status}] ${res.config.url}`, res.data);
    return data || res;
  },
  err => {
    observer.response.error.forEach((cb: any) => cb(err.response));
    return err;
  },
);


/**
 * 请求拦截
 */
$axios.interceptors.request.use(
  (value: AxiosRequestConfig) => {
    const data = value.data;

    const mockData = $axios.mock.has(`${value.method}.${value.api?.replace(/:\w+/g, ':params')}`);
    if (mockData) {
      return Promise.reject(mockData.template);
    }

    // if (!token && !isServer) {
    //   token = JSON.parse(localStorage.getItem(tokenKeyStorage) || '{}').token;
    //   if (token) {
    //     value.headers.token = encodeURIComponent(token);
    //   }
    // } else value.headers.token = encodeURIComponent(token);

    // GET 数据处理
    if (data && value.method === 'get') {
      value.url += `?${axiosQs.stringify(data)}`;
      value.data = undefined;
    }

    // 非 GET 处理
    const postData = value.data || {};
    if (value.method !== 'get' && postData.api) {
      value.data = {
        ...value.data.data,
      };
      // token && (value.data.token = token);
      delete value.data.api;
    }

    // 路径参数
    const params = value.params || (data && data.params);
    if (params && value.url) {
      for (const key in params) {
        if (params[key] !== undefined) {
          value.url = value.url.replace(`:${key}`, params[key]);
        }
      }
      delete value.params;
      if (data) delete data.params;
    }

    // 统一处理路由
    if (value.url) {
      const targetServer = (value.url.match(/(\w+)(?=\:(?!\/\/))/) || [])[0] || serverConfig.defaultHost;
      if (targetServer && serverConfig.children) {
        const targetChild = serverConfig.children[targetServer];
        if (targetChild) {
          value.url = value.url.replace(/(\w+)\:/, '');
          value.baseURL = !isDev ? targetChild.host : targetChild.devHost;
        } else throw Error(message('child_server_no_config', [ targetServer ]));
      }
      value.url = value.url.replace(/^(post|get|put|delete)\./i, '');
    }

    // 频繁请求拦截
    const requestKey = (value.method || 'get') + value.url + `@${isServer ? 'server' : 'client'}`;
    if (requestKey) {
      const targetClock = requestClock[requestKey];
      if (targetClock && targetClock > Date.now()) {
        return Promise.reject({ error: message('frequent_req_interception') });
      }
      requestClock[requestKey] = Date.now() + 100;
    }

    if (value.baseURL) {
      value.url = value.baseURL + serverConfig.apiVersion + value.url;
      value.baseURL = '';
    }

    const vue = $axios.$vue;
    if (vue && vue.$store.state && vue.$store.state && vue.$store.state.jwt) {
      value.headers.Authorization = `Bearer ${vue.$store.state.jwt}`;
    }

    return value;
  },
);

/**
 * axios API request
 * @param api - API库内的键
 * @param axiosRequest
 *        - 请求数据配置
 *        - 仅 send(*, *).then() 时生效
 * @return 链式操作请求方式，内部传入与axios相同，排除第一个URL
 */
($axios as any).send = (URL: string, axiosRequest: AxiosRequestConfig = {}) => {
  const api = URL;
  
  // 未知API
  // if (!URL) throw new Error(`api: 「${api}」在配置内未定义!`);
  const authRegExp = /(?<=\[)\w+(?=\])/g;
  const authGroupName: any = (URL.match(authRegExp) || [])[0];

  // 权限鉴定
  if (authGroupName) {
    URL = URL.replace(/\[\w+\]/g, '');
    if (Object.keys($axios.auth).length) {
      if ($axios.auth[authGroupName]) {
        if (!$axios.auth[authGroupName]()) return Promise.reject({ error: message('no_group_permission', [ authGroupName ]) });;
      } else throw Error(message('appoint_init_permission', [ authGroupName ]));
    } else throw Error(message('gloabl_init_permission'));
  }

  const regExp = /((\w+)(?=\:))?(post|get|put|delete)(?=\.)/ig;
  const method: any = (URL.match(regExp) || [])[0] || 'get';

  const methods: any = {
    get:        (res: AxiosRequestConfig = {}) => $axios.get(URL,    { api, ...res }),
    put:        (res: AxiosRequestConfig = {}) => $axios.put(URL,    { api, ...res }),
    post:       (res: AxiosRequestConfig)      => $axios.post(URL,   { api, ...res }),
    delete:     (res: AxiosRequestConfig)      => $axios.delete(URL, { api, ...res }),
  };

  return {
    then: async (res) => {
      return methods[ method ](axiosRequest).then(res);
    },
  };
};

/**
 * axios mock
 */
$axios.mock = mock;

$axios.config = {
  api: API,
  server: config,
};

$axios.$vue = undefined;

$axios.auth = {};

$axios = Object.assign({}, API, $axios);


const observerKey: ('response' | 'response.error' | 'response.updateToken') = 'response';
/**
 * axios observer
 * @param api - API库内的键
 * @param axiosRequest
 *        - 请求数据配置
 *        - 仅 send(*, *).then() 时生效
 * @return 链式操作请求方式，内部传入与axios相同，排除第一个URL
 */
$axios.observer = {
  emit: (
    key: typeof observerKey,
    cb: (param: AxiosResponse) => void
  ) => {
    const split = key.split('.');
    const parent = split[0];
    const child = split[1] || 'default';
    observer[parent][child].push(cb);
    return $axios;
  },
  off: (
    key: typeof observerKey,
    cb: (param: AxiosResponse) => void
  ) => {
    const split = key.split('.');
    const parent = split[0];
    const child = split[1] || 'default';
    observer[parent][child].forEach((fn: any, index: number) => {
      if (cb === fn) observer[parent][child].splice(index, 1);
    });;
    return $axios;
  },
};

export default $axios;


/**
 * ==============================
 *          接 口 定 义
 * ==============================
 */

declare module 'axios/index' {
  export type ConfigApi = typeof API;
  interface AxiosInstance extends ConfigApi {
    /**
     * axios API request
     * @param api - API库内的键
     * @param axiosRequest
     *        - 请求数据配置
     *        - 仅 send(*, *).then() 时生效
     */
    send: <T>(
      /**
       * API库内的键
       * - @/config/api.config.ts
       */
      api: string,
      /**
       * 请求数据配置
       * - 仅 send(*, *).then() 时生效
       */
      axiosRequest?: AxiosRequestConfig
    ) => Promise<T>;

    /**
     * 配置信息
     */
    config: {
      /**
       * 接口
       */
      api: typeof API;
      /**
       * 服务器
       */
      server: typeof config;
    };

    /**
     * Vue实例
     */
    $vue?: Vue;

    /**
     * 权限鉴定
     */
    auth: {
      /**
       * 权限组名
       */
      [key in string]: () => boolean;
    };

    /**
     * 监听axios内部事件
     */
    observer: {
      /**
       * 绑定
       * @param key - 事件名
       * @param cb  - 触发体
       */
      emit(
        key: typeof observerKey,
        cb: (param: AxiosResponse) => void
      ): AxiosInstance,
      /**
       * 解绑
       * @param key - 事件名
       * @param cb  - 触发体
       */
      off(
        key: typeof observerKey,
        cb: (param: AxiosResponse) => void
      ): AxiosInstance,
    };

    /**
     * mock接口
     */
    mock: AxiosMock;
  }

  interface AxiosResponse {
    /**
     * 是否为mock响应数据
     */
    isMockData?: boolean;
  }

  interface AxiosRequestConfig {
    api?: string;
  }
}

/**
 * ==============================
 *        vue 接 口 扩 展
 * ==============================
 */

declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosInstance;
  }
}

interface AxiosService {
  send: (api: string, axiosRequest?: AxiosRequestConfig | undefined) => {
    get:    (res?: AxiosRequestConfig)  => Promise<any>;
    post:   (res?: AxiosRequestConfig)  => Promise<any>;
    delete: (res?: AxiosRequestConfig)  => Promise<any>;
    put:    (res?: AxiosRequestConfig)  => Promise<any>;
    then:   (res?: any)                 => Promise<any>;
    async:  (res?: any)                 => Promise<any>;
  }
}

export type AxiosSend<T> = AxiosService['send'];