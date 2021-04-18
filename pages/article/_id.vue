<template>
  <div class="article-page">
    <ArticleContent v-if="posts" :ssr="posts" :isPage="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { getCommentList, getPostsData } from '@/core/service/data/article';
import { RequestConst } from '@/core/constants/request';
import { Article } from '@/interface/request/article';

import ArticleContent from '@/components/public/Article/Contents.vue';

@Component({
  components: {
    ArticleContent,
  },
})
export default class ArticlePostsContentPage extends Vue {

  posts!: Article.Posts;

  validate({ params }) {
    return /^\d+$/.test(params.id);
  }

  async asyncData({ params, app }) {
    const postsRes = await getPostsData(params.id);
    if (postsRes.code !== RequestConst.SUCCESS_CODE) {
      app.router.push({ path: './error' });
    }
    return {
      posts: {
        article: postsRes.result, // 获取文章内容
        comment: {},              // 评论数据
      },
    };
  }

  created() {
    this.$parent.$emit('setLayout', ['layoutFooter', false]);
  }

  
  mounted() {
    const posts = this.posts;
    if (posts) {
      getCommentList(posts?.article.id, 1, 10)
        .then(({ result, success }) => {
          posts.comment = success ? result : {
            list: [],
            total: 0,
            page: 0,
            pageSize: 0,
            message: '评论加载出错!',
          };
        })
      ;
    }
  }
}
</script>