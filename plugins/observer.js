import Vue from 'vue'
let list = {}

Vue.prototype.observer = {
  // 订阅
  on(key, callback, point) {
    const slef = this
    if (!callback) throw Error(`observer $on ${key} param no callback!`)
    if (!list[key]) list[key] = []

    point && callback.bind(point)
    list[key].push(callback)
  },

  // 发布
  emit(key, val) {
    const taskList = list[key]
    if (taskList) {
      for (let i = 0, len = taskList.length; i < len; i++) {
        taskList[i](val)
      }
    }
  }
}