import { Random } from 'mockjs';

/**
 * 用户信息
 */
export const userData = {
  /**
   * 用户ID
   */
  id: Random.integer(),
  /**
   * 昵称
   */
  nickname: Random.name(),
  /**
   * 头像
   */
  avatarUrl: Random.image('200x100', '@FF6600', 'user Avatar'),
  /**
   * 简介
   */
  introduction: Random.cparagraph(1),
  /**
   * 性别 ( 0: 未知 1: 男 2: 女 )
   */
  gender: Random.integer(0, 2),
  /**
   * 最后登录时间
   */
  loginDate: Random.datetime(),
  /**
   * 注册时间
   */
  registerDate: Random.datetime(),
  /**
   * 权限组名
   */
  permissionGroup: Random.word(10),
  /**
   * 邮箱
   */
  email: Random.url(),
  /**
   * 状态
   */
  state: {
    /**
     * 文章总数
     */
    articleNumber: Random.natural(0, 10000),
    /**
     * 标签总数
     */
    tagsNumber: Random.natural(0, 10000),
    /**
     * 评论总数
     */
    commitNumber: Random.natural(0, 10000),
  },
  /**
   * 个人链接
   */
  link: {
    /**
     * 博客链接
     */
    blog: Random.url(),
    /**
     * Twitter链接
     */
    twitter: Random.url(),
    /**
     * GitHub链接
     */
    github: Random.url(),
  },
  /**
   * 徽章
   */
  badge: [],
}