import { DefaultConfig } from '@/interface/config';
import defaultConfig from '@/config/default';
import Http from '~/utils/axios';
import Navigation from './config/Navigation';
import Themes from './config/Themes';
import * as Axios from '@nuxtjs/axios';

export default (_context, inject) => {
  const $config = defaultConfig as Config;
  $config.Navigation = Navigation;
  $config.themes = Themes.config;
  inject('config', $config);
  inject('http', Http);
}



interface Config extends DefaultConfig {
  /**
   * 导航类
   */
  Navigation: typeof Navigation;
  /**
   * 网站主题配置文件
   */
  themes: typeof Themes.config;
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
