import { State } from '@/interface/state';
import {
  color as ThemesConfigColor,
} from '@/config/themes';
import { User } from '~/interface/request/user';

const getters = {
  /**
   * 获取当前登录用户信息
   */
  getUserInfo(state: State) {
    const user = state.user as User.Base;
    return user.id ? user : false;
  },

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