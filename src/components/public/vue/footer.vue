<template>
    <footer class="body-footer" id="bodyFooter">
        <div class="copyright clearfix">
            <span class="copyright-left">© CopyRight 2018-2019, <a href="//mczyzy.cn">MCZYZY.CN</a>, Inc.All Rights Reserved.</span>
            <ul class="copyright-right">
                <li><router-link :to="{name:'terms'}">条款和免责</router-link></li>
                <li><router-link :to="'/other/thisSite'">关于本站</router-link></li>
            </ul>
        </div>
        <div class="beian clearfix">
            <span class="beian-a">
                <img class="beian-img" src="~@img/other/police_badge.png"/>
                <p class="beian-p">
                    <a target="_blank" href="//www.miitbeian.gov.cn">浙ICP备18049156号-1</a>
                    <a target="_blank" href="//www.beian.gov.cn">(浙公网安备 33038102331168号)</a>
                </p>
            </span>
        </div>
        <a href="//www.beian.gov.cn/portal/registerSystemInfo?recordcode=33038102331168" title="纯属为了让某些爬虫快速识别备案"></a>
    </footer>
</template>

<script>
import Time from '@pub/js/dateForm'

export default {
  data () {
    return {
      liveTime: '--'
    }
  },
  created () {
    setInterval(() => {
      this.liveTime = Time.unForm(1535150280000)
    }, 1000)
  },
  watch: {
    '$route' (to, from) {
      setTimeout(() => {
        if (document.body.clientHeight < screen.availHeight - this.$el.offsetHeight - 40) {
          this.$el.classList.add('fixed-bottom')
        } else {
          this.$el.classList.remove('fixed-bottom')
        }
      }, 600)
    }
  }
}
</script>

<style lang="less">
.fixed-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.body-footer {
    margin-top: 20px;
    padding-bottom: 20px;
    color: #b6c3db;
    user-select: none;
    background-color: #fff;

    .copyright {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        min-width: var(--min-width);
        margin: 15px 0;
        padding: 20px 10px 0;
    }
    .copyright-left {
        width: 100%;
        text-align: center;
    }
    .copyright-right {
        margin-top: 5px;
        li {
            float: left;
            &::after {
                content: "|";
                margin: 0 7px;
            }
        }
        :nth-last-child(1) {
            &::after {
                content: "";
            }
        }
    }

    // 备案
    .beian {
        width: 100%;
        min-width: var(--min-width);
        margin: 0 auto;
        .beian-a {
            display: flex;
            justify-content: center;
            line-height: 20px;
        }
        .beian-img {
            height: 20px;
            display: inline-block;
        }
        .beian-p {
            margin: 0 5px;
            line-height: 20px;
            color: #939393;
        }
    }
}
</style>
