<template>
  <div class="music-download">
    <div class="down-state">
      共计({{ download.list.length }})条下载任务
      <i class="iconfont right icon-zanting1" @click="allStart"></i>
      <i class="iconfont right icon-zanting" @click="allStop"></i>
    </div>
    <ul class="down-list">
      <li v-for="(item, index) in download.list" :key="index">
        <span class="song-name ellipsis">{{ item.name }}</span>
        <span v-if="!isNaN(item.state)">{{ item.state == 0 ? '等待下载' : item.state + '%' }}</span>
        <span v-else>下载出错</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      download: {
        list: []
      }
    }
  },
  created () {
    // 装入音乐控件
    this.Music = this.$store.state.Music
    this.download = this.Music.download
  },
  methods: {

    /**
     * 全部音乐开始下载
     */
    allStart () {
      this.Music.downloadState = !0
      this.Music.allDownloadStart()
    },
    
    /**
     * 全部停止
     */
    allStop () {
      this.Music.downloadState = !1
    }
  }
}
</script>

<style lang="less">
  .music-download {
    overflow-y: scroll;
    height: 100%;
    color: #888;

    .down-state,
    .down-list li {
      margin: 10px;
      border-radius: 5px;
      padding: 10px;
      color: #333;
      background-color: rgba(255, 255, 255, .6);
      box-shadow: 0 5px 10px -2px rgba(0, 0, 0, .6);
      transition: .5s;
    }
    .right {
      float: right;
      margin: 0 10px;
      cursor: pointer;
    }
    // 下载列表
    .down-list {
      margin: 30px 10px;
      li {
        box-shadow: 0 5px 10px -2px rgba(0, 0, 0, .3);

        .song-name {
          display: inline-block;
          width: 70%;
        }

        &:hover {
          background-color: rgba(255, 255, 255, .9);
          box-shadow: 0 5px 10px -2px rgba(0, 0, 0, .6);
          transform: translateY(-2px);
        }
      }
    }
  }
</style>
