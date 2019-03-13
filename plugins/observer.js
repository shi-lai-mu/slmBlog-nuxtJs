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
    for (let i = 0, len = taskList.length; i < len; i++) {
      taskList[i](val)
    }
  }
  
 }
// const MyPlugin = {}
// 
// MyPlugin.install = function (Vue, options) {
//   // 1. 添加全局方法或属性
//   Vue.myGlobalMethod = function () {
//     // 逻辑...
//   }
// 
//   // 2. 添加全局资源
//   Vue.directive('my-directive', {
//     bind (el, binding, vnode, oldVnode) {
//       // 逻辑...
//     }
//   })
// 
//   // 3. 注入组件
//   Vue.mixin({
//     created: function () {
//       // 逻辑...
//     }
//   })
// 
//   // 4. 添加实例方法
//   Vue.prototype.$myMethod =  {
//     // 逻辑...
//     cxx () {
//       onsole.log(132456);
//     }
//   }
// }
// Vue.use(MyPlugin)