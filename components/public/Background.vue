<template>
  <canvas class="canvas-bg" width="1920" height="1080" ref="canvas"></canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Background from '@/utils/background';

/* 背景组件 */
@Component
export default class VueBackground extends Vue {

  bg!: Background;

  mounted() {
    this.$nextTick(() => {
      this.bg = new Background(this.$refs.canvas as HTMLCanvasElement);
    });
  }

  destroyed() {
    this.bg.isStop = true;
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