import { State } from '@/interface/state';
import {  _WEB_CONFIG_VERSION_ } from '@/config/websetting';

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
    console.log({ user: data });
    
    state.user = data;
  },

  /**
   * 设定JWT
   */
  setJWT(state: State, data: State['jwt']) {
    state.jwt = data;
  },
};

export default mutations;