<template>
  <section class="conter single clearfix leaves">
    <div class="content-box">
      <h2 class="title">留言板</h2>
      <img class="cover" src="/img/messgae-nav.jpg" alt="史莱姆的博客-留言板-封面">
    </div>
  </section>
</template>

<script>
export default {
  created() {
    console.log(12345674897)
  }
}
</script>

<style lang="less">
.leaves {
  .title {
    font-size: 1.3rem;
    font-weight: 400;
    text-align: center;
  }
  img.cover {
    display: inline-block;
    width: 90%;
    margin: 0 5%;
    border-radius: 10px;
  }
}
</style>