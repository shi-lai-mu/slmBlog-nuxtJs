<template>
  <article
    :class="['article-content-box', { 'toggle-transition': toggleTransition }, { 'is-page-mode': isPage }]"
    @scroll="articleScroll"
    ref="article">
    <ArticleViewSkeleton />
    <template v-if="articleData && articleData.id">
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
              <div class="article-desc">
                <span v-html="articleData.description"></span>
                <div class="sharing-channels">
                  <span>分享到：</span>
                  <tooltip v-for="(item, key) in sharingConfig" :key="key">
                    <span slot="title" v-text="item.name"></span>
                    <i :class="['slm', `blog-${item.icon}`]"></i>
                  </tooltip>
                </div>
              </div>
            </div>
            <div class="article-content__body">
              <div ref="articleContent" v-html="articleData.content"></div>
              <ArticleContentFooter :articleData="articleData" />
            </div>
            <div class="article-content__footer">
              <UpperLowerArticle :articleId="articleData.id" />
            </div>
          </div>
          <ArticleReplyList :ssr="comment" :articleId="articleData.id"/>
        </a-col>
        <a-col
          class="article-page__sideber"
          :lg="{ span: 8 }"
          :xxl="{ span: 8 }"
        >
          <UserCard :ssr="articleData.author" userEntrance />
          <a-affix :offset-top="80" :target="$config.container">
          <Row title="目录">
            <ArticleAnchor ref="articleAnchor" :getContainer="$config.container" :affix="true"/>
          </Row>
          </a-affix>
        </a-col>
      </a-row>
      <LayoutFooter v-if="!isPage"/>
    </template>
  </article>
</template>

<script lang='ts'>
import { Affix, Tooltip } from 'ant-design-vue';
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { Request } from '@/interface/request';
import { articleBase } from '@/mock/article/data/index';
import { getPostsData } from '@/core/service/data/article';
import { RequestConst } from '@/core/constants/request';
import { Article as IntefArticle } from '@/interface/request/article';

import Row from '@/components/public/Row.vue';
import sharingConfig from './config/sharing.config';
import Imager from '@/components/public/Imager.vue';
import UserCard from '@/components/public/UserCard.vue';
import ArticleReplyList from './components/replay/ArticleReplyList.vue';
import UpperLowerArticle from './components/UpperLowerArticle.vue';
import HtmlTreeProcess from '@/components/public/HtmlTreeProcess.vue';
import ArticleContentFooter from './components/ArticleContentFooter.vue';
import LayoutFooter from '@/layouts/defaultLayouts/components/Footer.vue';
import ArticleAnchor from '@/components/public/Article/components/ArticleAnchor.vue';
import ArticleViewSkeleton from '@/components/skeleton/pubCom/articleViewSkeleton.vue';

/**
 * 文章内容组件
 */
@Component({
  name: 'ArticleContent',
  components: {
    Row,
    Imager,
    Tooltip,
    UserCard,
    LayoutFooter,
    ArticleAnchor,
    AAffix: Affix,
    HtmlTreeProcess,
    ArticleReplyList,
    UpperLowerArticle,
    ArticleViewSkeleton,
    ArticleContentFooter,
  }
})
export default class ArticleContent extends Vue {
  /**
   * 文章ID
   */
  @Prop(Number) articleId?: number;
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Object) ssr?: IntefArticle.Base | IntefArticle.Posts;
  /**
   * 初始化骨架屏
   */
  @Prop(Boolean) initSkeleton?: boolean;
  /**
   * 是否为页面模式渲染
   */
  @Prop(Boolean) isPage?: boolean;
  /**
   * 文章数据
   */
  articleData?: IntefArticle.Base = articleBase;
  /**
   * 是否禁用骨架屏
   */
  // private disableSkeleton = false;
  /**
   * 骨架于内容切换过渡
   */
  toggleTransition = false;
  /**
   * 分享配置
   */
  sharingConfig = sharingConfig;
  /**
   * 评论列表
   */
  comment: Request.ListTotal<IntefArticle.Comment>;

  created() {
    // 重置父级容器可能性
    this.$config.getScrollContainer = () => {
      return this.isPage ? this.$config.layout : this.$refs.article;
    };
    this.ssrUpdate(this.articleId || this.ssr || articleBase);
  }

  /**
   * 文章ID更新
   */
  @Watch('articleId')
  changArticleId(data: IntefArticle.Base['id']) {
    getPostsData(data)
      .then(data => {
        if (data.result) this.articleData = this.setRenderData(data.result[0]);
        this.$forceUpdate();
      })
    ;
  }


  @Watch('ssr')
  async ssrUpdate(data: IntefArticle.Base | IntefArticle.Posts | number) {
    const { id } = data as IntefArticle.Base || { id: 0 };
    // 如果对骨架屏进行了初始化则先显示骨架屏进行交互
    if (this.initSkeleton) {
      setTimeout(() => this.toggleTransition = true, 200);
    } else this.toggleTransition = true;

    if (id || typeof data === 'number') {
      const res = await getPostsData(data as IntefArticle.Base | number);
      if (res.code === RequestConst.SUCCESS_CODE) {
        data = res.result;
      }
    }
    this.setRenderData(data as IntefArticle.Posts);
  }


  /**
   * 设置渲染属性
   */
  setRenderData(data: IntefArticle.Posts) {
    if (Object.keys(data).length === 0) {
      return this.articleData = this.$tool.format.asignError(articleBase, {
        id: -1,
        content: '文章内容获取失败',
      });
    }
    this.articleData = Object.assign(articleBase, data.article);
    if (data.comment) {
      this.comment = data.comment;
    }
    // this.articleData = data.article;
    this.$nextTick(() => {
      const { articleContent, articleAnchor } = this.$refs;
      if (articleAnchor) {
        (articleAnchor as ArticleAnchor).parseAnchor(articleContent as Element);
      }
    });
  }


  /**
   * 滚动文章触发事件
   */
  articleScroll(e) {
    const { treeProcess } = this.$refs;
    if (treeProcess) {
      (treeProcess as HtmlTreeProcess).updateProcess(e);
    }
  }
}
</script>

<style  lang="scss" scoped>
@import './styles/content.scss';
.sharing-channels {
  margin-top: 10px;
  text-align: right;
  user-select: none;
  color: var(--c-text-secondary);

  .slm {
    font-size: 1.1em;
    cursor: pointer;

    &:not(:last-child)::after {
      content: '/';
      margin: 0 5px;
      color: var(--c-text-placeholder);
    }

    &:hover {
      color: var(--c-text-link);
    }
  }
}
.is-page-mode {
  overflow: visible ;
  height: auto;
}
</style>
