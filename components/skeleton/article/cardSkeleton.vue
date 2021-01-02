<template>
  <article class="article-box skeleton">
    <i class="slm blog-loading figure-cover"></i>
    <div class="article-content">
      <span class="figure-subject line-ellipsis skeleton-title"></span>
      <span class="line-ellipsis double-line-ellipsis article-description skeleton-desc"></span>
    </div>
    <div class="article-bottom">
      <div>
        <span class="slm skeleton-tag"></span>
        <span class="slm skeleton-tag"></span>
      </div>
      <span class="release-time skeleton-desc"></span>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

/**
 * 文章卡骨架
 */
@Component
export default class ArticleCardSkeleton extends Vue {}
</script>

<style lang="scss" scoped>
  .article-description{
    margin-top: .3em;
  }
  .blog-loading {
    font-size: 80px;
  }
  .skeleton-tag {
    width: 2em;
  }
  .article-bottom {
    display: flex;
    opacity: .5;
    margin-top: 10px;
    justify-content: space-between;
  }
  .article-content {
    width: 100% !important;
    min-width: 100%;
  }
</style>