import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      // 用户数据
      user: {
        username: '史莱姆',
        img: '//thirdqq.qlogo.cn/g?b=sdk&k=s3zxCIMMOxfQibT9H8la8zg&s=100'
      },
      // 是否为移动端[小屏幕]
      mobile: false,
      // 文章显示模式
      articleModel: {},
      Music: {}
    }),
    actions,
    mutations
  })
}

export default createStore
