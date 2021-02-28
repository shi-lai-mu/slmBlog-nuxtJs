<template>
  <Row class="article-reply__container row-box" title="评论">
    
  </Row>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator';
import Row from '@/components/public/Row';

@Component({
  name: 'ArticleReply',
  components: {
    Row,
  }
})
export default class ArticleReply extends Vue {
  
}
</script>

<style lang="scss" scoped>
  
</style>