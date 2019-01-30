<template>
  <tbody class="conter content-row clearfix">

    <!-- 左侧 -->
    <div class="content-box" @click="tagClick">
        <span v-for="(hot, index) in hotList" :key="index" :to="'/article/' + hot.Id" :data-article="hot.Id">
            <div class="article clearfix">
                <div class="article-left">
                    <img :src="hot.img" alt="images">
                </div>
                <div class="article-right">
                    <h3 class="ellipsis">{{ hot.title }}</h3>
                    <p class="article-description ellipsis">{{ hot.description }}</p>
                    <ul class="article-tag">
                        <li v-for="(type, i) in hot.type" :key="i" :title="'查找 \'' + type + '\' 文章'" :data-tag="type">
                            {{ type }}
                        </li>
                    </ul>
                </div>
            </div>
        </span>
        <ul v-if="!hotList.length">
            <!-- 展示伪装 -->
            <li v-for="i in 5" :key="i" class="article clearfix">
                <div class="article-left">
                    <div class="no-black"></div>
                </div>
                <div class="article-right look-center">
                    <h3 class="ellipsis no-black"></h3>
                    <ul class="article-tag">
                        <li v-for="i in 5" :key="i" class="no-black"></li>
                    </ul>
                    <p class="article-description no-black"></p>
                </div>
            </li>
        </ul>
    </div>

  </tbody>
</template>

<script>
export default {
  data () {
    return {
      hotList: [],
      rightList: []
    }
  },
  created () {
    console.log(this.$route)
  }
}
</script>
