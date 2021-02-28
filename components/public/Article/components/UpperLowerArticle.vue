<template>
  <ul class="row-box upperlower-article-box">
    <li class="switch-btn">
      <p>撒打算打算的</p>
      <p>上一篇</p>
    </li>
    <li class="switch-btn">
      <p>撒打算打算xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx的</p>
      <p>下一篇</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

/**
 * 上下篇文章切换组件
 */
@Component({
  name: 'UpperLowerArticle',
})
export default class UpperLowerArticle extends Vue {
  /**
   * 文章ID
   */
  @Prop(Number) articleId: number;
}
</script>

<style lang="scss" scoped>
  .upperlower-article-box {
    display: flex;
    margin-top: 40px;
    padding: 0;

    .switch-btn {
      width: 50%;
      padding: 10px 0;
      cursor: pointer;
      text-align: center;

      p {
        overflow: hidden;
        margin-bottom: 0;
        padding: 0 20px;
        color: var(--c-btn-text);
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &:not(:last-child) {
        border-right: 1px solid var(--c-btn-border);
      }

      &:hover {
        background-color: var(--c-btn-hover-bg);
      }

      &:active {
        background-color: var(--c-btn-selected-bg);
      }
    }
  }
</style>