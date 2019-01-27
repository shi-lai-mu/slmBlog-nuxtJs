<template>
  <div class="music-info">
    <img :src="`//y.gtimg.cn/music/photo_new/T002R300x300M000${info.mid}.jpg`" alt="音乐图片" class="music-icon">
    <h2 class="music-name">{{ info.name }}</h2>
    <h3 class="music-singer">{{ info.singername }}</h3>
    <p class="music-desc">{{ info.desc }}</p>
    
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
    overflow: hidden;
    height: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);

    .music-icon {
      display: block;
      width: 40%;
      margin: 5% auto;
      border-radius: 10px;
    }
    .music-name {
      display: block;
      text-align: center;
      font-size: 1.7rem;
    }
  }
</style>
