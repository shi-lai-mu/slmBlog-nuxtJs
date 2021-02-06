<template>
  <div class="slm-image">
    <img :class="'img image-' + (mode || 'cover')" v-if="src" :src="src" :alt="alt" :title="title" v-img>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch }   from 'nuxt-property-decorator';

/**
 * 图片组件
 * - cover: 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
 * - heightFix:	缩放模式，高度不变，宽度自动变化，保持原图宽高比不变
 * - widthFix:	缩放模式，宽度不变，高度自动变化，保持原图宽高比不变
 */
@Component
export default class Imager extends Vue {
  @Prop(String) src?: string;
  @Prop(String) alt?: string;
  @Prop(String) title?: string;
  @Prop(String) mode?: 'cover' | 'widthFix' | 'heightFix';
}
</script>

<style  lang="scss" scoped>
.slm-image {
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;

  .img {
    object-fit: cover;
  }

  .image-cover {
    min-width: 100%;
  }

  .image-widthFix {
    width: 100%;
  }

  .image-heightFix {
    height: 100%;
  }
}
</style>