/**
 * ===============
 * 站点主题配置文件
 * ===============
 */

import { User } from "~/interface/request/user";



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
    bright: {
      color: '#CCC',
      icon: 'taiyang_sun61',
      iconColor: '#707885',
    },
    blue: {
      color: '#1DA1F2',
      icon: 'fenzu',
    },
    yellow: {
      color: '#FFAD1F',
      icon: 'mangguo',
    },
    powder: {
      color: '#E0245E',
      icon: 'caomei',
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
  current: 'dark',
  /**
   * 可选列表
   */
  list: {
    bright: {
      name: '亮色',
      color: '#FFF',
      fontColor: '#000',
      disable: false,
    },
    dark: {
      name: '默认',
      color: '#15202B',
      fontColor: '#FFF',
      disable: false,
    },
    dim: {
      name: '黑暗',
      color: '#121212',
      fontColor: '#FFF',
      disable: true,
    },
  },
}


/**
 * 获取主题默认配置
 */
export const themesdefaultConfig: User.Config = {
  color: color.current                     as User.Config['color'],
  backgroundColor: backgroundColor.current as User.Config['backgroundColor'],
  fontSize: fontSize.current               as User.Config['fontSize'],
  last_update: Date.now(),
};