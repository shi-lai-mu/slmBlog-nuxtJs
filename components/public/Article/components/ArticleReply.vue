<template>
  <ComRow class="article-reply__container row-box" :title="`评论 ( ${ssr.length} )`">
    <ATextArea class="reply-textarea" placeholder="欢迎留下你的足迹~"></ATextArea>
    <a-row class="reply-user-inputs" type="flex" justify="space-between">
      <a-col :lg="{ span: 7 }" :span="1">
        <a-input placeholder="昵称 (必填)" />
      </a-col>
      <a-col :lg="{ span: 7 }" :span="1">
        <a-input placeholder="邮箱 (必填)" />
      </a-col>
      <a-col :lg="{ span: 7 }" :span="1">
        <a-input placeholder="网站/博客 (选填)" />
      </a-col>
    </a-row>
    <div class="reply-user-footer">
      <a-button><i class="slm blog-qinggan"></i></a-button>
      <a-button type="primary">发布评论</a-button>
    </div>
    <div class="reply-list">

    </div>
  </ComRow>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Input, Col, Row, Button } from 'ant-design-vue';

import ComRow from '@/components/public/Row.vue';

@Component({
  name: 'ArticleReply',
  components: {
    ComRow,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AButton: Button,
    ATextArea: Input.TextArea,
  }
})
export default class ArticleReply extends Vue {
  /**
   * 传入的列表数据 SSR
   */
  @Prop(Array) ssr;

}
</script>

<style lang="scss" scoped>
  .reply-textarea {
    height: 100px;
  }

  .reply-user-inputs {
    margin: 20px 0 10px;
  }

  .reply-user-footer {
    display: flex;
    justify-content: flex-end;

    .ant-btn {
      margin-left: 10px;
    }
  }

  .reply-list {
    margin-top: 30px;
  }
</style>