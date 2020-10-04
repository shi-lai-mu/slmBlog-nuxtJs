const state = {
    // 用户数据
    user: {},
    /**
     * 是否为移动端
     */
    isMobile: false,
}
export default () => state;

declare module 'vue/types' {
    export interface $store {
        state: {
            // 用户数据
            user: {},
            /**
             * 是否为移动端
             */
            isMobile: false,
        }
    }
}