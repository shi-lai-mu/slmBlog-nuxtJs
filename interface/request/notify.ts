/** 通知 */
export namespace Notify {
  /** 公告 */
  export interface Notic {
    /** 公告内容 */
    message: string
  }

  /** 友链 */
  export interface FriendLink {
    /** 站点名 */
    name: string
    /** 链接 */
    link: string
    /** 邮箱 */
    email: string
    /** 站点图标 */
    icon: string
  }
}
