import $cookie from 'js-cookie';
import defaultsDeep from 'lodash/defaultsDeep';

import { StoreOptions } from 'vuex';
import { GlobalTool } from '@/utils/tool';
import { isServer } from '@/config/system';
import { saveUserConfig } from '@/core/service/data/user';
import {
  color as ThemesConfigColor,
  backgroundColor as ThemesBackgroundColor,
  fontSize as ThemesFontSize,
  themesdefaultConfig,
} from '@/config/themes';
import { webSetting, WebSettingService, _WEB_CONFIG_VERSION_ } from '@/config/websetting';

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
    /**
     * 配置项
     */
    config: {
      /**
       * 主题配置
       */
      theme: themesdefaultConfig,
    }
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

export const configModule: StoreOptions<typeof stateData> = {
  state: () => stateData,
  mutations: {
    /**
     * 设置站点参数
     */
    setWebOptions(state, payload) {
      // if (payload.version !== undefined && payload.version !== _WEB_CONFIG_VERSION_) {
      //   payload = state.setting;
      // }
      if (!payload) return;

      const { isSave } = payload;
      state.setting = WebSettingService.deepExtends(payload, state.setting);
      
      if (isServer) return;
  
      if (isSave) {
        clearTimeout(saveUserConfigClock);
        const config = GlobalTool.excludeKey(defaultsDeep({}, state.setting), ['title', 'description', 'type', 'config', 'isSave']);
        delete config.config;
        saveUserConfigClock = setTimeout(async () => {
          await saveUserConfig(config);
          $cookie.set('web', JSON.stringify(config), { expires: 365 });
        }, 1000);
      }
      
      if (typeof saveUserConfigClock === 'number') {
        state.clock.saveUserConfig = saveUserConfigClock;
      }
      
      state.setting.config = {
        theme: {
          color: ThemesConfigColor,
          backgroundColor: ThemesBackgroundColor,
          fontSize: ThemesFontSize,
        } as any,
      };
    },

    /**
     * 设置主题色
     */
    setThemesMainColor(_state, payload) {
      this.commit('setWebOptions',  {
        theme: {
          color: payload,
        }
      });
    },

    /**
     * 设置配置项
     */
    setConfig(state, payload) {
      state.setting.config = {
        ...state.setting.config,
        ...payload,
      };
    },
  },
  getters: {
    /**
     * 获取主题色16进制
     */
    webMainThemes16Color: state => {
      return ThemesConfigColor.list[state.setting.theme?.color]?.color;
    }
  },
  actions: {
    /**
     * 保存配置到服务器 
     */
    async saveConfigServer(store, payload) {
      const { state, rootState } = store;

      if (!payload) return;

      const { isSave } = payload;
      state.setting = WebSettingService.deepExtends(payload, state.setting);
      
      if (isServer) return;
  
      if (isSave) {
        const config = GlobalTool.excludeKey(defaultsDeep({}, state.setting), ['title', 'description', 'type', 'config', 'isSave']);
        delete config.config;
        $cookie.set('web', JSON.stringify(config), { expires: 365 });
        if ((rootState as any).jwt) {
          clearTimeout(saveUserConfigClock);
          saveUserConfigClock = setTimeout(async () => {
            await saveUserConfig(config);
          }, 1000);
        }
      }
      
      if (typeof saveUserConfigClock === 'number') {
        state.clock.saveUserConfig = saveUserConfigClock;
      }
      
      state.setting.config = {
        theme: {
          color: ThemesConfigColor,
          backgroundColor: ThemesBackgroundColor,
          fontSize: ThemesFontSize,
        } as any,
      };
    }
  },
};

export default configModule;