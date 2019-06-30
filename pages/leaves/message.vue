<template>
  <section class="conter single clearfix leaves article-body">
    <div class="content-box">
      <h2 class="title">留言板</h2>
      <img class="cover" src="/img/messgae-nav.jpg" alt="史莱姆的博客-留言板-封面">
      <blockquote>欢迎来到史莱姆的博客，尽情的留下你的脚印吧！</blockquote>
    </div>
    <div class="content-box">
      <div class="mark">共计 () 条不明脚印</div>
      <editor model="message" />
      <button class="button-lv0 send" @click="send">踩下脚印</button>
    </div>
  </section>
</template>

<script>
import Editor from '~/plugins/Editor'

export default {
  created() {
    console.log(12345674897)
  },

  components: {
    Editor
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
    border: 5px solid #eee;
    border-radius: 10px;
  }

  .content-box blockquote {
    display: block;
    width: 90%;
    padding: 5px 10px;
    margin: 10px auto;
    line-height: 1.4;
    font-size: 100%;
    background-color: #eee;
    border-left: 8px solid #ccc;
    border-radius: 0 5px 5px 0;
  }

  .mark {
    width: 90%;
    padding: 5px 0;
    margin: 20px auto;
    text-align: center;
    background-color: #eee;
    border-radius: 5px;
  }

  .send {
    float: right;
    margin: 20px 5% 0 0;
  }
}
</style>