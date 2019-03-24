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
    if (typeof user === 'string') user = JSON.parse(user)
    store.user = user
  }
}
