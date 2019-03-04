<template>
  <tbody class="conter content-row clearfix home">
    <home-top></home-top>
    <home-hot></home-hot>
    <home-right></home-right>
  </tbody>
</template>

<script>
import homeRight from './right'
import homeHot from './hot'
import homeTop from './top'
export default {
  metaInfo: {
    title: `史莱姆的博客`
  },
  components: {
    homeHot,
    homeRight,
    homeTop
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

  .article-box-tag {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
  }
}
</style>
