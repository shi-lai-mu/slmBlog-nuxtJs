<template>
  <div class="conter">
    <vue-header :head="head"></vue-header>
    <vue-title :title="title"></vue-title>
    <router-view/>
    <vue-footer></vue-footer>
    <vue-toast></vue-toast>
  </div>
</template>

<script>

import vueHeader from '@pub/header'
import vueFooter from '@pub/footer'
import vueTitle from '@pub/title'
import vueToast from '@pub/toast'

export default {
  components: {
    vueHeader,
    vueFooter,
    vueTitle
  },
  data () {
    return {
      title: false,
      head: false
    }
  },
  created () {
    this.$connecter.$on('page', data => {
      for (let key in data) {
        this[key] = data[key]
      }
    })

    // 读取本地的登录信息
    this.$store.state.user = window.localStorage.getItem('userInfo')

    // 判断窗口大小
    window.addEventListener('resize', resize)
    function resize (e) {
      document.body.className = window.innerWidth > 640 ? 'max' : 'centre'
    }
    resize()
  }
}
</script>

<style lang="less">

@import '~@com/public/public.less';

</style>
