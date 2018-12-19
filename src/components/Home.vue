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
                <router-link to="home" tag="div">Home</router-link>
            </div>
            <div class="content-fixed-box">
            </div>
        </div>

        <div class="guide clearfix">
            <p>关联账号</p>
            <ul>
                <li>
                    <span class="icon-1i"></span>
                    <i>@slm47888</i>
                </li>
                <li>
                    <span class="icon-2i"></span>
                    <i>暂无账号</i>
                </li>
                <li>
                    <span class="icon-3i"></span>
                    <i>slm478889187@gmail.com</i>
                </li>
                <li>
                    <span class="icon-4i"></span>
                    <i>slm478889187@gmail.com</i>
                </li>
                <li>
                    <span class="icon-6i"></span>
                    <i>478889187</i>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="less">

</style>
