import { Random } from '@/mock/mock';

/**
 * 文章数据
 */
export const articleData = {
  /**
   * 文章ID
   */
  id: Random.integer(),
  /**
   * 简介
   */
  description: Random.cparagraph(2),
  /**
   * 头图
   */
  banner: Random.image('200x100', '@ccc', 'banner'),
  /**
   * 简介
   */
  content: Random.cparagraph(10),
}