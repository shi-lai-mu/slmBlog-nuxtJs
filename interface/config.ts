import { namespace } from 'nuxt-property-decorator';
import Navigation from '~/plugins/config/Navigation';


/**
 * 站点配置
 */
export namespace WebConfig {
  /**
   * 默认配置文件
   */
  export interface Default {
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
     * 站长邮箱
     */
    email: string;
    /**
     * GIT
     */
    git: {
      /**
       * Git平台
       */
      [key in string]: {
        /**
         * 平台名
         */
        name: string;
        /**
         * 平台图标
         */
        icon: string;
        /**
         * 站长账号在平台下的链接
         */
        link: string;
      };
    };
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
    /**
     * OSS存储对象地址
     */
    ossLink: string;
    /**
     * SEO备用本站存储地址
     */
    imgLink: string;
    /**
     * Axios 请求的服务器
     */
    apiServer: {
      /**
       * 正式环境
       */
      host: string;
      /**
       * 开发环境
       */
      devHost: string;
      /**
       * API版本
       */
      apiVersion: string;
      /**
       * 请求超时时间
       */
      timeout?: number;
      /**
       * 默认请求Host
       */
      defaultHost?: string;
      /**
       * 子服务器
       */
      children?: {
        [key in string]: {
          /**
           * 正式环境
           */
          host: string;
          /**
           * 开发环境
           */
          devHost: string;
        };
      };
    };
    /**
     * 用户数据配置
     */
    user: User;
  }

  /**
   * 用户配置
   */
  export interface User {
    /**
     * 人物卡配置
     */
    card: {
      /**
       * 默认简介
       */
      defaultIntroduction?: string;
    }
  }
}