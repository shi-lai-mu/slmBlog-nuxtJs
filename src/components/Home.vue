<template>

    <div class="conter clearfix">
        <div class="shuffling">
            <div class="shuffling-flex">
                <span class="shuffling-left"></span>
                <ul class="shuffling-ling">
                    <li><img src="~@img/nvs/lun4.png" alt="NAV-2"></li>
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

                <div class="object clearfloat clearfix" v-for="(hot, index) in hotList" :key="index">
                    <a class="max-2" href="#"></a>
                    <div class="top clearfloat">
                        <h3 class="ellipsis">{{ hot.title }}</h3>
                        <ul>
                            <li v-for="(tag, i) in hot.tag" :key="i" :title="'查找' + tag + '标签'">
                                <a href="#">{{ tag }}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="content">
                        <img :src="hot.img" alt="images">
                    </div>
                    <span>
                        <!-- 150字 预览文章 -->
                        <p>{{ hot.content }}</p>
                    </span>
                    <ul class="info">
                        <li>浏览: 29</li>
                        <li>热度:
                            0℃                    </li>
                        <li>发表: 2018-09-04 02:31:13</li>
                    </ul>
                </div>

            </div>
            <div class="content-fixed-box">
            </div>
        </div>

    </div>

</template>

<script>

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
        console.log(res.data, res.data.tag)
        res.data = res.data.map(index => {
          index.tag = index.tag.split('#')
          index.tag.shift()
          index.content = index.content.replace(/(<[^>]+>|&\w+;)/img, '').substring(0, 125)
          return index
        })
        this.hotList = res.data
      })
  }
}
</script>

<style lang="less">
.object {
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
        background-image: url('~@img/home-slider-bg.png');
        background-position-y: -10px;
        background-position-x: center;
        background-size: auto;

        .info {
            background-color: white;
            color: #aaa;
        }
    }

    .content img {
        /* height: max-content;
        min-width: 100%; */
        height: 100%;
        margin: 0 auto;
        transition: 2s;

        &:hover {
            transform: scale(1.2);
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

    .info {
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
        font-weight: 600;
        color: var(--text-black);
        text-shadow: 1px 1px 0 var(--text-black-shadow);
        box-shadow: 8px 0 6px -6px rgba(0,0,0,.6);
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
    .info li {
        display: inline-block;
        margin: 0 10px;
        font-size: .8em;
        color: #aaa;
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

    p {
        color: #888;
    }
}
</style>
