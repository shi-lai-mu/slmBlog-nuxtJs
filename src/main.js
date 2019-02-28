import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import Meta from 'vue-meta'
import router from './router'
import VueLazyload from 'vue-lazyload'
import http from '@pub/js/http'
import connecter from '@pub/js/connecter'
import Music from '@pub/vue/music/Music'

Vue.prototype.$http = http
Vue.prototype.$connecter = connecter
Vue.use(VueX)
Vue.use(VueLazyload, {
  preLoad: 6,
  error: '//res.mczyzy.cn/img/error.png',
  loading: '//res.mczyzy.cn/img/loading.gif',
  attempt: 5
})
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta'
})
Vue.config.productionTip = false

const store = new VueX.Store({
  state: {
    // 用户数据
    user: {
      username: '史莱姆',
      img: '//thirdqq.qlogo.cn/g?b=sdk&k=s3zxCIMMOxfQibT9H8la8zg&s=100'
    },
    // 是否为移动端[小屏幕]
    mobile: false,
    // 文章显示模式
    articleModel: {},
    // 音乐控件
    Music: new Music(),
    // GET请求数据缓存
    GET: {}
  }
})

// 路由后处理
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  // 百度推送 [三秒后推送]
  setTimeout(() => {
    if (window.location.host !== '127.0.0.1') {
      (function () {
        let bp = document.createElement('script')
        bp.src = '//push.zhanzhang.baidu.com/push.js'
        let s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(bp, s)
      })()
    }
  }, 3000)
})

// 路由前处理
router.beforeEach((to, from, next) => {
  to.matched.map(item => {
    let auth = item.meta.requireAuth
    if (auth) {
      let name = false
      let query = {}
      router.options.permissions(auth, (res, ok) => {
        if (!ok) {
          name = res
          if (res === 'login') {
            query = {
              redirect: to.fullPath
            }
          }
        }
      })
      if (name) {
        next({ name, query })
      } else next()
    } else next()
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
