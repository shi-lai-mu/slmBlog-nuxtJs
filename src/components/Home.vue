<template>

    <div class="conter clearfix">

        <shuffling></shuffling>
        <div class="content-row clearfix">
            <div class="content-box">
                <router-link v-for="(hot, index) in hotList" :key="index" :to="'/article/' + hot.Id">
                    <div class="article clearfloat clearfix">
                        <a class="max-2" href="#"></a>
                        <div class="top clearfloat">
                            <h3 class="ellipsis">{{ hot.title }}</h3>
                            <ul class="font-shadow-black">
                                <li v-for="(type, i) in hot.type" :key="i" :title="'查找' + type + '标签'">
                                    <a href="#">{{ type }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="content">
                            <img v-lazy="hot.img.indexOf('//') > -1 ? hot.img : '//res.mczyzy.cn/img/upload/' + hot.img" alt="images">
                        </div>
                        <span>
                            <p>{{ hot.content }}</p>
                        </span>
                        <ul class="article-parameter">
                            <li>浏览: {{ hot.lookCount }}</li>
                            <li>评论: {{ hot.msg }}</li>
                            <li>发表: {{ unTime(hot.createTime) }}</li>
                        </ul>
                    </div>
                </router-link>
            </div>
            <div class="content-fixed-box">

                <div class="content-left-box">
                    <div class="content-left-tag">
                        <span>置顶文章</span>
                        <i class="iconfont icon-fangxiangxia"></i>
                    </div>
                    <ul class="content-left-list" v-for="(top, i) in rightList['top']" :key="i">
                        <router-link class="max-a" v-text="top.title" :to="'/article/' + top.Id"></router-link>
                    </ul>
                </div>

            </div>
        </div>

    </div>

</template>

<script>

import Time from '@pub/js/dateForm'
import shuffling from '@pub/vue/shuffling'

export default {
  data () {
    return {
      hotList: [],
      rightList: []
    }
  },
  created () {
    this.$connecter.$emit('page', {
      title: {
        tag: '首页',
        description: '欢迎浏览史莱姆的博客!（°Д°）Ъ'
      }
    })

    // 簡介内容
    let maxContent = this.$store.state.mobile ? 100 : 125
    this.$http.get('blog/hot')
      .then(res => {
        this.hotList = res.data.map(index => {
          index.type = index.type.split('#')
          index.type.shift()
          index.content = index.content.substring(0, maxContent) + ' ...'
          return index
        })
      })

    // 右侧文章
    this.$http.get('blog/right')
      .then(res => {
        this.rightList = res.data
        console.log(this.rightList)
      })
  },
  methods: {
    unTime: time => Time.form('yyyy-MM-dd HH:mm:ss', time * 1000)
  },
  components: {
    shuffling
  }
}
</script>

<style lang="less">
@ip: '//res.mczyzy.cn/img';

.article {
    position: relative;
    padding: 10px;
    border-top: 1px solid white;
    border-bottom: 1px solid #ccc;
    text-align: left;
    vertical-align: text-top;

    &:nth-child(1) {
        border-top: 0;
    }

    &:hover {
        background: url('//120.78.221.235/img/home-slider-bg.png') -10px center;
        background-size: auto;

        .article-parameter {
            background-color: #fff;
            color: #aaa;
        }
    }

    .content {
        display: flex;
        justify-content: center;

        img {
            height: 100%;
            margin: 0 auto;
            transition: 2s;

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .object > span {
        display: inline-block;
        overflow: hidden;
        width: 65%;
        height: 120px;
        padding: 10px;
        box-sizing: border-box;
        font-size: .9em;
    }

    .article-parameter {
        display: flex;
        float: right;
        width: auto;
        min-width: 40%;
        line-height: 25px;
        padding: 0 10px;
        border: 1px dashed;
        border-radius: 5px;
        background-image: url('~@img/line-pattern-light-bg.png');
        color: #ccc;
        transition: 4s;

        span {
            color: var(--button-font-shadow-color);
        }

        li {
            display: inline-block;
            min-width: 2rem;
            margin: 0 10px;
            font-size: .8em;
            color: #aaa;
        }
    }

    .content {
        overflow: hidden;
        float: left;
        position: relative;
        width: 30%;
        min-width: 100px;
        height: 26vw;
        max-height: 155px;
        min-height: 100px;
        border: 10px solid transparent;
        margin-left: 10px;
        background-image: url('~@img/line-pattern-light-bg.png');
        box-sizing: border-box;

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: 0 0 20px rgba(0,0,0,.6) inset;
            pointer-events: none;
        }
    }

    h3 {
        position: relative;
        float: left;
        width: 27%;
        min-width: 150px;
        margin: 10px 15px 5px;
    }

    .contents {
        padding: 30px 5vw;
        text-align: left;
        font-size: 16px;
        line-height: 2em;
        color: #333;
    }

    .top {
        overflow: hidden;
        height: 35px;
    }

    .top li, .addContent .tags a, .top li, .addContent .tags button {
        position: relative;
        float: left;
        line-height: 35px;
        padding: 0 5px 0 20px;
        margin: 0 5px;
        background: url('~@img/tags-bg.png') no-repeat;
        background-position-x: -1px;
        border-radius: 0 10px 5px 0;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .top li:hover, .addContent .tags a:hover, .top li:hover, .addContent .tags button:hover {
        background-position-y: -37px;
    }
    .addContent .hr {
        min-height: 20px;
        margin-bottom: 30px;
        font-size: 20px;
        font-weight: bold;
        color: var(--text-black-shadow)
    }
}

.article > span {
    display: inline-block;
    overflow: hidden;
    width: 65%;
    height: 120px;
    padding: 10px;
    box-sizing: border-box;
    font-size: .9em;

    p {
        color: #888;
    }
}
// 左侧
.content-fixed-box {
    // background-image: none;

    .content-left-box {
        width: 90%;
        padding: 2.5%;
        border-radius: 5px;
        margin: 10px auto;
        background-image: url('@{ip}/pattern-bg.jpg');
        box-shadow: 0 5px 5px rgba(0, 0, 0, .2);
    }
    .content-left-tag {
        padding-bottom: 5px;
        border-bottom: 1px solid #a2abbd;
        font-weight: bold;

        .icon-fangxiangxia {
            display: inline-block;
            float: right;
            color: #666;
            transform: rotate(-90deg);
            cursor: pointer;
        }
    }
    .content-left-list li {
        overflow: hidden;
        padding: 2px .5em;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #555;

        &:hover {
            font-weight: bold;
        }
    }
}
</style>
