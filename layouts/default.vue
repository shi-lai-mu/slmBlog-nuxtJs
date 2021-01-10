<template>
  <div
    :class="[
      'layout',
      'bg-texture',
      'content-1300', // test
      'layout-default',
      'theme-color-' + $store.state.setting.theme.color,
      'theme-' + ($store.state.setting.theme.backgroundColor || 'dark'),
      { 'layout-default-mobile': $store.state.isMobile },
      { 'mobile-header-open': mobileHeaderOpen }
    ]">
    <Background v-if="$$store.getters.webSetting.background.canvas.enable"/>
    <LayoutHeader class="header" @set-open-state="setHeaderOpenState" :mobileHeaderOpen="mobileHeaderOpen" />
    <nuxt class="layout-page"  @click.native="mobileHeaderOpen = false"/>
    <LayoutFooter />
    <LoginPopup v-if="loginPopup" ref="LoginPopup" />
    <Live2D :enable="$$store.getters.webSetting.pendant.cat.enable"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { LayoutDefault } from '@/interface/layout';
import { deDeveloperTools, isOpenDevTool } from '@/utils/deDeveloperTools';

import LayoutFooter from '@/layouts/defaultLayouts/components/Footer.vue';
import LayoutHeader from '@/layouts/defaultLayouts/components/Header.vue';
import LoginPopup from '@/components/Login.vue'
import Live2D from '@/components/public/Live2D.vue';
import Background from '@/components/public/Background.vue';

import resizeEvent from '@/utils/Event/resize';
import ObServer from '@/utils/obServer';

import '@/assets/scss/layout.default.scss';
import { getUserConfig } from '~/service/data/user';

@Component({
  scrollToTop: true,
  components: {
    LayoutFooter,
    LayoutHeader,
    LoginPopup,
    Background,
    Live2D,
  },
})
export default class DefaultLayout extends Vue {
  /**
   * 移动端Header展开状态
   */
  mobileHeaderOpen: boolean = false;
  loginPopup: boolean = false;


  created() {
    const { $config, $route, $router } = this;
    $config.Navigation.init(this);
  }


  mounted() {
    const { $http, $refs, $nuxt, $store, $observer } = this;
    
    // 初始化权限组
    $http.$vue = this;
    $http.auth = {
      user: () => !!this.$store.state.user.id,
    };

    // 非开发环境注入 打开控制台监听
    if (!$nuxt.context.isDev && !/(192|127)\.\d+\.\d+\.\d+/.test(window.location.host)) {
      isOpenDevTool(false, (e) => {
        if (e === 'on') {
          this.loggerBlog();
          this.$router.push({
            path: '/developmentLogin',
          });
        }
      });
    }

    // 移动端在本地开发环境 下加载vConsole
    if ($nuxt.context.isDev
      && /(192|127)\.\d+\.\d+\.\d+/.test(window.location.host)
      && $store.state.isMobile  
    ) {
      const vConsole = new (require('vconsole'));
    }

    // 监听popstate变化
    window.addEventListener('popstate', (e) => {
      $observer.emit('popstate', e);
    });

    // 登录弹窗观察者绑定
    $observer.on('login', loginType => {
      if (!this.loginPopup) {
        this.loginPopup = true;
        this.$nextTick(() => ($refs.LoginPopup as LoginPopup).showMask(loginType));
      } else {
        ($refs.LoginPopup as LoginPopup).showMask(loginType);
      }
    });

    // 网站设置
    // $observer.on('webSetting', setting => {
    //   // if (setting.theme) this.theme = setting.theme;
    // });

    // 事件添加
    resizeEvent(window, this);
    // slef.baiduPush()
    // let user = localStorage.getItem('userInfo');
    // slef.$nuxt.$store.dispatch('USER', user || 'default');
    // user = slef.$store.state.user;
    // 缩放窗口时 响应式处理
    // window.addEventListener('resize', resize);
    // function resize() {
    //   document.body.className = window.innerWidth > 840 ? 'max' : 'centre';
    //   // slef.$store.dispatch('IS_MOBILE', window.innerWidth);
    // }
    // resize();
    // refs.body 订阅
    // slef.observer.on('body', option => {
    //   slef.$refs.body.className = option.value ? option.value : 'boss';
    // });
    // slef.$nextTick(() => {
      // PC版 问候
      // !slef.$store.state.mobile && slef.observer.emit('toast', {
      //   text: isNaN(user.id) ? '欢迎访问, 史莱姆的博客!' : `欢迎回来 ${user.username}`,
      // });
    // });
    this.loggerBlog();
  }
  

  /**
   * 设置移动端打开状态
   */
  setHeaderOpenState(state: boolean) {
    this.mobileHeaderOpen = state;
  }

  
  /**
   * body初始化完成时
   */
  // GeminiScrollbarInit(e) {
  //   e.observer = new ObServer('GeminiScrollbar Observer');
  //   e._viewElement.addEventListener('scroll', v => e.observer.emit('scroll', v));
  //   this.$config.GeminiScrollbar = e;
  //   setTimeout(() => e.update(), 1000)
  // }


  /**
   * 打印日志
   */
  loggerBlog() {
    console.log(`
    %cSLM BLOG%c v1.8.0
     %c欢迎访问 史莱姆的博客!
     %c(重构版 UPDATE 2020-09-07)
    `,
      'font-size: 40px; font-weight: bold; color: rgb(254, 65, 129);',
      'font-size: 20px; color: rgb(254, 65, 129);',
      'font-size: 20px; color: rgb(254, 65, 129);',
      'font-size: 14px; color: #8624b1;',
    );
  }
}
</script>

<style lang="scss" scoped>
.transition-enter-active,
.transition-leave-active {
  transition: 1s;
}
.transition-enter,
.transition-leave-active {
  opacity: 0;
  transform: translate(-50px, 0);
}
.layout-default {
  // min-height: 100vh;
  height: 100%;
  transition: 1s;
}
.header {
  position: fixed;
}
.layout-page {
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  padding-top: 65px;
  min-height: calc(100vh - 121px);
  box-sizing: border-box;
}

@each $size-name, $value in (1300: 1300px, 1240: 1240px, 90: 90vh) {
  .content-#{$size-name} /deep/ .max-content {
    max-width: $value;
  }
}

.min-screen-left > .conter {
  transform: translateX(50vw);
  opacity: .7;
  filter: blur(1px);
  transition: .5s;
}
@include themify($themes, 0) {
  &.layout-default {
    color: themed('font-color');
    background-color: themed('main-bg-color');
  }
}
.mobile-header-open {
  transform: translateX(260px);
}

/deep/ .row-box {
  margin-bottom: 15px;
  padding: 20px;
  @include themify($themes) {
    background-color: themed('bg-dp4-color'); 
    color: themed('font-color');
      box-shadow: 0 2px 5px themed('bg-dp1-color-f');
  }
  border-radius: 10px;

  .row-title {
    color: currentColor;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 0;
    padding-bottom: 5px;
    @include themify($themes) {
      border-bottom: 1px solid themed('border-bottom-color');
    }

    .slm {
      font-size: 1rem;
      margin-right: 10px;
    }
  }

  .row-content {
    margin-top: 10px;
    font-size: .9rem;
    @include themify($themes) {
      color: themed('font-lv0-color');
    }
  }
}
</style>