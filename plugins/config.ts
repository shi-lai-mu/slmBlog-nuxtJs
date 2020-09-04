import defaultConfig from '../config/default';
import { DefaultConfig } from '../interface/config';

export default (_context, inject) => {
  inject('config', defaultConfig);
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 默认配置文件
     */
    $config: DefaultConfig;
  }
}