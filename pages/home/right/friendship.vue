// 友情链接 模块
<template>
  <aside class="content-box">
    <span class="content-tag">
      <span>友情链接:</span>
      <router-link to="/other/friendship" class="right">更多</router-link>
    </span>
    <ul class="content-list friendship" v-if="ship">
      <li v-for="(item, key) in ship.data" :key="key">
        <img :src="item.icon" :title="item.name + 'LOGO'">
        <a :href="item.web" target="_black">{{ item.name }}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    ship: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.friendship {
  position: relative;
  padding-left: 0;

  img {
    width: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }

  li {
    width: 90%;
    margin-left: 5%;
    padding-bottom: 5px;
    list-style: inherit;
    border-bottom: 1px solid #eee;

    &:hover {
      color: #6bbcce;
    }
  }
}
</style>
