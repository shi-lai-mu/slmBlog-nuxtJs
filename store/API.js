// 代理 API 接口
import Vue from 'vue'
import config from '~/config/default'

const handler = {
  get(target, key, receiver) {
    let value = Reflect.get(target, key, receiver)
    if (typeof value !== 'string' && key !== 'IP') return false
    if (!value) throw Error(`Axios [${ key }] API not exist!`)
    
    typeof value === 'string' && (value = encodeURI(value))
    return (!value.search || value.search('//') >= 0) ? value : config.server.main + value
  }
}

export default new Proxy(config.API, handler)
Vue.prototype.$API = config.API
