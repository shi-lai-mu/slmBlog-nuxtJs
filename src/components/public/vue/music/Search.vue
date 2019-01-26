<template>
  <div class="music-search">
    <input class="search" type="text" v-model="searchs" placeholder="搜索 歌名/歌手" @keyup.enter="searchMusic">
    <ul class="song-list">
      <li class="clearfix" v-for="(song, i) in songList" :key="i">
        <span class="song-name" v-html="song.songnames"></span>
        <span class="song-singer">{{ song.singers }}</span>
        <span class="song-lyric">{{ song.albumname }}</span>
        <i class="iconfont icon-caidan" @click="toggleList" :data-i="i"></i>
        <span class="song-inter">{{ utfc(song.interval) }}</span>
      </li>
    </ul>
    <div class="search-state" v-if="state">
      <span class="state">搜索中...</span>
    </div>
    <div :class="['search-menu-hide', {'search-menu': searchList}]">
      <ul>
        <li v-for="(v, k) in downList" :key="k" @click="download" :data-qu="v[1]" :data-i="v[2]" v-html="'下载 ' + v[0]"></li>
        <li @click="toggleList" class="close">关闭</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Time from '@pub/js/dateForm'

export default {
  data () {
    return {
      searchs: null,
      songList: [],
      state: !1,
      searchList: !1,
      downList: []
    }
  },
  created () {
  },
  methods: {
    /**
     * 搜索音乐
     */
    searchMusic () {
      this.state = '搜索中...'
      if (this.searchs) {
        this.$http
          .get('api/Music', {
            fun: 'search',
            key: this.searchs,
            page: 1
          })
          .then(res => {
            this.state = false
            let song = res.data.data.song.list
            for (let i = 0; i < 20; i++) {
              let val = song[i]
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
                  break
                }
              }
              !val.songnames && (val.songnames = val.songname)
            }
            this.songList = song
          })
          .catch(() => {
            this.state = '搜索超时!请稍后再试...'
            setTimeout(() => {
              this.state = !1
            }, 1000)
          })
      }
    },

    /**
     * 转换时间
     */
    utfc (time) {
      return Time.utfc(time)
    },

    /**
     * 显示列表
     */
    toggleList (e) {
      this.searchList = !this.searchList
      let i = e.target.dataset.i
      if (this.searchList && i) {
        let song = this.songList[i]
        // 判断音乐品质
        let quality = {
          'size128': ['标准', '128MP3', i],
          'size320': ['高品质', '320MP3', i],
          'sizeape': ['无损1', 'APE', i],
          'sizeflac': ['无损2', 'FLAC', i]
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

    /**
     * 下载音乐
     */
    download (e) {
      // 学猫叫
      let $el = e.target
      let dataset = $el.dataset
      let oldTXT = $el.innerHTML
      $el.innerHTML = `${oldTXT} [破解权限中...]`
      let song = this.songList[dataset.i]
      this.$http
        .get(`api/Music?fun=download&code=${song.songmid}&type=${dataset.qu}`)
        .then(res => {
          let url = res.data.url
          let xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onloadstart = function (e) {
            $el.innerHTML = `${oldTXT} [即将开始下载]`
          }
          xhr.onprogress = function (e) {
            let percent = (e.loaded / e.total * 100).toFixed(2)
            $el.innerHTML = `${oldTXT} [${percent}%]`
            console.log(`${song.songname}(${song.singers}).${res.data.suffix}下載中...${percent}%`)
          }
          xhr.onload = function (e) {
            var blob = new Blob([this.response])
            let a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = `${song.songname}(${song.singers}).${res.data.suffix}`
            document.body.appendChild(a)
            a.click()
            $el.innerHTML = `${oldTXT} <span class="sup HQ">完成</span>`
            setTimeout(() => {
              $el.innerHTML = oldTXT
            }, 500)
          }
          xhr.onerror = function (e) {
            $el.innerHTML = `${oldTXT} [下载出错]`
          }
          xhr.open('get', url, true)
          xhr.send()
        })
        .catch(() => {
          $el.innerHTML = `${oldTXT} [破解失败!]`
        })
    }
  }
}
</script>

<style lang="less">
  .music-list .music-search {
    overflow-y: scroll;
    height: 100%;

    // 搜索框
    input {
      display: block;
      width: 90%;
      margin: 10px auto;
      border: 0;
      border-radius: 20px;
      padding: 5px;
      font-size: 1.5rem;
      text-align: center;
      color: #eee;
      background-color: rgba(255, 255, 255, .4);
    }

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 30%;
      background-image: linear-gradient(180deg, rgba(0, 0, 0, .3) 50%, transparent 100%);
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
    // 搜索后的列表
    .song-list {
      margin-top: 20px;

      li {
        margin: 10px 5px;
        border-radius: 5px;
        padding: 5px;
        background-color: rgba(255, 255, 255, .6);
      }
      span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #888;
      }
      // 歌曲信息
      .song-name {
        width: 100%;
        padding-top: 1px;
        color: #000;
      }
      .song-singer {
        width: 25%;
        color: #888;
      }
      .song-lyric {
        width: 50%;
      }
      .song-inter {
        width: 15%;
        float: right;
      }
      i {
        float: right;
        font-size: 1.5rem;
         color: #888;
        transform: translateY(-10px);
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
        min-width: 30%;
        opacity: 0;
        visibility: hidden;
        border-radius: 10px;
        padding: 5px 10px;
        background-color: rgba(255, 255, 255, .8);
        box-shadow: 0 0 10px 1000px rgba(0, 0, 0, .4);
        transform: translateY(-50%);
        transition: .5s;
        li {
          padding: 5px;
          border-bottom: 1px solid #ccc;

          &:active {
            background-color: rgba(0, 0, 0, .1);
          }

          &:nth-last-child(1) {
            border-bottom: 0;
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
      margin-left: 5px;
      padding: 0px 3px;
      border: 1px solid currentColor;
      border-radius: 5px;
      color: #FFA500;
      font-size: 10px;
    }
    .HQ {
      color: #13CE66;
    }
    .close {
      text-align: center;
    }
  }
</style>
