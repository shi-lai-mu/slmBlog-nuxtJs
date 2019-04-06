<template>
  <div>
    <div :class="['toast', { show: item.show }, { action: item.action }, item.icon]" v-for="(item, index) in task" :key="index" :style="'top:' + (80 + (index * 140)) + 'px'">

      <!-- 内容区域 -->
      <div class="tag">
        <i :class="'iconfont icon-' + item.icon"></i>
        <span v-text="item.title"></span>
        <i class="iconfont icon-guanbi-xianxing" @click="close" :data-id="index"></i>
      </div>
      <div class="content" v-html="item.text"></div>

      <!-- 互动区域 -->
      <div class="select" v-show="item.select.length" @click="selectClick" :data-parent="index">
        <div class="button" v-for="(item, id) in item.select" :key="id" :data-id="id">{{ item.value }}</div>
      </div>

    </div>
  </div>
</template>

<script>
/**
 * Toast 组件： 负责消息通知
 */
export default {
  data () {
    return {
      task: []
    }
  },
  mounted () {
    const that = this

    that.observer.on('toast', obj => {
      const newToast = {
        title: obj.title || '系统通知',
        icon: obj.icon || 'gonggao-xianxing',
        text: obj.text || '信息获取错误',
        time: obj.time === undefined ? 2500 : obj.time,
        action: obj.action || !1,
        show: !1,
        select: obj.select || []
      }

      // 自动识别为错误警告
      if (obj.error) {
        newToast.icon = 'wrong'
        newToast.title = '系统警告'
        newToast.text = obj.error
        newToast.time = 4000
      }

      // 加入显示列队
      const index = this.task.push(newToast)

      setTimeout(() => {
        // 渲染完显示
        newToast.show = !0
        // 几秒后消失 如果 time为false则等待关闭状态
        newToast.time !== false && setTimeout(() => that.close(index - 1), newToast.time)
      }, 100)
    })
  },
  methods: {

    /* 互动区 点击处理 如果执行函数返回true则关闭窗口 */
    selectClick (e) {
      const id = e.target.dataset.id
      const parent = e.target.parentElement.dataset.parent

      const select = this.task[parent].select

      if (id && select[id]) {
        const item = select[id]
        const cb = item.action.call(item.that ? item.that : this)
        cb && this.close(id - 1)
      }
    },

    /* 关闭 */
    close (e) {
      const id = isNaN(e) ? e.target.dataset.id : e
      this.task[id].show = !1
      setTimeout(() => {
        this.task.splice(id, 1)
      }, 400)
    }
  }
}
</script>

<style lang="less">
  .toast {
    position: fixed;
    right: 10px;
    top: 80px;
    width: 300px;
    height: 125px;
    z-index: 9999;
    padding: 10px 10px 50px 10px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, .95);
    border-radius: 5px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .2);
    transition: .5s;
    transform: translateX(150%);

    &.show {
      transform: translateX(0);
    }
    &.action {
      animation: 1.5s .5s toast ease-in-out infinite alternate;
    }
    /* 颜色 */
    &.wrong {
      background-color: #ffa7a1;
      color: red;
    }
    &.success,
    &.zhiwen {
      background-color: #a7ffab;
      color: #00b12c;
    }

    .user-none {
      -webkit-user-select: none;
        -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
    }

    .icon-guanbi-xianxing {
      float: right;
      font-size: .9rem;
      font-weight: bold;

      &:active {
        color: #333;
      }
    }

    @keyframes toast {
      to {
        transform: translateY(5px);
      }
    }

    .tag {
      margin-bottom: 10px;
      .user-none();
    }

    .content {
      text-indent: 1.5rem;
    }

    .select {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      height: 40px;
      width: 100%;
      align-items: center;
      border-top: 1px solid currentColor;
      .user-none();

      .button {
        display: flex;
        flex: 1;
        height: 100%;
        align-items: center;
        justify-content: center;

        &:not(:last-child) {
          border-right: 1px solid currentColor;
        }

        &:active {
          color: #333;
          background-color: rgba(0, 0, 0, .1);
        }
      }
    }
  }
</style>
