<template>
  <div>
    <div :class="['toast', { show: item.show }]" v-for="(item, index) in task" :key="index" :style="'top:' + (80 + (index * 140)) + 'px'">

      <!-- 内容区域 -->
      <div class="tag">
        <i :class="'iconfont icon-' + item.icon"></i>
        <span v-text="item.title"></span>
        <i class="iconfont icon-guanbi-xianxing"></i>
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
      // title: '系统通知',
      // icon: 'gonggao-xianxing',
      // text: '欢迎访问史莱姆的博客!',
      // time: 2000,
      // show: !1,
      // select: [
      //   {
      //     value: '是',
      //     action: function () {
      //       console.log('按下了 是')
      //     }
      //   },
      //   {
      //     value: '否',
      //     action: function () {
      //       console.log('按下了 否')
      //     }
      //   }
      // ]
      task: []
    }
  },
  mounted () {
    const that = this

    that.observer.on('toast', obj => {
      const newToast = {
        title: obj.title || '系统通知',
        icon: obj.icon || 'gonggao-xianxing',
        text: obj.text || '欢迎访问史莱姆的博客!',
        time: obj.time || 2000,
        show: !1,
        select: obj.select || []
      }
      this.task.push(newToast)
      setTimeout(() => {
        newToast.show = !0
      }, 100)
      console.log(obj)
    })
  },
  methods: {

    /* 互动区 点击处理 */
    selectClick (e) {
      const id = e.target.dataset.id
      const select = this.select

      if (id && select[id]) {
        const item = select[id]
        item.action.call(item.that ? item.that : this)
      }
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
      // animation: 1.5s .5s toast ease-in-out infinite alternate;
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
      color: #ccc;

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
      color: #888;
    }

    .select {
      position: absolute;
      bottom: 0;
      left: 0;
      display: -webkit-flex;
      display: flex;
      height: 40px;
      width: 100%;
      align-items: center;
      border-top: 1px solid #ddd;
      .user-none();

      .button {
        flex: 1;
        text-align: center;
        color: #888;

        &:not(:last-child) {
          border-right: 1px solid #ddd;
        }

        &:active {
          color: #333;
        }
      }
    }
  }
</style>
