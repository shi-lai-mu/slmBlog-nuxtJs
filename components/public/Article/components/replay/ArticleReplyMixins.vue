<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, State } from 'nuxt-property-decorator';

import { Article } from '@/interface/request/article';
import { submitReplyBehavior } from '@/core/service/data/article';


@Component
export default class ArticleReplyMixins extends Vue {

  @State
  jwt!: string;

  /**
   * 点赞/点踩 方法
   * @param articleId 文章ID
   * @param loveType  踩赞状态 (1: 赞， 2: 踩)
   * @param reply     行为的目标评论
   */
  async submitReplyBehaviorGood(articleId: number, loveType: 1 | 2, reply?: Article.Comment) {
    if (!this.jwt) {
      return this.$message.error('此操作需要登录!');
    }

    const submitquery = await submitReplyBehavior(
      articleId,
      loveType,
      reply ? reply.id : 0,
    );

    if (reply && submitquery.success) {
      if (reply.likeStatus) {
        if (reply.likeStatus === 1) reply.loveNum--;
        if (reply.likeStatus === 2) reply.criticismNum--;
      }
      reply.likeStatus = 0;
      const { state } = submitquery.result;
      if (state.praise) {
        reply.likeStatus = 1;
        reply.loveNum++;
      } else if (state.criticism) {
        reply.likeStatus = 2;
        reply.criticismNum++;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>