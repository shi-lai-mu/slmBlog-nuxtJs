<template>
  <div class="music-search">
    <input class="search" type="text" v-model="searchs" placeholder="搜索 歌名/歌手" @keyup.enter="searchMusic">
    asdasdsad
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchs: null
    }
  },
  created () {
    console.log('Home')
  },
  methods: {
    searchMusic () {
      if (this.searchs) {
        console.log(this.searchs)
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
  }
</style>
