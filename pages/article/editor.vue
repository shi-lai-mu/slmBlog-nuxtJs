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
            <a-input v-model="article.subject" class="title input" placeholder="文章标题" />
            <div class="article-items">
              <span>发布：{{ $tool.format.isoToDateTime() }}</span> 
              <span>作者: {{ $$store.getters.getUserInfo.nickname }}</span>
            </div>
            <a-textarea v-model="article.description" class="article-desc input" placeholder="文章 摘要/简介" :rows="4" />
          </div>
          <a-input v-model="article.banner" placeholder="文章头图链接 https://xxxxxxxxxxx ..." />
          <div class="article-content__body"></div>
          <EditorComponents ref="editor" />
          <div class="article-content__footer"></div>
        </div>
      </a-col>
      <a-col
        class="article-page__sideber"
        :lg="{ span: 8 }"
        :xxl="{ span: 8 }"
      >
        <ArticleSetting ref="articleSetting"/>
        <div class="button-box">
          
          <a-button type="link" @click="saveDraft">保存草稿</a-button>
          <a-button type="primary" @click="submitArticle">发 布 文 章</a-button>
        </div>
      </a-col>
    </a-row>
    <LayoutFooter />
  </article>
</template>

<script lang='ts'>
import { Input, Button } from 'ant-design-vue';
import { Component, Vue } from 'nuxt-property-decorator';

import { SubmitArticleDto } from '@/core/dto/article';

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
  name: 'ArticleEditor',
  components: {
    Imager,
    LayoutFooter,
    AInput: Input,
    ArticleSetting,
    AButton: Button,
    HtmlTreeProcess,
    EditorComponents,
    ArticleViewSkeleton,
    ATextarea: Input.TextArea,
  }
})
export default class ArticleEditor extends Vue {

  /**
   * 文章数据
   */
  article = {
    // 标题
    subject: '',
    // 简介
    description: '',
    // 头图
    banner: '',
    // 类目
    category: [],
  }

  created() {
    console.log();
    const test = new SubmitArticleDto({
      content: 'zaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    })
    console.log(test);
    // const user = this.$$store.getters.getUserInfo;
    // if (!user) this.$message.error('未登录用户无法进行文章发布!');
  }


  /**
   * 发布文章
   */
  submitArticle() {
    console.log(this.getArticleData());
  }


  /**
   * 保存为草稿
   */
  saveDraft() {
    // code
  }


  /**
   * 校验数据完整性
   */
  validateData() {
    // code
  }


  /**
   * 获取文章数据
   */
  getArticleData() {
    const { editor, articleSetting } = this.$refs;
    return Object.assign({}, this.article, {
      content: (editor as EditorComponents).HTML,
      setting: (articleSetting as ArticleSetting).options,
    });
  }


  /**
   * 设置文章数据
   */
  setArticleData() {
    // code
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
