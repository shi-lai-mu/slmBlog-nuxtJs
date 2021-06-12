/**
 * 默认布局
 */
export namespace LayoutDefault {
  /**
   * 数据集
   */
  export interface Data {
    /**
     * 可选主题
     */
    themes: 'theme-dark' | 'theme-default'
    /**
     * 主题色
     */
    themeColor: 'dark' | 'blue' | 'yellow' | 'powder' | 'purple' | 'orange' | 'green'
  }
}
