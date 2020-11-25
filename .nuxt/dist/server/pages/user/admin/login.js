exports.ids = [12];
exports.modules = {

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./pages/user/admin/login.vue?vue&type=template&id=b737ffae&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"conter"},[_vm._ssrNode("<div class=\"account clearfix\">","</div>",[_vm._ssrNode("<img"+(_vm._ssrAttr("src",__webpack_require__(57)))+" alt=\"图1\" class=\"border-line\"> <form action><label>账号</label> <input type=\"text\" name=\"log_user\""+(_vm._ssrAttr("value",(_vm.login.user)))+" class=\"input-1v\"> <label>密码</label> <input type=\"password\" name=\"log_pass\" autocomplete=\"tel\""+(_vm._ssrAttr("value",(_vm.login.rsa.pass)))+" class=\"input-1v\"> <span class=\"button-lv0\">登陆</span></form> "),_vm._ssrNode("<span class=\"account-right\">","</span>",[_vm._ssrNode("<a"+(_vm._ssrAttr("href",_vm.qqLoginUrl))+" target=\"_black\" rel=\"noopener noreferrer\"><i class=\"iconfont icon-ziyuan\"></i> <span>QQ登录</span></a> "),_c('nuxt-link',{attrs:{"to":"register"}},[_c('i',{staticClass:"iconfont icon-zhuce"}),_vm._v(" "),_c('span',[_vm._v("注册账号")])])],2)],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/user/admin/login.vue?vue&type=template&id=b737ffae&

// CONCATENATED MODULE: ./node_modules/_babel-loader@8.1.0@babel-loader/lib??ref--2-0!./node_modules/_vue-loader@15.9.3@vue-loader/lib??vue-loader-options!./pages/user/admin/login.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var loginvue_type_script_lang_js_ = ({
  data() {
    return {
      login: {
        user: null,
        rsa: {
          pass: null
        }
      },
      uid: Date.now(),
      qqLoginUrl: "not url",
      page: "login"
    };
  },

  created() {
    this.page = this.$route.name === "register" ? "register" : "login";
    this.qqLoginUrl = "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101540984&display=mobile&redirect_uri=http%3A%2F%2Fmczyzy.cn%3A8080%2Fqqlogin%2Fcallback&state=" + this.uid;
    this.$store.state.mobile && (this.qqLoginUrl = "https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=101540984&daid=383&pt_skey_valid=1&style=35&s_url=http%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&client_id=101540984&response_type=code&redirect_uri=http%3A%2F%2Fmczyzy.cn%3A8080%2Fqqlogin%2Fcallback&state=" + this.uid + "&scope=get_user_info%2Cadd_share%2Cadd_t%2Cadd_pic_t%2Cget_repost_list&display=mobile"); // 移动端 qq登录兼容

    if (this.$router.history.current.query.state) {
      this.qqLoginState();
    }
  },

  methods: {
    /**
     * 登录按钮点击事件
     */
    loginEvent() {
      let that = this;
      let toast = {
        text: `登录成功,欢迎回来 [${that.login.user}]!`,
        icon: "success",
        hideTime: 4000
      };

      if (that.login.user && that.login.rsa.pass) {
        that.$axios.api("USER_LOGIN").get({
          data: { ...that.login
          }
        }).then(res => {
          if (!res.error) {
            window.localStorage.setItem("userInfo", JSON.stringify(res));
            that.$store.dispatch("USER", res);
            that.observer.emit("toast", {
              icon: "zhiwen",
              text: `登录成功,欢迎回来 [${that.login.user}]!`,
              time: false,
              select: [{
                value: "管理账号",
                action: () => {}
              }, {
                value: "个人中心",
                action: () => {
                  that.$router.push({
                    path: "/user/" + res.id
                  });
                  return true;
                }
              }]
            });
            that.observer.emit('HeaderRouter');
            const page = that.$route.query.page;

            if (page) {
              that.$router.push({
                path: page
              });
            } else {
              that.$router.push({
                path: "/"
              });
            }
          } else that.observer.emit("toast", res);
        });
      } else that.observer.emit("toast", {
        icon: "wrong",
        text: "请将信息先写完整!"
      });
    },

    /**
     * 点击QQ登录后，进行窗口检测
     */
    qqLogin() {
      window.addEventListener("blur", blur);
      let self = this;

      function blur() {
        // 当用户关闭授权窗口后 或者 取消授权 回到本窗口时
        window.addEventListener("focus", focus);

        function focus() {
          window.removeEventListener("blur", blur);
          window.removeEventListener("focus", focus); // 检测授权uid是否存在服务器中

          self.qqLoginState();
        }
      }
    },

    /**
     * 检测QQ授权
     */
    qqLoginState(state) {
      let self = this;
      let uid = this.$router.history.current.query.state || self.uid;
      let toast = {
        text: `QQ登录授权失败!`,
        icon: "error",
        hideTime: 4000
      };
      self.$axios.get("qqLogin/exists", {
        uid
      }).then(res => {
        // 授权uid存在
        if (res.data.value) {
          // window.localStorage.setItem('userInfo', JSON.stringify(res.data))
          self.$store.state.user = JSON.parse(JSON.parse(res.data.value));
          toast.icon = "success";
          toast.text = `授权成功, 欢迎回来 [${self.$store.state.user.nickname}]!`;
          self.$connecter.$emit("user", JSON.parse(JSON.parse(res.data.value)));
          self.$connecter.$emit("page", {
            toast
          });
        } else {
          toast.text = `授权失败, 回调值错误!`;
          self.$connecter.$emit("page", {
            toast
          });
        }
      }).catch(() => {
        self.$connecter.$emit("page", {
          toast
        });
      });
    }

  }
});
// CONCATENATED MODULE: ./pages/user/admin/login.vue?vue&type=script&lang=js&
 /* harmony default export */ var admin_loginvue_type_script_lang_js_ = (loginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.3@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/user/admin/login.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(91)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  admin_loginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "4fd8320e"
  
)

/* harmony default export */ var login = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/account-bg3.df990ad.jpg";

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_3_6_0_css_loader_dist_cjs_js_ref_5_oneOf_1_0_node_modules_vue_loader_15_9_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_oneOf_1_1_node_modules_less_loader_4_1_0_less_loader_dist_cjs_js_ref_5_oneOf_1_2_node_modules_vue_loader_15_9_3_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

};;
//# sourceMappingURL=login.js.map