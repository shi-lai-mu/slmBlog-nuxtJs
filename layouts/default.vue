<template>
  <div class="boss" id="tbody" ref="tbody">
    <main-background />
    <main-Header />
    <transition name="test">
      <nuxt />
    </transition>
    <main-footer />
  </div>
</template>

<script>
import mainHeader from '~/components/layout/header'
import mainFooter from '~/components/layout/footer'
import mainBackground from '~/components/layout/background'
export default {
  scrollToTop: true,
  components: {
    mainHeader,
    mainFooter,
    mainBackground
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  watch: {
    '$route' () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="less">
.test-enter-active, .test-leave-active {
  transition: 1s;
}
.test-enter, .test-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
          transform: translate(-50px, 0);
}
</style>
