<template>
  <div :class="{ 'row-box': !hideRowBox }">
    <div :class="['row-tab', { 'hide-tab-border': hideTabBorder }]">
      <h3 class="row-title" v-if="title">
        <i v-if="icon" :class="`slm blog-${icon}`"></i>
        {{ title }}
        <a-tooltip v-if="tooltip">
          <template slot="title">{{ tooltip }}</template>
          <i class="slm blog-gantanhao"></i>
        </a-tooltip>
      </h3>
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
import { Tooltip as ATooltip } from 'ant-design-vue';

@Component({
  components: { ATooltip },
})
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
   * 备注
   */
  @Prop(String) tooltip?: string;
  /**
   * 隐藏tab底部边框
   */
  @Prop(Boolean) hideTabBorder?: boolean;
  /**
   * 隐藏外部边框
   */
  @Prop(Boolean) hideRowBox?: boolean;

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
      border-bottom: 1px solid var(--c-border-primary);

      &.hide-tab-border {
        border-bottom: 0;
      }
    }

    .row-title {
      flex: 1 1 auto;
      .blog-gantanhao {
        opacity: .8;
        margin-left: 5px;
        font-size: .7em !important;
        vertical-align: text-top;
      }
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

