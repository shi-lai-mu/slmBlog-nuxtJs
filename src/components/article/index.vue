<template>
  <tbody class="conter single clearfix">
      <div :class="['content-box', 'article-index', { 'nick': article['title'] }, 'notContent']">

        <header>
          <h2 class="article-title">
            {{ article.title }}
            <router-link :to="{ name: 'againEditor', query: { editor: this.$route.params.id } }" class="editor-link" v-if="editor">
              <i class="iconfont icon-fatie"></i>重新编辑
            </router-link>
          </h2>
          <h3 class="article-info">
            <span class="nowrap">
              <span v-text="article.author.username"></span> 发表于：
              <i class="iconfont icon-shizhong" title="时间">{{ article.createTime && unTime(article.createTime) }}</i>
            </span>
            <span class="nowrap">
              <i class="iconfont icon-liaotian1" title="回复">{{ article.msg }}</i>
              <i class="iconfont icon-liulan" title="浏览">{{ article.lookCount }}</i>
            </span>
          </h3>
          <ul class="notCon" v-if="notCon">
            <li :class="[{ 'not-p': Math.random() > 0.6, 'not-end': Math.random() > 0.9 }]" v-for="i in 20" :key="i"></li>
          </ul>
        </header>

        <div class="article-body" v-html="article.content" ref="content"></div>

        <div :class="{ none: !article.title }">
          <Editor class="editor" ref="editor"></Editor>
          <button class="button-v1 send" @click="send">留言</button>
        </div>

      </div>
  </tbody>
</template>

<script>
import Time from '@pub/js/dateForm'
import Editor from '@pub/vue/Editor'
import Code from '@pub/js/code'

export default {
  data () {
    return {
      article: {
        author: {}
      },
      notCon: true,
      editor: false
    }
  },
  components: { Editor },
  created () {
    // 百度推送
    if (window.location.host !== '127.0.0.1') {
      (function () {
        var bp = document.createElement('script')
        bp.src = '//push.zhanzhang.baidu.com/push.js'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(bp, s)
      })()
    }
    this.$connecter.$emit('page', {
      title: {
        tag: '文章',
        description: '如果感觉文章对你有帮助,欢迎留言哦...'
      }
    })

    // 请求文章内容
    this.$http.get('article/' + this.$route.params.id)
      .then(res => {
        this.article = res.data
        let user = this.$store.state.user
        if (user) {
          if (res.data.author.uid === user.id) {
            this.editor = !0
          }
        }
        setTimeout(() => {
          this.notCon = !1
        }, 400)
        this.$nextTick(() => {
          let el = this.$refs.content.getElementsByTagName('img')
          for (let i = 0, l = el.length; i < l; i++) {
            el[i].addEventListener('error', function () {
              this.src = '//res.mczyzy.cn/img/error.png'
            })
          }
          // 语法高亮
          Code.parse(this.$refs.content)
        })
      })
      .catch(() => {
        this.$router.push({
          name: 'error',
          query: {
            error: '文章丢失!',
            description: '找不到此文章啦...有可能是以下原因哦!',
            select: [
              '被错误',
              '被删除',
              '被封禁'
            ]
          }
        })
      })
  },
  methods: {
    unTime: time => Time.form('yyyy-MM-dd HH:mm:ss', time * 1000),
    send () {
      this.$refs.editor.Stores.clear()
    }
  }
}
</script>
<style lang="less">
  .wrap button {
    position: absolute;
  }
  .no-mode-fade-enter-active, .no-mode-fade-leave-active {
    transition: all .5s
  }
  .no-mode-fade-enter, .no-mode-fade-leave-active {
    opacity: 0;
  }
  .no-mode-fade-enter {
    transform: translateX(100%);
  }
  .no-mode-fade-leave-active {
    transform: translateX(-100%);
  }
  @bgColor: #d6d6d6;
  .notContent {
    transition: .5s;

    .article-body {
      opacity: 0;
      transition: .5s;
    }
    .notCon {
      width: 90%;
      border-top: 1px solid #ccc;
      // margin: 40px auto 0;
    }

    .article-title {
      display: block;
      width: 50%;
      min-height: 1rem;
      padding: 0 10px;
      margin-left: auto;
      margin-right: auto;
      color: #eee;
      background-color: @bgColor;
      border-radius: 30px;
      transition: .5s;
    }
    .notCon {
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
    }
    .notCon {
      opacity: 0;
    }
    .notCon {
      animation: .5s notCon;
      max-height: 100vh;
      animation-fill-mode: forwards;
    }
    .article-title {
      width: auto;
      color: inherit;
      background-color: transparent;
    }
    @keyframes notCon {
      to {
        max-height: 0;
      }
    }
    h3.article-info {
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
  .article-index {

    header {
      width: 90%;
      border-bottom: 1px solid #ccc;
      margin: 0 auto 30px;
    }
    .article-title {
      font-size: 2em;
      text-align: center;
    }

    .article-info {
      text-align: center;
      font-weight: 400;
      color: #555;

      span, i {
        padding: 0 10px;
        color: transparent;
        background-color: @bgColor;
        border-radius: 30px;
        transition: .5s;
      }
    }

    header i {
      margin: 0 5px 0 15px;
      color: #888;
      &::before {
        margin-right: 5px;
      }
    }
    .nowrap {
      white-space: nowrap;
    }
    .article-body {
      width: 80%;
      padding-bottom: 30px;
      border-bottom: 1px solid #ccc;
      margin: 0 auto 20px;
      font-size: 1.2rem;

      p {
        text-indent: 2em;
        word-break: break-all;
      }
    }
    .ql-editor {
      display: block;
      min-height: 200px;
    }
    .send {
      float: right;
      width: 30%;
      max-width: 150px;
      border: 0;
      margin: 20px;
    }
  }
</style>
