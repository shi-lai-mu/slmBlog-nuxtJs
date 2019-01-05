<template>
  <div>
    addArticle
  </div>
</template>

<script>
export default {
  created () {
    this.$connecter.$emit('page', {
      title: {
        tag: '发表文章',
        description: '发表新的文章请注意原则哦!!!'
      }
    })
  }
}
</script>

<style lang="less">
  
</style>>
