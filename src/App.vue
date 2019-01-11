<template>
  <div class="conter">
    <vue-header :head="head" ref="head"></vue-header>
    <vue-title :title="title"></vue-title>
    <router-view/>
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
    self.$store.state.user = user

    if (user) {
      // 判断token是否过期
      let token = user.token.split('-')
      if (token[2] < Date.now()) {
        this.$http.get('user/intoken', { token })
          .then(res => {
            console.log(res);
          })
      }
    }

    // 判断窗口大小
    window.addEventListener('resize', resize)
    function resize (e) {
      document.body.className = window.innerWidth > 640 ? 'max' : 'centre'
      self.$store.state.mobile = window.innerWidth < 640
    }
    resize()
  }
}
</script>

<style lang="less">
@import '~@com/public/public.less';

body > .conter {
  overflow: hidden;
}
</style>
