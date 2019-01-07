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
      path: '/article/:id',
      component: resolve => require(['@com/article/index'], resolve)
    },
    {
      path: '/addArticle',
      component: resolve => require(['@com/article/addArticle'], resolve)
    },
    // 其他路由
    {
      path: '/other',
      component: resolve => require(['@pub/vue/parentRouter'], resolve),
      children: [
        {
          path: 'thisSite',
          name: 'thisSite',
          component: resolve => require(['@com/other/thisSite'], resolve)
        },
        {
          path: 'terms',
          name: 'terms',
          component: resolve => require(['@com/other/terms'], resolve)
        }
      ]
    },
    // 用户路由
    {
      path: '/user',
      name: 'user',
      component: resolve => require(['@pub/vue/parentRouter'], resolve),
      children: [
        {
          path: 'login',
          name: 'login',
          component: resolve => require(['@com/user/login'], resolve)
        },
        {
          path: 'register',
          name: 'register',
          component: resolve => require(['@com/user/login'], resolve)
        }
      ]
    },
    {
      path: '*',
      component: resolve => require(['@pub/vue/error'], resolve)
    }
  ]
})
