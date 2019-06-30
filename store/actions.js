export default {

  async ARTICLE_MODEL ({ commit }, model) {
    commit('SET_ARTICLE_MODEL', model)
  },

  async IS_MOBILE ({ commit }, width) {
    console.log(window.navigator)
    commit('MOBILE', width < 840 || /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent))
  },

  async USER ({ commit }, user) {
    commit('SET_USER', user)
  }
}
