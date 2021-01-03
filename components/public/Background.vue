<template>
  <canvas class="canvas-bg" width="1920" height="1080" ref="canvas"></canvas>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import Background from '@/utils/background';

/* 背景组件 */
@Component()
export default class VueBackground extends Vue {
  mounted () {
    this.$nextTick(() => {
      new Background(this.$refs.canvas);
    });
  }
}
</script>

<style>
.canvas-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>