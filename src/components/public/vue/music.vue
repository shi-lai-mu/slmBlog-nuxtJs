<template>
  <div class="bottom-music">
    <!-- 底部浮动 -->
    <div class="bottom-music-float">
      <i class="iconfont icon-up-copy"></i>
|
      <i class="iconfont icon-zanting"></i>
      <i class="iconfont icon-zanting1"></i>
      <i class="iconfont icon-next"></i>
      <i class="iconfont icon-yinle"></i>
      <i class="iconfont icon-xihuan1"></i>
|
      <i class="iconfont icon-shunxu1"></i>
      <i class="iconfont icon-Shape"></i>
      <i class="iconfont icon-shoucang"></i>
      <i class="iconfont icon-suiji"></i>
      <i class="iconfont icon-danquxunhuan"></i>
    </div>
  </div>
</template>

<script>
// 底部音乐插件
export default {
  created () {

  }
}
</script>

<style lang="less">
  .bottom-music {

    // 底部浮动
    .bottom-music-float {
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 10px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    }
    i {
      font-size: 1.5rem;
    }
  }
</style>
