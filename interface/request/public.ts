
/**
 * 经过上传组件处理的图片基础数据
 */
export interface UploadImagerBase {
  /**
   * 图片格式
   */
  format: string,
  /**
   * 图片高度
   */
  height: number;
  /**
   * 图片宽度
   */
  width: number;
  /**
   * 图片大小
   */
  size: number;
  /**
   * 图片URL
   */
  url: string;
}
