<template>
  <div class="music-search">
    <input class="search" type="text" v-model="searchs" placeholder="搜索 歌名/歌手" @keyup.enter="searchMusic">
    <ul class="song-list">
      <li v-for="(song, i) in songList" :key="i">
        <span class="song-name">{{ song.songname }}</span>
        <span class="song-singer">{{ song.singer[0].name_hilight }}</span>
        <span class="song-lyric">{{ song.albumname }}</span>
        <span class="song-inter">{{ song.interval }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchs: null,
      songList: []
    }
  },
  created () {
    console.log('Home')
  },
  methods: {
    searchMusic () {
      if (this.searchs) {
        // api/Music?fun=search&key=学猫叫&page=0
        this.$http
          .get('api/Music', {
            fun: 'search',
            key: this.searchs,
            page: 1
          })
          .then(res => {
            this.songList = res.data.data.song.list
            console.log(this.songList)
          })
      }
    }
  }
}
</script>

<style lang="less">
  .music-list .music-search {
    overflow-y: scroll;
    height: 100%;

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
      }
    }
  }
</style>
