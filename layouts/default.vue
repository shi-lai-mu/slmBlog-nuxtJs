<template>
  <div class="boss" id="tbody" ref="tbody">
    <home-Header />
    <nuxt />
    <home-footer />
  </div>
</template>

<script>
import homeHeader from '~/components/layout/header'
import homeFooter from '~/components/layout/footer'
export default {
  components: {
    homeHeader,
    homeFooter
  },
  created () {
    console.log('-------------------------------------------------------------');
    this.$nextTick(function(){
      console.dir(this.$el && this.$el.offsetWidth);
    })
  }
}
</script>
