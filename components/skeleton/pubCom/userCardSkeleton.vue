<template>
  <div class="skeleton">
    <div class="user-cover">
      <span class="user-avatar"></span>
    </div>
    <div class="row-content">
      <span class="user-nickname skeleton-title skeleton-center"></span>
      <span class="user-introduction skeleton-desc skeleton-center"></span>
      <div class="user-state-row">
        <ul v-for="(item, index) in 3" :key="index" class="stete-item">
          <li class="state-item-tag skeleton-tag skeleton-center"></li>
          <li class="skeleton-tag skeleton-center"></li>
        </ul>
      </div>
      <ul class="user-icon">
        <span
          v-for="(item, index) in 4"
          :key="index"
          class="slm skeleton-icon skeleton-center"
        ></span>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
/**
 * 用户卡骨架
 */
@Component
export default class UserCardSkeleton extends Vue {}
</script>
