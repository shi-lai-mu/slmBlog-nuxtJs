import defaultConfig from '../config/default';
import navigationConfig from '../config/navigation';
import VueRouter, { Route } from 'vue-router'
import { DefaultConfig } from '../interface/config';
import { Navigator as NavigatorInterface } from '../interface/router';

export default (_context, inject) => {
  const $config = defaultConfig as Config;
  $config.Navigation = new Navigation();
  inject('config', $config);
}

/**
 * 导航插件 拓展类
 */
export class Navigation {

  private $router?: VueRouter;
  private $route?: Route;

  /**
   * 导航配置 [包含状态]
   */
  get config(): NavigatorInterface.NavigatorConfig {
    const config = navigationConfig as NavigatorInterface.State[];
    const path = this.$route?.path;
    let onlyFocus = false;
    const navigatorConfig: NavigatorInterface.NavigatorConfig = {
      focus: -1,
      focusChild: -1,
      config,
    };
    navigatorConfig.config = config.map((route, index) => {
      const isFocus = route.to === path;
      route.focus = isFocus;
      if (isFocus) {
        if (onlyFocus) {
          console.warn('[聚焦检测] 路由配置中存在重复「跳转路径」,聚焦发生错误!', route);
        } else {
          onlyFocus = true;
          navigatorConfig.focus = index;
        };
      }
      
      // 子路由匹配
      route.children?.map((childItem, childIndex) => {
        const isChildFocus = childItem.to === path;
        const currentItem = childItem as NavigatorInterface.State;
        currentItem.focus = isChildFocus;
        if (isChildFocus) {
          onlyFocus = true;
          navigatorConfig.focus = index;
          navigatorConfig.focusChild = childIndex;
        }
      });
      return route;
    });

    return navigatorConfig;
  }


  /**
   * 初始化导航类
   * @param $router VueRouter实例
   * @param $route  路由 
   */
  init($router: VueRouter, $route: Route) {
    this.$router = $router;
    this.$route = $route;
  }

  /**
   * 测试
   */
  test() {
    console.log(1);
    console.log(this.$route, this.$router);
  }
}


interface Config extends DefaultConfig {
  /**
   * 导航类
   */
  Navigation: Navigation;
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 默认配置文件
     */
    $config: Config;
  }
}