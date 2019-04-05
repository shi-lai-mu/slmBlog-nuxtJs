<template>
  <section class="conter single clearfix">
    <div class="content-box addArticle">

      <ul class="form">
        <li>
          <label>标题</label>
          <input type="text" v-model="title">
          <span class="bust">*</span>
        </li>
        <li>
          <label>分类</label>
          <input type="text" placeholder="#隔开" v-model="type">
          <span class="bust">*</span>
        </li>
        <li>
          <label>简介</label>
          <input type="text" placeholder="简短的介绍文章内容" v-model="description">
          <span class="bust">*</span>
        </li>
        <li>
          <input type="file" id="upload_file" style="display: none" accept="image/gif,image/jpeg,image/jpg,image/png" ref="uploadFile" @change="imgChange">

          <button class="button-lv1 upload_file" onclick="upload_file.click()" v-if="!webInput">{{ filePath ? '重新选择' : '上传本地封面' }}</button>
          <button class="button-lv1 upload_file" @click="webInput = !webInput" v-if="!filePath">{{ webInput ? '重新选择方式' : '网络调用封面' }}</button>
          <input type="text" v-if="webInput" placeholder="完整图片的路径 如 http://xxxxx/xxxxx/xx.jpg" v-model="webPath">

          <span :class="['file-path', { 'file-path-max': filePath }]" v-text="filePath"></span>
          <button v-if="filePath && !uploadPath" class="button-lv1 upload_file" @click="upload">确认上传</button>

          <div v-if="filePath || webPath" class="img-look-box">
            <span class="look">预览区域</span>
            <span class="look-info"  v-if="!uploadPath && !webPath">等待 确认上传 ...</span>
            <img :src="webPath || ('//res.mczyzy.cn/img/upload/' + uploadPath)" v-else>
          </div>

        </li>
      </ul>
      <label class="content-title">文章内容</label>
      <Editor ref="editor"></Editor>

      <button class="button-lv0 button-lv1 send" @click="send">{{ !editor ? '发表' : '保存' }}</button>
    </div>
  </section>
</template>

<script>
import Editor from '~/plugins/Editor'
export default {
  data () {
    return {
      filePath: null,
      uploadPath: null,
      webInput: false,
      webPath: null,
      title: null,
      type: null,
      editor: false,
      description: null
    }
  },
  mounted () {
    this.editor = this.$route.query.editor
    // this.$connecter.$emit('page', {
    //   title: {
    //     tag: !this.editor ? '发表文章' : '编辑文章',
    //     description: !this.editor ? '发表文章请注意原则哦!' : '修改时请注意格式哦!'
    //   }
    // })
    // 编辑文章模式
    if (!isNaN(this.editor)) {
      // 请求文章
      this.$axios
        .get('article/editorArticle/' + this.editor, {
          token: this.$store.state.user.token
        })
        .then(res => {
          this.article = res.data
          this.$refs.editor.Stores.set(this.article.content)
          this.type = this.article.type
          this.title = this.article.title
          this.webPath = this.article.img
          if (this.webPath.indexOf('//') === -1) {
            this.webPath = `//res.mczyzy.cn/img/upload/${this.webPath}`
          }
          this.description = this.article.description
        })
        .catch(() => {
          this.$router.go(-1)
        })
    }
  },
  methods: {

    /**
     * 实时路径
     */
    imgChange (e) {
      this.filePath = e.target.value
    },

    /**
     * 上传封面
     */
    upload (e) {
      let file = this.$refs.uploadFile.files[0]
      if (file) {
        let image = new FormData()
        image.append('file', file)
        this.$axios
          .post('https://io.slmblog.com/i.php?token=' + this.$store.state.user.token, image, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then(res => {
            if (res.data) {
              if (res.data[0]) {
                this.uploadPath = res.data[0]
                this.webPath = null
              }
            } else {
              console.log(res)
            }
          })
      }
    },

    /**
     * 发表文章按钮
     */
    send () {
      const content = this.$refs.editor.editorContent
      let err = (!this.title || this.title.length < 4)
        ? '标题不能为空或过短'
        : (!this.type || this.type.split('#').length < 1)
          ? '至少一个分类'
          : content.length < 10
            ? '这么点字...水军吧!!!'
            : false

      if (err) {
        this.$connecter.$emit('page', {
          toast: {
            text: err,
            icon: 'error'
          }
        })
      } else {
        let _user = this.$store.state.user
        let type = isNaN(this.editor) ? 'add' : 'unEditor'
        this.$http.post(`article/${type}`, {
          token: _user.token,
          title: this.title,
          type: this.type,
          content,
          uid: _user.id,
          img: this.webPath || this.uploadPath,
          description: this.description,
          editor: this.editor || false
        })
          .then(res => {
            if (res.data.ID) {
              this.$router.push({
                name: 'article',
                params: {
                  id: res.data.ID
                }
              })
              this.$refs.editor.Stores.clear()
            }
          })
      }
    }
  },
  components: { Editor }
}

</script>

<style lang="less">
.addArticle {
  .form {
    margin: 20px 0;

    li {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    input {
      width: 50%;
      min-width: 200px;
      margin: 10px;
      font-size: 1.2em;
      color: #ccc;
    }
  }
  .button-lv1 {
    border: 0;
  }

  label {
    float: left;
    width: 6em;
    font-size: 1.5em;
    user-select: none;
    &::after {
      content: ' :';
    }
  }
  .upload_file {
    display: inline-block;
    margin: 0 20px;
  }
  .file-path {
    overflow: hidden;
    max-width: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: 3s;
  }
  .file-path-max {
    max-width: 50vw;
  }
  .img-look-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 80%;
    border-radius: 10px;
    min-height: 20vw;
    margin: 20px 10%;
    background: #ccc var(--img-bg);

    .look,
    .look-info {
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 4.5em;
      font-weight: bold;
      color: rgba(255, 255, 255, .2);
      text-shadow: 0 0 10px rgba(0, 0, 0, .3);
    }
    .look-info {
      font-size: 1.3em;
      color: #777;
    }
    img {
      width: 100%;
    }
  }
  .bust {
    font-size: 1.5rem;
    font-weight: bold;
    color: red;
    user-select: none;
  }
  .content-title {
    width: 100%;
    padding-top: 20px;
    border-top: 1px solid #ccc;
    margin: 10px 0;
    text-indent: 5%;
  }
  .send {
    display: block;
    width: 90%;
    margin: 20px auto;
  }
}
</style>
