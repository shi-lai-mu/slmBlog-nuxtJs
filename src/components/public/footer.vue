<template>
    <footer>
        <div class="copyright clearfix">
            <span class="copyright-left">© CopyRight 2018, <a href="//mczyzy.cn">MCZYZY.CN</a>, Inc.All Rights Reserved.</span>
            <ul class="copyright-right">
                <li><a href="?infringement">侵权处理</a></li>
                <li><router-link to="terms">条款和免责</router-link></li>
                <li><router-link to="thisSite">关于本站</router-link></li>
            </ul>
        </div>
        <div class="beian">
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
    margin: 20px 0;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;

    .copyright {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        min-width: var(--min-width);
        margin: 15px 0;
        padding: 0 10px;
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
            height: 20px;
            line-height: 20px;
        }

        .beian-img {
            display: inline-block;
        }

        .beian-p {
            height: 20px;
            margin: 0 5px;
            line-height: 20px;
            color: #939393;
            text-shadow: 1px 2px 1px #555;
        }
    }
}

</style>
