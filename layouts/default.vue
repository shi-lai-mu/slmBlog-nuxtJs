<template>
  <div class="boss">
    <home-Header />
    <nuxt />
  </div>
</template>

<script>
import homeHeader from '~/components/layout/header'
export default {
  components: {
    homeHeader
  },
  created () {
    console.log('-------------------------------------------------------------');
    this.$nextTick(function(){
      console.dir(this.$el && this.$el.offsetWidth);
    })
  }
}
</script>
