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
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    let imgRoot = 'http://120.78.221.235/img/emoji/'

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
  }
}
</script>
