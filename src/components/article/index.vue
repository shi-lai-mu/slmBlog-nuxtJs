<template>
  <div class="content-row single clearfix">
    <div class="content-box article-index">
      <header>
        <h2 class="article-title">文章标题</h2>
        <h3 class="article-info">
          <span>shilaimu 发表于：<i class="iconfont icon-shizhong" title="时间">{{ unTime(article['createTime']) }}</i></span>
          <span>
            <i class="iconfont icon-liaotian1" title="回复">{{ article['msgMe'] }}</i>
            <i class="iconfont icon-liulan" title="浏览">{{ article['lookCount'] }}</i>
          </span>
        </h3>
      </header>
      <div class="article-body" v-html="article['content']"></div>
      <Editor></Editor>
    </div>
  </div>
</template>

<script>

import Time from '@pub/dateForm'
import Editor from '@pub/Editor'

export default {
  data () {
    return {
      article: [],
    }
  },
  components: { Editor },
  created () {
    console.log(12456)
    // this.$http.get('article/' + this.$route.params.id)
    //   .then(res => {
    //     this.article = res.data
    //   })
  },
  mounted () {
  },
  methods: {
    unTime: time => Time.form('yyyy-MM-dd HH:mm:ss', time * 1000)
  }
}
</script>
<style lang="less">
  .article-index {
    header {
      width: 98%;
      border-bottom: 1px solid #ccc;
      margin: 0 auto 30px;

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
      }
    }
    .article-body {
      width: 98%;
      margin: 0 auto 50px;

      p {
        text-indent: 2em;
        word-break: break-all;
      }
    }
    .ql-editor {
      display: block;
      min-height: 200px;
    }
  }
</style>
