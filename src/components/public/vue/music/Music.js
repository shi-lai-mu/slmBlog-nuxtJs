/**
 * 音乐函数
 * @param {object} self vue Object
 */
export default function (vue) {
  // 观察者
  let observer = new (class obServer {
    task = []
    // 订阅
    $on (key, callback) {
      !this.task[key] && (this.task[key] = [])
      this.task[key].push(callback)
    }
    // 发布
    $emit (key, data) {
      if (this.task[key]) {
        this.task[key].forEach(fun => fun(data))
      }
    }
  })()

  // 音乐类
  return class Music {
    // 信息
    info = {}
    // 下载位置
    download = {}
    // 接口 [qq: QQ音乐, wy: 网易, dog: 酷狗 ...]
    type = 'qq'
    // 内部数据
    store = {
      // 是否正在播放
      state: false,
      conEl: {}
    }

    // 存储vue
    constructor () {
      // 默认音乐数据
      this.loadMusic('004RiqvD4Necim')
      this.$el = vue.$refs.music
      // 存入 音乐控制的节点 datat-on: element
      let musicConsole = vue.$refs.musicConsole.getElementsByTagName('i')
      for (let i = 0, l = musicConsole.lenght; i < l; i++) {
        let data = musicConsole[i].dataset.on
        if (data) {
          this.store.conEl[data] = musicConsole[i]
        }
      }
    }

    /**
     * 载入音乐
     * @param {string} songmid 音乐MID
     */
    loadMusic (songmid) {
      // 音乐信息
      vue.$http
        .get(`/api/Music?fun=getMusicInfo&code=${songmid}`)
        .then(res => {
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
        .get(`/api/Music?fun=download&code=${songmid}`)
        .then(res => {
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
      try {
        // 默认播放 m4a 格式音乐
        // 数据顺序 对象, 封面图片, 播放路径, 歌名, 歌手, 歌简介, 歌上传时间, 相似歌曲
        vue.info = {
          img: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${this.info.mid}.jpg`,
          src: this.download.m4a,
          tag: this.info.name,
          singername: this.info.singername,
          description: this.info.desc,
          upload: this.info.aDate,
          list: this.info.list
        }
      } catch (e) {
        throw Error(`写入音乐信息时出现未知错误:`, e)
      }
      // 触发 内部更新
      vue.$connecter.$emit('music')
    }

    /**
     * 播放音乐
     */
    play () {
      if (this.$el.play) {
        this.$el.play()
        this.store.state = !0
      }
    }

    /**
     * 停止音乐
     */
    stop () {
      if (this.$el.pause) {
        this.$el.pause()
        this.store.state = !1
      }
    }

    /**
     * 音乐状态切换
     * @param {element} el 节点
     */
    toggle (el) {
      this.store.state ? this.stop() : this.play()
    }
  }
}
