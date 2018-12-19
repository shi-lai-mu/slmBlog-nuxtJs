// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import header from '@com/public/header'
import footer from '@com/public/footer'
import title from '@com/public/title'

Vue.config.productionTip = false
Vue.component('vueHeader', header)
Vue.component('vueFooter', footer)
Vue.component('vueTitle', title)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
