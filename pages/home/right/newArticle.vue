// 友情链接 模块
<template>
  <aside class="content-box">
    <span class="content-tag">
      <span>最新文章:</span>
    </span>
    <ol class="content-list" v-if="news">
      <li v-for="(item, key) in news.data" :key="key">
        <router-link class="max-a" :to="{ name: 'article-id', params: { id: item.Id } }">{{ item.title }}</router-link>
      </li>
    </ol>
  </aside>
</template>

<script>
export default {
  props: {
    news: {
      type: Object
    }
  }
}
</script>