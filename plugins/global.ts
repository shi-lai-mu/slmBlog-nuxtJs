import { WebConfig } from '@/interface/config';
import defaultConfig from '@/config/default';
import Navigation from './config/Navigation';
import Themes from './config/Themes';
import Router from './config/router';

import Http from '@/utils/axios';
import ObServer from '@/utils/obServer';
import GeminiScrollbar from 'vue-gemini-scrollbar';

import { GlobalTool } from '@/utils/tool';

export default (_context, inject) => {
  const $config = defaultConfig as Config;
  $config.Navigation = Navigation;
  $config.themes = Themes.config;
  $config.layout;
  $config.getScrollContainer = () => null;
  $config.router = Router;
  inject('$store', _context.store);
  inject('tool', GlobalTool);
  inject('config', $config);
  inject('http', Http);
  inject('observer', new ObServer());
}


interface Config extends WebConfig.Default {
  /**
   * 获取当前滚动的父级
   */
  getScrollContainer: () => HTMLElement | Vue | Element | Vue[] | Element[];
  /**
   * layout元素
   */
  layout?: HTMLElement;
  /**
   * 导航类
   */
  Navigation: typeof Navigation;
  /**
   * 网站主题配置文件
   */
  themes: typeof Themes.config;
  /**
   * 路由配置
   */
  router: typeof Router;
  /**
   * body滚动条
   */
  GeminiScrollbar?: GeminiScrollbar;
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 默认配置文件
     */
    $config: Config;
    /**
     * 全局观察者
     */
    $observer: ObServer;
    /**
     * 全局工具类
     */
    $tool: typeof GlobalTool;
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
