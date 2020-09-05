<template>
  <header :class="['layout-header']">
    <nuxt-link
      tag="h1"
      class="logo"
      :to="{ name: 'index' }"
      :style="{
        background: `url(${ $config.logo }) no-repeat center`,
        backgroundSize: '100%',
      }" />
    <!-- 移动端按钮 -->
    <!-- <span class="menu-touch" @click="toggleMneu">
      <i :class="['menu-list', {close: menuState}]"></i>
    </span> -->
    <!-- 响应型导航栏 -->
    <nav class="layout-top-nav">
      <!-- <span class="login-after" v-if="$store.state.mobile">
        <img class="user-icon" :src="user.img" :alt="user.username + '的头像'">
        <p class="user-name">
          {{ user.username || '点击登录' }}
        </p>
      </span> -->
      <ul class="header-navigation" ref="Navigation">
        <router-link class="navigation-item" tag="li" :to="item.to" v-for="(item, index) in navigator" :key="index" @click.native="jumpNav(index)">
          {{ item.name }}
          <!-- <span v-else>{{ item.name }}</span> -->
          <!-- <i class="iconfont icon-fangxiangxia" v-if="menu.sub"></i> -->
          <ul class="navigation-children" v-for="(childItem, childIndex) in item.children" :key="childIndex">
            <router-link tag="li" :to="childItem.to">{{ childItem.name }}</router-link>
            <!-- <li v-for="(sub, n) in menu.sub" :key="n">
              <router-link class="max-a" v-if="sub[1] == '#' || sub.indexOf('/') > -1 || typeof sub[1] === 'object'" :to="sub[1]" tag="span">{{ sub[0] }}</router-link>
              <span class="max-a" @click="runCommand(sub[1])" v-else>{{ sub[0] }}</span>
            </li> -->
          </ul>
        </router-link>
        <FocusingDisplac ref="FocusingDisplac"/>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import FocusingDisplac from '../../../components/focusingDisplac.vue';
import navigator from '../../../config/navigation';

@Component({
  components: {
    FocusingDisplac,
  },
})
export default class LayoutDefaultHeader extends Vue {
  /**
   * 导航栏
   */
  navigator = navigator;

  mounted() {
    const navConfig = this.$config.Navigation.config;
    this.jumpNav(navConfig.focus, false);
  }

  /**
   * 导航跳转事件
   * @method router-link
   * 处理底部聚焦组件移动
   * @param index     Navigation子元素下标
   * @param animation 是否展示动画
   */
  jumpNav(index: number, animation: boolean = true) {
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
  height: $headerHeight;
  margin: 0 5%;
  @include themify($themes) {
    color: themed('font-lv0-color');
    background-color: themed('bg-dp1-color-f');
  }
  border-radius: 0 0 20px 20px;
  transition: 1s;
  user-select: none;

  .logo {
    display: inline-block;
    width: 42px;
    height: 100%;
    margin: 0 30px;
    vertical-align: middle;
  }

  .layout-top-nav {
    display: inline-block;
    height: 100%;
    font-size: 16px;

    .header-navigation {
      position: relative;
      display: flex;
      height: 100%;

      .navigation-item {
        padding: 0 30px;
        line-height: $headerHeight;
        cursor: pointer;

        &:hover {
          @include themify($themes) {
            color: themed('font-lv0-color-hover');
          }
        }
      }

      .navigation-children {
        display: none;
      }
    }
  }
}
</style>
