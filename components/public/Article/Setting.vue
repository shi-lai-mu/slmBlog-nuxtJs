<template>
  <Row icon="shezhi" title="增强设置">
    <a-form :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="仅登录用户可浏览">
        <a-switch v-model="options.isLoginView" />
      </a-form-item>
      <a-form-item label="游客不可见">
        <a-switch v-model="options.isTouristNotVisible" />
      </a-form-item>
      <a-form-item label="允许评论">
        <a-switch v-model="options.allowComments" />
      </a-form-item>
      <a-form-item label="不允许游客评论">
        <a-switch v-model="options.guestNotComments" />
      </a-form-item>
      <a-form-item label="浏览密码">
        <a-input type="password" v-model="options.browsePwd" />
      </a-form-item>
      <a-form-item label="文章音乐">
        <a-input v-model="options.articleMusic" />
      </a-form-item>

      <a-divider orientation="left">授权项</a-divider>
      <a-form-item label="禁止百度谷歌收录本文">
        <a-switch v-model="options.prohibitSeo" />
      </a-form-item>
      <a-form-item label="禁止复制文章内容">
        <a-switch v-model="options.prohibitCopy" />
      </a-form-item>
      <a-form-item label="文章注明为转载">
        <a-input v-model="options.markReprinted" placeholder="(须已授权)转载处链接 http://xxxxx" />
      </a-form-item>
      <a-form-item label="复制文章内容带上注释">
        <a-textArea v-model="options.copyContentComment" placeholder="复制内容末尾的文字..." />
      </a-form-item>

      <a-divider orientation="left">生成项</a-divider>
      <a-form-item label="生成文章结构树">
        <a-switch v-model="options.generateTree" />
      </a-form-item>
      <a-form-item label="允许分析文章关键词">
        <a-switch v-model="options.parseWordKey" />
      </a-form-item>
      <a-form-item label="大图需二次点击">
        <a-switch v-model="options.bigImgdbClick" />
      </a-form-item>

      <a-divider orientation="left">通知项</a-divider>
      <a-form-item label="有评论时邮件通知">
        <a-switch v-model="options.notification.commentingToEmail" />
      </a-form-item>
      <a-form-item label="被置顶时邮件通知">
        <a-switch v-model="options.notification.setTopToEmail" />
      </a-form-item>
      <a-form-item label="被设精时邮件通知">
        <a-switch v-model="options.notification.setFineToEmail" />
      </a-form-item>
    </a-form>
  </Row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import {
  Form,
  Switch,
  Input,
  Divider,
} from 'ant-design-vue';

import Row from '@/components/public/Row.vue';

@Component({
  components: {
    Row,
    AForm: Form,
    AFormItem: Form.Item,
    ASwitch: Switch,
    AInput: Input,
    ATextArea: Input.TextArea,
    ADivider: Divider,
  }
})
export default class ArticleSetting extends Vue {

  options = {
    // 仅登录用户可浏览
    isLoginView: false,
    // 游客不可见
    isTouristNotVisible: false,
    // 允许评论
    allowComments: true,
    // 不允许游客评论
    guestNotComments: false,
    // 浏览密码
    browsePwd: '',
    // 文章音乐
    articleMusic: '',

    // 禁止百度谷歌收录本文
    prohibitSeo: false,
    // 禁止复制文章内容
    prohibitCopy: false,
    // 文章注明为转载
    markReprinted: '',
    // 复制文章内容带上注释
    copyContentComment: '',

    // 生成文章结构树
    generateTree: true,
    // 分析文章关键词
    parseWordKey: true,
    // 大图需要二次点击
    bigImgdbClick: true,

    // 通知
    notification: {
      // 有评论时
      commentingToEmail: true,
      // 置顶时
      setTopToEmail: true,
      // 设精时
      setFineToEmail: true,
    }
  }
}
</script>

<style lang="scss" scoped>
  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-input {
    width: 90%;
  }

  /deep/.ant-form-item-control {
    text-align: right;
  }

  .ant-divider  {
    color: var(--c-text-primary);
    &::after, &::before {
      border-color: var(--c-border-primary)
    }
  }
</style>
