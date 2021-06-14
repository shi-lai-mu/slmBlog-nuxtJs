<template>
  <li
    :class="[
      'slm',
      'blog-account',
      { 'avatar-box': user.avatarUrl },
      $store.state.themes.mainBColor,
    ]"
    @click="avatarClick"
  >
    <Images v-if="user.avatarUrl" class="avatar" :src="user.avatarUrl" />
    <template v-if="!isMobile">
      <ul v-if="!jwt" class="account-munt">
        <li
          v-for="(item, index) in accountEntrance"
          :key="index"
          class="account-munt-item"
          @click.stop="item.cb"
        >
          {{ item.name }}
        </li>
      </ul>
      <div v-else class="account-munt">123456</div>
    </template>
  </li>
</template>

<script lang="ts">
import { Vue, Component, State } from 'nuxt-property-decorator'

import { Router } from '@/interface/router'
import { User } from '@/interface/request/user'
import Images from '@/components/public/Images.vue'

/** 账号登录下拉 */
@Component({
  components: {
    Images,
  },
})
export default class HeaderAccount extends Vue {
  /** 账号入口 */
  accountEntrance: Router.Config[] = []
  /** 头像链接 */
  avatarUrl: string = ''
  /** jwt */
  @State jwt!: string
  /** 用户信息 */
  @State user!: User.Base
  /** 是否为移动端 */
  @State isMobile!: boolean

  created() {
    this.accountEntrance = [
      {
        name: '登录',
        cb: () => this.$observer.emit('login'),
      },
      {
        name: '注册',
        cb: () => this.$observer.emit('login', 'register'),
      },
    ]
  }

  /** 头像点击事件 */
  avatarClick() {
    if (this.isMobile) {
      this.accountEntrance[0].cb()
      this.$observer.emit('setHeaderOpenState', false)
    }
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
    max-height: 0;
    border-radius: 0 0 10px 10px;
    transform: translate(-30px, 11px);
    transition: 1s;
    backdrop-filter: saturate(180%) blur(20px);
    background-color: var(--c-bg-primary);

    li:hover {
      background-color: var(--c-bg-tertiary);
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
      transition: 0.5s 0.2s;
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
    opacity: 0.4;
    content: '登录';
    line-height: 100px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
