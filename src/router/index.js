import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['@com/Home'], resolve)
    },
    {
      path: '/thisSite',
      component: resolve => require(['@com/thisSite'], resolve)
    },
    {
      path: '/terms',
      component: resolve => require(['@com/terms'], resolve)
    },
    {
      path: '/login',
      component: resolve => require(['@com/login'], resolve)
    },
    {
      path: '*',
      component: resolve => require(['@com/error'], resolve)
    }
  ]
})
