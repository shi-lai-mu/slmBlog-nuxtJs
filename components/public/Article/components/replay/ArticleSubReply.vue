<template>
  <div>
    <div class="comment-item" v-for="(item, key) in ssr.list" :key="key">
      <div class="comment-box">
        <div class="avatar-box">
          <a-popover placement="topLeft">
            <div v-if="item.user" class="avatar">
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
          <div class="comment-content">
            <span class="comment-meta">{{ item.nickname || item.user.nickname }}</span>
            <span v-html="item.content"></span>
          </div>
          <div class="tool">
            <time class="comment-metadata">{{ $tool.format.isoToDateTime(item.updateTime) }}</time>
            <a-button type="link" size="small">
              <i class="slm blog-like"></i>
              <span>123</span>
            </a-button>
            <a-button type="link" size="small">
              <i class="slm blog-tread"></i>
              <span>567</span>
            </a-button>
            <a-button @click="appendReply(item)" type="link" size="small">{{replyStore[item.id] !== undefined ? '收起' : '回复'}}</a-button>
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
      <div class="subcomment" v-if="item.subComment">
        <ArticleReply :ssr="item.subComment.list" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Input, Col, Row, Button, Popover } from 'ant-design-vue';

import api from '@/config/api';
import { GlobalTool } from '@/utils/tool';
import { Article } from '@/interface/request/article';

import ComRow from '@/components/public/Row.vue';
import ArticleReplyAdd from './ArticleReplyAdd.vue';
import UserCard from '@/components/public/UserCard.vue';
import { Request } from '@/interface/request';


@Component({
  name: 'ArticleSubReply',
  components: {
    ComRow,
    UserCard,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AButton: Button,
    ArticleReplyAdd,
    APopover: Popover,
    ATextArea: Input.TextArea,
  }
})
export default class ArticleSubReply extends Vue {
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Object) ssr!: Request.ListTotal<Article.Comment>;
  /**
   * 文章ID
   */
  @Prop(Number) articleId!: Article.Base['id'];
  /**
   * 父级评论ID
   */
  @Prop(Number) parentId!: Article.Comment['id'];
  /**
   * 评论回复存储
   */
  replyStore: { [k: number]: string } = {};


  /**
   * 添加回复
   */
  appendReply(item: Article.Base) {
    this.replyStore[item.id] = this.replyStore[item.id] !== undefined ? undefined : null;
    this.$forceUpdate();
  }


  /**
   * 获取头像链接
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
    this.ssr.list.push(res.result);
    this.$forceUpdate();
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/articleReply.scss';

.comment-item {
  padding: 10px;
  margin-bottom: 0;
  background-color: var(--c-bg-tertiary);
  transition: .2s ease-in;
  cursor: pointer;
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
  transition: .5s ease-in-out;
  cursor: pointer;

  .avatar {
    transition: .5s ease-in-out;
  }

  &:hover {
    overflow: initial;
    transform: scale(.5);
    
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


.subcomment {
  margin-top: 10px;
  margin-left: 50px;
}
</style>