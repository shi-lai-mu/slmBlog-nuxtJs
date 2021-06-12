<template>
  <div class="row-box functional-plate__row">
    <div class="functional-plate__header">
      <slot name="header">
        <h2 class="functional-plate__title" v-text="title || '板块'"></h2>
        <nuxt-link
          :to="moreLink || '#'"
          class="functional-plate__link"
          v-text="moreName || '更多'"
        ></nuxt-link>
      </slot>
    </div>
    <div class="functional-plate__body">
      <slot>
        <div class="functional-plate__loading">loading ...</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

/**
 * 工具板块组件
 */
@Component({ name: 'PublicFunctionalPlateComponent' })
export default class PublicFunctionalPlateComponent extends Vue {
  /**
   * 标题
   */
  @Prop(String) title
  /**
   * 更多 文字内容
   */
  @Prop(String) moreName
  /**
   * 更多 链接
   */
  @Prop(String) moreLink
}
</script>

<style lang="scss" scoped>
.functional-plate__row {
  padding: 0;

  .functional-plate__header {
    display: flex;
    padding: 15px 20px;
    justify-content: space-between;
    align-items: center;

    .functional-plate__title {
      margin-bottom: 0;
      font-size: 1.05rem;
      font-weight: bold;
    }
  }

  .functional-plate__body {
    padding: 0 15px 15px;

    .functional-plate__loading {
      text-align: center;
    }
  }
}
</style>
