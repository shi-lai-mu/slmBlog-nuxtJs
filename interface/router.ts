/**
 * 路由
 */
export namespace Router {

};


/**
 * 导航
 */
export namespace Navigator {

  export interface NavigatorConfig {
    /**
     * 聚焦下标
     */
    focus: number;
    /**
     * 聚焦子下标
     */
    focusChild: number;
    /**
     * 导航状态配置
     */
    config: State[];
  }

  /**
   * 导航状态配置
   */
  export interface State extends Config {
    /**
     * 是否聚焦
     */
    focus: boolean;
  }

  /**
   * 配置项
   */
  export interface Config {
    /**
     * 路由名
     */
    name: string;
    /**
     * 图标
     */
    icon: string;
    /**
     * 跳转路径
     */
    to: string;
    /**
     * 子导航
     */
    children?: Config[];
  }
}