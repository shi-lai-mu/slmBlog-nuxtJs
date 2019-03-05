<template>
  <section v-show="notice.length">
    <div class="article-box-tag">
      <i class="iconfont icon-gonggao"></i>
      <span>博客公告</span>
    </div>
    <ul class="content-box notice">
      <li v-for="(item, index) in notice" :key="index">{{ item.description }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      notice: []
    }
  },
  created () {
    this.$http.get('/blog/special/1?tag=公告')
      .then(res => {
        this.notice = res.data
      })
  }
}
</script>

<style lang="less">
.home {
  .notice li {
    padding: 5px 10px;
  }
}
</style>
