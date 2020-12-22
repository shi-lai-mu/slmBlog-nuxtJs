<template>
  <ArticleContent v-if="articleData" :ssr="articleData[0]"/>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { getArticleData } from '@/service/data/article';

import ArticleContent from '@/components/public/Article/Contents.vue';

@Component({
  components: {
    ArticleContent,
  },
})
export default class ArticlePostsContentPage extends Vue {
  async asyncData({ params }) {
    return {
      articleData: (await getArticleData(params.id)).result || [], // 获取最新文章
    };
  }
}
</script>