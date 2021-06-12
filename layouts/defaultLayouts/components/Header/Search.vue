<template>
  <li
    :class="[
      'slm',
      'blog-search',
      'search-box',
      { 'input-focus': inputFocus },
      $store.state.themes.mainBColor,
    ]"
  >
    <div class="search-input">
      <div class="blur" @mouseout="inputFocus = false"></div>
      <div :class="['panel', $store.state.themes.mainBColor]">
        <ul class="panel-tag">
          <li v-for="(item, index) in panelTag" :key="index">
            <i :class="'slm blog-' + item.icon"></i>{{ item.name }}
          </li>
        </ul>
        <template v-if="hotTag.length">
          <h4>热门搜索</h4>
          <GeminiScrollbar v-show="inputFocus" class="panel-tag" @ready="panelScrollbar">
            <li v-for="index of hotTag" :key="index">文章{{ index }}</li>
          </GeminiScrollbar>
        </template>
        <!-- <h4>探索主题</h4>
        <ul class="panel-tag">
          <li v-for="index of 20" :key="index">文章{{ index }}</li>
        </ul> -->
      </div>
      <input
        type="text"
        placeholder="搜索内容..."
        @click="inputFocus = true"
        @focus="inputFocus = true"
      />
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HeaderSearch extends Vue {
  /**
   * input 聚焦状态
   */
  inputFocus: boolean = false
  /**
   * GeminiScrollbar 实例
   */
  panelScrollbarObj: unknown
  /**
   * 热门搜索标签
   */
  hotTag = []
  /**
   * 置顶标签
   */
  panelTag: Array<{ name: string; icon: string }> = []

  mounted() {
    this.panelTag = [
      {
        icon: 'article',
        name: '文章',
      },
      {
        icon: 'leaving-message',
        name: '留言',
      },
      {
        icon: 'muisc',
        name: '音乐',
      },
    ]
  }

  panelScrollbar(cb) {
    this.panelScrollbarObj = cb
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
    transition: 0.5s;
    cursor: initial;

    input {
      width: 100%;
      line-height: 100%;
      font-size: 1rem;
      color: #fff;
      background-color: inherit;
      border: 0;
      &::placeholder {
        color: #fff;
      }
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
          font-size: 0.8em;
          line-height: 2.3em;
          background-color: rgba($color: #000, $alpha: 0.2);
          border-radius: 5px;
          cursor: pointer;
        }

        .slm {
          margin-right: 0.6em;
          font-size: 0.5em;
        }
      }

      h4 {
        margin: 5px 10px 0;
        font-size: 0.8em;
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
    .search-input {
      overflow: initial;
      width: 60vw !important;
    }

    .panel {
      opacity: 1;
      transform: translateY(0);
      transition: 0.5s 1s;
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
