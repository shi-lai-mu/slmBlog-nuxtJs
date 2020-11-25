<template>
  <div class="article-list-box">
    <div :class="[ 'article-list-item', layout.name, { 'is-open': viewId === item.id } ]" v-for="(item, index) in _listData" :key="index">
      <ArticleView @open="openArticleEvent" @close="closeArticleEvent" :article="item" :viewId="viewId" :key="index" />
    </div>
    <aside class="layout-aside" v-if="!$store.state.isMobile">
      <div class="aside-child-box" v-for="(item, index) of getListAsideConfig.list" :key="index">
        <tooltip placement="left" v-for="(chiItem, chiIndex) of item" :key="chiIndex">
          <span slot="title" v-text="chiItem.title"></span>
          <i :class="[ 'slm', 'icon-hover', 'blog-' + chiItem.icon ]" @click="chiItem.event(getListAsideConfig.bind)"></i>
        </tooltip>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { Tooltip } from 'ant-design-vue';

import { _ARTICLE_LIST_LAYOUT_ } from '@/config/storage';
import { isBrowser } from '@/config/system';
import { Article as IntefArticle } from '@/interface/request/article';

import listAsideConfig from './ListAside.config';
import ArticleView from './View.vue';

/**
 * 文章列表
 * - 展示文章列表
 */
@Component({
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
export default class Article extends Vue {
  @Prop(Array) ssr?: IntefArticle.Base[];

  /**
   * 列表数据
   */
  private _listData: IntefArticle.Base[] = [];

  /**
   * 正在观看是文章ID
   */
  private viewId: IntefArticle.Base['id'] = -1;

  /**
   * 当前布局
   */
  private layout = {
    name: '',
    sort: '',
    setting: {},
  };

  /**
   * data的更新触发 [userData将被覆盖]
   */
  @Watch('ssr')
  ssrUpdate(data: IntefArticle.Base[]) {
    this._listData = data;
  }

  created() {
    if (this.ssr) this.ssrUpdate(this.ssr);
    if (isBrowser) {
      const listCon = window.localStorage.getItem(_ARTICLE_LIST_LAYOUT_);
      if (listCon) this.layout = JSON.parse(listCon);
    }
  }


  mounted() {
    this.$observer.on('popstate', this.popstateEvent.bind(this));
  }


  destroyed() {
    this.$observer.off('popstate', this.popstateEvent.bind(this));
  }

  /**
   * 布局值发生改变时
   */
  @Watch('layout')
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

<style scoped lang="scss">
  $layoutTransition: .5s ease-in-out;

  .article-list-box {
    position: relative;

    /deep/ .figure-cover {
      height: 200px;
      margin-bottom: 10px;
      border-radius: 5px;
      transition: $layoutTransition;
      .image-cover {
        transition: .5s ease-in-out;
      }
    }

    &:hover .layout-aside {
      opacity: 1;
      transition: .5s;
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
      @include themify($themes) {
        background-color: themed('bg-dp4-color'); 
      }
      border-radius: 5px;
      justify-content: center;
      flex-wrap: wrap;
      transition: 1s .5s;

      .aside-child-box:not(:last-child) {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid rgba($color: #000, $alpha: .3);
      }

      .slm {
        display: block;
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        @include themify($themes) {
          color: themed('font-lv3-color');
        }
        border-radius: 3px;
        cursor: pointer;
        transition: .2s;

        &:active,
        &.check {
          @include themify($themes) {
            background-color: rgba($color: themed('font-color'), $alpha: .1);
            color: themed('font-lv0-color');
            text-shadow: 0 0 6px themed('font-lv0-color');
          }
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
      @include themify($themes) {
        background-color: themed('bg-dp4-color'); 
      }
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

      &:nth-child(2n) {
        margin-right: 0;
      }

      .figure-subject {
        font-size: 1.05rem;
        color: inherit;
        cursor: text;
      }

      .article-description {
        @include themify($themes) {
          color: themed('font-lv2-color');
        }
        cursor: text;
      }
    }

    /deep/ .article-bottom {
      display: flex;
      font-weight: 200;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
      @include themify($themes) {
        color: themed('font-lv2-color');
      }

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
 