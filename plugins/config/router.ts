import routerConfig from '@/config/router'

/**
 * 路由配置类
 */
export default new (class ConfigRouter {
  config = routerConfig

  /**
   * 跳转路由
   * @param current 目标路由
   * @param options 路由参数
   */
  to(current: keyof typeof routerConfig, options: { [key: string]: string }) {
    let currentString = routerConfig[current]
    Object.keys(options).forEach(
      key => (currentString = currentString.replace(`:${key}`, options[key]))
    )
    return currentString || '#'
  }
})()
