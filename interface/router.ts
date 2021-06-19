/** 路由 */
export namespace Router {
  /** 路由参数配置 */
  export interface Config {
    /** 路由名称 */
    name: string
    /** 跳转路径 */
    to?: string
    /** 图标 */
    icon?: string
    /** 回调 */
    cb?: CallableFunction
  }
}

/** 导航 */
export namespace Navigator {
  /** 配置项 */
  export interface Config extends Router.Config {
    /** 子导航 */
    children?: Config[]
  }

  /** 导航状态配置 */
  export interface State extends Config {
    /** 是否聚焦 */
    focus: boolean
  }
  export interface NavigatorConfig {
    /** 聚焦下标 */
    focus: number
    /** 聚焦子下标 */
    focusChild: number
    /** 导航状态配置 */
    config: State[]
  }
}
