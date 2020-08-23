import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const createStore = () => new Vuex.Store({
  state: () => ({
    // 用户数据
    user: {},
    // 是否为移动端[小屏幕]
    mobile: false,
    // 文章显示模式
    articleModel: {},
    Music: {}
  }),
  actions,
  mutations
})

export default createStore
