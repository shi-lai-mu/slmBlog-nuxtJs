<template>
  <div class="article">

    <ul class="article-list">
      <li>
        <img src="//res.mczyzy.cn/img/upload/1549075226.png" alt="">
        <div>
          <div class="article-list-title">测试文章怎么在某种没怎么这么怎么怎么这么慢</div>
          <div class="article-list-desc">测试文章怎么在某种没怎么这么怎么怎么这么慢</div>
          <div class="article-list-title">测试文章怎么在某种没怎么这么怎么怎么这么慢</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created () {
    console.log(654321)
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

    .article-list-title {
      font-size: 1.2rem;
    }
    .article-list-desc {
      color: #666;
    }
  }
}
</style>

