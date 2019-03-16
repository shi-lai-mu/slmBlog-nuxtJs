// 代理 API 接口
import Vue from 'vue'
const IP = {
  main: 'https://api.slmblog.com/',
  img: 'https://img.slmblog.com/'
}
IP.uploadImg = IP.img + '/img/upload/'

const handler = {
  get(target, key, receiver) {
    let value = Reflect.get(target, key, receiver)
    if (typeof value !== 'string' && key !== 'IP') return false
    if (!value) throw Error(`Axios [${ key }] API not exist!`)
    
    typeof value === 'string' && (value = encodeURI(value))
    return (!value.search || value.search('//') >= 0) ? value : IP.main + value
  }
}

const API = {
  // 首页 热门 右侧
  HOME_HOT: 'blog/hot',
  HOME_RIGHT: 'blog/right',
  HOME_NOTICE: 'blog/special/1?tag=公告',
  HOME_TOP: 'blog/special/1?tag=置顶',
  
  // 文章 内容
  ARTCILE_CONTENT: 'article/:id',

  // 友情链接
  FIRENDSHIP: 'blog/friendship',
  
  /* IP 接口 */
  IP
}

export default new Proxy(API, handler)
Vue.prototype.$API = API
