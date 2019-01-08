import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import router from './router'
import VueMeta from 'vue-meta'
import VueLazyload from 'vue-lazyload'
import http from '@pub/js/http'
import connecter from '@pub/js/connecter'

Vue.prototype.$http = http
Vue.prototype.$connecter = connecter
Vue.use(VueX, VueMeta)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '//120.78.221.235/img/error.png',
  loading: '//120.78.221.235/img/loading.gif',
  attempt: 1
})

Vue.config.productionTip = false

const store = new VueX.Store({
  state: {
    user: false,
    // 是否为移动端[小屏幕]
    mobile: false
  }
})

// 路由后处理
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

// 路由前处理
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('userInfo')
  to.matched.map(item => {
    if (item.meta.requireAuth) {
      let auth = item.meta.requireAuth
      let name = false
      let query = {}
      if (auth === 'login' && !user) {
        // 未登录
        name = 'login'
        query = {
          redirect: to.fullPath
        }
      } else if (auth === 'register' && user) {
        // 已登录
        name = 'home'
      } else if (auth === 'admin' && (!user || user.groupid !== 9999)) {
        // 非管理
        name = 'home'
      }
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
