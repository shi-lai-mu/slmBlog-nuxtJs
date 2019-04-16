export default {

  async ARTICLE_MODEL ({ commit }, model) {
    commit('SET_ARTICLE_MODEL', model)
  },

  async IS_MOBILE ({ commit }, width) {
    commit('MOBILE', width < 840)
  },

  async USER ({ commit }, user) {
    commit('SET_USER', user)
  }
}
