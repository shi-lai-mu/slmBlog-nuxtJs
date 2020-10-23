<template>
  <!-- 用户信息展示卡片 -->
  <div class="row-box user-card" v-if="userData.id">
    <div class="user-cover" :style="`background-image: url(${$config.ossLink}/user/card-bg-cover.jpg);`">
      <img class="user-avatar" :src="userData.avatarUrl" :alt="userData.nickname" :title="userData.nickname">
    </div>
    <div class="row-content">
      <div class="user-nickname">
        {{ userData.nickname }}
        <i :class="['slm', 'blog-' + item.i]" :title="item.name" v-for="(item, key) in userData.badge" :key="key"></i>
      </div>
      <div class="user-introduction">{{ userData.introduction }}</div>
      <div class="user-state-row">
        <span class="stete-item" v-for="(item, index) in showState" :key="index">
          <div class="state-item-tag">{{ item }}</div>
          <div>{{ userData.state[index] }}</div>
        </span>
      </div>
      <div class="user-icon">
        <a
          target="_blank"
          v-for="(item, index) in showIcon"
          v-show="item.link()"
          :key="index"
          :class="[ 'slm', item.icon ]"
          :href="item.link()"
          :title="`访问 ${userData.nickname} 的 ${item.title}`"
        ></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch }   from 'nuxt-property-decorator';
import { User } from '@/interface/user/index';
import { userData } from '@/mock/user/data/user';

@Component
export default class UserCard extends Vue {
  /**
   * 展示的用户ID
   */
  @Prop(Number) userId?: number;

  /**
   * 父级传入的用户数据
   */
  @Prop(Object) data?: User.Base;

  /**
   * 用户数据
   */
  userData: User.Base = userData;

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
      link: () => this.userData?.link.blog,
    },
    twitter: {
      title: 'Twitter',
      icon: 'blog-twitter',
      link: () => this.userData?.link.twitter,
    },
    github: {
      title: 'GitHub',
      icon: 'blog-github',
      link: () => this.userData?.link.github,
    },
    email: {
      title: '邮箱',
      icon: 'blog-email',
      link: () => this.userData?.email,
    }
  }

  /**
   * userId的更新触发
   * - userData将在请求后被覆盖
   */
  @Watch('userId')
  userIdUpate(userId: number) {
    const { $http } = this;
    $http
      .send($http.user.data, {
        params: {
          id: userId,
        },
      })
      .then(data => {
        if (data.result) {
          this.userData = data.result;
        }
      })
    ;
  }

  /**
   * data的更新触发
   * - userData将被覆盖
   */
  @Watch('data')
  dataUpdate(data: User.Base) {
    this.userData = data;
  }


  created() {
    if (this.data) this.dataUpdate(this.data);
    if (this.userId) this.userIdUpate(this.userId);
  }
}
</script>

<style scoped lang="scss">
  .user-card {
    overflow: hidden;
    padding: 0;

    .row-content {
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
          display: block;
          margin: 0 10px;
          text-decoration: none;
        }
      }
    }
  }

  .user-cover {
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