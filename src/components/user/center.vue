<template>
  <tbody class="conter single user-center">

    <!-- 顶部信息 -->
    <div class="content-box user-info" :style="`background-image: url(${user.bg || '//res.mczyzy.cn/img/user-bg.webp'})`">
      <div class="user-info-img">
        <img :src="user.img" alt="">
      </div>
      <div class="user-info-rmation">
        <div class="info-rmation-name">
          {{ user.username }}
          <span class="user-uid">[UID: {{ user.id }}]</span>
        </div>
        <div class="info-rmation-at">@{{ user.user }}</div>
        <div class="info-rmation-desc">{{ user.desc }}</div>
      </div>
      <div class="user-info-social">
        <button class="button-lv1">关注</button>
        <button class="button-lv1">私信</button>
      </div>
    </div>

    <div class="conter ">
      <div class="">

      </div>
    </div>
  </tbody>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = this.$store.state.user
    console.log(this.user)
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
  }

  @media screen and (max-width: 700px) {
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
    }
  }
</style>
