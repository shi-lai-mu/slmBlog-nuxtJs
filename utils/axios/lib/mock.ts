import { AxiosInstance } from 'axios/index'

export default class AxiosMock {
  private _axios: AxiosInstance

  private _mocked: { [key: string]: { template: string; response: string } } = {}

  constructor(axios: AxiosInstance) {
    this._axios = axios
  }

  /**
   * 注册mock请求[适配三方MockJs]
   * @param rurl      URL
   * @param rtype     请求类型
   * @param template  数据模板
   * @param response  响应头
   */
  reg(rurl: string | RegExp, rtype: string, template = '', response = '') {
    if (rurl instanceof RegExp) {
      rurl = String(rurl)
        .replace(/\\\//g, '/')
        .replace(/(^\/|\/$)/g, '')
        .replace(/\\(d|D|S|w|W)\+/g, ':params')
    }
    const key = `${rtype || 'get'}.${rurl}`
    this._mocked[key] = {
      template,
      response,
    }
    return this._axios
  }

  /**
   * 检测URL是否包含mock数据
   * @param rurl 接口URL
   */
  has(rurl: string) {
    return this._mocked[rurl] || false
  }
}
