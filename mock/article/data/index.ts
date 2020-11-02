import { Random } from '@/mock/mock';

import { userData } from "@/mock/user/data/user";
import { uploadImagerBase, randomArray } from "@/mock/publicMock";

/**
 * 话题数据
 */
export const topics = {
  /**
   * 话题头图
   */
  cover: Random.image('200x100', '@ccc', 'topics cover'),
  /**
   * 话题id
   */
  id: Random.id(),
  /**
   * 话题名称
   */
  name: Random.cname(),
}


/**
 * 文章基础数据
 */
export const articleBase = {
  /**
   * 文章ID
   */
  id: Random.integer(1, 1000),
  /**
   * 简介
   */
  description: Random.cparagraph(4),
  /**
   * 头图
   */
  banner: Random.image('500x400'),
  /**
   * 标题
   */
  subject: Random.cparagraph(2),
  /**
   * 内容
   */
  content: Random.cparagraph(10),
  /**
   * 我的操作
   */
  self_operation: {
    /**
     * 是否已收藏
     */
    is_collected: Random.boolean(),
  },
  /**
   * 预览图
   */
  image_list: randomArray(2, () => uploadImagerBase),
  /**
   * 统计
   */
  stat: {
    /**
     * 回复数
     */
    reply_num: Random.integer(0, 1000000),
    /**
     * 点赞数
     */
    like_num: Random.integer(0, 1000000),
    /**
     * 浏览量
     */
    view_num: Random.integer(0, 1000000),
    /**
     * 收藏数
     */
    bookmark_num: Random.integer(0, 1000000),
  },
  /**
   * 发布者用户数据
   */
  user: userData,
  /**
   * 细节数据
   */
  details: {
    
  },
  /**
   * 是官方用户吗
   */
  is_official_master: Random.boolean(),
  /**
   * 是发布用户吗
   */
  is_user_master: Random.boolean(),
  /**
   * 话题
   */
  topics: randomArray(0, topics),
  /**
   * 最后回复时间
   */
  reply_time: Random.datetime(),
  /**
   * 发布时间
   */
  release_time: Random.datetime(),
};

