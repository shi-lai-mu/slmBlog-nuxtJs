import { LOGIN_TYPE } from "~/config/note/tripartite";

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

  /**
   * 设置项
   */
  export interface Setting {
    
  }
}


/**
 * 三方登录配置
 */
export declare type TripartiteConfig = {
  /**
   * 登录平台名称
   */
  name: string;
  /**
   * 登录平台icon
   */
  icon: string;
  /**
   * 登录类型
   */
  type: LOGIN_TYPE;
  /**
   * 登录平台外链获取方法
   */
  link?(...params: any): string;
};


/**
 * 表情配置
 */
export declare type EmoteConfig = {
  /**
   * 表情列表
   */
  list: {
    /**
     * 如果model为local对应文件夹名
     */
    [key: string]: {
      /**
       * 显示名称
       */
      name: string;
      /**
       * 表情模式
       * local  本地模式，map内表情采用 oss/本地 进行链接
       * online 外部线上，map内表情用线上的外部链接
       */
      mode: 'local' | 'online';
      /**
       * 链接前缀
       */
      perfix: string;
      /**
       * 样式
       */
      style: string;
      /**
       * 获取链接方法
       */
      getLink: (emooteUrl: string) => string;
      /**
       * 表情列表
       */
      map: Array<{
        /**
         * 链接
         */
        url: string;
        /**
         * 显示名称
         */
        name: string;
      }>;
    };
  };
}