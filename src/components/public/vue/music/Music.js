/**
 * 音乐函数
 * @param {object} self vue
 */
export default function (vue) {
  // 观察者
  // let observe = new (class obServer {
  //   task = []
  //   // 订阅
  //   $on (key, callback) {
  //     !this.task[key] && (this.task[key] = [])
  //     this.task[key].push(callback)
  //   }
  //   // 发布
  //   $emit (key, data) {
  //     if (this.task[key]) {
  //       this.task[key].forEach(fun => fun(data))
  //     }
  //   }
  // })()

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
      this.loadMusic()
      this.$el = vue.$refs.music
    }

    /**
     * 载入音乐
     * @param {string} songmid 音乐MID
     */
    loadMusic (songmid) {
      // 音乐信息
      vue.$http
        .get('/api/Music?fun=getMusicInfo&code=004RiqvD4Necim')
        .then(res => {
          console.log(res)
          if (res.data) {
            this.info = res.data.data
            this.writeView()
          } else throw Error(`请求[ ${songmid} ]音乐数据错误!`)
        })
        .catch(() => {
          throw Error(`音乐获取失败, 请及时进行维护!!!`)
        })

      // 音乐下载地址 [最高无损]
      vue.$http
        .get('/api/Music?fun=download&code=004RiqvD4Necim')
        .then(res => {
          console.log(res)
          if (res.data) {
            this.download = res.data
            this.writeView()
          } else throw Error(`请求[ ${songmid} ]下载数据错误!`)
        })
        .catch(() => {
          throw Error(`破解请求过于频繁,请稍后再试!`)
        })
    }

    /**
     * 音乐数据写入视图
     */
    writeView () {
      if (!this.info.mid) return
      // 默认播放 m4a 格式音乐
      // 数据顺序 对象, 封面图片, 播放路径, 歌名, 歌手, 歌简介, 歌上传时间, 相似歌曲
      vue.music = {
        obj: vue.music.vue,
        img: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${this.info.mid}.jpg`,
        src: this.download.m4a,
        tag: this.info.name,
        singername: this.info.singername,
        description: this.info.desc,
        upload: this.info.aDate,
        list: this.info.list
      }
      vue.$connecter.$emit('music')
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
