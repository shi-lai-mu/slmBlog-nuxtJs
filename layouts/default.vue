<template>
  <div
    ref="layoutScroll"
    :class="[
      'layout',
      'bg-texture',
      'content-1300', // test
      'layout-default',
      'theme-color-' + setting.theme.color,
      'theme-' + (setting.theme.backgroundColor || 'dark'),
      { 'layout-default-mobile': $store.state.isMobile },
      { 'mobile-header-open': mobileHeaderOpen },
    ]"
    @scroll="layoutScroll"
  >
    <Background v-if="setting.web.background.canvas.enable" />
    <LayoutHeader
      class="header"
      :mobile-header-open="mobileHeaderOpen"
      @set-open-state="setHeaderOpenState"
    />
    <transition name="transition">
      <nuxt class="layout-page" @setLayout="setLayout" @click.native="mobileHeaderOpen = false" />
    </transition>
    <LayoutFooter v-if="layoutFooter" />
    <LoginPopup v-if="loginPopup" ref="LoginPopup" />
    <Live2D v-if="setting.web.pendant.cat.enable" :enable="setting.web.pendant.cat.enable" />
  </div>
</template>

<script lang="ts">
// import "vue-custom-scrollbar/dist/vueScrollbar.css";
import '@/plugins/vue-onscroll-event/animate.min.css'
import '@/assets/styles/scss/layout.default.scss'
// import '@/assets/styles/less/_antd.ui.less';
// import '@/assets/styles/scss/antd.ui.scss';
import '@/assets/styles/scss/themes/main.scss'
import '@/assets/styles/scss/iconfont.scss'
import '@/assets/styles/scss/antd.ui.scss'
// import '@/assets/scss/_variables.scss';
// import 'ant-design-vue/dist/antd.css';

import $cookie from 'js-cookie'
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'

import LayoutFooter from '@/layouts/defaultLayouts/components/Footer.vue'
import LayoutHeader from '@/layouts/defaultLayouts/components/Header.vue'
import Background from '@/components/public/Background.vue'
import Live2D from '@/components/public/Live2D.vue'
import resizeEvent from '@/utils/Event/resize'

import { stateData as ConfigState } from '@/store/config'
import { isOpenDevTool } from '@/utils/deDeveloperTools'
import { getSelfInfo } from '@/core/service/data/user'
import { StateMutation } from '@/interface/state'
import LoginPopup from '~/components/pages/login/Login.vue'

const ConfigModule = namespace('config')

@Component({
  name: 'DefaultLayout',
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
  mobileHeaderOpen: boolean = false
  /**
   * 登录弹窗
   */
  loginPopup: boolean = false
  /**
   * 是否显示底部
   */
  layoutFooter: boolean = true
  /**
   * 网站设置
   */
  @ConfigModule.State setting!: typeof ConfigState.setting
  /**
   * 设置网站参数
   */
  @ConfigModule.Mutation setWebOptions!: StateMutation

  beforeCreate() {
    const { $config } = this

    $config.Navigation.init(this)

    $config.layout = () => {
      return (this.$refs.layoutScroll as Vue).$el as HTMLElement
    }

    $config.getScrollContainer =
      $config.getScrollContainer ??
      (() => {
        return this.$config.layout()
      })

    this.$router.beforeEach((_to, _from, next) => {
      next()
      this.$observer.emit('scrollTop', [0, 0])
      return true
    })
  }

  async mounted() {
    const { $http, $refs, $nuxt, $store, $observer } = this
    const token = $cookie.get('token')
    let userConfig

    if (token) {
      const res = await getSelfInfo({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.success) {
        this.$$store.commit('initUser', res.result)
        this.$$store.commit('setJWT', token)
        userConfig = res.result.config
      }
    }

    this.setWebOptions(userConfig)

    // 初始化权限组
    $http.$vue = this
    $http.auth = {
      user: () => !!this.$store.state.user.id,
    }

    // 非开发环境注入 打开控制台监听
    if (!$nuxt.context.isDev && !/(192|127)\.\d+\.\d+\.\d+/.test(window.location.host)) {
      isOpenDevTool(false, e => {
        if (e === 'on') {
          const { debug } = window.$nuxt.$router.currentRoute.query
          if (debug !== '123') {
            // eslint-disable-next-line no-console
            console.clear()
            this.loggerBlog()
            this.$router.push({
              path: '/other/developmentLogin?',
            })
            this.$message.warning('抱歉，您无权进行开发操作!', 50000)
          }
        }
      })
    }

    // 移动端在本地开发环境 下加载vConsole
    if (
      $nuxt.context.isDev &&
      /(192|127)\.\d+\.\d+\.\d+/.test(window.location.host) &&
      $store.state.isMobile
    ) {
      // eslint-disable-next-line no-new
      new (require('vconsole'))()
    }

    // 监听popstate变化
    window.addEventListener('popstate', e => {
      $observer.emit('popstate', e)
    })

    // 全局滚动控制事件
    $observer.on('scrollTop', ({ x, y }) => {
      const { layoutScroll } = $refs
      if (layoutScroll) {
        ;(layoutScroll as Vue)?.$el?.scrollTo(x, y)
      }
    })

    // 登录弹窗观察者绑定
    $observer.on('login', loginType => {
      if (!this.loginPopup) {
        this.loginPopup = true
        this.$nextTick(() => ($refs.LoginPopup as LoginPopup).showMask(loginType))
      } else {
        ;($refs.LoginPopup as LoginPopup).showMask(loginType)
      }
    })

    $observer.on('setHeaderOpenState', this.setHeaderOpenState.bind(this))

    // 事件添加
    resizeEvent(window, this)
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

    this.backgroundColorChang()
    this.loggerBlog()
  }

  @Watch('$store.state.config.setting.theme.backgroundColor')
  backgroundColorChang() {
    const root: HTMLElement = document.getElementsByTagName('html')[0]
    root.classList.add('theme-' + this.setting.theme.backgroundColor)
  }

  /**
   * 设置移动端打开状态
   */
  setHeaderOpenState(state: boolean) {
    this.mobileHeaderOpen = state
  }

  layoutScroll(e) {
    this.$observer.emit('layoutScroll', e)
    // const event = document.createEvent('MouseEvents');
    // event.initMouseEvent('scroll', true, true, window,1, 2, 3, 4, 5, false, false, false, false, 6, null)
    // window.dispatchEvent(event)
    // document.documentElement.scrollTop = e.target.scrollTop
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
    // eslint-disable-next-line no-console
    console.log(
      `
    %cSLM BLOG%c v1.8.0
     %c欢迎访问 史莱姆的博客!
     %c(重构版 UPDATE 2020-09-07)
    `,
      'font-size: 40px; font-weight: bold; color: rgb(254, 65, 129);',
      'font-size: 20px; color: rgb(254, 65, 129);',
      'font-size: 20px; color: rgb(254, 65, 129);',
      'font-size: 14px; color: #8624b1;'
    )
  }

  /**
   * 设置布局
   */
  setLayout(params: Array<never>) {
    this[params[0]] = params[1]
  }
}
</script>

<style lang="scss" scoped>
.home-enter-active,
.home-leave-active {
  transition: opacity 0.5s;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}

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
  // height: 100%;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  // overflow-y: hidden;
  height: 100vh;
  transition: 1s;
}

.header {
  position: fixed;
}

.layout-page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  // padding-top: 65px;
  // min-height: calc(100vh - 121px);
  box-sizing: border-box;
  transition: 0.5s;
}

@each $size-name, $value in (1300: 1300px, 1240: 1240px, 90: 90vh) {
  .content-#{$size-name} /deep/ .max-content {
    max-width: $value;
    margin: 0 auto;
  }
}

.min-screen-left > .conter {
  transform: translateX(50vw);
  opacity: 0.7;
  filter: blur(1px);
  transition: 0.5s;
}

.layout-default {
  color: var(--c-text-primary);
  background-color: var(--c-bg-primary);
}

.mobile-header-open > * {
  transform: translateX(260px);
}

/deep/ .row-box {
  margin-bottom: 15px;
  padding: 10px 20px;
  background-color: var(--c-bg-primary);
  // box-shadow: 0 2px 5px var(--c-border-tertiary);
  border: 1px solid var(--c-border-primary);
  border-radius: 10px;

  .row-title {
    color: currentColor;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 0;
    padding-bottom: 5px;

    .slm {
      font-size: 1rem;
      margin-right: 10px;
    }
  }

  .row-content {
    margin-top: 10px;
    font-size: 0.9rem;
  }
}
</style>
