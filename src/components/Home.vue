<template>

    <div class="conter clearfix">

        <!-- <shuffling></shuffling> -->
        <div class="content-row clearfix">
            <div class="content-box">
                <router-link v-for="(hot, index) in hotList" :key="index" :to="'/article/' + hot.Id">
                    <div class="article clearfix">
                        <div class="content">
                            <img v-lazy="hot.img.indexOf('//') > -1 ? hot.img : '//res.mczyzy.cn/img/upload/' + hot.img" alt="images">
                        </div>
                        <div class="article-top">
                            <h3 class="ellipsis">{{ hot.title }}</h3>
                            <ul class="font-shadow-black">
                                <li v-for="(type, i) in hot.type" :key="i" :title="'查找' + type + '标签'">
                                    <a href="#">{{ type }}</a>
                                </li>
                            </ul>
                            <p class="article-description ellipsis">{{ hot.content }}</p>
                        </div>
                        <!-- <ul class="article-parameter">
                            <li>浏览: {{ hot.lookCount }}</li>
                            <li>评论: {{ hot.msg }}</li>
                            <li>发表: {{ unTime(hot.createTime) }}</li>
                        </ul> -->
                    </div>
                </router-link>
            </div>
            <!-- <div class="content-fixed-box">

                <div class="content-left-box" v-for="(right, v) in rightList" :key="v">
                    <div class="content-left-tag">
                        <span v-text="right['tag']"></span>
                        <i class="iconfont icon-fangxiangxia"></i>
                    </div>
                    <ul class="content-left-list" v-for="(top, i) in right['data']" :key="i">
                        <router-link class="max-a" tag="li" v-text="top.title" :to="'/article/' + top.Id"></router-link>
                    </ul>
                </div>

            </div> -->
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
    this.$http.get('blog/right', false, 1)
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

.content-box {
    padding: 0;
}
.article {
    padding: 10px;
    border-top: 1px solid white;
    border-bottom: 1px solid #e8e8e8;
    text-align: left;
    vertical-align: text-top;

    &:nth-child(1) {
        border-top: 0;
    }

    &:hover {
        background-color: #f9f9f9;

        .article-parameter {
            background-color: #fff;
            color: #aaa;
        }
    }

    .article-top {
        overflow: hidden;
        width: 60%;
        margin: 10px 15px;

        h3 {
            display: inline-block;
            margin: 0;
            font-weight: 300;
        }
        .article-description {
            padding: 10px 5px;
            font-size: .9em;
            color: #aaa;
        }
    }

    .content {
        display: flex;
        justify-content: center;
        border-radius: 5px;

        img {
            height: 100%;
            margin: 0 auto;
            transition: 1s;

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
        margin: 10px;

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
    }
    .contents {
        padding: 30px 5vw;
        text-align: left;
        font-size: 16px;
        line-height: 2em;
        color: #333;
    }

    .font-shadow-black li {
        display: inline-block;
        border: 1px solid #e8e8e8;
        padding: 0 5px;
        border-radius: 3px;
        margin: 0 5px;
        vertical-align: middle;
        font-size: .8rem;
        color: #999;
        transition: .3s;

        &:hover {
            background-color: #e9e9e9;
            transform: translateY(-1px);
        }
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
        cursor: pointer;

        &:hover {
            font-weight: bold;
        }
    }
}
</style>
