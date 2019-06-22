<template>
  <aside class="content-box">
    <span class="content-tag">
      <span>博客公告:</span>
      <p class="content-desc">
        <i class="iconfont icon-gonggao"></i>
        {{ notice.description }}
      </p>
    </span>
  </aside>
</template>

<script>
export default {
  props: {
    notice: {
      type: Object
    }
  }
}
</script>