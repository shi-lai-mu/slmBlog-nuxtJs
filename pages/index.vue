<template>
  <div class="home-page">
    <div class="top-banner banner-home"></div>
    <a-row class="home-content max-content">
      <a-col
        class="tbody"
        :lg="{ span: 16 }"
        :xxl="{ span: 16 }"
      >
        <Carousel effect="fade" class="home-carousel" arrows>
          <img :src="`${$config.ossLink}/carousel/carousel_1.png`" alt="">
          <img :src="`${$config.ossLink}/carousel/carousel_1.png`" alt="">
          <img :src="`${$config.ossLink}/carousel/carousel_1.png`" alt="">
          <img :src="`${$config.ossLink}/carousel/carousel_1.png`" alt="">
          <i class="slm blog-arrow-left" slot="prevArrow" style="left: 10px;zIndex: 1"></i>
          <i class="slm blog-arrow-right" slot="nextArrow" style="right: 10px;zIndex: 1"></i>
        </Carousel>
        <Notice v-if="$store.state.isMobile" class="mobile-notice"/>
        <ArticleList class="home-main-article-list" :ssr="articleLatest" />
      </a-col>
      <a-col
        class="sideber"
        :lg="{ span: 8 }"
        :xxl="{ span: 8 }"
      >
        <Notice v-if="!$store.state.isMobile"/>
        <UserCard :ssr="userData" />
        <FocalPointPlate />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Carousel } from 'ant-design-vue';

import { getUserBaseData } from '@/service/data/user';
import { getLatestArticle } from '@/service/data/article';

import Notice from '@/components/public/Notice.vue';
import UserCard from '@/components/public/UserCard.vue';
import ArticleList from '@/components/public/Article/List.vue';
import FocalPointPlate from '@/components/pages/home/FocalPointPlate.vue';

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
  async asyncData({ $http, $axios}) {
    return {
      userData: (await getUserBaseData(1)).result || {}, // 获取用户信息
      articleLatest: (await getLatestArticle()).result || [], // 获取最新文章
    };
  }
}
</script>

<style scoped lang="scss">
$blockSpacingX: 20px; // 版块间距 横轴
$blockSpacingY: 15px; // 版块间距 纵轴

.home-page {
  position: relative;
  // padding-top: 500px !important;

  .banner-home {
    opacity: .7;
    position: absolute;
    z-index: -1;
    top: 0;
    background-image: url('/banner/home_2.jpg');

    &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000, $alpha: .4);
      @include themify($themes, 1) {
        box-shadow: inset 0 -30px 20px themed('main-bg-color');
      }
    }
  }

  .home-content {
    margin: 20px auto;

    .home-carousel {
      max-width: 900px;
      margin: auto;
      padding-right: $blockSpacingX;

      .slm {
        @include themify($themes) {
          color: themed('font-color');
        }
      }

      /deep/ .slick-slide {
        border-radius: 10px;
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
      border-radius: 0;
    }
  }

  .mobile-notice {
    margin: $blockSpacingY 0;
    border-radius: 0;
  }
  
  /deep/ .home-main-article-list {
    margin-top: $blockSpacingY;
    margin-right: 0;
    border-radius: 0;
  }

  .sideber {
    padding: 20px;
  }
}
</style>
