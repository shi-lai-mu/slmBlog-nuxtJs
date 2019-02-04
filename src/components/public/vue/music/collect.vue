<template>
  <div class="QQSingle">
    <div class="Single" v-if="QQSingle">
      <ul class="list">
        <li v-for="(item, index) in QQSingle[0].disslist" :key="index">
          <img :src="item.diss_cover" :alt="item.diss_name + '封面'">
        </li>
      </ul>
    </div>
    <div class="not-QQSingle" v-else>
      未搜索到QQ音乐歌单数据,请前往 '设置页' 绑定QQ
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      QQSingle: null
    }
  },
  created () {
    // 检测QQ歌单是否绑定
    let QQSingle = localStorage.getItem('QQSingle')
    if (QQSingle) {
      this.QQSingle = JSON.parse(QQSingle)
      console.log(this.QQSingle)
    }
  }
}
</script>

<style lang="less">
  .QQSingle {
    height: 100%;

    .Single {
      overflow-y: scroll;
      height: 100%;
      .list {
        li {
          float: left;
          width: 30%;
          margin: 0 1.6%;
        }
        img {
          width: 100%;
        }
      }
    }

    // 未搜索到歌单
    .not-QQSingle {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #999;
    }
  }
</style>
