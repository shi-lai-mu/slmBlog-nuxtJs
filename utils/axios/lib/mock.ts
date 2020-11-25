export default class AxiosMock {

  private _axios: any;

  private _mocked: Array<{ [key: string]: string }> = [];

  constructor(axios: any) {
    this._axios = axios;
  }

  /**
   * 注册mock请求[适配三方MockJs]
   * @param rurl      URL
   * @param rtype     请求类型
   * @param template  数据模板
   * @param response  响应头
   */
  reg(rurl: string | RegExp, rtype: string, template?: any, response?: any) {
    if (rurl instanceof RegExp) {
      rurl = String(rurl).replace(/\\\//g, '/').replace(/(^\/|\/$)/g, '').replace(/\\(d|D|S|w|W)\+/g, ':params');
    }
    this._mocked[`${rtype || 'get'}.${rurl}`] = {
      template,
      response,
    };
    return this._axios;
  }

  
  /**
   * 检测URL是否包含mock数据
   * @param rurl 接口URL
   */
  has(rurl: string) {
    return this._mocked[rurl] || false; 
  }

}
