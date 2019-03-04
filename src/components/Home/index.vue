<template>
  <tbody class="conter content-row clearfix home">
    <home-hot></home-hot>
    <home-right></home-right>
  </tbody>
</template>

<script>
import homeRight from './right'
import homeHot from './hot'
export default {
  metaInfo: {
    title: `史莱姆的博客`
  },
  components: {
    homeRight,
    homeHot
  }
}
</script>

<style lang="less">
@ip: '//res.mczyzy.cn/img';

.home {
  margin-bottom: 40px;

  .content-box {
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
  }

  .right {
    float: right;
  }
}
</style>
