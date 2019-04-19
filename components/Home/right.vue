<template>
  <aside class="content-aff-box">

    <!-- 右侧 -->
    <div class="content-box blogger">
      <img :src="user.img" :alt="user.username">
      <p class="name" v-text="user.username"></p>
      <div class="select">
        <span v-if="isNaN(user.id)">
          <a class="button-lv0 button-blue" href="https://github.com/shi-lai-mu" target="_blank">关注</a>
          <router-link class="button-lv0 button-green" :to="{ name: 'other-me'}">了解</router-link>
        </span>
        <span v-else>
          <router-link class="button-lv0 button-green" :to="{ name: 'user-id', params: { id: user.id }}">管理</router-link>
        </span>
      </div>
    </div>

    <aside class="content-box">
      <span class="content-tag">
        <span>博客公告:</span>
        <p class="content-desc">
          <i class="iconfont icon-gonggao"></i>
          {{ right.notice.description }}
        </p>
      </span>
    </aside>

    <aside class="content-box">
      <span class="content-tag">
        <span>最新文章:</span>
      </span>
      <ol class="content-list" v-if="right.new">
        <li v-for="(item, key) in right.new.data" :key="key">
          <router-link class="max-a" :to="{ name: 'article-id', params: { id: item.Id } }">{{ item.title }}</router-link>
        </li>
      </ol>
    </aside>

    <aside class="content-box">
      <span class="content-tag">
        <span>友情链接:</span>
        <router-link to="/other/friendship" class="right">更多</router-link>
      </span>
      <ul class="content-list friendship" v-if="right.ship">
        <li v-for="(item, key) in right.ship.data" :key="key">
          <img :src="item.icon" :title="item.name + 'LOGO'">
          <a :href="item.web" target="_black">{{ item.name }}</a>
        </li>
      </ul>
    </aside>

  </aside>
</template>

<script>
export default {
  props: ['right'],
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="less">
  // 右侧
  .home .content-aff-box {
    float: right;
    width: 28%;

    .content-tag {
      position: relative;
      font-size: 1.2rem;
      color: #666;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;

      .right {
        font-size: 1rem;
        color: #ccc;
      }
      .icon-gonggao,
      .content-desc {
        margin: 5px;
        color: #888;
        font-size: .9rem;
      }

      &::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 100%;
        margin-left: -10px;
        border-radius: 0 5px 5px 0;
        background-color: #83e1f7;
      }
    }

    .content-list {
      margin: 10px 0;
      color: #888;

      li {
        margin: 5px 0;
      }
    }

    // 友情链接
    .friendship {
      position: relative;
      padding-left: 0;

      img {
        width: 20px;
        margin-right: 10px;
        vertical-align: middle;
      }

      li {
        width: 90%;
        margin-left: 5%;
        padding-bottom: 5px;
        list-style: inherit;
        border-bottom: 1px solid #eee;

        &:hover {
          color: #6bbcce;
        }
      }
    }

    ol li {
      margin-left: 7%;
      padding-bottom: 5px;
      list-style: inherit;
      border-bottom: 1px solid #eee;

      .max-a {
        position: initial;
      }
    }

    .content-box {
      width: 100%;
      margin-bottom: 20px;
      padding: 10px;
    }

    .blogger {
      padding-bottom: 10px;

      img {
        display: block;
        width: 100px;
        height: 100px;
        margin: 20px auto 10px;
        border: 10px solid rgba(99,196,218,.25);
        border-radius: 50%;
        -webkit-transition: .2s;
        transition: .2s;

        &:hover {
          border: 10px solid rgba(99,196,218,.4);
          -webkit-box-shadow: 0 5px 25px rgba(0,0,0,.15);
                  box-shadow: 0 5px 25px rgba(0,0,0,.15);
          -webkit-transform: translateY(-5px);
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
    }

    .button-lv0 {
      margin: 0 10px;
    }
  }
</style>
