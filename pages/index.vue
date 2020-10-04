<template>
  <div class="home-page">
    <div class="top-banner banner-home"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class HomePage extends Vue {
  // code...
}
</script>

<style lang="scss">
.home-page {
  position: relative;
  padding-top: 500px !important;

  .banner-home {
    position: absolute;
    z-index: -1;
    top: 0;
    background-image: url('/banner/home_2.jpg');

    &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000, $alpha: .4);
      @include themify($themes, 1) {
        box-shadow: inset 0 -30px 20px themed('main-bg-color');
      }
    }
  }
}
</style>
