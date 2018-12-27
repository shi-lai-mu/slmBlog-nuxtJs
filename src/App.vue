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
  }
}
</script>

<style lang="less">

@import '~@com/public/public.less';

</style>
