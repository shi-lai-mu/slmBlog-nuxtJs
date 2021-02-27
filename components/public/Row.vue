<template>
  <div class="row-box">
    <div class="row-tab">
      <h4 class="row-title" v-if="title">
        <i v-if="icon" :class="`slm blog-${icon}`"></i>
        {{ title }}
      </h4>
      <div class="tool">
        <i v-if="isFold" :class="['slm', 'blog-zhankai', { rotate180: isFoldOpen }]" @click="isFoldOpen = !isFoldOpen"></i>
        <slot name="tool"></slot>
      </div>
    </div>
    <div :class="['row-content', { 'content-fold': isFoldOpen }]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class Row extends Vue {
  /**
   * 标题
   */
  @Prop(String) title?: string;
  /**
   * 标题图标
   */
  @Prop(String) icon?: string;
  /**
   * 是否显示折叠图标
   */
  @Prop(Boolean) isFold?: boolean;
  /**
   * 设置折叠状态
   * true: 关闭
   * false: 开启
   */
  @Prop(Boolean) foldState?: boolean;

  /**
   * 是否处于展开状态
   */
  isFoldOpen: boolean = true;

  mounted() {
    if (this.foldState !== undefined) {
      this.isFoldOpen = this.foldState;
    }
  }
}
</script>

<style lang="scss">
  .row-box {
    .row-tab {
      display: flex;
      width: 100%;
      @include themify($themes) {
        border-bottom: 1px solid themed('border-bottom-color');
      }
    }

    .row-title {
      flex: 1 1 auto;
      border-bottom: 1px solid var(--c-border-primary);
    }

    .tool {
      .slm {
        font-size: .9em;
        font-weight: initial;
        cursor: pointer;
          
        &:hover {
          color: var(color-text-white);
        }
      }
    }

    .content-fold {
      overflow: hidden;
      max-height: 0;
    }
  }
</style>

