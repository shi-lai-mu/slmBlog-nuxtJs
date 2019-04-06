export default ({ app, store, observer }) => {
  /**
   * 路由权限设置
   */
  app.router.map = {
    // 未登录权限
    register: {
      '/user/admin/login': 'go-1',
      '/user/admin/register': 'go-1'
    },
    // 登录权限
    login: [

    ],
    // 管理员权限
    admin: [

    ]
  }

  const map = app.router.map
  app.router.afterEach(to => {
    const path = to.path
    for (const key in map) {
      const item = map[key]
      // 存在权限内
      const child = item[path]
      if (child) {
        const val = app.router.permissions(key, false)
        if (!val) {
          if (child === 'go-1') {
            app.router.go(-1)
          } else {
            app.router.push({
              name: child
            })
          }
        }
        break
      }
    }
  })

  app.router.user = store.state.user

  /**
   * 权限判断
   * @param {string} to 路由名
   * @param {*} cb 回调(返回目录， 是否有权限跳转)
   * @return 是否有权限跳转
   */
  app.router.permissions = function (to, cb) {
    let user = app.router.user
    let name = false
    if (to === 'login' && !user.token) {
      // 未登录
      name = 'login'
    } else if (to === 'register' && user.token) {
      // 已登录
      name = 'home'
    } else if (to === 'admin' && (!user.token || user.groupid !== 9999)) {
      // 非管理
      name = 'home'
    }
    cb && cb(name, !name)
    return !name
  }
}
