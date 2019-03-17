<template>
  <div class="article">

    <ul class="article-list">
      <li v-for="(item, index) in hot" :key="index">
        <img :src="item.img" :alt="item.title">
        <div class="ellipsis article-info">
          <router-link class="max-a" :to="{ name: 'article-id', params: { id: item.Id } }">
            <div class="ellipsis article-list-title" v-text="item.title"></div>
            <div class="ellipsis article-list-desc" v-text="item.description"></div>
            <div class="article-list-time">{{ item.createTime }}</div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {
      hot: {}
    }
  },
  mounted () {
    this.$axios.api({
      key: 'USER_ALL_ARTCILE',
      data: { id: this.user.id }
    })
      .get()
      .then(res => (this.hot = res))
  }
}
</script>

<style lang="less">
.user-center .article {
  .article-list {
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      align-items: center;
    }

    img {
      width: 20%;
      max-width: 100px;
      margin-right: 10px;
      border-radius: 5px;
    }

    .article-info {
      width: 100%;

      .article-list-title {
        font-size: 1.2rem;
      }

      .article-list-desc {
        color: #aaa;
      }

      .article-list-time {
        float: right;
        margin-top: 5px;
        font-size: .8rem;
        color: #ccc;
      }
    }
  }
}
</style>
