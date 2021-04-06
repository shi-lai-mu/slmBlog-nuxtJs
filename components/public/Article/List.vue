<template>
  <div class="article-list-box">
    <aside class="layout-aside" v-if="!$store.state.isMobile">
      <div class="aside-child-box" v-for="(item, index) of getListAsideConfig.list" :key="index">
        <tooltip placement="left" v-for="(chiItem, chiIndex) of item" :key="chiIndex">
          <span slot="title" v-text="chiItem.title"></span>
          <i
            :class="[ 'slm', {check: layout.focus[index] === chiIndex}, 'blog-' + chiItem.icon ]"
            @click="chiItem.event(getListAsideConfig.bind), (layout.focus[index] = chiIndex)"
          ></i>
        </tooltip>
      </div>
    </aside>
    <div
      v-scroll-event="{ down: 'aos-in' }"
      :class="[
        'article-list-item',
        layout.name,
        { 'is-open': viewId === item.id }
      ]"
      v-for="(item, index) in listData"
      :key="index"
    >
      <ArticleView @open="openArticleEvent" @close="closeArticleEvent" :ssr="item" :viewId="viewId" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { Tooltip } from 'ant-design-vue';
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { isBrowser } from '@/config/system';
import { articleBase } from '@/mock/article/data/index';
import { _ARTICLE_LIST_LAYOUT_ } from '@/config/storage';
import { Article as IntefArticle } from '@/interface/request/article';

import ArticleView from './View.vue';
import listAsideConfig from './config/listAside.config';

/**
 * 文章列表
 * - 展示文章列表
 */
@Component({  
  name: 'ArticleList',
  components: {
    Tooltip,
    ArticleView,
  },
  computed: {
    getListAsideConfig() {
      return {
        list: listAsideConfig,
        bind: this,
      };
    }
  }
})
export default class ArticleList extends Vue {
  @Prop(Array) ssr?: IntefArticle.Base[];

  /**
   * 列表数据
   */
  listData: IntefArticle.Base[] = [];

  /**
   * 正在观看是文章ID
   */
  viewId: IntefArticle.Base['id'] = -1;

  /**
   * 当前布局
   */
  layout = {
    name: 'line-layout',
    sort: '',
    setting: {},
    focus: {}
  };

  /**
   * data的更新触发 [userData将被覆盖]
   */
  @Watch('ssr')
  ssrUpdate(data: IntefArticle.Base[]) {
    if (data.length) this.listData = data;
  }
  

  created() {
    if (this.ssr.length) {
      this.ssrUpdate(this.ssr);
    } else {
      this.listData = new Array(4).fill(articleBase);
    }
    if (isBrowser) {
      const listCon = window.localStorage.getItem(_ARTICLE_LIST_LAYOUT_);
      if (listCon) this.layout = JSON.parse(listCon);
    }
    this.$observer.on('popstate', this.popstateEvent.bind(this));
  }


  destroyed() {
    this.$observer.off('popstate', this.popstateEvent.bind(this));
  }

  /**
   * 布局值发生改变时
   */
  @Watch('layout', { deep: true })
  changLayout(value) {
    window.localStorage.setItem(_ARTICLE_LIST_LAYOUT_, JSON.stringify(value));
  }


  /**
   * 打开文章事件
   * @param articleId 文章ID
   */
  openArticleEvent(articleId: IntefArticle.Base['id']) {
    this.viewId = articleId;
  }


  /**
   * 关闭文章事件
   * @param articleId 文章ID
   */
  closeArticleEvent() {
    this.viewId = -1;
  }


  /**
   * popstate 事件
   */
  popstateEvent() {
    if (window.location.pathname === '/') {
      this.closeArticleEvent();
    }
  }
}
</script>

<style  lang="scss" scoped>
  $layoutTransition: .5s ease-in-out;

  .article-list-box {
    position: relative;

    /deep/ .figure-cover {
      height: 200px;
      margin-bottom: 10px;
      border-radius: 5px;
      transition: $layoutTransition;
      .image-cover {
        transition: $layoutTransition;
      }
    }

    &:hover .layout-aside {
      opacity: 1;
      transition: $layoutTransition;
      transform: translateX(-100%);
    }

    .layout-aside {
      position: absolute;
      opacity: 0;
      z-index: 0;
      display: flex;
      top: 5px;
      left: -10px;
      width: 3rem;
      padding: 10px 0;
      background-color: var(--c-bg-primary);
      border: 1px solid var(--c-border-primary);
      border-radius: 5px;
      justify-content: center;
      flex-wrap: wrap;
      transition: $layoutTransition .5s;

      .aside-child-box:not(:last-child) {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid var(--c-border-primary);
      }

      .slm {
        display: block;
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        color: var(--c-underlinenav-text);
        border-radius: 3px;
        border: 1px solid transparent;
        cursor: pointer;
        transition: .2s;

        &:active,
        &.check {
          background-color: var(--m-color-bg-primary);
          color: var(--m-color-text-primary);
          text-shadow: 0 0 6px var(--c-underlinenav-text-hover);
        }

        &:hover {
          border-color: var(--c-border-primary);
          box-sizing: border-box;
        }
      }
    }

    /deep/ .article-list-item {
      display: inline-block;
      width: calc(50% - 5px);
      padding: 10px;
      margin: 5px 10px;
      margin-left: 0;
      font-size: .85rem;
      border-radius: 10px;
      vertical-align: middle;
      background-color: var(--c-bg-primary);
      border: 1px solid var(--c-border-primary);
      transition: $layoutTransition;
      cursor: pointer;

      &:hover {
        .figure-cover {
          box-shadow: 0 0 10px rgba($color: #000, $alpha: .9) inset;
          
          /deep/ .image-cover {
            transform: scale(1.3);
          }
        }
      }

      &:nth-child(2n + 1) {
        margin-right: 0;
      }

      .figure-subject {
        font-size: 1.2rem;
        line-height: 2.1rem;
        color: inherit;
        cursor: text;
      }

      .article-description {
        color: var(--c-text-secondary);
        cursor: text;
      }
    }

    /deep/ .article-bottom {
      display: flex;
      font-weight: 200;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
      color: var(--c-text-secondary);

      .slm {
        overflow: hidden;
        display: inline-block;
        max-width: 7em;
        margin-right: 10px;
        font-size: inherit;
        vertical-align: middle;
        text-overflow: ellipsis;

        &::before {
          margin-right: 5px;
        }
      }
    }
  }

  .layout-default-mobile .article-list-item,
  .article-list-box div.line-layout,
  .article-list-box div.line-layout-noimg {
    display: flex;
    width: 100%;

    /deep/ .figure-cover {
      width: 15vh;
      height: 15vh;
      line-height: 15vh;
      max-width: 150px;
      max-height: 150px;
      margin-bottom: 0;
      margin-right: 20px;
      flex: 1 0 auto;
    }

    /deep/ .article-content {
      width: calc(100% - 170px);
      margin-right: 40px;
    }

    /deep/ .article-box {
      position: relative;
      display: flex;
      width: 100%;
    }

    /deep/ .article-bottom {
      position: absolute;
      right: 10px;
      bottom: 0;
    }
  }

  .article-list-box div.line-layout-noimg {
    /deep/ .figure-cover {
      overflow: hidden;
      width: 0;
      height: 0;
      max-width: 0;
    }

    /deep/ .article-description {
      margin-bottom: 2.5rem;
    }
  }

  .layout-default-mobile .article-list-box {

    .article-list-item {
      margin: 0;
      border-radius: 0;

      &:not(:last-child) {
        border-bottom: 1px solid rgba($color: #000, $alpha: .1);
      }
    }

    /deep/ .release-time {
      display: none;
    }
  }
</style>
 