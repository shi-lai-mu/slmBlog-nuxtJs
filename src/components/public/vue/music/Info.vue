<template>
  <div class="music-info">
    <img :src="`//y.gtimg.cn/music/photo_new/T002R300x300M000${info.mid}.jpg`" alt="音乐图片" class="music-icon">
    <h2 class="music-name">{{ info.name }}</h2>
    <h3>
      <i class="iconfont icon-geshou"> 歌手：</i>
      {{ info.singername || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-zhuanji"> 专辑：</i>
      {{ info.genre || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-yuzhong"> 语种：</i>
      {{ info.lan || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-gongsi"> 公司：</i>
      {{ info.company || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-shijian"> 发行：</i>
      {{ info.aDate || '未知' }}
    </h3>
    <h3>
      <i class="iconfont icon-qufengliupai"> 简介：</i>
    </h3>
    <h3 class="music-desc">
      {{ info.desc }}
    </h3>
    
    <div class="icon-select">
      <span><i class="iconfont icon-shoucang"></i><p>收藏</p></span>
      <span><i class="iconfont icon-xiazai"></i><p>列队</p></span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      info: {}
    }
  },
  created () {
    this.info = this.$store.state.Music.info
    console.log(this.info)
  }
}
</script>
<style lang="less">
  .music-info {
    overflow: scroll;
    height: 100%;
    color: #ddd;
    background-color: rgba(0, 0, 0, .5);

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
    .music-desc {
      margin-top: 20px;
      text-indent: 2rem;
      width: 95%;
      margin: 0 auto;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, .3);
    }
    i {
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
</style>
