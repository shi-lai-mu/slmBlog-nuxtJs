<template>
  <article class="conter single clearfix">
    <div class="content-box friendship">
      <img :src="require('~/static/LOGO.png')" alt="slm-logo" class="logo">
      <h2>史莱姆的个人博客</h2>
      <h3 class="friendship-desc">本博客涉及范围html5,css3,es6,微信小程序,网站开发,技术交流,源码分享,php,nodejs</h3>
      <a class="button-lv1" href="#no1">申请友链</a>
    </div>

    <div class="content-box friendship">
      <h2 class="friendship-tag">友情 链接</h2>
      <ul class="friendship friendship-list">
        <li v-for="(item, index) in friendship" :key="index">
          <a class="max-a" :href="item.web" target="_black"></a>
          <img :src="item.icon" alt="轩陌博客 LOGO">
          <span class="friendship-name">{{ item.name }}</span>
          <span class="friendship-desc">{{ item.desc }}</span>
        </li>
      </ul>
    </div>

    <div class="content-box friendship" id="no1">
      <h2 class="friendship-tag">友情 链接 申请</h2>

      <div class="child-box">
        <h4 class="child-tag">友链申请须知:</h4>
        <ol>
          <li><b>优先:</b>与本站相近内容、原创博客、百度收录、谷歌收录、IT网站、个人博客、技术博客、学员博客、H5</li>
          <li><b>拒收:</b>站内包含 违法内容、过多广告及广告元素</li>
          <li><b>首页:</b>内容优质、原创文章、极速访问、交互流畅、原创UI</li>
          <li><b>删除:</b>长期不能访问、删除本站友链</li>
        </ol>
      </div>

      <div class="child-box">
        <h4 class="child-tag">贵站友链内容:</h4>
        <ul>
          <li><b>名称:</b>史莱姆的博客</li>
          <li><b>域名:</b><a href="//mczyzy.cn" title="史莱姆的博客">http://mczyzy.cn</a></li>
          <li><b>简介:</b>一个注重技术研究与分享的博客。(可包含)</li>
          <li><b>图标:</b><a href="//slmblog.com/LOGO.png" title="本站LOGO">slmblog.com/LOGO.png</a></li>
        </ul>
      </div>

      <div class="child-box">
        <h4 class="child-tag">友链 申请/修改:</h4>
        <ul>
          <li><b>必须:</b>先友后链(先在贵站挂上本站友链)</li>
          <li><b>需知:</b>如果本站在贵站首页，则贵站就会在本站的首页反之则在内页或按(友链申请须知 [首页筛选] )</li>
          <li><b>邮件:</b>以友链标准格式发送至 slm@mczyzy.cn !</li>
          <li><b>感谢:</b>感谢阅读完本条约!</li>
        </ul>
      </div>

      <div class="child-box">
        <h4 class="child-tag">友链格式:</h4>
        <ul>
          <li><b>名称:</b>xxxxxxxxxx</li>
          <li><b>域名:</b>网站首页网址</li>
          <li><b>类型:</b>个人博客、IT站点 ...</li>
          <li><b>简介:</b>尽量简短的简介</li>
          <li><b>图标:</b>可以是favicon等外部图片 ...</li>
        </ul>
        <h5>ps: 博主会在尽快在贵站核实友链后，在本站按条约添加贵站的友链!谢谢合作!</h5>
      </div>

    </div>
  </article>
</template>

<script>
export default {
  head: {
    title: '史莱姆的博客-友情链接'
  },
  async asyncData ({ $axios }) {
    const friendship = await $axios.api('FIRENDSHIP').get()
    return { friendship }
  }
}
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
    font-size: 1.1rem;
    color: #888;
  }
  h5 {
    color: #888;
  }
  .button-lv1 {
    width: 30%;
    display: block;
    margin: 20px auto;
  }
  .max-a {
    position: absolute;
    top: 0;
    left: 0;
  }
  .friendship-tag {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    font-size: 1.7rem;
    color: #555;
  }
  .child-box {
    max-width: 1000px;
    margin: 20px auto;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .15);

    .child-tag {
      position: relative;
      margin: 10px -10px;
      padding-left: 20px;
      font-size: 1.2rem;
      text-align: left;
      color: #cd414b;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        border-radius: 0 5px 5px 0;
        background-color: #fab1b6;
      }
    }
    ol li {
      margin: 5px 0px;
      border-bottom: 1px solid #eee;
      padding: 5px 0;
      text-indent: 10px;
      list-style: inherit;
      color: #777;
    }
    ul li {
      margin: 10px 20px;
      color: #777;
    }
    b {
      margin-right: 10px;
      color: #444;
    }
  }
  &.friendship-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      position: relative;
      float: left;
      width: 30%;
      margin: 10px 0;
      border-radius: 5px;
      padding: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
      transition: .5s;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, .2);
      }
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
