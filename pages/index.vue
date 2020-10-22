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
          <div><h3>23</h3></div>
          <div><h3>354</h3></div>
          <div><h3>45</h3></div>
          <i class="slm blog-arrow-left" slot="prevArrow" style="left: 10px;zIndex: 1"></i>
          <i class="slm blog-arrow-right" slot="nextArrow" style="right: 10px;zIndex: 1"></i>
        </Carousel>
      </a-col>
      <a-col
        class="sideber"
        :lg="{ span: 8 }"
        :xxl="{ span: 8 }"
      >
        <Notice />
        <UserCard :userId="1" />
      </a-col>
    </a-row>
    <i class="slm blog-arrow-left"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Carousel } from 'ant-design-vue';

import Notice from '@/components/public/Notice.vue';
import UserCard from '@/components/public/UserCard.vue';

@Component({
  components: {
    Carousel,
    Notice,
    UserCard,
  },
})
export default class HomePage extends Vue {
}
</script>

<style scoped lang="scss">
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
      overflow: hidden;
      max-width: 800px;
      border-radius: 10px;
      margin: auto;

      .slm {
        @include themify($themes) {
          color: themed('font-color');
        }
      }
    }
  }
}

// 移动端
.layout-default-mobile .home-page {
  padding-top: 30px;

  .home-carousel {
    border-radius: 0;
  }

  .sideber {
    padding: 20px;
  }
}
</style>
