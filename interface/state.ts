import { Store } from 'vuex';
import { state } from '@/store/state';
import Mutations from '@/store/mutations';
import { User } from './request/user';

export type State = typeof state;

/**
 * State Getters
 */
export interface StateGetters {
  /**
   * 网站设置
   */
  readonly webSetting: State['setting']['web'];
  /**
   * 获取登录用户信息
   */
  readonly getUserInfo: User.Base | false;
  /**
   * 获取主题色16进制
   */
  readonly webMainThemes16Color: string;
}

declare module 'vue/types/vue' {

  type States = Store<typeof state>;

  interface Vue {
    /**
     * Store
     */
    $$store: {
      readonly getters: StateGetters;
      state: States['state'];
      commit(types: keyof typeof Mutations, data?: any): void;
    };
  }
}


export declare type StateAction = (payload?: any) => void;
export declare type StateMutation = (payload?: any) => void;