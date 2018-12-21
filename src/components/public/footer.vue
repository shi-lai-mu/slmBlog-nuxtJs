<template>
    <footer>

        <div class='footer-nav'>
            <span class='close'>闭合底部导航栏</span>
            <ul class='footer-nav-list'>
                <li class="footer-nav-child">
                    <h3>网站导航</h3>
                    <ul>
                        <!-- <li>1</li> -->
                    </ul>
                </li>
                <li class="footer-nav-child">
                    <h3>博客分类</h3>
                    <ul>
                        <li><a href="?page=blog_content&list=javascript">JavsScript</a></li>
                        <li><a href="?page=blog_content&list=php">PHP</a></li>
                    </ul>
                </li>
                <li class="footer-nav-child">
                    <h3>友情链接</h3>
                    <ul>
                        <li><a href="//github.com/">GitHub</a></li>
                        <li><a href="//www.csdn.net/">CSDN</a></li>
                    </ul>
                </li>
                <li class="footer-nav-child footer-web-master">
                    <h3>关于我</h3>
                    <img class='border-line' src='//thirdqq.qlogo.cn/g?b=sdk&amp;k=s3zxCIMMOxfQibT9H8la8zg&amp;s=100&amp;t=1123456'>
                    <p>博客主要用于存放学习笔记、一些小案例,分享学习经验.
                    stay hunger , stay foolter[求知若饥，虚心若愚]
                    <span>[本站已勉强运行 <strong></strong>...]</span></p>
                </li>
            </ul>
        </div>

        <div class="copyright clearfix">
            <span class="copyright-left">© CopyRight 2018, <a href="//mczyzy.cn">MCZYZY.CN</a>, Inc.All Rights Reserved.</span>
            <ul class="copyright-right">
                <li><router-link to="terms">条款和免责</router-link></li>
                <li><router-link to="thisSite">关于本站</router-link></li>
            </ul>
        </div>
        <div class="beian clearfix">
            <span class="beian-a">
                <img class="beian-img" src="~@img/other/police_badge.png"/>
                <p class="beian-p">
                    <a target="_blank" href="//www.miitbeian.gov.cn">浙ICP备18049156号-1</a>
                    <a target="_blank" href="//www.beian.gov.cn">(浙公网安备 33038102331168号)</a>
                </p>
            </span>
        </div>
    </footer>
</template>

<style lang="less">
footer {
    margin: 0 0 20px;
    color: #b6c3db;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;

    .footer-nav {
        padding-top: 45px;
        background: url('~@img/footer-subcontent-bg.png') no-repeat top center;
        line-height: 1.75rem;
    }

    .footer-nav-list {
        display: flex;

        .footer-nav-child {
            flex: 1;
            padding: 0 10px 1em;
            border-left: 1px solid #28313a;
            border-right: 1px solid #3d464f;
            box-sizing: border-box;
        }
        .footer-nav-child:nth-child(4) {
            border-right: 0;
            flex: 2;
        }
        .footer-nav-child:nth-child(1) {
            border-left: 0;
        }
        h3 {
            font-size: 1.55rem;
        }
        p, a {
            color: #99a3b9
        }
        .footer-web-master {
            display: flex;
            p, img {
                margin: 10px;
            }
            img {
                border-radius: 10px;
                padding: 10px;
                background-image: url('~@img/line-pattern-light-bg.png');
                border: 1px solid rgba(216, 217, 218,.3);
            }
        }
    }

    .copyright {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        min-width: var(--min-width);
        margin: 15px 0;
        padding: 20px 10px 0;
        background: url('~@img/copyright-bg.png') no-repeat center top;
        font-weight: bold;
        color: #14181E;
        text-shadow: 1px 1px 0 #535d6e;
    }
    .copyright-left {
        width: 100%;
        text-align: center;
    }
    .copyright-right {
        margin-top: 5px;

        li {
            float: left;

            &::after {
                content: "|";
                margin: 0 7px;
            }
        }

        :nth-last-child(1) {
            &::after {
                content: "";
            }
        }
    }

    // 备案
    .beian {
        width: 100%;
        min-width: var(--min-width);
        margin: 0 auto;

        .beian-a {
            display: flex;
            justify-content: center;
            line-height: 20px;
        }

        .beian-img {
            height: 20px;
            display: inline-block;
        }

        .beian-p {
            margin: 0 5px;
            line-height: 20px;
            color: #939393;
            text-shadow: 1px 2px 1px #555;
        }
    }
}

</style>
