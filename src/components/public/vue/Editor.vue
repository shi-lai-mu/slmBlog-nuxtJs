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

    // 自动保存编辑器内容
    let Store = (function (self) {
      return class {
        // IO存储的数据对象
        value = {}
        // 当前路由
        path = self.$router.history.current.path

        constructor () {
          let stroe = localStorage.getItem('editor')
          let _this = this
          if (stroe) {
            _this.value = JSON.parse(localStorage.getItem('editor'))
          }
          // 如果上次未编辑完则保存
          if (_this.value[_this.path]) {
            editor.txt.html(_this.value[_this.path])
          }
        }

        // 清空编辑器内容
        clear () {
          this.set()
          editor.txt.html('')
        }

        set (val) {
          this.value[this.path] = val
          if (!val) delete this.value[this.path]
          localStorage.setItem('editor', JSON.stringify(this.value))
        }
      }
    })(this)

    // 输入时赋值到全局
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
      clearTimeout(inster)
      inster = setTimeout(() => {
        this.Stores.set(this.editorContent)
      }, 1500)
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
    editor.create()
    this.Stores = new Store()
  }
}
</script>
