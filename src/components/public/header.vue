<template>

    <header class="master-top-bg">

      <a href="//mczyzy.cn" title="史莱姆的博客">
        <h1 class="logo"></h1>
      </a>
      <div class="header-nav clearfix">

        <router-link to="/" title="主页">
          <span class="header-nav-left"></span>
        </router-link>

        <span :class="'header-menu-right ' + (menuState ? 'list-show' : 'list-hide') " @click="menuToggle">
            <i></i>
            <span class="header-menu-list">
                <ul class="header-nav-conter" v-for="menu in menuList" :key="menu">
                    <li>{{ menu.tag }}
                        <span v-if="menu.sub" class="iconfont icon-fangxiangxia"></span>
                        <ul v-if="menu.sub">
                        <li v-for="sub in menu.sub" :key="sub"><a :href="sub[1]">{{ sub[0] }}</a></li>
                        </ul>
                    </li>
                </ul>
            </span>
        </span>

        <router-link to="login" v-if="!this.$store.state.user">
            <span class="header-nav-right">登录</span>
        </router-link>

        <!-- <span :class="'header-menu-right ' + (menuState ? 'list-show' : 'list-hide') " @click="menuToggle">
            <i></i>
            <ul class="header-menu-list">
                <li>
                    <span>ssssssssssssssss</span>
                    <ul>
                        <li>123456798</li>
                        <li>123456798</li>
                        <li>123456798</li>
                        <li>123456798</li>
                        <li>123456798</li>
                    </ul>
                </li>
                <li>111111111</li>
                <li>111111111</li>
                <li>111111111</li>
                <li>111111111</li>
                <li>111111111</li>
                <li>111111111</li>
            </ul>
        </span> -->

      </div>
    </header>

</template>

<script>

export default {
  props: ['head'],

  data () {
    return {
      menuState: false,
      menuList: [
        {
          tag: '最新'
        },
        {
          tag: '编程',
          sub: [
            ['JavaScript','#'],
            ['PHP','#'],
            ['CSS','#'],
            ['HTML','#']
          ]
        },
        {
          tag: '资源',
          sub: [
            ['Windows','#'],
            ['Andorid','#'],
            ['Web','#'],
            ['other','#']
          ]
        }
      ]
    }
  },

  created () {
    this.$nextTick(() => {
      let child = this.$el.lastChild
      let cList = child.classList
      let elTop = this.$el.clientHeight - child.clientHeight

      window.addEventListener('scroll', event => {
        this.menuState && (this.menuState = false)
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        scrollTop >= elTop ? cList.add('header-nav-fixed') : cList.remove('header-nav-fixed')
      })
    })
  },

  methods: {
    menuToggle: function (e) {
      if (e.target.classList.contains('header-menu-right')) {
        this.menuState = !this.menuState
      }
    }
  }
}
</script>

<style lang="less">

header {
    user-select:none;

    .header-nav {
        min-height: 75px;
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

// 浮动
.header-nav-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background-image: url('~@img/hd-bg.png'), var(--body-img);
    background-position: center bottom;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .3);
}

// 移动端按钮
.header-menu-right {

    i {
        .i();
        transform: translateY(22px) translateX(27px);
        pointer-events: none;

        &::after{
            content: '';
            .i();
            transform: translateY(7px);
        }

        &::before{
            content: '';
            .i();
            transform: translateY(-7px);
        }

        .i {
            position: absolute;
            border-radius: 4px;
            width: 20px;
            height: 3px;
            background-color: #303944;
            transition: 1s;
        }
    }

    
}
// 列表显示
.list-show {

    .header-menu-list {
        position: absolute;
        overflow: hidden;
        left: 0;
        z-index: 9999;
        max-height: 100vh;
        width: 100%;
        background-image: var(--body-img);
        transform: translateY(55px);
        transition: 1s;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .3);

        ul.header-nav-conter {
            float: initial;
            padding: 10px 20px;
            border-bottom: 1px solid #2C323C;
            border-top: 1px solid #1F252E;
            background-color: #252c36;

            &:hover {
                background-color: #374150;
                color: #d1d7e6;

                // 子导航 展开
                ul {
                    max-height: 50vh;
                    margin-top: 10px;
                }
            }
            span {
                display: block;
            }
            li {
                padding: 5px 20px;
                border-bottom: 1px solid rgba(255, 255, 255, .1);

                &:hover {
                    color: #d1d7e6;
                }
                &:not(:hover) {
                    color: var(--color-mater-font);
                }
            }
            li:nth-of-type(1) {
                border-top: 1px solid rgba(255, 255, 255, .1);
            }
            & > ul {
                overflow: hidden;
                max-height: 0;
                transition: .5s;
            }
        }
    }

    i {
        transition: 1s .5s;
        background-color: transparent;
        &::after{
            transform: rotate(45deg);
        }

        &::before{
            transform: rotate(-45deg);
        }
    }
}
// 列表隐藏
.list-hide .header-menu-list {
    // position: absolute;
    // overflow: hidden;
    // max-height: 0;
    // transition: .5s;
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
                max-height: 300px;
                padding-bottom: 5px;
            }
            span {
                transform: rotate(180deg);
            }
                // overflow: visible;

        }

        span {
            display: inline-block;
            margin: 0;
            transition: .5s transform;
        }

        p {
            display: inline-block;
        }
        ul {
            overflow: hidden;
            position: absolute;
            max-height: 0;
            width: 170px;
            margin-left: -45px;
            margin-top: 5px;
            padding-left: 15px;
            border-radius: 0 0 5px 5px;
            color: #63768d;
            text-shadow: 1px 1px 0 black;
            text-align: left;
            font-weight: 200;
            transition: 1s;
            z-index: 9999;

            li {
                position: relative;
                width: 140px;
                margin-left: 5px;
                padding: 5px 0;
                text-indent: 1em;
                font-weight: 500;
                border-bottom: 1px solid #2C323C;
                border-top: 1px solid #1F252E;
                background-color: #252c36;
                // box-shadow: 0 5px 10px rgba(0, 0, 0, .5);

                &:hover {
                    background-color: #333c4a;
                    color: var(--main-font-color);
                }
            }
            li::after {
                content: '';
                width: 150px;
                height: 100%;
                top: 0;
                left: -5px;
                position: absolute;
                background-color: #252c36;
                box-shadow: 0 5px 10px rgba(0, 0, 0, .5);
                border-radius: 4px;
                z-index: -1;
            }

            &>li:nth-child(1)::before {
                content: '';
                position: absolute;
                left: -5px;
                top: -15px;
                width: 150px;
                height: 14px;
                background-image: url('~@img/arrow-nav.png');
                border: 0;
            }
            &>li:nth-last-child(1) {
                margin-bottom: 15px;
                border-radius: 0 0 5px 5px;
                border-bottom: 5px solid #1b2129;
            }
        }

        ul::before  {
            content: '';
            display: block;
            height: 15px;
            width: 100%;
            background-color: transparent;
        }
    }
}

</style>
