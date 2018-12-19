<template>
    <div class="content-row single clearfix">
        <div class="content-box">

        </div>
    </div>
</template>

<script>
import connect from '@com/public/connecter.js'

export default {
  created () {
    connect.$emit('pageInfo', {
      title: {
        tag: '关于本站',
        description: '崇尚一技之长，不为学历凭能力!'
      }
    })
  }
}
</script>
