<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { mapState } from 'vuex'

@Component
export default class LayoutDefaultHeader extends Vue {
  mounted() {
    console.log(this.$store.state);
  }
}
</script>

<style lang="scss" scoped>
  
</style>
