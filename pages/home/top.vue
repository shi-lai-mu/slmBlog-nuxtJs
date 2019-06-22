<template>
  <section v-show="top.length">
    <div class="article-box-tag">
      <i class="iconfont icon-zhiding"></i>
      <h3>置顶区域</h3>
    </div>
    <ul class="content-box top">
      <li v-for="(item, index) in top" :key="index">
        <nuxt-link
          :to="{
            name: 'article-id',
            params: { id: item.Id }
          }"
          class="max-a"
        >
          {{ item.title }}
          <span class="description ellipsis">[ {{ item.description }} ]</span>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ['top']
}
</script>

<style lang="less">
.home .top {
  li {
    border-top: 1px solid #eee;

    &:not(:last-child) {
      border-top: 0;
    }

    &:hover {
      background-color: rgba(0, 0, 0, .01);
    }

    .description {
      display: inline-block;
      width: 50%;
      margin-left: 20px;
      vertical-align: sub;
      color: #ccc;
    }
    .max-a {
      padding: 10px;
    }
  }
}
</style>
