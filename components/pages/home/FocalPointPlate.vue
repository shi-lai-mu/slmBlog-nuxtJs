<template>
  <FunctionalPlate title="焦点推荐">
    <div class="plate-first-place__row">
      <Imager class="plate-first-place__img" :src="'http://dummyimage.com/336x280'"/>
      <p class="plate-first-place__title line-ellipsis">这是一个首板块标题块标题块标题块</p>
    </div>
    <div class="plate-list-place">
      <nuxt-link :to="'#'" class="plate-list-opt__link" v-for="k in 4" :key="k">
        <label class="opt-link__label">活动</label>
        <p class="opt-link__title line-ellipsis">这是一个链接 哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或</p>
      </nuxt-link>
    </div>
  </FunctionalPlate>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

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
  @Prop(String) ssr;
  
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
      background-color: #C3CCD9;
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
