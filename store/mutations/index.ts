import $cookie from 'js-cookie';
import _ from 'lodash';

// import { saveUserConfig } from '@/service/data/user';
import { GlobalTool } from '@/utils/tool';
import { State } from '@/interface/state';
import { WebSettingService, _WEB_CONFIG_VERSION_ } from '~/config/websetting';


const mutations = {
  /**
   * 设置客户端标识
   */
  setClientUA(state: State, data: State['isMobile']) {
    state.isMobile = data;
  },

  /**
   * 是否正在显示遮罩层
   */
  maskUpdate(state: State, data: State['isMask']) {
    state.isMask = data;
  },

  /**
   * 初始化滚动条
   */
  initGeminiScrollbar(state: State, data: State['body']['GeminiScrollbar']) {
    state.body.GeminiScrollbar = data;
  },

  /**
   * 初始化用户数据
   */
  initUser(state: State, data: State['user']) {
    state.user = data;
  },

  /**
   * 设定JWT
   */
  setJWT(state: State, data: State['jwt']) {
    state.jwt = data;
  },

  /**
   * 设置站点参数
   */
  setWebOptions(state: State, data: State['setting']) {
    if (data.version !== undefined && data.version !== _WEB_CONFIG_VERSION_) {
      data = state.setting;
    }
    state.setting = WebSettingService.deepExtends(data, state.setting);
    $cookie.set(
      'web',
      JSON.stringify(GlobalTool.excludeKey(_.defaultsDeep({}, state.setting), ['title', 'description'])),
      { expires: 365 },
    );
  },
};

export default mutations;