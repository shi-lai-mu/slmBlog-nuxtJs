exports.ids = [15];
exports.modules = {

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(URL) {/* harmony import */ var _plugins_tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
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

/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['Music'],

  data() {
    return {
      searchs: null,
      songList: [],
      state: !1,
      searchList: !1,
      // 下载品质列表
      downList: [],
      // 搜索历史
      searchHistory: [],
      // 页数
      page: {
        num: 1,
        max: 1
      }
    };
  },

  created() {
    // 读取搜索历史
    let history = localStorage.getItem('searchHistory');

    if (history) {
      this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    }
  },

  methods: {
    /* 搜索音乐 */
    searchMusic(page) {
      // 如果为翻页
      if (typeof page === 'number') {
        this.page.num += page;
        this.songList = [];
      } // 开始搜索


      this.state = '搜索中...';
      let search = this.searchs;

      if (search) {
        // 加入历史搜索
        this.history(search);
        this.$axios.get('api/Music', {
          data: {
            fun: 'search',
            key: search,
            page: this.page.num
          }
        }).then(res => {
          this.state = false;
          let song = res.data.song.list;
          this.$el.scrollTo(0, 0);

          for (let i = 0, l = song.length; i < l; i++) {
            let val = song[i]; // 避免重复计算

            if (val.songnames) break;

            if (val.songname === val.albumname) {
              val.albumname = '';
            } // 歌手


            let singer = '';

            for (let j = 0, l = val.singer.length; j < l; j++) {
              singer += val.singer[j].name + '/';
            }

            val.singers = singer.substring(0, singer.length - 2); // 品质

            let quality = {
              sizeflac: 'SQ',
              size320: 'HQ'
            };

            for (let v in quality) {
              if (val[v] > 0) {
                val.songnames = val.songname + `<sup class="${quality[v]}">${quality[v]}</sup>`; // break
              }
            } // 播放时间


            val.interval = Object(_plugins_tool__WEBPACK_IMPORTED_MODULE_0__[/* utfc */ "c"])(val.interval);
            if (val.interval === '00:00') val.interval = '-- : --';
            !val.songnames && (val.songnames = val.songname);
          } // console.log(song);


          this.songList = song; // 页数计算

          let page = res.data.song;
          this.page = {
            num: page.curpage,
            max: Math.ceil(page.totalnum / 20)
          };
        }).catch(() => {
          this.state = '搜索超时!请稍后再试...';
          setTimeout(() => {
            this.state = !1;
          }, 1000);
        });
      }
    },

    /* 显示列表 */
    toggleList(e) {
      this.searchList = !this.searchList;
      let i = e.target.dataset.i;

      if (this.searchList && i) {
        e.stopPropagation();
        let song = this.songList[i]; // 判断音乐品质

        let quality = {
          'songid': ['流畅', '192AAC', i],
          'size128': ['标准', '128MP3', i],
          'size320': ['高品质', '320MP3', i],
          'sizeape': ['无损APE', 'APE', i],
          'sizeflac': ['无损FLAC', 'FLAC', i]
        };
        let arr = [];

        for (let v in quality) {
          if (song[v] > 0) {
            arr.push(quality[v]);
          }
        }

        this.downList = arr;
      }
    },

    /* 下载音乐 */
    download(e) {
      let $el = e.target;
      let dataset = $el.dataset;
      let oldTXT = $el.innerHTML; // 判断是否正在下载

      if ($el.innerHTML.indexOf('[') > -1) return;
      $el.innerHTML = `${oldTXT} [破解权限中...]`;
      let song = this.songList[dataset.i];
      let a = document.createElement('a'); // 兼容检测

      if (!('download' in a)) {
        alert('抱歉您的浏览器不支持最新的属性,请尝试选择谷歌浏览器最新版!');
        return;
      }

      this.$axios.get(`api/Music?fun=download&code=${song.songmid}&type=${dataset.qu}`).then(res => {
        console.info('祝贺你喜提彩蛋~!');
        console.table([{
          '歌名': song.songname,
          '歌手': song.singers,
          '时长': song.interval
        }]);
        console.log(`%c${song.songname} 极速版下载链接：${res.url}`, "color:red");
        let url = res.url;
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';

        xhr.onloadstart = function (e) {
          $el.innerHTML = `${oldTXT} [即将开始下载]`;
        };

        xhr.onprogress = function (e) {
          let percent = (e.loaded / e.total * 100).toFixed(2);
          $el.innerHTML = `${oldTXT} [${percent}%][控制台有极速版]`;
        };

        xhr.onload = function (e) {
          var blob = new Blob([this.response]);
          a.href = URL.createObjectURL(blob);
          let singers = song.singers.replace('/', '-');
          a.download = `${song.songname}(${singers}).${res.suffix}`;
          document.body.appendChild(a);
          a.click();
          $el.innerHTML = `${oldTXT} <span class="sup HQ">完成</span>`;
          setTimeout(() => {
            $el.innerHTML = oldTXT;
          }, 1500);
        };

        xhr.onerror = function (e) {
          $el.innerHTML = `${oldTXT} [下载出错]`;
        };

        url = url.replace('http://streamoc.music.tc.qq.com/', 'https://slmblog.com/download/music/');
        xhr.open('get', url, true);
        xhr.send();
      }).catch(() => {
        $el.innerHTML = `${oldTXT} [破解失败!]`;
      });
    },

    /* 搜索音乐 */
    searchChange(e) {
      // 清空列表
      if (!e.data && this.songList) this.songList = [];
    },

    /* 添加/刪除 一条记录/全部记录 */
    history(v) {
      let history = this.searchHistory;

      if (typeof v === 'string') {
        if (history.indexOf(v) === -1) history.push(v);
      } else {
        let i = v.target.dataset.i;

        if (i) {
          v.stopPropagation();
          history.splice(i, 1);
        } else {
          this.searchHistory = [];
        }
      }

      localStorage.setItem('searchHistory', JSON.stringify(history));
    },

    /* 点击历史记录 */
    loadKey(e) {
      this.searchs = e.target.innerText;
      this.searchMusic();
    },

    /* 播放音乐 */
    playSong(e) {
      let i = e.target.dataset.i || e.target.parentElement.dataset.i;

      if (i) {
        let song = this.songList[i];
        song.autoPlay = !0;
        this.observer.emit('music', song);
      }
    }

  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(29)["URL"]))

/***/ }),

/***/ 47:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_Search_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./components/music/Search.vue?vue&type=template&id=4c8fb086&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"music-search"},[_vm._ssrNode("<input type=\"text\" placeholder=\"搜索 歌名/歌手\""+(_vm._ssrAttr("value",(_vm.searchs)))+" class=\"search\"> <ul class=\"song-list\">"+(_vm._ssrList((_vm.songList),function(song,i){return ("<li"+(_vm._ssrAttr("data-i",i))+" class=\"clearfix\"><span class=\"song-name\">"+(_vm._s(song.songnames))+"</span> <span class=\"song-singer\">"+_vm._ssrEscape(_vm._s(song.singers))+"</span> <span class=\"song-lyric\">"+_vm._ssrEscape(_vm._s(song.albumname))+"</span> <i"+(_vm._ssrAttr("data-i",i))+" class=\"iconfont icon-caidan\"></i> <span class=\"song-inter\">"+_vm._ssrEscape(_vm._s(song.interval))+"</span></li>")}))+"</ul> "+((_vm.songList.length || _vm.page.num > 1)?("<div class=\"song-page\"><span"+(_vm._ssrClass(null,['button-lv0', { 'not-but': _vm.page.num < 2 }]))+">上一页</span> <span>"+_vm._ssrEscape(_vm._s(_vm.page.num)+"/"+_vm._s(_vm.page.max))+"</span> <span"+(_vm._ssrClass(null,['button-lv0', { 'not-but': _vm.page.num >= _vm.page.max }]))+">下一页</span></div>"):"<!---->")+" "+((!_vm.searchs && _vm.searchHistory.length)?("<div class=\"searchHistory song-list\"><span class=\"history-tag\">搜索历史</span> <ul class=\"history-list\">"+(_vm._ssrList((_vm.searchHistory),function(item,index){return ("<li>"+_vm._ssrEscape("\n        "+_vm._s(item))+"<i"+(_vm._ssrAttr("data-i",index))+" class=\"iconfont icon-wrong\"></i></li>")}))+"</ul> "+((!_vm.searchs && _vm.searchHistory.length)?("<span class=\"button-lv0 clearHistory\">清空历史</span>"):"<!---->")+"</div>"):"<!---->")+" "+((_vm.state)?("<div class=\"search-state\"><span class=\"state\">搜索中...</span></div>"):"<!---->")+" <div"+(_vm._ssrClass(null,['search-menu-hide', {'search-menu': _vm.searchList}]))+"><ul><li>查看信息</li> <li>收藏歌曲</li> <li>加入下载</li> <li>\n        下载音乐:\n        "+(_vm._ssrList((_vm.downList),function(v,k){return ("<span"+(_vm._ssrAttr("data-qu",v[1]))+(_vm._ssrAttr("data-i",v[2]))+" class=\"download-list\">"+(_vm._s(v[0]))+"</span>")}))+"</li> <li class=\"close\">关闭</li></ul></div>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/music/Search.vue?vue&type=template&id=4c8fb086&

// EXTERNAL MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./components/music/Search.vue?vue&type=script&lang=js&
var Searchvue_type_script_lang_js_ = __webpack_require__(46);

// CONCATENATED MODULE: ./components/music/Search.vue?vue&type=script&lang=js&
 /* harmony default export */ var music_Searchvue_type_script_lang_js_ = (Searchvue_type_script_lang_js_["a" /* default */]); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./components/music/Search.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(70)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  music_Searchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "755a58fd"
  
)

/* harmony default export */ var Search = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=15.js.map