<template>
  <div id="tbody" ref="tbody">
    <vue-header :head="head" ref="head"></vue-header>
    <transition :name="transitionName" keep-alive>
      <router-view ref="master" class="tbody" :style="masterStyle"></router-view>
    </transition>
    <vue-footer></vue-footer>
    <vue-toast :toast="toast"></vue-toast>
    <vue-background></vue-background>
    <vue-music></vue-music>
  </div>
</template>

<script>
import vueHeader from '@pub/vue/header'
import vueFooter from '@pub/vue/footer'
import vueToast from '@pub/vue/toast'
import vueBackground from '@pub/vue/background'
import vueMusic from '@pub/vue/music/index'

export default {
  components: {
    vueHeader,
    vueFooter,
    vueToast,
    vueBackground,
    vueMusic
  },
  data () {
    return {
      title: false,
      head: false,
      toast: {},
      transitionName: 'slide-right',
      masterStyle: null
    }
  },
  watch: {
    // 切换页面效果
    '$route' (to, from) {
      let isBack = this.$router.isBack
      this.transitionName = isBack ? 'slide-left' : 'slide-right'
      this.$router.isBack = false
    }
  },
  created () {
    let self = this

    self.$connecter.$on('page', data => {
      for (let key in data) {
        self[key] = data[key]
      }
    })

    // 读取本地的登录信息
    let user = JSON.parse(localStorage.getItem('userInfo'))

    if (user) {
      // 判断token是否过期
      this.$http.get('user/intoken', { token: user.token })
        .then(res => {
          // 有新的token传回
          if (res.token && res.token !== user.token) {
            user.token = res.token
            localStorage.setItem('userInfo', user)
          }
        })
        .catch(res => {
          // 出错/过期
          localStorage.removeItem('userInfo')
          user = null
          this.$connecter.$emit('user', false)
          this.$router.push({
            name: 'login',
            query: {
              redirect: this.$router.history.current.path
            }
          })
          this.toast = {
            icon: 'warning',
            text: '登录已过期,请重新登录!'
          }
        })
    }
    self.$store.state.user = user

    // 判断窗口大小
    window.addEventListener('resize', resize)
    function resize (e) {
      document.body.className = window.innerWidth > 840 ? 'max' : 'centre'
      self.$store.state.mobile = window.innerWidth < 840
    }
    resize()
    /**
     * 移动端右划事件
     */
    this.$nextTick(() => {
      let pointerX = 0
      let screenW = screen.availWidth / 2 / 50
      let $list = !1
      let $state = !1
      window.addEventListener('touchstart', e => {
        pointerX = e.changedTouches[0].clientX
      })
      window.addEventListener('touchmove', e => {
        let moveX = Math.min((e.changedTouches[0].clientX - pointerX) / screenW, 50)
        if ($list && !$state) {
          this.masterStyle = `transition: 0s; filter: blur(${1 / 50 * moveX}px);transform: translateX(${moveX}vw);`
          $list.mobilStyle = `transition: 0s; opacity: ${1 / 50 * moveX};transform: translateY(${moveX}px);`
        } else if (this.$refs.master) $list = this.$refs.head
      })
      window.addEventListener('touchend', e => {
        if ($list) {
          let moveX = Math.min((e.changedTouches[0].clientX - pointerX) / screenW, 50)
          if (Math.abs(moveX) > 25) {
            $state = $list.toggleMneu(moveX > 0)
          }
          this.masterStyle = ``
          $list.mobilStyle = ``
        }
      })
    })
  }
}
</script>

<style lang="less">
@import '~@com/public/public.less';
#tbody > .tbody {
  min-height: calc(100vh - 200px);
  transition: .5s;
}
.min-screen-left > .tbody {
  transform: translateX(50vw);
  opacity: .7;
  filter: blur(1px);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
