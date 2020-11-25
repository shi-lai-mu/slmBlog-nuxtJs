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

<style lang="less">
.article-box {
  position: relative;
  line-height: 0;

  // 正文
  .article-index {
    width: calc(100% - 300px);
    border-radius: 5px 0 0 5px;
    opacity: 1;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    header {
      width: 95%;
      margin: 0 auto 30px;
      border-bottom: 1px solid #ccc;

      i {
        margin: 0 5px 0 10px;
        color: #888;

        &::before {
          margin-right: 5px;
        }
      }
    }

    .article-img {
      display: block;
      width: 100%;
      margin: 10px auto;
    }

    .article-title {
      font-size: 2em;
      text-align: center;
    }

    .article-info {
      font-weight: 400;
      color: #555;
      text-align: center;
    }

    .article-body {
      width: 90%;
      margin: 0 auto 20px;
      padding-bottom: 30px;
      font-size: 1.2rem;
      transform: translateY(100px);
      animation: article-up 1s .2s;
      animation-fill-mode: forwards;

      p {
        word-break: break-all;
      }
    }
    @keyframes article-up {
      to {
        transform: translateY(0);
      }
    }
  }
}
</style>
