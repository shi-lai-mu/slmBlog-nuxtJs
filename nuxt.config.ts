import * as path from 'path';
import webpack from 'webpack';
import { isDev, isMock, isServer } from './config/system';
import CompressionPlugin from 'compression-webpack-plugin';

let isClient = true;

const globalConfig = {

  /*
   ** Headers of the page
   */
  head: {
    title: '史莱姆的博客',
    titleTemplate: '%s' + (process.env.npm_config_name ? ' - ' + process.env.npm_config_name : ''),
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo/logo.png' },
      // { rel: 'stylesheet/less', type: 'text/css', href: '/style/antd.less' },
    ],
    script: [
      // { type: 'text/javascript', src: '/script/index.js' },
      // { type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js' },
    ],
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
  css: [
    // 'ant-design-vue/dist/antd.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/global.ts',
    '@/plugins/antd-ui.ts',
    { src: '@/plugins/overallComponents.ts', ssr: false },
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
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  /*
  ** Build configuration
  */
  build: {
    publicPath: isDev ? '/_nuxt/' : 'http://cdn.slmblog.com/_nuxt/',
    /*
    ** You can extend webpack config here
    */
    extend(config) {
      config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './plugins/antd-icons.ts'); // 引入需要的
      config.resolve.alias.moment = path.resolve(__dirname, './plugins/antd-icons.ts');; // 引入需要的
      config.plugins.push(
        // 提取 monent 有效部分，减小体积 en-gb 英国 en-us 美国(默认值) vi 越南 zh-cn 中国
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\/(zh-cn)$/i),
        // 使用 IgnorePlugin 在打包时忽略本地化内容
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new AntdDayjsWebpackPlugin({
        //   preset: 'antdv3'
        // }),
        // new CompressionPlugin({
        //   test: /\.js|\.html|\.css/,
        //   // threshold: 10240,
        //   deleteOriginalAssets: false,
        // }),
      );

      if (isClient) {
        config.externals = {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'vue-meta': 'VueMeta',
          'vuex': 'Vuex',
          'tinycolor2': 'tinycolor',
          'axios': 'axios',
          'qs': 'Qs',
          // 'vue-gemini-scrollbar': '{}',
          'dayjs': 'dayjs',
        }
        isClient = !isClient;
      }

      if (!isMock) {
        /**
         * mockjs
         * 开发环境: 模拟请求数据、初始数据、TS接口校验数据
         * 生产环境: 初始数据
         */
        config.resolve.alias.mockjs = path.resolve(__dirname, './mock/build.ts');
      }
    },
    transpile: ["ant-design-vue"],
    babel: {
      plugins: [
        [
          "import",
          {
            libraryName: "ant-design-vue",
            libraryDirectory: "es",
            style: true
          },
          "ant-design-vue"
        ]
      ]
    },
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          // modifyVars 可用来自定义主题
          // modifyVars: {
          //   "primary-color": "#41b883",
          //   "layout-body-background": "#fff"
          // }
        }
      }
    },
    // 打包分析
    // analyze: !isDev, 	
    // assetFilter: (assetFilename) => {	    		
    //   return assetFilename.endsWith('.js');	    	
    // },
    extractCSS: !isDev,
    optimization: (() => {
      return isDev ? undefined : {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|vue|scss|less)$/,
              chunks: 'all',
              enforce: true
            }
          }
        }
      }
    })()
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

  axios: {
    proxy: false,
    credentials: false
  },
  
  router: {
    middleware: ["routerBefore"],
  },
}


/**
 * 开发模式
 */
// if (isDev) {
// }

/**
 * Mock模式
 */
if (isMock) {
  globalConfig.plugins.push(...[
    '@/plugins/mock',
  ]);
}


export default globalConfig;