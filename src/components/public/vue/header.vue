<template>

    <header>
        <div class="header-nav clearfix conter">
            <h1 class="LOGO">
                <router-link to="/" class="max-a"></router-link>
            </h1>
            <span :class="['menu-list', {close: menuState}]" @click="toggleMneu"></span>
            <!-- 共享型菜单栏 -->
            <nav :class="menuState ? 'list-show' : 'list-hide'">
                <ul class="header-menu-list">

                    <li @click="minMenu" v-for="(menu, i) of menu" :key="i">
                        <router-link class="max-a" tag="span" :to="menu.to" v-if="!menu.sub">{{ menu.tag }}</router-link>
                        <span v-else>{{ menu.tag }}</span>
                        <i class="iconfont icon-fangxiangxia" v-if="menu.sub"></i>
                        <ul v-if="menu.sub">
                            <li v-for="(sub, n) in menu.sub" :key="n">
                                <router-link v-if="sub[1] == '#' || typeof sub[1] === 'object'" :to="sub[1]" tag="span">{{ sub[0] }}</router-link>
                                <span @click="runCommand(sub[1])" v-else>{{ sub[0] }}</span>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>

            <span class="button-lv1 message">留言板</span>

            <span class="header-right">
                <input class="search">
                <i class="iconfont icon-sou-suo"></i>

                <router-link :to="{ name: 'login' }" tag="span">登录</router-link>
                <router-link :to="{ name: 'register' }" tag="span" class="focus">注册</router-link>
            </span>
        </div>
    </header>

</template>

<script>

export default {
  props: ['head'],
  data () {
    return {
      user: this.$store.state.user,
      menuState: false,
      menu: []
    }
  },

  created () {
    this.$nextTick(() => {
      window.addEventListener('click', e => {
        if (this.menuState && !this.$el.contains(e.target)) {
          this.toggleMneu()
        }
      })

      // 通讯登录状态
      this.$connecter.$on('user', data => {
        this.user = data
        this.updateRouter()
      })
      this.updateRouter()
    })
  },
  methods: {
    /**
     * 更新菜单路由指向
     */
    updateRouter () {
      // 对权限进行判断
      this.menu = [
        {
          tag: '文章',
          sub: [
            ['置顶', '#'],
            ['最新', '#'],
            ['最热', '#'],
            ['精品', '#'],
            ['讨论', '#']
          ]
        },
        {
          tag: '技术',
          sub: [
            ['JavaScript', '#'],
            ['PHP', '#'],
            ['CSS', '#'],
            ['HTML', '#']
          ]
        },
        {
          tag: '资源',
          sub: [
            ['Windows', '#'],
            ['Andorid', '#'],
            ['Web', '#'],
            ['other', '#']
          ]
        },
        {
          tag: '账号',
          sub: [
            ['登录', { name: 'login' }, 'register'],
            ['注册', { name: 'register' }, 'register'],
            ['发帖', { name: 'addArticle' }, 'login'],
            ['管理账号', '#', 'login'],
            ['安全退出', 'outLogin', 'login']
          ]
        }
      ]
      this.menu.filter((item, index) => {
        if (item.sub) {
          item.sub = item.sub.filter(subItem => {
            // 设置了权限判断
            if (subItem[2]) {
              if (
                // 未登录的权限
                (subItem[2] === 'register' && this.user) ||
                // 登录后的权限
                (subItem[2] === 'login' && !this.user) ||
                // 管理员权限
                (subItem[2] === 'admin' && (!this.user || (this.user && this.user.groupid !== 9999)))
              ) {
                subItem = false
              }
            }
            return subItem
          })
        }
        return item
      })
    },

    toggleMneu () {
      this.menuState = !this.menuState
      if (this.$store.state.mobile) {
        window.tbody.className = this.menuState ? 'min-screen-left' : ''
      }
    },

    /**
     * 缩小菜单
     */
    minMenu (e) {
      let last = e.target.lastChild
      if (!last || !last.tagName || last.tagName.toLowerCase() !== 'ul') {
        this.toggleMneu()
      }
    },

    /**
     * 退出登录
     */
    outLogin () {
      localStorage.removeItem('userInfo')
      this.user = undefined
      this.$store.state.user = undefined
      this.updateRouter()
    },

    /**
     * 运行命令
     */
    runCommand (key) {
      this[key]()
    }
  }
}
</script>

<style lang="less">
header {
    position: relative;
    width: 100%;
    z-index: 30;
    white-space: nowrap;
    background-color: #fff;
    user-select: none;
    box-shadow: var(--box-shadow);
    user-select: none;
    line-height: 60px;

    .LOGO {
        float: left;
        width: 42px;
        height: 60px;
        margin: 0;
        vertical-align: middle;
        overflow: hidden;
        background: url('//res.mczyzy.cn/LOGO.png') no-repeat center;
        background-size: 42px auto;
    }
    .header-nav {
        list-style-type: none;
    }
    nav {
        display: inline-block;
        margin: 0 40px;
    }
    .search {
        position: relative;
        height: 40px;
        width: 100px;
        padding-right: 40px;
        border-radius: 5px;
        z-index: 1;
        box-sizing: border-box;
        text-indent: .5rem;
        font-size: 14px;
        color: #2e2a2b;
        border: 2px solid #eff9fc;
        background-color: #f1f8fa;
        transition: .5s;

        &:focus {
            width: 200px;
            border: 2px solid #ddf6fd;
            border-radius: 20px;
            background-color: #eefafd;
            box-shadow: 0 0 20px #f1f8fa;
            & + i {
                color: #bff1ff;
            }
        }
    }
    .icon-sou-suo {
        position: absolute;
        margin-top: 13px;
        font-size: 25px;
        line-height: 40px;
        color: #8fe2f5;
        z-index: 2;
        vertical-align: middle;
        transition: .3s;
        transform: translateX(-45px);
        cursor: pointer;
    }
    .header-right {
        float: right;

        span {
            display: inline-block;
            width: 90px;
            text-align: center;
        }
    }
    .focus {
        color: white;
        background-color: #6ed9f1;
    }
}

// 移动端按钮

.centre .menu-list {
    .i();
    right: 20px;
    top: 30px;
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
        background-color: #7a7a7a;
        transition: .5s;
    }
    &.close {
        transition: .5s .1s;
        background-color: transparent;
        &::after{
            transform: rotate(45deg);
        }
        &::before{
            transform: rotate(-45deg);
        }
    }
}

.centre nav {
    position: fixed;
    overflow-y: scroll;
    top: -60px;
    left: 0;
    height: 100vh;
    width: 40vw;
    margin: 0;
    background-color: #fff;
    opacity: 0;
    box-shadow: var(--box-shadow);
    transform: translateY(60px) translateX(-100%);
    transition: .5s;

    .header-menu-list {
        & > li {
            display: block;
            line-height: 30px;
            text-indent: 2rem;
            color: #666;
            border-bottom: 1px solid #f1f1f1;
            i {
                float: right;
                color: #ddd;
                pointer-events: none;
            }
            & > span {
                pointer-events: none;
            }
            // 子选项
            & > ul {
                float: right;
                overflow: hidden;
                opacity: 0;
                width: 90%;
                max-height: 0;
                text-indent: 0;
                transition: .5s;
            }
            &:hover > ul {
                overflow: hidden;
                opacity: 1;
                max-height: 100vh;
                visibility: inherit;
                text-indent: 2rem;
                li:hover {
                    color: #6ed9f1;
                }
            }
            &:after {
                content: "";
                display: block;
                height: 100%;
                clear: both;
            }
        }
    }
}
.centre nav.list-show {
    opacity: 1;
    transform: translateY(60px);
}

// 顶部导航栏
// .list-hide .header-menu-list ,
.max .header-menu-list > li {
    display: inline-block;
    height: 60px;
    cursor: pointer;

    span {
        display: inline-block;
        padding-left: 40px;
        font-size: 1rem;
    }
    // 子菜单
    & > ul {
        position: absolute;
        visibility: hidden;
        min-width: 100px;
        border-radius: 5px;
        margin-left: 10px;
        margin-top: 10px;
        background-color: #fff;
        opacity: 0;
        // box-shadow: 0 0 25px rgba(99,196,218,.25);
        box-shadow: 0 2px 25px rgba(0,0,0,.25);
        transition: .5s;
        transform: translateY(10px);

        li {
            display: block;
            text-align: center;
            height: 38px;
            line-height: 38px;
            color: #888;

            &:hover {
                background-color: rgba(110, 217, 241, .6);
                color: #fff;
                border-radius: 5px;
            }
        }
        span {
            padding: 0 20px;
            line-height: 1;
        }
        // 三角
        &::before {
            content: "";
            position: absolute;
            left: 50%;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent #fff transparent;
            transform: translateY(-20px) translateX(-50%);
        }
        // 触摸铺垫
        &::after {
            content: "";
            position: absolute;
            top: 0;
            width: 100%;
            height: 20px;
            transform: translateY(-20px);
        }
    }
    &:hover > ul {
        visibility: inherit;
        opacity: 1;
        transform: translateY(0);
    }
}

</style>
