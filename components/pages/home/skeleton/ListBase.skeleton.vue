<template>
  <div class="skeleton">
    <div class="plate-list-place">
      <a v-for="(item, k) in Array(5)" :key="k" class="plate-list-opt__link">
        <span class="opt-link__label skeleton-tag"></span>
        <span
          :class="['opt-link__title', 'line-ellipsis', k % 2 ? 'skeleton-title' : 'skeleton-desc']"
        ></span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

/** 首页 列表模型 基础骨架 */
@Component
export default class HomeListBaseSkeleton extends Vue {}
</script>

<style lang="scss" scoped>
@import '../style/list.base.scss';
</style>
