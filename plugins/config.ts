import defaultConfig from '../config/default';
import VueRouter, { Route } from 'vue-router';
import navigationConfig from '../config/navigation';
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

  private $that?: Vue;

  /**
   * 导航配置 [包含状态]
   */
  get config(): NavigatorInterface.NavigatorConfig {
    const config = navigationConfig as NavigatorInterface.State[];
    const path = this.$that?.$route?.path;
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
          if (onlyFocus) {
            console.warn('[聚焦检测] 子路由配置中存在重复「跳转路径」,聚焦发生错误!', { route, childItem });
          } else {
            onlyFocus = true;
            navigatorConfig.focus = index;
            navigatorConfig.focusChild = childIndex;
          }
        }
      });
      return route;
    });

    return navigatorConfig;
  }


  /**
   * 初始化导航类
   */
  init($that: Vue) {
    this.$that = $that;
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
    /**
     * 跳转到错误页
     * @param error 错误数据
     */
    error(error: {
      /**
       * 错误代码
       */
      statusCode: number;
      /**
       * 错误内容
       */
      message: string;
    }): void;
  }
}
