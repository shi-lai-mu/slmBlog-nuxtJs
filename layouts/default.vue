<template>
  <div ref="layoutDefault" :class="[ 'layout', 'layout-default', theme ]">
    <LayoutHeader />
    <transition name="transition">
      <nuxt class="layout-page" />
    </transition>
    <LayoutFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { LayoutDefault } from '../interface/layout';
import LayoutFooter from './default/component/Footer.vue';
import LayoutHeader from './default/component/Header.vue';
import '../assets/scss/layout.default.scss';

@Component({
  head: {
  },
  scrollToTop: true,
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

  mounted() {
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

    console.log(
      '%cSLM BLOG%c version 1.8.0',
      'font-size: 40px;color: rgb(254,65,129);font-weight: bold;',
      'font-size: 20px;color: rgb(254,65,129)'
    );
    console.log(
      '      %c欢迎访问 史莱姆的博客!',
      'font-size: 20px;color: rgb(254,65,129)'
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
  min-height: 100vh;
  transition: 1s;
}
.layout-page {
  width: 100%;
  min-height: calc(100vh - 120px);
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
    background-color: themed('bg-dp3-color');
  }
}
</style>
