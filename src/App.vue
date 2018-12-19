<template>
  <div id="app" class="conter">
    <vueHeader></vueHeader>
    <vueTitle></vueTitle>
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
