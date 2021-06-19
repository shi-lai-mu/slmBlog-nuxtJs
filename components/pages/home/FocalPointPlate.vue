<template>
  <FunctionalPlate title="焦点推荐">
    <template v-if="renderData">
      <router-link
        v-if="renderData.top"
        class="plate-first-place__row"
        :to="{
          name: 'article-id',
          params: {
            id: renderData.top.id,
          },
        }"
      >
        <Images class="plate-first-place__img" :src="renderData.top.banner" />
        <p class="plate-first-place__title line-ellipsis">{{ renderData.top.subject }}</p>
      </router-link>
      <div class="plate-list-place">
        <nuxt-link
          v-for="(item, k) in renderData.children"
          :key="k"
          class="plate-list-opt__link"
          :to="{
            name: 'article-id',
            params: {
              id: item.id,
            },
          }"
        >
          <label class="opt-link__label">活动</label>
          <p class="opt-link__title line-ellipsis">{{ item.subject }}</p>
        </nuxt-link>
      </div>
    </template>

    <!-- 骨架 -->
    <template v-else>
      <div class="skeleton">
        <div class="plate-list-place">
          <a v-for="(item, k) in Array(5)" :key="k" class="plate-list-opt__link">
            <span class="opt-link__label skeleton-tag"></span>
            <span
              :class="[
                'opt-link__title',
                'line-ellipsis',
                k % 2 ? 'skeleton-title' : 'skeleton-desc',
              ]"
            ></span>
          </a>
        </div>
      </div>
    </template>
  </FunctionalPlate>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import Images from '@/components/public/Images.vue'
import FunctionalPlate from '@/components/public/FunctionalPlate.vue'
import { Article } from '@/interface/request/article'

import { getArticleList } from '~/core/service/data/article'
import RenderData from '~/components/mixins/RenderData'

/**
 * 焦点板块 组件
 */
@Component({
  components: {
    Images,
    FunctionalPlate,
  },
})
export default class FocalPointPlate extends RenderData<
  Article.Base[],
  {
    top: Article.Base
    children: Article.Base[]
  }
> {
  /** 获取数据 */
  static fetchData = async () => (await getArticleList('recommend', 1, 5)).result?.list

  /** 解析数据 */
  parseData = (data: Article.Base[]) => ({
    top: data?.shift(),
    children: data,
  })

  created() {
    this.setRenderData(this.ssr, FocalPointPlate)
  }
}
</script>

<style lang="scss" scoped>
.plate-first-place__row {
  overflow: hidden;
  position: relative;
  display: block;
  border-radius: 10px;
  cursor: pointer;

  .plate-first-place__img {
    height: 150px;
  }

  .plate-first-place__title {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 0;
    padding: 5px 10px;
    background-color: rgba($color: #000, $alpha: 0.45);
    transition: 0.5s;

    &:hover {
      background-color: rgba($color: #000, $alpha: 0.6);
    }
  }
}

.plate-list-place {
  padding: 10px 0;
  .plate-list-opt__link {
    display: inline-flex;
    width: 100%;
    margin-top: 10px;
    white-space: nowrap;
    align-items: center;

    .opt-link__label {
      width: 32px;
      height: 16px;
      line-height: 16px;
      margin-right: 20px;
      font-size: 12px;
      color: #fff;
      background-color: #75a5e9;
      border-radius: 3px;
      text-align: center;
      flex-shrink: 0;
    }

    .opt-link__title {
      margin-bottom: 0;
    }

    & + .plate-list-place__card {
      margin-top: 10px;
    }
  }
}
</style>
