export class GlobalTool {
  /**
   * 格式化
   */
  static format = {


    /**
     * 人数
     * @param peopleNumber 人数
     */
    people(peopleNumber: number) {
      let v = peopleNumber.toString();
      const people = peopleNumber.toString();
      if (people.length > 5) v = people.substr(0, people.length - 4) + '万+';
      return v;
    },


    /**
     * 格式化日期
     * @param fmt 日期格式 如：yyyy-MM-dd HH:mm:ss
     * @param form 指定时间 不传参 默认目前时间
     * @param type 转换类型
     */
    date(form?: number | string, fmt: string = 'yyyy-MM-dd HH:mm:ss', type: 'ios' | '' = '') {
      // IOS 时区转换
      if (type === 'ios') {
        let timeMills = new Date(form).getTime();
        let tzOffset = (new Date()).getTimezoneOffset() * 60000;
        form = timeMills + tzOffset;
      }

      const date: any = form ? new Date(form) : new Date();
      const o: any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds(),
      };
      const week: string[] = [ '日', '一', '二', '三', '四', '五', '六' ];
      const season: string[] = [ '', '春', '夏', '秋', '冬' ];
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '')
        + week[date.getDay()]);
      }
      if (/(q+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, season[o['q+']] + ((RegExp.$1.length > 1) ? '季' : ''));
      }
      let k: string;
      for (k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return fmt;
    },


    /**
     * ISO转正常时间
     * @param isoString ISO格式时间戳
     * @param fmt 日期格式 如：yyyy-MM-dd HH:mm:ss
     */
    isoToDateTime(isoString: string, fmt: string = 'yyyy-MM-dd HH:mm:ss') {
      return GlobalTool.format.date(new Date(isoString).getTime(), fmt, 'ios');
    },


    /**
     * 重定义错误数据源
     * @param source 源
     * @param value  重定义内容
     */
    asignError<T>(source: T, value: any): T {
      return Object.assign(source, value);
    }
  };

  /**
   * 排除对象下的键
   * @param object  对象
   * @param keyName 键名
   */
  static excludeKey = (object: any, keyName: string | string[]) => {
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object') {
        if ((typeof keyName === 'string' && key === keyName) || keyName.includes(key)) delete object[key];
      } else object[key] = GlobalTool.excludeKey(object[key], keyName);
    });
    return object;
  }
}
