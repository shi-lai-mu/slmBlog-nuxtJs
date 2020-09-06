import { Navigator } from '../interface/router';

const navConfig: Navigator.Config[] = [
  {
    name: '首页',
    to: '/',
  }, {
    name: '前端',
    to: '/1',
    children: [{
        name: 'Vue',
        to: '/q',
      }, {
        name: 'React',
        to: '/w',
      }, {
        name: 'cocos',
        to: '/e',
      }, {
        name: 'UniApp',
        to: '/r',
      }, {
        name: 'NuxtJs',
        to: '/t',
      }, {
        name: 'NextJs',
        to: '/y',
      }, {
        name: '微信小程序',
        to: '/u',
      }, 
    ],
  }, {
    name: '后端',
    to: '/s',
  }, {
    name: '案例',
    to: '/2',
  }, {
    name: '资源',
    to: '/3',
  }, {
    name: '博主',
    to: '/4',
  },
];
export default navConfig;
