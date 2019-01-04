<template>
    <div class="content-row single clearfix">
        <div class="content-box thisSite">
            <img src="//120.78.221.235/logo.png" alt="slm-logo" class="logo">
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
                    <img src="//120.78.221.235/img/vue-logo.png" alt="vue logo">
                    <span>VUE 全家桶</span>
                </li>
                <li class="clearfix">
                    <img src="//120.78.221.235/img/tp-logo.png" alt="thinkphp logo">
                    <span>ThinkPHP 5.1</span>
                </li>
            </ul>

            <h2>技术细节</h2>
            <ul class="web-details">
                <li>
                    <span>CSS:</span>
                    <p>less</p>
                </li>
                <li>
                    <span>数据库:</span>
                    <p>MySql</p>
                </li>
                <li>
                    <span>VUE(v2.9.6):</span>
                    <p>vue-cli, vuex, vue-router, axios, lazyload, vueMeta</p>
                </li>
                <li>
                    <span>本站技术名词:</span>
                    <p>前后端分离、单页应用、响应式、分布式服务器、H5网站</p>
                </li>
                <li>
                    <span>服务器:</span>
                    <p>ContOS 7.2 [共两台服务器]</p>
                    <p class="sub"><em>- 主服务器:</em>逻辑业务运算,动静态</p>
                    <p class="sub"><em>- 子服务器:</em>图片等资源,文件IO,数据统计</p>
                </li>
                <li>
                    <span>服务器环境:</span>
                    <p>Ningx[v1.14.3](VUE), Aphache[v2.4.6](PHP)</p>
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
                    <p>乌拉老师、海文老师、张磊老师</p>
                </li>
            </ul>

            <h2>收录情况</h2>
            <ul class="web-details">
                <li>
                    <span>百度搜索:</span>
                    <p>
                        <a href="//www.baidu.com/s?wd=site%3Amczyzy.cn" target="_black">[精准查看]</a>
                        已收录本站 <icon class="iconfont icon-renzheng"></icon>
                    </p>
                </li>
                <li>
                    <span>谷歌搜索:</span>
                    <p>
                        <a href="//www.google.com/search?q=slm478889187@gmail.com" target="_black">[精准查看]</a>
                        已收录本站 <icon class="iconfont icon-renzheng"></icon>
                    </p>
                </li>
                <li>
                    <span>腾讯登录:</span>
                    <p>
                        已获得授权 <icon class="iconfont icon-renzheng1"></icon>
                    </p>
                </li>
            </ul>

            <h2>网站声明</h2>
            <ul class="web-details">
                <li>
                    <span>目标:</span>
                    <p>我期望终有一日乃至2021年能入B站或与之匹敌的公司，从事自己所热爱的 前端/后端工作(偏前)。</p>
                </li>
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
                <li>
                    <span>安全:</span>
                    <p>隐私全采用RSA非对称加密传输, token防劫持, sha1+md5存入数据库</p>
                </li>
            </ul>

            <br>

        </div>
    </div>
</template>

<script>

export default {
  created () {
    this.$connecter.$emit('page', {
      title: {
        tag: '关于本站',
        description: '崇尚一技之长，不为学历凭能力!'
      }
    })
  }
}
</script>

<style lang="less">
.single .thisSite {
    color: #09007a;
    .logo {
        display: block;
        width: 13vw;
        min-width: 100px;
        margin: 20px auto;
    }
    h2 {
        margin-top: 50px;
        font-size: 2rem;
        text-align: center;
    }
    .icon-renzheng,
    .icon-renzheng1 {
        font-size: 20px;
        color: #0bc568;
        text-shadow: 1px 1px 2px #ccc;
    }
    a {
        color: #0bc568;
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
        .sub {
            display: block;
            text-indent: 3rem;
            color: #888;

            &:nth-last-child(1) {
                margin-bottom: 20px;
            }
        }
        em {
            margin-right: 8px;
            text-indent: 2rem;
            color: #0b00a8;
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
