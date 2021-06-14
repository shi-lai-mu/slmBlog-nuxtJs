<template>
  <div class="home-page">
    <a-row class="home-content max-content">
      <a-col class="tbody" :lg="{ span: 16 }" :xxl="{ span: 16 }">
        <Carousel effect="fade" class="home-carousel" arrows>
          <img :src="`${$config.ossLink}/carousel/carousel_1.png`" alt="" />
          <img :src="`${$config.ossLink}/carousel/carousel_1.png`" alt="" />
          <img :src="`${$config.ossLink}/carousel/carousel_1.png`" alt="" />
          <img :src="`${$config.ossLink}/carousel/carousel_1.png`" alt="" />
          <i slot="prevArrow" class="slm blog-arrow-left" style="left: 10px; z-index: 1"></i>
          <i slot="nextArrow" class="slm blog-arrow-right" style="right: 10px; z-index: 1"></i>
        </Carousel>
        <Notice v-if="$store.state.isMobile" class="mobile-notice" />
        <ArticleList class="home-main-article-list" :ssr="articleLatest" />
      </a-col>
      <a-col class="sideber" :lg="{ span: 8 }" :xxl="{ span: 8 }">
        <UserCard :ssr="userData" user-self user-state />
        <Notice v-if="!$store.state.isMobile" />
        <FocalPointPlate :ssr="recommendedArticle" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Carousel } from 'ant-design-vue'
import { Component, Vue } from 'nuxt-property-decorator'

import { User } from '@/interface/request/user'
import { Article } from '@/interface/request/article'
import { getUserBaseData } from '@/core/service/data/user'
import { getArticleList } from '@/core/service/data/article'

import Notice from '@/components/public/Notice.vue'
import UserCard from '@/components/public/UserCard.vue'
import ArticleList from '@/components/public/Article/List.vue'
import FocalPointPlate from '@/components/pages/home/FocalPointPlate.vue'

/** 首页 */
@Component({
  name: 'HomePage',
  components: {
    Carousel,
    Notice,
    UserCard,
    ArticleList,
    FocalPointPlate,
  },
})
export default class HomePage extends Vue {
  /** 文章页数 */
  articlePage = 1
  /** 博主用户数据 */
  userData!: User.Base | {}
  /** 推荐文章数据 */
  recommendedArticle!: Article.Base[]
  /** 更新排序文章数据 */
  articleLatest: Article.Base[]

  async asyncData() {
    return {
      // 获取用户信息
      userData: (await getUserBaseData(1)).result || {},
      // 获取最新文章
      articleLatest: (await getArticleList()).result?.list || [],
      // 获取5篇推荐文章
      recommendedArticle: (await getArticleList('recommend', 1, 5)).result?.list || [],
    }
  }

  created() {
    this.$parent.$emit('setLayout', ['layoutFooter', true])
  }
}
</script>

<style lang="scss" scoped>
$blockSpacingX: 20px; // 版块间距 横轴
$blockSpacingY: 15px; // 版块间距 纵轴

.home-page {
  position: relative;
  // padding-top: 500px !important;

  .home-content {
    margin: 80px auto 20px;

    .home-carousel {
      max-width: 900px;
      margin: auto;
      padding-right: $blockSpacingX;

      .slm {
        margin-top: 0;
      }

      /deep/ .slick-slide {
        display: flex;
        align-items: center;
        border-radius: 10px;
        height: 15vmax;
        overflow: hidden;
      }
    }
  }

  /deep/ .home-main-article-list {
    margin-top: $blockSpacingY;
    margin-right: $blockSpacingX;
  }
}

// 移动端
.layout-default-mobile .home-page {
  padding-top: 30px;
  $blockSpacingY: 10px;

  .home-carousel {
    padding-right: 0;

    /deep/ .slick-slide {
      height: auto;
      border-radius: 0;
    }
  }

  .mobile-notice {
    margin: $blockSpacingY 0;
    border-radius: 0;
  }

  /deep/ .home-main-article-list {
    width: calc(100% - 5px);
    margin-top: $blockSpacingY;
    margin-right: 0;
    border-radius: 0;
  }

  .row-box {
    width: calc(100% - 5px);
    margin-top: 20px;
    border-radius: 0;
  }
}
</style>
