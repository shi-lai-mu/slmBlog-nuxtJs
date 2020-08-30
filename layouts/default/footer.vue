<template>
  <footer class="body-footer">
    <div class="copyright">
      <div class="copyright-register">
        <span>© CopyRight 2018-2019, <a href="//slmblog.cn">SLMBLOG.COM</a>, </span>
        <span class="nowrap">Rights Reserved.</span>
      </div>
      <div class="copyright-navigation">
        <router-link class="navigation-li" to="/other/terms">条款和免责</router-link>
        <router-link class="navigation-li" to="/other/thisSite">关于本站</router-link>
      </div>
    </div>
    <div class="serve-record">
      <span class="nowrap">
        <img class="serve-record-icon" src="/tripartite/police_badge.png"/>
        <a target="_blank" href="//www.miitbeian.gov.cn">浙ICP备18049156号-2</a>
      </span>
      <a class="nowrap" target="_blank" href="//www.beian.gov.cn">(浙公网安备 33038102331168号)</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
// 底部样式
.body-footer {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  @include themify($themes) {
    color: themed('font-lv0-color');
    background-color: themed('bg-dp1-color');
  }

  .copyright {
    margin-bottom: 15px;

    .copyright-register {
      width: 100%;
      word-wrap: break-word;
    }

    .copyright-navigation {
      margin-top: 5px;

      .navigation-li {
        display: inline-block;

        &:not(:last-child) {
          &::after {
            content: "|";
            margin: 0 7px;
          }
        }
      }
    }
  }

  // 备案
  .serve-record {

    .serve-record-icon {
      height: 20px;
      vertical-align: middle;
    }
  }
}
</style>
