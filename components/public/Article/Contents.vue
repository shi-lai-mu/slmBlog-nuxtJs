<template>
  <article
    :class="['article-content-box', { 'toggle-transition': toggleTransition }, 'bg-texture']"
    @scroll="articleScroll"
    ref="article">
    <ArticleViewSkeleton />
    <HtmlTreeProcess ref="treeProcess"/>
    <a-row class="article-layout max-content">
      <a-col
        class="article-page__container max-content"
        :lg="{ span: 16 }"
        :xxl="{ span: 16 }"
      >
        <aside class="article-action"></aside>
        <div class="article-content__container row-box">
          <div class="article-content__header">
            <h1 class="title" v-text="articleData.subject"></h1>
            <div class="article-items">
              <span>{{ $tool.format.isoToDateTime(articleData.createTime) }}</span>
              <span>作者: {{ articleData.author.nickname }}</span>
            </div>
            <div class="article-desc" v-html="articleData.description"></div>
          </div>
          <div class="article-content__body" ref="articleContent" v-html="articleData.content">
          </div>
          <div class="article-content__footer"></div>
        </div>
        <div class="article-reply__container">

        </div>
      </a-col>
      <a-col
        class="article-page__sideber"
        :lg="{ span: 8 }"
        :xxl="{ span: 8 }"
      >
        <UserCard :ssr="articleData.author" userEntrance />
        <a-affix :offset-top="20" :target="() => $refs.article">
          <Row title="目录">
            <ArticleAnchor ref="articleAnchor" :getContainer="() => $refs.article" :affix="true"/>
          </Row>
        </a-affix>
      </a-col>
    </a-row>
    <LayoutFooter />
  </article>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { getPostsData } from '@/core/service/data/article';
import { articleBase } from '@/mock/article/data/index';
import { Article as IntefArticle } from '@/interface/request/article';
import { Affix } from 'ant-design-vue';

import Row from '@/components/public/Row.vue';
import Imager from '@/components/public/Imager.vue';
import UserCard from '@/components/public/UserCard.vue';
import ArticleAnchor from '@/components/public/Article/ArticleAnchor.vue';
import LayoutFooter from '@/layouts/defaultLayouts/components/Footer.vue';
import ArticleViewSkeleton from '@/components/skeleton/pubCom/articleViewSkeleton.vue';
import HtmlTreeProcess from '@/components/public/HtmlTreeProcess.vue';


/**
 * 文章内容组件
 */
@Component({
  components: {
    Row,
    Imager,
    UserCard,
    LayoutFooter,
    ArticleAnchor,
    AAffix: Affix,
    HtmlTreeProcess,
    ArticleViewSkeleton,
  }
})
export default class ArticleContents extends Vue {

  /**
   * 文章ID
   */
  @Prop(Number) articleId?: number;

  /**
   * 传入的列表数据 SSR
   */
  @Prop(Object) ssr?: IntefArticle.Base;

  /**
   * 初始化骨架屏
   */
  @Prop(Boolean) initSkeleton?: boolean;

  /**
   * 文章数据
   */
  private articleData?: IntefArticle.Base = articleBase;

  /**
   * 是否禁用骨架屏
   */
  // private disableSkeleton = false;

  /**
   * 骨架于内容切换过渡
   */
  private toggleTransition = false;


  created() {
    this.ssrUpdate(this.articleId || this.ssr || articleBase);
  }

  mounted() {
    this.$nextTick(() => {
      const { articleContent, articleAnchor } = this.$refs;
      (articleAnchor as ArticleAnchor).parseAnchor(articleContent as  Element);
    })
  }

  /**
   * 文章ID更新
   */
  @Watch('articleId')
  changArticleId(articleId: IntefArticle.Base['id']) {
    getPostsData(articleId)
      .then(data => {
        if (data.result) this.articleData = this.setRenderData(data.result[0]);
        this.$forceUpdate();
      })
    ;
  }


  @Watch('ssr')
  ssrUpdate(data: IntefArticle.Base | number) {
    // 如果对骨架屏进行了初始化则先显示骨架屏进行交互
    if (this.initSkeleton) {
      setTimeout(() => this.toggleTransition = true, 500);
    } else this.toggleTransition = true;
    
    if (typeof data === 'number' && data !== -1) {
      getPostsData(data).then(res => this.setRenderData(res.result))
    } else {
      this.setRenderData(data);
    }
  }


  /**
   * 设置渲染属性
   */
  setRenderData(data) {
    if (Object.keys(data).length === 0) {
      return this.articleData = this.$tool.format.asignError(articleBase, {
        id: -1,
        content: '文章内容获取失败',
      });
    }
    this.articleData = Object.assign(articleBase, data);
  }


  /**
   * 滚动文章触发事件
   */
  articleScroll(e) {
    console.log(this.$refs.treeProcess);
    const { treeProcess } = this.$refs;
    if (treeProcess) {
      (treeProcess as HtmlTreeProcess).updateProcess(e);
    }
  }
}
</script>

<style  lang="scss" scoped>
@import './styles/content.scss';
</style>
