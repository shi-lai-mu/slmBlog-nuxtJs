<template>
  <ComRow class="article-reply__container row-box" title="发表评论" tooltip="说点什么吧!" hideTabBorder>
    <ArticleReplyAdd editor-id="articleReplayList" :articleId="articleId" @replaySuccess="replaySuccess"/>
    <template v-if="ssr.total || loading">
      <ComRow v-if="ssr.total" class="reply-list" :title="`评论 (${commentList.total})`" hideTabBorder hideRowBox>
        <ArticleReply ref="ArticleReply" :ssr="commentList" :articleId="articleId" />
      </ComRow>
      <div v-else class="not-replay">
        暂无评论哇~快来占个位呗!
      </div>
    </template>
    <div class="tips" v-if="commentList.list && commentList.list.length >= commentList.total">
      已经全部加载完啦!
    </div>
    <div class="loading-box" v-show="loading">
      <i slot="indicator" class="slm blog-loading"></i>
      <span>加载中...</span>
    </div>
  </ComRow>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';

import { Request } from '@/interface/request';
import { Article } from '@/interface/request/article';

import ArticleReply from './ArticleReply.vue';
import ComRow from '@/components/public/Row.vue';
import ArticleReplyAdd from './ArticleReplyAdd.vue';
import { getCommentList } from '@/core/service/data/article';

/**
 * 评论列表组件
 */
@Component({
  name: 'ArticleReplyList',
  components: {
    ComRow,
    ArticleReply,
    ArticleReplyAdd,
  },
})
export default class ArticleReplyList extends Vue {
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Object) ssr!: Request.ListTotal<Article.Comment>;
  /**
   * 文章ID
   */
  @Prop(Number) articleId!: number;
  /**
   * 单页个数
   */
  @Prop(Number) pageSize?: number;
  /**
   * 加载状态
   */
  loading: boolean = true;
  /**
   * 回复列表
   */
  commentList!: Request.ListTotal<Article.Comment>;

  @Watch('ssr')
  ssrChanged(ssr: Request.ListTotal<Article.Comment>) {
    this.commentList = ssr;
    this.loading = false;
  }

  created() {
    const { ssr } = this;
    if (ssr) {
      this.commentList = ssr;
      this.loading = false;
    }
    this.$observer.on('scrollBottom', this.scrollBottomEvent);
  }

  destroyed() {
    this.$observer.off('scrollBottom', this.scrollBottomEvent);
  }


  /**
   * 滚动到底部事件
   */
  async scrollBottomEvent() {
    const { total, list, page } = this.commentList;
    if (list.length >= total) return false;
    if (!this.loading) {
      this.loading = true;
      const { success, result } = await getCommentList(this.articleId, page + 1, this.pageSize);
      if (success) {
        list.push(...result.list);
        this.commentList.page = result.page;
      }
      this.loading = false;
    }
  }

  
  /**
   * 评论成功回调
   * @param res 回复成功后的响应信息
   */
  replaySuccess(res: Request.Result<Article.Comment>) {
    this.commentList.list.unshift(res.result);
    this.commentList.total++;
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

  .tips {
    margin-top: 20px;
    text-align: center;
    color: var(--c-text-disabled);
  }
</style>