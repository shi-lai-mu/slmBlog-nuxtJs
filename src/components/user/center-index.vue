<template>
  <div class="article">

    <ul class="article-list">
      <li v-for="(item, index) in article.data" :key="index">
        <img :src="item.img" alt="">
        <div class="ellipsis article-info">
          <div class="ellipsis article-list-title">测试文章怎么在某种没怎么这么怎么怎么这么慢</div>
          <div class="ellipsis article-list-desc">测试文章怎么在某种没怎么这么怎么怎么这么慢</div>
          <div class="article-list-time">1550-50-13 09:00</div>
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
      article: {
        page: 1,
        data: []
      }
    }
  },
  created () {
    this.$http.get('article/getUserAll/0/0')
      .then(res => {
        this.article.data = res.data
      })
  }
}
</script>

<style lang="less">
.user-center .article {
  .article-list {
    li {
      display: flex;
      align-items: center;
    }

    img {
      width: 20%;
      max-width: 100px;
      margin-right: 10px;
    }

    .article-info {
      width: 100%;

      .article-list-title {
        font-size: 1.2rem;
      }

      .article-list-desc {
        color: #666;
      }

      .article-list-time {
        float: right;
        color: #999;
      }
    }
  }
}
</style>
