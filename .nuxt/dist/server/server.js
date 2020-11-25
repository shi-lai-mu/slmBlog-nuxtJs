module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + ({"0":"pages/user/ment/hot","1":"pages/user/ment/new","3":"pages/article/_id","4":"pages/article/editArticle","5":"pages/article/index","6":"pages/index","7":"pages/other/friendship","8":"pages/other/me","9":"pages/other/terms","10":"pages/other/thisSite","11":"pages/user/_id","12":"pages/user/admin/login","13":"pages/user/admin/register"}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "././";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// 代理 API 接口

const IP = {
  main: 'https://api.slmblog.com/',
  img: 'https://img.slmblog.com/',
  io: 'https://io.slmblog.com/'
};
IP.uploadImg = IP.img + 'img/upload/';
const handler = {
  get(target, key, receiver) {
    let value = Reflect.get(target, key, receiver);
    if (typeof value !== 'string' && key !== 'IP') return false;
    if (!value) throw Error(`Axios [${key}] API not exist!`);
    typeof value === 'string' && (value = encodeURI(value));
    return !value.search || value.search('//') >= 0 ? value : IP.main + value;
  }

};
const API = {
  // 首页 热门 右侧
  HOME_HOT: 'blog/hot',
  HOME_RIGHT: 'blog/right',
  HOME_NOTICE: 'blog/special/1?tag=公告',
  HOME_TOP: 'blog/special/1?tag=置顶',
  // 友情链接
  FIRENDSHIP: 'blog/friendship',
  // 文章 内容
  ARTCILE_CONTENT: 'article/:id',
  // 用户
  USER_INFO: 'user/info/:id',
  USER_ALL_ARTCILE: 'article/getUserAll/:id',
  USER_LOGIN: 'user/login',
  USER_REGISTER: 'user/register',
  // IO接口
  IMAGER_UPLOAD: IP.io + 'i.php?token=:token',
  ARTICLE_ADD: 'article/add',
  ARTICLE_UNEDITOR: 'article/unEditor',
  ARTICLE_ADD_MESSAGE: 'article/addMessage',

  /* IP 接口 */
  IP
};
/* harmony default export */ __webpack_exports__["default"] = (new Proxy(API, handler));
vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$API = API;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("vue-router");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export unForm */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return form; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return utfc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return loadImg; });
/**
 * 时间戳转换为指定的时间格式
 * @param {string} fmt 转换后的日期格式
 * @param {number} form 时间戳,默认目前时间
 * @return {string} 带格式的时间
 */
const form = (fmt, form) => {
  let date = form ? new Date(form) : new Date();
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  let week = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
  };
  let season = {
    1: '春',
    2: '夏',
    3: '秋',
    4: '冬'
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? '星期' : '周' : '') + week[date.getDay() + '']);
  }

  if (/(q+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, season[o['q+']] + (RegExp.$1.length > 1 ? '季' : ''));
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }

  return fmt;
};
/**
 * 计算 距离结束 还有多长带单位
 * @param {number} time 结束时间
 * @param {number} startTime 开始时间
 * @return {string} 带单位的时间
 */


const unForm = (time, startTime) => {
  time -= startTime || new Date();
  time /= 1000;
  time < 0 && (time = -time);
  let r = `时间转换失败: ${time}`;

  if (time < 60) {
    r = time + '秒';
  } else if (time >= 60 && time < 3600) {
    r = Math.floor(time / 60) + '分' + Math.floor(time % 60) + '秒';
  } else if (time >= 3600 && time < 86400) {
    r = Math.floor(time / 3600) + '小时' + Math.floor(time % 3600 / 60) + '分';
  } else if (time >= 86400 && time < 2592000) {
    r = Math.floor(time / 86400) + '天' + Math.floor(time % 86400 / 3600) + '小时' + Math.floor(time % 86400 % 3600 / 60) + '分' + Math.floor(time % 86400 % 3600 % 60 % 60) + '秒';
  } else if (time >= 2592000 && time < 31104000) {
    r = Math.floor(time / 2592000) + '个月' + Math.floor(time % 2592000 / 86400) + '天' + Math.floor(time % 2592000 % 86400 / 3600) + '小时' + Math.floor(time % 2592000 % 86400 % 3600 / 60) + '分' + Math.floor(time % 86400 % 3600 % 60 % 60) + '秒';
  } else if (time >= 31104000) {
    r = Math.floor(time / 31104000) + '年' + Math.floor(time % 31104000 / 2592000) + '个月' + Math.floor(time % 31104000 % 2592000 / 86400) + '天' + Math.floor(time % 31104000 % 2592000 % 86400 / 3600) + '小时' + Math.floor(time % 31104000 % 2592000 % 86400 % 3600 / 60) + '分' + Math.floor(time % 31104000 % 2592000 % 86400 % 3600 % 60 % 60) + '秒';
  }

  return r;
};
/**
 * 将时间转为 00:00 或 00:00.00 格式
 * @param {number} time 时间
 * @param {number} fixed 是否带毫秒
 */


const utfc = (time, fixed = 0) => {
  let num = (time % 60).toString();
  let num2 = fixed ? num.substring(0, num.indexOf('.') + 3) : Math.ceil(num);
  return ('00' + Math.floor(time / 60)).slice(-2) + ':' + ('00' + num2).slice(fixed > 0 ? -3 - fixed : -2);
};
/**
 * 获取图像平均色
 * @param {string} url 图像路径/URL
 * @param {function} cb 回调函数
 */


const loadImg = (url, cb) => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d'); // 实例化图像

  if (typeof url === 'string') {
    // 如果跨域请求图片[中介处理]
    if (/\/\//.test(url)) {
      url = `https://api.slmblog.com/api/getImage?url=${encodeURIComponent(url)}`;
    }

    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url; // 加载完时

    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      let imgData = ctx.getImageData(0, 0, img.width, img.height).data; // 遍历像素 取总值

      let r = 0;
      let g = 0;
      let b = 0;
      let wLength = parseInt(img.width / 5);
      let hLength = parseInt(img.height / 5); // 六分算法

      for (let w = 0; w < 6; w++) {
        for (let h = 0; h < 6; h++) {
          r += imgData[(wLength * w + hLength * h) * 4];
          g += imgData[(wLength * w + hLength * h) * 4 + 1];
          b += imgData[(wLength * w + hLength * h) * 4 + 2];
        }
      } // 计算平均色


      r = parseInt(r / 36);
      g = parseInt(g / 36);
      b = parseInt(b / 36); // 返回

      let rgb = `rgb(${r},${g},${b})`;
      cb && cb(rgb);
      return rgb;
    }; // 加载错误


    img.onerror = console.error;
  }
};



/***/ }),
/* 7 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _plugins_tool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/**
 * 数据处理
 */


/* harmony default export */ __webpack_exports__["default"] = ({
  // 首页热门
  HOME_HOT(data) {
    for (let i = 0, len = data.list.length; i < len; i++) {
      const val = data.list[i];
      val.type = val.type.split('#');
      val.type.shift();

      if (val.img && val.img.indexOf('//') === -1) {
        val.img = _API__WEBPACK_IMPORTED_MODULE_0__["default"].IP.uploadImg + val.img;
      }
    }

    return data;
  },

  // 文章内容
  ARTCILE_CONTENT(data) {
    if (data.type) {
      data.type = data.type.split('#');
      data.type.shift();

      if (data.img && data.img.indexOf('//') === -1) {
        data.img = _API__WEBPACK_IMPORTED_MODULE_0__["default"].IP.uploadImg + data.img;
      }

      return data;
    }
  },

  // 个人中心 热门文章
  USER_ALL_ARTCILE(data) {
    data = data.map(index => {
      // 图片域名
      if (index.img && index.img.indexOf('//') === -1) {
        index.img = _API__WEBPACK_IMPORTED_MODULE_0__["default"].IP.uploadImg + index.img;
      } // 时间


      index.createTime = _plugins_tool__WEBPACK_IMPORTED_MODULE_1__[/* form */ "a"]('yyyy-MM-dd HH:mm:ss', index.createTime * 1000);
      return index;
    });
    return data;
  }

});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("vue-no-ssr");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  // 设置首页文章模式
  SET_ARTICLE_MODEL(store, data) {
    store.articleModel = data;
  },

  // 清空文章模式
  CLEAR_ARTICLE_MODEL(store) {
    store.articleModel = {};
  },

  // 设置是否为移动端
  MOBILE(store, mobile) {
    store.mobile = mobile;
  },

  // 设置用户信息
  SET_USER(store, user) {
    if (typeof user === 'string' && user !== 'undefined') {
      if (user === 'default') {
        user = {
          username: '史莱姆',
          img: '//thirdqq.qlogo.cn/g?b=sdk&k=s3zxCIMMOxfQibT9H8la8zg&s=100'
        };
      } else {
        user = JSON.parse(user);
      }
    } else if (typeof user === 'object') {
      localStorage.setItem('userInfo', JSON.stringify(user));
    }

    this.$router.user = user;
    store.user = user;
  }

});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  async ARTICLE_MODEL({
    commit
  }, model) {
    commit('SET_ARTICLE_MODEL', model);
  },

  async IS_MOBILE({
    commit
  }, width) {
    commit('MOBILE', width < 840);
  },

  async USER({
    commit
  }, user) {
    commit('SET_USER', user);
  }

});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("vue-client-only");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./components/music/index.vue?vue&type=template&id=812c4404&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bottom-music"},[_vm._ssrNode("<div"+(_vm._ssrClass(null,['music-list', { 'list-show': _vm.floatList }]))+">","</div>",[_vm._ssrNode("<div class=\"blur-bg\">"+((_vm.info.img != '//slmblog.com/LOGO.png')?("<img"+(_vm._ssrAttr("src",_vm.info.img))+" alt>"):"<!---->")+"</div> <ul class=\"right-select-top\""+(_vm._ssrStyle(null,'color: ' + _vm.iconColor, null))+">"+(_vm._ssrList((_vm.pages),function(v,i){return ("<li"+(_vm._ssrAttr("data-i",i))+(_vm._ssrClass(null,{ focus: _vm.currentTab == i }))+"><i"+(_vm._ssrClass(null,['iconfont', i]))+"></i></li>")}))+"</ul> <ul class=\"right-select-bottom\""+(_vm._ssrStyle(null,'color: ' + _vm.iconColor, null))+">"+(_vm._ssrList((_vm.tools),function(v,i){return ("<li"+(_vm._ssrAttr("data-i",i))+(_vm._ssrClass(null,{ focus: _vm.currentTab == i }))+"><i"+(_vm._ssrClass(null,['iconfont', i]))+"></i></li>")}))+"</ul> "),_c('keep-alive',[_c(_vm.pages[_vm.currentTab],{ref:"pages",tag:"component"})],1)],2),_vm._ssrNode(" <div"+(_vm._ssrClass(null,['music-float', { 'float-show': _vm.floatState }]))+"><div class=\"progress\"><div data-on=\"progress\" class=\"progress-load\"></div></div> <img"+(_vm._ssrAttr("src",_vm.info.img))+" alt=\"音乐封面\" class=\"music-icon\"> <span class=\"music-title\">"+_vm._ssrEscape(_vm._s(_vm.info.tag))+"</span> <span class=\"music-right\"><i data-on=\"up\" class=\"iconfont icon-up-copy\"></i> <i data-on=\"toggle\" class=\"iconfont icon-zanting1\"></i> <i data-on=\"down\" class=\"iconfont icon-next\"></i> <i class=\"iconfont icon-fangxiangxia right-toggle\"></i></span> <audio"+(_vm._ssrAttr("src",_vm.info.src))+" autoplay=\"autoplay\"></audio></div>")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/music/index.vue?vue&type=template&id=812c4404&

// EXTERNAL MODULE: ./components/music/Music.js
var Music = __webpack_require__(21);

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./components/music/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 // 底部音乐插件

/* harmony default export */ var musicvue_type_script_lang_js_ = ({
  data() {
    return {
      floatState: !1,
      floatList: !1,
      // 第一次加载
      onlyLoad: !1,
      // 选项默认色
      iconColor: '#222',
      // 默认选中
      currentTab: '',
      // 分页列表
      pages: {
        'icon-sou-suo': 'Search',
        'icon-yinle': 'Info',
        'icon-yinleliebiaoxian': 'List',
        'icon-shoucang': 'collect',
        'icon-xiazai': 'download',
        'icon-shezhi': 'Setting'
      },
      // 工具栏内容 对应执行函数名
      tools: {},
      // 工具栏显示个数 默认全部
      toolList: {
        'icon-sou-suo': false
      },
      // 音乐信息
      info: {
        img: '/LOGO.png',
        src: '',
        tag: '点击展开工具栏'
      }
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.Music = this.$store.state.Music = new new Music["default"]()(this);
    }); // 监听音乐信息

    this.observer.on('music', data => {
      this.Music.loadMusic(data.albummid, !!data.autoPlay);
    });
    window.addEventListener('resize', resize);
    let oldInnerHeight = window.innerHeight;
    let resizeTime = null;
    let self = this;

    function resize(e) {
      // 节流
      clearTimeout(resizeTime);
      resizeTime = setTimeout(() => {
        // 防止移动端输入时键盘弹起导致布局变形 40为排除键盘
        let newInner = window.innerHeight;

        if (self.$store.state.mobile && oldInnerHeight - newInner < 40) {
          let children = self.$el.children;
          children[1].style.top = `${newInner - children[1].offsetHeight}px`;
          children[0].style.top = `${newInner - children[0].offsetHeight - children[1].offsetHeight}px`;
          children[0].style.height = `${children[0].offsetHeight}px`;
        }
      }, 100);
    }

    resize();
  },

  methods: {
    /**
     * 切换音乐浮动状态
     */
    toggleFloat() {
      let self = this;
      self.floatState = !self.floatState; // 第一次点开,进行等一次加载,防止资源浪费

      if (!self.onlyLoad) {
        this.pages['icon-sou-suo'] = resolve => __webpack_require__.e(/* AMD require */ 15).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(76)]; (resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}.bind(this)).catch(__webpack_require__.oe);

        self.onlyLoad = !0;
        self.currentTab = 'icon-sou-suo';
      } // 如果关闭时 列表为展开 则 关闭


      if (self.floatList) {
        self.floatList = !1;
      }
    },

    /**
     * 切换音乐列表展示状态
     */
    toggleList() {
      this.floatList = !this.floatList;
    },

    /**
     * 选项卡点击事件
     */
    selectTab(e) {
      const i = e.target.dataset.i;

      if (i) {
        const page = this.pages[i];

        if (typeof page === 'string') {
          this.pages[i] = resolve => __webpack_require__.e(/* AMD require */ 14).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(111)(`./${page}`)]; (resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);}.bind(this)).catch(__webpack_require__.oe);
        }

        this.currentTab = i;
      }
    },

    /**
     * 播放控制
     */
    musicConsole(e) {
      if (e.target.tagName.toLowerCase() === 'i') {
        e.stopPropagation();

        if (e.target.dataset.on) {
          this.Music[e.target.dataset.on](e.target);
        }
      }
    },

    /**
     * 进度条点击事件
     */
    progress(e) {
      e.stopPropagation();
      this.Music.jump((e.clientX / (e.toElement.offsetWidth / 100)).toFixed(2));
    },

    wheel(e) {
      e.stopPropagation();
    }

  }
});
// CONCATENATED MODULE: ./components/music/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_musicvue_type_script_lang_js_ = (musicvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/music/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(40)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_musicvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "7e8aa22d"
  
)

/* harmony default export */ var music = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(URL) {/* harmony import */ var _plugins_tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);

/**
 * 音乐函数
 * @param {object} self vue Object
 */

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var _temp, _temp2;

  let vue = {}; // 观察者

  let observer = new (_temp = class obServer {
    constructor() {
      this.task = [];
    }

    // 订阅
    $on(key, callback) {
      !this.task[key] && (this.task[key] = []);
      this.task[key].push(callback);
    } // 发布


    $emit(key, data) {
      if (this.task[key]) {
        this.task[key].forEach(fun => fun(data));
      }
    }

  }, _temp)(); // 音乐类

  return _temp2 = class Music {
    // 信息
    // 增强工具
    // 下载列队
    // 下载状态
    // 接口 [qq: QQ音乐, wy: 网易, dog: 酷狗 ...]
    // 内部数据
    // 定时器
    // 存储vue
    constructor(vues) {
      this.info = {};
      this.note = {
        // 备忘录模式存储上次的歌曲
        storage: [],
        // 目前额外的歌曲信息[引用的地址]
        store: {}
      };
      this.download = {
        list: []
      };
      this.downloadState = !1;
      this.type = 'qq';
      this.store = {
        // 是否正在播放
        state: false,
        // 子控件
        conEl: {}
      };
      this.currentTime = null;
      // 默认音乐数据
      // this.loadMusic('003OLhvp2nqSjQ')
      vue = vues;
      this.$el = vue.$refs.music; // 存入 音乐控制的节点 datat-on: element

      let musicConsole = vue.$refs.musicConsole.getElementsByTagName('*');

      for (let i = 0, l = musicConsole.length; i < l; i++) {
        let data = musicConsole[i].dataset.on;

        if (data) {
          this.store.conEl[data] = musicConsole[i];
        }
      } // 图标更新 订阅


      observer.$on('iconUpdate', () => {
        // 主控件
        let store = this.store;
        let $el = store.conEl;
        $el.toggle.className = store.state ? 'iconfont icon-zanting' : 'iconfont icon-zanting1';
      }); // 进度条监听

      let progress = this.store.conEl.progress;
      let music = this.$el;
      this.interval = setInterval(() => {
        let song = this.info.song;
        if (song) progress.style.width = `${music.currentTime / (song.interval / 100)}%`;
      }, 500);
    }
    /**
     * 载入音乐
     * @param {string} albummid 音乐MID
     * @param {boolean} play 是否立马播放
     */


    loadMusic(albummid, play = false) {
      if (!albummid) return;
      let self = this; // 获取音乐信息

      vue.$axios.get('/api/Music', {
        data: {
          fun: 'getMusicInfo',
          code: albummid
        }
      }).then(res => {
        if (res.data) {
          self.info = res.data; // 选中songmid的ID

          for (let song of self.info.list) {
            if (song.albummid === albummid) {
              self.info.song = song;
              break;
            }
          }

          self.writeView();
          self.store.conEl.toggle.className = 'iconfont icon-caidan'; // 获取歌曲播放位置

          if (self.info.song) {
            self.getDownload(self.info.song.songmid, '48AAC', data => {
              vue.info.src = data.url;
              play && (self.$el.autoplay = true);
              self.store.conEl.toggle.className = 'iconfont icon-zanting';
              self.store.state = !0;
            });
          }
        }
      }).catch(e => {
        throw Error(albummid + `音乐 获取失败, 请及时进行维护!!!\nError:` + e);
      });
    }
    /* 音乐数据写入视图 */


    writeView() {
      if (!this.info.mid) return;

      try {
        // 默认播放 m4a 格式音乐
        // 数据顺序 对象, 封面图片, 播放路径, 歌名, 歌手, 歌简介, 歌上传时间, 相似歌曲
        let info = this.info;
        vue.info = {
          img: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${info.mid}.jpg`,
          src: info.src || '',
          tag: info.name,
          singername: info.singername,
          description: info.desc,
          upload: info.aDate,
          list: info.list
        };
        Object(_plugins_tool__WEBPACK_IMPORTED_MODULE_0__[/* loadImg */ "b"])(vue.info.img, rgb => {
          vue.iconColor = rgb;
        });
      } catch (e) {
        throw Error(`写入音乐信息时出现未知错误: ${e}`);
      } // 触发 内部更新
      // vue.$connecter.$emit('music')

    }
    /* 播放音乐 */


    play() {
      let self = this;

      if (self.$el.play) {
        let music = self.$el;

        if (!music.autoplay) {
          music.play();
        } else {
          music.autoplay = true;
        }

        self.store.state = !0;
        observer.$emit('iconUpdate');
      }
    }
    /* 停止音乐 */


    stop() {
      if (this.$el.pause) {
        this.$el.pause();
        this.$el.autoplay = false;
        this.store.state = !1;
        observer.$emit('iconUpdate');
      }
    }
    /**
     * 音乐状态切换
     * @param {element} el 节点
     */


    toggle(el) {
      this.store.state ? this.stop() : this.play();
    }
    /**
     * 播放跳转
     * @param {number} interval 跳转百分比
     */


    jump(interval) {
      if (!this.store.state) return;
      let min = this.info.song.interval / 100;
      interval = Math.min(interval, 100);
      interval = Math.max(interval, 0);
      this.$el.currentTime = min * interval;
    }
    /**
     * 获取下载链接
     * @param {string} songmid 音乐songmid
     * @param {string} qu 音乐品质[24AAC, 128MP3, 320MP3, APE, FLAC]
     * @param {function} cb 回调
     */


    getDownload(songmid, qu, cb) {
      vue.$axios.get(`api/Music?fun=download&code=${songmid}&type=${qu}`).then(res => {
        if (res.url) {
          cb(res);
        } else throw Error(`请求[ ${songmid} ]下载数据错误!`);
      }).catch(e => {
        throw Error(`破解请求过于频繁,请稍后再试!` + e);
      });
    }
    /**
     * 添加至下载列队
     * @param {object} url 包含name和src
     */


    addDownload(url) {
      let download = this.download.list; // 如果存在下载列队内则退出

      for (let i = 0, l = download.length; i < l; i++) {
        if (url.src === download[i].src) return;
      }

      url.state = 0;
      url.ext = url.src.match(/(:?\.m4a|\.mp3|\.flac)/)[0];
      this.download.list.push(url);
    }
    /**
     * 开始下载全部音乐
     * @param {boolean} start 是否为开始下载状态
     */


    allDownloadStart(start) {
      if (start) this.downloadState = !0; // 更改为开始下载的状态

      if (!this.downloadState) return;
      let task = this.download.list[0];

      if (task && task.name) {
        this.downloadMusic(task, () => {
          this.download.list.shift();

          if (this.downloadState) {
            this.allDownloadStart();
          }
        });
      }
    }
    /**
     * 下载音乐
     * @param {object} data 音乐数据
     * @param {functin} cb 下载完成后的回调
     */


    downloadMusic(data, cb) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      let a = document.createElement('a');

      xhr.onprogress = function (e) {
        let percent = (e.loaded / e.total * 100).toFixed(2);
        data.state = percent;
      };

      xhr.onload = function (e) {
        var blob = new Blob([this.response]);
        a.href = URL.createObjectURL(blob);
        a.download = `${data.name}.${data.ext}`;
        document.body.appendChild(a);
        a.click();
        cb && cb();
      };

      xhr.onerror = console.error;
      data.src = data.src.replace('http://streamoc.music.tc.qq.com/', 'https://slmblog.com/download/music/');

      if (data.src) {
        xhr.open('get', data.src, true);
        xhr.send();
      }
    }

  }, _temp2;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(29)["URL"]))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// This file is intentionally left empty for noop aliases

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("vue-meta");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("defu");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("jsrsasign");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(43);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_error_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_nuxt_loading_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_background_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_background_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_background_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_background_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_background_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_3_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_3_oneOf_1_1_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_background_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/police_badge.d0289dc.png";

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Toast_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Toast_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Toast_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Toast_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Toast_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Toast_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_default_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuex__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);




vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1___default.a);

const createStore = () => new vuex__WEBPACK_IMPORTED_MODULE_1___default.a.Store({
  state: () => ({
    // 用户数据
    user: {},
    // 是否为移动端[小屏幕]
    mobile: false,
    // 文章显示模式
    articleModel: {},
    Music: {}
  }),
  actions: _actions__WEBPACK_IMPORTED_MODULE_3__["default"],
  mutations: _mutations__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/* harmony default export */ __webpack_exports__["default"] = (createStore);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "querystring"
var external_querystring_ = __webpack_require__(24);

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(0);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: external "node-fetch"
var external_node_fetch_ = __webpack_require__(25);
var external_node_fetch_default = /*#__PURE__*/__webpack_require__.n(external_node_fetch_);

// CONCATENATED MODULE: ./.nuxt/middleware.js
const middleware = {};
/* harmony default export */ var _nuxt_middleware = (middleware);
// CONCATENATED MODULE: ./.nuxt/utils.js
 // window.{{globals.loadedCallback}} hook
// Useful for jsdom testing or plugins (https://github.com/tmpvar/jsdom#dealing-with-asynchronous-script-loading)

if (false) {}

function empty() {}
function globalHandleError(error) {
  if (external_vue_default.a.config.errorHandler) {
    external_vue_default.a.config.errorHandler(error);
  }
}
function interopDefault(promise) {
  return promise.then(m => m.default || m);
}
function hasFetch(vm) {
  return vm.$options && typeof vm.$options.fetch === 'function' && !vm.$options.fetch.length;
}
function getChildrenComponentInstancesUsingFetch(vm, instances = []) {
  const children = vm.$children || [];

  for (const child of children) {
    if (child.$fetch) {
      instances.push(child);
      continue; // Don't get the children since it will reload the template
    }

    if (child.$children) {
      getChildrenComponentInstancesUsingFetch(child, instances);
    }
  }

  return instances;
}
function applyAsyncData(Component, asyncData) {
  if ( // For SSR, we once all this function without second param to just apply asyncData
  // Prevent doing this for each SSR request
  !asyncData && Component.options.__hasNuxtData) {
    return;
  }

  const ComponentData = Component.options._originDataFn || Component.options.data || function () {
    return {};
  };

  Component.options._originDataFn = ComponentData;

  Component.options.data = function () {
    const data = ComponentData.call(this, this);

    if (this.$ssrContext) {
      asyncData = this.$ssrContext.asyncData[Component.cid];
    }

    return { ...data,
      ...asyncData
    };
  };

  Component.options.__hasNuxtData = true;

  if (Component._Ctor && Component._Ctor.options) {
    Component._Ctor.options.data = Component.options.data;
  }
}
function sanitizeComponent(Component) {
  // If Component already sanitized
  if (Component.options && Component._Ctor === Component) {
    return Component;
  }

  if (!Component.options) {
    Component = external_vue_default.a.extend(Component); // fix issue #6

    Component._Ctor = Component;
  } else {
    Component._Ctor = Component;
    Component.extendOptions = Component.options;
  } // If no component name defined, set file path as name, (also fixes #5703)


  if (!Component.options.name && Component.options.__file) {
    Component.options.name = Component.options.__file;
  }

  return Component;
}
function getMatchedComponents(route, matches = false, prop = 'components') {
  return Array.prototype.concat.apply([], route.matched.map((m, index) => {
    return Object.keys(m[prop]).map(key => {
      matches && matches.push(index);
      return m[prop][key];
    });
  }));
}
function getMatchedComponentsInstances(route, matches = false) {
  return getMatchedComponents(route, matches, 'instances');
}
function flatMapComponents(route, fn) {
  return Array.prototype.concat.apply([], route.matched.map((m, index) => {
    return Object.keys(m.components).reduce((promises, key) => {
      if (m.components[key]) {
        promises.push(fn(m.components[key], m.instances[key], m, key, index));
      } else {
        delete m.components[key];
      }

      return promises;
    }, []);
  }));
}
function resolveRouteComponents(route, fn) {
  return Promise.all(flatMapComponents(route, async (Component, instance, match, key) => {
    // If component is a function, resolve it
    if (typeof Component === 'function' && !Component.options) {
      Component = await Component();
    }

    match.components[key] = Component = sanitizeComponent(Component);
    return typeof fn === 'function' ? fn(Component, instance, match, key) : Component;
  }));
}
async function getRouteData(route) {
  if (!route) {
    return;
  } // Make sure the components are resolved (code-splitting)


  await resolveRouteComponents(route); // Send back a copy of route with meta based on Component definition

  return { ...route,
    meta: getMatchedComponents(route).map((Component, index) => {
      return { ...Component.options.meta,
        ...(route.matched[index] || {}).meta
      };
    })
  };
}
async function setContext(app, context) {
  // If context not defined, create it
  if (!app.context) {
    app.context = {
      isStatic: true,
      isDev: false,
      isHMR: false,
      app,
      store: app.store,
      payload: context.payload,
      error: context.error,
      base: './',
      env: {}
    }; // Only set once

    if (false) {}

    if (false) {}

    if (context.ssrContext) {
      app.context.ssrContext = context.ssrContext;
    }

    app.context.redirect = (status, path, query) => {
      if (!status) {
        return;
      }

      app.context._redirected = true; // if only 1 or 2 arguments: redirect('/') or redirect('/', { foo: 'bar' })

      let pathType = typeof path;

      if (typeof status !== 'number' && (pathType === 'undefined' || pathType === 'object')) {
        query = path || {};
        path = status;
        pathType = typeof path;
        status = 302;
      }

      if (pathType === 'object') {
        path = app.router.resolve(path).route.fullPath;
      } // "/absolute/route", "./relative/route" or "../relative/route"


      if (/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)) {
        app.context.next({
          path,
          query,
          status
        });
      } else {
        path = formatUrl(path, query);

        if (true) {
          app.context.next({
            path,
            status
          });
        }

        if (false) {}
      }
    };

    if (true) {
      app.context.beforeNuxtRender = fn => context.beforeRenderFns.push(fn);
    }

    if (false) {}
  } // Dynamic keys


  const [currentRouteData, fromRouteData] = await Promise.all([getRouteData(context.route), getRouteData(context.from)]);

  if (context.route) {
    app.context.route = currentRouteData;
  }

  if (context.from) {
    app.context.from = fromRouteData;
  }

  app.context.next = context.next;
  app.context._redirected = false;
  app.context._errored = false;
  app.context.isHMR = false;
  app.context.params = app.context.route.params || {};
  app.context.query = app.context.route.query || {};
}
function middlewareSeries(promises, appContext) {
  if (!promises.length || appContext._redirected || appContext._errored) {
    return Promise.resolve();
  }

  return promisify(promises[0], appContext).then(() => {
    return middlewareSeries(promises.slice(1), appContext);
  });
}
function promisify(fn, context) {
  let promise;

  if (fn.length === 2) {
    // fn(context, callback)
    promise = new Promise(resolve => {
      fn(context, function (err, data) {
        if (err) {
          context.error(err);
        }

        data = data || {};
        resolve(data);
      });
    });
  } else {
    promise = fn(context);
  }

  if (promise && promise instanceof Promise && typeof promise.then === 'function') {
    return promise;
  }

  return Promise.resolve(promise);
} // Imported from vue-router

function getLocation(base, mode) {
  let path = decodeURI(window.location.pathname);

  if (mode === 'hash') {
    return window.location.hash.replace(/^#\//, '');
  } // To get matched with sanitized router.base add trailing slash


  if (base && (path.endsWith('/') ? path : path + '/').startsWith(base)) {
    path = path.slice(base.length);
  }

  return (path || '/') + window.location.search + window.location.hash;
} // Imported from path-to-regexp

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */

function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
function getQueryDiff(toQuery, fromQuery) {
  const diff = {};
  const queries = { ...toQuery,
    ...fromQuery
  };

  for (const k in queries) {
    if (String(toQuery[k]) !== String(fromQuery[k])) {
      diff[k] = true;
    }
  }

  return diff;
}
function normalizeError(err) {
  let message;

  if (!(err.message || typeof err === 'string')) {
    try {
      message = JSON.stringify(err, null, 2);
    } catch (e) {
      message = `[${err.constructor.name}]`;
    }
  } else {
    message = err.message || err;
  }

  return { ...err,
    message,
    statusCode: err.statusCode || err.status || err.response && err.response.status || 500
  };
}
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

const PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  const tokens = [];
  let key = 0;
  let index = 0;
  let path = '';
  const defaultDelimiter = options && options.delimiter || '/';
  let res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    const m = res[0];
    const escaped = res[1];
    const offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    const next = str[index];
    const prefix = res[2];
    const name = res[3];
    const capture = res[4];
    const group = res[5];
    const modifier = res[6];
    const asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    const partial = prefix != null && next != null && next !== prefix;
    const repeat = modifier === '+' || modifier === '*';
    const optional = modifier === '?' || modifier === '*';
    const delimiter = res[2] || defaultDelimiter;
    const pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter,
      optional,
      repeat,
      partial,
      asterisk: Boolean(asterisk),
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str, slashAllowed) {
  const re = slashAllowed ? /[?#]/g : /[/?#]/g;
  return encodeURI(str).replace(re, c => {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURIComponentPretty(str, true);
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$/()])/g, '\\$1');
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens, options) {
  // Compile all the tokens into regexps.
  const matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (let i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
    }
  }

  return function (obj, opts) {
    let path = '';
    const data = obj || {};
    const options = opts || {};
    const encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      const value = data[token.name || 'pathMatch'];
      let segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (let j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options && options.sensitive ? '' : 'i';
}
/**
 * Format given url, append query to url query string
 *
 * @param  {string} url
 * @param  {string} query
 * @return {string}
 */


function formatUrl(url, query) {
  let protocol;
  const index = url.indexOf('://');

  if (index !== -1) {
    protocol = url.substring(0, index);
    url = url.substring(index + 3);
  } else if (url.startsWith('//')) {
    url = url.substring(2);
  }

  let parts = url.split('/');
  let result = (protocol ? protocol + '://' : '//') + parts.shift();
  let path = parts.join('/');

  if (path === '' && parts.length === 1) {
    result += '/';
  }

  let hash;
  parts = path.split('#');

  if (parts.length === 2) {
    [path, hash] = parts;
  }

  result += path ? '/' + path : '';

  if (query && JSON.stringify(query) !== '{}') {
    result += (url.split('?').length === 2 ? '&' : '?') + formatQuery(query);
  }

  result += hash ? '#' + hash : '';
  return result;
}
/**
 * Transform data object to query string
 *
 * @param  {object} query
 * @return {string}
 */


function formatQuery(query) {
  return Object.keys(query).sort().map(key => {
    const val = query[key];

    if (val == null) {
      return '';
    }

    if (Array.isArray(val)) {
      return val.slice().map(val2 => [key, '=', val2].join('')).join('&');
    }

    return key + '=' + val;
  }).filter(Boolean).join('&');
}

function addLifecycleHook(vm, hook, fn) {
  if (!vm.$options[hook]) {
    vm.$options[hook] = [];
  }

  if (!vm.$options[hook].includes(fn)) {
    vm.$options[hook].push(fn);
  }
}
function urlJoin() {
  return [].slice.call(arguments).join('/').replace(/\/+/g, '/').replace(':/', '://');
}
function stripTrailingSlash(path) {
  return path.replace(/\/+$/, '') || '/';
}
function isSamePath(p1, p2) {
  return stripTrailingSlash(p1) === stripTrailingSlash(p2);
}
// CONCATENATED MODULE: ./.nuxt/mixins/fetch.server.js



async function serverPrefetch() {
  if (!this._fetchOnServer) {
    return;
  } // Call and await on $fetch


  try {
    await this.$options.fetch.call(this);
  } catch (err) {
    if (false) {}

    this.$fetchState.error = normalizeError(err);
  }

  this.$fetchState.pending = false; // Define an ssrKey for hydration

  this._fetchKey = this.$ssrContext.nuxt.fetch.length; // Add data-fetch-key on parent element of Component

  const attrs = this.$vnode.data.attrs = this.$vnode.data.attrs || {};
  attrs['data-fetch-key'] = this._fetchKey; // Add to ssrContext for window.__NUXT__.fetch

  this.$ssrContext.nuxt.fetch.push(this.$fetchState.error ? {
    _error: this.$fetchState.error
  } : this._data);
}

/* harmony default export */ var fetch_server = ({
  created() {
    if (!hasFetch(this)) {
      return;
    }

    if (typeof this.$options.fetchOnServer === 'function') {
      this._fetchOnServer = this.$options.fetchOnServer.call(this) !== false;
    } else {
      this._fetchOnServer = this.$options.fetchOnServer !== false;
    }

    external_vue_default.a.util.defineReactive(this, '$fetchState', {
      pending: true,
      error: null,
      timestamp: Date.now()
    });
    addLifecycleHook(this, 'serverPrefetch', serverPrefetch);
  }

});
// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__(2);
var external_vuex_default = /*#__PURE__*/__webpack_require__.n(external_vuex_);

// EXTERNAL MODULE: external "vue-meta"
var external_vue_meta_ = __webpack_require__(26);
var external_vue_meta_default = /*#__PURE__*/__webpack_require__.n(external_vue_meta_);

// EXTERNAL MODULE: external "vue-client-only"
var external_vue_client_only_ = __webpack_require__(19);
var external_vue_client_only_default = /*#__PURE__*/__webpack_require__.n(external_vue_client_only_);

// EXTERNAL MODULE: external "vue-no-ssr"
var external_vue_no_ssr_ = __webpack_require__(16);
var external_vue_no_ssr_default = /*#__PURE__*/__webpack_require__.n(external_vue_no_ssr_);

// EXTERNAL MODULE: external "vue-router"
var external_vue_router_ = __webpack_require__(4);
var external_vue_router_default = /*#__PURE__*/__webpack_require__.n(external_vue_router_);

// CONCATENATED MODULE: ./.nuxt/router.scrollBehavior.js


if (false) {}

/* harmony default export */ var router_scrollBehavior = (function (to, from, savedPosition) {
  // If the returned position is falsy or an empty object, will retain current scroll position
  let position = false;
  const Pages = getMatchedComponents(to); // Scroll to the top of the page if...

  if ( // One of the children set `scrollToTop`
  Pages.some(Page => Page.options.scrollToTop) || // scrollToTop set in only page without children
  Pages.length < 2 && Pages.every(Page => Page.options.scrollToTop !== false)) {
    position = {
      x: 0,
      y: 0
    };
  } // savedPosition is only available for popstate navigations (back button)


  if (savedPosition) {
    position = savedPosition;
  }

  const nuxt = window.$nuxt;

  if ( // Route hash changes
  to.path === from.path && to.hash !== from.hash || // Initial load (vuejs/vue-router#3199)
  to === from) {
    nuxt.$nextTick(() => nuxt.$emit('triggerScroll'));
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash; // CSS.escape() is not supported with IE and Edge.

        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1));
        }

        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = {
              selector: hash
            };
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).');
        }
      }

      resolve(position);
    });
  });
});
// CONCATENATED MODULE: ./.nuxt/router.js





const _c31c4c3e = () => interopDefault(__webpack_require__.e(/* import() | pages/article/index */ 5).then(__webpack_require__.bind(null, 110)));

const _0193065b = () => interopDefault(__webpack_require__.e(/* import() | pages/article/editArticle */ 4).then(__webpack_require__.bind(null, 120)));

const _36460dfe = () => interopDefault(__webpack_require__.e(/* import() | pages/other/friendship */ 7).then(__webpack_require__.bind(null, 119)));

const _15a0de82 = () => interopDefault(__webpack_require__.e(/* import() | pages/other/me */ 8).then(__webpack_require__.bind(null, 118)));

const _d495f4a0 = () => interopDefault(__webpack_require__.e(/* import() | pages/other/terms */ 9).then(__webpack_require__.bind(null, 117)));

const _66fc406c = () => interopDefault(__webpack_require__.e(/* import() | pages/other/thisSite */ 10).then(__webpack_require__.bind(null, 116)));

const _52df052d = () => interopDefault(__webpack_require__.e(/* import() | pages/user/admin/login */ 12).then(__webpack_require__.bind(null, 115)));

const _e5272ee2 = () => interopDefault(__webpack_require__.e(/* import() | pages/user/admin/register */ 13).then(__webpack_require__.bind(null, 114)));

const _3f4e5470 = () => interopDefault(__webpack_require__.e(/* import() | pages/user/ment/hot */ 0).then(__webpack_require__.bind(null, 123)));

const _0cd8099b = () => interopDefault(__webpack_require__.e(/* import() | pages/user/ment/new */ 1).then(__webpack_require__.bind(null, 121)));

const _22bee089 = () => interopDefault(__webpack_require__.e(/* import() | pages/article/_id */ 3).then(__webpack_require__.bind(null, 112)));

const _25261c84 = () => interopDefault(__webpack_require__.e(/* import() | pages/user/_id */ 11).then(__webpack_require__.bind(null, 122)));

const _0f46d3ba = () => interopDefault(__webpack_require__.e(/* import() | pages/index */ 6).then(__webpack_require__.bind(null, 113))); // TODO: remove in Nuxt 3


const emptyFn = () => {};

const originalPush = external_vue_router_default.a.prototype.push;

external_vue_router_default.a.prototype.push = function push(location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort);
};

external_vue_default.a.use(external_vue_router_default.a);
const routerOptions = {
  mode: 'hash',
  base: decodeURI('./'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior: router_scrollBehavior,
  routes: [{
    path: "/article",
    component: _c31c4c3e,
    name: "article"
  }, {
    path: "/article/editArticle",
    component: _0193065b,
    name: "article-editArticle"
  }, {
    path: "/other/friendship",
    component: _36460dfe,
    name: "other-friendship"
  }, {
    path: "/other/me",
    component: _15a0de82,
    name: "other-me"
  }, {
    path: "/other/terms",
    component: _d495f4a0,
    name: "other-terms"
  }, {
    path: "/other/thisSite",
    component: _66fc406c,
    name: "other-thisSite"
  }, {
    path: "/user/admin/login",
    component: _52df052d,
    name: "user-admin-login"
  }, {
    path: "/user/admin/register",
    component: _e5272ee2,
    name: "user-admin-register"
  }, {
    path: "/user/ment/hot",
    component: _3f4e5470,
    name: "user-ment-hot"
  }, {
    path: "/user/ment/new",
    component: _0cd8099b,
    name: "user-ment-new"
  }, {
    path: "/article/:id",
    component: _22bee089,
    name: "article-id"
  }, {
    path: "/user/:id?",
    component: _25261c84,
    name: "user-id"
  }, {
    path: "/",
    component: _0f46d3ba,
    name: "index"
  }],
  fallback: false
};
function createRouter() {
  return new external_vue_router_default.a(routerOptions);
}
// CONCATENATED MODULE: ./.nuxt/components/nuxt-child.js
/* harmony default export */ var nuxt_child = ({
  name: 'NuxtChild',
  functional: true,
  props: {
    nuxtChildKey: {
      type: String,
      default: ''
    },
    keepAlive: Boolean,
    keepAliveProps: {
      type: Object,
      default: undefined
    }
  },

  render(_, {
    parent,
    data,
    props
  }) {
    const h = parent.$createElement;
    data.nuxtChild = true;
    const _parent = parent;
    const transitions = parent.$nuxt.nuxt.transitions;
    const defaultTransition = parent.$nuxt.nuxt.defaultTransition;
    let depth = 0;

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.nuxtChild) {
        depth++;
      }

      parent = parent.$parent;
    }

    data.nuxtChildDepth = depth;
    const transition = transitions[depth] || defaultTransition;
    const transitionProps = {};
    transitionsKeys.forEach(key => {
      if (typeof transition[key] !== 'undefined') {
        transitionProps[key] = transition[key];
      }
    });
    const listeners = {};
    listenersKeys.forEach(key => {
      if (typeof transition[key] === 'function') {
        listeners[key] = transition[key].bind(_parent);
      }
    });

    if (false) {} // make sure that leave is called asynchronous (fix #5703)


    if (transition.css === false) {
      const leave = listeners.leave; // only add leave listener when user didnt provide one
      // or when it misses the done argument

      if (!leave || leave.length < 2) {
        listeners.leave = (el, done) => {
          if (leave) {
            leave.call(_parent, el);
          }

          _parent.$nextTick(done);
        };
      }
    }

    let routerView = h('routerView', data);

    if (props.keepAlive) {
      routerView = h('keep-alive', {
        props: props.keepAliveProps
      }, [routerView]);
    }

    return h('transition', {
      props: transitionProps,
      on: listeners
    }, [routerView]);
  }

});
const transitionsKeys = ['name', 'mode', 'appear', 'css', 'type', 'duration', 'enterClass', 'leaveClass', 'appearClass', 'enterActiveClass', 'enterActiveClass', 'leaveActiveClass', 'appearActiveClass', 'enterToClass', 'leaveToClass', 'appearToClass'];
const listenersKeys = ['beforeEnter', 'enter', 'afterEnter', 'enterCancelled', 'beforeLeave', 'leave', 'afterLeave', 'leaveCancelled', 'beforeAppear', 'appear', 'afterAppear', 'appearCancelled'];
// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-error.vue?vue&type=template&id=38a3918a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"__nuxt-error-page"},[_vm._ssrNode("<div class=\"error\">","</div>",[_vm._ssrNode("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"90\" height=\"90\" fill=\"#DBE1EC\" viewBox=\"0 0 48 48\"><path d=\"M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z\"></path></svg> <div class=\"title\">"+_vm._ssrEscape(_vm._s(_vm.message))+"</div> "),(_vm.statusCode === 404)?_vm._ssrNode("<p class=\"description\">","</p>",[(typeof _vm.$route === 'undefined')?_vm._ssrNode("<a href=\"/\" class=\"error-link\">","</a>"):_c('NuxtLink',{staticClass:"error-link",attrs:{"to":"/"}},[_vm._v("Back to the home page")])],1):_vm._e(),_vm._ssrNode(" <div class=\"logo\"><a href=\"https://nuxtjs.org\" target=\"_blank\" rel=\"noopener\">Nuxt.js</a></div>")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue?vue&type=template&id=38a3918a&

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-error.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var nuxt_errorvue_type_script_lang_js_ = ({
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return this.error && this.error.statusCode || 500;
    },

    message() {
      return this.error.message || 'Error';
    }

  },

  head() {
    return {
      title: this.message,
      meta: [{
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
      }]
    };
  }

});
// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_nuxt_errorvue_type_script_lang_js_ = (nuxt_errorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./.nuxt/components/nuxt-error.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(31)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var nuxt_error_component = Object(componentNormalizer["a" /* default */])(
  components_nuxt_errorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "d42424aa"
  
)

/* harmony default export */ var nuxt_error = (nuxt_error_component.exports);
// CONCATENATED MODULE: ./.nuxt/components/nuxt.js




/* harmony default export */ var components_nuxt = ({
  name: 'Nuxt',
  components: {
    NuxtChild: nuxt_child,
    NuxtError: nuxt_error
  },
  props: {
    nuxtChildKey: {
      type: String,
      default: undefined
    },
    keepAlive: Boolean,
    keepAliveProps: {
      type: Object,
      default: undefined
    },
    name: {
      type: String,
      default: 'default'
    }
  },

  errorCaptured(error) {
    // if we receive and error while showing the NuxtError component
    // capture the error and force an immediate update so we re-render
    // without the NuxtError component
    if (this.displayingNuxtError) {
      this.errorFromNuxtError = error;
      this.$forceUpdate();
    }
  },

  computed: {
    routerViewKey() {
      // If nuxtChildKey prop is given or current route has children
      if (typeof this.nuxtChildKey !== 'undefined' || this.$route.matched.length > 1) {
        return this.nuxtChildKey || compile(this.$route.matched[0].path)(this.$route.params);
      }

      const [matchedRoute] = this.$route.matched;

      if (!matchedRoute) {
        return this.$route.path;
      }

      const Component = matchedRoute.components.default;

      if (Component && Component.options) {
        const {
          options
        } = Component;

        if (options.key) {
          return typeof options.key === 'function' ? options.key(this.$route) : options.key;
        }
      }

      const strict = /\/$/.test(matchedRoute.path);
      return strict ? this.$route.path : this.$route.path.replace(/\/$/, '');
    }

  },

  beforeCreate() {
    external_vue_default.a.util.defineReactive(this, 'nuxt', this.$root.$options.nuxt);
  },

  render(h) {
    // if there is no error
    if (!this.nuxt.err) {
      // Directly return nuxt child
      return h('NuxtChild', {
        key: this.routerViewKey,
        props: this.$props
      });
    } // if an error occurred within NuxtError show a simple
    // error message instead to prevent looping


    if (this.errorFromNuxtError) {
      this.$nextTick(() => this.errorFromNuxtError = false);
      return h('div', {}, [h('h2', 'An error occurred while showing the error page'), h('p', 'Unfortunately an error occurred and while showing the error page another error occurred'), h('p', `Error details: ${this.errorFromNuxtError.toString()}`), h('nuxt-link', {
        props: {
          to: '/'
        }
      }, 'Go back to home')]);
    } // track if we are showing the NuxtError component


    this.displayingNuxtError = true;
    this.$nextTick(() => this.displayingNuxtError = false);
    return h(nuxt_error, {
      props: {
        error: this.nuxt.err
      }
    });
  }

});
// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./.nuxt/components/nuxt-loading.vue?vue&type=script&lang=js&
/* harmony default export */ var nuxt_loadingvue_type_script_lang_js_ = ({
  name: 'NuxtLoading',

  data() {
    return {
      percent: 0,
      show: false,
      canSucceed: true,
      reversed: false,
      skipTimerCount: 0,
      rtl: false,
      throttle: 200,
      duration: 5000,
      continuous: false
    };
  },

  computed: {
    left() {
      if (!this.continuous && !this.rtl) {
        return false;
      }

      return this.rtl ? this.reversed ? '0px' : 'auto' : !this.reversed ? '0px' : 'auto';
    }

  },

  beforeDestroy() {
    this.clear();
  },

  methods: {
    clear() {
      clearInterval(this._timer);
      clearTimeout(this._throttle);
      this._timer = null;
    },

    start() {
      this.clear();
      this.percent = 0;
      this.reversed = false;
      this.skipTimerCount = 0;
      this.canSucceed = true;

      if (this.throttle) {
        this._throttle = setTimeout(() => this.startTimer(), this.throttle);
      } else {
        this.startTimer();
      }

      return this;
    },

    set(num) {
      this.show = true;
      this.canSucceed = true;
      this.percent = Math.min(100, Math.max(0, Math.floor(num)));
      return this;
    },

    get() {
      return this.percent;
    },

    increase(num) {
      this.percent = Math.min(100, Math.floor(this.percent + num));
      return this;
    },

    decrease(num) {
      this.percent = Math.max(0, Math.floor(this.percent - num));
      return this;
    },

    pause() {
      clearInterval(this._timer);
      return this;
    },

    resume() {
      this.startTimer();
      return this;
    },

    finish() {
      this.percent = this.reversed ? 0 : 100;
      this.hide();
      return this;
    },

    hide() {
      this.clear();
      setTimeout(() => {
        this.show = false;
        this.$nextTick(() => {
          this.percent = 0;
          this.reversed = false;
        });
      }, 500);
      return this;
    },

    fail(error) {
      this.canSucceed = false;
      return this;
    },

    startTimer() {
      if (!this.show) {
        this.show = true;
      }

      if (typeof this._cut === 'undefined') {
        this._cut = 10000 / Math.floor(this.duration);
      }

      this._timer = setInterval(() => {
        /**
         * When reversing direction skip one timers
         * so 0, 100 are displayed for two iterations
         * also disable css width transitioning
         * which otherwise interferes and shows
         * a jojo effect
         */
        if (this.skipTimerCount > 0) {
          this.skipTimerCount--;
          return;
        }

        if (this.reversed) {
          this.decrease(this._cut);
        } else {
          this.increase(this._cut);
        }

        if (this.continuous) {
          if (this.percent >= 100) {
            this.skipTimerCount = 1;
            this.reversed = !this.reversed;
          } else if (this.percent <= 0) {
            this.skipTimerCount = 1;
            this.reversed = !this.reversed;
          }
        }
      }, 100);
    }

  },

  render(h) {
    let el = h(false);

    if (this.show) {
      el = h('div', {
        staticClass: 'nuxt-progress',
        class: {
          'nuxt-progress-notransition': this.skipTimerCount > 0,
          'nuxt-progress-failed': !this.canSucceed
        },
        style: {
          width: this.percent + '%',
          left: this.left
        }
      });
    }

    return el;
  }

});
// CONCATENATED MODULE: ./.nuxt/components/nuxt-loading.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_nuxt_loadingvue_type_script_lang_js_ = (nuxt_loadingvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./.nuxt/components/nuxt-loading.vue
var nuxt_loading_render, nuxt_loading_staticRenderFns


function nuxt_loading_injectStyles (context) {
  
  var style0 = __webpack_require__(32)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var nuxt_loading_component = Object(componentNormalizer["a" /* default */])(
  components_nuxt_loadingvue_type_script_lang_js_,
  nuxt_loading_render,
  nuxt_loading_staticRenderFns,
  false,
  nuxt_loading_injectStyles,
  null,
  "48802c1f"
  
)

/* harmony default export */ var nuxt_loading = (nuxt_loading_component.exports);
// EXTERNAL MODULE: ./static/css/public.less
var css_public = __webpack_require__(33);

// EXTERNAL MODULE: ./static/css/icon.css
var icon = __webpack_require__(34);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/components/background.vue?vue&type=template&id=ecf1718e&
var backgroundvue_type_template_id_ecf1718e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('canvas',{ref:"canvas",staticClass:"canvas-bg",attrs:{"width":"1920","height":"1080"}},[])}
var backgroundvue_type_template_id_ecf1718e_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/components/background.vue?vue&type=template&id=ecf1718e&

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/components/background.vue?vue&type=script&lang=js&
//
//
//
//

/* slmblog 背景组件 */
/* harmony default export */ var backgroundvue_type_script_lang_js_ = ({
  beforeMount() {
    this.$nextTick(() => {
      // 如果为QQ浏览器则不进行计算
      if (/QQBrowser/.test(window.navigator.userAgent)) return; // canvas

      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext('2d');
      let slef = this;

      let CanvasBg = function () {
        var _temp;

        let ctxCount = 40;
        let sizeMax = 5;
        let lineWidth = 40; // pc 端配置

        if (!slef.$store.state.mobile) {
          ctxCount = 100;
          sizeMax = 10;
          lineWidth = 100;
        }

        return _temp = class Canvas {
          constructor() {
            this.clearInter = null;
            canvas.width = document.body.offsetWidth;
            canvas.height = document.documentElement.clientHeight;
            this.resize();
            this.dots = []; // 生成球体

            for (var i = 0; i < ctxCount; i++) {
              this.dots.push({
                x: rand() * canvas.width - 20,
                y: rand() * canvas.height,
                // 移动角度
                xa: (rand() * 2 - 1) / 1.5,
                ya: (rand() * 2 - 1) / 1.5,
                // 颜色
                color: this.getRandColor(),
                // 设备像素修复
                size: 3 + rand() * sizeMax + 1 % window.devicePixelRatio,
                big: rand() > 0.5 ? rand() * 4 : false,
                kernel: rand() > 0.5
              });
            }

            window.requestAnimationFrame(this.draw.bind(this)); // 随机数

            function rand() {
              return Math.random();
            }
          } // 绘制函数


          draw() {
            let doc = document.documentElement;
            canvas.width = doc.clientWidth;
            canvas.height = doc.clientHeight;

            for (var i = 0; i < ctxCount; i++) {
              let dot = this.dots[i];
              dot.x += dot.xa;
              dot.y += dot.ya; // 边缘碰撞检并变色

              if (dot.x > canvas.width || dot.x < dot.size / 2) {
                dot.xa *= -1;
                dot.color = this.getRandColor();
              }

              if (dot.y > canvas.height || dot.y < dot.size / 2) {
                dot.ya *= -1;
                dot.color = this.getRandColor();
              } // dot.xa *= dot.x > canvas.width || dot.x < dot.size / 2 ? -1 : 1
              // dot.ya *= dot.y > canvas.height || dot.y < dot.size / 2 ? -1 : 1


              let color = `${dot.color.r},${dot.color.g},${dot.color.b}`; // 连线检测

              for (var j = 0; j < ctxCount; j++) {
                let otherDot = this.dots[j];
                let dx = Math.pow(Math.pow(dot.x - otherDot.x, 2) + Math.pow(dot.y - otherDot.y, 2), 0.5); // 连线

                if (dx <= dot.size + otherDot.size + lineWidth) {
                  dot.kernel && this.command({
                    beginPath: 1,
                    move: [otherDot.x, otherDot.y],
                    line: [dot.x, dot.y],
                    strokeStyle: [`rgba(${color},0.1)`],
                    stroke: 1
                  });
                }
              } // 基础圆形


              ctx.fillStyle = `rgba(${color},0.1)`;
              ctx.beginPath();
              ctx.arc(dot.x - 0.5, dot.y - 0.5, dot.size, 0, 2 * Math.PI, false);
              ctx.fill(); // 内部核心

              dot.kernel && this.command({
                beginPath: 1,
                fillStyle: [`rgba(${color},0.2)`],
                arc: [dot.x - 0.5, dot.y - 0.5, dot.size / 2],
                fill: 1
              }); // 大圈

              dot.big && this.command({
                beginPath: 1,
                strokeStyle: [`rgba(${color},0.15)`],
                arc: [dot.x - 0.5, dot.y - 0.5, dot.size * dot.big],
                stroke: 1
              });
            }

            window.requestAnimationFrame(this.draw.bind(this));
          } // 随机色


          getRandColor() {
            return {
              r: 25 + Math.random() * 250,
              g: 25 + Math.random() * 250,
              b: 25 + Math.random() * 250
            };
          } // 命令绘制模式


          command(commands) {
            let cmdList = {
              beginPath: () => ctx.beginPath(),
              arc: (x, y, size) => ctx.arc(x, y, size, 0, Math.PI * 2, false),
              line: (x, y) => ctx.lineTo(x, y),
              move: (x, y) => ctx.moveTo(x, y),
              fillStyle: color => ctx.fillStyle = color,
              strokeStyle: color => ctx.strokeStyle = color,
              stroke: () => ctx.stroke(),
              fill: () => ctx.fill()
            };

            for (let cmd in commands) {
              if (cmd in cmdList) {
                if (commands[cmd] !== 1) {
                  cmdList[cmd](...commands[cmd]);
                } else cmdList[cmd]();
              }
            }
          } // 改变大小时


          resize() {
            let doc = document.documentElement;
            canvas.width = doc.clientWidth;
            canvas.height = doc.clientHeight;
          }

        }, _temp;
      }();

      this.CanvasBg = new CanvasBg(); // 缩小窗口时改变canvas

      window.addEventListener('resize', () => {
        this.CanvasBg.resize();
      });
    });
  }

});
// CONCATENATED MODULE: ./layouts/components/background.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_backgroundvue_type_script_lang_js_ = (backgroundvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./layouts/components/background.vue



function background_injectStyles (context) {
  
  var style0 = __webpack_require__(35)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var background_component = Object(componentNormalizer["a" /* default */])(
  components_backgroundvue_type_script_lang_js_,
  backgroundvue_type_template_id_ecf1718e_render,
  backgroundvue_type_template_id_ecf1718e_staticRenderFns,
  false,
  background_injectStyles,
  null,
  "27b6cc1a"
  
)

/* harmony default export */ var background = (background_component.exports);
// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/components/footer.vue?vue&type=template&id=e9aae958&
var footervue_type_template_id_e9aae958_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('footer',{staticClass:"body-footer"},[_vm._ssrNode("<div class=\"copyright clearfix\">","</div>",[_vm._ssrNode("<span class=\"copyright-left\">© CopyRight 2018-2019, <a href=\"//slmblog.com\">SLMBLOG.COM</a>, Inc.All Rights Reserved.</span> "),_vm._ssrNode("<ul class=\"copyright-right\">","</ul>",[_vm._ssrNode("<li>","</li>",[_c('router-link',{attrs:{"to":"/other/terms"}},[_vm._v("条款和免责")])],1),_vm._ssrNode(" "),_vm._ssrNode("<li>","</li>",[_c('router-link',{attrs:{"to":"/other/thisSite"}},[_vm._v("关于本站")])],1)],2)],2),_vm._ssrNode(" <div class=\"beian clearfix\"><span class=\"beian-a\"><img"+(_vm._ssrAttr("src",__webpack_require__(36)))+" class=\"beian-img\"> <p class=\"beian-p\"><a target=\"_blank\" href=\"//www.miitbeian.gov.cn\">浙ICP备18049156号-2</a> <a target=\"_blank\" href=\"//www.beian.gov.cn\">(浙公网安备 33038102331168号)</a></p></span></div>")],2)}
var footervue_type_template_id_e9aae958_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/components/footer.vue?vue&type=template&id=e9aae958&

// CONCATENATED MODULE: ./layouts/components/footer.vue

var script = {}
function footer_injectStyles (context) {
  
  var style0 = __webpack_require__(37)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var footer_component = Object(componentNormalizer["a" /* default */])(
  script,
  footervue_type_template_id_e9aae958_render,
  footervue_type_template_id_e9aae958_staticRenderFns,
  false,
  footer_injectStyles,
  null,
  "986ecb40"
  
)

/* harmony default export */ var footer = (footer_component.exports);
// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/components/header.vue?vue&type=template&id=1b3ac101&
var headervue_type_template_id_1b3ac101_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{class:['header-nav', { 'header-hide': _vm.headerHide }]},[_vm._ssrNode("<div class=\"conter\">","</div>",[_vm._ssrNode("<h1 class=\"LOGO\">","</h1>",[_c('nuxt-link',{staticClass:"max-a",attrs:{"to":{ name: 'index' }}})],1),_vm._ssrNode(" <span class=\"menu-touch\"><i"+(_vm._ssrClass(null,['menu-list', {close: _vm.menuState}]))+"></i></span> "),_vm._ssrNode("<nav"+(_vm._ssrClass(null,_vm.menuState ? 'list-show' : 'list-hide'))+(_vm._ssrStyle(null,_vm.mobilStyle, null))+">","</nav>",[_vm._ssrNode(((_vm.$store.state.mobile)?("<span class=\"login-after\"><img"+(_vm._ssrAttr("src",_vm.user.img))+(_vm._ssrAttr("alt",_vm.user.username + '的头像'))+" class=\"user-icon\"> <p class=\"user-name\">"+_vm._ssrEscape("\n          "+_vm._s(_vm.user.username || '点击登录')+"\n        ")+"</p></span>"):"<!---->")+" "),_vm._ssrNode("<ul class=\"header-menu-list\">","</ul>",_vm._l((_vm.menu),function(menu,i){return _vm._ssrNode("<li>","</li>",[(!menu.sub)?_c('router-link',{staticClass:"max-a",attrs:{"tag":"span","to":menu.to}},[_vm._v(_vm._s(menu.tag))]):_c('span',[_vm._v(_vm._s(menu.tag))]),_vm._ssrNode(" "+((menu.sub)?("<i class=\"iconfont icon-fangxiangxia\"></i>"):"<!---->")+" "),(menu.sub)?_vm._ssrNode("<ul>","</ul>",_vm._l((menu.sub),function(sub,n){return _vm._ssrNode("<li>","</li>",[(sub[1] == '#' || sub.indexOf('/') > -1 || typeof sub[1] === 'object')?_c('router-link',{staticClass:"max-a",attrs:{"to":sub[1],"tag":"span"}},[_vm._v(_vm._s(sub[0]))]):_c('span',{staticClass:"max-a",on:{"click":function($event){return _vm.runCommand(sub[1])}}},[_vm._v(_vm._s(sub[0]))])],1)}),0):_vm._e()],2)}),0)],2),_vm._ssrNode(" "),_vm._ssrNode("<span class=\"header-right\">","</span>",[_vm._ssrNode("<span class=\"search-box\"><input class=\"search\"> <i class=\"iconfont icon-sou-suo\"></i></span> "),_c('transition',{attrs:{"name":"fade"}},[(isNaN(_vm.user.id))?_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.account),expression:"account"}],staticClass:"login-before"},[_c('router-link',{attrs:{"to":"/user/admin/login","tag":"span"}},[_vm._v("登录")]),_vm._v(" "),_c('router-link',{staticClass:"focus",attrs:{"to":"/user/admin/register","tag":"span"}},[_vm._v("注册")])],1):_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.account),expression:"account"}],staticClass:"login-after focus"},[_c('router-link',{attrs:{"to":{ name: 'user-id', params: { id: _vm.user.id }}}},[_c('img',{staticClass:"user-icon",attrs:{"src":_vm.user.img,"alt":_vm.user.username + '的头像'}}),_vm._v(" "),_c('p',{staticClass:"user-name",domProps:{"textContent":_vm._s(_vm.user.username)}})])],1)])],2)],2)])}
var headervue_type_template_id_1b3ac101_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/components/header.vue?vue&type=template&id=1b3ac101&

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/components/header.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var headervue_type_script_lang_js_ = ({
  props: ['head'],
  computed: { ...Object(external_vuex_["mapState"])({
      user: 'user'
    })
  },

  data() {
    return {
      menuState: false,
      menu: [],
      mobilStyle: null,
      account: !0,
      headerHide: false
    };
  },

  mounted() {
    this.$nextTick(() => {
      // 失焦事件[移动端]
      this.$store.state.mobile && window.addEventListener('click', e => {
        if (this.menuState && !this.$el.contains(e.target)) {
          this.toggleMneu();
        }
      }); // 向下滚动时收起顶部[pc端]

      let scrollTop = 0;
      let lastInter = null;

      if (!this.$store.state.mobile) {
        window.addEventListener('scroll', () => {
          clearTimeout(lastInter);
          lastInter = setTimeout(() => {
            const scroll = window.scrollY;
            this.headerHide = scrollTop < scroll;
            scrollTop = scroll;
          }, 100);
        });
      }

      this.updateRouter();
      this.observer.on('HeaderRouter', this.updateRouter);
    });
    this.rightShow(this.$route);
  },

  watch: {
    '$route'(to) {
      this.rightShow(to);
    }

  },
  methods: {
    /**
     * 更新菜单路由指向
     */
    updateRouter() {
      // 对权限进行判断
      this.menu = [{
        tag: '文章',
        sub: [['首页', '/'], ['置顶', '#'], ['最新', '#'], ['最热', '#'], ['精品', '#'], ['讨论', '#']]
      }, {
        tag: '技术',
        sub: [['JavaScript', '#'], ['PHP', '#'], ['CSS', '#'], ['HTML', '#']]
      }, {
        tag: '资源',
        sub: [['Windows', '#'], ['Andorid', '#'], ['Web', '#'], ['other', '#']]
      }, {
        tag: '账号',
        sub: [['登录', {
          name: 'user-admin-login'
        }, 'register'], ['注册', {
          name: 'user-admin-register'
        }, 'register'], ['发帖', {
          name: 'article-editArticle'
        }, 'admin'], ['安全退出', 'outLogin', 'login']]
      }];
      const permissions = this.$router.permissions;
      this.menu.filter((item, index) => {
        if (item.sub) {
          item.sub = item.sub.filter(subItem => {
            // 设置了权限判断
            if (subItem[2]) {
              subItem = permissions(subItem[2]) ? subItem : false;
            }

            return subItem;
          });
        }

        return item;
      });
    },

    /**
     * 开启/关闭 导航栏[移动端]
     * @param {Boolean} state 切换状态
     */
    toggleMneu(state) {
      if (typeof state === 'boolean') {
        if (this.menuState === state) return this.menuState;
        this.menuState = state;
      } else this.menuState = !this.menuState;

      if (this.$store.state.mobile) {
        console.log(this.observer.is('body'));
        this.observer.emit('body', {
          key: 'className',
          value: this.menuState ? 'min-screen-left' : ''
        });
      }

      return this.menuState;
    },

    /* 点击导航栏内部,子导航时缩小菜单[移动端事件] */
    minMenu(e) {
      let last = e.target.lastChild;

      if (!last || !last.tagName || last.tagName.toLowerCase() !== 'ul') {
        this.toggleMneu();
      }
    },

    /* 运行命令 */
    runCommand(key) {
      this[key]();
    },

    /* 退出登录 */
    outLogin() {
      localStorage.removeItem('userInfo');
      this.$store.dispatch('USER', 'default');
      this.updateRouter();
      this.observer.emit('toast', {
        icon: 'zhiwen',
        text: '安全退出成功!'
      });
    },

    /* 搜索关键词 */
    searchKeyWord(e) {
      this.observer.emit('searchKeyWord', e.target.value);
      e.target.value = '';
      e.target.blur();
    },

    /* 右侧显示判断 */
    rightShow(to) {
      const path = to.path; // 如果在登录页不显示account

      this.account = !(path === '/user/admin/login' || path === '/user/admin/register'); // 如果登录了在首页则不显示account

      if ((path === '/' || path === '/user/center') && !isNaN(this.user.id)) {
        this.account = !1;
      }
    }

  }
});
// CONCATENATED MODULE: ./layouts/components/header.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_headervue_type_script_lang_js_ = (headervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./layouts/components/header.vue



function header_injectStyles (context) {
  
  var style0 = __webpack_require__(38)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var header_component = Object(componentNormalizer["a" /* default */])(
  components_headervue_type_script_lang_js_,
  headervue_type_template_id_1b3ac101_render,
  headervue_type_template_id_1b3ac101_staticRenderFns,
  false,
  header_injectStyles,
  null,
  "560a035c"
  
)

/* harmony default export */ var header = (header_component.exports);
// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/components/Toast.vue?vue&type=template&id=c84b9950&
var Toastvue_type_template_id_c84b9950_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode((_vm._ssrList((_vm.task),function(item,index){return ("<div"+(_vm._ssrClass(null,['toast', { show: item.show }, { action: item.action }, item.icon]))+(_vm._ssrStyle(null,'top:' + (80 + (index * 140)) + 'px', null))+"><div class=\"tag\"><i"+(_vm._ssrClass(null,'iconfont icon-' + item.icon))+"></i> <span>"+_vm._ssrEscape(_vm._s(item.title))+"</span> <i"+(_vm._ssrAttr("data-id",index))+" class=\"iconfont icon-guanbi-xianxing\"></i></div> <div class=\"content\">"+(_vm._s(item.text))+"</div> <div"+(_vm._ssrAttr("data-parent",index))+" class=\"select\""+(_vm._ssrStyle(null,null, { display: (item.select.length) ? '' : 'none' }))+">"+(_vm._ssrList((item.select),function(item,id){return ("<div"+(_vm._ssrAttr("data-id",id))+" class=\"button\">"+_vm._ssrEscape(_vm._s(item.value))+"</div>")}))+"</div></div>")})))])}
var Toastvue_type_template_id_c84b9950_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/components/Toast.vue?vue&type=template&id=c84b9950&

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/components/Toast.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * Toast 组件： 负责消息通知
 */
/* harmony default export */ var Toastvue_type_script_lang_js_ = ({
  data() {
    return {
      task: []
    };
  },

  mounted() {
    const that = this;
    that.observer.on('toast', obj => {
      const newToast = {
        title: obj.title || '系统通知',
        icon: obj.icon || 'gonggao-xianxing',
        text: obj.text || '信息获取错误',
        time: obj.time === undefined ? 2500 : obj.time,
        action: obj.action || !1,
        show: !1,
        select: obj.select || []
      }; // 自动识别为错误警告

      if (obj.error) {
        newToast.icon = 'wrong';
        newToast.title = '系统警告';
        newToast.text = obj.error;
        newToast.time = 4000;
      } // 加入显示列队


      const index = this.task.push(newToast);
      setTimeout(() => {
        // 渲染完显示
        newToast.show = !0; // 几秒后消失 如果 time为false则等待关闭状态

        newToast.time !== false && setTimeout(() => that.close(index - 1), newToast.time);
      }, 100);
    });
  },

  methods: {
    /* 互动区 点击处理 如果执行函数返回true则关闭窗口 */
    selectClick(e) {
      const id = e.target.dataset.id;
      const parent = e.target.parentElement.dataset.parent;
      const select = this.task[parent].select;

      if (id && select[id]) {
        const item = select[id];
        const cb = item.action.call(item.that ? item.that : this);
        cb && this.close(id - 1);
      }
    },

    /* 关闭 */
    close(e) {
      const id = isNaN(e) ? e.target.dataset.id : e;
      this.task[id].show = !1;
      setTimeout(() => {
        this.task.splice(id, 1);
      }, 400);
    }

  }
});
// CONCATENATED MODULE: ./layouts/components/Toast.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Toastvue_type_script_lang_js_ = (Toastvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./layouts/components/Toast.vue



function Toast_injectStyles (context) {
  
  var style0 = __webpack_require__(39)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Toast_component = Object(componentNormalizer["a" /* default */])(
  components_Toastvue_type_script_lang_js_,
  Toastvue_type_template_id_c84b9950_render,
  Toastvue_type_template_id_c84b9950_staticRenderFns,
  false,
  Toast_injectStyles,
  null,
  "88af485c"
  
)

/* harmony default export */ var Toast = (Toast_component.exports);
// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/default.vue?vue&type=template&id=3f6fcdb0&
var defaultvue_type_template_id_3f6fcdb0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"body",staticClass:"boss"},[_c('main-background'),_vm._ssrNode(" "),_c('main-Header'),_vm._ssrNode(" "),_c('transition',{attrs:{"name":"test"}},[_c('nuxt')],1),_vm._ssrNode(" "),_c('main-footer'),_vm._ssrNode(" "),_c('music'),_vm._ssrNode(" "),_c('Toast')],2)}
var defaultvue_type_template_id_3f6fcdb0_staticRenderFns = []


// CONCATENATED MODULE: ./layouts/default.vue?vue&type=template&id=3f6fcdb0&

// EXTERNAL MODULE: ./components/music/index.vue + 4 modules
var music = __webpack_require__(20);

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./layouts/default.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var defaultvue_type_script_lang_js_ = ({
  scrollToTop: true,
  head: {
    title: '史莱姆的博客'
  },
  components: {
    mainHeader: header,
    mainFooter: footer,
    mainBackground: background,
    music: music["default"],
    Toast: Toast
  },
  watch: {
    '$route'(to, from) {
      window.scrollTo(0, 0); // this.baiduPush()
    }

  },

  mounted() {
    const slef = this; // slef.baiduPush()

    let user = localStorage.getItem('userInfo');
    slef.$nuxt.$store.dispatch('USER', user || 'default');
    user = slef.$store.state.user; // 缩放窗口时 响应式处理

    window.addEventListener('resize', resize);

    function resize(e) {
      document.body.className = window.innerWidth > 840 ? 'max' : 'centre';
      slef.$store.dispatch('IS_MOBILE', window.innerWidth);
    }

    resize(); // refs.body 订阅

    slef.observer.on('body', option => {
      slef.$refs.body.className = option.value ? option.value : 'boss';
    });
    slef.$nextTick(() => {
      // PC版 问候
      !slef.$store.state.mobile && slef.observer.emit('toast', {
        text: isNaN(user.id) ? '欢迎访问, 史莱姆的博客!' : `欢迎回来 ${user.username}`
      });
    });
    console.log('%cSLM BLOG%c version 1.5.0', 'font-size: 40px;color: rgb(254,65,129);font-weight: bold;', 'font-size: 20px;color: rgb(254,65,129)');
    console.log('      %c欢迎访问 史莱姆的博客!', 'font-size: 20px;color: rgb(254,65,129)');
  },

  methods: {
    // 百度推送
    baiduPush() {
      const bp = document.createElement('script');
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
      let s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(bp, s);
    }

  }
});
// CONCATENATED MODULE: ./layouts/default.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_defaultvue_type_script_lang_js_ = (defaultvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./layouts/default.vue



function default_injectStyles (context) {
  
  var style0 = __webpack_require__(41)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var default_component = Object(componentNormalizer["a" /* default */])(
  layouts_defaultvue_type_script_lang_js_,
  defaultvue_type_template_id_3f6fcdb0_render,
  defaultvue_type_template_id_3f6fcdb0_staticRenderFns,
  false,
  default_injectStyles,
  null,
  "0ec95c6d"
  
)

/* harmony default export */ var layouts_default = (default_component.exports);
// CONCATENATED MODULE: ./.nuxt/App.js










const layouts = {
  "_components/background": sanitizeComponent(background),
  "_components/footer": sanitizeComponent(footer),
  "_components/header": sanitizeComponent(header),
  "_components/Toast": sanitizeComponent(Toast),
  "_default": sanitizeComponent(layouts_default)
};
/* harmony default export */ var App = ({
  render(h, props) {
    const loadingEl = h('NuxtLoading', {
      ref: 'loading'
    });
    const layoutEl = h(this.layout || 'nuxt');
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl]);
    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll');
          });
        }

      }
    }, [templateEl]);
    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [loadingEl, transitionEl]);
  },

  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: '',
    nbFetching: 0
  }),

  beforeCreate() {
    external_vue_default.a.util.defineReactive(this, 'nuxt', this.$options.nuxt);
  },

  created() {
    // Add this.$nuxt in child instances
    external_vue_default.a.prototype.$nuxt = this;

    if (false) {} // Add $nuxt.error()


    this.error = this.nuxt.error; // Add $nuxt.context

    this.context = this.$options.context;
  },

  async mounted() {
    this.$loading = this.$refs.loading;
  },

  watch: {
    'nuxt.err': 'errorChanged'
  },
  computed: {
    isOffline() {
      return !this.isOnline;
    },

    isFetching() {
      return this.nbFetching > 0;
    },

    isPreview() {
      return Boolean(this.$options.previewData);
    }

  },
  methods: {
    refreshOnlineStatus() {
      if (false) {}
    },

    async refresh() {
      const pages = getMatchedComponentsInstances(this.$route);

      if (!pages.length) {
        return;
      }

      this.$loading.start();
      const promises = pages.map(page => {
        const p = []; // Old fetch

        if (page.$options.fetch && page.$options.fetch.length) {
          p.push(promisify(page.$options.fetch, this.context));
        }

        if (page.$fetch) {
          p.push(page.$fetch());
        } else {
          // Get all component instance to call $fetch
          for (const component of getChildrenComponentInstancesUsingFetch(page.$vnode.componentInstance)) {
            p.push(component.$fetch());
          }
        }

        if (page.$options.asyncData) {
          p.push(promisify(page.$options.asyncData, this.context).then(newData => {
            for (const key in newData) {
              external_vue_default.a.set(page.$data, key, newData[key]);
            }
          }));
        }

        return Promise.all(p);
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        this.$loading.fail(error);
        globalHandleError(error);
        this.error(error);
      }

      this.$loading.finish();
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) {
          this.$loading.fail(this.nuxt.err);
        }

        if (this.$loading.finish) {
          this.$loading.finish();
        }
      }
    },

    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default';
      }

      this.layoutName = layout;
      this.layout = layouts['_' + layout];
      return this.layout;
    },

    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default';
      }

      return Promise.resolve(layouts['_' + layout]);
    }

  },
  components: {
    NuxtLoading: nuxt_loading
  }
});
// CONCATENATED MODULE: ./.nuxt/store.js


external_vue_default.a.use(external_vuex_default.a);
const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations'];
let store_store = {};

(function updateModules() {
  store_store = normalizeRoot(__webpack_require__(42), 'store/index.js'); // If store is an exported method = classic mode (deprecated)
  // Enforce store modules

  store_store.modules = store_store.modules || {};
  resolveStoreModules(__webpack_require__(18), 'actions.js');
  resolveStoreModules(__webpack_require__(3), 'API.js');
  resolveStoreModules(__webpack_require__(15), 'dataParse.js');
  resolveStoreModules(__webpack_require__(17), 'mutations.js'); // If the environment supports hot reloading...
})(); // createStore


const createStore = store_store instanceof Function ? store_store : () => {
  return new external_vuex_default.a.Store(Object.assign({
    strict: "production" !== 'production'
  }, store_store));
};

function normalizeRoot(moduleData, filePath) {
  moduleData = moduleData.default || moduleData;

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`);
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData);
  }

  return normalizeModule(moduleData, filePath);
}

function normalizeModule(moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`);
    const state = Object.assign({}, moduleData.state); // Avoid TypeError: setting a property that has only a getter when overwriting top level keys

    moduleData = Object.assign({}, moduleData, {
      state: () => state
    });
  }

  return moduleData;
}

function resolveStoreModules(moduleData, filename) {
  moduleData = moduleData.default || moduleData; // Remove store src + extension (./foo/index.js -> foo/index)

  const namespace = filename.replace(/\.(js|mjs)$/, '');
  const namespaces = namespace.split('/');
  let moduleName = namespaces[namespaces.length - 1];
  const filePath = `store/${filename}`;
  moduleData = moduleName === 'state' ? normalizeState(moduleData, filePath) : normalizeModule(moduleData, filePath); // If src is a known Vuex property

  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName;
    const storeModule = getStoreModule(store_store, namespaces, {
      isProperty: true
    }); // Replace state since it's a function

    mergeProperty(storeModule, moduleData, property);
    return;
  } // If file is foo/index.js, it should be saved as foo


  const isIndexModule = moduleName === 'index';

  if (isIndexModule) {
    namespaces.pop();
    moduleName = namespaces[namespaces.length - 1];
  }

  const storeModule = getStoreModule(store_store, namespaces);

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property);
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced;
  }
}

function normalizeState(moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`);
    const state = Object.assign({}, moduleData);
    return () => state;
  }

  return normalizeModule(moduleData, filePath);
}

function getStoreModule(storeModule, namespaces, {
  isProperty = false
} = {}) {
  // If ./mutations.js
  if (!namespaces.length || isProperty && namespaces.length === 1) {
    return storeModule;
  }

  const namespace = namespaces.shift();
  storeModule.modules[namespace] = storeModule.modules[namespace] || {};
  storeModule.modules[namespace].namespaced = true;
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {};
  return getStoreModule(storeModule.modules[namespace], namespaces, {
    isProperty
  });
}

function mergeProperty(storeModule, moduleData, property) {
  if (!moduleData) {
    return;
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state;
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData);
  }
}
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(5);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// EXTERNAL MODULE: external "defu"
var external_defu_ = __webpack_require__(27);
var external_defu_default = /*#__PURE__*/__webpack_require__.n(external_defu_);

// CONCATENATED MODULE: ./.nuxt/axios.js

 // Axios.prototype cannot be modified

const axiosExtra = {
  setBaseURL(baseURL) {
    this.defaults.baseURL = baseURL;
  },

  setHeader(name, value, scopes = 'common') {
    for (let scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope][name];
        return;
      }

      this.defaults.headers[scope][name] = value;
    }
  },

  setToken(token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token;
    this.setHeader('Authorization', value, scopes);
  },

  onRequest(fn) {
    this.interceptors.request.use(config => fn(config) || config);
  },

  onResponse(fn) {
    this.interceptors.response.use(response => fn(response) || response);
  },

  onRequestError(fn) {
    this.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error));
  },

  onResponseError(fn) {
    this.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error));
  },

  onError(fn) {
    this.onRequestError(fn);
    this.onResponseError(fn);
  },

  create(options) {
    return createAxiosInstance(external_defu_default()(options, this.defaults));
  }

}; // Request helpers ($get, $post, ...)

for (let method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  axiosExtra['$' + method] = function () {
    return this[method].apply(this, arguments).then(res => res && res.data);
  };
}

const extendAxiosInstance = axios => {
  for (let key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios);
  }
};

const createAxiosInstance = axiosOptions => {
  // Create new axios instance
  const axios = external_axios_default.a.create(axiosOptions);
  axios.CancelToken = external_axios_default.a.CancelToken;
  axios.isCancel = external_axios_default.a.isCancel; // Extend axios proto

  extendAxiosInstance(axios); // Setup interceptors

  setupProgress(axios);
  return axios;
};

const setupProgress = axios => {
  if (true) {
    return;
  } // A noop loading inteterface for when $nuxt is not yet ready


  const noopLoading = {
    finish: () => {},
    start: () => {},
    fail: () => {},
    set: () => {}
  };

  const $loading = () => {
    const $nuxt = typeof window !== 'undefined' && window['$nuxt'];
    return $nuxt && $nuxt.$loading && $nuxt.$loading.set ? $nuxt.$loading : noopLoading;
  };

  let currentRequests = 0;
  axios.onRequest(config => {
    if (config && config.progress === false) {
      return;
    }

    currentRequests++;
  });
  axios.onResponse(response => {
    if (response && response.config && response.config.progress === false) {
      return;
    }

    currentRequests--;

    if (currentRequests <= 0) {
      currentRequests = 0;
      $loading().finish();
    }
  });
  axios.onError(error => {
    if (error && error.config && error.config.progress === false) {
      return;
    }

    currentRequests--;

    if (external_axios_default.a.isCancel(error)) {
      if (currentRequests <= 0) {
        currentRequests = 0;
        $loading().finish();
      }

      return;
    }

    $loading().fail();
    $loading().finish();
  });

  const onProgress = e => {
    if (!currentRequests) {
      return;
    }

    const progress = e.loaded * 100 / (e.total * currentRequests);
    $loading().set(Math.min(100, progress));
  };

  axios.defaults.onUploadProgress = onProgress;
  axios.defaults.onDownloadProgress = onProgress;
};

/* harmony default export */ var _nuxt_axios = ((ctx, inject) => {
  // runtimeConfig
  const runtimeConfig = ctx.$config && ctx.$config.axios || {}; // baseURL

  const baseURL =  false ? undefined : runtimeConfig.baseURL || process.env._AXIOS_BASE_URL_ || 'https://api.slmblog.com/'; // Create fresh objects for all default header scopes
  // Axios creates only one which is shared across SSR requests!
  // https://github.com/mzabriskie/axios/blob/master/lib/defaults.js

  const headers = {
    "common": {
      "Accept": "application/json, text/plain, */*"
    },
    "delete": {},
    "get": {},
    "head": {},
    "post": {},
    "put": {},
    "patch": {},
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  };
  const axiosOptions = {
    baseURL,
    headers
  }; // Proxy SSR request headers headers

  if ( true && ctx.req && ctx.req.headers) {
    const reqHeaders = { ...ctx.req.headers
    };

    for (let h of ["accept", "host", "cf-ray", "cf-connecting-ip", "content-length", "content-md5", "content-type"]) {
      delete reqHeaders[h];
    }

    axiosOptions.headers.common = { ...reqHeaders,
      ...axiosOptions.headers.common
    };
  }

  if (true) {
    // Don't accept brotli encoding because Node can't parse it
    axiosOptions.headers.common['accept-encoding'] = 'gzip, deflate';
  }

  const axios = createAxiosInstance(axiosOptions); // Inject axios to the context as $axios

  ctx.$axios = axios;
  inject('axios', axios);
});
// EXTERNAL MODULE: external "qs"
var external_qs_ = __webpack_require__(22);
var external_qs_default = /*#__PURE__*/__webpack_require__.n(external_qs_);

// EXTERNAL MODULE: external "jsrsasign"
var external_jsrsasign_ = __webpack_require__(28);
var external_jsrsasign_default = /*#__PURE__*/__webpack_require__.n(external_jsrsasign_);

// EXTERNAL MODULE: ./store/API.js
var API = __webpack_require__(3);

// EXTERNAL MODULE: ./store/dataParse.js
var dataParse = __webpack_require__(15);

// CONCATENATED MODULE: ./plugins/axios.js





const RSA = new external_jsrsasign_default.a.RSAKey();
RSA.setPublic('D3379E6D621B0C3C96DB21F478468BAE8E117C6136774EBF0921F77F2D102ECCB2EFCE4AF2722E6F3942E3D23A36E4E3AC9971896D4DFBD6F7A68C390117CA824C115F6AAC3828B7C5C5D4FF971228BC53CE714208C6283CBAEB3515BF71CC7841BDF44C731C329845896AC3EF7B1E64D51EDCF2D6BB6E106D24A17F5EB4BFDD', `10001`); // 缓存

const _CACHE_ = [];
/* harmony default export */ var plugins_axios = (function ({
  $axios,
  redirect
}) {
  /**
   * axios Request
   */
  $axios.onRequest(config => {
    const data = config.data;

    if (data) {
      // RSA 加密处理
      const rsa = data.rsa;
      delete config.data.rsa;

      for (const key in rsa) {
        if (key in data) {
          throw new Error(`RSA.${key} there is Data in the!`);
        }

        config.data[key] = RSA.encrypt(rsa[key]);
      } // GET 数据处理


      if (config.method === 'get') {
        config.url += `?${external_qs_default.a.stringify(data)}`;
        config.data = '';
      }
    } // console.log('API:  ' + config.url)

  });
  /**
   * axios Response
   */

  $axios.onResponse(res => {
    let {
      data
    } = res; // 根据API 对数据进行处理

    let api = res.config.api;

    if (api && dataParse["default"][api]) {
      data = dataParse["default"][api](data);
    }

    return data;
  });
  /**
   * axios Error
   */

  $axios.onError((error, res) => {
    console.log('error::', error);
    const code = parseInt(error.response && error.response.status);

    if (code === 400) {
      redirect('/400');
    }
  });
  /**
   * axios API request
   * @param {string/object} api API库内的键
   * @return 链式操作请求方式，内部传入与axios相同，排除第一个URL
   */

  $axios.api = api => {
    let URL = API["default"][api]; // 动态API

    if (typeof api === 'object') {
      URL = API["default"][api.key];

      for (const key in api.data) {
        URL = URL.replace(`:${key}`, api.data[key]);
      }

      api = api.key;
    }

    return {
      get: res => $axios.get(URL, {
        api,
        ...res
      }),
      post: res => $axios.post(URL, {
        api,
        ...res
      }),
      cache: res => $axios.cache(URL, {
        api,
        ...res
      })
    };
  };
  /**
   * axios cache get request
   * @param {string} url url目标
   * @return 链式操作请求方式，内部传入与axios相同，排除第一个URL
   */


  $axios.cache = (url, options) => {
    let cache = _CACHE_[url];

    if (!cache) {
      cache = $axios.get(url, options).then(res => _CACHE_[url] = res);
    }

    return cache;
  };
});
// EXTERNAL MODULE: ./.nuxt/empty.js
var _nuxt_empty = __webpack_require__(23);

// CONCATENATED MODULE: ./plugins/route.js
/* harmony default export */ var plugins_route = (({
  app,
  store,
  observer
}) => {
  /**
   * 路由权限设置
   */
  app.router.map = {
    // 未登录权限
    register: {
      '/user/admin/login': 'go-1',
      '/user/admin/register': 'go-1'
    },
    // 登录权限
    login: [],
    // 管理员权限
    admin: []
  };
  const map = app.router.map;
  app.router.afterEach(to => {
    const path = to.path;

    for (const key in map) {
      const item = map[key]; // 存在权限内

      const child = item[path];

      if (child) {
        const val = app.router.permissions(key, false);

        if (!val) {
          if (child === 'go-1') {
            app.router.go(-1);
          } else {
            app.router.push({
              name: child
            });
          }
        }

        break;
      }
    }
  });
  app.router.user = store.state.user;
  /**
   * 权限判断
   * @param {string} to 路由名
   * @param {*} cb 回调(返回目录， 是否有权限跳转)
   * @return 是否有权限跳转
   */

  app.router.permissions = function (to, cb) {
    let user = app.router.user;
    let name = false;

    if (to === 'login' && !user.token) {
      // 未登录
      name = 'login';
    } else if (to === 'register' && user.token) {
      // 已登录
      name = 'home';
    } else if (to === 'admin' && (!user.token || user.groupid !== 9999)) {
      // 非管理
      name = 'home';
    }

    cb && cb(name, !name);
    return !name;
  };
});
// CONCATENATED MODULE: ./.nuxt/index.js












/* Plugins */

 // Source: ./axios.js (mode: 'all')

 // Source: ../plugins/axios (mode: 'all')

 // Source: ../store/API (mode: 'client')

 // Source: ../plugins/observer (mode: 'client')

 // Source: ../plugins/route (mode: 'all')
// Component: <ClientOnly>

external_vue_default.a.component(external_vue_client_only_default.a.name, external_vue_client_only_default.a); // TODO: Remove in Nuxt 3: <NoSsr>

external_vue_default.a.component(external_vue_no_ssr_default.a.name, { ...external_vue_no_ssr_default.a,

  render(h, ctx) {
    if (false) {}

    return external_vue_no_ssr_default.a.render(h, ctx);
  }

}); // Component: <NuxtChild>

external_vue_default.a.component(nuxt_child.name, nuxt_child);
external_vue_default.a.component('NChild', nuxt_child); // Component NuxtLink is imported in server.js or client.js
// Component: <Nuxt>

external_vue_default.a.component(components_nuxt.name, components_nuxt);
external_vue_default.a.use(external_vue_meta_default.a, {
  "keyName": "head",
  "attribute": "data-n-head",
  "ssrAttribute": "data-n-head-ssr",
  "tagIDKeyName": "hid"
});
const defaultTransition = {
  "name": "page",
  "mode": "out-in",
  "appear": false,
  "appearClass": "appear",
  "appearActiveClass": "appear-active",
  "appearToClass": "appear-to"
};
const originalRegisterModule = external_vuex_default.a.Store.prototype.registerModule;
const baseStoreOptions = {
  preserveState: false
};

function registerModule(path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions,
    ...options
  });
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext);
  const store = createStore(ssrContext); // Add this.$router into store actions/mutations

  store.$router = router; // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141

  store.registerModule = registerModule; // Create Root instance
  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.

  const app = {
    head: {
      "title": "slmblog",
      "meta": [{
        "charset": "utf-8"
      }, {
        "name": "viewport",
        "content": "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      }, {
        "hid": "description",
        "name": "description",
        "itemprop": "description",
        "content": "欢迎浏览史莱姆的博客٩( °༥° )و，让我们一起交流技术一起嗨皮分享！史莱姆的博客为个人站点，注重前端开发。"
      }, {
        "name": "keywords",
        "content": "史莱姆的博客,html5,css3,es6,微信小程序,网站开发,技术交流,源码分享,php,nodejs"
      }, {
        "name": "referrer",
        "content": "origin"
      }, {
        "name": "renderer",
        "content": "webkit"
      }, {
        "http-equiv": "X-UA-Compatible",
        "content": "IE=edge"
      }, {
        "itemprop": "author",
        "content": "史莱姆[qq: 478889187]"
      }, {
        "itemprop": "image",
        "hid": "qqlogo",
        "content": "https:\u002F\u002Fimg.slmblog.com\u002FQQLOGO.jpg"
      }, {
        "itemprop": "name",
        "hid": "qqname",
        "content": "史莱姆的博客"
      }, {
        "name": "format-detection",
        "content": "telephone=no"
      }, {
        "name": "robots",
        "content": "all"
      }, {
        "name": "Copyright",
        "content": "slmblog.com"
      }, {
        "name": "theme-color",
        "content": "#fff"
      }, {
        "name": "baidu-site-verification",
        "content": "y5VuyW34xO"
      }, {
        "name": "google-site-verification",
        "content": "LsmBI4ZEP2h0Ni17kTFRG7A_kKO7zONt51w_GYjM2Gs"
      }],
      "link": [{
        "rel": "icon",
        "type": "image\u002Fx-icon",
        "href": "https:\u002F\u002Fimg.slmblog.com\u002Ffavicon.ico"
      }],
      "style": [],
      "script": []
    },
    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],

      setTransitions(transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions];
        }

        transitions = transitions.map(transition => {
          if (!transition) {
            transition = defaultTransition;
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, {
              name: transition
            });
          } else {
            transition = Object.assign({}, defaultTransition, transition);
          }

          return transition;
        });
        this.$options.nuxt.transitions = transitions;
        return transitions;
      },

      err: null,
      dateErr: null,

      error(err) {
        err = err || null;
        app.context._errored = Boolean(err);
        err = err ? normalizeError(err) : null;
        let nuxt = app.nuxt; // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207

        if (this) {
          nuxt = this.nuxt || this.$options.nuxt;
        }

        nuxt.dateErr = Date.now();
        nuxt.err = err; // Used in src/server.js

        if (ssrContext) {
          ssrContext.nuxt.error = err;
        }

        return err;
      }

    },
    ...App
  }; // Make app available into store via this.app

  store.app = app;
  const next = ssrContext ? ssrContext.next : location => app.router.push(location); // Resolve route

  let route;

  if (ssrContext) {
    route = router.resolve(ssrContext.url).route;
  } else {
    const path = getLocation(router.options.base, router.options.mode);
    route = router.resolve(path).route;
  } // Set context to app.context


  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  });

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided');
    }

    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`);
    }

    key = '$' + key; // Add into app

    app[key] = value; // Add into context

    if (!app.context[key]) {
      app.context[key] = value;
    } // Add into store


    store[key] = app[key]; // Check if plugin not already installed

    const installKey = '__nuxt_' + key + '_installed__';

    if (external_vue_default.a[installKey]) {
      return;
    }

    external_vue_default.a[installKey] = true; // Call Vue.use() to install the plugin into vm

    external_vue_default.a.use(() => {
      if (!Object.prototype.hasOwnProperty.call(external_vue_default.a.prototype, key)) {
        Object.defineProperty(external_vue_default.a.prototype, key, {
          get() {
            return this.$root.$options[key];
          }

        });
      }
    });
  } // Inject runtime config as $config


  inject('config', config);

  if (false) {} // Add enablePreview(previewData = {}) in context for plugins


  if (false) {} // Plugin execution


  if (typeof _nuxt_axios === 'function') {
    await _nuxt_axios(app.context, inject);
  }

  if (typeof plugins_axios === 'function') {
    await plugins_axios(app.context, inject);
  }

  if (false) {}

  if (false) {}

  if (typeof plugins_route === 'function') {
    await plugins_route(app.context, inject);
  } // Lock enablePreview in context


  if (false) {} // If server-side, wait for async component to be resolved first


  if ( true && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, err => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err);
        if (err.type !== 2
        /* NavigationFailureType.redirected */
        ) return resolve(); // navigated to a different route in router guard

        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath;
          app.context.route = await getRouteData(to);
          app.context.params = to.params || {};
          app.context.query = to.query || {};
          unregister();
          resolve();
        });
      });
    });
  }

  return {
    store,
    app,
    router
  };
}


// CONCATENATED MODULE: ./.nuxt/components/nuxt-link.server.js

/* harmony default export */ var nuxt_link_server = ({
  name: 'NuxtLink',
  extends: external_vue_default.a.component('RouterLink'),
  props: {
    prefetch: {
      type: Boolean,
      default: true
    },
    noPrefetch: {
      type: Boolean,
      default: false
    }
  }
});
// CONCATENATED MODULE: ./.nuxt/server.js







 // should be included after ./index.js
// Update serverPrefetch strategy

external_vue_default.a.config.optionMergeStrategies.serverPrefetch = external_vue_default.a.config.optionMergeStrategies.created; // Fetch mixin

if (!external_vue_default.a.__nuxt__fetch__mixin__) {
  external_vue_default.a.mixin(fetch_server);
  external_vue_default.a.__nuxt__fetch__mixin__ = true;
} // Component: <NuxtLink>


external_vue_default.a.component(nuxt_link_server.name, nuxt_link_server);
external_vue_default.a.component('NLink', nuxt_link_server);

if (!global.fetch) {
  global.fetch = external_node_fetch_default.a;
}

const noopApp = () => new external_vue_default.a({
  render: h => h('div')
});

function server_urlJoin() {
  return Array.prototype.slice.call(arguments).join('/').replace(/\/+/g, '/');
}

const createNext = ssrContext => opts => {
  // If static target, render on client-side
  ssrContext.redirected = opts;

  if (ssrContext.target === 'static' || !ssrContext.res) {
    ssrContext.nuxt.serverRendered = false;
    return;
  }

  opts.query = Object(external_querystring_["stringify"])(opts.query);
  opts.path = opts.path + (opts.query ? '?' + opts.query : '');
  const routerBase = './';

  if (!opts.path.startsWith('http') && routerBase !== '/' && !opts.path.startsWith(routerBase)) {
    opts.path = server_urlJoin(routerBase, opts.path);
  } // Avoid loop redirect


  if (opts.path === ssrContext.url) {
    ssrContext.redirected = false;
    return;
  }

  ssrContext.res.writeHead(opts.status, {
    Location: opts.path
  });
  ssrContext.res.end();
}; // This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.


/* harmony default export */ var server = __webpack_exports__["default"] = (async ssrContext => {
  // Create ssrContext.next for simulate next() of beforeEach() when wanted to redirect
  ssrContext.redirected = false;
  ssrContext.next = createNext(ssrContext); // Used for beforeNuxtRender({ Components, nuxtState })

  ssrContext.beforeRenderFns = []; // Nuxt object (window.{{globals.context}}, defaults to window.__NUXT__)

  ssrContext.nuxt = {
    layout: 'default',
    data: [],
    fetch: [],
    error: null,
    state: null,
    serverRendered: true,
    routePath: ''
  }; // Remove query from url is static target

  if ( true && ssrContext.url) {
    ssrContext.url = ssrContext.url.split('?')[0];
  } // Public runtime config


  ssrContext.nuxt.config = ssrContext.runtimeConfig.public; // Create the app definition and the instance (created for each request)

  const {
    app,
    router,
    store
  } = await createApp(ssrContext, { ...ssrContext.runtimeConfig.public,
    ...ssrContext.runtimeConfig.private
  });

  const _app = new external_vue_default.a(app); // Add ssr route path to nuxt context so we can account for page navigation between ssr and csr


  ssrContext.nuxt.routePath = app.context.route.path; // Add meta infos (used in renderer.js)

  ssrContext.meta = _app.$meta(); // Keep asyncData for each matched component in ssrContext (used in app/utils.js via this.$ssrContext)

  ssrContext.asyncData = {};

  const beforeRender = async () => {
    // Call beforeNuxtRender() methods
    await Promise.all(ssrContext.beforeRenderFns.map(fn => promisify(fn, {
      Components,
      nuxtState: ssrContext.nuxt
    })));

    ssrContext.rendered = () => {
      // Add the state from the vuex store
      ssrContext.nuxt.state = store.state;
    };
  };

  const renderErrorPage = async () => {
    // Don't server-render the page in static target
    if (ssrContext.target === 'static') {
      ssrContext.nuxt.serverRendered = false;
    } // Load layout for error page


    const layout = (nuxt_error.options || nuxt_error).layout;
    const errLayout = typeof layout === 'function' ? layout.call(nuxt_error, app.context) : layout;
    ssrContext.nuxt.layout = errLayout || 'default';
    await _app.loadLayout(errLayout);

    _app.setLayout(errLayout);

    await beforeRender();
    return _app;
  };

  const render404Page = () => {
    app.context.error({
      statusCode: 404,
      path: ssrContext.url,
      message: 'This page could not be found'
    });
    return renderErrorPage();
  }; // Components are already resolved by setContext -> getRouteData (app/utils.js)


  const Components = getMatchedComponents(router.match(ssrContext.url));
  /*
  ** Dispatch store nuxtServerInit
  */

  if (store._actions && store._actions.nuxtServerInit) {
    try {
      await store.dispatch('nuxtServerInit', app.context);
    } catch (err) {
      console.debug('Error occurred when calling nuxtServerInit: ', err.message);
      throw err;
    }
  } // ...If there is a redirect or an error, stop the process


  if (ssrContext.redirected) {
    return noopApp();
  }

  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  }
  /*
  ** Call global middleware (nuxt.config.js)
  */


  let midd = [];
  midd = midd.map(name => {
    if (typeof name === 'function') {
      return name;
    }

    if (typeof _nuxt_middleware[name] !== 'function') {
      app.context.error({
        statusCode: 500,
        message: 'Unknown middleware ' + name
      });
    }

    return _nuxt_middleware[name];
  });
  await middlewareSeries(midd, app.context); // ...If there is a redirect or an error, stop the process

  if (ssrContext.redirected) {
    return noopApp();
  }

  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  }
  /*
  ** Set layout
  */


  let layout = Components.length ? Components[0].options.layout : nuxt_error.layout;

  if (typeof layout === 'function') {
    layout = layout(app.context);
  }

  await _app.loadLayout(layout);

  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  }

  layout = _app.setLayout(layout);
  ssrContext.nuxt.layout = _app.layoutName;
  /*
  ** Call middleware (layout + pages)
  */

  midd = [];
  layout = sanitizeComponent(layout);

  if (layout.options.middleware) {
    midd = midd.concat(layout.options.middleware);
  }

  Components.forEach(Component => {
    if (Component.options.middleware) {
      midd = midd.concat(Component.options.middleware);
    }
  });
  midd = midd.map(name => {
    if (typeof name === 'function') {
      return name;
    }

    if (typeof _nuxt_middleware[name] !== 'function') {
      app.context.error({
        statusCode: 500,
        message: 'Unknown middleware ' + name
      });
    }

    return _nuxt_middleware[name];
  });
  await middlewareSeries(midd, app.context); // ...If there is a redirect or an error, stop the process

  if (ssrContext.redirected) {
    return noopApp();
  }

  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  }
  /*
  ** Call .validate()
  */


  let isValid = true;

  try {
    for (const Component of Components) {
      if (typeof Component.options.validate !== 'function') {
        continue;
      }

      isValid = await Component.options.validate(app.context);

      if (!isValid) {
        break;
      }
    }
  } catch (validationError) {
    // ...If .validate() threw an error
    app.context.error({
      statusCode: validationError.statusCode || '500',
      message: validationError.message
    });
    return renderErrorPage();
  } // ...If .validate() returned false


  if (!isValid) {
    // Render a 404 error page
    return render404Page();
  } // If no Components found, returns 404


  if (!Components.length) {
    return render404Page();
  } // Call asyncData & fetch hooks on components matched by the route.


  const asyncDatas = await Promise.all(Components.map(Component => {
    const promises = []; // Call asyncData(context)

    if (Component.options.asyncData && typeof Component.options.asyncData === 'function') {
      const promise = promisify(Component.options.asyncData, app.context);
      promise.then(asyncDataResult => {
        ssrContext.asyncData[Component.cid] = asyncDataResult;
        applyAsyncData(Component);
        return asyncDataResult;
      });
      promises.push(promise);
    } else {
      promises.push(null);
    } // Call fetch(context)


    if (Component.options.fetch && Component.options.fetch.length) {
      promises.push(Component.options.fetch(app.context));
    } else {
      promises.push(null);
    }

    return Promise.all(promises);
  })); // datas are the first row of each

  ssrContext.nuxt.data = asyncDatas.map(r => r[0] || {}); // ...If there is a redirect or an error, stop the process

  if (ssrContext.redirected) {
    return noopApp();
  }

  if (ssrContext.nuxt.error) {
    return renderErrorPage();
  } // Call beforeNuxtRender methods & add store state


  await beforeRender();
  return _app;
});

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("wangeditor/release/wangEditor.js");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("echarts");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map