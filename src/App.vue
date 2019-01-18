<template>
  <div class="min-screen-left">
    <vue-header :head="head" ref="head"></vue-header>
    <!-- <vue-title :title="title"></vue-title> -->
    <router-view ref="master"/>
    <vue-footer></vue-footer>
    <vue-toast :toast="toast"></vue-toast>
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
      toast: {}
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
  }
}
</script>

<style lang="less">
@import '~@com/public/public.less';

.min-screen-left > tbody {
  transform: translateX(50vw);
  filter: blur(2px);

}
</style>
