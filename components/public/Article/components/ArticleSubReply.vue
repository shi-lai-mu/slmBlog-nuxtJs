<template>
  <div>
    <div class="comment-item" v-for="(item, key) in ssr" :key="key">
      <div class="comment-box">
        <div class="avatar-box">
          <object class="avatar" :data="getAvatarUrl(item.nickname)" type="image/svg+xml"/>
        </div>
        <div class="comment-right">
          <div class="comment-content">
            <span class="comment-meta">{{ item.nickname }}</span>
            {{ item.content }}
          </div>
          <div class="tool">
            <time class="comment-metadata">2星期</time>
            <a-button type="link" size="small">
              <i class="slm blog-like"></i>
              <span>123456798</span>
            </a-button>
            <a-button type="link" size="small">
              <i class="slm blog-tread"></i>
              <span>123456798</span>
            </a-button>
            <a-button @click="appendReply(item)" type="link" size="small">{{replyStore[item.id] !== undefined ? '收起' : '回复'}}</a-button>
            <ArticleReplyAdd v-if="replyStore[item.id] !== undefined"/>
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
import { Input, Col, Row, Button } from 'ant-design-vue';
import { GlobalTool } from '@/utils/tool';

import api from '@/config/api';
import ComRow from '@/components/public/Row.vue';
import ArticleReplyAdd from './ArticleReplyAdd.vue';
import { Article } from '@/interface/request/article';

@Component({
  name: 'ArticleSubReply',
  components: {
    ComRow,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AButton: Button,
    ArticleReplyAdd,
    ATextArea: Input.TextArea,
  }
})
export default class ArticleSubReply extends Vue {
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Array) ssr: Article.Base[];
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
}
</script>

<style lang="scss" scoped>
.comment-item {
  padding: 10px;
  margin-bottom: 0;
  background-color: var(--c-bg-tertiary);
  border-radius: 5px 5px 0 0;
  transition: .2s ease-in;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
    border-radius: 0 0 5px 5px;
  }
}

.comment-right .comment-content {
  margin-top: 0;
}

.avatar-box {
  overflow: hidden;
  width: 30px;
  min-width: 30px;
  height: 30px;
  margin-right: 10px;
  background-color: var(--c-avatar-bg);
  border: 3px solid var(--c-avatar-border);
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