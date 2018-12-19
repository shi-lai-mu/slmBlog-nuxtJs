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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
