<template>
  <tbody class="conter single clearfix">
      <div :class="['content-box', 'article-index', { 'nick': article['title'] }, 'notContent']">

        <!-- 头部信息 -->
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

        <!-- 内容 -->
        <tbody class="article-body">
          <img class="article-img" :src="article.img" :alt="article.title + '文章封面'">
          <div v-html="article.content" ref="content"></div>
        </tbody>

        <!-- 尾部 -->
        <footer :class="['article-body', { none: !article.title }]">
          <!-- 留言 -->
          <ul class="article-message">
            <span class="message-tag">留言
              <span class="message-right">(20)</span>
            </span>
            <li v-for="(item, index) in 3" :key="index" class="clearfix">
              <div class="clearfix">
                <img src="//res.mczyzy.cn/img/user-default.jpg" alt="用户头像" class="user-icon">
                <span class="user-name">史莱姆</span>
                <span class="user-info">
                  2019年01月17日 下午7:03
                  <span class="message-right">11楼</span>
                </span>
              </div>
              <div class="message-content">
                12145649878971564564saaaaaaaaaaaaaasssssssssssssssssaa
              </div>
            </li>
          </ul>
          <Editor class="editor" ref="editor" model="send"></Editor>
          <button class="button-lv0 send" @click="send">留言</button>
        </footer>

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
  // 编辑器组件
  components: { Editor },
  created () {
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
        // 封面
        if (this.article.img.indexOf('//') === -1) {
          this.article.img = `//res.mczyzy.cn/img/upload/${this.article.img}`
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
      let user = this.$store.state.user
      if (user) {
        this.$http
          .post('article/addMessage', {
            id: this.$route.params.id,
            token: user.token,
            msg: this.$refs.editor.editorContent
          })
          .then(res => {
            console.log(res)
          })
        this.$refs.editor.Stores.clear()
      }
    }
  }
}
</script>
<style lang="less">
  @bgColor: #d6d6d6;
  // 伪装样式
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
  // 正文
  .article-index {

    header {
      width: 90%;
      border-bottom: 1px solid #ccc;
      margin: 0 auto 30px;
      i {
        margin: 0 5px 0 15px;
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
    // 留言样式
    .article-message {
      padding: 0;

      li {
        border-radius: 5px;
        padding: 10px;
        list-style: none;
        background-color: #eee;

        .user-icon {
          float: left;
          margin-left: 0;
        }
      }
      .message-tag {
        position: relative;
        display: block;
        padding: 5px 10px;
        color: #fff;
        background-color: #aed9f3;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          vertical-align: middle;
          background-color: #0085d8;
        }
      }
      .user-name,
      .user-info {
        float: left;
        overflow: hidden;
        width: calc(100% - 40px);
        box-sizing: border-box;
        padding-left: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .user-info {
        color: #aaa;
        font-size: 1rem;
      }
      .message-content {
        float: right;
        width: calc(100% - 60px);
        margin: 10px 5px;
        border-radius: 5px;
        padding: 10px;
        background-color: rgba(255, 255, 255, .8);
        word-wrap: break-word;
      }
      .message-right {
        float: right;
      }
    }
    .editor .w-e-toolbar,
    .editor .w-e-text-container {
      width: 100%;
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
