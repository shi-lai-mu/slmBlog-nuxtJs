// 代理 API 接口
import Vue from 'vue'
const IP = {
  main: 'http://127.0.0.1:8080/',
  uploadImg: 'http://127.0.0.1/img/upload/'
}

const handler = {
  get (target,  key, receiver) {
    const value = Reflect.get(target, key, receiver);
    if (!value) throw Error(`Axios [${ key }] API not exist!`)
    return (!value.search || value.search('//') >= 0) ? value : IP.main + value
  }
}

const API = {
  // 首页热门
  HOME_HOT: 'blog/hot',
  // 首页右侧
  HOME_RIGHT: 'blog/right',
  
  /* IP 接口 */
  IP
}

export default new Proxy(API, handler)
Vue.prototype.$API = API
