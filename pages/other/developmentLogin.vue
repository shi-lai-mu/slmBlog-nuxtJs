<template>
  <div>
    <div class="dev-error-page max-content">
      <div class="content-box row-box">
        X 请勿试图开启开发者工具！
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class DevelopmentLoginPage extends Vue {}
</script>

<style lang="scss" scoped>
  .dev-error-page {
    min-height: 80vh;
    padding: 100px 20px 0;
    margin: 0 auto;
    font-size: 2em;

    .content-box {
      display: flex;
      min-height: 60vh;
      padding: 0;
      justify-content: center;
      align-items: center;
    }
  }
</style>