import { namespace } from "nuxt-property-decorator";
/**
 * 请求
 */
export namespace Request {
  /**
   * Result响应体
   */
  export interface Result<T> {
    /**
     * 是否执行成功
     */
    success: boolean;
    /**
     * 响应码
     */
    code: number;
    /**
     * 响应信息
     */
    message: string;
    /**
     * 响应内容
     */
    result: T;
  }
}