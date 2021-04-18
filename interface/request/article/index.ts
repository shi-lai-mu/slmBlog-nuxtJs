import { User } from '@/interface/request/user';
import { UploadImagerBase } from '@/interface/request/public';
import { Request } from '@/interface/request';

export namespace Article {

  /**
   * 文章状态
   */
  export enum StateEnum {
    examine   = 0,  // 审核中
    routine   = 1,  // 常规
    topping   = 2,  // 置顶文章
    boutique  = 3,  // 精品文章
    recommend = 4,  // 推荐文章
    latest    = 5,  // 最新文章
    owner     = 6,  // 我的文章
    failed    = 7,  // 审核未通过
    isDelete  = 8,  // 已删除
  }
    
  export interface Base {
    /**
     * 文章ID
     */
    id: number;
    /**
     * 简介
     */
    description: string;
    /**
     * 头图
     */
    banner: string;
    /**
     * 内容
     */
    content: string;
    /**
     * 标题
     */
    subject: string;
    /**
     * 我的操作
     */
    self_operation: {
      /**
       * 是否已收藏
       */
      is_collected: boolean;
    },
    /**
     * 预览图
     */
    image_list: UploadImagerBase[];
    /**
     * 统计
     */
    stat: {
      /**
       * 回复数
       */
      reply_num: number;
      /**
       * 点赞数
       */
      like_num: number;
      /**
       * 浏览量
       */
      view_num: number;
      /**
       * 收藏数
       */
      bookmark_num: number;
    },
    /**
     * 发布者用户数据
     */
    user: User.Base,
    /**
     * 细节数据
     */
    details: {
      
    },
    /**
     * 是官方用户吗
     */
    is_official_master: boolean
    /**
     * 是发布用户吗
     */
    is_user_master: boolean
    /**
     * 话题
     */
    topics: Topics[];
    /**
     * 最后回复时间
     */
    reply_time: string;
    /**
     * 发布时间
     */
    release_time: string;
  };

  /**
   * 文章主题
   */
  export interface Posts {
    /**
     * 文章数据
     */
    article: Base;
    /**
     * 评论列表
     */
    comment: Request.ListTotal<Comment>;
  }

  /**
   * 评论
   */
  export interface Comment {
    /**
     * 评论ID
     */
    id: number;
    /**
     * 评论内容
     */
    content: string;
    /**
     * 点赞数
     */
    loveNum: number;
    /**
     * 点踩数
     */
    criticismNum: number;
    /**
     * 子评论总数
     */
    subCommentCount: number
    /**
     * 昵称 (登录用户为null)
     */
    nickname: string;
    /**
     * 绑定链接 
     */
    link: string | null;
    /**
     * 邮箱 (登录用户为null)
     */
    email: string | null;
    /**
     * 更新时间
     */
    updateTime: string;
    /**
     * 发布评论 登录用户 (非登录用户为null)
     */
    user: {
      /**
       * 用户ID
       */
      id: User.Base['id'];
      /**
       * 昵称
       */
      nickname: User.Base['nickname'];
      /**
       * 头像
       */
      avatarUrl: User.Base['avatarUrl'];
    } | null;
    /**
     * 子评论数据
     */
    subComment?: Request.ListTotal<Comment>;
    /**
     * 当前用户点赞状态
     * 1： 赞
     * 2： 踩
     * 0： 未进行操作
     */
    likeStatus?: number;
  }

  /**
   * 话题
   */
  export interface Topics {
    /**
     * 话题头图
     */
    cover: string;
    /**
     * 话题id
     */
    id: number;
    /**
     * 话题名称
     */
    name: string;
  }

  /**
   * 文章锚点
   */
  export interface Anchor {
    /**
     * 锚点名
     */
    name: string;
    /**
     * 锚点链接
     */
    link?: string;
    /**
     * 子锚点
     */
    childs?: Anchor[];
  }

  /**
   * 踩/赞 行为状态
   */
  export interface LinkState {
    state: {
      /**
       * 踩 点亮
       */
      criticism: 0 | 1;
      /**
       * 赞 点亮
       */
      praise: 0 | 1;
    };
  }
}