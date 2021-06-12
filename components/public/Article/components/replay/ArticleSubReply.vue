<template>
  <div v-if="ssr.list" class="sub-comment-box">
    <a-spin tip="加载中..." :spinning="loading">
      <i slot="indicator" class="slm blog-loading"></i>
      <div v-for="(item, key) in ssr.list" :key="key" class="comment-item">
        <div class="comment-box">
          <div class="avatar-box">
            <a-popover placement="topLeft">
              <div v-if="item.user" class="avatar">
                <img :src="item.user.avatarUrl" :alt="item.user.nickname" />
              </div>
              <object
                v-else
                class="avatar"
                :data="getAvatarUrl(item.nickname)"
                type="image/svg+xml"
              />
              <template slot="content">
                <UserCard
                  v-if="item.user"
                  class="article-replay__user-card"
                  :user-id="item.user.id"
                  user-entrance
                  user-state
                />
                <div v-else :style="{ padding: '10px' }">游客展示暂未开发!</div>
              </template>
            </a-popover>
          </div>
          <div class="comment-right">
            <div class="comment-content">
              <span class="comment-meta">{{ item.nickname || item.user.nickname }}</span>
              <span v-html="item.content"></span>
            </div>
            <div class="tool">
              <time class="comment-metadata">{{
                $tool.format.isoToDateTime(item.updateTime)
              }}</time>
              <a-button
                type="link"
                size="small"
                @click="submitReplyBehaviorGood(articleId, 1, item)"
              >
                <i :class="['slm', 'blog-like', { 'icon-clicks': item.likeStatus === 1 }]"></i>
                <span v-text="item.loveNum"></span>
              </a-button>
              <a-button
                type="link"
                size="small"
                @click="submitReplyBehaviorGood(articleId, 2, item)"
              >
                <i :class="['slm', 'blog-tread', { 'icon-clicks': item.likeStatus === 2 }]"></i>
                <span v-text="item.criticismNum"></span>
              </a-button>
              <a-button type="link" size="small" @click="appendReply(item)">{{
                replyStore[item.id] !== undefined ? '收起' : '回复'
              }}</a-button>
              <ArticleReplyAdd
                v-if="replyStore[item.id] !== undefined"
                :editor-id="`articleReplayComment_${item.id}`"
                :parent-id="parentId"
                :article-id="articleId"
                @replaySuccess="res => replaySuccess(res, key)"
              />
            </div>
          </div>
        </div>
      </div>
    </a-spin>
    <a-pagination
      v-if="ssr.page * ssr.pageSize < ssr.total"
      v-model="current"
      :page-size-options="pageSizeOptions"
      :total="total"
      :page-size="pageSize"
      show-size-changer
    >
      <template slot="buildOpti onText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Input, Col, Row, Button, Popover, Pagination, Spin } from 'ant-design-vue'

import api from '@/config/api'
import { GlobalTool } from '@/utils/tool'
import { Request } from '@/interface/request'
import { Article } from '@/interface/request/article'

import ComRow from '@/components/public/Row.vue'
import UserCard from '@/components/public/UserCard.vue'
import ArticleReplyAdd from './ArticleReplyAdd.vue'
import ArticleReplyMixins from './ArticleReplyMixins.vue'

/**
 * 子回复组件
 */
@Component({
  name: 'ArticleSubReply',
  components: {
    ComRow,
    UserCard,
    ARow: Row,
    ACol: Col,
    ASpin: Spin,
    AInput: Input,
    AButton: Button,
    ArticleReplyAdd,
    APopover: Popover,
    APagination: Pagination,
    ATextArea: Input.TextArea,
  },
  mixins: [ArticleReplyMixins],
})
export default class ArticleSubReply extends Vue {
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Object) ssr!: Request.ListTotal<Article.Comment>
  /**
   * 文章ID
   */
  @Prop(Number) articleId!: Article.Base['id']
  /**
   * 父级评论ID
   */
  @Prop(Number) parentId!: Article.Comment['id']
  /**
   * 评论回复存储
   */
  replyStore: { [k: number]: string } = {}
  /**
   * 加载状态
   */
  loading: boolean = false

  pageSizeOptions = ['10', '20', '30', '40', '50']
  current = 1
  pageSize = 10
  total = 50

  /**
   * 添加回复
   */
  appendReply(item: Article.Base) {
    this.replyStore[item.id] = this.replyStore[item.id] !== undefined ? undefined : null
    this.$forceUpdate()
  }

  /**
   * 获取头像链接
   */
  getAvatarUrl(nickname: string) {
    return GlobalTool.format.paramsUrl(api.resources.avatars, {
      nickname,
      gender: 'male',
    })
  }

  /**
   * 评论成功回调
   * @param res   回复评论响应
   * @param index 回复的子评论下标
   */
  replaySuccess(res: Request.Result<Article.Comment>, index: number) {
    const current = this.ssr.list[index]
    this.replyStore[current.id] = undefined
    this.ssr.list.push(res.result)
    this.$forceUpdate()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/articleReply.scss';

.comment-item {
  padding-bottom: 10px;
  margin-bottom: 0;
  background-color: var(--c-bg-tertiary);
  transition: 0.2s ease-in;
  // cursor: pointer;
}

.comment-right .comment-content {
  margin-top: 0;
  word-break: break-all;
}

.avatar-box {
  overflow: hidden;
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin-right: 10px;
  background-color: var(--c-avatar-bg);
  border-width: 1px;
  border-radius: 30px;
  transition: 0.5s ease-in-out;
  cursor: pointer;

  .avatar {
    transition: 0.5s ease-in-out;
  }

  &:hover {
    overflow: initial;
    transform: scale(0.5);

    .avatar {
      transform: scale(2);
    }
  }
}

.comment-right {
  .comment-meta {
    &::after {
      content: ':';
      margin-right: 10px;
    }
  }
}

.ant-spin-nested-loading {
  overflow: hidden;
  border-radius: 5px;
}
</style>
