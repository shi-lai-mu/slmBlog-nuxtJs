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
import mainHeader from './components/header'
import mainFooter from './components/footer'
import mainBackground from './components/background'
import music from '~/components/music/index'
import Toast from './components/Toast'
import config from '~/config/default'

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
      // this.baiduPush()
    }
  },
  mounted () {
    const slef = this
    // slef.baiduPush()

    let user = localStorage.getItem('userInfo')
    slef.$nuxt.$store.dispatch('USER', user || 'default')
    user = slef.$store.state.user

    // 缩放窗口时 响应式处理
    window.addEventListener('resize', resize)
    function resize (e) {
      document.body.className = window.innerWidth > 840 ? 'max' : 'centre'
      slef.$store.dispatch('IS_MOBILE', window.innerWidth)
    }
    resize()

    // refs.body 订阅
    slef.observer.on('body', option => {
      slef.$refs.body.className = option.value ? option.value : 'boss'
    })

    slef.$nextTick(() => {
      // PC版 问候
      !slef.$store.state.mobile && slef.observer.emit('toast', {
        text: isNaN(user.id) ? '欢迎访问, 史莱姆的博客!' : `欢迎回来 ${user.username}`
      })
    })

    console.log(`%c${ config.__NAME__ }%c version ${ config.__VERSION__ }`, 'font-size: 40px;color: #fe4181;font-weight: bold;', 'font-size: 20px;color: #fe4181')
    console.log(`\t%c${ config.__DESCRIPTION__ }`, 'font-size: 20px;color: #fe4181;')
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
