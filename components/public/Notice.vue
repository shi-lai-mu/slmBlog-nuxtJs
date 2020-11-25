<template>
  <!-- 公告组件[公共] -->
  <div class="row-box">
    <h4 class="row-title"><i class="slm blog-lujing"></i>公告</h4>
    <div class="row-content">
      欢迎访问史莱姆的博客，本博客已重构为NUXTJS【最近因为工作繁忙，博客从五月起停止文章更新及站点更新，有空后会继续补坑】博客系统出现问题欢迎邮件至  admin@slmblog.com
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Notice extends Vue {}
</script>