<template>
  <div id="tbody" ref="tbody">
    <vue-header :head="head" ref="head"></vue-header>
    <!-- <vue-title :title="title"></vue-title> -->
    <transition :name="transitionName" keep-alive>
      <router-view ref="master" class="tbody"></router-view>
    </transition>
    <vue-footer></vue-footer>
    <vue-toast :toast="toast"></vue-toast>
    <canvas class="canvas-bg" width="1920" height="1080" ref="canvas"></canvas>
  </div>
</template>

<script>
import vueHeader from '@pub/vue/header'
import vueFooter from '@pub/vue/footer'
import vueTitle from '@pub/vue/title'
import vueToast from '@pub/vue/toast'

export default {
  components: {
    vueHeader,
    vueFooter,
    vueTitle,
    vueToast
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
    function resize (e) {
      document.body.className = window.innerWidth > 840 ? 'max' : 'centre'
      self.$store.state.mobile = window.innerWidth < 840
    }
    resize()
    this.$nextTick(() => {
      // canvas
      let canvas = this.$refs.canvas
      let CanvasBg = (function () {
        canvas.width = screen.availWidth
        canvas.height = screen.availHeight
        let ctx = canvas.getContext('2d')

        return class Canvas {
          clearInter = null
          constructor () {
            this.dots = []
            for (var i = 0; i < 100; i++) {
              this.dots.push({
                x: Math.random() * canvas.width + 2,
                y: Math.random() * canvas.height + 2,
                xa: (Math.random() * 2 - 1) / 1.5,
                ya: (Math.random() * 2 - 1) / 1.5,
                color: {
                  r: Math.random() * 256,
                  g: Math.random() * 256,
                  b: Math.random() * 256
                },
                size: (3 + Math.random() * 2) + (1 % window.devicePixelRatio)
              })
            }
            window.requestAnimationFrame(this.rects.bind(this))
          }

          // 绘制
          rects () {
            canvas.width = screen.availWidth
            // ctx.scale(window.devicePixelRatio % 1, window.devicePixelRatio % 1)
            for (var i = 0; i < 100; i++) {
              let dot = this.dots[i]
              dot.x += dot.xa
              dot.y += dot.ya
              dot.xa *= dot.x > (canvas.width - (dot.size / 2)) || dot.x < dot.size / 2 ? -1 : 1
              dot.ya *= dot.y > (canvas.height - (dot.size / 2)) || dot.y < dot.size / 2 ? -1 : 1
              ctx.fillStyle = `rgba(${dot.color.r},${dot.color.g},${dot.color.b},0.25)`
              ctx.beginPath()
              ctx.arc(dot.x - 0.5, dot.y - 0.5, dot.size, 0, 2 * Math.PI, false)
              ctx.fill()
            }
            window.requestAnimationFrame(this.rects.bind(this))
          }
        }
      })()
      this.CanvasBg = new CanvasBg()
    })
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
.canvas-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
