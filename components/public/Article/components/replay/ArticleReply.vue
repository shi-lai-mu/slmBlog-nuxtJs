<template>
  <div>
    <div class="comment-item" v-for="(item, key) in ssr.list" :key="key">
      <div class="comment-box">
        <div class="avatar-box">
          <a-popover placement="topLeft">
            <div v-if="item.user && item.user.id" class="avatar">
              <img :src="item.user.avatarUrl" :alt="item.user.nickname">
            </div>
            <object v-else class="avatar" :data="getAvatarUrl(item.nickname)" type="image/svg+xml"/>
            <template slot="content">
              <UserCard class="article-replay__user-card" :userId="item.user.id" v-if="item.user" userEntrance userState/>
              <div :style="{padding: '10px'}" v-else>游客展示暂未开发!</div>
            </template>
          </a-popover>
        </div>
        <div class="comment-right">
          <div class="comment-meta">{{ item.nickname }}</div>
          <div class="comment-content" v-html="item.content"></div>
          <div class="tool">
            <time class="comment-metadata">{{ $tool.format.isoToDateTime(item.updateTime) }}</time>
            <a-button type="link" size="small" @click="submitReplyBehaviorGood(articleId, 1, item)">
              <i :class="['slm', 'blog-like', { 'icon-clicks': item.likeStatus === 1 }]"></i>
              <span v-text="item.loveNum"></span>
            </a-button>
            <a-button type="link" size="small" @click="submitReplyBehaviorGood(articleId, 2, item)">
              <i :class="['slm', 'blog-tread', { 'icon-clicks': item.likeStatus === 2 }]"></i>
              <span v-text="item.criticismNum"></span>
            </a-button>
            <a-button @click="appendReply(item, key)" type="link" size="small">{{replyStore[item.id] !== undefined ? '收起' : '回复'}}</a-button>
          </div>
        </div>
      </div>
      <div class="subcomment">
        <ArticleSubReply
          v-if="item.subComment.list.length"
          :ssr="item.subComment"
          :parentId="item.id"
          :articleId="articleId"
        />
        <div ref="replyAdd">
          <ArticleReplyAdd
            v-if="replyStore[item.id] !== undefined"
            :editor-id="`articleReplayComment_${item.id}`"
            :parentId="item.id"
            :articleId="articleId"
            @replaySuccess="res => replaySuccess(res, key)"
          />
        </div>
      </div>
    </div>

    <div v-if="!ssr || !ssr.list || !ssr.list.length" class="not-replay">
      {{ ssr.message || '暂无评论哇~快来占个位呗!' }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Input, Col, Row, Button, Popover } from 'ant-design-vue';

import api from '@/config/api';
import ComRow from '@/components/public/Row.vue';
import ArticleReplyAdd from './ArticleReplyAdd.vue';
import ArticleSubReply from './ArticleSubReply.vue';
import UserCard from '@/components/public/UserCard.vue';
import ArticleReplyMixins from './ArticleReplyMixins.vue';

import { GlobalTool } from '@/utils/tool';
import { Request } from '@/interface/request';
import { Article } from '@/interface/request/article';


/**
 * 回复组件
 */
@Component({
  components: {
    ComRow,
    UserCard,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AButton: Button,
    ArticleReplyAdd,
    ArticleSubReply,
    APopover: Popover,
    ATextArea: Input.TextArea,
  },
  mixins: [ ArticleReplyMixins ],
})
export default class ArticleReply extends Vue {
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Object) ssr!: Request.ListTotal<Article.Comment>;
  /**
   * 文章ID
   */
  @Prop(Number) articleId!: Article.Base['id'];
  /**
   * 评论回复存储
   */
  replyStore: { [k: number]: string } = {};

  /**
   * 添加回复
   * @param item 回复评论信息
   * @param key  回复的子评论下标
   */
  appendReply(item: Article.Base, key: number) {
    this.replyStore[item.id] = this.replyStore[item.id] !== undefined ? undefined : null;
    this.$forceUpdate();
    this.$nextTick(() => {
      const { replyAdd } = this.$refs;
      if (replyAdd) {
        replyAdd[key].scrollIntoView({
          behavior: "smooth",
          block: 'center',
        });
      }
    })
  }


  /**
   * 获取头像链接
   * @param nickname 昵称
   */
  getAvatarUrl(nickname: string) {
    return GlobalTool.format.paramsUrl(api.resources.avatars, {
      nickname,
      gender: 'male',
    });
  }


  /**
   * 评论成功回调
   * @param res   回复评论响应
   * @param index 回复的子评论下标
   */
  replaySuccess(res: Request.Result<Article.Comment>, index: number) {
    const current = this.ssr.list[index];
    this.replyStore[current.id] = undefined;
    current.subComment?.list.push(res.result);
    this.$forceUpdate();
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/articleReply.scss';
.not-replay {
  display: flex;
  width: 100%;
  height: 100px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  color: var(--c-text-placeholder);
  border: 1px dashed var(--c-border-primary);
  border-radius: 5px;
}
</style>