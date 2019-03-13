/**
 * 数据处理
 */
import API from './API'

export default {
  // 首页热门
  HOME_HOT (data) {
    for (let i = 0, len = data.list.length; i < len; i ++) {
      const val = data.list[i]
      val.type = val.type.split('#')
      val.type.shift()
      
      if (val.img.indexOf('//') === -1) {
        val.img = API.IP.uploadImg + val.img
      }
    }
    return data
  },

  // 文章内容
  ARTCILE_CONTENT (data) {
    data.type = data.type.split('#')
    data.type.shift()
    return data
  }
}