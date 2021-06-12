import { Article } from '@/interface/request/article'
import { BaseValidateData } from '@/utils/validateData'
import { Column, Entity } from '../decorators/validateData.decorators'

@Entity({
  isFull: true,
})
export class SubmitArticleDto extends BaseValidateData {
  /**
   * 标题
   */
  @Column({
    name: '标题',
    length: '5-50',
  })
  subject: string

  /**
   * 简介
   */
  @Column({
    name: '简介',
    length: '10-500',
  })
  description: string

  /**
   * 文章内容
   */
  @Column({
    name: '文章内容',
    // length: 50,
    required: true,
  })
  content: string

  /**
   * 头图
   */
  @Column()
  banner: string

  /**
   * 类目
   */
  @Column()
  category: [] | string

  @Column()
  setting: {
    isLoginView: false
    isTouristNotVisible: false
    allowComments: true
    guestNotComments: false
    browsePwd: ''
    articleMusic: ''
    prohibitSeo: false
    prohibitCopy: false
    markReprinted: ''
    copyContentComment: ''
    generateTree: true
    parseWordKey: true
    bigImgdbClick: true
    notification: {
      commentingToEmail: true
      setTopToEmail: true
      setFineToEmail: true
    }
  }
}

/**
 * 回复评论入参
 */
@Entity({
  isFull: true,
})
export class submitArticleReplayDto extends BaseValidateData {
  /**
   * 评论内容
   */
  @Column()
  content: string

  /**
   * 昵称
   */
  @Column({ required: false })
  nickname?: string

  /**
   * 邮箱
   */
  @Column({ required: false })
  email?: string

  /**
   * 文章/微博
   */
  @Column({ required: false })
  link?: string

  /**
   * 父级评论ID
   */
  @Column({ required: false })
  parentId?: Article.Comment['id']
}
