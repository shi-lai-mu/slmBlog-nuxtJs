<template>
  <FunctionalPlate title="友情链接" :more-link="{ name: 'other-friend' }">
    <template v-if="renderData">
      <div v-for="(item, k) in renderData" :key="k" class="plate-list-place" :title="item.name">
        <img class="plate-list__icon" :src="item.icon" :alt="`${item.name} logo`" />
        <a class="plate-list-opt__link" :href="item.link">
          <p class="opt-link__title line-ellipsis">{{ item.name }}</p>
        </a>
      </div>
    </template>
    <ListBaseSkeleton v-else />
  </FunctionalPlate>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import RenderData from '@/components/mixins/RenderData'
import { getFriendLink } from '@/core/service/data/notify'
import { Notify } from '@/interface/request/notify'

import Images from '@/components/public/Images.vue'
import FunctionalPlate from '@/components/public/FunctionalPlate.vue'
import ListBaseSkeleton from './skeleton/ListBase.skeleton.vue'

/**
 * 友链板块 组件
 */
@Component({
  components: {
    Images,
    FunctionalPlate,
    ListBaseSkeleton,
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
@import './style/list.base.scss';

.plate-list-place {
  padding: 0 0 10px 15px;

  .plate-list__icon {
    width: 20px;
    height: 20px;
    vertical-align: text-top;
  }

  .plate-list-opt__link {
    width: auto;
    margin-top: 0;
    margin-left: 10px;
  }
}
</style>
