<template>
  <header :class="['header-nav', { 'header-hide': headerHide }]">
    <div class="conter">
      <h1 class="LOGO">
        <router-link to="/" class="max-a"></router-link>
      </h1>
      <!-- 移动端按钮 -->
      <span class="menu-touch" @click="toggleMneu">
        <i :class="['menu-list', {close: menuState}]"></i>
      </span>
      <!-- 响应型导航栏 -->
      <nav ref="mobilList" :class="menuState ? 'list-show' : 'list-hide'" :style="mobilStyle">
        <span class="login-after" v-if="$store.state.mobile">
          <img class="user-icon" v-lazy="user.img" :alt="user.username + '的头像'">
          <p class="user-name">
            {{ user.username || '点击登录' }}
          </p>
        </span>
        <ul class="header-menu-list">

          <li @click="minMenu" v-for="(menu, i) of menu" :key="i">
            <router-link class="max-a" tag="span" :to="menu.to" v-if="!menu.sub">{{ menu.tag }}</router-link>
            <span v-else>{{ menu.tag }}</span>
            <i class="iconfont icon-fangxiangxia" v-if="menu.sub"></i>
            <!-- 子导航 -->
            <ul v-if="menu.sub">
              <li v-for="(sub, n) in menu.sub" :key="n">
                <router-link class="max-a" v-if="sub[1] == '#' || sub.indexOf('/') > -1 || typeof sub[1] === 'object'" :to="sub[1]" tag="span">{{ sub[0] }}</router-link>
                <span class="max-a" @click="runCommand(sub[1])" v-else>{{ sub[0] }}</span>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
      <!-- 额外按钮 -->
      <!-- <span class="button-lv1 message">留言板</span> -->
      <!-- 右侧内容 -->
      <span class="header-right">
        <span class="search-box">
          <input class="search" @keyup.enter="searchKeyWord">
          <i class="iconfont icon-sou-suo"></i>
        </span>

        <transition name="fade">
          <span class="login-before" v-show="account" v-if="!user.username">
            <router-link :to="{ name: 'login' }" tag="span">登录</router-link>
            <router-link class="focus" :to="{ name: 'register' }" tag="span">注册</router-link>
          </span>
          <span class="login-after focus" v-show="account" v-else>
            <router-link :to="{ name: 'userCenter' }">
              <img class="user-icon" v-lazy="user.img" :alt="user.username + '的头像'">
              <p class="user-name" v-text="user.username"></p>
            </router-link>
          </span>
        </transition>

      </span>
    </div>
  </header>
</template>

<script>

export default {
  props: ['head'],
  data () {
    return {
      user: this.$store.state.user || {
        img: '//res.mczyzy.cn/img/user-default.jpg'
      },
      menuState: false,
      menu: [],
      mobilStyle: null,
      account: !0,
      headerHide: false
    }
  },

  created () {
    this.$nextTick(() => {
      // 失焦事件[移动端]
      this.$store.state.mobile && window.addEventListener('click', e => {
        if (this.menuState && !this.$el.contains(e.target)) {
          this.toggleMneu()
        }
      })
      // 向下滚动时收起顶部[pc端]
      let scrollTop = 0
      let $el = this.$el.classList
      let lastInter = null
      if (!this.$store.state.mobile) {
        window.addEventListener('scroll', () => {
          clearTimeout(lastInter)
          lastInter = setTimeout(() => {
            const scroll = window.scrollY
            this.headerHide = scrollTop < scroll
            scrollTop = scroll
          }, 100)
        })
      }
      // 观察登录状态
      this.$connecter.$on('user', data => {
        this.user = data
        this.updateRouter()
      })
      this.updateRouter()
    })
  },
  watch: {
    '$route' (to) {
      // 如果在登录页不显示account
      this.account = !(to.path === '/user/login')
      // 如果登录了在首页则不显示account
      if ((to.path === '/' || to.path === '/user/center') && !isNaN(this.user.id)) {
        this.account = !1
      }
    }
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
            ['首页', '/'],
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
            ['发帖', { name: 'editArticle' }, 'admin'],
            ['安全退出', 'outLogin', 'login']
          ]
        }
      ]
      this.menu.filter((item, index) => {
        if (item.sub) {
          item.sub = item.sub.filter(subItem => {
            // 设置了权限判断
            if (subItem[2]) {
              subItem = this.$router.options.permissions(subItem[2]) ? subItem : false
            }
            return subItem
          })
        }
        return item
      })
    },

    /**
     * 开启/关闭 导航栏[移动端]
     * @param {Boolean} state 切换状态
     */
    toggleMneu (state) {
      if (typeof state === 'boolean') {
        if (this.menuState === state) return this.menuState
        this.menuState = state
      } else this.menuState = !this.menuState

      if (this.$store.state.mobile) {
        window.tbody.className = this.menuState ? 'min-screen-left' : ''
      }
      return this.menuState
    },

    /* 点击导航栏内部,子导航时缩小菜单[移动端事件] */
    minMenu (e) {
      let last = e.target.lastChild
      if (!last || !last.tagName || last.tagName.toLowerCase() !== 'ul') {
        this.toggleMneu()
      }
    },

    /* 运行命令 */
    runCommand (key) {
      this[key]()
    },

    /* 退出登录 */
    outLogin () {
      localStorage.removeItem('userInfo')
      this.user = {
        img: '//res.mczyzy.cn/img/user-default.jpg'
      }
      this.$store.state.user = undefined
      this.updateRouter()
    },

    /* 搜索关键词 */
    searchKeyWord (e) {
      this.$connecter.$emit('searchKeyWord', e.target.value)
      e.target.value = ''
      e.target.blur()
    }
  }
}
</script>

<style lang="less">
// 下滚动时隐藏导航
.header-hide {
  opacity: 0;
  -webkit-transform: translateY(-100%);
          transform: translateY(-100%);
}

// 公共
.header-nav {
  position: fixed;
  top: 0;
  z-index: 30;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  -webkit-box-shadow: var(--box-shadow);
          box-shadow: var(--box-shadow);
  -webkit-transition: 1s;
          transition: 1s;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;

  .LOGO {
    float: left;
    width: 42px;
    height: 60px;
    margin: 0 20px;
    overflow: hidden;
    vertical-align: middle;
    background: url("//res.mczyzy.cn/LOGO.png") no-repeat center;
    background-size: 42px auto;
  }

  nav {
    display: inline-block;
    margin: 0 20px;
  }

  .search-box {
    position: relative;
    float: left;
    margin-top: 10px;
  }

  .search {
    float: right;
    z-index: 1;
    height: 40px;
    width: 100px;
    padding-right: 40px;
    font-size: 14px;
    color: #2e2a2b;
    text-indent: .5rem;
    border: 2px solid #eff9fc;
    background-color: #f1f8fa;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    -webkit-transition: .5s;
            transition: .5s;

    &:focus {
      width: 200px;
      background-color: #eefafd;
      border: 2px solid #ddf6fd;
      border-radius: 20px;
      -webkit-box-shadow: 0 0 20px #f1f8fa;
              box-shadow: 0 0 20px #f1f8fa;
      & + i {
        color: #bff1ff;
      }
    }
  }

  .icon-sou-suo {
    position: absolute;
    right: 0;
    z-index: 2;
    font-size: 25px;
    line-height: 40px;
    color: #8fe2f5;
    vertical-align: middle;
    -webkit-transition: .3s;
            transition: .3s;
    -webkit-transform: translateX(-2.5px);
            transform: translateX(-2.5px);
    cursor: pointer;
  }

  .header-right {
    float: right;

    .login-before span,
    .login-after {
      display: inline-block;
      width: 90px;
      height: 60px;
      text-align: center;
      cursor: pointer;
    }

    .login-after {
      width: auto;
      margin: 0 20px;
    }

    .user-name {
      display: inline-block;
      margin: 0 10px;
      font-size: 1.2rem;
      font-weight: 500;
      color: #fff;
      vertical-align: middle;
    }
  }

  .focus {
    color: white;
    background-color: #95dff0;
  }
}

//  移动端
.centre {
  // 按钮
  .menu-touch {
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    top: 14px;
    right: 20px;
    width: 30px;
    height: 30px;
  }
  .menu-list {
    .i();

    .i {
      position: absolute;
      width: 20px;
      height: 3.5px;
      background-color: #7a7a7a;
      border-radius: 4px;
      -webkit-transition: .5s;
              transition: .5s;
    }

    &::after,
    &::before {
      content: '';
      .i();
      -webkit-transform: translateY(7.5px);
              transform: translateY(7.5px);
    }

    &::before {
      -webkit-transform: translateY(-7.5px);
              transform: translateY(-7.5px);
    }

    // 闭合状态
    &.close {
      -webkit-transition: .5s .1s;
      transition: .5s .1s;
      background-color: transparent;

      &::after{
        -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
      }

      &::before{
        -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
      }
    }
  }

  // 导航栏
  .header-nav nav {
    position: fixed;
    top: -60px;
    left: 0;
    height: 100vh;
    width: 40vw;
    margin: 0;
    overflow-y: scroll;
    background-color: #fff;
    opacity: 0;
    -webkit-box-shadow: var(--box-shadow);
            box-shadow: var(--box-shadow);
    -webkit-transform: translateY(60px) translateX(-100%);
            transform: translateY(60px) translateX(-100%);
    -webkit-transition: .5s;
            transition: .5s;

    .header-menu-list {
      & > li {
        display: block;
        line-height: 30px;
        color: #666;
        text-indent: 1rem;
        border-bottom: 1px solid #f1f1f1;

        i {
          float: right;
          color: #ddd;
          text-indent: 0;
          -webkit-transition: 1s;
                  transition: 1s;
          pointer-events: none;
        }

        & > span {
          pointer-events: none;
        }

        // 子导航
        & > ul {
          float: right;
          width: 100%;
          max-height: 0;
          overflow: hidden;
          text-indent: 0;
          opacity: 0;
          -webkit-transition: .5s;
                  transition: .5s;

          li {
            span::before {
              display: inline-block;
              width: 10px;
              height: 2px;
              margin: 0 5px;
              font-weight: bold;
              vertical-align: middle;
              background-color: rgba(0, 0, 0, .2);
              content: "";
            }
          }
        }

        &:hover {
          color: #222;

          i {
            -webkit-transform: rotate(180deg);
                    transform: rotate(180deg);
          }

          & > ul {
            overflow: hidden;
            max-height: 100vh;
            text-indent: 1rem;
            color: #888;
            opacity: 1;
            visibility: inherit;

            li:hover {
              color: #6ed9f1;
            }
          }
        }

        &::after {
          display: block;
          height: 100%;
          clear: both;
          content: "";
        }
      }
    }

    .login-after {
      display: block;
      margin-left: 5px;
      background-color: #fafafa;

      .user-icon {
        display: block;
        height: 5rem;
        margin: 0 auto;
        padding-top: 20px;
        border-radius: 50%;
      }

      .user-name {
        font-size: 1.1rem;
        text-align: center;
      }
    }

    // 列表显示
    &.list-show {
      opacity: 1;
      -webkit-transform: translateY(60px);
              transform: translateY(60px);
    }
  }
}

// pc端 导航栏
.max .header-menu-list > li {
  display: inline-block;
  cursor: pointer;

  span {
    display: inline-block;
    padding-left: 40px;
    font-size: 1rem;
  }

  // 子菜单
  & > ul {
    position: absolute;
    min-width: 100px;
    margin-top: 10px 0 0 10px;
    background-color: #fff;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    -webkit-box-shadow: 0 2px 25px rgba(0,0,0,.25);
            box-shadow: 0 2px 25px rgba(0,0,0,.25);
    -webkit-transition: .5s;
            transition: .5s;
    -webkit-transform: translateY(10px);
            transform: translateY(10px);

    li {
      display: block;
      height: 38px;
      line-height: 38px;
      color: #888;
      text-align: center;

      &:hover {
        color: #fff;
        background-color: rgba(110, 217, 241, .6);
        border-radius: 5px;
      }
    }

    span {
      padding: 0;
    }

    // 三角
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
      -webkit-transform: translateY(-20px) translateX(-50%);
              transform: translateY(-20px) translateX(-50%);
    }

    // 触摸铺垫
    &::after {
      position: absolute;
      top: 0;
      width: 100%;
      height: 20px;
      content: "";
      -webkit-transform: translateY(-20px);
              transform: translateY(-20px);
    }
  }

  // 显示子栏目
  &:hover > ul {
    opacity: 1;
    visibility: inherit;
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
}
</style>
