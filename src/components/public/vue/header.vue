<template>
  <header class="nav-header">
    <div class="header-nav clearfix conter">
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
      <span class="button-lv1 message">留言板</span>
      <!-- 右侧内容 -->
      <span class="header-right">
        <span class="search-box">
          <input class="search" @keyup.enter="searchKeyWord">
          <i class="iconfont icon-sou-suo"></i>
        </span>

        <span class="login-before" v-if="!user.username" >
          <router-link :to="{ name: 'login' }" tag="span">登录</router-link>
          <router-link class="focus" :to="{ name: 'register' }" tag="span">注册</router-link>
        </span>
        <span class="login-after focus" v-else>
          <img class="user-icon" v-lazy="user.img" :alt="user.username + '的头像'">
          <p class="user-name" v-text="user.username"></p>
        </span>

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
      mobilStyle: null
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
      if (!this.$store.state.mobile) {
        window.addEventListener('scroll', () => {
          let scroll = document.documentElement.scrollTop || document.body.scrollTop
          scrollTop < scroll ? $el.add('header-hide') : $el.remove('header-hide')
          scrollTop = scroll
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
            ['发帖', { name: 'addArticle' }, 'admin'],
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
              console.log(subItem[2])
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

    /**
     * 点击导航栏内部,子导航时缩小菜单[移动端事件]
     */
    minMenu (e) {
      let last = e.target.lastChild
      if (!last || !last.tagName || last.tagName.toLowerCase() !== 'ul') {
        this.toggleMneu()
      }
    },

    /**
     * 运行命令
     */
    runCommand (key) {
      this[key]()
    },

    /**
     * 退出登录
     */
    outLogin () {
      localStorage.removeItem('userInfo')
      this.user = {
        img: '//res.mczyzy.cn/img/user-default.jpg'
      }
      this.$store.state.user = undefined
      this.updateRouter()
    },

    /**
     * 搜索关键词
     */
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
  transform: translateY(-100%);
}

// 公共
.nav-header {
  position: fixed;
  top: 0;
  z-index: 30;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  transition: 1s;
  user-select: none;

  .LOGO {
    float: left;
    width: 42px;
    height: 60px;
    margin: 0 20px;
    vertical-align: middle;
    overflow: hidden;
    background: url("//res.mczyzy.cn/LOGO.png") no-repeat center;
    background-size: 42px auto;
  }

  .header-nav {
    list-style-type: none;
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
    right: 0;
    font-size: 25px;
    line-height: 40px;
    color: #8fe2f5;
    z-index: 2;
    vertical-align: middle;
    transition: .3s;
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
      vertical-align: middle;
      color: #fff;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 14px;
    width: 30px;
    height: 30px;
  }
  .menu-list {
    .i();

    .i {
      position: absolute;
      border-radius: 4px;
      width: 20px;
      height: 3.5px;
      background-color: #7a7a7a;
      transition: .5s;
    }

    &::after,
    &::before {
      content: '';
      .i();
      transform: translateY(7.5px);
    }

    &::before {
      transform: translateY(-7.5px);
    }

    // 闭合状态
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

  // 导航栏
  .nav-header nav {
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
        text-indent: 1rem;
        color: #666;
        border-bottom: 1px solid #f1f1f1;
        i {
          float: right;
          text-indent: 0;
          color: #ddd;
          transition: 1s;
          pointer-events: none;
        }
        & > span {
          pointer-events: none;
        }

        // 子导航
        & > ul {
          float: right;
          overflow: hidden;
          opacity: 0;
          width: 100%;
          max-height: 0;
          text-indent: 0;
          transition: .5s;

          li {
            span::before {
              content: "";
              display: inline-block;
              width: 10px;
              height: 2px;
              vertical-align: middle;
              margin: 0 5px;
              font-weight: bold;
              background-color: rgba(0, 0, 0, .2);
            }
          }
        }

        &:hover {
          color: #222;
          i {
            transform: rotate(180deg);
          }
          & > ul {
            overflow: hidden;
            opacity: 1;
            max-height: 100vh;
            visibility: inherit;
            text-indent: 1rem;
            color: #888;

            li:hover {
              color: #6ed9f1;
            }
          }
        }
        &::after {
          content: "";
          display: block;
          height: 100%;
          clear: both;
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
        border-radius: 50%;
        padding-top: 20px;
      }
      .user-name {
        font-size: 1.1rem;
        text-align: center;
      }
    }

    // 列表显示
    &.list-show {
      opacity: 1;
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
    visibility: hidden;
    min-width: 100px;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 10px;
    background-color: #fff;
    opacity: 0;
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

  // 显示子栏目
  &:hover > ul {
    visibility: inherit;
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
