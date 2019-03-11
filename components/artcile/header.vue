<template>
  <header>
    <h2 class="article-title">
      {{ article.title }}
      <router-link :to="{ name: 'againEditor', query: { editor: this.$route.params.id } }" class="editor-link" v-if="editor">
        <i class="iconfont icon-fatie"></i>重新编辑
      </router-link>
    </h2>
    <h3 class="article-info">
      <span class="nowrap">
        <router-link :to="'/user/' + article.author.id">{{ article.author.username }}</router-link>
        <span>发表于：</span>
        <i class="iconfont icon-shizhong" title="时间">{{ article.createTime && unTime(article.createTime) }}</i>
      </span>
      <span class="nowrap">
        <i class="iconfont icon-liaotian1" title="回复">{{ article.msg ? article.msg.all : '--' }}</i>
        <!-- <i class="iconfont icon-liulan" title="浏览">{{ article.lookCount }}</i> -->
      </span>
    </h3>
    <ul class="notCon" v-if="notCon">
      <li :class="[{ 'not-p': Math.random() > 0.6, 'not-end': Math.random() > 0.9 }]" v-for="i in 20" :key="i"></li>
    </ul>
  </header>
</template>

<script>
export default {
  props: ['article', 'unTime', 'notCon', 'editor']
}
</script>
