<template>
  <header :class="['layout-header']">
    <router-link
      tag="h1"
      class="logo"
      :to="{ name: 'index' }"
      :style="{
        background: `url(${ $config.logo }) center / 100% 100% no-repeat`,
      }" />
    <!-- 响应型导航栏 -->
    <nav class="layout-top-nav">
      <!-- 左侧 -->
      <ul class="header-navigation" ref="Navigation">
        <router-link
          class="navigation-item"
          tag="li"
          v-for="(item, index) in navigator"
          :to="item.to || $route.path"
          :key="index"
          @click.native="jumpNav(index)">
          <i :class="['slm', 'blog-' + item.icon]"></i>
          {{ item.name }}
          <ul class="navigation-children" v-if="item.children && item.children.length">
            <router-link
              tag="li"
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
              :to="childItem.to"
              :class="[
                'navigation-children-item',
                {
                  'navigation-children-focus': index === $config.Navigation.config.focus && childIndex === $config.Navigation.config.focusChild,
                }
              ]">
                <i :class="['slm', 'blog-' + childItem.icon]"></i>
                {{ childItem.name }}
              </router-link>
          </ul>
        </router-link>
        <FocusingDisplac  v-if="!$store.state.isMobile" ref="FocusingDisplac"/>
      </ul>
      <!-- 右侧 -->
      <ul class="header-navigation-right">
        <HeaderSearch />
        <li class="slm blog-account"></li>
        <li class="slm blog-themes"></li>
      </ul>
    </nav>
    <i class="slm blog-menu" v-show="$store.state.isMobile" @click="$emit('set-open-state', mobileHeaderOpen = !mobileHeaderOpen)"></i>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Navigator } from '../../../interface/router';
import navigator from '../../../config/navigation';
import FocusingDisplac from '../../../components/focusingDisplac.vue';
import HeaderSearch from './Header/search.vue';

@Component({
  components: {
    FocusingDisplac,
    HeaderSearch,
  },
})
export default class LayoutDefaultHeader extends Vue {
  /**
   * 导航栏
   */
  navigator: Navigator.Config[] = [];
  /**
   * 导航聚焦的下标
   */
  navFocusIndex: number = 0;
  /**
   * 移动端Header展开状态
   */
  mobileHeaderOpen: boolean = false;

  mounted() {
    const navConfig = this.$config.Navigation.config;
    this.jumpNav(navConfig.focus, false);
    this.navigator = navigator;
  }


  /**
   * 导航跳转事件
   * @method router-link
   * 处理底部聚焦组件移动
   * @param index     Navigation子元素下标
   * @param animation 是否展示动画
   */
  jumpNav(index: number, animation: boolean = true) {
    // const { config } = this.$config.Navigation.config;
    // if (!config[index].to) return false;
    if (this.$store.state.isMobile) return false;
    const { $refs } = this;
    const Navigation = $refs.Navigation as Element;
    const FocusingDisplac = $refs.FocusingDisplac as FocusingDisplac;
    
    FocusingDisplac.focus(Navigation.children[index], Navigation, animation, { y: -15 });
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: 60px;

// 公共
.layout-header {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 30;
  width: 90%;
  line-height: $headerHeight;
  margin: 0 5%;
  @include themify($themes) {
    color: themed('font-lv0-color');
    // background-color: themed('bg-dp1-color-f');
    background-color: rgba($color: themed('bg-dp1-color-f'), $alpha: .8);
  }
  border-radius: 0 0 20px 20px;
  transition: 1s;
  user-select: none;
  backdrop-filter: saturate(180%) blur(20px);

  .logo {
    display: inline-block;
    min-width: 42px;
    height: 42px;
    margin: ($headerHeight - 42px)/2 30px;
  }

  .blog-menu {
    position: absolute;
    top: 0;
    left: 10px;
    opacity: .4;
    font-size: 27px;
    line-height: 50px;

    &:active {
      @include themify($themes) {
        color: themed('font-lv0-color-hover');
      }
    }
  }

  .layout-top-nav {
    display: inline-flex;
    width: 100%;
    height: 100%;
    padding-right: 20px;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;

    .header-navigation {
      position: relative;
      display: flex;
      height: 100%;

      .navigation-item {
        position: relative;
        padding: 0 30px;
        line-height: $headerHeight;
        white-space: nowrap;
        cursor: pointer;

        &:hover {
          @include themify($themes) {
            color: themed('font-lv0-color-hover');
          }

          .navigation-children {
            position: absolute;
            display: block;
            left: 0;
            min-width: 100%;
            line-height: $headerHeight / 1.5;
            white-space: nowrap;
            // padding: 0 10px;
            @include themify($themes) {
              // background-color: themed('bg-dp1-color-f');
              background-color: rgba($color: themed('bg-dp1-color-f'), $alpha: .8);
            }
            // backdrop-filter: saturate(180%) blur(20px);
          }
        }
      }

      .navigation-children {
        display: none;

        &:last-child {
          border-radius: 0 0 20px 20px;
        }

        .navigation-children-item {
          padding: 0 20px;

          &:hover,
          &.navigation-children-focus {
            @include themify($themes) {
              background-color: themed('bg-dp1-color-hover');
              // background-color: rgba($color: themed('bg-dp1-color-f'), $alpha: .9);
            }
            transition: .5s;
            transform: scale(1.1);
          }
        }
      }
    }

    .header-navigation-right {
      display: flex;

      li {
        width: 40px;
        text-align: center;
        line-height: 40px;
        margin: 0 10px;
        border-radius: 50%;
        @include themify($themes) {
          background-color: themed('bg-dp4-color');
        }
        cursor: pointer;

        &:hover {
          @include themify($themes) {
            background-color: themed('bg-dp4-color-hover');
          }
        }
      }
    }
  }
}

// 移动端
.layout-default-mobile .layout-header {
  $headerHeight: 50px;
  display: block;
  width: 100%;
  height: $headerHeight;
  margin: 0;
  border-radius: 0;
  
  .logo {
    height: 80%;
    margin: $headerHeight*.2/2 50vw;
    transform: translateX(-50%);
  }

  .layout-top-nav {
    display: block;
    width: 260px;
    height: auto;
    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(30, 32, 38, .8);
    transform: translateX(-100%);

    .header-navigation {
      display: block;
      height: auto;

      .navigation-item {
        width: auto;
        border-bottom: 1px solid rgba($color: #b6c3db, $alpha: .6);
        margin: 0 20px;
      }
    }

    .navigation-item  {
      width: 100%;
    }
  }
}
</style>
