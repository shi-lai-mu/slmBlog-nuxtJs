<template>
  <tbody class="conter content-row clearfix">

    <span :class="[{ searchArticle }, { 'input-red': searchState }, 'article-input', 'content-box']">
      {{ searchArticle }}
      <i class="iconfont icon-wrong" @click="clearModel"></i>
    </span>
    <!-- 左侧 -->
    <div class="content-box article-list" @click="tagClick">
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
    </div>

    <!-- 右侧 -->
    <div class="content-aff-box">

      <div class="content-box blogger">
        <img v-lazy="'//thirdqq.qlogo.cn/g?b=sdk&k=s3zxCIMMOxfQibT9H8la8zg&s=100'" alt="史莱姆头像">
        <p class="name">史莱姆</p>
        <div class="select">
          <router-link class="button-lv0 button-blue" :to="{ name: 'login' }">关注</router-link>
          <router-link class="button-lv0 button-green" :to="{ name: 'thisSite' }">了解</router-link>
        </div>
      </div>

      <div class="content-box">
        <span class="content-tag">
          <span>最新文章:</span>
          <!-- <router-link to="/other/friendship" class="right">更多</router-link> -->
        </span>
        <ol class="content-list" v-if="rightList.new">
          <li v-for="(item, key) in rightList.new.data" :key="key">
            <router-link class="max-a" :to="{ name: 'article', params: { id: item.Id } }">{{ item.title }}</router-link>
          </li>
        </ol>
      </div>

      <div class="content-box">
        <span class="content-tag">
          <span>友情链接:</span>
          <router-link to="/other/friendship" class="right">更多</router-link>
        </span>
        <ul class="content-list friendship" v-if="rightList.ship">
          <li v-for="(item, key) in rightList.ship.data" :key="key">
            <img :src="item.icon" :title="item.name + 'LOGO'">
            <a :href="item.web" target="_black">{{ item.name }}</a>
          </li>
        </ul>
      </div>

    </div>
  </tbody>
</template>

<script>
export default {
  data () {
    return {
      hotList: [],
      rightList: [],
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

    /**
     * 点击标签事件
     */
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

    /**
     * 搜索文章
     */
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
          // 加载右侧数据
          this.loadRight()
        })
    },

    /**
     * 右侧数据加载
     */
    loadRight () {
      this.$http
        .get('blog/right')
        .then(res => {
          this.rightList = res.data
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

.content-row {
  margin-bottom: 40px;

  .right {
    float: right;
  }

  .content-box {
    overflow: hidden;
    padding: 0;
  }
  .content-tag {
    position: relative;
    margin: 10px;
    font-size: 1.2rem;
    color: #666;

    .right {
      font-size: 1rem;
      color: #ccc;
    }

    &::before {
      content: '';
      position: absolute;
      width: 5px;
      height: 100%;
      margin-left: -20px;
      border-radius: 0 5px 5px 0;
      background-color: #83e1f7;
    }
  }
  // 左侧
  .content-aff-box {
    float: right;
    width: 28%;

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
        list-style: inherit;
        margin-left: 5%;
        width: 90%;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
        list-style: inherit;

        &:hover {
          color: #6bbcce;
        }
      }
    }
    ol li {
      margin-left: 7%;
      list-style: inherit;
      padding-bottom: 5px;
      border-bottom: 1px solid #eee;
      .max-a {
        position: initial;
      }
    }

    .content-box {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
    }

    .blogger {
      padding-bottom: 10px;
      img {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 20px auto 10px;
        border: 10px solid rgba(99,196,218,.25);
        transition: .2s;
        &:hover {
          transform: translateY(-5px);
          border: 10px solid rgba(99,196,218,.4);
          box-shadow: 0 5px 25px rgba(0,0,0,.15);
        }
      }
      .name {
        color: #999;
        text-align: center;
        font-size: 22px;
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
}
.content-row .searchArticle {
  width: 100%;
  max-height: 100px;
  margin: 10px 0;
  padding: 10px;
  opacity: 1;
}
.article-input {
  max-height: 0;
  opacity: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .2);

  .icon-wrong {
    float: right;
    color: #ccc;
    cursor: pointer;
  }
}
.input-red {
  color: #fff;
  background-color: #eb3a42;
  .icon-wrong {
    color: currentColor;
  }
}
// 正文
.page {
  .page-num {
    line-height: 40px;
    vertical-align: middle;
    margin: 0 10px;
    input {
      width: 1rem;
      margin: 5px;
      border: 0;
      border-radius: 2px;
      text-align: right;
      background-color: #eee;
      user-select: all;
    }
  }
  .button-lv1 {
    margin: 5px 10px;
    background-color: #bef2fd;
  }
}
.article-list {
  margin-bottom: 20px;
}
.article {
  padding: 10px;
  border-top: 1px solid white;
  border-bottom: 1px solid #e8e8e8;
  text-align: left;
  vertical-align: text-top;
  cursor: pointer;

  &:nth-child(1) {
    border-top: 0;
  }

  &:hover {
    background-color: #f9f9f9;

    .article-parameter {
      background-color: #fff;
      color: #aaa;
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
    display: flex;
    justify-content: center;
    overflow: hidden;
    float: left;
    width: 23%;
    min-width: 100px;
    height: 7vw;
    max-height: 114px;
    min-height: 100px;
    border-radius: 5px;
    margin: 10px;
    pointer-events: none;

    img {
      height: 100%;
      transition: 1s;
      pointer-events: all;

      &:hover {
        transform: scale(1.5);
      }
    }
  }
  .article-tag li {
      display: inline-block;
      padding: 0 5px;
      border: 1px solid #e8e8e8;
      border-radius: 3px;
      margin: 0 5px;
      vertical-align: middle;
      font-size: .8rem;
      color: #999;
      background-color: #fff;
      transition: .3s;
      cursor: pointer;
      pointer-events: initial;

      &:hover {
        // background-color: #e9e9e9;
        border: 1px solid #999;
      }
  }
  // 掩饰
  .no-black {
    min-width: 8rem;
    border-radius: 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
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
</style>
