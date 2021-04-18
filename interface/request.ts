import { ResError } from "./request/public";

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
    /**
     * 响应主体
     */
    readonly _res: Response;
  }

  /**
   * Result List 响应体
   */
  export interface ResultList<T> {
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
    result: {
      /**
       * 列表内容
       */
      list: T[];
      /**
       * 当前页数
       */
      page: number;
      /**
       * 单页个数
       */
      count: number;
      /**
       * 总页
       */
      total: number;
    };
    /**
     * 响应主体
     */
    readonly _res: Response;
  }

  /**
   * 列表
   */
  export interface ListTotal<T> extends ResError {
    /**
     * 列表
     */
    list: T[];
    /**
     * 总数
     */
    total: number;
    /**
     * 页数
     */
    page: number;
    /**
     * 单页总数
     */
    pageSize: number;
  }
}