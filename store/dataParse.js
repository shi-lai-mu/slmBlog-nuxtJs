/**
 * 数据处理
 */
import API from './API'
import * as tool from '~/plugins/tool'

export default {
  // 首页热门
  HOME_HOT (data) {
    for (let i = 0, len = data.list.length; i < len; i++) {
      const val = data.list[i]
      val.type = val.type.split('#')
      val.type.shift()

      if (val.img && val.img.indexOf('//') === -1) {
        val.img = API.IP.uploadImg + val.img
      }
    }
    return data
  },

  // 文章内容
  ARTCILE_CONTENT (data) {
    if (data.type) {
      data.type = data.type.split('#')
      data.type.shift()
      if (data.img && data.img.indexOf('//') === -1) {
        data.img = API.IP.uploadImg + data.img
      }
      return data
    }
  },

  // 个人中心 热门文章
  USER_ALL_ARTCILE (data) {
    data = data.map(index => {
      // 图片域名
      if (index.img && index.img.indexOf('//') === -1) {
        index.img = API.IP.uploadImg + index.img
      }
      // 时间
      index.createTime = tool.form('yyyy-MM-dd HH:mm:ss', index.createTime * 1000)
      return index
    })
    return data
  }
}
