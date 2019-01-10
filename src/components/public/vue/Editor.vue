<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import 'wangeditor/release/wangEditor.css'
import E from 'wangeditor'
export default {
  name: 'editor',
  data () {
    return {
      editorContent: ''
    }
  },
  mounted () {
    let editor = new E(this.$refs.editor)
    let inster = null
    let name = this.$router.history.current.path
    let storage = localStorage.getItem('editor') || {}

    // 输入时赋值到全局
    editor.customConfig.onchange = (html) => {
      this.editorContent = html

      // 自动保存内容
      clearTimeout(inster)
      inster = setTimeout(() => {
        storage[name] = this.editorContent
        localStorage.setItem('editor', storage[name])
      }, 1500)
    }
    editor.create()
    // 如果上次未编辑完则保存
    if (storage[name]) {
      editor.txt.html(storage[name])
    }

    let imgRoot = 'http://res.mczyzy.cn/img/emoji/'
    editor.customConfig.uploadImgServer = this.$store.state.user ? 'http://120.78.221.235/file/i.php?token=' + this.$store.state.user.token : false
    editor.customConfig.imgIp = 'http://120.78.221.235/img/upload/'
    // 表情配置
    let lyList = []
    let i = 1
    for (i; i < 21; i++) {
      lyList.push({
        alt: '加載中...',
        src: `${imgRoot}${i}.jpg`,
        style: 'width: 59px'
      })
    }
    editor.customConfig.emotions = [
      {
        title: '凜音',
        type: 'image',
        content: lyList
      }
    ]
  },
  methods: {
    hh () {
      console.log(12654)
    }
  }
}
</script>
