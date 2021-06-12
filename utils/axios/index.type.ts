import { AxiosRequestConfig, AxiosInstance } from 'axios'
import config from '../../config/default'
import API from '../../config/api'
import AxiosMock from './lib/mock'

export type observerKey = 'response' | 'response.error' | 'response.updateToken'

/**
 * ==============================
 *          接 口 定 义
 * ==============================
 */

declare module 'axios/index' {
  export type ConfigApi = typeof API

  interface AxiosResponse {
    /**
     * 是否为mock响应数据
     */
    isMockData?: boolean
  }

  interface AxiosInstance {
    /**
     * 接口
     */
    api: ConfigApi

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
      // eslint-disable-next-line no-use-before-define
      axiosRequest?: AxiosRequestConfig
    ) => Promise<T & AxiosError<T>>

    /**
     * 配置信息
     */
    config: {
      /**
       * 接口
       */
      api: typeof API
      /**
       * 服务器
       */
      server: typeof config
    }

    /**
     * Vue实例
     */
    $vue?: Vue

    /**
     * 权限鉴定
     */
    auth: {
      /**
       * 权限组名
       */
      [key in string]: () => boolean
    }

    /**
     * 监听axios内部事件
     */
    observer: {
      /**
       * 绑定
       * @param key - 事件名
       * @param cb  - 触发体
       */
      emit(key: observerKey, cb: (param: AxiosResponse) => void): AxiosInstance
      /**
       * 解绑
       * @param key - 事件名
       * @param cb  - 触发体
       */
      off(key: observerKey, cb: (param: AxiosResponse) => void): AxiosInstance
    }

    /**
     * mock接口
     */
    mock: AxiosMock
  }

  interface AxiosRequestConfig {
    api?: string

    /**
     * 是否携带cookie
     */
    appendCookie?: boolean
  }
}

/**
 * ==============================
 *        vue 接 口 扩 展
 * ==============================
 */

declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosInstance
  }
}

interface AxiosService {
  send: <T>(
    api: string,
    axiosRequest?: AxiosRequestConfig | undefined
  ) => {
    get: (res?: AxiosRequestConfig) => Promise<T>
    post: (res?: AxiosRequestConfig) => Promise<T>
    delete: (res?: AxiosRequestConfig) => Promise<T>
    put: (res?: AxiosRequestConfig) => Promise<T>
    then: (res?: T) => Promise<T>
    async: (res?: T) => Promise<T>
  }
}

export type AxiosSend = AxiosService['send']
