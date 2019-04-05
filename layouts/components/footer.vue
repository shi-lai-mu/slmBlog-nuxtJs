<template>
  <footer class="body-footer">
    <div class="copyright clearfix">
      <span class="copyright-left">© CopyRight 2018-2019, <a href="//mczyzy.cn">SLMBLOG.COM</a>, Inc.All Rights Reserved.</span>
      <ul class="copyright-right">
        <li><router-link to="/other/terms">条款和免责</router-link></li>
        <li><router-link to="/other/thisSite">关于本站</router-link></li>
      </ul>
    </div>
    <div class="beian clearfix">
      <span class="beian-a">
        <img class="beian-img" src="/img/police_badge.png"/>
        <p class="beian-p">
          <a target="_blank" href="//www.miitbeian.gov.cn">浙ICP备18049156号-2</a>
          <a target="_blank" href="//www.beian.gov.cn">(浙公网安备 33038102331168号)</a>
        </p>
      </span>
    </div>
  </footer>
</template>

<style lang="less">
// 底部样式
.body-footer {
  margin-top: 20px;
  padding-bottom: 20px;
  color: #b6c3db;
  background-color: rgba(255, 255, 255, .8);
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;

  .copyright {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-width: var(--min-width);
    margin: 15px 0;
    padding: 20px 10px 0;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
  }

  .copyright-left {
    width: 100%;
    text-align: center;
  }

  .copyright-right {
    display: flex;
    margin-top: 5px;

    li:not(:last-child) {
      &::after {
        content: "|";
        margin: 0 7px;
      }
    }
  }

  // 备案
  .beian {
    width: 100%;
    min-width: var(--min-width);
    margin: 0 auto;

    .beian-a {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      line-height: 20px;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
    }

    .beian-img {
      display: inline-block;
      height: 20px;
    }

    .beian-p {
      margin: 0 5px;
      line-height: 20px;
      color: #939393;
    }
  }
}
</style>
