<template>

    <header class="master-top-bg">

      <a href="//mczyzy.cn" title="史莱姆的博客">
        <h1 class="logo"></h1>
      </a>
      <div class="header-nav">
        <a href="/" title="主页">
          <span class="header-nav-left"></span>
        </a>
        <ul class="header-nav-conter">
          <li>最新<span class="iconfont icon-fangxiangxia"></span></li>
          <li>
            <p>编程</p>
            <span class="fa fa-angle-down"></span>
            <ul>
               <li><a href="?page=blog_content&amp;list=javascript" class="max-a">JavaScript</a></li>
               <li><a href="?page=blog_content&amp;list=css" class="max-a">Css</a></li>
               <li><a href="?page=blog_content&amp;list=html" class="max-a">html</a></li>
               <li><a href="?page=blog_content&amp;list=php" class="max-a">php</a></li>
            </ul>
          </li>
          <li>
            <p>资源</p>
            <ul>
              <li><a href="?page=blog_content&amp;list=Windows" class="max-a">Windows</a></li>
              <li><a href="?page=blog_content&amp;list=Andorid" class="max-a">Andorid</a></li>
              <li><a href="?page=blog_content&amp;list=Web" class="max-a">Web</a></li>
              <li><a href="?page=blog_content&amp;list=other" class="max-a">Other</a></li>
            </ul>
          </li>
        </ul>
        <span class="header-nav-right">登录</span>
        <span class="header-menu-right"></span>
      </div>
    </header>

</template>

<style lang="less">

header {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;

    .header-nav {
        height: 75px;
        list-style-type: none;
        color: var(--color-mater-font);
    }
    .header-nav-left {
        float: left;
        margin-top: 5px;
        height: 60px;
        width: 100px;
        background: url('~@img/ribbon-home.png') no-repeat;

        &:hover {
            background-position-y: -68px;
        }
    }
    .header-nav-right {
        float: right;
        width: 180px;
        padding: 0 20px;
        text-align: center;
        font-size: 1.3em;
        font-weight: bold;
        color: var(--color-font-bg);
        text-shadow: 1px 1px 0 #e06a5f;
        line-height: 68px;
        background: url('~@img/Work-With-Us.png') no-repeat top left;
    }
}

// 顶部导航栏
.header-nav-conter {
    float: left;

    &>li {
        display: inline-block;
        padding: 3px 0;
        margin: 23px 5px;
        width: 90px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;

        &:hover, &:active {
            background: url('~@img/nav-red-button.png') repeat-x center;
            border-radius: 20px;
            color: var(--color-font-bg);
            text-shadow: 1px 1px 0 #e06a5f;
            box-shadow: 1px 1px 2px #000;

            ul {
                overflow: visible;
                max-height: 300px;
                padding-bottom: 5px;
            }
        }

        &:active {
            box-shadow: 0 0 2px #000;
        }

        .icon-fangxiangxia {
            font-size: 12px;
            margin: 0 5px;
        }

        ul {
            overflow: hidden;
            position: absolute;
            max-height: 0;
            width: 150px;
            margin-left: -30px;
            margin-top: 16px;
            border-radius: 0 0 5px 5px;
            color: #506073;
            text-shadow: 1px 1px 0 black;
            text-align: left;
            font-weight: 200;
            background-color: #252c36;
            box-shadow: 0 5px 10px rgba(0, 0, 0, .5);
            transition: 1s;
            z-index: 9999;

            li {
                margin: 0 5px;
                padding: 3px 0;
                border-bottom: 1px solid #2C323C;
                border-top: 1px solid #1F252E;
                text-indent: 1em;

                &:hover {
                    background-color: #333c4a;
                    color: var(--main-font-color);
                }
            }

            &>li:nth-child(1)::after {
                content: '';
                position: absolute;
                left: 0;
                top: -14px;
                margin: 0;
                width: 100%;
                height: 14px;
                background-image: url('~@img/arrow-nav.png');
                background-repeat: no-repeat;
                background-color: transparent;
                border: none;
            }
        }
    }
}

</style>
