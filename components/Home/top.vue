<template>
  <section v-show="notice.length">
    <div class="article-box-tag">
      <i class="iconfont icon-zhiding"></i>
      <h3>博客公告</h3>
    </div>
    <ul class="content-box notice">
      <li v-for="(item, index) in notice" :key="index">{{ item.description }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ['notice']
}
</script>

<style lang="less">
.home .notice li {
  padding: 5px 10px;
}
</style>
