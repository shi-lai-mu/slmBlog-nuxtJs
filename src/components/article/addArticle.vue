<template>
  <div class="content-row single clearfix">
    <div class="content-box addArticle">

      <ul class="form">
        <li>
          <label>标题</label>
          <input type="text">
          <span class="bust">*</span>
        </li>
        <li>
          <label>分类</label>
          <input type="text" placeholder="# 隔开分类">
          <span class="bust">*</span>
        </li>
        <li>
          <input type="file" id="upload_file" style="display: none" accept="image/gif,image/jpeg,image/jpg,image/png" ref="uploadFile" @change="imgChange">
          <button class="button-v1 upload_file" onclick="upload_file.click()">{{ filePath ? '重新选择' : '选择 封面图片' }}</button>
          <span :class="['file-path', { 'file-path-max': filePath }]" v-text="filePath"></span>
          <button v-if="filePath" class="button-v1 upload_file" @click="upload">确认上传</button>
          <div v-if="filePath" class="img-look-box">
            <span class="look">预览区域</span>
            <span class="look-info">等待 确认上传 ...</span>
          </div>
        </li>
      </ul>
      <label class="content-title">文章内容</label>
      <editor></editor>
    </div>
  </div>
</template>

<script>
import editor from '@pub/vue/Editor'
export default {
  data () {
    return {
      filePath: null
    }
  },
  created () {
    this.$connecter.$emit('page', {
      title: {
        tag: '发表文章',
        description: '发表文章请注意原则哦!!!'
      }
    })
  },
  methods: {
    imgChange (e) {
      this.filePath = e.target.value
    },
    upload (e) {
      let file = this.$refs.uploadFile.files[0]
      if (file) {
        let image = new FormData()
        image.append('file', file)
        console.log(image, this.$store.state.user)
        this.$http.post('http://120.78.221.235/file/i.php?token=' + this.$store.state.user.token, image, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            console.log(res)
          })
      }
    }
  },
  components: { editor }
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
  input {
    width: 50%;
    min-width: 200px;
    margin: 10px;
    font-size: 1.2em;
    color: #ccc;
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
      display: block;
      width: 100%;
      text-align: center;
      font-size: 4.5em;
      font-weight: bold;
      color: #bbb;
    }
    .look-info {
      font-size: 1.3em;
      color: #777;
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
}
</style>
