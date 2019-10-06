/**
 * 默认配置文件
 */
export interface DefaultConfig {
  /**
   * 服务器相关
   */
  server: {
    /**
     * 启动域名（内网）
     */
    host: string;
    /**
     * 服启动端口
     */
    port: number;
    /**
     * api请求域名
     */
    apiHost: string;
  };
}