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

<style lang="less">

.tag-description {
    overflow: auto;
    width: 100%;
    line-height: 80px;
    text-align: left;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        height: 87px;
        width: 100%;
        min-width: var(--min-width);
        background: url('~@img/intro-bg.png') no-repeat center;
    }

    .tag {
        position: relative;
        margin: 0 30px;
        font-size: 35px;
        font-weight: 500;
        text-shadow: 1px 1px 0 #000;
        color: #CBD3E5;
    }

    .description {
        position: relative;
        margin: 0;
        font-family: 'mv';
        font-weight: 400;
        color: #14181E;
        text-shadow: 1px 1px 0 #535d6e;
    }
}

.master-top-bg {
    background-image: url('~@img/hd-bg.png');
    background-position: center;
}
</style>
