import { Store } from 'vuex';
import { state } from '@/store/state';
import Mutations from '@/store/mutations';

export type State = typeof state;

/**
 * State Getters
 */
export interface StateGetters {
  readonly webSetting: State['setting']['web'];
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
