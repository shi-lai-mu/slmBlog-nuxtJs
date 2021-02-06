<template>
  <ArticleContent v-if="posts" :ssr="posts"/>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { getPostsData } from '@/core/service/data/article';

import ArticleContent from '@/components/public/Article/Contents.vue';

@Component({
  components: {
    ArticleContent,
  },
})
export default class ArticlePostsContentPage extends Vue {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  }

  async asyncData({ params }) {
    const posts = (await getPostsData(params.id)).result;
    return {
      posts: posts.article, // 获取最新文章
    };
  }
}
</script>