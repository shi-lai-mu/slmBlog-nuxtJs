<template>
  <div class="toast">

  </div>
</template>

<script>
/**
 * Toast 组件： 负责消息通知
 */
export default {
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less">
  .toast {
    position: fixed;
    right: 10px;
    top: 10px;
    width: 300px;
    min-height: 100px;
    z-index: 9999;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .2);
  }
</style>
