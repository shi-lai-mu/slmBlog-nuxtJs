<template>
  <div id="app">
    <h1 class="logo"></h1>
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

@import './components/public/public.less';

#app {
  overflow-x: hidden;
  width: 100vw;
  min-height: 100vh;
  margin-top: 60px;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @color-font;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFAQMAAAC3obSmAAAABlBMVEUuN0MsND8+ei+CAAAAD0lEQVQI12NgYGhgAAEPAAPSAMlMH3PVAAAAAElFTkSuQmCC);
}

</style>
