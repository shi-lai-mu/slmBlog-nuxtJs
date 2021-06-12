export namespace ScrollEventNS {
  /**
   * 滚动事件 Use 入参
   */
  export interface ScrollEventUseOptions {
    value?: { el: HTMLElement | Element }
    /**
     * 默认监听滚动元素 querySelector 选择器
     */
    el?: string

    /**
     * 防抖延迟时间[ms]
     */
    debounceNumber?: number

    /**
     * 过渡动画名
     */
    transformName?: string

    /**
     * 首屏初始化时是否显示动画过渡 TODO: 首屏暂未完成
     */
    initTransform?: boolean
  }

  interface CurrentElement extends HTMLElement {
    scrollUUID: string
    pageYOffset: number
  }

  /**
   * 元素绑定入参
   */
  export interface ScrollEventBindingOptions {
    value?: {
      /**
       * 默认监听滚动元素 querySelector 选择器 or 元素
       */
      el?: string | (() => HTMLElement)
      down?: string
      up?: string
    }

    /**
     * 滚动父级元素
     */
    currentElement?: CurrentElement

    /**
     * 修饰符
     */
    modifiers?: {
      repeat: boolean
    }

    /**
     * 是否显示动画过渡
     */
    transform?: boolean

    /**
     * 过渡动画名
     */
    transformName?: string

    /**
     * 最后滚动的位置
     */
    lastScrollTop?: number

    /**
     * 初始class
     */
    previousClassName?: string
  }

  /**
   * 事件
   */
  export interface EventElMap {
    [k: string]: {
      el: CurrentElement
      list: {
        el: HTMLElement
        binding: ScrollEventBindingOptions
      }[]
    }
  }
}
