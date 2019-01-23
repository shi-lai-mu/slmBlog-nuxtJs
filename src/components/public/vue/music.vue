<template>
  <div class="bottom-music">
    <!-- 浮动列表 -->
    <div :class="['music-list', { 'list-show': floatList }]">
      <div class="blur-bg">
         <!-- :style="'background-image: url(https://y.gtimg.cn/music/photo_new/T002R300x300M000004FjinN2aVhQa.jpg?max_age=2592000);'" -->
        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004FjinN2aVhQa.jpg?max_age=2592000" alt="">
      </div>
      ccccccccccccasdasdsadsad
      <ul class="right-select">
        <li><i class="iconfont icon-yinle"></i></li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
    <!-- 底部浮动 -->
    <div :class="['music-float', { 'float-show': floatState }]">
      <!-- <i class="iconfont icon-zanting"></i>
      <i class="iconfont icon-yinle"></i>
      <i class="iconfont icon-xihuan1"></i>
      <i class="iconfont icon-shunxu1"></i>
      <i class="iconfont icon-Shape"></i>
      <i class="iconfont icon-shoucang"></i>
      <i class="iconfont icon-suiji"></i>
      <i class="iconfont icon-danquxunhuan"></i> -->
      <div class="progress">
        <div class="progress-load" style="width: 50%"></div>
      </div>
      <img class="music-icon" src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004FjinN2aVhQa.jpg?max_age=2592000" alt="音乐封面" @click="toggleList">
      <span class="music-title">舞い落ちる雪のように</span>
      <span class="music-right">
        <i class="iconfont icon-up-copy"></i>
        <i class="iconfont icon-zanting"></i>
        <i class="iconfont icon-next"></i>
        <i class="iconfont icon-fangxiangxia" @click="toggleFloat"></i>
      </span>

    </div>
  </div>
</template>

<script>
// 底部音乐插件
export default {
  data () {
    return {
      floatState: !1,
      floatList: !1,
      floatListBg: '#fff'
    }
  },
  created () {
  },
  methods: {
    /**
     * 切换音乐浮动状态
     */
    toggleFloat () {
      this.floatState = !this.floatState
      if (this.floatList) {
        this.floatList = !1
      }
    },
    /**
     * 切换音乐列表展示状态
     */
    toggleList () {
      this.floatList = !this.floatList
    }
  }
}
</script>

<style lang="less">
  .bottom-music {

    // 浮动列表
    .music-list {
      position: fixed;
      bottom: 50px;
      z-index: 66;
      width: calc(100vw - 50px);
      max-width: 500px;
      box-sizing: border-box;
      border-radius: 5px 5px 0 0;
      background-color: #fff;
      opacity: 0;
      transition: .5s;

      // 模糊的背景容器
      .blur-bg {
        position: absolute;
        overflow: hidden;
        z-index: -1;
        width: 100%;
        height: 100%;

        img {
          height: 100%;
          filter: blur(25px);
          transform: translateX(-20%);
        }

        // 滤镜
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          // background-color: rgba(255, 255, 255, .5);
        }
      }

      // 右侧选择卡
      .right-select {
        position: absolute;
        right: 0;
        transform: translateX(100%);

        li {
          width: 40px;
          margin-bottom: 10px;
          box-sizing: border-box;
          border-radius: 0 5px 5px 0;
          padding: 5px;
          text-align: center;
          background-color: #fff;
          box-shadow: 2px 0 5px #ccc;
        }
        i {
          font-size: 25px;
          color: #888;
        }
      }
    }
    .music-list.list-show {
      box-shadow: 0 0 10px #aaa;
      height: 70vh;
      max-height: 70vh;
      opacity: 1;
    }

    // 底部浮动
    .music-float {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 67;
      width: 100vw;
      padding: 10px 0;
      border-top-right-radius: 5px;
      background-color: rgba(255, 255, 255, .6);
      box-shadow: 0 0 2px #ccc;
      transition: 1s;
      transform: translateX(calc(-100vw + 1.5rem));

      i {
        display: inline-block;
        font-size: 1.5rem;
        vertical-align: middle;
        transition: .4s;
        cursor: pointer;

        &:active {
          color: #888;
          text-shadow: 2px 2px 3px #ccc;
          transform: translateY(-2px);
          user-select: none;
        }
      }

      .icon-fangxiangxia {
        float: right;
        color: #ccc;
        transition: .5s;
        transform: rotate(270deg);
      }

      .music-icon {
        position: absolute;
        height: 40px;
        border: 2px solid #eee;
        border-radius: 50%;
        margin: -5px 0 0 5px;
      }
      .music-title {
        display: inline-block;
        overflow: hidden;
        margin-left: 60px;
        width: calc(100vw - 260px);
        text-overflow: ellipsis;
        vertical-align: middle;
        white-space: nowrap;
      }

      .music-right {
        float: right;

        i {
          margin: 5px 10px;
          &:nth-last-child(1) {
            margin: 5px 0 5px 20px;
          }
        }
      }
    }

    .music-float.float-show {
      background-color: rgba(255, 255, 255, .95);
      box-shadow: 0 0 10px #aaa;
      transform: translateX(0);

      .icon-fangxiangxia {
        border-bottom: 1px dashed #ccc;
        margin: 5px 0;
        color: #777;
        transform: rotate(90deg);
      }

      // 进度条
      .progress {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 4px;
        padding: 0;
        margin: 0 auto;
        background-color: rgba(168, 230, 244, .3);
      }
      .progress-load {
        position: absolute;
        top: 0;
        width: 30%;
        height: 4px;
        background-color: #a8e6f4;
        background-image: linear-gradient(45deg, rgba(255, 255, 255, .5) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .5) 50%, rgba(255, 255, 255, .5) 75%, transparent 75%, transparent);

        &::after {
          content: "";
          position: absolute;
          right: 0;
          width: 3px;
          height: 5.5px;
          background-color: #7be0f7;
          filter: blur(1px);
          transform: translateY(-1px);
        }
      }
    }
  }
</style>
