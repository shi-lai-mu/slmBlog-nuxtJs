<template>
  <section class="conter article-box">
    <article class="content-box article-index">

      <!-- 头部信息 -->
      <atrcile-header :article="article" :unTime="unTime" :editor="editor"></atrcile-header>

      <!-- 内容 -->
      <div class="article-body">
        <img class="article-img" :alt="article.title + '文章封面'" :src="article.img" v-if="article.img">
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
  data () {
    return {
      editor: false
    }
  },
  head () {
    const art = this.article
    return {
      title: art.title + '-史莱姆的博客',
      meta: [
        { name: 'description', hid: 'description', itemprop: 'description', content: art.description },
        { itemprop: 'name', hid: 'qqname', content: '史莱姆的博客-' + art.title },
        { itemprop: 'image', hid: 'qqlogo', content: art.img ? art.img : 'https://img.slmblog.com/QQLOGO.jpg' }
      ]
    }
  },
  components: {
    right,
    message,
    atrcileHeader
  },
  async asyncData ({ $axios, route }) {
    // 请求文章内容
    let id = route.params.id
    if (!/^\d+$/.test(id)) {
      return {
        article: {
          author: {}
        }
      }
    }
    const article = await $axios
      .api({
        key: 'ARTCILE_CONTENT',
        data: { id }
      })
      .cache()
      // .catch(() => {
      //   this.$router.go(-1)
      // })
    return { article }
  },
  mounted () {
    this.$nextTick(() => {
      const that = this
      Code.parse(that.$refs.content)
      const user = that.$store.state.user
      const data = that.article

      // 是否有编辑权限
      if (user) {
        if (data.author.uid === user.id || user.groupid >= 9999) {
          that.editor = !0
        }
      }
    })
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

  // 正文
  .article-index {
    width: calc(100% - 300px);
    border-radius: 5px 0 0 5px;
    opacity: 1;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

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
    }

    .article-body {
      width: 90%;
      margin: 0 auto 20px;
      padding-bottom: 30px;
      font-size: 1.2rem;
      transform: translateY(100px);
      animation: article-up 1s .2s;
      animation-fill-mode: forwards;

      p {
        word-break: break-all;
      }
    }
    @keyframes article-up {
      to {
        transform: translateY(0);
      }
    }
  }
}
</style>
