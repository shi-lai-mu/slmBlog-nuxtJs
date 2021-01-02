<template>
  <FunctionalPlate title="焦点推荐">

    <template v-if="renderList.top">
      <!-- <div class="plate-first-place__row">
        <Imager class="plate-first-place__img" :src="list.top.banner"/>
        <p class="plate-first-place__title line-ellipsis">{{ list.top.subject }}</p>
      </div> -->
      <div class="plate-list-place">
        <nuxt-link :to="'/article/' + item.id" class="plate-list-opt__link" v-for="(item, k) in ssr" :key="k">
          <label class="opt-link__label">活动</label>
          <p class="opt-link__title line-ellipsis">{{ item.subject }}</p>
        </nuxt-link>
      </div>
    </template>

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

import Imager from '@/components/public/Imager.vue';
import FunctionalPlate from '@/components/public/FunctionalPlate.vue';

import { Article } from '@/interface/request/article';

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

  renderList: any = {};

  created() {
    this.ssr && this.setRenderData(this.ssr);
  }


  /**
   * 设置渲染属性
   */
  @Watch('ssr')
  setRenderData(articleList: Article.Base[]) {
    if (!articleList.length) return false;
    console.log(articleList.length);
    
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
