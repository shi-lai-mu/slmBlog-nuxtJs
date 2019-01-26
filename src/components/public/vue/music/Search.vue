<template>
  <div class="music-search">
    <input class="search" type="text" v-model="searchs" placeholder="搜索 歌名/歌手" @keyup.enter="searchMusic">
    <ul class="song-list">
      <li class="clearfix" v-for="(song, i) in songList" :key="i">
        <span class="song-name" v-html="song.songname"></span>
        <span class="song-lyric">{{ song.albumname }}</span>
        <i class="iconfont icon-yinleliebiaoxian"></i>
        <span class="song-inter">{{ song.interval }}</span>
      </li>
    </ul>
    <box class="search-state" v-if="state">
      <span class="state">搜索中...</span>
    </box>
  </div>
</template>

<script>
import Time from '@pub/js/dateForm'

export default {
  data () {
    return {
      searchs: null,
      songList: [],
      state: false
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
            this.songList = res.data.song_list
            for (let i = 0, l = this.songList.length; i < l; i++) {
              let val = this.songList[i]
              val.songname = val.songname.replace(`《${val.albumname}》`, "")
              if (val.albumname === '空') {
                val.albumname = ''
              }
            }
          })
      }
    },

    /**
     * 转换时间
     */
    utfc (time) {
      return Time.utfc(time)
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
      top: 0;
      justify-content: center;
      align-items: center;
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
        width: 20%;
        color: #888;
      }
      .song-lyric {
        width: 50%;
      }
      .song-inter {
        width: 20%;
        float: right;
      }
      i {
        float: right;
      }
    }
  }
</style>
