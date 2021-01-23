<template>
  <div class="article-skeleton skeleton">
    <a-row class="article-layout max-content">
      <a-col
        class="article-page__container max-content"
        :lg="{ span: 16 }"
        :xxl="{ span: 16 }"
      >
        <aside class="article-action"></aside>
        <div class="article-content__container row-box">
          <div class="article-content__header">
            <span class="title skeleton-title"></span>
            <div class="article-content__info">
              <span class="release-time skeleton-desc"></span>
              <div class="icon-box">
                <span class="skeleton-tag"></span>
                <span class="skeleton-tag"></span>
              </div>
              <ul class="tag-list">
                <li class="tag-item skeleton-tag" v-for="(item, key) in 5" :key="key"></li>
              </ul>
            </div>
          </div>
          <div class="article-content__body">
            <ul class="skeleton-content-box" v-for="(item, key) in 3" :key="key">
              <li class="skeleton-title"></li>
              <li class="skeleton-desc"></li>
              <li class="skeleton-desc"></li>
              <li class="skeleton-desc"></li>
              <li class="skeleton-desc"></li>
            </ul>
          </div>
        </div>
        <div class="article-reply__container">

        </div>
      </a-col>
      <a-col
        class="article-page__sideber"
        :lg="{ span: 8 }"
        :xxl="{ span: 8 }"
      >
        <UserCard />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue }   from 'nuxt-property-decorator';
import UserCard from '@/components/public/UserCard.vue';

/**
 * 文章内容骨架
 */
@Component({
  components: {
    UserCard,
  },
})
export default class UserCardSkeleton extends Vue {}
</script>

<style  lang="scss" scoped>
  .skeleton {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .article-layout {
      opacity: 1 !important;
    }

    .article-content__header .skeleton-title {
      font-size: 2rem;
    }

    .skeleton-tag {
      width: 50px;
    }

    .skeleton-content-box {
      font-size: 1.5rem;
      .skeleton-title {
        margin-bottom: 25px;
      }

      .skeleton-desc {
        margin-bottom: 20px;
      }

      & :nth-child(2n) {
        width: 90% !important;
      }
    }
  }
</style>
