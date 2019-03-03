<template>
  <footer :class="['article-body', { none: !article.title }]">

    <div class="clearfix">
      <ul class="tourists" v-if="!user">
        <li><label>昵称：</label><input type="text" v-model="username"></li>
      </ul>
      <Editor class="editor" ref="editor" model="send"></Editor>
      <button class="button-lv0 send" @click="send">留言</button>
    </div>

    <!-- 留言 -->
    <ul class="article-message" v-if="article.msg">
      <span class="message-tag">
        <span>留言</span>
        <span class="message-right">({{ article.msg.all }})</span>
      </span>
      <!-- 留言内容 -->
      <li v-for="(item, index) in article.msg.list" :key="index" class="clearfix">
        <div class="clearfix">
          <img src="//res.mczyzy.cn/img/user-default.jpg" alt="用户头像" class="user-icon">
          <span class="user-name" v-if="item.autherID < 0">{{ item.autherName }} <sup>游客</sup></span>
          <router-link class="user-name" :to="'/user/' + item.autherName" v-else>{{ item.autherName }}</router-link>
          <span class="user-info">
            {{ unTime(item.msgDate) }}
            <span class="message-right">{{ item.level }}楼</span>
          </span>
        </div>
        <div class="message-content" v-html="item.content"></div>
      </li>
    </ul>

  </footer>
</template>

<script>
import Editor from '@pub/vue/Editor'
export default {
  props: ['article', 'unTime'],
  components: {
    Editor
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      username: null
    }
  },
  created () {
    this.username = localStorage.getItem('message-username')
  },
  methods: {
    /* 发送留言 */
    send () {
      let user = this.user
      const content = this.$refs.editor.editorContent
      if (!user) {
        // 游客留言
        if (this.username) {
          user = {
            token: this.username
          }
        } else {
          return this.$connecter.$emit('page', {
            toast: {
              icon: 'error',
              text: '游客需要填写昵称才能留言!'
            }
          })
        }
      }
      if (!content || content.length < 10) {
        return this.$connecter.$emit('page', {
          toast: {
            icon: 'error',
            text: '留言内容过少!'
          }
        })
      }
      this.$http
        .post('article/addMessage', {
          id: this.$route.params.id,
          token: user.token,
          msg: this.$refs.editor.editorContent
        })
        .then(res => {
          // 留言成功
          const data = res.data
          this.article.msg.all++
          this.article.msg.list.unshift({
            ...data,
            level: this.article.msg.all
          })
          this.$connecter.$emit('page', {
            toast: {
              icon: 'success',
              text: '留言成功,感谢留言会让作者更加有动力哦!'
            }
          })
          localStorage.setItem('message-username', this.username)
          this.$refs.editor.Stores.clear()
        })
    }
  }
}
</script>

<style lang="less">
.article-index {
  // 留言样式
  .article-message {
    padding: 0;

    li {
      padding: 10px;
      list-style: none;
      background-color: #eee;
      border-radius: 5px;

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
      background-color: #f5d479;
      border-top: 2px solid #f7be23;
      border-radius: 0 5px 5px 0;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: #f7be23;
        content: "";
      }
    }

    .user-name,
    .user-info {
      float: left;
      width: calc(100% - 40px);
      overflow: hidden;
      padding: 1px 0 0 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;

      sup {
        padding: 0 2px;
        color: #999;
        border: 1px solid currentColor;
        border-radius: 3px;
      }
    }

    .user-info {
      font-size: 1rem;
      color: #aaa;
    }

    .message-content {
      float: right;
      width: calc(100% - 60px);
      margin: 10px 5px;
      padding: 10px;
      background-color: rgba(255, 255, 255, .8);
      border-radius: 5px;
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
    margin: 20px;
    border: 0;
  }

  .tourists {
    display: flex;
    margin-top: 30px;
    padding-left: 0;
    justify-content: space-between;

    li {
      padding-left: 0;
      list-style: none;
    }

    label {
      white-space: nowrap;
    }

    input {
      font-size: 1rem;
      background-color: transparent;
      border: 1px solid #ccc;
      border-radius: 3px;
      vertical-align: middle;
    }
  }
  @media screen and (max-width: 800px) {
    .tourists {
      display: block;

      li {
        display: flex;
      }

      input {
        width: 100%;
      }
    }
  }
}
</style>
