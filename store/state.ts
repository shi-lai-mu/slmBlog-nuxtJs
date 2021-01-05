import { defaultConfig } from '@/config/themes';

const state = {
    // 用户数据
    user: {},
    // JWT
    jwt: '',
    // 是否为移动端
    isMobile: false,
    // 网站位置
    setting: {
        web: defaultConfig,
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