<template>
  <div id="tbody" ref="tbody">
    <vue-header :head="head" ref="head"></vue-header>
    <transition :name="transitionName" keep-alive>
      <router-view ref="master" class="tbody"></router-view>
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
import vueMusic from '@pub/vue/music/music'

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
      transitionName: 'slide-right'
    }
  },
  watch: {
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

    let oldInnerHeight = window.innerHeight
    let resizeTime = null

    function resize (e) {
      document.body.className = window.innerWidth > 840 ? 'max' : 'centre'
      self.$store.state.mobile = window.innerWidth < 840
      // 节流
      clearTimeout(resizeTime)
      resizeTime = setTimeout(() => {
        let newInner = window.innerHeight
        // 防止移动端输入时键盘弹起导致布局变形 40为排除键盘
        if (self.$store.state.mobile && oldInnerHeight - newInner < 40) {
          let children = window.music.children
          children[1].style.top = `${newInner - children[1].offsetHeight}px`
          children[0].style.top = `${newInner - children[0].offsetHeight -  children[1].offsetHeight}px`
          children[0].style.height = `${children[0].offsetHeight}px`
        }
      }, 300)
    }
    resize()
  }
}
</script>

<style lang="less">
@import '~@com/public/public.less';
#tbody > tbody,
#tbody > .tbody > tbody {
  transition: .5s;
}
.min-screen-left > tbody,
.min-screen-left > .tbody > tbody {
  transform: translateX(50vw);
  opacity: .8;
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
