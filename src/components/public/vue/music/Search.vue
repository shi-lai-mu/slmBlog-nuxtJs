<template>
  <div class="music-search">
    <input class="search" type="text" v-model="searchs" placeholder="搜索 歌名/歌手" @keyup.enter="searchMusic">
    <ul class="song-list">
      <li class="clearfix" v-for="(song, i) in songList" :key="i">
        <span class="song-name" v-html="song.songname"></span>
        <span class="song-singer">{{ song.singers }}</span>
        <span class="song-lyric">{{ song.albumname }}</span>
        <i class="iconfont icon-yinleliebiaoxian" @click="toggleList"></i>
        <span class="song-inter">{{ utfc(song.interval) }}</span>
      </li>
    </ul>
    <div class="search-state" v-if="state">
      <span class="state">搜索中...</span>
    </div>
    <div :class="['search-menu-hide', {'search-menu': searchList}]">
      <ul>
        <li>下载</li>
        <li>下载</li>
        <li>下载</li>
        <li>下载</li>
        <li>下载</li>
        <li @click="toggleList">关闭</li>
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
      songList: [
        {songname: 'xxxx', albumname: 'xasdasd'}
      ],
      state: !1,
      searchList: !1
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
                  val.songname += `<sup class="${quality[v]}">${quality[v]}</sup>`
                  break
                }
              }
            }
            this.songList = song
            console.log(song)
            // 学猫叫
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
    toggleList () {
      this.searchList = !this.searchList
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
        &:active {
          color: #888;
        }
      }
      sup {
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
        width: 30%;
        opacity: 0;
        visibility: hidden;
        border-radius: 10px;
        padding: 5px 10px;
        text-align: center;
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
  }
</style>
