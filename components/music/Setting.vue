<template>
  <div class="music-setting">
    <ul class="master-setting">
      <li>
        <span class="setting-title">QQ音乐歌单绑定：</span>
        <div class="clearfix">
          <input class="left" type="text" v-model="musicQQ" placeholder="输入QQ号,得到QQ音乐歌单">
          <button class="right" @click="getMusicQQ">{{ musicQQState }}</button>
        </div>
        <div class="ps" v-if="musicQQState == '绑定中'">现在可以看看 '收藏界面' 是否存在QQ音乐数据</div>
      </li>
      <li @click="setSkin">
        <span class="setting-title">音乐控件主题色[暂未开发]:</span>
        <button class="right" data-skin="1">亮色</button>
        <button class="right not" data-skin="2">暗色</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      musicQQ: null,
      musicQQState: '绑定'
    }
  },
  created () {
    // 检测QQ歌单是否绑定
    let QQSingle = localStorage.getItem('QQSingle')
    if (QQSingle) {
      QQSingle = JSON.parse(QQSingle)
      this.musicQQ = QQSingle[0].uin + `[${QQSingle[0].name}]`
      this.musicQQState = '绑定中'
    }
  },
  methods: {

    /**
     * 获取QQ号下的歌单并绑定
     */
    getMusicQQ () {
      if (this.musicQQState !== '分析中...' && /(\d){6,20}/.test(this.musicQQ)) {
        this.musicQQState = '分析中...'
        this.$axios
          .get('api/Music', {
            data: {
              fun: 'QQSingle',
              qq: this.musicQQ
            }
          })
          .then(res => {
            console.log(res)
            if (res[0].code === 0) {
              this.musicQQState = '绑定中'
              localStorage.setItem('QQSingle', JSON.stringify(res))
              this.musicQQ = res.data[0].uin + `[${res.data[0].name}]`
            } else {
              this.musicQQState = '数据错误!'
            }
          })
      }
    },

    /**
     * 设置皮肤主题色
     * skinID: 1【亮色】 2【暗色】
     */
    setSkin (e) {
      const skinID = e.target.dataset.skin
      if (skinID) {
      }
    }
  }
}
</script>

<style lang="less">
  .music-setting {
    overflow-y: scroll;
    height: 100%;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    color: #ccc;
    .master-setting > li {
      margin: 20px 0;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        clear: both;
      }
    }
    .setting-title {
      display: block;
      width: 100%;
    }
    input {
      display: inline-block;
      width: 100%;
      margin: 5px 0 5px 10px;
      border: 0;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 5px 10px;
      background-color: rgba(255, 255, 255, .3);
      &.left {
        width: calc(100% - 7rem);
      }
      &::placeholder {
        color: #888;
      }
    }
    button.right {
      float: right;
      width: 5rem;
      margin: 5px;
      line-height: 1.75;
      border: 0;
      border-radius: 5px;
      box-sizing: border-box;
      color: #ccc;
      background-color: rgba(255, 255, 255, .3);
      box-shadow: 0 2px 5px rgba(0, 0, 0, .4);
      transition: .2s;
      &:active {
        transform: translateY(-2px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, .4);
      }
      &.not {
        color: rgba(255, 255, 255, .2);
        background-color: rgba(255, 255, 255, .1);
        box-shadow: none;
      }
    }

    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .ps {
      display: block;
      width: 100%;
      font-weight: 200;
      font-size: .5rem;
      text-align: right;
      color: #bbb;
    }
  }
</style>
