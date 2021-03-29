<template>
  <div>
    <!-- <ATextArea class="reply-textarea" placeholder="欢迎留下你的足迹~"></ATextArea> -->
    <Editor class="reply-textarea" placeholder="欢迎留下你的足迹~" :menus="false" :height="100" :id="EditorId" />
    <a-row class="reply-user-inputs" type="flex" justify="space-between">
      <a-col :lg="{ span: 7 }" :xs="{ span: 24 }" :span="1">
        <a-input placeholder="昵称 (必填)" v-model="nickname" />
      </a-col>
      <a-col :lg="{ span: 7 }" :xs="{ span: 24 }" :span="1">
        <a-input placeholder="邮箱 (必填)" v-model="email" />
      </a-col>
      <a-col :lg="{ span: 7 }" :xs="{ span: 24 }" :span="1">
        <a-input placeholder="网站/博客 (选填)" v-model="link" />
      </a-col>
    </a-row>
    <div class="reply-user-footer">
      <a-button><i class="slm blog-qinggan"></i></a-button>
      <a-button type="primary">发表评论</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Input, Col, Row, Button } from 'ant-design-vue';

import Editor from '@/components/public/Editor.vue';

/**
 * 添加评论
 */
@Component({
  components: {
    Editor,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AButton: Button,
    ATextArea: Input.TextArea,
  },
})
export default class ArticleReplyAdd extends Vue {
  @Prop() EditorId!: string;
  /**
   * 昵称
   */
  nickname: string = '';
  /**
   * 邮箱
   */
  email: string = '';
  /**
   * 相关链接
   */
  link: string = '';
  
  mounted() {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
  .reply-textarea {
    height: 100px;
    margin-top: 10px;
  }

  .reply-user-inputs {
    margin: 20px 0 10px;

    .ant-col {
      margin-bottom: 10px;
    }
  }

  .reply-user-footer {
    display: flex;
    justify-content: flex-end;

    .ant-btn {
      margin-left: 10px;
    }
  }

  /deep/ .w-e-text-container {
    border-radius: 5px !important;
  }

  /deep/ .w-e-toolbar {
    display: none;
  }
</style>
