<template>
  <div>
    <!-- <ATextArea class="reply-textarea" placeholder="欢迎留下你的足迹~"></ATextArea> -->
    <Editor class="reply-textarea" placeholder="欢迎留下你的足迹~" :menus="false" :height="100" :id="EditorId" v-model="content" />
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
      <a-button type="primary" @click="submit">发表评论</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Input, Col, Row, Button } from 'ant-design-vue';

import Editor from '@/components/public/Editor.vue';
import { submitArticleReplay } from '~/core/service/data/article';
import { submitArticleReplayDto } from '~/core/dto/article';

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
  /**
   * 编辑器ID
   */
  @Prop() EditorId!: string;
  /**
   * 回复目标文章
   */
  @Prop(Number) articleId!: number;
  /**
   * 评论父级ID
   */
  @Prop(Number) parentId?: number;
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
  /**
   * 评论内容
   */
  content: string = '';

  /**
   * 提交评论方法
   */
  async submit() {
    const { articleId, content, nickname, email, link, parentId } = this;
    console.log(this);
    let submitData: submitArticleReplayDto = {
      content,
    };

    // 非登录用户 检测与数据插入
    if (!nickname || !email) {
      if (!this.$$store.state.jwt) {
        return this.$message.error('非登录用户必须填写 昵称 和 邮箱 才能评论!');
      }
    } else {
      submitData = {
        content,
        nickname,
        email,
        link,
      };
    }
    // (&lt;(?i)(|)[^]*/?&gt;)

    // 父级评论绑定
    if (parentId) submitData.parentId = parentId;

    submitData.content = content
      .replace(/<img /g, '<-img ')
      .replace(/<(\/)?[a-zA-Z]+[1-9]?[^><]*>/g, '')
      .replace(/<-img /g, '<img ')
    ;

    const submit = await submitArticleReplay(articleId, submitData);
    this.$message.success('评论成功!');
    this.$emit('replaySuccess', submit);
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
