<template>
  <div>
    <div class="row-box">
      <h4 class="row-title"><i class="slm blog-guanfang"></i>发布注意事项</h4>
      <div class="row-content">
        <p>发布文章后会进入审核阶段，管理员会在一个工作日内审核完成！</p>
        <p>感谢为本站贡献文章(*^▽^*)，我们一起进步共同探讨！</p>
      </div>
    </div>
    <!-- <a-divider orientation="left">理论</a-divider> -->

    <div class="row-box">
      <h4 class="row-title"><i class="slm blog-shezhi"></i>增强设置</h4>
      <div class="row-content">
        <a-form :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
          <a-form-item label="仅登录用户可浏览"><a-switch /></a-form-item>
          <a-form-item label="游客不可见"><a-switch /></a-form-item>
          <a-form-item label="允许评论"><a-switch /></a-form-item>
          <a-form-item label="不允许游客评论"><a-switch /></a-form-item>
          <a-form-item label="浏览密码"><a-input type="password" /></a-form-item>
          <a-form-item label="文章音乐"><a-input /></a-form-item>

          <a-divider orientation="left">授权项</a-divider>
          <a-form-item label="禁止百度谷歌收录本文"><a-switch /></a-form-item>
          <a-form-item label="禁止复制文章内容"><a-switch /></a-form-item>
          <a-form-item label="文章注明为转载"><a-input placeholder="(须已授权)转载处链接 http://xxxxx" /></a-form-item>
          <a-form-item label="复制文章内容带上注释"><a-textArea placeholder="复制内容末尾的文字..." /></a-form-item>

          <a-divider orientation="left">生成项</a-divider>
          <a-form-item label="生成文章结构树"><a-switch /></a-form-item>
          <a-form-item label="允许分析文章关键词"><a-switch /></a-form-item>
          <a-form-item label="大图需二次点击"><a-switch /></a-form-item>

          <a-divider orientation="left">通知项</a-divider>
          <a-form-item label="有评论时邮件通知"><a-switch /></a-form-item>
          <a-form-item label="被置顶时邮件通知"><a-switch /></a-form-item>
          <a-form-item label="被设精时邮件通知"><a-switch /></a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import {
  Form,
  Switch,
  Input,
  Divider,
} from 'ant-design-vue';

@Component({
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ASwitch: Switch,
    AInput: Input,
    ATextArea: Input.TextArea,
    ADivider: Divider,
  }
})
export default class ArticleSetting extends Vue {
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
    @include themify($themes) {
      &::after, &::before {
        border-color: themed('border-bottom-color');
      }
      color: themed('font-lv1-color');
    }
  }
</style>
