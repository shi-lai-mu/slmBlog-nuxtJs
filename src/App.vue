<template>
  <div class="conter">
    <vueHeader :head="head"></vueHeader>
    <vueTitle :title="title"></vueTitle>
    <router-view/>
    <vueFooter></vueFooter>
  </div>
</template>

<script>

export default {
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
  }
}
</script>

<style lang="less">

@import '~@com/public/public.less';

</style>
