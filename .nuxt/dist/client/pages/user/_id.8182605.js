(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{317:function(t,e,n){},472:function(t,e,n){t.exports=n.p+"img/user-default.7e6bed8.jpg"},473:function(t,e,n){"use strict";var r=n(317);n.n(r).a},784:function(t,e,n){"use strict";n.r(e);n(37);var r=n(2),c={metaInfo:{titleTemplate:function(title){return(void 0).user.username+title},title:"的个人中心"},data:function(){return{user:{},componentId:0,componentList:[["最新",function(t){return n.e(1).then(function(){var e=[n(783)];t.apply(null,e)}.bind(this)).catch(n.oe)}],["热门",function(t){return n.e(0).then(function(){var e=[n(791)];t.apply(null,e)}.bind(this)).catch(n.oe)}]]}},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,c,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$axios,r=t.route,c=r.params.id,e.next=4,n.api({key:"USER_INFO",data:{id:c}}).cache();case 4:return o=e.sent,e.abrupt("return",{user:o});case 6:case"end":return e.stop()}}),e)})))()},methods:{componentSelect:function(t){var e=t.target.dataset.id;e&&(this.componentId=e)}}},o=(n(473),n(7)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"conter single user-center"},[r("div",{staticClass:"content-box user-info",style:"background-image: url("+(t.user.bg||"/img/user-bg.webp")+")"},[r("div",{staticClass:"user-info-img"},[r("img",{attrs:{src:t.user.img||n(472),alt:""}})]),t._v(" "),r("div",{staticClass:"user-info-rmation"},[r("div",{staticClass:"info-rmation-name"},[t._v("\n        "+t._s(t.user.username)+"\n        "),r("span",{staticClass:"user-uid"},[t._v("[UID: "+t._s(t.user.id)+"]")])]),t._v(" "),r("div",{staticClass:"info-rmation-at"},[t._v("@"+t._s(t.user.user))]),t._v(" "),r("div",{staticClass:"info-rmation-desc"},[t._v(t._s(t.user.desc))])]),t._v(" "),"undefined"!=t.user.user?r("div",{staticClass:"user-info-social"},[r("button",{staticClass:"button-lv1"},[t._v("关注")]),t._v(" "),r("button",{staticClass:"button-lv1"},[t._v("私信")])]):t._e()]),t._v(" "),"undefined"!=t.user.user?r("div",{staticClass:"conter clearfix"},[t._m(0),t._v(" "),r("div",{staticClass:"content-box user-right-box"},[r("ul",{staticClass:"clearfix user-right-nav"},t._l(t.componentList,(function(e,n){return r("li",{key:n,class:{selected:t.componentId==n},attrs:{"data-id":n},on:{click:t.componentSelect}},[t._v(t._s(e[0]))])})),0),t._v(" "),r("div",{staticClass:"user-page"},[r("transition",{attrs:{name:"fade"}},[r("keep-alive",[r(t.componentList[t.componentId][1],{tag:"component",attrs:{user:t.user}})],1)],1)],1)])]):t._e()])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("aside",{staticClass:"user-left-box"},[e("ul",{staticClass:"content-box"})])}],!1,null,null,null);e.default=component.exports}}]);