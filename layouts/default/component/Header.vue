<template>
  <header :class="['header-nav', { 'header-hide': headerHide }]">
    <nuxt-link tag="h1" :to="{ name: 'index' }" class="logo"></nuxt-link>
    <!-- 移动端按钮 -->
    <!-- <span class="menu-touch" @click="toggleMneu">
      <i :class="['menu-list', {close: menuState}]"></i>
    </span> -->
    <!-- 响应型导航栏 -->
    <nav ref="mobilList" :class="menuState ? 'list-show' : 'list-hide'" :style="mobilStyle">
      <span class="login-after" v-if="$store.state.mobile">
        <img class="user-icon" :src="user.img" :alt="user.username + '的头像'">
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
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class LayoutDefaultHeader extends Vue {
  
  menuState = false;
  menu = [];
  mobilStyle = null;
  account = !0;
  headerHide = false;

  mounted() {
    console.log(this.$store.state);
  }
}
</script>

<style lang="scss" scoped>
  
// 下滚动时隐藏导航
.header-hide {
  opacity: 0;
  transform: translateY(-100%);
}

// 公共
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  width: 90%;
  height: 60px;
  margin: 0 5%;
  // line-height: 60px;
  @include themify($themes) {
    color: themed('font-lv0-color');
    background-color: themed('bg-dp9-color');
  }
  border-radius: 0 0 20px 20px;
  transition: 1s;
  user-select: none;

  .logo {
    width: 42px;
    height: 60px;
    margin: 0 30px;
    background: url("/logo/logo.png") no-repeat center;
    background-size: 100%;
  }

  // nav {
  //   display: inline-block;
  //   margin: 0 20px;
  // }

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

            box-sizing: border-box;

            transition: .5s;

    &:focus {
      width: 200px;
      background-color: #eefafd;
      border: 2px solid #ddf6fd;
      border-radius: 20px;

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
      cursor: pointer;
    }

    .login-after {
      width: auto;
      margin-left: 20px;
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



            flex-direction: row;


            justify-content: center;


            align-items: center;
    top: 14px;
    right: 20px;
    width: 30px;
    height: 30px;
  }
  .menu-list {

    .i {
      position: absolute;
      width: 20px;
      height: 3.5px;
      background-color: #7a7a7a;
      border-radius: 4px;

              transition: .5s;
    }

    &::after,
    &::before {
      content: '';

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

            box-shadow: var(--box-shadow);

            transform: translateY(60px) translateX(-100%);

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

            box-shadow: 0 2px 25px rgba(0,0,0,.25);

            transition: .5s;

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

              transform: translateY(-20px) translateX(-50%);
    }

    // 触摸铺垫
    &::after {
      position: absolute;
      top: 0;
      width: 100%;
      height: 20px;
      content: "";

              transform: translateY(-20px);
    }
  }

  // 显示子栏目
  &:hover > ul {
    opacity: 1;
    visibility: inherit;

            transform: translateY(0);
  }
}
</style>
