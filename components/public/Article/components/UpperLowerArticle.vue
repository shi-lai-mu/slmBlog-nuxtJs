<template>
  <ul class="row-box upperlower-article-box">
    <template v-if="profileList.length">
      <router-link
        class="switch-btn"
        v-for="(item, index) in ['上', '下']" :key="index"
        :to="{
            name: 'article-id',
            params: {
              id: profileList[index] ? profileList[index].id : articleId, 
            }
          }
        "
      >
        <p>{{ profileList[index] ? profileList[index].subject : `没有${item}一篇啦` }}</p>
        <p v-if="profileList[index]">{{item}}一篇</p>
      </router-link>
    </template>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';

import { getProfile } from '@/core/service/data/article';
import { Article } from '~/interface/request/article';

/**
 * 上下篇文章切换组件
 */
@Component({
  name: 'UpperLowerArticle',
})
export default class UpperLowerArticle extends Vue {
  /**
   * 文章ID
   */
  @Prop(Number) articleId: number;
  /**
   * 上下文章列表
   */
  profileList: Array<Article.Base | null> = [];

  @Watch('articleId')
  async changArticleId(articleId: number) {
    this.profileList = (await getProfile(JSON.stringify([ articleId - 1, articleId + 1 ]))).result || [];
  }

  created() {
    this.changArticleId(this.articleId);
  }
}
</script>

<style lang="scss" scoped>
  .upperlower-article-box {
    display: flex;
    margin-top: 40px;
    padding: 0;

    .switch-btn {
      display: flex;
      width: 50%;
      padding: 10px 0;
      cursor: pointer;
      text-align: center;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      user-select: none;

      p {
        overflow: hidden;
        width: 100%;
        margin-bottom: 0;
        padding: 0 20px;
        color: var(--c-btn-text);
        white-space: nowrap;
        text-overflow: ellipsis;

        &:last-child {
          color: var(--c-text-disabled);
        }
      }

      &:not(:last-child) {
        border-right: 1px solid var(--c-btn-border);
      }

      &:hover {
        background-color: var(--c-btn-hover-bg);
      }

      &:active {
        background-color: var(--c-btn-selected-bg);
      }
    }
  }
</style>