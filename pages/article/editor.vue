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
            <Input class="title" />
            <div class="article-items">
              <span>{{ $tool.format.isoToDateTime() }}</span>
              <span>作者: {{ $$store.getters.getUserInfo.nickname }}</span>
            </div>
            <!-- <div class="article-desc" v-html="articleData.description"></div> -->
            <!-- <div class="article-content__info">
              <div class="release-time">
                发布于 {{ $tool.format.isoToDateTime(articleData.createTime) }}
              </div>
              <div class="icon-box">
                <i class="slm blog-pinglun" v-text="$tool.format.people(articleData.stat.bookmark_num)"></i>
                <i class="slm blog-yueduliang" v-text="$tool.format.people(articleData.stat.view_num)"></i>
              </div>
              <ul class="tag-list">
                <li class="tag-item" v-for="(item, key) in 3" :key="key">xxxxx</li>
              </ul>
            </div> -->
          </div>
          <div class="article-content__body">
            123
          </div>
          <EditorComponents />
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
      </a-col>
    </a-row>
    <LayoutFooter />
  </article>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator';

import { Input } from 'ant-design-vue';

import Imager from '@/components/public/Imager.vue';
import EditorComponents from '@/components/public/Editor.vue';
import HtmlTreeProcess from '@/components/public/HtmlTreeProcess.vue';
import LayoutFooter from '@/layouts/defaultLayouts/components/Footer.vue';
import ArticleViewSkeleton from '@/components/skeleton/pubCom/articleViewSkeleton.vue';


/**
 * 文章内容组件
 */
@Component({
  components: {
    Imager,
    LayoutFooter,
    HtmlTreeProcess,
    EditorComponents,
    ArticleViewSkeleton,
    AInput: Input,
  }
})
export default class Editor extends Vue {
  created() {
    const user = this.$$store.getters.getUserInfo;
    if (!user) this.$message.error('未登录用户无法进行文章发布!');
  }


}
</script>

<style scoped lang="scss">
.layout-default-mobile .article-layout,
.layout-default-mobile /deep/ .article-skeleton {
  padding-top: 60px !important;
}
.article-content-box {
  position: absolute;
  overflow-y: scroll;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 0;
  // padding-top: 65px;
  // padding-top: 100px;
  @include themify($themes) {
    color: themed('font-color');
    // background-color: themed('main-bg-color');
  }

  .article-items {
    opacity: .8;
    padding-bottom: 20px;
    margin: 20px auto;
    text-align: center;
    font-size: .9em;
    @include themify($themes) {
      border-bottom: 1px dashed rgba($color: themed('font-color'), $alpha: .2);
    }
    span {
      margin: 0 10px;
    }
  }

  .article-desc {
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    @include themify($themes) {
      background-color: rgba(themed('main-bg-f2-color'), .7);
    }
  }

  .article-layout {
    padding-top: 80px;
  }

  &.toggle-transition {
    /deep/ .article-skeleton {
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
    opacity: 0;
    margin: 0 auto;

    .title {
      text-indent: 5px;
      text-align: center;
      font-weight: 500;
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
