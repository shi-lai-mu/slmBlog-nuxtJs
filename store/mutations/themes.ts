export default {
  /**
   * 设置主题色
   */
  setThemesMainColor(state, data) {
    state.themes.mainFColor = `m-c-${data}`;
    state.themes.mainBColor = `m-b-${data}`;
  },
}