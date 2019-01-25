/**
 * 音乐函数
 * @param {object} self vue
 */
export default function (vue) {

  // 音乐类
  return class Music {
    // 信息
    info = {}
    // 下载位置
    download = {}
    // 接口 [qq: QQ音乐, wy: 网易, dog: 酷狗 ...]
    type = 'qq'

    // 存储vue
    constructor () {
      // 默认音乐数据
      this.loadMusic({
        img: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000002aSuOt1oSJ5Z.jpg?max_age=2592000',
        src: 'http://123.157.255.144/amobile.music.tc.qq.com/C400001zFY0n2J2Eb0.m4a?guid=4041099672&vkey=01FAB8A50B37E41182CDAA8FD442B806E2EBC961FA7CB1333243B50B6B14D837E40A08380E04C0E91AE00A0C8CF0671C8B4D57CD3AF76DE3&uin=1251&fromtag=66',
        tag: '舞い落ちる雪のように'
      })
      this.$el = vue.$refs.music
    }

    /**
     * 载入音乐
     * @param {string} songmid 音乐MID
     */
    loadMusic (songmid) {
      vue.$http.get('http://127.0.0.1:8080/api/Music?fun=download&code=004RiqvD4Necim')
        .then(res => {
          if (res.data && res.data.length === 2) {
            this.info = JSON.parse(res.data[0])
            this.download = JSON.parse(res.data[1])
          }
        })
      // // 写入音乐数据
      vue.music = {
        obj: vue.music.vue,
        img: songmid.img,
        src: songmid.src,
        tag: songmid.tag
      }
    }

    /**
     * 播放音乐
     */
    play () {
      if (this.$el.play) {
        this.$el.play()
      }
    }

    /**
     * 播放音乐
     */
    stop () {
      if (this.$el.pause) {
        this.$el.pause()
      }
    }
  }
}
