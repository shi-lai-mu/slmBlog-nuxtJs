<template>

    <div class="conter clearfix">
        <div class="shuffling">
            <div class="shuffling-flex">
                <span class="shuffling-left"></span>
                <ul class="shuffling-ling">
                    <!-- http://120.78.221.235/lun4.png -->
                    <li><img v-lazy="'http://120.78.221.235/img/shuffling/0.png'" alt="NAV-0"></li>
                    <li><img v-lazy="'http://120.78.221.235/img/shuffling/1.jpg'" alt="NAV-1"></li>
                </ul>
                <span class="shuffling-right"></span>
            </div>
            <ul class="shuffling-select">
                <li class="on"></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

        <div class="content-row clearfix">
            <div class="content-fixed-box">
            </div>
            <div class="content-box">
                <router-link v-for="(hot, index) in hotList" :key="index" :to="'/article/' + hot.Id">
                    <div class="article clearfloat clearfix">
                        <a class="max-2" href="#"></a>
                        <div class="top clearfloat">
                            <h3 class="ellipsis">{{ hot.title }}</h3>
                            <ul class="font-shadow-black">
                                <li v-for="(tag, i) in hot.tag" :key="i" :title="'查找' + tag + '标签'">
                                    <a href="#">{{ tag }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="content">
                            <img v-lazy="hot.img" alt="images">
                        </div>
                        <span>
                            <p>{{ hot.content }}</p>
                        </span>
                        <ul class="article-parameter">
                            <li>浏览: {{ hot.lookCount }}</li>
                            <li>评论: {{ hot.msgMe }}</li>
                            <li>发表: {{ unTime(hot.createTime) }}</li>
                        </ul>
                    </div>
                </router-link>
            </div>
            <div class="content-fixed-box">
            </div>
        </div>

    </div>

</template>

<script>

import Time from '@pub/js/dateForm'

export default {
  data () {
    return {
      hotList: []
    }
  },
  created () {
    this.$connecter.$emit('page', {
      title: {
        tag: '首页',
        description: '欢迎浏览史莱姆的博客!（°Д°）Ъ'
      }
    })
    this.$http.get('blog/hot')
      .then(res => {
        this.hotList = res.data.map(index => {
          index.tag = index.tag.split('#')
          index.tag.shift()
          index.content = index.content.replace(/(<[^>]+>|&\w+;)/img, '').substring(0, 125) + ' ...'
          return index
        })
      })
  },
  methods: {
    unTime: time => Time.form('yyyy-MM-dd HH:mm:ss', time * 1000)
  }
}
</script>

<style lang="less">
.article {
    position: relative;
    padding: 10px;
    text-align: left;
    vertical-align: text-top;
    border-top: 1px solid white;
    border-bottom: 1px solid #ccc;

    &:nth-child(1) {
        border-top: 0;
    }

    &:hover {
        background-image: url('//120.78.221.235/img/home-slider-bg.png');
        background-position-y: -10px;
        background-position-x: center;
        background-size: auto;

        .article-parameter {
            background-color: white;
            color: #aaa;
        }
    }

    .content {
        display: flex;
        justify-content: center;
        img {
            /* height: max-content;
            min-width: 100%; */
            height: 100%;
            margin: 0 auto;
            transition: 2s;
            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .object > span {
        overflow: hidden;
        display: inline-block;
        width: 65%;
        height: 120px;
        padding: 10px;
        box-sizing: border-box;
        font-size: .9em;
    }

    .article-parameter {
        float: right;
        display: flex;
        min-width: 40%;
        width: auto;
        line-height: 25px;
        padding: 0 10px;
        background-image: url('~@img/line-pattern-light-bg.png');
        border: 1px dashed;
        border-radius: 5px;
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
        margin-left: 10px;
        width: 30%;
        height: 155px;
        border: 10px solid transparent;
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
        margin:  0 5px;
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
    overflow: hidden;
    display: inline-block;
    width: 65%;
    height: 120px;
    padding: 10px;
    box-sizing: border-box;
    font-size: .9em;

    p {
        color: #888;
    }
}
</style>
