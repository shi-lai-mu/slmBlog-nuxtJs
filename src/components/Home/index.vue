<template>
  <tbody class="conter content-row clearfix home">
    <div class="article-list">
      <home-top></home-top>
      <home-hot></home-hot>
    </div>
    <home-right></home-right>
  </tbody>
</template>

<script>
import homeRight from './right'
import homeHot from './hot'
import homeTop from './top'
export default {
  metaInfo: {
    title: `史莱姆的博客`
  },
  components: {
    homeHot,
    homeRight,
    homeTop
  }
}
</script>

<style lang="less">
@ip: '//res.mczyzy.cn/img';

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

    & > section:not(:last-child) {
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

      // 骨架
      .no-black {
        min-width: 8rem;
        margin: 10px 0;
        background-color: #f1f1f1;
        min-height: .5rem;
        border-radius: 10px;
      }

      li.no-black {
        min-width: 1rem;
        height: 1rem;
        border: 0;
        background-color: #f1f1f1;
      }

      .look-center {
        margin-top: 20px;
      }
    }
  }

  @media screen and (max-width: 1100px) {
    .article-list {
      display: block;
      width: 100vw;
    }
  }

  .article-box-tag {
    margin: 0 0 10px 5px;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
  }
}
</style>
