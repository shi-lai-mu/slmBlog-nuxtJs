(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{248:function(t,n,e){},322:function(t,n,e){"use strict";var o=e(248);e.n(o).a},362:function(t,n,e){"use strict";e.r(n);e(36),e(25);var o=e(54),c={props:["Music"],data:function(){return{searchs:null,songList:[],state:!1,searchList:!1,downList:[],searchHistory:[],page:{num:1,max:1}}},created:function(){localStorage.getItem("searchHistory")&&(this.searchHistory=JSON.parse(localStorage.getItem("searchHistory")))},methods:{searchMusic:function(t){var n=this;"number"==typeof t&&(this.page.num+=t,this.songList=[]),this.state="搜索中...";var e=this.searchs;e&&(this.history(e),this.$axios.get("api/Music",{data:{fun:"search",key:e,page:this.page.num}}).then((function(t){n.state=!1;var e=t.data.song.list;n.$el.scrollTo(0,0);for(var i=0,c=e.length;i<c;i++){var r=e[i];if(r.songnames)break;r.songname===r.albumname&&(r.albumname="");for(var l="",h=0,v=r.singer.length;h<v;h++)l+=r.singer[h].name+"/";r.singers=l.substring(0,l.length-2);var d={sizeflac:"SQ",size320:"HQ"};for(var m in d)r[m]>0&&(r.songnames=r.songname+'<sup class="'.concat(d[m],'">').concat(d[m],"</sup>"));r.interval=Object(o.c)(r.interval),"00:00"===r.interval&&(r.interval="-- : --"),!r.songnames&&(r.songnames=r.songname)}n.songList=e;var f=t.data.song;n.page={num:f.curpage,max:Math.ceil(f.totalnum/20)}})).catch((function(){n.state="搜索超时!请稍后再试...",setTimeout((function(){n.state=!1}),1e3)})))},toggleList:function(t){this.searchList=!this.searchList;var i=t.target.dataset.i;if(this.searchList&&i){t.stopPropagation();var n=this.songList[i],e={songid:["流畅","192AAC",i],size128:["标准","128MP3",i],size320:["高品质","320MP3",i],sizeape:["无损APE","APE",i],sizeflac:["无损FLAC","FLAC",i]},o=[];for(var c in e)n[c]>0&&o.push(e[c]);this.downList=o}},download:function(t){var n=t.target,e=n.dataset,o=n.innerHTML;if(!(n.innerHTML.indexOf("[")>-1)){n.innerHTML="".concat(o," [破解权限中...]");var c=this.songList[e.i],a=document.createElement("a");"download"in a?this.$axios.get("api/Music?fun=download&code=".concat(c.songmid,"&type=").concat(e.qu)).then((function(t){console.info("祝贺你喜提彩蛋~!"),console.table([{"歌名":c.songname,"歌手":c.singers,"时长":c.interval}]),console.log("%c".concat(c.songname," 极速版下载链接：").concat(t.url),"color:red");var e=t.url,r=new XMLHttpRequest;r.responseType="blob",r.onloadstart=function(t){n.innerHTML="".concat(o," [即将开始下载]")},r.onprogress=function(t){var e=(t.loaded/t.total*100).toFixed(2);n.innerHTML="".concat(o," [").concat(e,"%][控制台有极速版]")},r.onload=function(e){var r=new Blob([this.response]);a.href=URL.createObjectURL(r);var l=c.singers.replace("/","-");a.download="".concat(c.songname,"(").concat(l,").").concat(t.suffix),document.body.appendChild(a),a.click(),n.innerHTML="".concat(o,' <span class="sup HQ">完成</span>'),setTimeout((function(){n.innerHTML=o}),1500)},r.onerror=function(t){n.innerHTML="".concat(o," [下载出错]")},e=e.replace("http://streamoc.music.tc.qq.com/","https://slmblog.com/download/music/"),r.open("get",e,!0),r.send()})).catch((function(){n.innerHTML="".concat(o," [破解失败!]")})):alert("抱歉您的浏览器不支持最新的属性,请尝试选择谷歌浏览器最新版!")}},searchChange:function(t){!t.data&&this.songList&&(this.songList=[])},history:function(t){var n=this.searchHistory;if("string"==typeof t)-1===n.indexOf(t)&&n.push(t);else{var i=t.target.dataset.i;i?(t.stopPropagation(),n.splice(i,1)):this.searchHistory=[]}localStorage.setItem("searchHistory",JSON.stringify(n))},loadKey:function(t){this.searchs=t.target.innerText,this.searchMusic()},playSong:function(t){var i=t.target.dataset.i||t.target.parentElement.dataset.i;if(i){var n=this.songList[i];n.autoPlay=!0,this.observer.emit("music",n)}}}},r=(e(322),e(7)),component=Object(r.a)(c,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"music-search"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchs,expression:"searchs"}],staticClass:"search",attrs:{type:"text",placeholder:"搜索 歌名/歌手"},domProps:{value:t.searchs},on:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.searchMusic(n)},input:[function(n){n.target.composing||(t.searchs=n.target.value)},t.searchChange]}}),t._v(" "),e("ul",{staticClass:"song-list"},t._l(t.songList,(function(n,i){return e("li",{key:i,staticClass:"clearfix",attrs:{"data-i":i},on:{click:t.playSong}},[e("span",{staticClass:"song-name",domProps:{innerHTML:t._s(n.songnames)}}),t._v(" "),e("span",{staticClass:"song-singer"},[t._v(t._s(n.singers))]),t._v(" "),e("span",{staticClass:"song-lyric"},[t._v(t._s(n.albumname))]),t._v(" "),e("i",{staticClass:"iconfont icon-caidan",attrs:{"data-i":i},on:{click:t.toggleList}}),t._v(" "),e("span",{staticClass:"song-inter"},[t._v(t._s(n.interval))])])})),0),t._v(" "),t.songList.length||t.page.num>1?e("div",{staticClass:"song-page"},[e("span",{class:["button-lv0",{"not-but":t.page.num<2}],on:{click:function(n){return t.searchMusic(-1)}}},[t._v("上一页")]),t._v(" "),e("span",[t._v(t._s(t.page.num)+"/"+t._s(t.page.max))]),t._v(" "),e("span",{class:["button-lv0",{"not-but":t.page.num>=t.page.max}],on:{click:function(n){return t.searchMusic(1)}}},[t._v("下一页")])]):t._e(),t._v(" "),!t.searchs&&t.searchHistory.length?e("div",{staticClass:"searchHistory song-list"},[e("span",{staticClass:"history-tag"},[t._v("搜索历史")]),t._v(" "),e("ul",{staticClass:"history-list"},t._l(t.searchHistory,(function(n,o){return e("li",{key:o,on:{click:t.loadKey}},[t._v("\n        "+t._s(n)),e("i",{staticClass:"iconfont icon-wrong",attrs:{"data-i":o},on:{click:t.history}})])})),0),t._v(" "),!t.searchs&&t.searchHistory.length?e("span",{staticClass:"button-lv0 clearHistory",on:{click:t.history}},[t._v("清空历史")]):t._e()]):t._e(),t._v(" "),t.state?e("div",{staticClass:"search-state"},[e("span",{staticClass:"state"},[t._v("搜索中...")])]):t._e(),t._v(" "),e("div",{class:["search-menu-hide",{"search-menu":t.searchList}]},[e("ul",[e("li",[t._v("查看信息")]),t._v(" "),e("li",[t._v("收藏歌曲")]),t._v(" "),e("li",[t._v("加入下载")]),t._v(" "),e("li",[t._v("\n        下载音乐:\n        "),t._l(t.downList,(function(n,o){return e("span",{key:o,staticClass:"download-list",attrs:{"data-qu":n[1],"data-i":n[2]},domProps:{innerHTML:t._s(n[0])},on:{click:t.download}})}))],2),t._v(" "),e("li",{staticClass:"close",on:{click:t.toggleList}},[t._v("关闭")])])])])}),[],!1,null,null,null);n.default=component.exports}}]);