<template>
  <div
  v-if="!disable"
  :class="[
    'masks',
    { 'mask-style': !disableMask },
    { 'mobile-offset': $store.state.isMobile },
    maskBackageMode,
  ]"
  :style="styleList"
  @click.self="close">
    <div class="mask-box">
      <slot></slot>
      <aside></aside>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';

@Component
export default class Masks extends Vue {
  /**
   * 背景模式
   */
  @Prop(String) maskBackageMode?: string;
  /**
   * 样式调整
   */
  @Prop(Object) styleList;
  /**
   * 是否带有遮罩背景
   */
  @Prop(Boolean) disableMask;
  /**
   * 是否显示
   */
  @Prop(Boolean) show;
  /**
   * 是否禁用
   */
  disable: boolean = false;


  created() {
    this.disable = this.show || false;
  }


  /**
   * 关闭组件
   */
  close() {
    this.disable = true;
    this.$emit('close');
  }


  @Watch('show')
  showChang(val: boolean) {
    this.disable = val;
  }
}
</script>

<style scoped lang="scss">
.masks {
  position: fixed;
  z-index: 99999;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  cursor: initial;

  &.mask-style {
    @include themify($themes) {
      background-color: rgba($color: themed('mask-bg-color'), $alpha: .4);
    }
    backdrop-filter: inherit;
  }

  &.blur-mask {
    backdrop-filter: saturate(200%) blur(20px);
    transition: 1s 1s backdrop-filter;
  }

  // 移动端侧栏位移
  &.mobile-offset {
    margin-left: $mobileAsideWidth !important;
  }

  .mask-box {
    // padding: 10px;
    line-height: initial;
    border-radius: 10px;
    @include themify($themes) {
      color: themed('font-lv0-color');
      background-color: themed('main-bg-color');
    }
  }
}
</style>