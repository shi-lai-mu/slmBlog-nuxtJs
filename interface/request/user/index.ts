import {
  color as ThemesConfigColor,
  backgroundColor as ThemesBackgroundColor,
  fontSize as ThemesFontSize,
} from '@/config/themes';

/**
 * 用户
 */
export namespace User {
  /**
   * 基础数据 [非包含隐私数据]
   */
  export interface Base {
    /**
     * 用户ID
     */
    id: number;
    /**
     * 昵称
     */
    nickname: string;
    /**
     * 头像
     */
    avatarUrl: string;
    /**
     * 性别 ( 0: 未知 1: 男 2: 女 )
     */
    gender: number;
    /**
     * 最后登录时间
     */
    loginDate: string;
    /**
     * 注册时间
     */
    registerDate: string;
    /**
     * 权限组名
     */
    permissionGroup: string;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 状态
     */
    state: {
      /**
       * 文章总数
       */
      articleNumber: number;
      /**
       * 标签总数
       */
      tagsNumber: number;
      /**
       * 评论总数
       */
      commitNumber: number;
    }
    /**
     * 个人链接
     */
    link: {
      /**
       * 博客链接
       */
      blog: string;
      /**
       * Twitter链接
       */
      twitter: string;
      /**
       * GitHub链接
       */
      github: string;
    }
    /**
     * 徽章
     */
    badge: Array<{
      /**
       * 图标
       */
      i: string;
      /**
       * 徽章名
       */
      name: string;
    }>
  };


  /**
   * 登录账号
   */
  export interface LoginDto {
    /**
     * 账号
     */
    account: string;
    /**
     * 密码
     */
    password: string;
  }


  /**
   * 用户配置
   */
  export interface Config {
    /**
     * 背景色
     */
    backgroundColor: keyof typeof ThemesBackgroundColor.list;
    /**
     * 主题色
     */
    color: keyof typeof ThemesConfigColor.list;
    /**
     * 字体大小
     */
    fontSize: keyof typeof ThemesFontSize.marks;
    /**
     * 最后更新时间
     */
    last_update: number;
  }
}