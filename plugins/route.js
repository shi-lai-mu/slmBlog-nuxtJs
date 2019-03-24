export default ({ app, store }) => {
  /**
   * 路由权限设置
   */
  app.router.map = {
    // 未登录权限
    register: [
      'login',
      'regiser'
    ],
    // 登录权限
    login: [

    ],
    // 管理员权限
    admin: [

    ]
  }

  app.router.afterEach((to, from) => {
    // app.router.push({
    //   name: 'index'
    // })
    // to.matched.map(item => {
    //   let auth = item.meta.requireAuth
    //   if (auth) {
    //     let name = false
    //     let query = {}
    //     app.router.permissions(auth, (res, ok) => {
    //       if (!ok) {
    //         name = res
    //         if (res === 'login') {
    //           query = {
    //             redirect: to.fullPath
    //           }
    //         }
    //       }
    //     })
    //   }
    // })
  })

  app.router.user = store.state.user

  /**
   * 权限判断
   * @param {string} to 路由名
   * @param {*} cb 回调(返回目录， 是否有权限跳转)
   * @return 是否有权限跳转
   */
  app.router.permissions = function (to, cb) {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    let name = false
    if (to === 'login' && !user) {
      // 未登录
      name = 'login'
    } else if (to === 'register' && user) {
      // 已登录
      name = 'home'
    } else if (to === 'admin' && (!user || user.groupid < 9999)) {
      // 非管理
      name = 'home'
    }
    cb && cb(name, !name)
    return !name
  }
}
