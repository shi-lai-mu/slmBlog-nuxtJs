import { State } from '@/interface/state';
import {
  color as ThemesConfigColor,
} from '@/config/themes';

const getters = {
  /**
   * 获取网站配置项
   */
  webSetting: (state: State) => {
    return state.setting.web;
  },

  /**
   * 获取主题色16进制
   */
  webMainThemes16Color: (state: State) => {
    return ThemesConfigColor.list[state.setting.theme.color].color;
  }
}
export default getters;