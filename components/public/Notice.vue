<template>
  <!-- 公告组件[公共] -->
  <div class="row-box">
    <h4 class="row-title"><i class="slm blog-lujing"></i>公告</h4>
    <div class="row-content" v-if="notice" v-text="notice"></div>
    <div class="skeleton" v-else>
      <span class="skeleton-title row-content"></span>
      <span class="skeleton-content row-content"></span>
      <span class="skeleton-desc row-content"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class Notice extends Vue {
  @Prop(String) ssr?: string;

  notice?: string = '';

  created() {
    if (!this.ssr) {
      // axios code...
    }
  }
}
</script>