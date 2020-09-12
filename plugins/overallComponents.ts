import Vue from 'vue';
import GeminiScrollbar from 'vue-gemini-scrollbar';

Vue.use(GeminiScrollbar);

// new Vue.$geminiScrollbar({
//   element: document.body,
//   // autoshow: true,
// }).create();

declare module 'vue/types/vue' {
  interface VueConstructor {
    $geminiScrollbar(opt: {
      element: HTMLElement;
    }): void;
  }
}
