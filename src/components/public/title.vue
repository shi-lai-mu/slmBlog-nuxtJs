<template>
    <div class="tag-description">
        <span class="tag" v-text="tag">首页</span>
        <span class="description" v-text="title"></span>
    </div>
</template>

<script>

export default {
  props: ['title', 'tag']
}
</script>
