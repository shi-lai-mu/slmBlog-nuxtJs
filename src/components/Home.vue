<template>

    <div class="conter clearfix">
        <div class="shuffling">
            <div class="shuffling-flex">
                <span class="shuffling-left"></span>
                <ul class="shuffling-ling">
                    <li><img src="~@img/nvs/lun4.png" alt="NAV-2"></li>
                </ul>
                <span class="shuffling-right"></span>
            </div>
            <ul class="shuffling-select">
                <li class="on"></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

        <div class="content-row clearfix">
            <div class="content-fixed-box">
            </div>
            <div class="content-box">
                <!-- <router-link to="home" tag="div">Home</router-link> -->
            </div>
            <div class="content-fixed-box">
            </div>
        </div>

    </div>

</template>

<script>

export default {
  created () {
    this.$connecter.$emit('page', {
      title: {
        tag: '首页',
        description: '欢迎浏览史莱姆的博客!（°Д°）Ъ'
      }
    })
  }
}
</script>

<style lang="less">

</style>
