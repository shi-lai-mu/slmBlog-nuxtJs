const state = {
    // 用户数据
    user: {},
    // 是否为移动端
    isMobile: false,
    // 主题
    themes: {
        mainFColor: `m-c-${[ 'blue', 'yellow', 'powder', 'purple', 'orange', 'green' ][0]}`,
        mainBColor: `m-b-${[ 'blue', 'yellow', 'powder', 'purple', 'orange', 'green' ][0]}`,
    },
    // 是否正在显示遮罩层
    isMask: false,
}
export default () => state;