import { themesDefaultConfig } from '@/config/themes';
import { webSetting, _WEB_CONFIG_VERSION_ } from '@/config/websetting';

export const state = {
    // 用户数据
    user: {},
    // JWT
    jwt: '',
    // 是否为移动端
    isMobile: false,
    // 网站位置
    setting: {
        version: _WEB_CONFIG_VERSION_,
        // 主题设置
        theme: themesDefaultConfig,
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
