/* tslint:disable */
(() => {
  var params = null;
  var cb = null;

  window.less = new Proxy({
    async: false,
    env: 'production',
    modifyVars: false,
  }, {
    set(target, key, value, rec) {
      // 比较保守的方法：监听window.less的loggers被less.min.js修改，然后50ms保守时间计算modifyVars，最后传回cb
      if (key === 'loggers') {
        if (window.less.cb) {
          setTimeout(() => cb(params), 50);
        }
      }
      // 因为less.min.js在计算完成后会覆盖window.less所以需要保留cb和params，让上方可以调用
      if (key === 'params') params = value;
      if (key === 'cb') cb = value;

      return Reflect.set(target, key, value, rec);
    },
  });

  setTimeout(() => {
    var lessScript = document.createElement('script');
    lessScript.src = '/script/less.min.js';
    document.body.append(lessScript);
  });
})();