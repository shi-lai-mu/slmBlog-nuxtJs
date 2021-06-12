<template>
  <div>
    <div class="article-error-page max-content">
      <div class="content-box row-box">
        <img
          :src="`${$config.ossLink}/img/article-not.png`"
          alt="文章错误图"
          class="article-error"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ArticleErrorPage extends Vue {}
</script>

<style lang="scss" scoped>
.article-error-page {
  min-height: 80vh;
  padding: 100px 20px 0;
  margin: 0 auto;

  .content-box {
    min-height: 60vh;
    padding: 0;
  }

  .article-error {
    display: block;
    height: 50vh;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
