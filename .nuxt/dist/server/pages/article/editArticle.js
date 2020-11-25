exports.ids = [4];
exports.modules = {

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./pages/article/editArticle.vue?vue&type=template&id=3f070aec&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"conter single clearfix"},[_vm._ssrNode("<div class=\"content-box addArticle\">","</div>",[_vm._ssrNode("<ul class=\"form\"><li><label>标题</label> <input type=\"text\""+(_vm._ssrAttr("value",(_vm.title)))+"> <span class=\"bust\">*</span></li> <li><label>分类</label> <input type=\"text\" placeholder=\"#隔开\""+(_vm._ssrAttr("value",(_vm.type)))+"> <span class=\"bust\">*</span></li> <li><label>简介</label> <input type=\"text\" placeholder=\"简短的介绍文章内容\""+(_vm._ssrAttr("value",(_vm.description)))+"> <span class=\"bust\">*</span></li> <li><input type=\"file\" id=\"upload_file\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" style=\"display: none\"> "+((!_vm.webInput)?("<button onclick=\"upload_file.click()\" class=\"button-lv1 upload_file\">"+_vm._ssrEscape(_vm._s(_vm.filePath ? '重新选择' : '上传本地封面'))+"</button>"):"<!---->")+" "+((!_vm.filePath)?("<button class=\"button-lv1 upload_file\">"+_vm._ssrEscape(_vm._s(_vm.webInput ? '重新选择方式' : '网络调用封面'))+"</button>"):"<!---->")+" "+((_vm.webInput)?("<input type=\"text\" placeholder=\"完整图片的路径 如 http://xxxxx/xxxxx/xx.jpg\""+(_vm._ssrAttr("value",(_vm.webPath)))+">"):"<!---->")+" <span"+(_vm._ssrClass(null,['file-path', { 'file-path-max': _vm.filePath }]))+">"+_vm._ssrEscape(_vm._s(_vm.filePath))+"</span> "+((_vm.filePath && !_vm.uploadPath)?("<button class=\"button-lv1 upload_file\">确认上传</button>"):"<!---->")+" "+((_vm.filePath || _vm.webPath)?("<div class=\"img-look-box\"><span class=\"look\">预览区域</span> "+((!_vm.uploadPath && !_vm.webPath)?("<span class=\"look-info\">等待 确认上传 ...</span>"):("<img"+(_vm._ssrAttr("src",_vm.webPath || ('//slmblog.com/img/upload/' + _vm.uploadPath)))+">"))+"</div>"):"<!---->")+"</li></ul> <label class=\"content-title\">文章内容</label> "),_c('Editor',{ref:"editor"}),_vm._ssrNode(" <button class=\"button-lv0 button-lv1 send\">"+_vm._ssrEscape(_vm._s(!_vm.editor ? '发表' : '保存'))+"</button>")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/article/editArticle.vue?vue&type=template&id=3f070aec&

// EXTERNAL MODULE: ./plugins/Editor.vue + 4 modules
var Editor = __webpack_require__(75);

// EXTERNAL MODULE: ./store/API.js
var API = __webpack_require__(3);

// EXTERNAL MODULE: external "qs"
var external_qs_ = __webpack_require__(22);

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./pages/article/editArticle.vue?vue&type=script&lang=js&
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



/* harmony default export */ var editArticlevue_type_script_lang_js_ = ({
  data() {
    return {
      filePath: null,
      uploadPath: null,
      webInput: false,
      webPath: null,
      title: null,
      type: null,
      editor: false,
      description: null
    };
  },

  mounted() {
    // 编辑文章模式
    const that = this;
    that.editor = that.$route.query.editor;

    if (!isNaN(that.editor)) {
      // 请求文章
      that.$axios.get('article/editorArticle/' + that.editor, {
        data: {
          token: that.$store.state.user.token
        }
      }).then(res => {
        that.$refs.editor.Stores.set(res.content);
        that.type = res.type;
        that.title = res.title;
        that.webPath = res.img;

        if (that.webPath && that.webPath.indexOf('//') === -1) {
          that.webPath = `${API["default"].IP.img}/img/upload/${that.webPath}`;
        }

        that.description = res.description;
      }).catch(err => {
        that.observer.emit('toast', err);
        that.$router.go(-1);
        throw Error(err);
      });
    }
  },

  methods: {
    /**
     * 实时路径
     */
    imgChange(e) {
      this.filePath = e.target.value;
    },

    /**
     * 上传封面
     */
    upload(e) {
      let file = this.$refs.uploadFile.files[0];

      if (file) {
        let image = new FormData();
        image.append('file', file);
        this.$axios.post('https://io.slmblog.com/i.php?token=' + this.$store.state.user.token, image, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if (res.data) {
            if (res.data[0]) {
              this.uploadPath = res.data[0];
              this.webPath = null;
            }
          } else {
            console.log(res);
          }
        });
      }
    },

    /**
     * 发表文章按钮
     */
    send() {
      const that = this;
      that.editor = that.$route.query.editor;
      const content = that.$refs.editor.editorContent;
      let err = !that.title || that.title.length < 4 ? '标题不能为空或过短!' : !that.type || that.type.split('#').length < 1 ? '至少一个分类!' : content.length < 10 ? '这么点字...水军吧!!!' : false;

      if (err) {
        that.observer.emit('toast', {
          text: err,
          icon: 'wrong',
          time: 4000
        });
      } else {
        let _user = that.$store.state.user;
        let type = isNaN(that.editor) ? 'ARTICLE_ADD' : 'ARTICLE_UNEDITOR';
        that.$axios.api(type).post({
          token: _user.token,
          title: that.title,
          type: that.type,
          content,
          uid: _user.id,
          img: that.webPath || that.uploadPath,
          description: that.description,
          editor: that.editor || false
        }).then(res => {
          if (res.ID) {
            that.$router.push({
              name: 'article-id',
              params: {
                id: res.ID
              }
            });
            that.$refs.editor.Stores.clear();
          }
        });
      }
    }

  },
  components: {
    Editor: Editor["a" /* default */]
  }
});
// CONCATENATED MODULE: ./pages/article/editArticle.vue?vue&type=script&lang=js&
 /* harmony default export */ var article_editArticlevue_type_script_lang_js_ = (editArticlevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/article/editArticle.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(83)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  article_editArticlevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "6b3ebc4c"
  
)

/* harmony default export */ var editArticle = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 51:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./plugins/Editor.vue?vue&type=template&id=79083468&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"editor",staticStyle:{"text-align":"left"}},[])}
var staticRenderFns = []


// CONCATENATED MODULE: ./plugins/Editor.vue?vue&type=template&id=79083468&

// EXTERNAL MODULE: ./node_modules/_wangeditor@3.1.1@wangeditor/release/wangEditor.css
var wangEditor = __webpack_require__(50);

// EXTERNAL MODULE: external "wangeditor/release/wangEditor.js"
var wangEditor_js_ = __webpack_require__(44);
var wangEditor_js_default = /*#__PURE__*/__webpack_require__.n(wangEditor_js_);

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./plugins/Editor.vue?vue&type=script&lang=js&
//
//
//
//


/* harmony default export */ var Editorvue_type_script_lang_js_ = ({
  name: 'editor',
  props: ['model'],

  data() {
    return {
      editorContent: ''
    };
  },

  mounted() {
    let editor = new wangEditor_js_default.a(this.$refs.editor);
    let inster = null; // 留言模式下的編輯器

    if (this.model === 'send') {
      editor.customConfig.menus = ['italic', 'underline', 'strikeThrough', 'foreColor', 'backColor', 'link', 'quote', 'image', 'emoticon', 'image', 'table', 'undo', 'redo'];
    } // 自动保存编辑器内容


    let Store = function (self) {
      var _temp;

      return _temp = class {
        // IO存储的数据对象
        // 当前路由
        constructor() {
          this.value = {};
          this.path = self.$router.history.current.path;
          let stroe = localStorage.getItem('editor');

          let _this = this;

          if (stroe) {
            _this.value = JSON.parse(localStorage.getItem('editor'));
          } // 如果上次未编辑完则保存


          if (_this.value[_this.path]) {
            editor.txt.html(_this.value[_this.path]);
          }
        } // 清空编辑器内容


        clear() {
          this.set();
          editor.txt.html('');
        }

        set(val) {
          this.value[this.path] = val;
          if (!val) delete this.value[this.path];
          localStorage.setItem('editor', JSON.stringify(this.value));
        }

      }, _temp;
    }(this); // 输入时赋值到全局


    editor.customConfig.onchange = html => {
      this.editorContent = html;
      clearTimeout(inster);
      inster = setTimeout(() => {
        this.Stores.set(this.editorContent);
      }, 1500);
    };

    let imgRoot = '/img/emoji/';
    editor.customConfig.uploadImgServer = this.$store.state.user ? 'http://res.mczyzy.cn/file/i.php?token=' + this.$store.state.user.token : false;
    editor.customConfig.imgIp = '/img/upload/'; // 表情配置

    let lyList = [];
    let i = 1;

    for (i; i < 21; i++) {
      lyList.push({
        alt: '加載中...',
        src: `${imgRoot}${i}.jpg`,
        style: 'width: 59px'
      });
    }

    editor.customConfig.emotions = [{
      title: '凜音',
      type: 'image',
      content: lyList
    }];
    editor.create();
    this.Stores = new Store();
  }

});
// CONCATENATED MODULE: ./plugins/Editor.vue?vue&type=script&lang=js&
 /* harmony default export */ var plugins_Editorvue_type_script_lang_js_ = (Editorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./plugins/Editor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  plugins_Editorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "6c9a319a"
  
)

/* harmony default export */ var Editor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_editArticle_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_editArticle_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_editArticle_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_editArticle_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_editArticle_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_editArticle_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

};;
//# sourceMappingURL=editArticle.js.map