<template>
  <tbody class="conter single clearfix">
    <div class="content-box friendship">
      <img src="//res.mczyzy.cn/LOGO.png" alt="slm-logo" class="logo">
      <h2>史莱姆的个人博客</h2>
      <h3>本博客涉及范围html5,css3,es6,微信小程序,网站开发,技术交流,源码分享,php,nodejs</h3>
      <button class="button-lv1">申请友链</button>
    </div>

    <ul class="content-box friendship friendship-list">
      <li>
        <a class="max-a" href="//www.teenshare.club" target="_black"></a>
        <img src="//www.teenshare.club/favicon.ico" alt="梯云博客 LOGO">
        <span class="friendship-name">梯云博客</span>
        <span class="friendship-desc">一个分享知识和资源的博客。</span>
      </li>
      <li>
        <a class="max-a" href="//www.mxsina.com" target="_black"></a>
        <img src="//www.mxsina.com/favicon.ico" alt="蔚然博客 LOGO">
        <span class="friendship-name">蔚然博客</span>
        <span class="friendship-desc">蔚然博客&技术交流</span>
        <span></span>
      </li>
      <li>
        <a class="max-a" href="//www.iwentao.top" target="_black"></a>
        <img src="//www.iwentao.top/favicon.ico" alt="竹泊博客 LOGO">
        <span class="friendship-name">竹泊博客</span>
        <span class="friendship-desc">暂无简介。</span>
        <span></span>
      </li>
    </ul>

    <div class="content-box friendship">
      <h2>友情连接申请</h2>
      <ul>
        <li>开发中,,,</li>
      </ul>
      
    </div>
  </tbody>
</template>

<script>

</script>

<style lang="less">
.friendship {
  width: 100%;
  margin: 10px 0;
  color: #353535;

  .logo {
    display: block;
    width: 13vw;
    min-width: 80px;
    max-width: 130px;
    margin: 20px auto;
  }
  h2 {
    margin-top: 20px;
    font-size: 2rem;
    text-align: center;
  }
  h3 {
    text-align: center;
    font-size: 1rem;
    color: #888;
  }
  .button-lv1 {
    width: 30%;
    display: block;
    margin: 20px auto;
  }
  &.friendship-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      float: left;
      width: 30%;
      margin: 10px 0;
      border-radius: 5px;
      padding: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
    }

    img {
      float: left;
      width: 50px;
      margin-right: 20px;
    }
    .friendship-name,
    .friendship-desc {
      float: left;
      width: calc(100% - 70px);
      font-size: 1.2rem;
    }
    .friendship-desc {
      overflow: hidden;
      font-size: 1rem;
      text-indent: 1rem;
      color: #888;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
@media screen and (max-width: 840px) {
  .friendship.friendship-list li {
    width: 90%;
  }
}
</style>
