<template>
  <li :class="[ 'slm', 'blog-account', { 'avatar-box': avatarUrl } ]">
    <div class="avatar" v-if="avatarUrl" :style="`background-image: url(${ avatarUrl });`"></div>
    <ul class="account-munt">
      <router-link
        class="account-munt-item"
        tag="li"
        v-for="(item, index) in accountEntrance"
        :key="index"
        :to="item.to">
        {{ item.name }}
      </router-link>
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
  avatarUrl: string = '/banner/home_1.jpg';

  mounted() {
    this.accountEntrance = [{
      name: '登录', to: '/login',
    }, {
      name: '注册', to: '/register',
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
