<template>
  <section class="conter content-row clearfix home">
    <div class="article-list">
      <home-top :top="top"></home-top>
      <home-hot :hot="hot" />
    </div>
    <home-right :right="right"/>
  </section>
</template>

<script>
import homeRight from '~/components/Home/right'
import homeHot from '~/components/Home/hot'
import homeTop from '~/components/Home/top'

export default {
  async asyncData ({ $axios }) {
    let data
    try {
      data = {
        hot: await $axios.api('HOME_HOT').get(),
        right: await $axios.api('HOME_RIGHT').get(),
        top: await $axios.api('HOME_TOP').get()
      }
    } catch (e) {
      throw Error('首页数据请求失败: ' + e)
    }
    return data
  },
  components: {
    homeHot,
    homeRight,
    homeTop
  }
}
</script>

<style lang="less">
  @ip: '/img';

  .home {
    margin-bottom: 40px;

    .content-box {
      display: block;
      width: 100%;
      padding: 0;
      overflow: hidden;
    }

    .right {
      float: right;
    }

    // 左侧
    .article-list {
      float: left;
      width: 70%;
      margin-bottom: 20px;

      &>section:not(:last-child) {
        margin-bottom: 30px;
      }

      .article {
        position: relative;
        display: flex;
        padding: 10px;
        text-align: left;
        vertical-align: text-top;
        cursor: pointer;
        align-items: center;
        border-top: 1px solid white;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
        flex-wrap: wrap;

        &:nth-child(1) {
          border-top: 0;
        }

        &:hover {
          background-color: #f9f9f9;

          .article-parameter {
            color: #aaa;
            background-color: #fff;
          }
        }

        .article-right {
          float: left;
          width: calc(100% - 150px);
          margin: 10px 15px;
          pointer-events: none;

          h3 {
            display: inline-block;
            min-width: 150px;
            padding: 10px 0;
            margin: 0;
            font-weight: 300;
          }

          .article-description {
            padding: 0 5px 10px;
            font-size: .9em;
            color: #aaa;
          }
        }

        .article-left {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          float: left;
          width: 100px;
          height: 10vw;
          min-height: 80px;
          max-height: 100px;
          margin: 10px;
          overflow: hidden;
          border-radius: 5px;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          pointer-events: none;

          img {
            height: 100%;
            -webkit-transition: 1s;
            transition: 1s;
            pointer-events: all;

            &:hover {
              -webkit-transform: scale(1.5);
              transform: scale(1.5);
            }
          }
        }

        .article-tag li {
          display: inline-block;
          padding: 0 5px;
          margin: 0 5px;
          font-size: .8rem;
          color: #999;
          vertical-align: middle;
          cursor: pointer;
          background-color: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 3px;
          -webkit-transition: .3s;
          transition: .3s;
          pointer-events: initial;

          &:hover {
            border: 1px solid #999;
          }
        }
      }
    }

    @media screen and (max-width: 1100px) {
      .article-list {
        display: block;
        width: 100%;
      }
    }

    .article-box-tag {
      margin: 0 0 10px 5px;
      font-size: 20px;
      font-weight: 600;
      line-height: 32px;
      h3 {
        display: inline-block;
        margin: 0;
      }
    }
  }
</style>
