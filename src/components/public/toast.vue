<template>
  <div :class="['toast',{'show': show}]">
    <div :class="{'select' : msg.select}">
      <i v-if="msg._icon" :class="'iconfont icon-' + msg._icon"></i>
      <p>{{msg._text}}</p>
    </div>

    <!-- <div class="{{msg._type}}" bindtap='selectClick'>
      <button :for="{{msg.select}}" :key="**this" class='{{item.color}}' data-fn="{{item._fn}}">{{item.p}}</button>
    </div> -->
  </div>
</template>

<script>
let Task = []
let show = null
let hide = null
let fn = []
let vue = null
let icon = {
  error: 'wrong',
  success: 'chenggong',
  warning: 'jinggao',
  loading: 'loading',
  zhiwen: 'zhiwen',
  saoma: 'saoma'
}

export default {
  props: ['toast'],
  data () {
    return {
      show: false,
      msg: {}
    }
  },
  created () {
    vue = this
  },
  watch: {
    toast (v, c) {
      console.log(v, c)
      let Toast = new Message(this.toast)
      // 如果 没有正在显示的Toast则 显示 否则 如果是无限期显示的Toast则隐藏后显示
      !show ? Toast.send() : !show.data.hide && show.hide()
    }
  }
}

function Message (data) {
  if (typeof data !== 'object') throw Error('data 必须为 Object!')
  // 隐藏时间或持续显示 否则 1500ms 后消失
  data.hideTime = (data.hideTime || data.hideTime === false) ? data.hideTime : 2500
  // 修复耦合度 短时间内最多重复两条相同消息
  if (Task.length) {
    let t = Task[Task.length - 1]
    if (t.text === data.text && t.icon === icon[data.icon]) return
  }
  Task.push({
    text: data.text,
    icon: icon[data.icon] || '',
    back: data.icon,
    hide: data.hideTime,
    callback: data.callback,
    select: data.select || false
  })
}

Message.prototype = {
  data: {},
  // 显示Toast
  send: function () {
    let after = Task[0]
    if (after && !show) {
      // 记录触发函数
      for (let key in after['select']) {
        let val = after['select'][key]
        after['select'][key]._fn = val.click ? fn.push(val.click) : false
      }
      // 如果Toast不是false则有消失时间
      after['hide'] && (vue.show = setTimeout(Message.prototype.hide, after['hide']))
      show = this
      console.log(after['icon'])
      // 触发驱动
      vue.msg = {
        _text: after['text'],
        _type: after['back'],
        _icon: after['icon'],
        select: after['select']
      }
      show.data = after
      Task.shift()
    }
  },

  // 隐藏Toast
  hide: function () {
    vue.show = false
    show.data.callback && show.data.callback()
    // 清空显示
    show = null
    // 400毫秒后检测列队
    setTimeout(Message.check, 400)
  }
}

Message.check = function () {
  if (Task[0]) !show ? Message.prototype.send() : !show.data.hide && Message.prototype.hide()
}

</script>

<style lang="less">
.toast {
  position: fixed;
  bottom: 5vh;
  right: 0;
  min-width: 15vw;
  line-height: 5vh;
  padding: 0 10px;
  border-radius: 5px 0 0 5px;
  background-color: #fff;
  box-shadow: 5px 10px 5px -5px rgba(0, 0, 0, .3);
  transition: 1s;
  transform: translateX(100%);
}

.select {
  animation: 0.5s 1s marTop;
  animation-fill-mode: forwards;
}

@keyframes marTop {
  to {
    bottom: calc(10vh + 30rpx);
  }
}
.show {
  transform: translateX(0);
}

.toast.error {
  background-color: #ffa7a1;
  color: red;
}

.toast.success {
  background-color: #a7ffab;
  color: #00b12c;
}

.toast.warning {
  background-color: #ffcb9a;
  color: #cc7400;
}

.toast.zhiwen, .saoma {
  background-color: #aafff4;
  color: #0087b1;
}

.toast.loading {
  background-color: #aeadff;
  color: #0003a8;
}

.toast icon {
  margin: 0 10px;
  vertical-align: middle;
  font-size: 25px;
}

.toast text {
  vertical-align: middle;
  font-size: 15px;
}

.select + .toast {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 10vw;
  min-width: 50vw;
  max-height: 0;
  padding: 0 10rpx;
  animation: 0.5s 1s maxH;
  animation-fill-mode: forwards;
}

@keyframes maxH {
  to {
    transform: translateX(0);
    max-height: 10vw;
  }
}

.toast button {
  display: inline-block;
  padding: 5rpx 10rpx;
  line-height: 5vh;
  color: white;
}

.toast button.green {
  background-color: #00b100;
}

.toast button.red {
  background-color: #f11c1c;
}

.toast button {
  background-color: #999;
}
</style>
