<template>
  <div class="privacy-page row-box">
    <h2>史莱姆博客服务条款</h2>
    <p>
      初版发布日期：2021 年 01 月 16 日
      <br />
      最近更新日期：2021 年 01 月 16 日
    </p>
    <p>
      感谢您使用史莱姆博客。使用我们的服务即表示您已同意本条款。
      我们始终在不断更改和改进我们的服务。 我们可能会增加或删除功能，也可能暂停或彻底停止某项服务。
      您可以随时停止使用我们的服务，我们也可以随时停止向您提供服务，或随时对我们的服务增加新的限制。
      如果不同语言的史莱姆博客服务条款出现歧义，以简体中文版为准。
    </p>

    <h3>服务的使用</h3>
    <p>您必须在法律允许的范围内使用我们的服务。您不可以进行以下操作：</p>
    <ul>
      <li>使用我们的服务来传输任何非法内容</li>
      <li>滥用我们的服务</li>
      <li>使用任何方式干扰或破坏我们的服务</li>
      <li>对史莱姆博客的网络请求进行抓包和编辑</li>
      <li>尝试绕过我们的服务的任何限制</li>
      <li>尝试使用我们没有公开提供的接口</li>
      <li>
        将热史莱姆博客虚拟主机用于建站以外的用途，包括但不限于下载盗版文件、DDoS
        攻击、端口扫描、反向代理和爬虫
      </li>
    </ul>
    <p>如果您不遵守我们的条款或政策，我们可以暂停或停止向您提供服务</p>

    <h3>史莱姆博客账号</h3>
    <p>
      为了使用我们的某些服务，您可能需要一个本博客账号。您必须使用真实的邮箱来注册您的博客账号。我们不会给您发送任何垃圾邮件。
    </p>
    <p>
      为了保护您的博客账号，请务必保管好您的密码。不要将您的密码告诉他人。您应对自己的博客账号上发生的活动或通过该账号进行的活动负责。
      如果您发现有人在未经您授权的情况下使用了您的博客账号，请
      <span class="link-a" @click="$observer.emit('login', 'unsetPwd')">重置密码</span>。
    </p>

    <h3>隐私与版权</h3>
    <p>
      <router-link class="link-a" to="/">史莱姆博客隐私政策</router-link>
      介绍了您在使用我们的服务时，我们会如何处理您的个人数据和保护您的隐私。
      使用我们的服务即表示您同意史莱姆博客按照隐私政策使用您的个人数据。
    </p>
    <p>如果您认为有史莱姆博客发布的内容侵犯了您的版权，请与我们联系。</p>
  </div>
</template>

<script lang="ts">
// import { Carousel } from 'ant-design-vue';
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'Tos',
})
export default class TosPage extends Vue {}
</script>

<style lang="scss" scoped>
.privacy-page {
  height: auto;
  max-width: 1000px;
  padding: 80px 50px;
  margin: 20px auto 40px;
}

h2 {
  padding-bottom: 0.6em;
  font-size: 1.85rem;
  font-weight: bold;
  text-align: center;
}

h3 {
  padding: 1em 0 0.6em;
  font-weight: bold;
  font-size: 1.35em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

p {
  font-family: Helvetica, pingfang sc, microsoft yahei, sans-serif;
  font-size: 1rem;
  line-height: 1.875em;
  margin: 0 auto;
  padding: 0.4em 20px;
  word-break: break-all;
}

ul,
li {
  margin: initial;
  list-style-type: disc;
  line-height: 1.875em;
  font-size: 1rem;
}
ul {
  margin-left: 2em;
  padding-left: 20px;
}
li::marker {
  unicode-bidi: isolate;
  font-variant-numeric: tabular-nums;
  text-transform: none;
  text-indent: 0px !important;
  text-align: start !important;
  text-align-last: start !important;
}
.link-a {
  cursor: pointer;
}
</style>
