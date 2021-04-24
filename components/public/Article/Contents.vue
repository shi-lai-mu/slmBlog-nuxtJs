<template>
  <article
    :class="['article-content-box', { 'toggle-transition': toggleTransition }, { 'is-page-mode': isPage }]"
    @scroll="articleScroll"
    ref="article"
  >
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
          <ArticleReplyList :articleId="articleData.id"/>
        </a-col>
        <a-col
          class="article-page__sideber"
          :lg="{ span: 8 }"
          :xxl="{ span: 8 }"
        >
          <UserCard :ssr="articleData.author" userEntrance />
          <ArticleAnchor ref="articleAnchor" :affix="true" title="目录"/>
        </a-col>
      </a-row>
      <LayoutFooter v-if="!isPage"/>
    </template>
  </article>
</template>

<script lang='ts'>
import { Affix, Tooltip } from 'ant-design-vue';
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { articleBase } from '@/mock/article/data/index';
import { getPostsData } from '@/core/service/data/article';
import { RequestConst } from '@/core/constants/request';
import { Article as InterArticle } from '@/interface/request/article';

import Row from '@/components/public/Row.vue';
import sharingConfig from './config/sharing.config';
import UserCard from '@/components/public/UserCard.vue';
import UpperLowerArticle from './components/UpperLowerArticle.vue';
import HtmlTreeProcess from '@/components/public/HtmlTreeProcess.vue';
import ArticleReplyList from './components/replay/ArticleReplyList.vue';
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
  @Prop(Object) ssr?: InterArticle.Base;
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
  articleData?: InterArticle.Base = articleBase;
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

  created() {
    this.ssrUpdate(this.articleId || this.ssr || articleBase);
  }

  mounted() {
    // 重置父级容器可能性
    this.$config.getScrollContainer = () => this.$refs.article;
  }


  /**
   * 文章ID更新
   */
  @Watch('articleId')
  changArticleId(data: InterArticle.Base['id']) {
    getPostsData(data)
      .then(data => {
        if (data.result) this.setRenderData(data.result[0]);
        this.$forceUpdate();
      })
    ;
  }


  @Watch('ssr')
  async ssrUpdate(data: InterArticle.Base | InterArticle.Posts | number) {
    console.log({data});
    
    // 如果对骨架屏进行了初始化则先显示骨架屏进行交互
    if (!this.initSkeleton) this.toggleTransition = true;
    if (typeof data === 'number') {
      const res = await getPostsData(data as InterArticle.Base | number);
      if (res.code === RequestConst.SUCCESS_CODE) {
        data = res.result;
      }
    }
    this.setRenderData(data as InterArticle.Posts);
  }


  /**
   * 设置渲染属性
   */
  setRenderData(data: InterArticle.Posts) {
    if (Object.keys(data).length === 0) {
      return this.$router.push({
        name: 'article-error',
        query: {
          message: '文章',
        },
      });
    }
    this.articleData = Object.assign(articleBase, data);
    this.$nextTick(() => {
      const { articleContent, articleAnchor } = this.$refs;
      if (articleAnchor) {
        (articleAnchor as ArticleAnchor).parseAnchor(articleContent as Element);
        this.articleData.contentSize = (<HTMLElement>articleContent).innerText.length;
      }
    });
    this.toggleTransition = true;
  }


  /**
   * 滚动文章触发事件
   */
  articleScroll({ target }) {
    const { scrollTop, clientHeight, scrollHeight } = target;
    const progress = Math.abs(scrollTop / (clientHeight - scrollHeight));
    this.$observer.emit('scroll', [ target, progress ]);
    if (progress >= 0.95) {
      this.$observer.emit('scrollBottom', [ target, progress ]);
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
// .is-page-mode {
  // overflow: visible;
  // height: auto;
// }
</style>
