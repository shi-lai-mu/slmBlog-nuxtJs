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

import { getNotic } from '@/core/service/data/notify';
import { Request } from '@/interface/request';
import { Notify } from '@/interface/request/notify';

@Component
export default class Notice extends Vue {
  @Prop(String) ssr?: string;

  /**
   * 公告
   */
  notice?: string = '';


  async created() {
    if (!this.ssr) {
      // 非SSR状态异步获取公告内容
      this.setRenderData(await getNotic())
    }
  }


  /**
   * 设置渲染数据
   */
  setRenderData(data: Request.Result<Notify.Notic>) {
    this.notice = data.success
      ? data.result.message
      : '公告获取失败!'
    ;
  }
}
</script>