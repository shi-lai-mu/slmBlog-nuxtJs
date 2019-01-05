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
      </ul>
      <input type="file" id="upload_file" style="display: none" accept="image/gif,image/jpeg,image/jpg,image/png" ref="uploadFile" @change="imgChange">
      <button class="button-v1" onclick="upload_file.click()">选择 封面图片</button>
    </div>
  </div>
</template>

<script>
export default {
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
      console.log(e)
    }
  }
}
</script>

<style lang="less">
.addArticle {
  .form li {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
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
  .bust {
    font-size: 1.5rem;
    font-weight: bold;
    color: red;
    user-select: none;
  }
}
</style>
