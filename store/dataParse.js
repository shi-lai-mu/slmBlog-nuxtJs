/**
 * 数据处理
 */
export default {
  // 首页热门
  HOME_HOT (data) {
    for (let i = 0, len = data.list.length; i < len; i ++) {
      const val = data.list[i]
      val.type = val.type.split('#')
      val.type.shift()
    }
    return data
  }
}