export namespace BackgroundSpace {
  /** 背景配置 */
  export interface Options {
    /** 粒子配置 */
    grain: {
      /** 粒子数量 */
      number: number
      /** 粒子大小 最小值 */
      size?: number
    }
  }

  /** 粒子 */
  export interface Grain {
    /** X轴 */
    x: number
    /** Y轴 */
    y: number
    /** 颜色 */
    color: { r: number; g: number; b: number }
    /** 大小 */
    size: number
    /** 是否有内核 */
    isKernel: boolean
    /** 外壳 */
    shell: number | false
    /** 偏移值 */
    deviation: {
      /** X轴偏移值 */
      x: number
      /** Y轴偏移值 */
      y: number
    }
    /** 速度值 */
    speed: {
      /** X轴速度值 */
      x: number
      /** Y轴速度值 */
      y: number
    }
    /** 加速值 */
    accelerate: number
    /** 上次位置 */
    prev: {
      /** 上次位置X轴 */
      x: number
      /** 上次位置Y轴 */
      y: number
      /** 定位 */
      n: number
    }
    time: number
  }

  /** 动画对象 */
  export interface AnimationObjcet {
    /** 粒子对象 */
    grains: Grain[]
  }
}
