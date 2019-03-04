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
    overflow: hidden;
    padding: 0;
  }

  // 提示框
  .article-input {
    max-height: 0;
    opacity: 0;
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
            box-shadow: 0 2px 5px rgba(0, 0, 0, .2);

    .icon-wrong {
      float: right;
      color: #ccc;
      cursor: pointer;
    }

    &.searchArticle {
      width: 100%;
      max-height: 100px;
      margin-bottom: 10px;
      padding: 10px;
      opacity: 1;
    }

    &.input-red {
      color: #fff;
      background-color: #eb3a42;
      .icon-wrong {
        color: currentColor;
      }
    }
  }

  .right {
    float: right;
  }
}
</style>
