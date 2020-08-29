<template>
  <section>

    <div class="article-box-tag">
      <i class="iconfont icon-hot"></i>
      <h3>热门文章</h3>
    </div>

    <!-- 提示框 -->
    <span :class="['content-box', { searchArticle }, { 'input-red': searchState }, 'article-input']">
      <span v-html="searchArticle"></span>
      <i class="iconfont icon-wrong" @click="clearModel"></i>
    </span>

    <!-- 内容区域 -->
    <section class="content-box" @click="tagClick">
      <ul>
        <li class="article clearfix ellipsis" v-for="(hot, index) in (hotList.list || hot.list)" :key="index" :data-article="hot.Id">
          <div class="article-left">
            <img :src="hot.img" alt="images">
          </div>
          <div class="article-right ellipsis">
            <h3 class="ellipsis">{{ hot.title }}</h3>
            <p class="article-description ellipsis">{{ hot.description }}</p>
            <ul class="article-tag">
              <li v-for="(type, i) in hot.type" :key="i" :title="'查找 \'' + type + '\' 文章'" :data-tag="type">
                {{ type }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="page">
        <span class="page-num">
          <input onfocus="this.select()" v-model="page.num" @keyup.enter="pageSearch">/ {{ page.count }}
        </span>
        <span class="right">
          <button class="button-lv1" @click="pageSearch(--page.num)">上一页</button>
          <button class="button-lv1" @click="pageSearch(page.num++)">下一页</button>
        </span>
      </div>
    </section>

  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class HomeHot extends Vue {
  @Prop() hot: any;

  hotList = [];
  searchArticle ='';
  searchState = false;
  page = {
    all: 0,
    count: 0,
    num: 1
  };

  mounted () {
    this.observer.on('searchKeyWord', this.loadMaster) 
  }

  /* 点击标签事件 */
  tagClick (e) {
    let dataset = e.target.dataset

    // 关键词搜索
    if (dataset.tag) {
      this.loadMaster(dataset.tag)
      window.scrollTo(0, 0)
      return
    }

    // 打开文章
    if (dataset.article) {
      this.$router.push('article/' + dataset.article)
    }
  }

  /* 搜索文章 */
  loadMaster (keyword, page = 1) {
    let key = {}
    const slef = this
    if (keyword) {
      slef.searchArticle = `正在显示标签包含 '${keyword}' 的文章...`
      key = { page, keyword }
    }
    slef.$store.dispatch('ARTICLE_MODEL', key)
    slef.$axios
      .api('HOME_HOT')
      .get({ data: key })
      .then(data => {
        slef.hotList = data
      })
  }

  /* 文章跳转 */
  pageSearch (i) {
    if (i >= this.page.count) {
      this.page.num = this.page.count
      return
    }
    let page = this.page.num
    if (!isNaN(page) && page > 0) {
      this.loadMaster(page)
    } else this.page.num = 1
  }

  /* 清空文章模式 */
  clearModel () {
    const slef = this
    slef.$store.commit('CLEAR_ARTICLE_MODEL')
    slef.searchArticle = null
    slef.searchState = !1
    slef.hotList = []
  }
}
</script>

<style lang="less">
.article-list {
  // 提示框
  .article-input {
    max-height: 0;
    max-width: 100vw;
    opacity: 0;
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
            box-shadow: 0 2px 5px rgba(0, 0, 0, .2);

    .icon-wrong {
      float: right;
      color: #ccc;
      cursor: pointer;
    }

    &.searchArticle {
      width: 100%;
      max-height: 200px;
      margin-bottom: 10px;
      padding: 10px;
      opacity: 1;
    }

    &.input-red {
      color: #fff;
      background-color: #eb3a42;
      .icon-wrong {
        color: currentColor;
      }
    }
    li {
      list-style: inside
    }
  }

// 页数控制
  .page {
    .page-num {
      margin: 0 10px;
      line-height: 40px;
      vertical-align: middle;

      input {
        width: 1rem;
        margin: 5px;
        text-align: right;
        background-color: #eee;
        border: 0;
        border-radius: 2px;
        -webkit-user-select: all;
            -moz-user-select: all;
            -ms-user-select: all;
                user-select: all;
      }
    }

    .button-lv1 {
      margin: 5px 10px;
      background-color: #bef2fd;
    }
  }
}
</style>
