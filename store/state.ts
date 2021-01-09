import { themesdefaultConfig } from '@/config/themes';
import { webSetting } from '@/config/websetting';
import { Store } from 'vuex'

const state = {
    // 用户数据
    user: {},
    // JWT
    jwt: '',
    // 是否为移动端
    isMobile: false,
    // 网站位置
    setting: {
        // 主题设置
        theme: themesdefaultConfig,
        // 网站设置
        web: webSetting,
    },
    // 主题
    themes: {
        // 文字主色
        mainFColor: `m-c-${[ 'blue', 'yellow', 'powder', 'purple', 'orange', 'green' ][0]}`,
        // 背景主色
        mainBColor: `m-b-${[ 'blue', 'yellow', 'powder', 'purple', 'orange', 'green' ][0]}`,
        // HTML根文字大小
        fontSize: 16,
    },
    // 是否正在显示遮罩层
    isMask: false,
    // boay
    body: {
        GeminiScrollbar: null,
    },
}
export default () => state;


declare module 'vue/types/vue' {
    interface Vue {
      /**
       * Store
       */
      $$store: Store<typeof state>;
    }
}