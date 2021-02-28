<template>
  <!-- 用户信息展示卡片 [带骨架] -->
  <div class="row-box user-card">
    <template v-if="userData && userData.id">
      <!-- 背景图 -->
      <div class="user-cover" :style="`background-image: url(${$config.ossLink}/user/card-bg-cover.jpg);`">
        <Imager class="user-avatar" v-if="userData.avatarUrl" :src="userData.avatarUrl" :alt="userData.nickname" :title="userData.nickname" />
        <i class="slm blog-img-err user-avatar" v-else></i>
      </div>

      <!-- 内容部分 -->
      <div class="row-content">
        <!-- 头像 -->
        <div class="user-nickname">
          {{ userData.nickname }}
          <i :class="['slm', 'blog-' + item.i]" :title="item.name" v-for="(item, key) in userData.badge" :key="key"></i>
        </div>
        <!-- 简介 -->
        <div class="user-introduction line-ellipsis double-line-ellipsis">{{ userData.introduction || $config.user.card.defaultIntroduction }}</div>
        <!-- 人物状态 -->
        <div class="user-state-row" v-if="userState">
          <span class="stete-item" v-for="(item, index) in showState" :key="index">
            <div class="state-item-tag">{{ item }}</div>
            <div>{{ userData.state[index] || '--' }}</div>
          </span>
        </div>
        <!-- 用户管理入口 -->
        <div class="user-entrance-row user-self" v-if="userSelf && $store.state.user.id === userData.id">
          <a-button type='primary' class="btn">管理</a-button>
          <a-button type='primary' class="btn" @click="$router.push({ name: 'articleEditor' })">发文章</a-button>
          <a-button type='primary' class="btn">消息</a-button>
        </div>
        <!-- 关注入口 -->
        <div class="user-entrance-row" v-if="userEntrance">
          <a-button type='primary' class="btn">关注</a-button>
          <a-button type='primary' class="btn">主页</a-button>
        </div>
        <!-- 图标入口 -->
        <div class="user-icon">
          <a
            class="icon-hover"
            target="_blank"
            v-for="(item, index) in showIcon"
            v-show="item.link(userData)"
            :key="index"
            :class="[ 'slm', item.icon ]"
            :href="item.link(userData)"
            :title="`访问 ${userData.nickname} 的 ${item.title}`"
          ></a>
        </div>
      </div>
    </template>
    <UserCardSkeleton v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { getUserBaseData } from '@/core/service/data/user.ts';
import { User } from '@/interface/request/user';
import { userData } from '@/mock/user/data/user.ts';

import UserCardSkeleton from '@/components/skeleton/pubCom/userCardSkeleton.vue';
import Imager from '@/components/public/Imager.vue';

/**
 * 用户信息展示卡片
 * - 用于展示用户的基本信息
 */
@Component({
  name: 'UserCard',
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
   * 是否显示 入户入口
   */
  @Prop(Boolean) userEntrance?: boolean;

  /**
   * 是否显示 管理入口
   */
  @Prop(Boolean) userSelf?: boolean;

  /**
   * 是否显示 用户状态
   */
  @Prop(Boolean) userState?: boolean;

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
  userData: User.Base = userData;

  /**
   * data的更新触发 [userData将被覆盖] | userId的更新触发
   * - userData将在请求后被覆盖
   */
  @Watch('ssr')
  @Watch('userId')
  ssrUpdate(data: User.Base | number) {
    typeof data === 'number' 
      ? getUserBaseData(data).then(res => this.setRenderData(res.result))
      : this.setRenderData(data);
  }


  created() {
    this.ssrUpdate(this.userId || this.ssr || userData);
  }


  /**
   * 设置渲染属性
   */
  setRenderData(data) {
    if (Object.keys(data).length === 0) {
      return this.userData = this.errorData();
    }
    this.userData = Object.assign(userData, data);
  }


  /**
   * 用户信息获取失败时返回的信息
   */
  errorData() {
    return Object.assign(userData, {
      id: -1,
      nickname: '未知用户',
      introduction: '用户信息获取失败...'
    });
  }
}
</script>

<style  lang="scss" scoped>
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
      line-height: 80px;
      margin: auto;
      border-radius: 50%;
      transform: translateY(40%);
      background-color: rgba($color: #000, $alpha: .2);

      &.slm {
        text-align: center;
        font-size: 40px;
        background-color: rgba($color: #000, $alpha: .5);

        &::before {
          opacity: .5;
        }
      }
    }
  }
</style>