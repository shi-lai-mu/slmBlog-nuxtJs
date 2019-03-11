<template>
  <div class="boss" id="tbody" ref="tbody">
    <main-background />
    <main-Header />
    <nuxt />
    <main-footer />
  </div>
</template>

<script>
import mainHeader from '~/components/layout/header'
import mainFooter from '~/components/layout/footer'
import mainBackground from '~/components/layout/background'
export default {
  components: {
    mainHeader,
    mainFooter,
    mainBackground
  }
}
</script>
