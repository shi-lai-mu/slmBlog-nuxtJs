<template>
  <div class="boss" ref="body">
    <main-background />
    <main-Header />
    <transition name="test">
      <nuxt />
    </transition>
    <main-footer />
    <music />
    <Toast />
  </div>
</template>

<script>
import mainHeader from '~/components/layout/header'
import mainFooter from '~/components/layout/footer'
import mainBackground from '~/components/layout/background'
import music from '~/components/music/index'
import Toast from '~/components/layout/Toast'

export default {
  scrollToTop: true,
  head: {
    title: '史莱姆的博客'
  },
  components: {
    mainHeader,
    mainFooter,
    mainBackground,
    music,
    Toast
  },
  watch: {
    '$route' (to, from) {
      window.scrollTo(0, 0)
      this.baiduPush()
    }
  },
  mounted () {
    const slef = this
    slef.baiduPush()

    const user = localStorage.getItem('userInfo')
    self.$nuxt.$store.dispatch('USER', user || 'default')

    // 缩放窗口时 响应式处理
    window.addEventListener('resize', resize)
    function resize (e) {
      document.body.className = window.innerWidth > 840 ? 'max' : 'centre'
      slef.$store.dispatch('IS_MOBILE', window.innerWidth)
    }
    resize()

    // refs.body 订阅
    this.observer.on('body', option => {
      this.$refs.body.className = option.value ? option.value : 'boss'
    })

    // 问候
    this.$nextTick(() => {
      this.observer.emit('toast', {
        text: '欢迎访问, 史莱姆的博客!'
      })
    })

    console.log('%cSLM BLOG%c version 1.5.0', 'font-size: 40px;color: rgb(254,65,129);font-weight: bold;', 'font-size: 20px;color: rgb(254,65,129)')
    console.log('      %c欢迎访问 史莱姆的博客!', 'font-size: 20px;color: rgb(254,65,129)')
  },
  methods: {
    // 百度推送
    baiduPush () {
      const bp = document.createElement('script')
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
      let s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(bp, s)
    }
  }
}
</script>

<style lang="less">
.test-enter-active, .test-leave-active {
  transition: 1s;
}
.test-enter, .test-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
          transform: translate(-50px, 0);
}
.boss {
  transition: 1s;
}
.min-screen-left > .conter {
  transform: translateX(50vw);
  opacity: .7;
  filter: blur(1px);
  transition: .5s;
}
</style>
