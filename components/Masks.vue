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
    @click.self="close"
  >
    <i :class="['slm', 'blog-back', $store.state.themes.mainFColor]" @click="close"></i>
    <div :class="['mask-box', { 'show-popup': showAni }]" :style="maskBoxStyle || {}">
      <slot></slot>
    </div>
    <slot name="mask-root"></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class Masks extends Vue {
  /**
   * 背景模式 [blur-mask: 模糊]
   */
  @Prop(String) maskBackageMode?: string
  /**
   * 样式调整
   */
  @Prop(Object) styleList
  /**
   * 是否带有遮罩背景
   */
  @Prop(Boolean) disableMask
  /**
   * 是否显示
   */
  @Prop(Boolean) hide
  /**
   * maskBox style
   */
  @Prop(Object) maskBoxStyle
  /**
   * 是否禁用
   */
  disable: boolean = false
  /**
   * 出现动画
   */
  showAni: boolean = false

  created() {
    this.disable = this.hide || false
  }

  /**
   * 关闭组件
   */
  close() {
    this.disable = true
    this.$emit('close')
    this.$$store.commit('maskUpdate', false)
  }

  @Watch('hide')
  showChang(val: boolean) {
    if (!val) {
      setTimeout(() => (this.showAni = true))
      setTimeout(() => (this.showAni = false), 450)
    }
    this.disable = val
    this.$$store.commit('maskUpdate', !val)
  }
}
</script>

<style lang="scss" scoped>
// 移动端侧栏位移
.layout-header .masks.mask-style.mobile-offset {
  margin-left: $mobileAsideWidth !important;
}
.masks {
  position: fixed;
  z-index: 1000;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  cursor: initial;

  &.mask-style {
    background-color: rgba($color: #050505, $alpha: 0.4);
    backdrop-filter: inherit;
  }

  &.blur-mask {
    backdrop-filter: saturate(200%) blur(9px);
    transition: 1s 1s backdrop-filter;
    perspective: 1000px;
    transition: 0.5s;
  }

  .mask-box {
    // padding: 10px;
    line-height: initial;
    background-clip: padding-box;
    // border: 1px solid var(--c-border-overlay);
    border-radius: 6px;
    // box-shadow: var(--c-dropdown-shadow);
    background-color: var(--c-bg-overlay);
  }

  .blog-back {
    display: none;
  }
}

.show-popup {
  animation: showPopup 0.45s ease forwards;
}

@keyframes showPopup {
  0% {
    transform: rotate3d(1, 1, 0, 90deg);
  }
  50% {
    transform: rotate3d(1, 1, 0, -10deg);
  }
  100% {
    transform: rotate3d(0, 0, 0, 0deg);
  }
}

// 小于500px的屏幕切换为全屏弹窗并显示返回按钮
@media screen and (max-width: 500px) {
  .masks {
    .mask-box {
      padding-top: 50px;
      width: 100vw;
      height: 100vh;

      & > div {
        width: 100% !important;
      }
    }

    .blog-back {
      position: absolute;
      z-index: 666;
      display: block;
      top: 5px;
      right: 20px;
    }
  }
}
</style>
