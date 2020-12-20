import { User } from '@/interface/request/user';
import { UploadImagerBase } from '@/interface/request/public';

export namespace Article {

  /**
   * 文章状态
   */
  export enum StateEnum {
    Failed   = -2, // 审核未通过
    IsDelete = -1, // 已删除
    Examine  = 0,  // 审核中
    Routine  = 1,  // 常规
    Topping  = 2,  // 置顶文章
    Boutique = 3,  // 精品文章
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
}