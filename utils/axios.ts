/**
 * Axios 请求二次封装 ts版本[未启用加密版]
 */

// import vue from 'vue'
import axios from 'axios'
// get数据
import axiosQs from 'qs'
// api调用
import API from '../config/axios.api.config'
// 配置文件
import config from '../config/default.config'

let token = false
const isServer = process.title === 'node'

// 创建axios实例
const $axios = axios.create({
  baseURL: config.server.apiHost,
  timeout: 15000,
  // withCredentials: true
})

$axios.interceptors.response.use(
  (res: any) => {
    const { data } = res
    // token 自动化更新
    if (data.token) {
      token = data.token
    }
    return data
  },
)

$axios.interceptors.request.use(
  (value) => {
    const data = value.data

    if (!token && !isServer) {
      const storage = JSON.parse(localStorage.getItem('user') || '{}')
      token = storage.token
    }
    if (token) {
      value.headers.token = encodeURIComponent(token)
    }

    if (data) {
      // RSA 加密处理
      const rsa = data.rsa
      delete value.data.rsa
      for (const key in rsa) {
        if (rsa[key] && key in data) {
          throw new Error(`RSA.${key} there is Data in the!`)
        }
      }

      // GET 数据处理
      if (value.method === 'get') {
        value.url += `?${axiosQs.stringify(data)}`
        value.data = ''
      }
    }

    // post 处理
    const postData = value.data
    if (value.method !== 'get' && postData.api) {
      value.data = {
        token,
        ...value.data.data,
      }
      delete value.data.api
    }

    // 路径参数
    const params = value.params || (data && data.params)
    if (params && value.url) {
      for (const key in params) {
        if (params[key] !== undefined) {
          value.url = value.url.replace(`:${key}`, params[key])
        }
      }
      delete value.params
      delete data.params
    }
    return value
  },
)

declare module 'axios/index' {
  interface AxiosInstance {
    api: (api: (string | { data: any; key: string; })) => {
      get: (res?: any) => Promise<any>;
      post: (res: any) => Promise<any>;
      delete: (res: any) => Promise<any>;
      put: (res: any) => Promise<any>;
      file: (form: any, headers: any) => Promise<any>;
      cache?: (res: any) => Promise<any>;
      then: (res: any) => Promise<any>;
    };
  }

  interface AxiosRequestConfig {
    api?: string | { data: any; key: string; };
  }
}

interface ResData {
  [key: string]: any
}

/**
 * axios API request
 * @param {string/object} api API库内的键
 * @return 链式操作请求方式，内部传入与axios相同，排除第一个URL
 */
$axios.api = (api: (string | { data: any; key: string; })) => {
  let URL: string = typeof api === 'string'
    ? API[api]
    : api.key

  // 动态API
  if (typeof api === 'object' && URL) {
    URL = API[api.key]
    for (const key in api.data) {
      if (api.data[key]) {
        const data = api.data[key]
        URL = URL.replace(`:${key}`, data)
      }
    }
    api = api.key
  }

  return {
    get: (res: (ResData | any) = {}) => $axios.get(URL, { api, ...res }),
    delete: (res: (ResData | any) = {}) => $axios.delete(URL, { api, ...res }),
    post: (res: ResData) => $axios.post(URL, { api, ...res }),
    put: (res: ResData) => $axios.put(URL, { api, ...res }),
    file: (form, headers) => $axios.post(URL, { api, ...form }, headers),
    then: async (res: any)  => await $axios.get(URL, { api }).then(res)
    // cache: res => $axios.cache(URL, { api, ...res })
  }
}

export default $axios
