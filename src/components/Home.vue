<template>

    <div class="conter clearfix">

        <!-- <shuffling></shuffling> -->
        <div class="content-row clearfix">
            <div class="content-box">
                <router-link v-for="(hot, index) in hotList" :key="index" :to="'/article/' + hot.Id">
                    <div class="article clearfix">
                        <div class="article-left">
                            <img v-lazy="hot.img" alt="images">
                        </div>
                        <div class="article-right">
                            <h3 class="ellipsis">{{ hot.title }}</h3>
                            <ul class="font-shadow-black">
                                <li v-for="(type, i) in hot.type" :key="i" :title="'查找' + type + '标签'">
                                    <a href="#">{{ type }}</a>
                                </li>
                            </ul>
                            <p class="article-description ellipsis">{{ hot.description }}</p>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="content-box content-aff-box">
                <!-- <div class="content-left-box" v-for="(right, v) in rightList" :key="v">
                    <div class="content-left-tag">
                        <span v-text="right['tag']"></span>
                        <i class="iconfont icon-fangxiangxia"></i>
                    </div>
                    <ul class="content-left-list" v-for="(top, i) in right['data']" :key="i">
                        <router-link class="max-a" tag="li" v-text="top.title" :to="'/article/' + top.Id"></router-link>
                    </ul>
                </div> -->
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

.content-row {
    .content-box {
        padding: 0;
    }
    .content-aff-box {
        float: right;
        width: 27%;
    }
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

    .article-right {
        float: left;
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

    .article-left {
        display: flex;
        justify-content: center;
        overflow: hidden;
        float: left;
        width: 23%;
        min-width: 100px;
        height: 7vw;
        max-height: 114px;
        min-height: 100px;
        border-radius: 5px;
        margin: 10px;

        img {
            height: 100%;
            margin: 0 auto;
            transition: 1s;

            &:hover {
                transform: scale(1.2);
            }
        }
    }
}
</style>
