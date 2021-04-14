<template>
  <div class="article-page">
    <ArticleContent v-if="posts" :ssr="posts" :isPage="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { getPostsData } from '@/core/service/data/article';
import { RequestConst } from '@/core/constants/request';

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

  async asyncData({ params, app }) {
    const postsRes = await getPostsData(params.id);
    if (postsRes.code !== RequestConst.SUCCESS_CODE) {
      app.router.push({ path: './error' });
    }
    return {
      posts: postsRes.result, // 获取文章内容
    };
  }

  created() {
    this.$parent.$emit('setLayout', ['layoutFooter', false]);
  }
}
</script>