<template>
  <ComRow class="article-reply__container row-box" title="发表评论" tooltip="说点什么吧!" hideTabBorder>
    <ArticleReplyAdd editor-id="articleReplayList"/>
    <ComRow class="reply-list" :title="`评论 (${ssr.total})`" hideTabBorder hideRowBox>
      <ArticleReply :ssr="ssr.list" />
    </ComRow>
  </ComRow>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import ArticleReply from './ArticleReply.vue';
import ComRow from '@/components/public/Row.vue';
import ArticleReplyAdd from './ArticleReplyAdd.vue';

@Component({
  name: 'ArticleReplyList',
  components: {
    ComRow,
    ArticleReply,
    ArticleReplyAdd,
  }
})
export default class ArticleReplyList extends Vue {
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Object) ssr;
}
</script>

<style lang="scss" scoped>
  .reply-list {
    margin-top: 50px;
  }
</style>