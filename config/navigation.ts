import { Navigator } from '../interface/router';

const navConfig: Navigator.Config[] = [
  {
    name: '首页',
    icon: 'home',
    to: '/',
  }, {
    name: '前端',
    icon: 'frontend',
    to: '',
    children: [{
        name: 'Vue',
        icon: 'vue',
        to: '/vue',
      }, {
        name: 'React',
        icon: 'react',
        to: '/react',
      }, {
        name: 'cocos',
        icon: 'CocosD-x',
        to: '/cocos',
      }, {
        name: 'UniApp',
        icon: 'uni-app',
        to: '/uniapp',
      }, {
        name: 'NuxtJs',
        icon: 'cib-nuxt-js',
        to: '/nuxtjs',
      }, {
        name: 'NextJs',
        icon: 'cib-next-js',
        to: '/nextjs',
      }, {
        name: '微信小程序',
        icon: 'wxapp',
        to: '/wxapp',
      }, 
    ],
  }, {
    name: '后端',
    icon: 'backend',
    to: '/backend',
  }, {
    name: '案例',
    icon: 'anli',
    to: '/case',
  }, {
    name: '资源',
    icon: 'ziyuan',
    to: '/resources',
  }, {
    name: '博主',
    icon: 'master',
    to: '/blogger',
  },
];
export default navConfig;
