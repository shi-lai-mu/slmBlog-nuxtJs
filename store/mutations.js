export default {

  // 设置首页文章模式
  SET_ARTICLE_MODEL (store, data) {
    store.articleModel = data
  },

  // 清空文章模式
  CLEAR_ARTICLE_MODEL (store) {
    store.articleModel = {}
  },

  // 设置是否为移动端
  MOBILE (store, mobile) {
    store.mobile = mobile
  },

  // 设置用户信息
  SET_USER (store, user) {
    if (typeof user === 'string' && user !== 'undefined') {
      if (user === 'default') {
        user = {
          username: '史莱姆',
          img: '//thirdqq.qlogo.cn/g?b=sdk&k=s3zxCIMMOxfQibT9H8la8zg&s=100'
        }
      } else {
        user = JSON.parse(user)
      }
    } else if (typeof user === 'object') {
      localStorage.setItem('userInfo', JSON.stringify(user))
    }
    this.$router.user = user
    store.user = user
  }
}
