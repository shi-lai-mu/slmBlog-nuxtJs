<template>
  <li :class="[ 'slm', 'blog-account', { 'avatar-box': avatarUrl }, $store.state.themes.mainBColor ]" @click="accountEntrance[0].cb">
    <div class="avatar" v-if="avatarUrl" :style="`background-image: url(${ avatarUrl });`"></div>
    <ul class="account-munt" v-if="!this.$store.state.isMobile">
      <li
        class="account-munt-item"
        v-for="(item, index) in accountEntrance"
        @click="item.cb"
        :key="index">
        {{ item.name }}
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { Router } from '../../../../interface/router';

@Component
export default class HeaderAccount extends Vue {
  /**
   * 账号入口
   */
  accountEntrance: Router.Config[] = [];
  /**
   * 头像链接
   */
  avatarUrl: string = '';

  created() {
    this.accountEntrance = [{
      name: '登录',
      cb: () => this.$observer.emit('login'),
    }, {
      name: '注册',
      cb: () => {},
    }];
  }
}
</script>

<style lang="scss" scoped>
.blog-account {
  position: relative;
  height: 40px;

  .account-munt {
    position: absolute;
    overflow: hidden;
    width: 100px;
    @include themify($themes) {
      background-color: rgba($color: themed('bg-dp1-color-f'), $alpha: .8);
    }
    max-height: 0;
    border-radius: 0 0 10px 10px;
    transform: translate(-30px, 11px);
    transition: 1s;
    backdrop-filter: saturate(180%) blur(20px);

    .account-munt-item:hover {
      @include themify($themes) {
        background-color: rgba($color: themed('bg-dp1-color-hover'), $alpha: .8);
      }
    }
  }

  &:hover {
    .avatar {
      transform: rotate(180deg);
    }
    .account-munt {
      max-height: 50vh;
    }
  }

  &.avatar-box {
    .avatar {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: no-repeat center center;
      background-size: cover;
      border-radius: 50%;
      transition: .5s .2s;
      // width: 100%;
    }
  }
}

.layout-default-mobile .blog-account {
  position: absolute;
  top: 0;
  left: 120px;
  margin: auto;
  width: 100px !important;
  height: 100px;
  transform: translate(-50%, 40px);

  &::before {
    opacity: .4;
    content: '登录';
    line-height: 100px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
