<template>
  <!-- 用户信息展示卡片 -->
  <div class="row-box user-card">
    <div class="user-cover" :style="`background-image: url(${$config.ossLink}/user/card-bg-cover.jpg);`">
      <img class="user-avatar" src="//thirdqq.qlogo.cn/g?b=sdk&k=s3zxCIMMOxfQibT9H8la8zg&s=100?v=1603024316672" alt="">
    </div>
    <div class="row-content">
      content
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class UserCard extends Vue {
  /**
   * 展示的用户ID
   */
  @Prop(Number) userId?: number;
  
}
</script>

<style scoped lang="scss">
  .user-card {
    overflow: hidden;
    padding: 0;
  }
  .user-cover {
    min-height: 150px;
    
    .user-avatar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 80px;
      height: 80px;
      margin: auto;
      border-radius: 50%;
    }
  }
</style>