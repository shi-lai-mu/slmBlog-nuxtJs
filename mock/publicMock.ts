import { Random } from '@/mock/mock';

/**
 * 经过上传组件处理的图片基础数据
 */
export const uploadImagerBase = {
  /**
   * 图片格式
   */
  format: 'png',
  /**
   * 图片高度
   */
  height: Random.integer(0, 1080 * 5),
  /**
   * 图片宽度
   */
  width: Random.integer(0, 1920 * 5),
  /**
   * 图片大小
   */
  size: Random.integer(0, 1024 * 100),
  /**
   * 图片URL
   */
  url: Random.image('200x100', '@ccc', 'cover uploadImagerBase'),
}


/**
 * 随机数组数据
 * @param count 最小数量
 * @param data  数据
 */
export function randomArray<T>(count: number, data: T): T[] {
  if (data instanceof Function) data = data();
  return Array(Math.abs((Math.random() * 10 + count) | 0)).fill(data);
}