import { isDev } from '@/config/system'
import defaultConfig from '@/config/default'
import { isClient } from './axios/lib/config'

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
      let v = peopleNumber.toString()
      const people = peopleNumber.toString()
      if (people.length > 5) v = people.substr(0, people.length - 4) + '万+'
      return v
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
        const timeMills = new Date(form).getTime()
        const tzOffset = new Date().getTimezoneOffset() * 60000
        form = timeMills + tzOffset
      }

      const date: Date = form ? new Date(form) : new Date()
      const o: { [k: string]: number } = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
      }
      const week: string[] = ['日', '一', '二', '三', '四', '五', '六']
      const season: string[] = ['', '春', '夏', '秋', '冬']
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay()]
        )
      }
      if (/(q+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, season[o['q+']] + (RegExp.$1.length > 1 ? '季' : ''))
      }
      let k: string
      for (k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            String(RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
          )
        }
      }
      return fmt
    },

    /**
     * ISO转正常时间
     * @param isoString ISO格式时间戳
     * @param fmt 日期格式 如：yyyy-MM-dd HH:mm:ss
     */
    isoToDateTime(isoString?: string, fmt: string = 'yyyy-MM-dd HH:mm:ss') {
      return GlobalTool.format.date(new Date(isoString).getTime(), fmt, 'ios')
    },

    /**
     * 重定义错误数据源
     * @param source 源
     * @param value  重定义内容
     */
    asianError<T>(source: T, value: unknown): T {
      return Object.assign(source, value)
    },

    /**
     * 转换路由参数
     * @param url    url链接
     * @param params 路由参数
     * @param prefix 是否携带请求前缀
     */
    paramsUrl(url: string, params: { [k: string]: string | number }, prefix: boolean = true) {
      Object.keys(params).forEach(key => {
        url = url.replace(`{${key}}`, String(params[key]))
      })
      const { apiVersion, devHost, host } = defaultConfig.apiServer
      return (prefix ? (!isDev ? host : devHost) + apiVersion : '') + url
    },

    /**
     * 转换得到时间差
     * @param timeSpan 当前时间 或 距离的值
     * @param unit     转换成指定单位
     * @returns 时差字符串
     */
    formatJetlag(timeSpan: number, unit?: '年' | '月' | '周' | '天' | '小时' | '分钟' | '秒') {
      const timestamp = new Date(timeSpan).getTime()
      const minute = 1000 * 60
      const hour = minute * 60
      const day = hour * 24
      const month = day * 30
      const year = day * 365
      const now = new Date().getTime()
      const diffValue = timeSpan < year ? timeSpan : Math.abs(now - timestamp)
      const yearC = diffValue / year
      const monthC = diffValue / month
      const weekC = diffValue / (7 * day)
      const dayC = diffValue / day
      const hourC = diffValue / hour
      const minC = diffValue / minute
      let result

      // 指定单位转换
      if (unit) {
        const diifIndex = ['年', '月', '周', '天', '小时', '分钟', '秒'].indexOf(unit)
        if (diifIndex !== -1) {
          return [yearC, monthC, weekC, dayC, hourC, minC, diffValue][diifIndex] + unit
        }
      }

      if (yearC >= 1) {
        result = `${Math.ceil(yearC)}年`
      } else if (monthC >= 1) {
        result = `${Math.ceil(monthC)}月`
      } else if (weekC >= 1) {
        result = `${Math.ceil(weekC)}周`
      } else if (dayC >= 1) {
        result = `${Math.ceil(dayC)}天`
      } else if (hourC >= 1) {
        result = `${Math.ceil(hourC)}小时`
      } else if (minC >= 1) {
        result = `${Math.ceil(minC)}分钟`
      } else {
        result = `${diffValue}秒`
      }
      return result
    },
  }

  /**
   * 排除对象下的键
   * @param object  对象
   * @param keyName 键名
   */
  static excludeKey = (
    obj: { [k: string]: { [k: string]: Record<string, unknown> | string } },
    keyName: string | string[]
  ) => {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] !== 'object') {
        if ((typeof keyName === 'string' && key === keyName) || keyName.includes(key))
          delete obj[key]
      } else obj[key] = GlobalTool.excludeKey(obj[key] as typeof obj, keyName)
    })
    return obj
  }

  /**
   * 设置延迟
   * @param ms 延迟时间
   * @param notDeBug 忽略DeBug
   */
  static speed(ms: number = 0) {
    if (isClient) {
      const axiosDebug = window.$nuxt.$router.currentRoute.query.axiosDebug as string | undefined
      if (axiosDebug !== undefined) {
        return axiosDebug !== 'false'
          ? new Promise(resolve => setTimeout(resolve, parseInt(axiosDebug, 10)))
          : !1
      }
    }
    return ms ? new Promise(resolve => setTimeout(resolve, ms)) : !1
  }
}
