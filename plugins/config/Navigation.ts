import { Navigator as NavigatorInterface } from '@/interface/router'
import navigationConfig from '@/config/navigation'

/**
 * 导航插件 拓展类
 */
export default new (class Navigation {
  private $that?: Vue

  /**
   * 导航配置 [包含状态]
   */
  get config(): NavigatorInterface.NavigatorConfig {
    // TODO: 此处待优化，分离为单独配置和迭代判断是否为当前路由是则直接跳出
    const config = navigationConfig as NavigatorInterface.State[]
    const path = this.$that?.$route?.path
    let onlyFocus = false
    const navigatorConfig: NavigatorInterface.NavigatorConfig = {
      focus: -1,
      focusChild: -1,
      config,
    }

    navigatorConfig.config = config.map((route, index) => {
      const isFocus = route.to === path

      route.focus = isFocus
      if (isFocus) {
        if (onlyFocus) {
          // eslint-disable-next-line no-console
          console.warn('[聚焦检测] 路由配置中存在重复「跳转路径」,聚焦发生错误!', route)
        } else {
          onlyFocus = true
          navigatorConfig.focus = index
        }
      }

      // 子路由匹配
      route.children?.map((childItem, childIndex) => {
        const isChildFocus = childItem.to === path
        const currentItem = childItem as NavigatorInterface.State
        currentItem.focus = isChildFocus
        if (isChildFocus) {
          if (onlyFocus) {
            // eslint-disable-next-line no-console
            console.warn('[聚焦检测] 子路由配置中存在重复「跳转路径」,聚焦发生错误!', {
              route,
              childItem,
            })
          } else {
            onlyFocus = true
            navigatorConfig.focus = index
            navigatorConfig.focusChild = childIndex
          }
        }
        return false
      })
      return route
    })

    return navigatorConfig
  }

  /**
   * 初始化导航类
   */
  init($that: Vue) {
    this.$that = $that
  }
})()
