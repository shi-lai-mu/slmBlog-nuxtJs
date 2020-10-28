/**
 * ===============
 * 站点主题配置文件
 * ===============
 */



/**
 * 文字大小
 */
export const fontSize = {
  /**
   * 最小
   */
  min: 12,
  /**
   * 最大
   */
  max: 20,
  /**
   * 大小标志[同断点]
   */
  marks: { 12: '', 13: '', 14: '', 15: '', 16: '', 17: '', 18: '', 19: '', 20: '' },
  /**
   * 当前大小
   */
  current: 16,
};


/**
 * 主题皮肤色
 */
export const color = {
  /**
   * 当前选中的色
   */
  current: 'blue',
  /**
   * 可选列表
   */
  list: {
    dark: {
      color: '#212C3D',
      icon: 'dark',
      iconColor: '#B6C3DB',
    },
    blue: {
      color: '#1DA1F2',
      icon: 'fenzu',
    },
    yellow: {
      color: '#FFAD1F',
      icon: 'xingxing',
    },
    powder: {
      color: '#E0245E',
      icon: 'taohua1',
    },
    purple: {
      color: '#794BC4',
      icon: 'youyeyoujingdeputao',
    },
    orange: {
      color: '#F45D22',
      icon: 'icon-test',
    },
    green: {
      color: '#17BF63',
      icon: 'niuyouguo',
    },
  },
};


/**
 * 主题背景色
 */
export const backgroundColor = {
  /**
   * 当前选中的色
   */
  current: 'dim',
  /**
   * 可选列表
   */
  list: {
    default: {
      name: '默认',
      color: '#FFF',
      fontColor: '#000',
      disable: true,
    },
    dim: {
      name: '暗淡',
      color: '#15202B',
      fontColor: '#FFF',
      disable: false,
    },
    dark: {
      name: '黑暗',
      color: '#121212',
      fontColor: '#FFF',
      disable: true,
    },
  },
}
