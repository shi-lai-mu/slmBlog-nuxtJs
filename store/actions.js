import api from './API'

export default {

  async GET_HOME_DATA (store) {
    const { data } = await this.$axios.get(api.HOME_HOT)

    store.commit('SET_HOME_DATA', data)
  }
}