<template>
  <div>
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
.banner-home {
  position: relative;
  margin-top: -60px;
  background-image: url('/banner/home_1.jpg');

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: .2);
  }
}
</style>
