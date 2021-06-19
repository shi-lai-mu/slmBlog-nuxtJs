import {
  color as ThemesConfigColor,
  backgroundColor as ThemesBackgroundColor,
  fontSize as ThemesFontSize,
} from '@/config/themes'

/**  用户 */
export namespace User {
  /**  用户配置 */
  export interface Config {
    /**  背景色 */
    backgroundColor: keyof typeof ThemesBackgroundColor.list
    /**  主题色 */
    color: keyof typeof ThemesConfigColor.list
    /**  字体大小 */
    fontSize: keyof typeof ThemesFontSize.marks
  }

  /**  基础数据 [非包含隐私数据] */
  export interface Base {
    /**  用户ID */
    id: number
    /**  昵称 */
    nickname: string
    /**  头像 */
    avatarUrl: string
    /**  性别 ( 0: 未知 1: 男 2: 女 ) */
    gender: number
    /**  最后登录时间 */
    loginDate: string
    /**  注册时间 */
    registerDate: string
    /**  权限组名 */
    permissionGroup: string
    /**  邮箱 */
    email: string
    /**  状态 */
    state: {
      /**  文章总数 */
      articleNumber: number
      /**  标签总数 */
      tagsNumber: number
      /**  评论总数 */
      commitNumber: number
    }
    /**  个人链接 */
    link: {
      /**  博客链接 */
      blog: string
      /**  Twitter链接 */
      twitter: string
      /**  GitHub链接 */
      github: string
    }
    /**  徽章 */
    badge: Array<{
      /**  图标 */
      i: string
      /**  徽章名 */
      name: string
    }>
    config?: Config
  }

  /**  登录账号 */
  export interface LoginDto {
    /**  账号 */
    account: string
    /**  密码 */
    password: string
  }
}

/**  账号相关验证 */
export namespace AccountValidateDto {
  /**  邮箱验证 */
  export interface Email {
    /**  邮箱 (必须为邮箱格式) */
    email: string
    /**  序列ID */
    id: number
    /**  验证邮箱用的UUID，唯一序列号，只有\`序列ID\`和\`序列号\`对应才能成功验证邮箱 */
    uuid: string
  }
}
