import mainMutations from './index';

import { State } from '@/interface/state';
/**
 * 主题设置
 */
export default {
  /**
   * 设置主题色
   */
  setThemesMainColor(state: State, data) {
    state.themes.mainFColor = `m-c-${data}`;
    state.themes.mainBColor = `m-b-${data}`;
    mainMutations.setWebOptions(state, {
      theme: {
        color: data,
      }
    } as any);
  },
}