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
              <span v-text="article.author.username"></span>
              <span>发表于：</span>
              <i class="iconfont icon-shizhong" title="时间">{{ article.createTime && unTime(article.createTime) }}</i>
            </span>
            <span class="nowrap">
              <i class="iconfont icon-liaotian1" title="回复">{{ article.msg ? article.msg.all : '--' }}</i>
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
          <ul class="article-message" v-if="article.msg">
            <span class="message-tag">
              <span>留言</span>
              <span class="message-right">({{ article.msg.all }})</span>
            </span>
            <li v-for="(item, index) in article.msg.list" :key="index" class="clearfix">
              <div class="clearfix">
                <img src="//res.mczyzy.cn/img/user-default.jpg" alt="用户头像" class="user-icon">
                <span class="user-name">{{ item.autherName }}</span>
                <span class="user-info">
                  {{ unTime(item.msgDate) }}
                  <span class="message-right">{{ item.level }}楼</span>
                </span>
              </div>
              <div class="message-content" v-html="item.content"></div>
            </li>
          </ul>
          <Editor class="editor" ref="editor" model="send"></Editor>
          <button class="button-lv0 send" @click="send">留言</button>
        </footer>

    </div>
    <div class="content-box article-right">
      <div class="article-right-box clearfix">
        <div class="binary">
          <i class="iconfont icon-shoucang-k"></i>收藏本文
        </div>
        <div class="binary">
          <i class="iconfont icon-fenxiang"></i>分享本文
        </div>
      </div>
      <div class="article-right-box clearfix">
        <label class="article-right-title">标签</label>
        <ul class="article-right-tag">
          <li v-for="(item, index) in article.type" :key="index" v-text="item" @click="searchKeyWord(item)"></li>
        </ul>
      </div>
      <div class="article-right-box clearfix">
        <label class="article-right-title">导航</label>
        <ul class="article-right-tree" v-if="article.tree">
          <li v-for="(item, index) in article.tree" :key="index">
            {{ item.tag }}
            <ul class="article-right-tree-sub" v-if="item.sub">
              <li class="ellipsis" v-for="(sub, key) in item.sub" :key="key" v-text="sub"></li>
            </ul>
          </li>
        </ul>
        <span v-else>抱歉,本文未找到导航!</span>
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
  // 编辑器组件
  components: { Editor },
  created () {
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

        // 分类处理
        if (typeof this.article.type === 'string') {
          this.article.type = this.article.type.split('#')
          this.article.type.shift()
        }

        // 隐藏骨架
        this.notCon = !1

        // 图像丢失处理
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

        // 导航树
        if (!this.article.tree) {
          let h2 = this.article.content.match(/<(h2|blockquote)[^>]*>.*?<\/(h2|blockquote)>/ig)
          let tree = []
          for (let i = 0, len = h2.length; i < len; i++) {
            const content = h2[i].replace(/(<(\/)?\w+[^>]*>|:|：)/g, '')
            // 添加根
            if (h2[i].search('h2') > -1) {
              tree.push({ tag: content })
            } else {
              let parent = i - 1
              // 找到父节点
              while (!tree[parent]) {
                parent--
              }
              // 添加叶节点
              if (!tree[parent].sub) {
                tree[parent].sub = []
              }
              tree[parent].sub.push(content)
            }
          }
          this.article.tree = tree

          // 导航节点
          
        }
      })
      .catch((err) => {
        console.log(err)
        // this.$router.push({
        //   name: 'error',
        //   query: {
        //     error: '文章丢失!',
        //     description: '找不到此文章啦...有可能是以下原因哦!',
        //     select: [
        //       '被删除',
        //       '被封禁'
        //     ]
        //   }
        // })
      })
  },
  methods: {
    unTime: time => Time.form('yyyy-MM-dd HH:mm:ss', time * 1000),

    /**
     * 发送留言
     */
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
    },

    /**
     * 搜索关键词
     */
    searchKeyWord (keyword) {
      this.$connecter.$emit('searchKeyWord', keyword)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style lang="less">
  @bgColor: #d6d6d6;
  .single {
    position: relative;
    line-height: 0;
  }
  .content-box {
    line-height: normal;
    &.article-index {
      width: calc(100% - 300px);
      border-radius: 5px 0 0 5px;
    }
    &.article-right {
      position: absolute;
      width: 300px;
      height: 100%;
      border-radius: 0 5px 5px 0;
      background-color: rgba(250, 250, 250, .8);
      box-shadow: 2px 3px 5px -2px rgba(0, 0, 0, 0.15)
    }
  }
  // 伪装样式
  .notContent {
    transition: .5s;

    .article-body {
      opacity: 0;
      transition: .5s;
    }
    tbody.article-body {
      margin-bottom: 50px;
      border-bottom: 1px solid #ccc;
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
      user-select: none;
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

    header {
      width: 95%;
      border-bottom: 1px solid #ccc;
      margin: 0 auto 30px;
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
      width: 90%;
      padding-bottom: 30px;
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
        border-radius: 0 5px 5px 0;
        border-top: 2px solid #f7be23;
        padding: 5px 10px;
        color: #fff;
        background-color: #f5d479;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background-color: #f7be23;
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
      p {
        margin: 0;
        text-indent: 0;
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
  // 正文
  .article-right-box {
    margin: 20px 0;
    // 二分
    .binary {
      float: left;
      width: 50%;
      font-size: 1.2rem;
      color: #666;
      cursor: pointer;

      &:hover {
        color: #333;
      }

      .iconfont {
        margin: 0 10px;
        font-size: 1.5rem;
        vertical-align: middle;
      }
    }

    .article-right-tag {
      li {
        float: left;
        margin: 5px 5px 5px 10px;
        border: 1px solid #ededed;
        border-radius: 5px;
        padding: 5px 15px;
        color: #888;
        background-color: #fff;
        cursor: pointer;
        &:hover {
          color: #444;
          border: 1px solid #666;
        }
      }
    }

    .article-right-title {
      position: relative;
      margin: 10px;
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1.2;

      &::after {
        content: '';
        position: absolute;
        left: -20px;
        width: 5px;
        height: 100%;
        border-radius: 0 5px 5px 0;
        background-color: rgba(0, 0, 0, .1);
      }
    }
    .article-right-tree {
      li {
        margin: 5px 20px;
        color: #888;
        cursor: pointer;

        &::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          margin: -2px 15px 0 10px;
          border: 3px solid rgba(0, 0, 0, .1);
          border-radius: 50%;
          vertical-align: middle;
        }
        &:hover {
          color: #333;

          &::before {
            border: 3px solid #70d7cf;
          }
        }
      }
      .article-right-tree-sub li {
        color: #ccc;
        &::before {
          border: 3px solid rgba(0, 0, 0, .05);
        }
        &:hover {
          color: #555;
          &::before {
            border: 3px solid #fb8869;
          }
        }
      }
    }
  }
  // 响应
  @media screen and (max-width: 1100px) {
    div.content-box {
      &.article-index {
        width: 100%;
      }
      &.article-right {
        display: none;
      }
    }
  }
</style>
