<template>
  <div class="bottom-music">

    <!-- 浮动列表 -->
    <div :class="['music-list', { 'list-show': floatList }]">

      <div class="blur-bg">
        <img v-if="info.img != 'http://res.mczyzy.cn/LOGO.png'" :src="info.img" alt="">
      </div>

      <!-- 顶部选项卡 -->
      <ul class="right-select-top" :style="'color: ' + iconColor" @click="selectTab">
        <li v-for="(v, i) in pages" :key="i" :class="{ focus: currentTab == i }" :data-i="i">
          <i :class="['iconfont', i]"></i>
        </li>
      </ul>

      <!-- 底部选项卡 -->
      <ul class="right-select-bottom" :style="'color: ' + iconColor" @click="selectTab">
        <li v-for="(v, i) in tools" :key="i" :class="{ focus: currentTab == i }" :data-i="i">
          <i :class="['iconfont', i]"></i>
        </li>
      </ul>

      <!-- 内容页 -->
      <keep-alive>
        <component :is="pages[currentTab]" ref="pages"></component>
      </keep-alive>
    </div>

    <!-- 底部浮动 -->
    <div :class="['music-float', { 'float-show': floatState }]" @click="toggleList" ref="musicConsole">

      <div class="progress" @click="progress">
        <div class="progress-load" data-on="progress"></div>
      </div>

      <img class="music-icon" :src="info.img" alt="音乐封面">

      <span class="music-title" v-text="info.tag"></span>

      <span class="music-right" @click="musicConsole">
        <i class="iconfont icon-up-copy" data-on="up"></i>
        <i class="iconfont icon-zanting1" data-on="toggle"></i>
        <i class="iconfont icon-next" data-on="down"></i>
        <i class="iconfont icon-fangxiangxia right-toggle" @click="toggleFloat"></i>
      </span>
      <audio :src="info.src" ref="music" autoplay></audio>
    </div>
  </div>
</template>

<script>
import Home from '@pub/vue/music/Home'
import List from '@pub/vue/music/List'
import Search from '@pub/vue/music/Search'
// 底部音乐插件
export default {
  data () {
    return {
      floatState: !0,
      floatList: !0,
      // 第一次加载
      onlyLoad: !0,
      // 选项默认色
      iconColor: '#222',
      // 默认选中
      currentTab: 'icon-sou-suo',
      // 分页列表
      pages: {
        'icon-sou-suo': Search,
        'icon-yinle': Home,
        'icon-yinleliebiaoxian': List,
        'icon-shoucang': null,
        'icon-xihuan1': null,
        'icon-xiazai': null,
        'icon-shezhi': null
      },
      // 工具栏内容 对应执行函数名
      tools: {
      },
      // 工具栏显示个数 默认全部
      toolList: {
        'icon-sou-suo': false
      },
      // 音乐信息
      info: {
        img: 'http://res.mczyzy.cn/LOGO.png',
        src: '',
        tag: '点击展开工具栏'
      }
    }
  },
  created () {
    this.Music = this.$store.state.Music
    this.$nextTick(() => {
      this.Music = new this.Music(this)
    })
    // 监听音乐信息
    this.$connecter.$on('music', data => {
      this.Music.loadMusic(data.albummid, !!data.autoPlay)
    })

    window.addEventListener('resize', resize)

    let oldInnerHeight = window.innerHeight
    let resizeTime = null
    let self = this

    function resize (e) {
      // 节流
      clearTimeout(resizeTime)
      resizeTime = setTimeout(() => {
        // 防止移动端输入时键盘弹起导致布局变形 40为排除键盘
        let newInner = window.innerHeight
        if (self.$store.state.mobile && oldInnerHeight - newInner < 40) {
          let children = self.$el.children
          children[1].style.top = `${newInner - children[1].offsetHeight}px`
          children[0].style.top = `${newInner - children[0].offsetHeight - children[1].offsetHeight}px`
          children[0].style.height = `${children[0].offsetHeight}px`
        }
      }, 300)
    }
    resize()
  },
  methods: {

    /**
     * 切换音乐浮动状态
     */
    toggleFloat () {
      let self = this
      self.floatState = !self.floatState
      // 如果关闭时 列表为展开 则 关闭
      if (self.floatList) {
        self.floatList = !1
      }
      // 第一次点开,进行等一次加载,防止资源浪费
      if (!self.onlyLoad) {
        self.onlyLoad = !0
        self.currentTab = 'icon-sou-suo'
      }
    },

    /**
     * 切换音乐列表展示状态
     */
    toggleList () {
      this.floatList = !this.floatList
    },

    /**
     * 选项卡点击事件
     */
    selectTab (e) {
      if (e.target.dataset.i) {
        this.currentTab = e.target.dataset.i
      }
    },

    /**
     * 播放控制
     */
    musicConsole (e) {
      if (e.target.tagName.toLowerCase() === 'i') {
        e.stopPropagation()
        if (e.target.dataset.on) {
          this.Music[e.target.dataset.on](e.target)
        }
      }
    },

    /**
     * 进度条点击事件
     */
    progress (e) {
      e.stopPropagation()
      this.Music.jump((e.clientX / (e.toElement.offsetWidth / 100)).toFixed(2))
    }
  }
}
</script>

<style lang="less">
  .bottom-music {

    // 浮动列表
    .music-list {
      position: fixed;
      bottom: 52px;
      z-index: 70;
      width: calc(100vw - 50px);
      max-width: 500px;
      height: 70vh;
      box-sizing: border-box;
      background-color: #222;
      opacity: 0;
      transition: .5s;
      transform: translateX(-110%);

      // 模糊的背景容器
      .blur-bg {
        position: absolute;
        overflow: hidden;
        z-index: -1;
        width: 100%;
        height: 100%;

        img {
          height: 100%;
          filter: blur(25px);
          transform: translateX(-20%);
        }

        // 滤镜
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      // 右侧选择卡
      .right-select-top,
      .right-select-bottom {
        position: absolute;
        right: 0;
        transform: translateX(100%);

        li {
          position: relative;
          width: 40px;
          margin-bottom: 10px;
          box-sizing: border-box;
          border-radius: 0 5px 5px 0;
          padding: 5px;
          text-align: center;
          background-color: currentColor;
          box-shadow: 2px 0 5px rgba(0, 0, 0, .3);
          text-shadow: 0 0 0 rgba(0, 0, 0, 1);

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, .3);
          }
          i {
            position: relative;
            z-index: 2;
            font-size: 25px;
            color: rgba(255, 255, 255, .8);
            pointer-events: none;
          }
        }
        // 选中的样式
        li.focus {
          box-shadow: 3px 1px 5px #aaa;

          &::before {
            background-color: transparent;
          }
          i {
            color: #fff;
          }
        }
      }
      // 底部选项卡
      .right-select-bottom {
        bottom: 0;
        li {
          margin-top: 10px;
          margin-bottom: 0;
        }
      }
    }
    .music-list.list-show {
      box-shadow: 0 0 10px rgba(0, 0, 0, .9);
      opacity: 1;
      transform: none;
    }

    // 底部浮动
    .music-float {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 67;
      width: 100vw;
      height: 52px;
      padding: 10px 0;
      box-sizing: border-box;
      border-top-right-radius: 5px;
      color: #fff;
      background-color: rgba(0, 0, 0, .7);
      box-shadow: 0 0 2px #ccc;
      transition: 1s;
      transform: translateX(calc(-100vw + 1.5rem));

      i {
        display: inline-block;
        font-size: 1.5rem;
        color: #fff;
        vertical-align: middle;
        transition: .4s;
        cursor: pointer;

        &:active {
          color: #888;
          text-shadow: 2px 2px 3px #ccc;
          transform: translateY(-2px);
          user-select: none;
        }
      }

      .right-toggle {
        float: right;
        color: #ccc;
        transition: .5s;
        transform: rotate(270deg);

        &::after {
          content: '';
          position: absolute;
          left: -10px;
          width: 50px;
          height: 1.5rem;

        }
      }

      .music-icon {
        position: absolute;
        height: 40px;
        border: 2px solid #eee;
        border-radius: 50%;
        margin: -5px 0 0 5px;
        background-color: rgba(255, 255, 255, .8);
      }
      .music-title {
        display: inline-block;
        overflow: hidden;
        width: calc(100vw - 260px);
        margin: 5px 0 0 60px;
        font-size: 1.25rem;
        vertical-align: middle;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .music-right {
        float: right;

        .icon-caidan {
          transform: rotate(90deg);
          animation: 1s hx linear infinite alternate;
        }
        @keyframes hx {
          to {
            opacity: .5;
          }
        }

        i {
          margin: 5px 10px;
          &:nth-last-child(1) {
            margin: 5px 0 5px 20px;
          }
        }
      }
    }

    .music-float.float-show {
      background-color: rgba(0, 0, 0, .9);
      transform: translateX(0);
      box-shadow: 0 0 10px #aaa;

      .right-toggle {
        border-bottom: 1px dashed #ccc;
        margin: 5px 0;
        color: #eee;
        transform: rotate(90deg);
      }

      // 进度条
      .progress {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 4px;
        padding: 0;
        margin: 0 auto;
        background-color: rgba(168, 230, 244, .3);
        cursor: pointer;
      }
      .progress-load {
        position: absolute;
        overflow: hidden;
        top: 0;
        height: 4px;
        background-color: #a8e6f4;
        pointer-events: none;

        &::before {
          content: "";
          position: absolute;
          width: 120vw;
          margin-left: -20%;
          height: 4px;
          background-image: linear-gradient(
            50deg,
            rgba(255, 255, 255, .8) 10%,
            transparent 10%,
            transparent 20%,
            rgba(255, 255, 255, .8) 20%,
            rgba(255, 255, 255, .5) 30%,
            transparent 30%,
            transparent 40%,
            rgba(255, 255, 255, .8) 40%,
            rgba(255, 255, 255, .5) 50%,
            transparent 50%,
            transparent 60%,
            rgba(255, 255, 255, .8) 60%,
            rgba(255, 255, 255, .5) 70%,
            transparent 70%,
            transparent 80%,
            rgba(255, 255, 255, .8) 80%,
            rgba(255, 255, 255, .5) 90%,
            transparent 90%,
            transparent
          );
          animation: 1s progress-an linear infinite;
        }
        @keyframes progress-an {
          to {
            transform: translateX(20%)
          }
        }
      }
    }
  }
</style>
