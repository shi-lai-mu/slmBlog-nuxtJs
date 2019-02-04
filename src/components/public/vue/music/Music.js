import imgColor from '@pub/js/getImageColor'
/**
 * 音乐函数
 * @param {object} self vue Object
 */
export default function () {
  let vue = {}
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
    // 增强工具
    note = {
      // 备忘录模式存储上次的歌曲
      storage: [],
      // 目前额外的歌曲信息[引用的地址]
      store: {}
    }
    // 下载列队
    download = {
      list: []
    }
    // 下载状态
    downloadState = !1
    // 接口 [qq: QQ音乐, wy: 网易, dog: 酷狗 ...]
    type = 'qq'
    // 内部数据
    store = {
      // 是否正在播放
      state: false,
      // 子控件
      conEl: {}
    }
    // 定时器
    currentTime = null

    // 存储vue
    constructor (vues) {
      // 默认音乐数据
      // this.loadMusic('003OLhvp2nqSjQ')
      vue = vues
      this.$el = vue.$refs.music

      // 存入 音乐控制的节点 datat-on: element
      let musicConsole = vue.$refs.musicConsole.getElementsByTagName('*')
      for (let i = 0, l = musicConsole.length; i < l; i++) {
        let data = musicConsole[i].dataset.on
        if (data) {
          this.store.conEl[data] = musicConsole[i]
        }
      }

      // 图标更新 订阅
      observer.$on('iconUpdate', () => {
        // 主控件
        let store = this.store
        let $el = store.conEl

        $el.toggle.className = store.state ? 'iconfont icon-zanting' : 'iconfont icon-zanting1'
      })
      // 进度条监听
      let progress = this.store.conEl.progress
      let music = this.$el
      this.interval = setInterval(() => {
        let song = this.info.song
        if (song) progress.style.width = `${music.currentTime / (song.interval / 100)}%`
      }, 500)
    }

    /**
     * 载入音乐
     * @param {string} albummid 音乐MID
     * @param {boolean} play 是否立马播放
     */
    loadMusic (albummid, play = false) {
      if (!albummid) return
      let self = this
      // 获取音乐信息
      vue.$http
        .get('/api/Music', {
          fun: 'getMusicInfo',
          code: albummid
        })
        .then(res => {
          if (res.data) {
            self.info = res.data.data
            // 选中songmid的ID
            for (let song of self.info.list) {
              if (song.albummid === albummid) {
                self.info.song = song
                break
              }
            }
            self.writeView()
            self.store.conEl.toggle.className = 'iconfont icon-caidan'
            // 获取歌曲播放位置
            if (self.info.song) {
              self.getDownload(self.info.song.songmid, '24AAC', data => {
                vue.info.src = data.url
                play && (self.$el.autoplay = true)
                self.store.conEl.toggle.className = 'iconfont icon-zanting'
                self.store.state = !0
              })
            }
          }
        })
        .catch((e) => {
          throw Error(albummid + `音乐 获取失败, 请及时进行维护!!!`)
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
        let info = this.info
        vue.info = {
          img: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${info.mid}.jpg`,
          src: info.src || '',
          tag: info.name,
          singername: info.singername,
          description: info.desc,
          upload: info.aDate,
          list: info.list
        }
        imgColor.loadImg(vue.info.img, rgb => {
          vue.iconColor = rgb
        })
      } catch (e) {
        throw Error(`写入音乐信息时出现未知错误:`, e)
      }
      // 触发 内部更新
      // vue.$connecter.$emit('music')
    }

    /**
     * 播放音乐
     */
    play () {
      let self = this
      if (self.$el.play) {
        let music = self.$el
        if (!music.autoplay) {
          music.play()
        } else {
          music.autoplay = true
        }
        self.store.state = !0
        observer.$emit('iconUpdate')
      }
    }

    /**
     * 停止音乐
     */
    stop () {
      if (this.$el.pause) {
        this.$el.pause()
        this.$el.autoplay = false
        this.store.state = !1
        observer.$emit('iconUpdate')
      }
    }

    /**
     * 音乐状态切换
     * @param {element} el 节点
     */
    toggle (el) {
      this.store.state ? this.stop() : this.play()
    }

    /**
     * 播放跳转
     * @param {number} interval 跳转百分比
     */
    jump (interval) {
      if (!this.store.state) return
      let min = this.info.song.interval / 100
      interval = Math.min(interval, 100)
      interval = Math.max(interval, 0)
      this.$el.currentTime = min * interval
    }

    /**
     * 获取下载链接
     * @param {string} songmid 音乐songmid
     * @param {string} qu 音乐品质[24AAC, 128MP3, 320MP3, APE, FLAC]
     * @param {function} cb 回调
     */
    getDownload (songmid, qu, cb) {
      vue.$http
        .get(`api/Music?fun=download&code=${songmid}&type=${qu}`)
        .then(res => {
          if (res.data) {
            cb(res.data)
          } else throw Error(`请求[ ${songmid} ]下载数据错误!`)
        })
        .catch(() => {
          throw Error(`破解请求过于频繁,请稍后再试!`)
        })
    }

    /**
     * 添加至下载列队
     * @param {object} url 包含name和src
     */
    addDownload (url) {
      let download = this.download.list
      // 如果存在下载列队内则退出
      for (let i = 0, l = download.length; i < l; i++) {
        if (url.src === download[i].src) return
      }
      url.state = 0
      url.ext = (url.src.match(/(:?\.m4a|\.mp3|\.flac)/))[0]
      this.download.list.push(url)
      console.log(url)
    }

    /**
     * 开始下载全部音乐
     */
    allDownloadStart () {
      // 更改为开始下载的状态
      if (!this.downloadState) return

      let task = this.download.list[0]
      if (task && task.name) {
        console.log(task.name + '开始下载')
        this.downloadMusic(task, () => {
          this.download.list.shift()
          if (this.downloadState) {
            this.allDownloadStart()
          }
        })
      }
    }

    /**
     * 下载音乐
     * @param {object} data 音乐数据
     * @param {functin} cb 下载完成后的回调
     */
    downloadMusic (data, cb) {
      let xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      let a = document.createElement('a')
      xhr.onprogress = function (e) {
        let percent = (e.loaded / e.total * 100).toFixed(2)
        data.state = percent
      }
      xhr.onload = function (e) {
        var blob = new Blob([this.response])
        a.href = URL.createObjectURL(blob)
        a.download = `${data.name}.${data.ext}`
        document.body.appendChild(a)
        a.click()
        cb()
      }
      xhr.onerror = function (e) {
        console.error(e)
      }
      if (data.src) {
        xhr.open('get', data.src, true)
        xhr.send()
      }
    }
  }
}
