<template>
  <div class="qq-single">
    <div class="single" v-if="QQSingle">
      <button class="update-single" v-html="updateSingleData" @click="updateSingle"></button>
      <ul class="list" @click="singleList">
        <li v-for="(item, index) in QQSingle[0].disslist" :key="index">
          <img :src="item.diss_cover" :alt="item.diss_name + '封面'">
          <span class="ellipsis" v-text="item.diss_name"></span>
          <span class="ellipsis">{{ item.song_num }} 首音乐</span>
          <div class="loading" :data-index="index">
            <i class="iconfont icon-geci"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="not-QQSingle" v-else>
      未搜索到QQ音乐歌单数据,请前往 '设置页' 绑定QQ
    </div>
    <!-- 歌单内容 -->
    <div class="qq-single-song" v-if="single.song_list">
      <i class="iconfont icon-wrong" @click="clearSingle"></i>
      <img class="single-logo" :src="single.logo" alt="歌单封面">
      <span class="ellipsis single-title" v-text="single.diss_name"></span>
      <span class="single-create">创建日期: {{ single.create_time }}</span>
      <span class="single-num">歌曲数量: {{ single.total_song_num }}</span>
      <button class="downloadAll"><i class="iconfont icon-xiazai"></i>下载全部 [最高品质]</button>
      <ul class="song-list">
        <li class="clearfix" v-for="(item, index) in single.song_list" :key="index">
          <span class="song-name" v-html="item.songnames"></span>
          <span class="song-singer">{{ item.singers }}</span>
          <span class="song-lyric">{{ item.albumname }}</span>
          <i class="iconfont icon-caidan"></i>
          <span class="song-inter">{{ item.interval }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      QQSingle: null,
      updateSingleData: '',
      single: {}
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
              this.QQSingle = res.data
              localStorage.setItem('QQSingle', JSON.stringify(res.data))
              this.updateSingleData = '更新完毕![如需再次更新请刷新网页]'
            } else {
              this.updateSingleData = '更新失败,错误的数据!'
            }
          })
      } else {
        this.updateSingleData = 'QQ号分析失败!'
      }
    },

    /**
     * 歌单列表点击事件委托
     */
    singleList (e) {
      const id = e.target.dataset.index
      const single = this.QQSingle[0].disslist
      if (single[id]) {
        this.$http.get('api/Music', {
          fun: 'getSingle',
          id: single[id].id,
          qq: this.QQSingle[0].uin
        })
          .then(res => {
            let song = res.data.song_list
            for (let i = 0, l = song.length; i < l; i++) {
              let val = song[i]
              // 避免重复计算
              if (val.songnames) break
              if (val.songname === val.albumname) {
                val.albumname = ''
              }
              // 歌手
              let singer = ''
              for (let j = 0, l = val.singer.length; j < l; j++) {
                singer += val.singer[j].name + '/'
              }
              val.singers = singer.substring(0, singer.length - 2)
              // 播放时间
              !val.songnames && (val.songnames = val.songname)
            }
            this.single = res.data
            console.log(res)
          })
      }
    },

    /**
     * 清空歌单信息
     */
    clearSingle () {
      this.single = {}
    }
  }
}
</script>

<style lang="less">
  .qq-single {
    height: 100%;
    color: #ccc;

      // 音乐列表
    .qq-single-song {
      position: absolute;
      overflow-y: scroll;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .9);

      .single-logo {
        display: block;
        width: 50%;
        margin: 10px auto;
        border-radius: 10px;
      }
      .single-title {
        margin: 10px 0;
        font-size: 1.3rem;
        font-weight: bold;
        text-align: center;
      }
      .single-create,
      .single-num {
        display: block;
        margin: 5px 20px;
        color: #888;
      }
      .icon-wrong {
        float: right;
        margin: 10px;
        font-size: 2rem;
        color: rgba(255, 255, 255, .4);
      }
    }

    // 更新歌单
    .update-single,
    .downloadAll {
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
    .single {
      position: relative;
      overflow-y: scroll;
      height: 100%;
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
          pointer-events: none;
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
