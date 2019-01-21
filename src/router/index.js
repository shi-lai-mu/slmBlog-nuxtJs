import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@com/Home'], resolve)
    },
    // 文章路由
    {
      path: '/article',
      name: 'article',
      component: resolve => require(['@pub/vue/parentRouter'], resolve),
      children: [
        {
          path: 'addArticle',
          name: 'addArticle',
          meta: {
            requireAuth: 'login'
          },
          component: resolve => require(['@com/article/addArticle'], resolve)
        },
        {
          path: 'againEditor',
          name: 'againEditor',
          meta: {
            requireAuth: 'login'
          },
          component: resolve => require(['@com/article/addArticle'], resolve)
        },
        {
          path: ':id',
          component: resolve => require(['@com/article/index'], resolve)
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
          meta: {
            requireAuth: 'register'
          },
          component: resolve => require(['@com/user/login'], resolve)
        },
        {
          path: 'register',
          name: 'register',
          meta: {
            requireAuth: 'register'
          },
          component: resolve => require(['@com/user/login'], resolve)
        }
      ]
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
        },
        {
          path: 'message',
          name: 'message',
          component: resolve => require(['@com/other/terms'], resolve)
        }
      ]
    },
    {
      path: '*',
      name: 'error',
      component: resolve => require(['@pub/vue/error'], resolve)
    }
  ]
})
