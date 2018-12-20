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
          <li>编程</li>
          <li>资源</li>
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

    li {
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
        }

        &:active {
            box-shadow: 0 0 2px #000;
        }

        .icon-fangxiangxia {
            font-size: 12px;
            margin: 0 5px;
        }
    }
}

</style>
