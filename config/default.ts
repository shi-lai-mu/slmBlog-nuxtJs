import { WebConfig } from '@/interface/config';
import { getIPAdress } from '@/utils/network';
import { isClient } from '~/utils/axios/lib/config';
import user from './note/user';

const port = 8888;
const isDev = process.env.NODE_ENV === 'development';
const devDomain = getIPAdress() ?? location.hostname;
const domain = !isDev ? 'https://slmblog.com' : `http://${devDomain}:${port}`;
const devOSSDomain = isClient ? `http://${location.host}` : domain;

/**
 * 默认配置
 */
const defaultConfig: WebConfig.Default = {
  /**
   * 网站名
   */
  name: '史莱姆的博客',
  /**
   * 域名
   */
  domain: devDomain,
  /**
   * LOGO相对路径
   */
  logo: '/logo/logo.png',
  /**
   * 站长邮箱
   */
  email: 'admin@slmblog.com',
  /**
   * GIT
   */
  git: {
    github: {
      name: 'GitHub',
      icon: 'https://github.com/favicon.ico',
      link: 'https://github.com/shi-lai-mu',
    },
    gitee: {
      name: '码云',
      icon: 'https://gitee.com/favicon.ico',
      link: 'https://gitee.com/shi_lai_mu',
    },
  },
  /**
   * ICP号
   */
  icp: '浙ICP备18049156号-2',
  /**
   * ICP链接
   */
  icpLink: 'http://www.miitbeian.gov.cn',
  /**
   * 公安备案号
   */
  keepOnRecord: '浙公网安备 33038102331168号',
  /**
   * 公安备案链接
   */
  keepOnRecordLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33038102331168',
  /**
   * 版权所有
   */
  copyRight: `© CopyRight 2018-${ new Date().getFullYear() } {{ domain }} Rights Reserved.`,
  /**
   * OSS存储对象地址
   */
  ossLink: !isDev
    ? (devOSSDomain || domain) + '/blog'
    // ? 'https://oss.slmblog.com/blog'
    : (devOSSDomain || domain) + '/blog'
  ,
  /**
   * SEO备用本站存储地址
   */
  imgLink: !isDev
    ? domain + 'blog'
    // ? 'https://img.slmblog.com/blog'
    : domain + 'blog'
  ,
  /**
   * Axios 请求的服务器
   */
  apiServer: {
    host: `http://${devDomain}:3000`,
    devHost: `http://${devDomain}:3000`,
    apiVersion: '/api/v1',
    // defaultHost: '',
    // defaultHost: isDev ? 'yapi' : '',
    children: {
      oss: {
        host: 'https://oss.slmblog.com/blog',
        devHost: '/blog'
      },
      img: {
        host: 'https://img.slmblog.com',
        devHost: ''
      },
      yapi: {
        host: 'https://yapi.slmblog.com/mock/11',
        devHost: 'https://yapi.slmblog.com/mock/11',
      }
    },
  },
  user,
};

export default defaultConfig;