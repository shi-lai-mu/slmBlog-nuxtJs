<template>
  <tbody class="conter article-box">
    <section :class="['content-box', 'article-index', { 'nick': article['title'] }, 'notContent']">

        <!-- 头部信息 -->
        <atrcile-header :article="article" :unTime="unTime" :editor="editor" :notCon="notCon"></atrcile-header>

        <!-- 内容 -->
        <tbody class="article-body">
          <img class="article-img" :src="article.img" :alt="article.title + '文章封面'">
          <div v-html="article.content" ref="content"></div>
        </tbody>

        <!-- 尾部 -->
        <message :article="article" :unTime="unTime"></message>

    </section>
    <index-right :article="article" ref="artRight"></index-right>
  </tbody>
</template>

<script>
import Code from '@pub/js/code'
import Time from '@pub/js/dateForm'
import indexRight from './index-right'
import message from './message'
import atrcileHeader from './header'

export default {
  metaInfo () {
    return {
      title: '史莱姆的博客-' + (this.article.title || '博文')
    }
  },
  components: {
    indexRight,
    message,
    atrcileHeader
  },
  data () {
    return {
      article: {
        author: {}
      },
      notCon: true,
      editor: false
    }
  },
  created () {
    const slef = this
    // 请求文章内容
    slef.$http.get('article/' + slef.$route.params.id)
      .then(res => {
        let data = res.data
        let user = slef.$store.state.user

        // 是否有编辑权限
        if (user) {
          if (res.data.author.uid === user.id || user.groupid >= 9999) {
            slef.editor = !0
          }
        }

        // 封面
        if (data.img.indexOf('//') === -1) {
          data.img = `//res.mczyzy.cn/img/upload/${data.img}`
        }

        // 分类处理
        if (typeof data.type === 'string') {
          data.type = data.type.split('#')
          data.type.shift()
        }

        // 隐藏骨架
        slef.notCon = !1

        // 图像丢失处理
        slef.$nextTick(() => {
          if (slef.$refs.content) {
            let el = slef.$refs.content.getElementsByTagName('img')
            for (let i = 0, l = el.length; i < l; i++) {
              el[i].addEventListener('error', function () {
                slef.src = '//res.mczyzy.cn/img/error.png'
              })
            }
            // 语法高亮
            Code.parse(slef.$refs.content)
            // 执行导航树
            slef.$refs.artRight.getTreeElement(slef.$el)
          }
        })
        slef.article = data
      })
      .catch(() => {
        this.$router.push({
          name: 'error',
          query: {
            error: '文章丢失!',
            description: '找不到此文章啦...有可能是以下原因哦!',
            select: [
              '被删除',
              '被封禁'
            ]
          }
        })
      })
  },
  methods: {
    unTime: time => Time.form('yyyy-MM-dd HH:mm:ss', time * 1000)
  }
}
</script>

<style lang="less">
.article-box {
  position: relative;
  line-height: 0;
  @bgColor: #d6d6d6;

  // 伪装样式
  .notContent {
    -webkit-transition: .5s;
            transition: .5s;

    .article-body {
      -webkit-transition: .5s;
              transition: .5s;
      opacity: 0;
    }

    tbody.article-body {
      margin-bottom: 50px;
      border-bottom: 1px solid #ccc;
    }

    .notCon {
      width: 90%;
      border-top: 1px solid #ccc;
    }

    .article-title {
      display: block;
      width: 50%;
      min-height: 1rem;
      margin: 1.5rem auto;
      padding: 0 10px;
      color: #eee;
      background-color: @bgColor;
      border-radius: 30px;
      -webkit-transition: .5s;
              transition: .5s;
    }

    .notCon {
      -webkit-transition: .5s;
              transition: .5s;

      li {
        width: 100%;
        height: 1.5rem;
        margin: 1.5rem auto;
        background-color: @bgColor;
        border-radius: 1rem;
      }

      .not-p {
        width: 90%;
        margin-right: 0;
      }

      .not-end {
        width: 50%;
        margin-left: 0;
      }
    }
  }

  // 加载完
  .nick {
    .article-body {
      opacity: 1;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
    }

    .notCon {
      opacity: 0;
    }

    .notCon {
      max-height: 100vh;
      -webkit-animation: .5s notCon;
              animation: .5s notCon;
      -webkit-animation-fill-mode: forwards;
              animation-fill-mode: forwards;
    }

    .article-title {
      width: auto;
      color: inherit;
      background-color: transparent;
    }

    @-webkit-keyframes notCon {
      to {
        max-height: 0;
      }
    }

    @keyframes notCon {
      to {
        max-height: 0;
      }
    }

    h3.article-info {
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;

      span, i {
        padding: 0;
        color: inherit;
        background-color: transparent;
        border-radius: 0;
      }
    }

    .editor-link {
      margin-left: 10px;
      font-size: .6rem;
      font-weight: 100;
      color: #888;
      white-space: nowrap;
    }

    .icon-fatie {
      margin: 0;
    }
  }

  // 正文
  .article-index {
    width: calc(100% - 300px);
    border-radius: 5px 0 0 5px;

    header {
      width: 95%;
      margin: 0 auto 30px;
      border-bottom: 1px solid #ccc;

      i {
        margin: 0 5px 0 10px;
        color: #888;

        &::before {
          margin-right: 5px;
        }
      }
    }

    .article-img {
      display: block;
      margin: 10px auto;
    }

    .article-title {
      font-size: 2em;
      text-align: center;
    }

    .article-info {
      font-weight: 400;
      color: #555;
      text-align: center;

      span, i {
        padding: 0 10px;
        color: transparent;
        background-color: @bgColor;
        border-radius: 30px;
        -webkit-transition: .5s;
                transition: .5s;
      }
    }

    .nowrap {
      white-space: nowrap;
    }

    .article-body {
      width: 90%;
      margin: 0 auto 20px;
      padding-bottom: 30px;
      font-size: 1.2rem;

      p {
        word-break: break-all;
      }
    }
  }
}
</style>
