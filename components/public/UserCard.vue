<template>
  <!-- 用户信息展示卡片 -->
  <div class="row-box user-card">
    <template v-if="_userData && _userData.id">
      <div class="user-cover" :style="`background-image: url(${$config.ossLink}/user/card-bg-cover.jpg);`">
        <!-- <img class="user-avatar" :src="_userData.avatarUrl" :alt="_userData.nickname" :title="_userData.nickname"> -->
        <Imager class="user-avatar" :src="_userData.avatarUrl" :alt="_userData.nickname" :title="_userData.nickname" />
      </div>
      <div class="row-content">
        <div class="user-nickname">
          {{ _userData.nickname }}
          <i :class="['slm', 'blog-' + item.i]" :title="item.name" v-for="(item, key) in _userData.badge" :key="key"></i>
        </div>
        <div class="user-introduction line-ellipsis double-line-ellipsis">{{ _userData.introduction }}</div>
        <div class="user-state-row">
          <span class="stete-item" v-for="(item, index) in showState" :key="index">
            <div class="state-item-tag">{{ item }}</div>
            <div>{{ _userData.state[index] }}</div>
          </span>
        </div>
        <div class="user-entrance-row" v-if="userEntrance">
          <a-button type='primary' class="btn">关注</a-button>
          <a-button type='primary' class="btn">主页</a-button>
        </div>
        <div class="user-icon">
          <a
            class="icon-hover"
            target="_blank"
            v-for="(item, index) in showIcon"
            v-show="item.link(_userData)"
            :key="index"
            :class="[ 'slm', item.icon ]"
            :href="item.link(_userData)"
            :title="`访问 ${_userData.nickname} 的 ${item.title}`"
          ></a>
        </div>
      </div>
    </template>
    <UserCardSkeleton v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch }   from 'nuxt-property-decorator';

import { getUserBaseData } from '@/service/data/user.ts';
import { User } from '@/interface/request/user';
import { userData } from '@/mock/user/data/user.ts';

import UserCardSkeleton from '@/components/skeleton/pubCom/userCardSkeleton.vue';
import Imager from '@/components/public/Imager.vue';

/**
 * 用户信息展示卡片
 * - 用于展示用户的基本信息
 */
@Component({
  components: {
    UserCardSkeleton,
    Imager,
  },
})
export default class UserCard extends Vue {
  /**
   * 展示的用户ID
   */
  @Prop(Number) userId?: number;

  /**
   * 父级传入的用户数据 SSR
   */
  @Prop(Object) ssr?: User.Base;

  /**
   * 是否显示入户入口
   */
  @Prop(Boolean) userEntrance?: boolean;

  /**
   * 展示的用户状态
   */
  showState: { [key in string]: string } = {
    articleNumber: '文章',
    tagsNumber: '标签',
    commitNumber: '评论',
  };

  /**
   * 展示的图标
   */
  showIcon = {
    blog: {
      title: '个人博客',
      icon: 'blog-link',
      link: v => v?.link?.blog,
    },
    twitter: {
      title: 'Twitter',
      icon: 'blog-twitter',
      link: v => v?.link.twitter,
    },
    github: {
      title: 'GitHub',
      icon: 'blog-github',
      link: v => v?.link.github,
    },
    email: {
      title: '邮箱',
      icon: 'blog-email',
      link: v => v?.email,
    }
  }

  /**
   * 用户数据
   */
  private _userData: User.Base = userData;

  /**
   * userId的更新触发
   * - userData将在请求后被覆盖
   */
  @Watch('userId')
  userIdUpate(userId: number) {
    getUserBaseData(userId)
      .then(data => {
        if (Object.keys(data.result).length === 0) {
          return this._userData = this.errorData();
        }
        if (data.result) this._userData = data.result;
        this.$forceUpdate();
      })
    ;
  }

  /**
   * data的更新触发 [userData将被覆盖]
   */
  @Watch('ssr')
  ssrUpdate(data: User.Base) {
    if (Object.keys(data).length === 0) {
      return this._userData = this.errorData();
    }
    this._userData = Object.assign(userData, data);
  }


  created() {
    this.ssrUpdate(this.ssr || userData);
    if (this.userId) this.userIdUpate(this.userId);
  }


  /**
   * 用户信息获取失败时返回的信息
   */
  errorData() {
    return Object.assign(userData, {
      id: -1,
      nickname: '用户信息获取失败',
    });
  }
}
</script>

<style scoped lang="scss">
  .user-card {
    overflow: hidden;
    padding: 0;
  }

  .user-card /deep/ .row-content {
    padding: 35px 25px 10px;
    font-size: .7rem;
    text-align: center;

    .user-nickname {
      font-size: 1.2rem;
      font-weight: 500;
    }

    .user-introduction {
      margin-top: 10px;
    }

    .user-entrance-row {
      margin-top: 15px;

      .ant-btn {
        margin: 0 10px;
      }
    }

    .user-state-row {
      display: flex;
      margin-top: 20px;

      .stete-item {
        width: 100%;
        font-size: .8rem;
      }

      .state-item-tag {
        @include themify($themes) {
          color: themed('font-lv2-color');
        }
      }
    }

    .user-icon {
      display: flex;
      margin-top: 20px;
      justify-content: center;

      .slm {
        display: flex;
        width: 2rem;
        height: 2rem;
        margin: 0 10px;
        text-decoration: none;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .user-card /deep/ .user-cover {
    position: relative;
    min-height: 150px;
    background-repeat: no-repeat;
    background-size: cover;
    
    .user-avatar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 80px;
      height: 80px;
      margin: auto;
      border-radius: 50%;
      transform: translateY(40%);
      background-color: rgba($color: #000, $alpha: .2);
    }
  }
</style>