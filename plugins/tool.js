/**
 * 权限判断
 * @param {string} to 路由名
 * @param {*} cb 回调(返回目录， 是否有权限跳转)
 * @return 是否有权限跳转
 */
const permissions = (to, cb) => {
  // let user = JSON.parse(localStorage.getItem('userInfo'))
  let user = false
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

/**
 * 时间戳转换为指定的时间格式
 * @param {string} fmt 转换后的日期格式
 * @param {number} form 时间戳,默认目前时间
 * @return {string} 带格式的时间
 */
const form = (fmt, form) => {
  let date = form ? new Date(form) : new Date()
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  let week = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
  }
  let season = {
    1: '春',
    2: '夏',
    3: '秋',
    4: '冬'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay() +
      ''])
  }
  if (/(q+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, season[o['q+']] + ((RegExp.$1.length > 1) ? '季' : ''))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 计算 距离结束 还有多长带单位
 * @param {number} time 结束时间
 * @param {number} startTime 开始时间
 * @return {string} 带单位的时间
 */
const unForm = (time, startTime) => {
  time -= startTime || new Date()
  time /= 1000
  time < 0 && (time = -(time))
  let r = `时间转换失败: ${time}`
  if (time < 60) {
    r = time + '秒'
  } else if (time >= 60 && time < 3600) {
    r = Math.floor(time / 60) + '分' + Math.floor(time % 60) + '秒'
  } else if (time >= 3600 && time < 86400) {
    r = Math.floor(time / 3600) + '小时' + Math.floor((time % 3600) / 60) + '分'
  } else if (time >= 86400 && time < 2592000) {
    r = Math.floor(time / 86400) + '天' + Math.floor((time % 86400) / 3600) + '小时' + Math.floor(((time % 86400) %
      3600) / 60) + '分' + Math.floor((((time % 86400) % 3600) % 60) % 60) + '秒'
  } else if (time >= 2592000 && time < 31104000) {
    r = Math.floor(time / 2592000) + '个月' + Math.floor((time % 2592000) / 86400) + '天' + Math.floor(((time %
      2592000) % 86400) / 3600) + '小时' + Math.floor((((time % 2592000) % 86400) % 3600) / 60) + '分' + Math.floor(
      ((time % 86400) % 3600) % 60 % 60) + '秒'
  } else if (time >= 31104000) {
    r = Math.floor(time / 31104000) + '年' + Math.floor((time % 31104000) / 2592000) + '个月' + Math.floor(((time %
        31104000) % 2592000) / 86400) + '天' + Math.floor((((time % 31104000) % 2592000) % 86400) / 3600) + '小时' +
      Math.floor(((((time % 31104000) % 2592000) % 86400) % 3600) / 60) + '分' + Math.floor((((((time % 31104000) %
        2592000) % 86400) % 3600) % 60) % 60) + '秒'
  }
  return r
}

/**
 * 将时间转为 00:00 或 00:00.00 格式
 * @param {number} time 时间
 * @param {number} fixed 是否带毫秒
 */
const utfc = (time, fixed = 0) => {
  let num = (time % 60).toString()
  let num2 = fixed ? num.substring(0, num.indexOf('.') + 3) : Math.ceil(num)
  return ('00' + Math.floor(time / 60)).slice(-2) + ':' + ('00' + num2).slice((fixed > 0 ? -3 - fixed : -2))
}


export {
  permissions,
  unForm,
  form,
  utfc
}
