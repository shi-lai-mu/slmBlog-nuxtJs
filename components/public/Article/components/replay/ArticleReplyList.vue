<template>
  <ComRow
    v-if="commentList"
    class="article-reply__container row-box"
    title="发表评论"
    tooltip="说点什么吧!"
    hideTabBorder
  >
    <ArticleReplyAdd editor-id="articleReplayList" :articleId="articleId" @replaySuccess="replaySuccess"/>
    <template v-if="((commentList.total) || !loading) && commentList.list">
      <ComRow class="reply-list" :title="`评论 (${commentList.total})`" hideTabBorder hideRowBox>
        <ArticleReply ref="ArticleReply" :ssr="commentList" :articleId="articleId" />
      </ComRow>
    </template>
    <template v-else>
      <div class="tips" v-if="!loading && commentList.list.length >= commentList.total">
        已经全部加载完啦!
      </div>
    </template>
    <div class="loading-box" v-show="loading || commentList.total === undefined">
      <i slot="indicator" class="slm blog-loading"></i>
      <span>评论加载中...</span>
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

const defaultPageSize = 10;

/**
 * 评论列表组件
 */
@Component({
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
  loading: boolean = false;
  /**
   * 回复列表
   */
  commentList: Request.ListTotal<Article.Comment> = {
    list: [],
    total: 0,
    pageSize: defaultPageSize,
    page: 0,
  };
  /**
   * 加载完成状态
   */
  loadEnd: boolean = false;

  @Watch('ssr')
  ssrChanged(ssr: Request.ListTotal<Article.Comment>) {
    this.commentList = ssr;
    this.loading = false;
  }

  created() {
    const { ssr, articleId } = this;
    if (ssr) {
      this.commentList = ssr;
      this.loading = false;
    } else if (articleId) {
      this.fetchData();
    }
    this.$observer.on('scrollBottom', this.scrollBottomEvent);
  }

  destroyed() {
    this.$observer.off('scrollBottom', this.scrollBottomEvent);
  }


  /**
   * 滚动到底部事件
   */
  scrollBottomEvent() {
    if (!this.commentList) return;
    const { total, list } = this.commentList;
    if (list?.length >= total || this.loadEnd || !total) return false;
    this.fetchData();
  }


  /**
   * 获取评论数据方法
   */
  async fetchData() {
    const { articleId, commentList } = this;
    if (this.loading || !articleId) {
      return;
    }

    this.loading = true;
    const { page } = commentList;
    const { success, result } = await getCommentList(
      articleId,
      (page ?? 0) + 1,
      this.pageSize ?? defaultPageSize,
    );

    if (success) {
      commentList.list.push(...result.list);
      commentList.page = result.page;
      commentList.total = result.total;
    } else {
      this.loadEnd = true;
    }
    this.loading = false;
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

  .tips {
    margin-top: 20px;
    text-align: center;
    color: var(--c-text-disabled);
  }
</style>