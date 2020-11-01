<template>
  <div class="article-list-box">
    <article :class="[ 'article-list-item', layout.name ]" v-for="(item, index) in _listData" :key="index">
      <Imager class="figure-cover" :src="item.banner" :alt="item.subject" :title="item.subject" />
      <div class="atricle-content">
        <h3 class="figure-subject line-ellipsis" v-text="item.subject"></h3>
        <p class="line-ellipsis double-line-ellipsis article-description" v-text="item.description"></p>
      </div>
      <div class="article-bottom">
        <div>
          <i class="slm blog-pinglun" v-text="formatPeople(item.stat.reply_num)"></i>
          <i class="slm blog-yueduliang" v-text="formatPeople(item.stat.view_num)"></i>
        </div>
        <span v-text="item.release_time"></span>
      </div>
    </article>
    <aside class="layout-aside" v-if="!$store.state.isMobile">
      <div class="aside-child-box" v-for="(item, index) of getListAsideConfig.list" :key="index">
        <tooltip placement="left" v-for="(chiItem, chiIndex) of item" :key="chiIndex">
          <span slot="title" v-text="chiItem.title"></span>
          <i :class="[ 'slm', 'blog-' + chiItem.icon ]" @click="chiItem.event(getListAsideConfig.bind)"></i>
        </tooltip>
      </div>
    </aside>
    <Content />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { Tooltip } from 'ant-design-vue';

import { _ARTICLE_LIST_LAYOUT_ } from '@/config/storage';
import { isBrowser } from '@/config/system';
import { Article as IntefArticle } from '@/interface/request/article';
import { formatPeople } from '@/utils/atricle';

import listAsideConfig from './ListAside.config';
import Imager from '@/components/public/Imager.vue';
import Content from './Content.vue';

/**
 * 文章列表
 * - 展示文章列表
 */
@Component({
  components: {
    Imager,
    Tooltip,
    Content,
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
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Array) ssr?: IntefArticle.Base[];

  /**
   * 列表数据
   */
  private _listData: IntefArticle.Base[] = [];

  /**
   * 当前布局
   */
  layout = {
    name: '',
    sort: '',
    setting: {},
  };

  /**
   * data的更新触发 [userData将被覆盖]
   */
  @Watch('ssr')
  ssrUpdate(data: IntefArticle.Base[]) {
    console.log(data);
    this._listData = data;
  }

  created(...par) {
    if (this.ssr) this.ssrUpdate(this.ssr);
    if (isBrowser) {
      const listCon = window.localStorage.getItem(_ARTICLE_LIST_LAYOUT_);
      if (listCon) this.layout = JSON.parse(listCon);
    }
  }


  @Watch('layout')
  changLayout(value) {
    window.localStorage.setItem(_ARTICLE_LIST_LAYOUT_, JSON.stringify(value));
  }


  /**
   * 格式化人数
   */
  formatPeople(v) {
    return formatPeople(v);
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
      opacity: 0;
      position: absolute;
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

        &:hover {
          @include themify($themes) {
            background-color: rgba($color: themed('font-lv0-color-hover'), $alpha: .1);
            color: themed('font-lv0-color-hover');
            text-shadow: 0 0 6px themed('font-lv0-color-hover');
          }
        }

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

    .article-list-item {
      position: relative;
      z-index: 2;
      overflow: hidden;
      display: inline-block;
      width: calc(50% - 5px);
      padding: 10px;
      margin: 5px 10px;
      margin-left: 0;
      font-size: .85rem;
      border-radius: 10px;
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

    .line-layout,
    .line-layout-noimg {
      display: flex;
      width: 100%;

      .figure-cover {
        width: 150px;
        height: 150px;
        margin-bottom: 0;
        margin-right: 20px;
        flex: 1 0 auto;
      }

      .article-content {
        width: calc(100% - 170px);
        margin-right: 40px;
      }

      .article-bottom {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }

    .line-layout-noimg {
      .figure-cover {
        width: 0;
        height: 0;
      }

      .article-description {
        margin-bottom: 1.5rem;
      }
    }

    .article-bottom {
      display: flex;
      font-weight: 200;
      justify-content: space-between;
      align-items: center;
      @include themify($themes) {
        color: themed('font-lv2-color');
      }

      .slm {
        margin-right: 10px;
        font-size: inherit;

        &::before {
          margin-right: 5px;
        }
      }
    }
  }
</style>
 