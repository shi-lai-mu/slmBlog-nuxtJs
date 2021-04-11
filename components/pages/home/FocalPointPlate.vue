<template>
  <FunctionalPlate title="焦点推荐">
    <template v-if="renderList.top || renderList.children">
      <router-link class="plate-first-place__row" :to="$config.router.to('article', { id: renderList.top.id })" v-if="renderList.top">
        <Imager class="plate-first-place__img" :src="renderList.top.banner"/>
        <p class="plate-first-place__title line-ellipsis">{{ renderList.top.subject }}</p>
      </router-link>
      <div class="plate-list-place">
        <nuxt-link class="plate-list-opt__link" :to="$config.router.to('article', { id: item.id })" v-for="(item, k) in renderList.children" :key="k">
          <label class="opt-link__label">活动</label>
          <p class="opt-link__title line-ellipsis">{{ item.subject }}</p>
        </nuxt-link>
      </div>
    </template>

    <!-- 骨架 -->
    <template v-else>
      <div class="skeleton">
        <div class="plate-list-place">
          <a class="plate-list-opt__link" v-for="(item, k) in Array(5)" :key="k">
            <span class="opt-link__label skeleton-tag"></span>
            <span :class="['opt-link__title', 'line-ellipsis', k % 2 ? 'skeleton-title' : 'skeleton-desc']"></span>
          </a>
        </div>
      </div>
    </template>

  </FunctionalPlate>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';

import { GlobalTool } from '@/utils/tool';
import { Article } from '@/interface/request/article';

import Imager from '@/components/public/Imager.vue';
import FunctionalPlate from '@/components/public/FunctionalPlate.vue';

/**
 * 焦点板块 组件
 */
@Component({
  name: 'FocalPointPlate',
  components: {
    FunctionalPlate,
    Imager,
  },
})
export default class FocalPointPlate extends Vue {
  @Prop(Array) ssr?: Article.Base[];

  /**
   * 渲染列表
   */
  renderList: any = {};

  created() {
    if (this.ssr) this.setRenderData(this.ssr);
  }


  /**
   * 设置渲染数据
   */
  @Watch('ssr')
  async setRenderData(articleList: Article.Base[]) {
    await GlobalTool.speed();
    if (!articleList.length) return false;
    articleList = Object.assign([], articleList);
    this.renderList = {
      top: articleList.shift(),
      children: articleList,
    };
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
    background-color: rgba($color: #000, $alpha: .45);
    transition: .5s;

    &:hover {
      background-color: rgba($color: #000, $alpha: .6);
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
      color: #FFF;
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
