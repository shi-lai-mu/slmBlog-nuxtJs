/* eslint-disable */

interface LocalWindow {
  Firebug: {
    chrome: {
      isInitialized: boolean
    }
  }
  removeEventListener: CallableFunction
  addEventListener: CallableFunction
}

interface Define extends Function {
  amd: boolean
  cmd: boolean
}

declare let define: Define
declare let jdetects: unknown & { create: CallableFunction }

/**
 * 是否开启开发者工具
 * @param disable  是否禁用
 * @param callback 回调
 */
let f: NodeJS.Timeout
export const isOpenDevTool = (disable?: boolean, callback?: CallableFunction) => {
  clearInterval(f)
  const win: LocalWindow = window as unknown as LocalWindow
  let a = ''
  const c: Record<string, string> | { onchange: unknown; getStatus: unknown; free: unknown } = {}
  function n(e: Record<string, string> | (unknown & { delay: number; onchange: unknown })) {
    function n() {
      return u
    }
    function o() {
      // eslint-disable-next-line no-unused-expressions
      win.Firebug && win.Firebug.chrome && win.Firebug.chrome.isInitialized
        ? t('on')
        : // eslint-disable-next-line no-console
          ((a = 'off'), console.log(d), console.clear(), t(a))
      !disable && callback && callback(a)
    }
    function t(_e) {
      // eslint-disable-next-line no-unused-expressions
      u !== _e && ((u = _e), typeof c.onchange === 'function' && c.onchange(_e))
    }
    function r() {
      // eslint-disable-next-line no-unused-expressions
      l || ((l = !0), win.removeEventListener('resize', o), clearInterval(f))
    }
    typeof e === 'function' &&
      ((e as unknown) = {
        onchange: e,
      })
    const i = (e = e || {}).delay || 500
    c.onchange = e.onchange
    const d: any = new Image()
    d.__defineGetter__('id', () => {
      a = 'on'
    })
    let u = 'unknown'
    c.getStatus = n
    f = setInterval(o, i as number)
    win.addEventListener('resize', o)
    let l
    return (c.free = r), c
  }
  var o = o || {}
  ;(o.create = n),
    typeof define === 'function'
      ? (define.amd || define.cmd) &&
        define(() => {
          return o
        })
      : typeof module !== 'undefined' && module.exports
      ? (module.exports = o)
      : (jdetects = o)

  jdetects.create(() => {})
}

/**
 * 禁用开发者工具
 * @param disable  是否禁用
 * @param callback 回调
 */
export const deDeveloperTools = (disable, callback) => {
  if (!disable) {
    isOpenDevTool(),
      jdetects.create(e => {
        let a = 0
        setInterval(() => {
          if (e === 'on') {
            console.log(e)
            setTimeout(() => {
              if (a === 0) {
                a = 1
                callback && callback(e)
              }
            }, 1000)
            callback && callback(e)
          }
        }, 100)
      })
  }
}
