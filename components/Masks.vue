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
    <i :class="[ 'slm', 'blog-back', $store.state.themes.mainFColor ]" @click="close"></i>
    <div class="mask-box">
      <slot></slot>
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
    this.$store.commit('maskUpdate', false);
  }


  @Watch('show')
  showChang(val: boolean) {
    this.disable = val;
    this.$store.commit('maskUpdate', !val);
  }
}
</script>

<style scoped lang="scss">
.masks {
  position: fixed;
  z-index: 99998;
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

  .blog-back {
    display: none;
  }
}

// 小于500px的屏幕切换为全屏弹窗并显示返回按钮
@media screen and (max-width: 500px) {
  .masks {
    .mask-box {
      padding-top: 100px;
      width: 100vw;
      height: 100vh;

      &>div {
        width: 100% !important;
      }
    }

    .blog-back {
      position: absolute;
      display: block;
      top: 5px;
      right: 20px;
    }
  }
}
</style>