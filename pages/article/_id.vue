<template>
  <div class="article-page">
    <ArticleContent :ssr="article" :isPage="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { getPostsData } from '@/core/service/data/article';
import { RequestConst } from '@/core/constants/request';
import { Article } from '@/interface/request/article';

import ArticleContent from '@/components/public/Article/Contents.vue';

@Component({
  components: {
    ArticleContent,
  },
})
export default class ArticlePostsContentPage extends Vue {
  /** 文章数据 */
  article!: Article.Base;

  /** 校验 仅数字 */
  validate({ params }) {
    return /^\d+$/.test(params.id);
  }

  async asyncData({ params, redirect }) {
    const postsRes = await getPostsData(params.id);
    if (postsRes.isAxiosError || postsRes.code !== RequestConst.SUCCESS_CODE) {
      redirect({
        name: 'article-error',
        query: {
          message: postsRes.message
        },
      });
    }
    return {
      article: postsRes.result, // 获取文章内容
    };
  }

  created() {
    this.$parent.$emit('setLayout', ['layoutFooter', false]);
  }
}
</script>