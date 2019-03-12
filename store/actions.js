import api from './API'

export default {

  async ARTICLE_MODEL ({ commit }, model) {
    commit('SET_ARTICLE_MODEL', model)
  }
}