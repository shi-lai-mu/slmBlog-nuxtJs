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
        to: '/q',
      }, {
        name: 'React',
        icon: 'react',
        to: '/w',
      }, {
        name: 'cocos',
        icon: 'CocosD-x',
        to: '/e',
      }, {
        name: 'UniApp',
        icon: 'uni-app',
        to: '/r',
      }, {
        name: 'NuxtJs',
        icon: 'cib-nuxt-js',
        to: '/a',
      }, {
        name: 'NextJs',
        icon: 'cib-next-js',
        to: '/y',
      }, {
        name: '微信小程序',
        icon: 'wxapp',
        to: '/u',
      }, 
    ],
  }, {
    name: '后端',
    icon: 'backend',
    to: '/s',
  }, {
    name: '案例',
    icon: 'anli',
    to: '/2',
  }, {
    name: '资源',
    icon: 'ziyuan',
    to: '/3',
  }, {
    name: '博主',
    icon: 'master',
    to: '/4',
  },
];
export default navConfig;
