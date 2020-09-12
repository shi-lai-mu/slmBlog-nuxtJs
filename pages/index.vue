<template>
  <div>
    <div class="top-banner banner-home"></div>
    <div class="tst"></div>
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
.banner-home {
  position: relative;
  margin-top: -60px;
  background-image: url('/banner/home_2.jpg');

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: .4);
    @include themify($themes, 1) {
      box-shadow: inset 0 -30px 20px themed('bg-dp11-color');
    }
  }
}
.tst {
  height: 100vh;
  width: 100px;
  background-color: red;
}
</style>
