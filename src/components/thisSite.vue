<template>
    <div class="content-row single clearfix">
        <div class="content-box">
            <img src="//mczyzy.cn/logo.png" alt="logo" class="logo">
            <h2>史莱姆的个人博客</h2>
            <ul class="web-master">
                <li>
                    <span>站长：</span>
                    <p>史莱姆</p>
                </li>
                <li>
                    <span>邮箱：</span>
                    <p>slm@mczyzy.cn</p>
                </li>
                <li>
                    <span>企鹅：</span>
                    <p>478889187</p>
                </li>
                <li>
                    <span>GIT ：</span>
                    <p><a href="https://gitee.com/shi_lai_mu" title="欢迎访问我的GIT">gitee.com/shi_lai_mu</a></p>
                </li>
                <li>
                    <span>初衷：</span>
                    <p>分享技术记录学习点滴</p>
                </li>
                <li>
                    <span>创站：</span>
                    <p>2018/08/25 06:38:25 [星期六]</p>
                </li>
            </ul>

            <h2>站点框架</h2>
            <ul class="web-technology">
                <li class="clearfix">
                    <img src="//cn.vuejs.org/images/logo.png" alt="vue logo">
                    <span>VUE 全家桶</span>
                </li>
                <li class="clearfix">
                    <img src="//www.thinkphp.cn/Public/new/img/header_logo.png" alt="thinkphp logo">
                    <span>ThinkPHP 5.1</span>
                </li>
            </ul>

            <h2>技术细节</h2>
            <ul class="web-details">
                <li>
                    <span>VUE(v2.9.6):</span>
                    <p>vue-cli, vuex, vue-router, vue-resource</p>
                </li>
                <li>
                    <span>服务器环境:</span>
                    <p>Ningx[v1.14.3](VUE), Aphache[v2.4.6](PHP)</p>
                </li>
                <li>
                    <span>技术名词:</span>
                    <p>前后端分离、单页应用、响应式</p>
                </li>
                <li>
                    <span>CSS:</span>
                    <p>less</p>
                </li>
                <li>
                    <span>数据库:</span>
                    <p>MySql</p>
                </li>
                <li>
                    <span>服务器系统:</span>
                    <p>ContOS 7.2</p>
                </li>
            </ul>

            <h2>参与人员</h2>
            <ul class="web-details">
                <li>
                    <span>前端:</span>
                    <p>史莱姆(html5,css3,es6,vue)</p>
                </li>
                <li>
                    <span>后端:</span>
                    <p>史莱姆(php,sql,thinkphp)</p>
                </li>
                <li>
                    <span>设计:</span>
                    <p>史莱姆(原型参考自网络)</p>
                </li>
                <li>
                    <span>图标:</span>
                    <p>阿里巴巴(iconfont)</p>
                </li>
            </ul>

            <h2>特别致谢</h2>
            <ul class="web-details">
                <li>
                    <span>技术支持:</span>
                    <p>乌拉老师、海文老师</p>
                </li>
            </ul>

            <h2>网站声明</h2>

            <ul class="web-details">
                <li>
                    <span>内容:</span>
                    <p>本博客所有内容来源于网络、书籍和各类手册及自己原创。</p>
                </li>
                <li>
                    <span>盈利:</span>
                    <p>内容均为非盈利，初衷为方便查询、总结备份、开源分享、学习记录、技术分享、资源分享。</p>
                </li>
                <li>
                    <span>侵权:</span>
                    <p>部分内容如有侵权请联系并告知，在核实后会以删除或封文章处理。</p>
                </li>
            </ul>

            <br>

        </div>
    </div>
</template>

<script>
import connect from '@com/public/connecter.js'

export default {
  created () {
    connect.$emit('pageInfo', {
      title: {
        tag: '关于本站',
        description: '崇尚一技之长，不为学历凭能力!'
      }
    })
  }
}
</script>

<style lang="less">
.single {
    color: #09007a;
    .logo {
        display: block;
        width: 10vw;
        min-width: 100px;
        margin: 20px auto;
    }
    h2 {
        margin-top: 50px;
        font-size: 2rem;
        text-align: center;
    }
    .web-master,
    .web-technology,
    .web-details  {
        width: 90%;
        max-width: 500px;
        margin: 0 auto;
        font-size: 1.2rem;

        li {
            margin: 10px 0;
        }
        span {
            float: left;
            text-align: left;
            width: 10rem;
            color: #09007a;
            font-weight: bold;
        }
        p {
            display: inline-block;
            min-width: 200px;
            text-indent: 2rem;
            color: #666;
            white-space: nowrap;
        }
    }

    .web-master {
        p {
            color: #09007a;
            text-indent: 1rem;
        }
    }
    .web-technology {
        img {
            width: 50px;
            margin: 0 5px;
            vertical-align: middle;
        }
        li {
            width: 350px;
            margin: 5px auto;
        }
        span {
            float: initial;
        }
    }
    .web-details {
        width: 90%;
        max-width: 600px;
        p {
            vertical-align: top;
            list-style: initial;
            white-space: initial;
        }
    }
}
</style>
