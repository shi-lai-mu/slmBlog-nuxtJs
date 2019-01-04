<template>
  <div class="content-row single clearfix">
    <div :class="['content-box', 'article-index', { 'notContent': !article['title'] }]">
      <header>
        <h2 class="article-title" v-text="article['title']"></h2>
        <h3 class="article-info">
          <span>shilaimu 发表于：<i class="iconfont icon-shizhong" title="时间">{{ article['createTime'] && unTime(article['createTime']) }}</i></span>
          <span>
            <i class="iconfont icon-liaotian1" title="回复">{{ article['msgMe'] }}</i>
            <i class="iconfont icon-liulan" title="浏览">{{ article['lookCount'] }}</i>
          </span>
          <ul v-if="!article['title']" class="notCon">
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
        </h3>
      </header>
      <div class="article-body" v-html="article['content']"></div>
      <Editor class="editor" ref="editor"></Editor>
      <button class="button-v1 send">发送</button>
    </div>
  </div>
</template>

<script>

import Time from '@pub/dateForm'
import Editor from '@pub/Editor'

export default {
  data () {
    return {
      article: []
    }
  },
  components: { Editor },
  created () {
    this.$http.get('article/' + this.$route.params.id)
      .then(res => {
        this.article = res.data
      })
    console.log(this.$refs.editor.editorContent)
  },
  methods: {
    unTime: time => Time.form('yyyy-MM-dd HH:mm:ss', time * 1000)
  }
}
</script>
<style lang="less">
  .notContent {
    @bgColor: #d6d6d6;

    .notCon {
      width: 90%;
      border-top: 1px solid #ccc;
      margin: 40px auto 0;
    }

    .article-title {
      width: 30%;
      height: 1.5rem;
      margin-left: auto;
      margin-right: auto;
      background-color: @bgColor;
      border-radius: 1rem;
      transition: 1s;
    }
    .notCon {
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
  .article-index {
    .notContent header {
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
