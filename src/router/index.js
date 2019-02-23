import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@com/Home/index'], resolve)
    },
    // 文章路由
    {
      path: '/article',
      component: resolve => require(['@pub/vue/parentRouter'], resolve),
      children: [
        {
          path: 'editArticle',
          name: 'editArticle',
          meta: {
            requireAuth: 'admin'
          },
          component: resolve => require(['@com/article/editArticle'], resolve)
        },
        {
          path: 'againEditor',
          name: 'againEditor',
          meta: {
            requireAuth: 'login'
          },
          component: resolve => require(['@com/article/editArticle'], resolve)
        },
        {
          path: ':id',
          name: 'article',
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
          path: 'center',
          name: 'userCenter',
          component: resolve => require(['@com/user/center'], resolve)
        },
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
        },
        {
          path: 'friendship',
          name: 'friendship',
          component: resolve => require(['@com/other/friendship'], resolve)
        }
      ]
    },
    {
      path: '*',
      name: 'error',
      component: resolve => require(['@pub/vue/error'], resolve)
    }
  ],

  /**
   * 权限判断
   * @param {string} to 路由名
   * @param {*} cb 回调(返回目录， 是否有权限跳转)
   * @return 是否有权限跳转
   */
  permissions: function (to, cb) {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    let name = false
    if (to === 'login' && !user) {
      // 未登录
      name = 'login'
    } else if (to === 'register' && user) {
      // 已登录
      name = 'home'
    } else if (to === 'admin' && (!user || user.groupid !== 9999)) {
      // 非管理
      name = 'home'
    }
    cb && cb(name, !name)
    return !name
  }
})
