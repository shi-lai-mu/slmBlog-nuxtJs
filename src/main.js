// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import App from './App'
import VueMeta from 'vue-meta'
import router from './router'
import VueResource from 'vue-resource'
import header from '@pub/header'
import footer from '@pub/footer'
import title from '@pub/title'
// import connecter from '@pub/connecter'

Vue.use(VueMeta)
Vue.use(VueResource)
Vue.use(VueX)

Vue.config.productionTip = false
Vue.component('vueHeader', header)
Vue.component('vueFooter', footer)
Vue.component('vueTitle', title)

const store = new VueX.Store({
  state: {
    ip: 'mczyzy.cn',
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
