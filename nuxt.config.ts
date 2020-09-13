export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: '史莱姆的博客',
    titleTemplate: '%s' + ( process.env.npm_config_name ? ' - ' + process.env.npm_config_name : ''),
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge,chrome=1' },
      { hid: 'description', name: 'description', itemprop: 'description', content: '欢迎浏览史莱姆的博客٩( °༥° )و，让我们一起交流技术一起嗨皮分享！史莱姆的博客为个人站点，注重前端开发。' },
      { name: 'keywords', content: '史莱姆的博客,html5,css3,es6,微信小程序,网站开发,技术交流,源码分享,php,nodejs' },
      { name: 'referrer', content: 'origin' },
      { name: 'renderer', content: 'webkit' },
      { itemprop: 'applicable-device', content: 'pc,mobile' },
      { itemprop: 'author', content: '史莱姆[qq: 478889187]' },
      { itemprop: 'image', hid: 'qqlogo', content: '/logo/qq.jpg' },
      { itemprop: 'name', hid: 'qqname', content: '史莱姆的博客' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'all' },
      { name: 'Copyright', content: 'slmblog.com' },
      { name: 'theme-color', content: '#212121' },
      { name: 'baidu-site-verification', content: 'y5VuyW34xO' },
      { name: 'google-site-verification', content: 'LsmBI4ZEP2h0Ni17kTFRG7A_kKO7zONt51w_GYjM2Gs' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo/logo.png' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'rgba(1, 188, 255, .7)',
    height: '3px',
    failedColor: 'red'
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/config.ts',
    { src: '~/plugins/overallComponents.ts', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
  ],

  /*
   ** Build configuration
   */
  build: {
    //   /*
    //   ** You can extend webpack config here
    //   */
    //   extend(config, ctx) {
    //   }
  },

  router: {
    middleware: ["routerBefore"],
  },
  
  env: {
    PATH_TYPE: process.env.PATH_TYPE,
    baseUrl: process.env.baseUrl,
  },

  /**
   * Style resources module configuration
   */
  styleResources: {
    scss: [
      './assets/scss/_variables.scss',
      './assets/scss/_mixins.scss',
      './assets/scss/iconfont.scss',
    ]
  },
};
