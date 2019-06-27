<template>
  <div class="music-search">
    <!-- 搜索框 -->
    <input class="search" type="text" v-model="searchs" placeholder="搜索 歌名/歌手" @keyup.enter="searchMusic" @input="searchChange">

    <ul class="song-list">
      <!-- 搜索到的音乐 -->
      <li class="clearfix" v-for="(song, i) in songList" :key="i" :data-i="i" @click="playSong">
        <span class="song-name" v-html="song.songname"></span>
        <span class="song-singer">{{ song.singers }}</span>
        <span class="song-lyric">{{ song.albumname }}</span>
        <i class="iconfont icon-caidan" @click="toggleList" :data-i="i"></i>
        <span class="song-inter">{{ song.interval }}</span>
      </li>
    </ul>
    <!-- 翻页 -->
    <div class="song-page" v-if="songList.length || page.num > 1">
      <span :class="['button-lv0', { 'not-but': page.num < 2 }]" @click="searchMusic(-1)">上一页</span>
      <span>{{ page.num }}/{{ page.max }}</span>
      <span :class="['button-lv0', { 'not-but': page.num >= page.max }]" @click="searchMusic(1)">下一页</span>
    </div>

    <!-- 历史音乐 -->
    <div v-if="!searchs && searchHistory.length" class="searchHistory song-list">
      <span class="history-tag">搜索历史</span>
      <ul class="history-list">
        <li v-for="(item, index) in searchHistory" :key="index" @click="loadKey">
          {{ item }}<i class="iconfont icon-wrong" :data-i="index" @click="history"></i>
        </li>
      </ul>
      <span class="button-lv0 clearHistory" v-if="!searchs && searchHistory.length" @click="history">清空历史</span>
    </div>

    <!-- 状态 -->
    <div class="search-state" v-if="state">
      <span class="state">搜索中...</span>
    </div>
    <!-- 菜单 -->
    <div :class="['search-menu-hide', {'search-menu': searchList}]">
      <ul>
        <li>查看信息</li>
        <li>收藏歌曲</li>
        <li>加入下载</li>
        <li>
          下载音乐:
          <span class="download-list"  v-for="(v, k) in downList" :key="k" @click="download" :data-qu="v[1]" :data-i="v[2]" v-html="v[0]"></span>
        </li>
        <li @click="toggleList" class="close">关闭</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { utfc } from '~/plugins/tool'

export default {
  props: ['Music'],
  data () {
    return {
      searchs: null,
      songList: [],
      state: !1,
      searchList: !1,
      // 下载品质列表
      downList: [],
      // 搜索历史
      searchHistory: [],
      // 页数
      page: {
        num: 1,
        max: 1
      }
    }
  },
  created () {
    // 读取搜索历史
    let history = localStorage.getItem('searchHistory')
    if (history) {
      this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    }
  },
  methods: {
    /* 搜索音乐 */
    searchMusic (page) {
      // 如果为翻页
      if (typeof page === 'number') {
        this.page.num += page
        this.songList = []
      }
      // 开始搜索
      this.state = '搜索中...'
      let search = this.searchs
      if (search) {
        // 加入历史搜索
        this.history(search)
        this.$axios
          .get('api/Music', {
            data: {
              fun: 'search',
              key: search,
              page: this.page.num
            }
          })
          .then(res => {
            this.state = false
            let song = res.song_list
            this.$el.scrollTo(0, 0)
            for (let i = 0, l = song.length; i < l; i++) {
              let val = song[i]
              // 避免重复计算
              if (val.songnames) break
              if (val.songname === val.albumname) {
                val.albumname = ''
              }
              // 歌手
              let singer = ''
              for (let j = 0, l = val.singer.length; j < l; j++) {
                singer += val.singer[j].name + '/'
              }
              val.singers = singer.substring(0, singer.length - 2)
              // 品质
              let quality = {
                sizeflac: 'SQ',
                size320: 'HQ'
              }
              for (let v in quality) {
                if (val[v] > 0) {
                  val.songnames = val.songname + `<sup class="${quality[v]}">${quality[v]}</sup>`
                  // break
                }
              }
              // 播放时间
              // val.interval = utfc(val.interval)
              if (val.interval === '00:00') val.interval = '-- : --'
              !val.songnames && (val.songnames = val.songname)
            }
            // console.log(song);
            this.songList = song

            // 页数计算
            let page = res.data.song
            this.page = {
              num: page.curpage,
              max: Math.ceil(page.totalnum / 20)
            }
          })
          .catch(() => {
            this.state = '搜索超时!请稍后再试...'
            setTimeout(() => {
              this.state = !1
            }, 1000)
          })
      }
    },

    /* 显示列表 */
    toggleList (e) {
      this.searchList = !this.searchList
      let i = e.target.dataset.i
      if (this.searchList && i) {
        e.stopPropagation()
        let song = this.songList[i]
        // 判断音乐品质
        let quality = {
          'songid': ['流畅', '192AAC', i],
          'size128': ['标准', '128MP3', i],
          'size320': ['高品质', '320MP3', i],
          'sizeape': ['无损APE', 'APE', i],
          'sizeflac': ['无损FLAC', 'FLAC', i]
        }
        let arr = []
        for (let v in quality) {
          if (song[v] > 0) {
            arr.push(quality[v])
          }
        }
        this.downList = arr
      }
    },

    /* 下载音乐 */
    download (e) {
      let $el = e.target
      let dataset = $el.dataset
      let oldTXT = $el.innerHTML
      // 判断是否正在下载
      if ($el.innerHTML.indexOf('[') > -1) return
      $el.innerHTML = `${oldTXT} [破解权限中...]`
      let song = this.songList[dataset.i]
      let a = document.createElement('a')
      // 兼容检测
      if (!('download' in a)) {
        alert('抱歉您的浏览器不支持最新的属性,请尝试选择谷歌浏览器最新版!')
        return
      }
      this.$axios
        .get(`api/Music?fun=download&code=${song.songmid}&type=${dataset.qu}`)
        .then(res => {
          console.info('祝贺你喜提彩蛋~!')
          console.table([
            {
              '歌名': song.songname,
              '歌手': song.singers,
              '时长': song.interval
            }
          ])
          console.log(`%c${song.songname} 极速版下载链接：${res.url}`,"color:red")

          let url = res.url
          let xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onloadstart = function (e) {
            $el.innerHTML = `${oldTXT} [即将开始下载]`
          }
          xhr.onprogress = function (e) {
            let percent = (e.loaded / e.total * 100).toFixed(2)
            $el.innerHTML = `${oldTXT} [${percent}%][控制台有极速版]`
          }
          xhr.onload = function (e) {
            var blob = new Blob([this.response])
            a.href = URL.createObjectURL(blob)
            let singers = song.singers.replace('/', '-')
            a.download = `${song.songname}(${singers}).${res.suffix}`
            document.body.appendChild(a)
            a.click()
            $el.innerHTML = `${oldTXT} <span class="sup HQ">完成</span>`
            setTimeout(() => {
              $el.innerHTML = oldTXT
            }, 1500)
          }
          xhr.onerror = function (e) {
            $el.innerHTML = `${oldTXT} [下载出错]`
          }
          url = url.replace('http://streamoc.music.tc.qq.com/', 'https://slmblog.com/download/music/')
          xhr.open('get', url, true)
          xhr.send()
        })
        .catch(() => {
          $el.innerHTML = `${oldTXT} [破解失败!]`
        })
    },

    /* 搜索音乐 */
    searchChange (e) {
      // 清空列表
      if (!e.data && this.songList) this.songList = []
    },

    /* 添加/刪除 一条记录/全部记录 */
    history (v) {
      let history = this.searchHistory
      if (typeof v === 'string') {
        if (history.indexOf(v) === -1) history.push(v)
      } else {
        let i = v.target.dataset.i
        if (i) {
          v.stopPropagation()
          history.splice(i, 1)
        } else {
          this.searchHistory = []
        }
      }
      localStorage.setItem('searchHistory', JSON.stringify(history))
    },

    /* 点击历史记录 */
    loadKey (e) {
      this.searchs = e.target.innerText
      this.searchMusic()
    },

    /* 播放音乐 */
    playSong (e) {
      let i = e.target.dataset.i || e.target.parentElement.dataset.i
      if (i) {
        let song = this.songList[i]
        song.autoPlay = !0
        this.observer.emit('music', song)
      }
    }
  }
}
</script>

<style lang="less">
  .music-list .music-search {
    height: 100%;
    overflow-y: scroll;

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 30%;
      background-image: linear-gradient(180deg, rgba(0, 0, 0, .3) 50%, transparent 100%);
    }
    // 翻页
    .song-page {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin: 20px 5px;
      border-radius: 5px;
      padding: 5px;
      background-color: rgba(255, 255, 255, .8);
      user-select: none;

      & :nth-child(1),
      & :nth-child(3) {
        background-color: #999;
      }
      .not-but {
        background-color: #ccc;
        color: #eee;
      }
    }

    // 搜索框
    input {
      display: block;
      width: 90%;
      margin: 10px 5%;
      border: 0;
      border-radius: 20px;
      padding: 5px;
      font-size: 1.5rem;
      text-align: center;
      color: #eee;
      background-color: rgba(255, 255, 255, .4);

      &::placeholder {
        mix-blend-mode: difference;
      }
    }
    .search-state {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;

      .state {
        border-radius: 10px;
        padding: 10px;
        font-size: 1.2rem;
        background-color: rgba(255, 255, 255, .8);
        box-shadow: 0 0 5px rgba(0, 0, 0, .2);
      }
    }
    // 搜索历史
    .searchHistory {
      .history-tag {
        position: relative;
        display: block;
        text-align: center;
        &::before,
        &::after {
          content: "";
          position: absolute;
          right: 5%;
          width: 30%;
          height: 1px;
          margin: .6rem 0;
          background-color: currentColor;
        }
        &::before {
          left: 5%;
        }
      }
      .history-list li {
        display: inline-block;
        color: #ddd;
        background-color: #888;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        cursor: pointer;
      }
      .icon-wrong {
        margin-left: 5px;
        color: #777;
        transform: translateY(0);
      }
      .clearHistory {
        float: right;
        margin-top: 50px;
        border-radius: 5px;
        color: #999;
        background-color: #555;
        &:active {
          background-color: #888;
        }
      }
    }
    // 菜单列表
    .search-menu-hide {
      overflow: hidden;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;

      ul {
        min-width: 60%;
        opacity: 0;
        visibility: hidden;
        border-radius: 10px;
        padding: 5px 10px;
        font-weight: bold;
        background-color: rgba(255, 255, 255, .98);
        box-shadow: 0 0 10px 1000px rgba(0, 0, 0, .4);
        transform: translateY(-50%);
        transition: .5s;
        cursor: pointer;

        li {
          padding: 5px;
          border-bottom: 1px solid #ccc;
          user-select: none;

          &:active {
            background-color: rgba(0, 0, 0, .1);
          }

          &:nth-last-child(1) {
            border-bottom: 0;
          }
        }
        .download-list {
          display: block;
          font-weight: normal;
          color: #777;
          transition: .5s;
          cursor: pointer;

          &:hover {
            color: #13CE66;
            &::before {
              content: "->";
              color: #13CE66;
              margin: 0 8px;
            }
          }

          &::before {
            content: "-";
            display: inline-block;
            margin: 0 10px;
            color: #ccc;
            transition: .5s;
          }
        }
      }
    }
    .search-menu {
      pointer-events: inherit;

      ul {
        opacity: 1;
        transform: translateY(0);
        visibility: inherit;
      }
    }
    sup,
    .sup {
      display: inline-block;
      margin-left: 5px;
      padding: 0px 3px;
      max-width: 10em;
      border: 1px solid currentColor;
      border-radius: 5px;
      color: #FFA500;
      font-size: 10px;
      overflow: hidden;
      text-overflow: hidden;
    }
    .HQ {
      color: #13CE66;
    }
    .close {
      font-weight: normal;
      text-align: center;
      color: #aaa;
    }
  }
</style>
