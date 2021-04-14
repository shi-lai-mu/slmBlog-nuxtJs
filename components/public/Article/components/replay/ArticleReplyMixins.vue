<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import { Article } from '@/interface/request/article';


/**
 * 回复组件
 */
@Component
export default class ArticleReplyMixins extends Vue {
  /**
   * 点赞/点踩 方法
   * @param reply    行为的目标评论
   * @param loveType 踩赞状态 (1: 赞， 2: 踩)
   */
  async submitReplyBehaviorGood(reply: Article.Comment, loveType: 1 | 2) {
    console.log(reply, loveType);
  }
}
</script>

<style lang="scss" scoped>
</style>