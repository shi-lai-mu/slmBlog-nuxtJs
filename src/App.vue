<template>
  <div id="app">
    <vueHeader></vueHeader>
    <router-view/>
    <vueFooter></vueFooter>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">

@import '~@com/public/public.less';

</style>
