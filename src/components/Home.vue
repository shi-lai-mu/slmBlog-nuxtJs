<template>

    <tbody class="conter clearfix">

        <!-- <shuffling></shuffling> -->
        <div class="content-row clearfix">

            <!-- 左侧 -->
            <div class="content-box">
                <router-link v-for="(hot, index) in hotList" :key="index" :to="'/article/' + hot.Id">
                    <div class="article clearfix">
                        <div class="article-left">
                            <img v-lazy="hot.img" alt="images">
                        </div>
                        <div class="article-right">
                            <h3 class="ellipsis">{{ hot.title }}</h3>
                            <ul class="article-tag">
                                <li v-for="(type, i) in hot.type" :key="i" :title="'查找' + type + '标签'">
                                    <a href="#">{{ type }}</a>
                                </li>
                            </ul>
                            <p class="article-description ellipsis">{{ hot.description }}</p>
                        </div>
                    </div>
                </router-link>
                <ul v-if="!hotList.length">
                    <!-- 展示伪装 -->
                    <li v-for="i in 5" :key="i" class="article clearfix">
                        <div class="article-left">
                            <div class="no-black"></div>
                        </div>
                        <div class="article-right look-center">
                            <h3 class="ellipsis no-black"></h3>
                            <ul class="article-tag">
                                <li v-for="i in 5" :key="i" class="no-black"></li>
                            </ul>
                            <p class="article-description no-black"></p>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 右侧 -->
            <div class="content-aff-box">
                <div class="content-box blogger">
                    <img src="//thirdqq.qlogo.cn/g?b=sdk&k=s3zxCIMMOxfQibT9H8la8zg&s=100" alt="史莱姆头像">
                    <p class="name">史莱姆</p>
                    <div class="select">
                        <span class="button-lv0">关注</span>
                        <span class="button-lv0">了解</span>
                    </div>
                </div>
                <div class="content-box">

                </div>
            </div>

        </div>
    </tbody>

    <!-- <div class="content-left-box" v-for="(right, v) in rightList" :key="v">
        <div class="content-left-tag">
            <span v-text="right['tag']"></span>
            <i class="iconfont icon-fangxiangxia"></i>
        </div>
        <ul class="content-left-list" v-for="(top, i) in right['data']" :key="i">
            <router-link class="max-a" tag="li" v-text="top.title" :to="'/article/' + top.Id"></router-link>
        </ul>
    </div> -->
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

    // // 簡介内容
    // this.$http.get('blog/hot')
    //   .then(res => {
    //     this.hotList = res.data.map(index => {
    //       index.type = index.type.split('#')
    //       index.type.shift()
    //       return index
    //     })
    //   })

    // // 右侧文章
    // this.$http.get('blog/right', false, 1)
    //   .then(res => {
    //     this.rightList = res.data
    //     console.log(this.rightList)
    //   })
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
    margin-top: 40px;

    .content-box {
        padding: 0;
    }
    // 左侧
    .content-aff-box {
        float: right;
        width: 28%;

        .content-box {
            width: 100%;
            margin-bottom: 20px;
        }

        .blogger {
            padding-bottom: 10px;
            img {
                display: block;
                border-radius: 50%;
                margin: 20px auto 10px;
                border: 10px solid rgba(99,196,218,.25);
                transition: .2s;
                &:hover {
                    transform: translateY(-5px);
                    border: 10px solid rgba(99,196,218,.4);
                    box-shadow: 0 5px 25px rgba(0,0,0,.15);
                }
            }
            .name {
                color: #999;
                text-align: center;
                font-size: 22px;
            }
            .select {
                margin: 10px;
                text-align: center;
            }
        }
        .button-lv0 {
            margin: 0 10px;
        }
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
            padding: 10px 0;
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
    .article-tag li {
        display: inline-block;
        padding: 0 5px;
        border: 1px solid #e8e8e8;
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
    // 掩饰
    .no-black {
        min-width: 8rem;
        border-radius: 10px;
        margin: 10px 0;
        background-color: #f1f1f1;
    }
    li.no-black {
        min-width: 1rem;
        height: 1rem;
        border: 0;
    }
    .look-center {
        margin-top: 20px;
    }
}
</style>
