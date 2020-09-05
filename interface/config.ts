import { Navigation } from '../plugins/config';
/**
 * 默认配置文件
 */
export interface DefaultConfig {
  /**
   * 网站名
   */
  name?: string;
  /**
   * 域名
   */
  domain?: string;
  /**
   * logo位置
   */
  logo?: string;
  /**
   * ICP号
   */
  icp?: string;
  /**
   * ICP号 点击链接
   */
  icpLink?: string;
  /**
   * 备案号
   */
  keepOnRecord?: string;
  /**
   * 备案号 点击链接
   */
  keepOnRecordLink?: string;
  /**
   * 版权声明
   */
  copyRight?: string;
}