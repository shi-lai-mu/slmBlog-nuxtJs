<template>
  <aside class="content-box">
    <span class="content-tag">
      <span>最新留言:</span>
    </span>
    <ul class="content-list" v-if="message">
      <li v-for="(item, key) in message" :key="key">
        <router-link class="max-a msg-box" :to="{ name: 'article-id', params: { id: item.article } }">
          <span class="msg-name" v-text="item.autherName"></span>:
          <span class="msg-text" v-text="item.content.replace(/<[^>]*>|<\/[^>]*>/gm, '')"></span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    message: {
      type: Array
    }
  }
}
</script>

<style lang="less" scope>
.msg-name {
  display: inline-block;
  overflow: hidden;
  width: 5em;
  margin-left: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.msg-box {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>