import { State } from '@/interface/state';

const getters = {
  /**
   * 获取网站配置项
   */
  webSetting: (state: State) => {
    return state.setting.web;
  }
}
export default getters;