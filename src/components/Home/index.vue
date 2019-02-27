<template>
  <tbody class="conter content-row home">

    <!-- 提示框 -->
    <span :class="['content-box', { searchArticle }, { 'input-red': searchState }, 'article-input']">
      {{ searchArticle }}
      <i class="iconfont icon-wrong" @click="clearModel"></i>
    </span>

    <!-- 左侧 -->
    <section class="content-box article-list" @click="tagClick">
      <ul>
        <li class="article clearfix" v-for="(hot, index) in hotList" :key="index" :data-article="hot.Id">
          <div class="article-left">
            <img :src="hot.img" alt="images">
          </div>
          <div class="article-right">
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
      <ul v-if="!hotList.length">
        <!-- 展示伪装 -->
        <li v-for="i in 5" :key="i" class="article clearfix">
          <div class="article-left">
            <div class="no-black"></div>
          </div>
          <div class="article-right look-center">
            <h3 class="ellipsis no-black"></h3>
            <ul class="article-tag">
              <li v-for="i in 5" :key="i" class="no-black"></li>
            </ul>
            <p class="article-description no-black"></p>
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

    <home-right></home-right>
  </tbody>
</template>

<script>
import homeRight from './right'
export default {
  metaInfo: {
    title: `史莱姆的博客`
  },
  components: {
    homeRight
  },
  data () {
    return {
      hotList: [],
      searchArticle: null,
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
    this.$connecter.$on('searchKeyWord', keyword => {
      this.$store.state.articleModel.keyword = keyword
      this.loadMaster()
    })
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
      if (dataset.article) {
        this.$router.push({
          name: 'article',
          params: {
            id: dataset.article
          }
        })
      }
    },

    /* 搜索文章 */
    loadMaster (page = 1) {
      let model = this.$store.state.articleModel
      if (model.keyword) {
        this.searchArticle = `正在显示标签包含 '${model.keyword}' 的文章...`
      }
      if (model) model.page = page
      // 热门内容
      this.$http
        .get('blog/hot', model)
        .then(res => {
          const data = res.data
          if (data.all) {
            this.page = data
            this.hotList = data.list.map(index => {
              if (typeof index.type === 'string') {
                index.type = index.type.split('#')
                index.type.shift()
                if (index.img.indexOf('//') === -1) {
                  index.img = `//res.mczyzy.cn/img/upload/${index.img}`
                }
              }
              return index
            })
          } else {
            this.searchState = 'red'
            this.searchArticle = `抱歉, 未找到关于 '${model.keyword}' 的文章，请尝试换一个关键词...`
            this.$store.state.articleModel = false
            this.loadMaster()
          }
        })
    },

    /**
     * 文章跳转
     */
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

    /**
     * 清空文章模式
     */
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
@ip: '//res.mczyzy.cn/img';

.home {
  margin-bottom: 40px;

  .content-box {
    overflow: hidden;
    padding: 0;
  }

  // 提示框
  .article-input {
    max-height: 0;
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
      max-height: 100px;
      margin: 10px 0;
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
  }

  // 左侧
  .article-list {
    margin-bottom: 20px;

    .article {
      display: flex;
      padding: 10px;
      text-align: left;
      vertical-align: text-top;
      border-top: 1px solid white;
      border-bottom: 1px solid #e8e8e8;
      cursor: pointer;

      &:nth-child(1) {
        border-top: 0;
      }

      &:hover {
        background-color: #f9f9f9;

        .article-parameter {
          color: #aaa;
          background-color: #fff;
        }
      }

      .article-right {
        float: left;
        width: 60%;
        margin: 10px 15px;
        pointer-events: none;

        h3 {
          display: inline-block;
          padding: 10px 0;
          margin: 0;
          font-weight: 300;
        }

        .article-description {
          padding: 10px 5px;
          font-size: .9em;
          color: #aaa;
        }
      }

      .article-left {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        float: left;
        width: 23%;
        height: 7vw;
        min-width: 100px;
        min-height: 100px;
        max-height: 114px;
        margin: 10px;
        overflow: hidden;
        border-radius: 5px;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        pointer-events: none;

        img {
          height: 100%;
          -webkit-transition: 1s;
          transition: 1s;
          pointer-events: all;

          &:hover {
            -webkit-transform: scale(1.5);
                    transform: scale(1.5);
          }
        }
      }

      .article-tag li {
        display: inline-block;
        padding: 0 5px;
        margin: 0 5px;
        font-size: .8rem;
        color: #999;
        vertical-align: middle;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 3px;
        -webkit-transition: .3s;
        transition: .3s;
        pointer-events: initial;

        &:hover {
          border: 1px solid #999;
        }
      }

      // 骨架
      .no-black {
        min-width: 8rem;
        margin: 10px 0;
        background-color: #f1f1f1;
        border-radius: 10px;
      }

      li.no-black {
        min-width: 1rem;
        height: 1rem;
        border: 0;
      }

      .look-center {
        margin-top: 20px;
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

  .right {
    float: right;
  }

}
</style>
