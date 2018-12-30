// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import VueMeta from 'vue-meta'
import router from './router'
import http from '@pub/http'
import connecter from '@pub/connecter'

Vue.prototype.$http = http
Vue.prototype.$connecter = connecter
Vue.use(VueX, VueMeta)

Vue.config.productionTip = false

const store = new VueX.Store({
  state: {
    user: false
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
