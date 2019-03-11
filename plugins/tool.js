/**
 * 权限判断
 * @param {string} to 路由名
 * @param {*} cb 回调(返回目录， 是否有权限跳转)
 * @return 是否有权限跳转
 */
const permissions = (to, cb) => {
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

export {
  permissions
}
