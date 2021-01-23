<template>
  <article :class="['article-content-box', 'toggle-transition', 'bg-texture']">
    <a-row class="article-layout max-content">
      <a-col
        class="article-page__container max-content"
        :lg="{ span: 16 }"
        :xxl="{ span: 16 }"
      >
        <aside class="article-action"></aside>
        <div class="article-content__container row-box">
          <div class="article-content__header">
            <a-input class="title input" placeholder="文章标题" />
            <div class="article-items">
              <span>发布：{{ $tool.format.isoToDateTime() }}</span> 
              <span>作者: {{ $$store.getters.getUserInfo.nickname }}</span>
            </div>
            <a-textarea class="article-desc input" placeholder="文章 摘要/简介" :rows="4" />
          </div>
          <a-input placeholder="文章头图链接 https://xxxxxxxxxxx ..." />
          <div class="article-content__body"></div>
          <EditorComponents />
          <div class="article-content__footer"></div>
        </div>
      </a-col>
      <a-col
        class="article-page__sideber"
        :lg="{ span: 8 }"
        :xxl="{ span: 8 }"
      >
        <ArticleSetting />
        <div class="button-box">
          
          <a-button type="link">保存草稿</a-button>
          <a-button type="primary">发 布 文 章</a-button>
        </div>
      </a-col>
    </a-row>
    <LayoutFooter />
  </article>
</template>

<script lang='ts'>
import { Input, Button } from 'ant-design-vue';
import { Component, Vue } from 'nuxt-property-decorator';

import Imager from '@/components/public/Imager.vue';
import EditorComponents from '@/components/public/Editor.vue';
import ArticleSetting from '@/components/public/Article/Setting.vue';
import HtmlTreeProcess from '@/components/public/HtmlTreeProcess.vue';
import LayoutFooter from '@/layouts/defaultLayouts/components/Footer.vue';
import ArticleViewSkeleton from '@/components/skeleton/pubCom/articleViewSkeleton.vue';

import '@/components/public/Article/styles/content.scss';
/**
 * 文章内容组件
 */
@Component({
  components: {
    Imager,
    LayoutFooter,
    ArticleSetting,
    HtmlTreeProcess,
    EditorComponents,
    ArticleViewSkeleton,
    AInput: Input,
    AButton: Button,
    ATextarea: Input.TextArea,
  }
})
export default class ArticleEditor extends Vue {
  created() {
    const user = this.$$store.getters.getUserInfo;
    if (!user) this.$message.error('未登录用户无法进行文章发布!');
  }
}
</script>

<style  lang="scss" scoped>
.article-content-box {
  /deep/ .article-layout {
    opacity: 1;
    margin: 0 auto;
    padding-top: 10px;

    .title {
      display: block;
      width: 90%;
      height: 2.6rem;
      margin: auto;
      text-indent: 5px;
      text-align: center;
      font-weight: 500;
      font-size: 1.5rem;
      border: 0;
      border-radius: 5px;
    }
  }
}

.button-box {
  text-align: right;
}
</style>
