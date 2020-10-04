export default {
  
  /**
   * 设置客户端标识
   */
  setClientUA(state, data) {
    state.isMobile = data;
  },

  /**
   * 设置主题色
   */
  setThemesMainColor(state, data) {
    state.themes.mainFColor = `m-c-${data}`;
    state.themes.mainBColor = `m-b-${data}`;
  },

  /**
   * 是否正在显示遮罩层
   */
  maskUpdate(state, data) {
    state.isMask = data;
  }
};
