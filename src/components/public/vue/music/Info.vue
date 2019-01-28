<template>
  <div class="music-info" v-if="Music.info.singername">
    <img :src="`//y.gtimg.cn/music/photo_new/T002R300x300M000${Music.info.mid}.jpg`" alt="音乐图片" class="music-icon">
    <h2 class="music-name">{{ Music.info.name }}</h2>
    <h3>
      <i class="iconfont icon-geshou"> 歌手：</i>
      {{ Music.info.singername || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-zhuanji"> 专辑：</i>
      {{ Music.info.genre || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-yuzhong"> 语种：</i>
      {{ Music.info.lan || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-gongsi"> 公司：</i>
      {{ Music.info.company || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-shijian"> 发行：</i>
      {{ Music.info.aDate || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-qufengliupai"> 简介：</i>
    </h3>
    <h3 class="music-desc">
      {{ Music.info.desc || '哇, 这首歌木有简介' }}
    </h3>

    <!-- note -->
    <div class="music-note">
      <div v-if="note.id">
        <h3>
          <span>时长：</span>
          <span class="right">{{ note.interval || '00:00' }}</span>
        </h3>
        <h3 v-if="note['MV']">
          <span class="half">MV：</span>
          <span class="right right-dw">[下载]</span>
        </h3>
        <h3 v-if="note['24AAC']">
          <span class="half">流畅音质[M4A]：</span>
          无法计算!
          <span class="right right-dw">[下载]</span>
        </h3>
        <h3 v-if="note['128MP3']">
          <span class="half">标准音质[MP3-128]：</span>
          {{ fileSize(info['size128']) }}
          <span class="right right-dw">[下载]</span>
        </h3>
        <h3 v-if="note['320MP3']">
          <span class="half">高清音质[MP3-320]：</span>
          {{ fileSize(info['size320']) }}
          <span class="right right-dw">[下载]</span>
        </h3>
        <h3 v-if="note['APE']">
          <span class="half">无损音质[APE]：</span>
          {{ fileSize(info['sizeape']) }}
          <span class="right right-dw">[下载]</span>
        </h3>
        <h3 v-if="note['FLAC']">
          <span class="half">无损音质[FLAC]：</span>
          {{ fileSize(info['sizeflac']) }}
          <span class="right right-dw">[下载]</span>
        </h3>
      </div>
      <div class="loading" v-else>
        <i class="iconfont icon-slm icon-slm-loading "></i>更多信息 加载中...
      </div>
    </div>

    <!-- 底部 -->
    <div class="icon-select">
      <span><i class="iconfont icon-shoucang"></i><p>收藏</p></span>
      <span><i class="iconfont icon-xiazai"></i><p>列队</p></span>
    </div>
  </div>
  <div class="not-music-info" v-else>
    <p>未找到歌曲信息, 请先播放音乐!</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Music: {},
      note: {},
      info: {}
    }
  },
  created () {
    this.Music = this.$store.state.Music
    let request = !1
    let Music = this.Music.info.song

    // 加载额外信息要求： 本页被打开过，未在请求中，id不存在，id不同
    setInterval(() => {
      if ((!this.note.id || this.note.id !== this.Music.info.song.songid) && !request) {
        this.note.id = false
        request = !0
        // 获取额外信息
        this.$http
          .get('/api/Music', {
            fun: 'download',
            type: 'ALL',
            code: this.Music.info.song.songmid
          })
          .then(res => {
            request = !1
            this.note = res.data
            this.info = Music
            console.log(this.note, Music)
          })
      }
    }, 1000)
  },
  methods: {
    fileSize (size) {
      return size ? ((size / 1024) / 1024).toFixed(2) + 'MB' : '无法计算!'
    }
  }
}
</script>
<style lang="less">
  .music-info {
    overflow: scroll;
    height: 100%;
    color: #ddd;
    background-color: rgba(0, 0, 0, .5);
    .loading {
      display: block;
      margin: 10px 0;
      text-align: center;
      i {
        margin-right: 5px;
        text-indent: 0;
      }
    }
    span.half {
      display: inline-block;
      width: 50%;
    }
    .right {
      float: right;
    }
    .right-dw {
      color: rgba(255, 255, 255, .4);
    }

    .music-icon {
      display: block;
      width: 40%;
      margin: 5% auto;
      border-radius: 10px;
    }
    .music-name {
      display: block;
      width: 95%;
      margin: 0 auto;
      padding-bottom: 20px;
      text-align: center;
      font-size: 1.7rem;
      border-bottom: 1px solid rgba(255, 255, 255, .3);
    }
    .music-desc,
    .music-note {
      margin-top: 20px;
      text-indent: 2rem;
      width: 95%;
      margin: 0 auto;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, .3);
    }
    .music-note {
      text-indent: 0;
    }
    i,
    span {
      margin-left: 5px;
      color: #fff;
      user-select: none;
    }
    .icon-select {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 40px 0;
      color: rgba(255, 255, 255, .7);
      i {
        text-align: center;
        font-size: 3rem;
        color: currentColor;
      }
      span {
        margin: 0 10px;
        text-align: center;
        cursor: pointer;

        &:active {
          color: rgba(255, 255, 255, .9);
        }
      }
      .nick {
          color: rgba(250, 208, 21, .8);
      }
      p {
        margin: 5px 0;
      }
    }
  }

  .not-music-info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.2rem;
    color: #eee;
  }
</style>
