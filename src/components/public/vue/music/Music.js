/**
 * 音乐函数
 * @param {object} self vue
 */
export default function (vue) {
  // console.log(vue)

  return class Music {
    // 存储vue
    constructor () {
      // 默认音乐数据
      vue.music = {
        obj: this,
        img: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000002aSuOt1oSJ5Z.jpg?max_age=2592000',
        src: 'http://123.157.255.144/amobile.music.tc.qq.com/C400001zFY0n2J2Eb0.m4a?guid=4041099672&vkey=01FAB8A50B37E41182CDAA8FD442B806E2EBC961FA7CB1333243B50B6B14D837E40A08380E04C0E91AE00A0C8CF0671C8B4D57CD3AF76DE3&uin=1251&fromtag=66',
        tag: '舞い落ちる雪のように'
      }
      this.$el = vue.$refs.music
      console.dir(this.$el)
      this.$el.play()
    }

    play () {
      this.$el.play()
    }
  }
}
