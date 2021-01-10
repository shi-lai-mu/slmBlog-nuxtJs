import dayJs from 'dayjs';

/**
 * ===============
 * 站点设置配置文件
 * ===============
 */
export const webSetting = {
  background: {
    title: '背景',
    canvas: {
      title: '启用背景动画',
      description: '立即生效; 显示背景动画，可能会提高性能损耗、发热和耗电；',
      type: 'switch',
      enable: true,
    }
  },
  pendant: {
    title: '悬浮物',
    cat: {
      title: '启用小猫 (heimi)',
      description: '立即生效; 右下角开启博主家的猫猫，可能会提高性能损耗、发热和耗电；',
      type: 'switch',
      enable: true,
    },
  },
  themes: {
    title: '主题',
    autoToggle: {
      title: '自动切换深色主题',
      type: 'switch',
      enable: false,
    },
    autoToggleTime: {
      title: '自动切换深色主题的时段',
      description: '在此时间段内站点会自动切换为深色模式',
      disable: false,
      type: 'timePicker',
      array: [
        ['18:00:00', '开始'],
        ['6:00:00', '结束'],
      ],
    }
  },
};

/**
 * 网站配置版本
 */
export const _WEB_CONFIG_VERSION_ = 'v1.0';

/**
 * 站点配置逻辑类
 */
export class WebSettingService {
  /**
   * 合并用户配置
   * @param userConfig 用户配置
   * @param config     目标配置
   */
  static deepExtends(userConfig, config) {
    try {
      
      userConfig = this.addNew(userConfig, config);
      userConfig = this.deleteOld(userConfig, config);
    } catch(err) {
      console.log(err);
      userConfig = config;
    }
    return userConfig || config;
    // return userConfig;
  }


  static addNew(userConfig, config) {
    
    if (userConfig === undefined) return config;
    this._echo(config, (item, key) => {
      const userCurrent = userConfig[key];
      if (typeof item !== 'object') {
        if (userCurrent === undefined) {
          userConfig[key] = item;
        }
      } else userConfig[key] = this.addNew(userCurrent, item);
    });

    return userConfig;
  }


  static deleteOld(userConfig, config) {
    // 排除
    this._echo(userConfig, (item, key) => {
      if (typeof item !== 'object' || config === undefined) {
        if (!config || config[key] === undefined) {
          delete userConfig[key];
        }
      } else {
        const newObj = this.deleteOld(item, config[key]);
        if (Object.keys(newObj).length) {
          userConfig[key] = newObj;
        } else delete userConfig[key];
      };
    });
    return userConfig;
  }

  static _echo(obj: object, cb: (item, key) => void | boolean) {
    const objKey = Object.keys(obj);
    for (const key of objKey) {
      if (cb(obj[key], key)) break;
    }
  }
}