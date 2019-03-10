// 代理 API 接口

const IP = 'http://127.0.0.1:8080/'

const handler = {
  get (target, name) {
    const value = target[name]
    if (!value) throw Error(`Axios [${name}] API not exist!`)
    return value.search('//') >= 0 ? value : IP + value
  },
  set(target, name, value) {
    return
  }
}

export default new Proxy({

  // 首页热门
  HOME_HOT: 'blog/hot',
  // 首页右侧
  HOME_RIGHT: 'blog/right',
  
}, handler)