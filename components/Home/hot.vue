<template>
  <section>
    <div class="article-box-tag">
      <i class="iconfont icon-hot"></i>
      <span>热门文章</span>
    </div>
    <!-- 提示框 -->
    <span :class="['content-box', { searchArticle }, { 'input-red': searchState }, 'article-input']">
      <span v-html="searchArticle"></span>
      <i class="iconfont icon-wrong" @click="clearModel"></i>
    </span>
    <!-- 内容区域 -->
    <section class="content-box" @click="tagClick">
      <ul>
        <li class="article clearfix ellipsis" v-for="(hot, index) in hot.list" :key="index" :data-article="hot.Id">
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
      <ul v-if="!hot.list.length">
        <!-- 展示伪装 -->
        <li v-for="i in 5" :key="i" class="article clearfix">
          <div class="article-left">
            <div class="no-black"></div>
          </div>
          <div class="article-right look-center">
            <h3 class="no-black"></h3>
            <p class="article-description no-black"></p>
            <ul class="article-tag">
              <li v-for="i in 5" :key="i" class="no-black"></li>
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

<script>
import { mapState } from 'vuex'
export default {
  props: ['hot'],
  data () {
    return {
      hotList: [],
      searchArticle: '',
      searchState: false,
      page: {
        all: 0,
        count: 0,
        num: 1
      }
    }
  },
  created () {
    // 是否正在加载中
    this.loading = false
    // 加载主文章数据
    this.loadMaster()
    // 订阅搜索
//     this.observer.on('searchKeyWord', keyword => {
//       this.$store.state.articleModel.keyword = keyword
//       this.loadMaster()
//     })
  },
  beforeMount() {
  },
  methods: {
    /* 点击标签事件 */
    tagClick (e) {
      let dataset = e.target.dataset
      let state = this.$store.state

      if (dataset.tag) {
        // 关键词搜索
        state.articleModel.keyword = dataset.tag
        this.loadMaster()
        window.scrollTo(0, 0)
        return
      }
      // 打开文章
//       if (dataset.article) {
//         this.$router.push({
//           name: 'article',
//           params: {
//             id: dataset.article
//           }
//         })
//       }
    },

    /* 搜索文章 */
    loadMaster (page = 1) {
      let model = this.$store.state.articleModel
      if (model.keyword) {
        this.searchArticle = `正在显示标签包含 '${model.keyword}' 的文章...`
      }
      if (model) model.page = page
      // 热门内容
//       this.$axios
//         .get('blog/hot', model)
//         .then(res => {
//           const data = res.data
//           if (data.all) {
//             this.page = data
//             this.hotList = data.list.map(index => {
//               if (typeof index.type === 'string') {
//                 index.type = index.type.split('#')
//                 index.type.shift()
//                 if (index.img.indexOf('//') === -1) {
//                   index.img = `//slmblog.com/img/upload/${index.img}`
//                 }
//               }
//               return index
//             })
//           } else {
//             this.searchState = 'red'
//             this.searchArticle = `抱歉, 未找到关于 '${model.keyword}' 的文章，请尝试换一个关键词...`
//             this.$store.state.articleModel = false
//             this.loadMaster()
//           }
//         })
    },

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
    },

    /* 清空文章模式 */
    clearModel () {
      this.$store.state.articleModel = {}
      this.searchArticle = null
      this.searchState = !1
      this.loadMaster()
    }
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
