exports.ids = [7];
exports.modules = {

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./pages/other/friendship.vue?vue&type=template&id=a35dafce&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"conter single clearfix"},[_vm._ssrNode("<div class=\"content-box friendship\"><img"+(_vm._ssrAttr("src",__webpack_require__(52)))+" alt=\"slm-logo\" class=\"logo\"> <h2>史莱姆的个人博客</h2> <h3 class=\"friendship-desc\">本博客涉及范围html5,css3,es6,微信小程序,网站开发,技术交流,源码分享,php,nodejs</h3> <a href=\"#no1\" class=\"button-lv1\">申请友链</a></div> <div class=\"content-box friendship\"><h2 class=\"friendship-tag\">友情 链接</h2> <ul class=\"friendship friendship-list\">"+(_vm._ssrList((_vm.friendship),function(item,index){return ("<li><a"+(_vm._ssrAttr("href",item.web))+" target=\"_black\" class=\"max-a\"></a> <img"+(_vm._ssrAttr("src",item.icon))+" alt=\"轩陌博客 LOGO\"> <span class=\"friendship-name\">"+_vm._ssrEscape(_vm._s(item.name))+"</span> <span class=\"friendship-desc\">"+_vm._ssrEscape(_vm._s(item.desc))+"</span></li>")}))+"</ul></div> <div id=\"no1\" class=\"content-box friendship\"><h2 class=\"friendship-tag\">友情 链接 申请</h2> <div class=\"child-box\"><h4 class=\"child-tag\">友链申请须知:</h4> <ol><li><b>优先:</b>与本站相近内容、原创博客、百度收录、谷歌收录、IT网站、个人博客、技术博客、学员博客、H5</li> <li><b>拒收:</b>站内包含 违法内容、过多广告及广告元素</li> <li><b>首页:</b>内容优质、原创文章、极速访问、交互流畅、原创UI</li> <li><b>删除:</b>长期不能访问、删除本站友链</li></ol></div> <div class=\"child-box\"><h4 class=\"child-tag\">贵站友链内容:</h4> <ul><li><b>名称:</b>史莱姆的博客</li> <li><b>域名:</b><a href=\"//mczyzy.cn\" title=\"史莱姆的博客\">http://mczyzy.cn</a></li> <li><b>简介:</b>一个注重技术研究与分享的博客。(可包含)</li> <li><b>图标:</b><a href=\"//slmblog.com/LOGO.png\" title=\"本站LOGO\">slmblog.com/LOGO.png</a></li></ul></div> <div class=\"child-box\"><h4 class=\"child-tag\">友链 申请/修改:</h4> <ul><li><b>必须:</b>先友后链(先在贵站挂上本站友链)</li> <li><b>需知:</b>如果本站在贵站首页，则贵站就会在本站的首页反之则在内页或按(友链申请须知 [首页筛选] )</li> <li><b>邮件:</b>以友链标准格式发送至 slm@mczyzy.cn !</li> <li><b>感谢:</b>感谢阅读完本条约!</li></ul></div> <div class=\"child-box\"><h4 class=\"child-tag\">友链格式:</h4> <ul><li><b>名称:</b>xxxxxxxxxx</li> <li><b>域名:</b>网站首页网址</li> <li><b>类型:</b>个人博客、IT站点 ...</li> <li><b>简介:</b>尽量简短的简介</li> <li><b>图标:</b>可以是favicon等外部图片 ...</li></ul> <h5>ps: 博主会在尽快在贵站核实友链后，在本站按条约添加贵站的友链!谢谢合作!</h5></div></div>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/other/friendship.vue?vue&type=template&id=a35dafce&

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./pages/other/friendship.vue?vue&type=script&lang=js&
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
/* harmony default export */ var friendshipvue_type_script_lang_js_ = ({
  head: {
    title: '史莱姆的博客-友情链接'
  },

  async asyncData({
    $axios
  }) {
    const friendship = await $axios.api('FIRENDSHIP').get();
    return {
      friendship
    };
  }

});
// CONCATENATED MODULE: ./pages/other/friendship.vue?vue&type=script&lang=js&
 /* harmony default export */ var other_friendshipvue_type_script_lang_js_ = (friendshipvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/other/friendship.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(84)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  other_friendshipvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "3c53b43c"
  
)

/* harmony default export */ var friendship = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/LOGO.39072b6.png";

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_friendship_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_friendship_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_friendship_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_friendship_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_friendship_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_friendship_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

};;
//# sourceMappingURL=friendship.js.map