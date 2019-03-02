<template>
  <tbody class="conter single user-center">

    <!-- 顶部信息 -->
    <div class="content-box user-info" :style="`background-image: url(${user.bg || '//res.mczyzy.cn/img/user-bg.webp'})`">
      <div class="user-info-img">
        <img :src="user.img$ || '//res.mczyzy.cn/img/user-default.jpg'" alt="">
      </div>
      <div class="user-info-rmation">
        <div class="info-rmation-name">
          {{ user.username }}
          <span class="user-uid">[UID: {{ user.id }}]</span>
        </div>
        <div class="info-rmation-at">@{{ user.user }}</div>
        <div class="info-rmation-desc">{{ user.desc }}</div>
      </div>
      <div class="user-info-social" v-if="user.user != 'undefined'">
        <button class="button-lv1">关注</button>
        <button class="button-lv1">私信</button>
      </div>
    </div>

    <div class="conter clearfix" v-if="user.user != 'undefined'">
      <aside class="user-left-box">
        <ul class="content-box">
        </ul>
      </aside>
      <div class="content-box user-right-box">
        <ul class="clearfix user-right-nav">
          <li
            v-for="(item, index) in componentList"
            @click="componentSelect"
            :key="index"
            :class="{selected: componentId == index}"
            :data-id="index"
          >{{ item[0] }}</li>
        </ul>
        <!-- 外面这层是修复隐藏时会放大 -->
        <div class="user-page">
          <transition name="fade">
            <keep-alive>
              <component :is="componentList[componentId][1]" :user="user"></component>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </tbody>
</template>

<script>
let vue
export default {
  metaInfo: {
    titleTemplate: title => {
      return vue.user.username + title
    },
    title: `的个人中心`
  },
  data () {
    return {
      user: {},
      componentId: 0,
      // 组件列表
      componentList: [
        ['最新', resolve => require(['./center-index'], resolve)],
        ['热门', resolve => require(['./center-index2'], resolve)]
      ]
    }
  },
  created () {
    const user = this.$store.state.user
    const ID = this.$route.params.id

    if (ID) {
      // 查看他人中心
      this.$http.get(`/user/info/${ID}`)
        .then(res => {
          this.user = res.data
        })
        .catch(() => {
          this.user = {
            bg: false,
            id: '--',
            user: 'undefined',
            username: '未查找到此ID!',
            desc: '这个ID还没被注册 ฅ( ̳• ◡ • ̳)ฅ!'
          }
        })
    } else if (user) {
      // 查看个人中心
      this.user = user
    } else {
      // 未登录
      this.$router.push({
        name: 'login',
        query: {
          redirect: this.$router.history.current.path
        }
      })
    }
    vue = this
  },
  methods: {
    componentSelect (e) {
      const id = e.target.dataset.id
      if (id) {
        this.componentId = id
      }
    }
  }
}
</script>

<style lang="less">
.user-center {
  color: #353535;

  // 顶部
  .user-info {
      display: flex;
      min-height: 180px;
      margin: 20px 0;
      padding: 20px;
      background-color: #505d6c;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      flex-wrap: wrap;

      .user-info-img {
        margin-right: 50px;
        img {
          width: 140px;
          height: 100%;
          border-radius: 50%;
        }
      }

      .user-info-rmation {
        display: flex;
        padding: 10px 0;
        color: #eee;
        flex: 1 0 auto;
        flex-wrap: wrap;

        .info-rmation-name {
          width: 100%;
          font-size: 2rem;
          font-weight: bold;

          .user-uid {
            color: #ccc;
            font-size: 1.4rem;
            font-weight: 400;
          }
        }
        .info-rmation-at {
          width: 100%;
          font-size: 1.5rem;
          font-weight: 200;
        }
        .info-rmation-desc {
          width: 100%;
          font-size: 1rem;
          font-weight: 100;
        }
      }

      .user-info-social {
        display: flex;
        align-items: center;

        .button-lv1 {
          height: 2rem;
          margin: 0 10px;
        }
      }
  }

  .user-right-box {
    float: right;
    width: calc(100% - 310px);

    .user-right-nav {
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
      li {
        float: left;
        margin: 0 5px;
        padding: 5px;
        cursor: pointer;
      }
      .selected {
        border-bottom: 3px solid #6ed9f1;
      }
    }

    // 修复切换页放大的BUG
    .user-page {
      position: relative;
    }
  }

  .user-left-box {
    float: left;
    width: 300px;
  }

  .fade-enter, .fade-leave-to {
    position: absolute;
  }
}

@media screen and (max-width: 950px) {
  .user-center {
    // 顶部
    .user-info {
      background-size: auto 100%;

      .user-info-img {
        width: 100%;
        margin: 0 0 10px;
        img {
          display: block;
          margin: 0 auto;
        }
      }

      .user-info-rmation {
        text-align: center;
        flex: auto;
        & > div {
          margin-bottom: 10px;
        }
        .user-uid {
          display: none;
        }
      }

      .user-info-social {
        width: 100%;
        justify-content: center;
      }
    }

    .user-left-box,
    .user-right-box {
      width: 100%;
      margin: 5px 0;
    }
  }
}
</style>
