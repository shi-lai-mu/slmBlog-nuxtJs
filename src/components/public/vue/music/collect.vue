<template>
  <div class="QQSingle">
    <div class="Single" v-if="QQSingle">
      <button class="update-single" v-html="updateSingleData" @click="updateSingle"></button>
      <ul class="list">
        <li v-for="(item, index) in QQSingle[0].disslist" :key="index">
          <img :src="item.diss_cover" :alt="item.diss_name + '封面'">
          <span class="ellipsis" v-text="item.diss_name"></span>
          <span class="ellipsis">{{ item.song_num }} 首音乐</span>
          <div class="loading">
            <i class="iconfont icon-geci"></i>
          </div>
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
      QQSingle: null,
      updateSingleData: ''
    }
  },
  created () {
    // 检测QQ歌单是否绑定
    let QQSingle = localStorage.getItem('QQSingle')
    if (QQSingle) {
      this.QQSingle = JSON.parse(QQSingle)
      this.updateSingleData = `更新${this.QQSingle[0].name}的歌单数据`
      console.log(this.QQSingle)
    }
  },
  methods: {
    /**
     * 更新歌单数据
     */
    updateSingle () {
      if (this.QQSingle[0].uin) {
        this.updateSingleData = `<i class="iconfont icon-slm icon-slm-loading"></i>更新${this.QQSingle[0].uin}的歌单中...!`
        this.$http
          .get('api/Music', {
            fun: 'QQSingle',
            qq: this.QQSingle[0].uin
          })
          .then(res => {
            if (res.data[0].code === 0) {
              localStorage.setItem('QQSingle', JSON.stringify(res.data))
              this.updateSingleData = '更新完毕![如需再次更新请刷新网页]'
            } else {
              this.updateSingleData = '更新失败,错误的数据!'
            }
          })
      } else {
        this.updateSingleData = 'QQ号分析失败!'
      }
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
      color: #ccc;

      // 更新歌单
      .update-single {
        display: block;
        width: 80%;
        margin: 10px auto;
        border: 0;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px;
        font-size: 1.2rem;
        background-color: rgba(255, 255, 255, .6);
        cursor: pointer;
        i {
          margin-right: 10px;
        }
      }
      // 歌单列表
      .list {
        li {
          float: left;
          position: relative;
          width: 30%;
          margin: 10px 1.6%;
          cursor: pointer;
          &:hover .loading {
            opacity: 1;
          }
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          color: #fff;
          background-color: rgba(0, 0, 0, .8);
          opacity: 0;
          transition: .5s;
        }
        .icon-geci {
          font-size: 50px;
        }
        img {
          width: 100%;
          border-radius: 5px;
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
