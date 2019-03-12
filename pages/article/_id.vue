<template>
  <section class="conter article-box">
    <article :class="['content-box', 'article-index', { 'nick': article['title'] }, 'notContent']">

        <!-- 头部信息 -->
        <atrcile-header :article="article" :unTime="unTime" :editor="editor" :notCon="notCon"></atrcile-header>

        <!-- 内容 -->
        <div class="article-body">
          <img class="article-img" :alt="article.title + '文章封面'" :src="article.img" v-if="article.img !== 'null'">
          <div v-html="article.content" ref="content"></div>
        </div>

        <!-- 尾部 -->
        <message :article="article" :unTime="unTime"></message>

    </article>
    <right :article="article" ref="artRight"></right>
  </section>
</template>

<script>
import Code from '~/plugins/code'
import { form } from '~/plugins/tool'
import right from '~/components/artcile/right'
import message from '~/components/artcile/message'
import atrcileHeader from '~/components/artcile/header'
 
export default {
  components: {
    right,
    message,
    atrcileHeader
  },
  data () {
    return {
      notCon: false,
      editor: false
    }
  },
  async asyncData ({ $axios, route }) {
    // 请求文章内容
    const article = await $axios.api({
      key: 'ARTCILE_CONTENT',
      data: {
        id: route.params.id
      }
    }).get()
    return { article }
//       .then(res => {
//         let data = res.data
//         let user = slef.$store.state.user
// 
//         // 是否有编辑权限
//         if (user) {
//           if (res.data.author.uid === user.id || user.groupid >= 9999) {
//             slef.editor = !0
//           }
//         }
// 
//         // 封面
//         if (data.img !== 'null' && data.img.indexOf('//') === -1) {
//           data.img = `//slmblog.com/img/upload/${data.img}`
//         }
// 
//         // 分类处理
//         if (typeof data.type === 'string') {
//           data.type = data.type.split('#')
//           data.type.shift()
//         }
// 
//         // 隐藏骨架
//         slef.notCon = !1
// 
//         // 图像丢失处理
//         slef.$nextTick(() => {
//           if (slef.$refs.content) {
//             let el = slef.$refs.content.getElementsByTagName('img')
//             for (let i = 0, l = el.length; i < l; i++) {
//               el[i].addEventListener('error', function () {
//                 slef.src = '//slmblog.com/img/error.png'
//               })
//             }
//             // 语法高亮
//             Code.parse(slef.$refs.content)
//             // 执行导航树
//             slef.$refs.artRight.getTreeElement(slef.$el)
//           }
//         })
//         slef.article = data
//       })
//       .catch(() => {
//         this.$router.push({
//           name: 'error',
//           query: {
//             error: '文章丢失!',
//             description: '找不到此文章啦...有可能是以下原因哦!',
//             select: [
//               '被删除',
//               '被封禁'
//             ]
//           }
//         })
//       })
  },
  methods: {
    unTime: time => form('yyyy-MM-dd HH:mm:ss', time * 1000)
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

    article.article-body {
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
