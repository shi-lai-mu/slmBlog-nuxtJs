// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import VueMeta from 'vue-meta'
import router from './router'
import http from '@pub/http'
import header from '@pub/header'
import footer from '@pub/footer'
import title from '@pub/title'
// import connecter from '@pub/connecter'

Vue.prototype.$http = http
Vue.use(VueX, VueMeta)

Vue.config.productionTip = false
Vue.component('vueHeader', header)
Vue.component('vueFooter', footer)
Vue.component('vueTitle', title)

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
