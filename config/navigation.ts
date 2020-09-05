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
        to: '/',
      }, {
        name: 'React',
        to: '/',
      }, {
        name: 'UniApp',
        to: '/',
      }, {
        name: 'NuxtJs',
        to: '/',
      }, {
        name: 'NextJs',
        to: '/',
      }, {
        name: '微信小程序',
        to: '/',
      }, {
        name: 'cocos',
        to: '/',
      }
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
