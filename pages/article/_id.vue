<template>
  <ArticleContent :ssr="articleData[0]"/>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { getLatestArticle } from '@/service/data/article';

import ArticleContent from '@/components/public/Article/Contents.vue';

@Component({
  components: {
    ArticleContent,
  },
})
export default class HomePage extends Vue {
  async asyncData({ $http, $axios}) {
    return {
      articleData: (await getLatestArticle()).result || [], // 获取最新文章
    };
  }
}
</script>

<style scoped lang="scss">
</style>
