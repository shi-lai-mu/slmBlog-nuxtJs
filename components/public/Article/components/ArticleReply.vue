<template>
  <div>
    <div class="comment-item" v-for="(item, key) in ssr" :key="key">
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
          <div class="comment-meta">{{ item.nickname }}</div>
          <div class="comment-content">{{ item.content }}</div>
          <div class="tool">
            <time class="comment-metadata">{{ $tool.format.isoToDateTime(item.updateTime) }}</time>
            <a-button type="link" size="small">
              <i class="slm blog-like"></i>
              <span>123</span>
            </a-button>
            <a-button type="link" size="small">
              <i class="slm blog-tread"></i>
              <span>345</span>
            </a-button>
            <a-button @click="appendReply(item)" type="link" size="small">{{replyStore[item.id] !== undefined ? '收起' : '回复'}}</a-button>
            <ArticleReplyAdd v-if="replyStore[item.id] !== undefined"/>
          </div>
        </div>
      </div>
      <div class="subcomment" v-if="item.subComment">
        <ArticleSubReply :ssr="item.subComment.list" />
      </div>
    </div>

    <a-pagination
      v-model="current"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
      :page-size="pageSize"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Input, Col, Row, Button, Popover, Pagination } from 'ant-design-vue';

import api from '@/config/api';
import ComRow from '@/components/public/Row.vue';
import ArticleReplyAdd from './ArticleReplyAdd.vue';
import ArticleSubReply from './ArticleSubReply.vue';
import UserCard from '@/components/public/UserCard.vue';

import { GlobalTool } from '@/utils/tool';
import { Article } from '@/interface/request/article';
import './styles/articleReply.scss';

@Component({
  name: 'ArticleReply',
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
    APagination: Pagination,
    ATextArea: Input.TextArea,
  }
})
export default class ArticleReply extends Vue {
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Array) ssr: Article.Base[];
  /**
   * 评论回复存储
   */
  replyStore: { [k: number]: string } = {};

  pageSizeOptions = ['10', '20', '30', '40', '50']
  current = 1
  pageSize = 10
  total = 50

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
// @import url('');
</style>