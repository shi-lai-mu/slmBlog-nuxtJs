import { DefaultConfig } from '@/interface/config';

const isDev = process.env.NODE_ENV === 'development';

/**
 * 默认配置
 */
const defaultConfig: DefaultConfig = {
  /**
   * 网站名
   */
  name: '史莱姆的博客',
  /**
   * 域名
   */
  domain: 'https://slmblog.com',
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
    ? 'https://oss.slmblog.com/blog'
    : '/blog'
  ,
  /**
   * SEO备用本站存储地址
   */
  imgLink: !isDev
    ? 'https://img.slmblog.com/blog'
    : 'blog'
  ,
  /**
   * Axios 请求的服务器
   */
  apiServer: {
    host: 'https://api.slmblog.com',
    devHost: '',
    // defaultHost: '',
    defaultHost: isDev ? 'yapi' : '',
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
};

export default defaultConfig;