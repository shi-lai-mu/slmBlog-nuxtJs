<template>
  <ComRow class="article-reply__container row-box" title="发表评论" tooltip="说点什么吧!" v-if="ssr" hideTabBorder>
    <ArticleReplyAdd editor-id="articleReplayList" :articleId="articleId" @replaySuccess="replaySuccess" />
    <ComRow v-if="ssr.total" class="reply-list" :title="`评论 (${ssr.total})`" hideTabBorder hideRowBox>
      <ArticleReply :ssr="ssr" />
    </ComRow>
    <div v-else class="not-replay">
      暂无评论哇~快来占个位呗!
    </div>
  </ComRow>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { Request } from '@/interface/request';
import { Article } from '@/interface/request/article';

import ArticleReply from './ArticleReply.vue';
import ComRow from '@/components/public/Row.vue';
import ArticleReplyAdd from './ArticleReplyAdd.vue';

/**
 * 评论列表组件
 */
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
  @Prop(Object) ssr: Request.ListTotal<Article.Comment>;
  /**
   * 文章ID
   */
  @Prop(Number) articleId: number;

  
  /**
   * 评论成功回调
   */
  replaySuccess(res: Request.Result<Article.Comment>) {
    console.log(res);
    this.ssr.list.unshift(res.result);
  }
}
</script>

<style lang="scss" scoped>
  .reply-list {
    margin-top: 50px;
  }

  .not-replay {
    display: flex;
    width: 100%;
    height: 200px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    color: var(--c-text-placeholder);
    border: 1px dashed var(--c-border-primary);
    border-radius: 5px;
  }
</style>