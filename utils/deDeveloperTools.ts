/* tslint:disable  */
/**
 * 禁用开发者工具
 * @param disable  是否禁用
 * @param callback 回调
 */
export const deDeveloperTools = (disable, callback) => {
  if (!disable) {
    const win: any = window;
    isOpenDevTool(), win.jdetects.create((e) => {
      let a = 0;
      setInterval(() => {
        if ('on' === e) {
          console.log(e)
          setTimeout(() => {
            if (a === 0) {
              a = 1;
              callback && callback(e);
            }
          }, 1000);
          callback && callback(e);
        }
      }, 100)
    })
  }
}

/**
 * 是否开启开发者工具
 * @param disable  是否禁用
 * @param callback 回调
 */
let f: NodeJS.Timeout;
export const isOpenDevTool = (disable?: any, callback?: any) => {
  clearInterval(f);
  const win: any = window;
  let a: string = '';
  function n(e: any) {
    function n() {
      return u;
    }
    function o() {
      win.Firebug && win.Firebug.chrome && win.Firebug.chrome.isInitialized ? t('on') : (a = 'off', console.log(d), console.clear(), t(a));
      !disable && callback && callback(a);
    }
    function t(_e) {
      u !== _e && (u = _e, 'function' === typeof c.onchange && c.onchange(_e))
    }
    function r() {
      l || (l = !0, win.removeEventListener('resize', o), clearInterval(f))
    }
    'function' === typeof e && ((e as any) = {
      onchange: e,
    });
    const i = (e = e || {}).delay || 500,
      c: any = {};
    c.onchange = e.onchange;
    let d: any = new Image;
    d.__defineGetter__('id', () => {
      a = 'on'
    });
    let u = 'unknown';
    c.getStatus = n;
    f = setInterval(o, i);
    win.addEventListener('resize', o);
    let l;
    return c.free = r, c
  }
  var o = o || {};
  o.create = n, 'function' === typeof define ? (define.amd || define.cmd) && define(() => {
    return o
  }) : 'undefined' !== typeof module && module.exports ? module.exports = o : win.jdetects = o;

  win.jdetects.create(() => {});
}

declare var define: any;