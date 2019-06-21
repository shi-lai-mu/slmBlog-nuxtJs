<template>
  <div class="content-box blogger" v-show="updateTime">
    <img :src="user.img + '?v=' + updateTime" :alt="user.username">
    <p class="name" v-text="user.username"></p>
    <div class="select">
      <span v-if="isNaN(user.id)">
        <a class="button-lv0 button-blue" href="https://github.com/shi-lai-mu" target="_blank" title="shilaimu github">关注</a>
        <router-link class="button-lv0 button-green" :to="{ name: 'other-me'}">了解</router-link>
      </span>
      <span v-else>
        <router-link class="button-lv0 button-green" :to="{ name: 'user-id', params: { id: user.id }}">管理</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    updateTime: 0
  }),
  mounted() {
    // 解决异步加载导致头像未更新
    this.updateTime = Date.now()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scope>
.blogger {
  padding-bottom: 10px;

  img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 20px auto 10px;
    border: 10px solid rgba(99,196,218,.25);
    border-radius: 50%;
    transition: .2s;

    &:hover {
      border: 10px solid rgba(99,196,218,.4);
      box-shadow: 0 5px 25px rgba(0,0,0,.15);
      transform: translateY(-5px);
    }
  }

  .name {
    color: #999;
    font-size: 22px;
    text-align: center;
  }

  .select {
    margin: 10px;
    text-align: center;
  }

  .button-lv0 {
    margin: 0 10px;
  }
}
</style>