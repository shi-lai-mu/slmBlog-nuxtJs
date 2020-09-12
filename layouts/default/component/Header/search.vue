<template>
  <li :class="[ 'slm', 'blog-search', 'search-box', { 'input-focus': inputFocus }]">
    <div class="search-input">
      <div class="blur" @mouseout="inputFocus = false"></div>
      <div class="panel">
        <ul class="panel-tag">
          <li><i class="slm blog-article"></i>文章</li>
          <li><i class="slm blog-leaving-message"></i>留言</li>
          <li><i class="slm blog-muisc"></i>音乐</li>
        </ul>
        <h4>热门搜索</h4>
        <GeminiScrollbar @ready="panelScrollbar" class="panel-tag">
          <li v-for="index of 20" :key="index">文章{{ index }}</li>
        </GeminiScrollbar>
        <!-- <h4>探索主题</h4>
        <ul class="panel-tag">
          <li v-for="index of 20" :key="index">文章{{ index }}</li>
        </ul> -->
      </div>
      <input type="text" placeholder="搜索内容..." @click="inputFocus = true" @focus="inputFocus = true">
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class HeaderSearch extends Vue {
  /**
   * input 聚焦状态
   */
  inputFocus: boolean = false;
  /**
   * GeminiScrollbar 实例
   */
  panelScrollbarObj: any;

  panelScrollbar(cb) {
    this.panelScrollbarObj = cb;
  }
}
</script>

<style lang="scss" scoped>
  .search-box {
    position: relative;
    display: flex;
    z-index: 2;
    flex-flow: row-reverse;

    .search-input {
      position: absolute;
      z-index: -1;
      overflow: hidden;
      top: 0;
      right: 20px;
      width: 0;
      max-width: 700px;
      padding: 0 10px;
      background-color: inherit;
      border-radius: 40px 0 0 40px;
      transition: .5s;
      cursor: initial;

      input {
        width: 100%;
        line-height: 100%;
        font-size: 1em;
        background-color: inherit;
        @include themify($themes) {
          color: themed('font-lv0-color');
        }
        border: 0;
      }

      .panel {
        position: absolute;
        z-index: -1;
        opacity: 0;
        top: 20px;
        left: 0;
        width: 100%;
        padding: 20px 10px 10px;
        text-align: left;
        @include themify($themes) {
          background-color: themed('panel-floating-color');
        }
        border-radius: 0 0 20px 20px;
        transform: translateY(-20px);

        .panel-tag {
          padding: 0 10px 5px;
          text-align: left;
          height: 3rem;
          width: calc(100% - 20px);
          white-space: nowrap;

          li {
            display: inline-block;
            margin-right: 5px;
            padding: 0 10px;
            font-size: .8em;
            line-height: 2.3em;
            @include themify($themes) {
              color: themed('a-active-color');
              background-color: themed('bg-dp1-color');
            }
            border-radius: 5px;
            cursor: pointer;

            &:hover {
              @include themify($themes) {
                color: themed('font-color');
              }
            }
          }

          .slm {
            margin-right: .6em;
            font-size: .5em;
          }
        }

        h4 {
          margin: 5px 10px 0;
          font-size: .8em;
          line-height: 1.3em;
        }
      }
    }

    &:hover {
      .search-input {
        width: 200px;
      }
    }

    &::before {
      width: 100%;
      height: 100%;
      background-color: inherit;
      border-radius: 50%;
    }

    &.input-focus {
      @include themify($themes) {
        background-color: themed('panel-floating-color') !important;
      }

      .search-input {
        overflow: initial;
        width: 60vw !important;
      }

      .panel {
        opacity: 1;
        transform: translateY(0);
        transition: .5s 1s;
      }
    }

    .blur {
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      cursor: initial;
    }
  }
</style>


