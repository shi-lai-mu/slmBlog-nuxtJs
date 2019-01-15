<template>

    <header>

      <div class="header-nav clearfix conter">

        <h1 class="LOGO">
            <router-link to="/" class="max-a"></router-link>
        </h1>

        <!-- 共享型菜单栏 -->
        <nav :class="'header-menu-right ' + (menuState ? 'list-show' : 'list-hide') " @click="menuToggle">
            <i></i>
            <ul class="header-menu-list clearfix">

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

        <input class="search">

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
      let child = this.$el.lastChild
      let cList = child.classList
      let elTop = this.$el.clientHeight - child.clientHeight

      window.addEventListener('scroll', () => {
        this.menuState && (this.menuState = false)
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        scrollTop >= elTop ? cList.add('header-nav-fixed') : cList.remove('header-nav-fixed')
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
        },
        {
          tag: '留言板',
          to: { name: 'messaged' }
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

    /**
     * 菜单切换
     */
    menuToggle (e) {
      if (e.target.classList.contains('header-menu-right')) {
        this.menuState = !this.menuState
        this.menuState ? document.addEventListener('click', menuClick) : document.removeEventListener('click', menuClick)
      }

      let self = this
      function menuClick (e) {
        if (!self.$el.contains(e.target)) {
          self.menuState = false
          document.removeEventListener('click', menuClick)
        }
      }
    },

    /**
     * 缩小菜单
     */
    minMenu (e) {
      let last = e.target.lastChild
      if (!last || !last.tagName || last.tagName.toLowerCase() !== 'ul') {
        this.menuState = false
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
    background-color: #fff;
    -webkit-user-select: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .07);
    user-select: none;

    .LOGO {
        display: inline-block;
        width: 52px;
        height: 60px;
        margin: 0;
        vertical-align: middle;
        overflow: hidden;
        background: url('//res.mczyzy.cn/LOGO.png') no-repeat center;
        background-size: 100% auto;
    }
    .header-nav {
        line-height: 75px;
        list-style-type: none;
    }
    nav {
        display: inline-block;
        margin-left: 40px;
    }
    .search {
        position: relative;
        height: 40px;
        padding-right: 40px;
        border-radius: 5px;
        z-index: 1;
        box-sizing: border-box;
        font-size: 14px;
        color: #2e2a2b;
        border: 2px solid #f1f1f1;
        background-color: #f1f1f1;
    }
}

// 移动端按钮
.centre .header-menu-right {

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
.centre .list-show {

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
        .icon-fangxiangxia {
            float: right;
            transition: 1s;
        }

        li.header-nav-conter {
            display: block;
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

                .icon-fangxiangxia {
                    transform: rotate(180deg)
                }
            }
            span:nth-child(2) {
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
.centre .header-menu-list {
    position: absolute;
    overflow: hidden;
    max-height: 0;
    transform: translateY(55px);
}

// 顶部导航栏
.list-hide .header-menu-list,
.max .header-menu-list li {
    display: inline-block;
    cursor: pointer;

    span {
        display: inline-block;
        padding-left: 40px;
        font-size: 1rem;
        line-height: 60px;
    }

    & > ul {
        display: none;
    }
}

</style>
