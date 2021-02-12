import $cookie from 'js-cookie';
import defaultsDeep from 'lodash/defaultsDeep';

import { StoreOptions } from 'vuex';
import { themesdefaultConfig } from '@/config/themes';
import { GlobalTool } from '@/utils/tool';
import { saveUserConfig } from '@/core/service/data/user';
import { webSetting, WebSettingService, _WEB_CONFIG_VERSION_ } from '@/config/websetting';
import { isServer } from '~/config/system';

let saveUserConfigClock = null;

export const stateData = {
  /**
   * 网站位置
   */
  setting: {
    /**
     * 站点版本
     */
    version: _WEB_CONFIG_VERSION_,
    /**
     * 主题设置
     */
    theme: themesdefaultConfig,
    /**
     * 网站设置
     */
    web: webSetting,
  },
  /**
   * 主题
   */
  themes: {
    /**
     * 文字主色
     */
    mainFColor: `m-c-${[ 'blue', 'yellow', 'powder', 'purple', 'orange', 'green' ][0]}`,
    /**
     * 背景主色
     */
    mainBColor: `m-b-${[ 'blue', 'yellow', 'powder', 'purple', 'orange', 'green' ][0]}`,
    /**
     * HTML根文字大小
     */
    fontSize: 16,
  },
  /**
   * 定时器下标
   */
  clock: {
    /**
     * 保存用户配置
     */
    saveUserConfig: null,
  }
}

const configModule: StoreOptions<typeof stateData> = {
  state: () => stateData,
  mutations: {
    /**
     * 设置站点参数
     */
    setWebOptions(state, payload) {
      if (payload.version !== undefined && payload.version !== _WEB_CONFIG_VERSION_) {
        payload = state.setting;
      }
      state.setting = WebSettingService.deepExtends(payload, state.setting);
      const config = GlobalTool.excludeKey(defaultsDeep({}, state.setting), ['title', 'description', 'type']);

      if (isServer) return false;
  
      clearTimeout(saveUserConfigClock);
      saveUserConfigClock = setTimeout(async () => {
        await saveUserConfig(config);
        $cookie.set('web', JSON.stringify(config), { expires: 365 });
      }, 1000);
      
      if (typeof saveUserConfigClock === 'number') {
        state.clock.saveUserConfig = saveUserConfigClock;
      }
    },

    /**
     * 设置主题色
     */
    setThemesMainColor(state, payload) {
      state.themes.mainFColor = `m-c-${payload}`;
      state.themes.mainBColor = `m-b-${payload}`;
      this.commit('setWebOptions',  {
        theme: {
          color: payload,
        }
      });
    }
  },
  actions: {}
};

export default configModule;