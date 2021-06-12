import { fontSize, color, backgroundColor } from '@/config/themes'
import { isServer } from '@/config/system'

/**
 * 主题皮肤类
 */
export default new (class Themes {
  /**
   * 存储键
   */
  static _LOCAL_STORAGE_KEY_ = '_themes'

  /**
   * 内部配置
   */
  private _config = {
    fontSize,
    color,
    backgroundColor,
    isLocalUpdate: false,
  }

  /**
   * 配置文件
   */
  get config() {
    return this._config
  }

  constructor() {
    this.init()
    this._config = this.recursion(this._config)
  }

  /**
   * 初始化配置
   */
  init() {
    // 防止服务端执行
    if (isServer) return false

    // TODO: 后期需加入合并新的配置信息兼容老配置
    const { _config } = this
    let loaclConfig = localStorage.getItem(Themes._LOCAL_STORAGE_KEY_) || '{}'
    if (loaclConfig) {
      loaclConfig = JSON.parse(loaclConfig)
      Object.keys(_config).forEach(key => {
        const currentConfig = loaclConfig[key]
        const target = _config[key]
        // TODO: 此处current可能存在一定的局限性和兼容性
        if (currentConfig && target.current && typeof currentConfig !== 'object') {
          target.current = currentConfig
          _config.isLocalUpdate = true
        }
      })
    }
  }

  /**
   * 配置发生更新时
   * @param _key 更新键
   * @param _val 更新值
   */
  update(_key, _val) {
    const { fontSize: fs, color: c, backgroundColor: bc } = this._config

    localStorage.setItem(
      Themes._LOCAL_STORAGE_KEY_,
      JSON.stringify({
        fontSize: fs.current,
        color: c.current,
        backgroundColor: bc.current,
      })
    )

    return true
  }

  /**
   * 迭代代理配置
   */
  recursion(current) {
    Object.keys(current).forEach(index => {
      const target = current[index]
      if (typeof target === 'object') {
        current[index] = this.recursion(target)
      }
    })
    return this._ProxySet(current)
  }

  /**
   * 统一代理对象
   * @param current 代理目标
   */
  _ProxySet(current) {
    return new Proxy(current, {
      set: (target, key, value, rec) => {
        Reflect.set(target, key, value, rec)
        return this.update(key, value)
      },
    })
  }
})()
