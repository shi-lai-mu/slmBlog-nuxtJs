import { DefaultConfig } from '@/interface/config';

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
};

export default defaultConfig;