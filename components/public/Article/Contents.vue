<template>
  <article :class="['article-content-box', { 'toggle-transition': toggleTransition }]">
    <GeminiScrollbar>
      <ArticleViewSkeleton />
      <a-row class="article-layout max-content">
        <a-col
          class="article-page__container max-content"
          :lg="{ span: 16 }"
          :xxl="{ span: 16 }"
        >
          <aside class="article-action"></aside>
          <div class="article-content__container row-box">
            <div class="article-content__header">
              <h2 class="title" v-text="_articleData.subject"></h2>
              <div class="article-content__info">
                <div class="release-time">
                  发布于 {{ _articleData.release_time }}
                </div>
                <div class="icon-box">
                  <i class="slm blog-pinglun" v-text="_articleData.stat.reply_num"></i>
                  <i class="slm blog-yueduliang" v-text="_articleData.stat.view_num"></i>
                </div>
                <ul class="tag-list">
                  <li class="tag-item" v-for="(item, key) in 3" :key="key">xxxxx</li>
                </ul>
              </div>
            </div>
            <div class="article-content__body" v-html="_articleData.content">
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
          <UserCard :userId="1" userEntrance />
        </a-col>
      </a-row>
    </GeminiScrollbar>
  </article>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { Article, Article as IntefArticle } from '@/interface/request/article';
import { formatPeople } from '@/utils/atricle';
import { articleBase } from '@/mock/article/data/index';
import { getLatestArticle } from '@/service/data/article';

import { getRelativeBrowserPos } from '@/utils/element';
import UserCard from '@/components/public/UserCard.vue';
import Imager from '@/components/public/Imager.vue';
import ArticleViewSkeleton from '@/components/skeleton/pubCom/articleViewSkeleton.vue';


/**
 * 文章内容组件
 */
@Component({
  components: {
    Imager,
    ArticleViewSkeleton,
    UserCard,
  }
})
export default class ArticleContents extends Vue {

  /**
   * 传入的列表数据 SSR
   */
  @Prop(Object) ssr?: IntefArticle.Base;

  /**
   * 文章ID
   */
  @Prop(Number) articleId?: number;

  /**
   * 初始化骨架屏
   */
  @Prop(Boolean) initSkeleton?: boolean;

  /**
   * 文章数据
   */
  private _articleData?: IntefArticle.Base = articleBase;

  /**
   * 是否禁用骨架屏
   */
  // private disableSkeleton = false;

  /**
   * 骨架于内容切换过渡
   */
  private toggleTransition = false;


  created() {
    this.ssrUpdate(this.ssr || articleBase);
    if (this.ssr) this._articleData = this.ssr;
    if (this.articleId) this.changArticleId(this.articleId);
  }

  /**
   * 文章ID更新
   */
  @Watch('articleId')
  changArticleId(articleId: IntefArticle.Base['id']) {
    getLatestArticle()
      .then(data => {
        if (data.result) this._articleData = data.result[0];
        this.$forceUpdate();
      })
    ;
  }


  /**
   * data的更新触发 [userData将被覆盖]
   */
  @Watch('ssr')
  ssrUpdate(data: Article.Base) {
    // 如果对骨架屏进行了初始化则先显示骨架屏进行交互
    if (this.initSkeleton) {
      setTimeout(() => this.toggleTransition = true, 500);
    } else this.toggleTransition = true;
    this._articleData = data;
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
.layout-default-mobile .article-layout,
.layout-default-mobile /deep/ .skeleton {
  padding-top: 60px !important;
}
.article-content-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 0;
  // padding-top: 65px;
  // padding-top: 100px;
  @include themify($themes) {
    color: themed('font-color');
    background-color: themed('main-bg-color');
  }

  .article-layout,
  /deep/ .skeleton {
    padding-top: 80px;
  }

  &.toggle-transition {
    /deep/ .skeleton {
      opacity: 0;
      transition: 1s;
      visibility: hidden;
    }
    .article-layout {
      opacity: 1;
      transition: .5s;
    }
  }

  .row-box {
    border-radius: 5px;
  }

  /deep/ .article-layout {
    margin: 0 auto;
    opacity: 0;

    .title {
      text-indent: 5px;
      font-weight: bold;
      font-size: 1.5rem;
      @include themify($themes) {
        color: themed('font-color');
      }
    }
  }

  /deep/ .article-page__container {
 
    .article-content__container {
      min-height: calc(100vh - 130px);
      padding: 40px;
    }

    .article-content__info {
      display: flex;
      margin: 20px 0;
      padding: 10px 20px;
      font-size: 1rem;
      @include themify($themes) {
        color: themed('font-lv3-color');
        background-color: themed('bg-dp3-color');
      }
      border-radius: 10px;
      justify-content: space-between;
      flex-wrap: wrap;

      .slm {
        margin-left: 20px;
        font-size: inherit;
      }

      .tag-list {
        width: 100%;
        margin-bottom: 0;

        .tag-item {
          display: inline-block;
          margin-top: 10px;
          margin-right: 10px;
          padding: 0 10px;
          @include themify($themes) {
            background-color: themed('bg-dp6-color');
          }
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            @include themify($themes) {
              background-color: themed('bg-dp9-color');
            }
          }
        }
      }
    }
  }

  /deep/ .article-page__sideber {
    padding-left: 15px;
  }

  /deep/ .-horizontal {
    display: none;
  }
}
</style>
