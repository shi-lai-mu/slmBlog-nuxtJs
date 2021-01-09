/**
 * ===============
 * 站点设置配置文件
 * ===============
 */
export const webSetting = {
  background: {
    canvas: {
      title: '启用背景动画',
      enable: true,
    }
  },
  cat: {
    enable: {
      title: '启用小猫 (heimi)',
      enable: true,
    },
  },
  themes: {
    autoToggle: {
      title: '自动切换深色主题',
      enable: false,
    },
    autoToggleTime: {
      title: '自动启用深色主题的时段',
      value: [18, 6],
    }
  },
};