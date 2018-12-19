<template>
  <div id="app" class="conter">
    <vueHeader :head="head"></vueHeader>
    <vueTitle :title="title"></vueTitle>
    <router-view/>
    <vueFooter></vueFooter>
  </div>
</template>

<script>
import connecter from '@com/public/connecter.js'

export default {
  name: 'App',
  data () {
    return {
      title: false,
      head: false
    }
  },
  created () {
    connecter.$on('pageInfo', data => {
      for (let key in data) {
        this[key] = data[key]
      }
    })
  }
}
</script>

<style lang="less">

@import '~@com/public/public.less';

</style>
