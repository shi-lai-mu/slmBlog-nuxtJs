<template>
  <div
    :class="[
      'layout',
      'layout-default',
      theme,
      { 'layout-default-mobile': $store.state.isMobile },
      { 'mobile-header-open': mobileHeaderOpen }
    ]">
    <LayoutHeader />
    <GeminiScrollbar>
      <ASlider :marks="{
          0: '0°C',
          26: '26°C',
          37: '37°C'
        }" />
    </GeminiScrollbar>
    <LayoutFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { LayoutDefault } from '../interface/layout';
import { deDeveloperTools, isOpenDevTool } from '../utils/deDeveloperTools';
import LayoutFooter from './defaultLayouts/components/Footer.vue';
import LayoutHeader from './defaultLayouts/components/Header.vue';
import resizeEvent from '../utils/Event/resize';
import '../assets/scss/layout.default.scss';

@Component({
  // scrollToTop: true,
  watch: {
    // $route(to, from) {
    //   window.scrollTo(0, 0)
    //   this.baiduPush()
    // }
  },
  components: {
    LayoutFooter,
    LayoutHeader,
  },
})
export default class DefaultLayout extends Vue {
  /**
   * 主题方案
   */
  theme: LayoutDefault.Data['themes'] = 'theme-dark';
  /**
   * 移动端Header展开状态
   */
  mobileHeaderOpen: boolean = false;

  // created() {
  //   const { $config, $route, $router } = this;
  //   if (!this.$nuxt.$isServer) {
  //     /**
  //      * 初始化必要数据
  //      */
  //     console.log(this.$store.state);
  //     // $config.isMobile = !!(window && navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));
  //   }
  //   $config.Navigation.init(this);
  // }

  mounted() {
    // 非开发模式注入
    if (!this.$nuxt.context.isDev) {
      isOpenDevTool(false, (e) => {
        if (e === 'on') {
          this.loggerBlog();
          this.$router.push({
            path: '/developmentLogin',
          });
        }
        // document.write('检测到正在使用开发者工具调试,请关闭开发者工具后刷新重试!');
      });
    }
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
    
    // 根字体大小设置
    const root: any = document.getElementsByTagName('html')[0];
    root.style = 'font-size: 16px';
  }

  
  /**
   * 设置z移动端打开状态
   */
  setHeaderOpenState(state: boolean) {
    // console.log(state);
    this.mobileHeaderOpen = state;
  }


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
  padding-top: 50px;
  // min-height: 100vh;
  height: 100vh;
  transition: 1s;
}

.header {
  position: fixed;
}

.layout-page {
  width: 100%;
  padding-top: 60px;
  min-height: calc(100vh - 121px);
  box-sizing: border-box;
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
</style>
