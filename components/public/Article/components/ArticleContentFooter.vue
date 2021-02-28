<template>
  <div class="content__footer">
    <div class="note">
      <span class="notebook">
        <i class="slm blog-shijian"></i>
        <span>最后修改：{{$tool.format.isoToDateTime(articleData.lastEditorTime)}}</span>
      </span>
      <span class="copyright">
        <tooltip>
          <span slot="title">除特殊说明外本站文章皆由CC-4.0协议发布，转载请注明出处。</span>
          <p class="copyright-p">© 本站原创文章</p>
          <p class="copyright-p">由{{articleData.author.nickname}}{{$tool.format.isoToDateTime(articleData.createTime, 'yyyy-MM-dd')}}发表，共计{{articleData.content.length}}字</p>
        </tooltip>
      </span>
    </div>
    <!-- <div class="support-author">
      如果觉得我的文章对你有用，请随意赞赏
    </div> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Tooltip } from 'ant-design-vue';

import { Article as IntefArticle } from '@/interface/request/article';

/**
 * 文章内容底部组件
 */
@Component({
  name: 'ArticleContentFooter',
  components: {
    Tooltip,
  }
})
export default class ArticleContentFooter extends Vue {
  @Prop() articleData: IntefArticle.Base;
}
</script>

<style lang="scss" scoped>
  .content__footer {
    margin-top: 50px;
    padding: 10px 0;
    color: var(--c-text-secondary);
    border-top: 1px dashed var(--c-border-primary);

    .note {
      display: flex;
      justify-content: space-between;
    }

    .copyright-p {
      text-align: right;
      margin-bottom: 0;
    }
  }
</style>
