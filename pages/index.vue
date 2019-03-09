<template>
  <div>1231231456456
  </div>
</template>

<script>
export default {
  created () {
    this.$axios.get('/blog/hot', {
      data: {
        da: 123465,
        sss_rsa: 66666666666666,
        rsa: {
          pass: 123456789
        }
      }
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
