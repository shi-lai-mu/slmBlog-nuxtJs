<template>
    <div class="tag-description">
        <span class="tag">{{ title.tag ? title.tag : '-- --' }}</span>
        <span class="description">{{ title.description ? title.description : '欢迎浏览史莱姆的博客!（°Д°）Ъ' }}</span>
    </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
