<template>
  <FunctionalPlate title="友情链接">
    <template v-if="renderData">
      <div v-for="(item, k) in renderData" :key="k" class="plate-list-place" :title="item.name">
        <img class="plate-list__icon" :src="item.icon" :alt="`${item.name} logo`" />
        <nuxt-link class="plate-list-opt__link" :to="item.link">
          <p class="opt-link__title line-ellipsis">{{ item.name }}</p>
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

import RenderData from '@/components/mixins/RenderData'
import { getFriendLink } from '@/core/service/data/notify'
import { Notify } from '@/interface/request/notify'

/**
 * 友链板块 组件
 */
@Component({
  components: {
    Images,
    FunctionalPlate,
  },
})
export default class FriendPointPlate extends RenderData<Notify.FriendLink[], Notify.FriendLink[]> {
  /** 获取数据 */
  static fetchData = async () => (await getFriendLink()).result?.list

  created() {
    this.setRenderData(this.ssr, FriendPointPlate)
  }
}
</script>

<style lang="scss" scoped>
.plate-list-place {
  padding-bottom: 10px;
  padding-left: 15px;

  .plate-list__icon {
    width: 20px;
    height: 20px;
    vertical-align: text-top;
  }

  .plate-list-opt__link {
    display: inline-flex;
    margin-left: 10px;
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
