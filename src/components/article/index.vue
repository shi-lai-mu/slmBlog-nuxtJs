<template>
  <div class="content-row single clearfix">
    <div :class="['content-box', 'article-index', { 'nick': article['title'] }, 'notContent']">

      <header>
        <h2 class="article-title">{{ article['title'] || 'loading...' }}</h2>
        <h3 class="article-info">
          <span>shilaimu 发表于：<i class="iconfont icon-shizhong" title="时间">{{ article['createTime'] && unTime(article['createTime']) }}</i></span>
          <i class="iconfont icon-liaotian1" title="回复">{{ article['msgMe'] }}</i>
          <i class="iconfont icon-liulan" title="浏览">{{ article['lookCount'] }}</i>
        </h3>
        <ul class="notCon" v-if="notCon">
          <li class="notP"></li>
          <li></li>
          <li class="notEnd"></li>
          <li class="notP"></li>
          <li></li>
          <li></li>
          <li class="notEnd"></li>
          <li class="notP"></li>
          <li></li>
          <li></li>
          <li></li>
          <li class="notEnd"></li>
        </ul>
      </header>

      <div class="article-body" v-html="article['content']" ref="content"></div>

      <div v-if="article['title']">
        <Editor class="editor" ref="editor"></Editor>
        <button class="button-v1 send">发送</button>
      </div>

    </div>
  </div>
</template>

<script>

import Time from '@pub/js/dateForm'
import Editor from '@pub/vue/Editor'

export default {
  data () {
    return {
      article: [],
      notCon: true
    }
  },
  components: { Editor },
  created () {
    let self = this
    this.$http.get('article/' + this.$route.params.id)
      .then(res => {
        this.article = res.data
        setTimeout(() => {
          this.notCon = !1
        }, 400)
        let el = this.$refs.content.getElementsByTagName('img').array.forEach(element => {
          element.addEventLister('error', () => {
            console.log(11)
          })
        });
      })
  },
  methods: {
    unTime: time => Time.form('yyyy-MM-dd HH:mm:ss', time * 1000)
  }
}
</script>
<style lang="less">
  @bgColor: #d6d6d6;
  .notContent {
    transition: 1s;

    .article-body {
      opacity: 0;
      transition: 1s;
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
      transition: 1s;
    }
    .notCon {
      transition: 1s;
      li {
        width: 100%;
        height: 1.5rem;
        margin: 1.5rem auto;
        background-color: @bgColor;
        border-radius: 1rem;
      }

      .notP {
        width: 90%;
        margin-right: 0;
      }
      .notEnd {
        width: 50%;
        margin-left: 0;
      }
    }
  }
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
        transition: 1s;
      }
    }

    i {
      margin: 0 5px 0 15px;
      color: #888;
      &::before {
        margin-right: 5px;
      }
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
