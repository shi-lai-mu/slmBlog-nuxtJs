<template>
  <div class="article-anchor">
    <a-affix :target="$config.container" :offset-top="90" :affix="!affix">
      <Row :title="title">
        <!-- TODO: 待重写 -->
        <template v-if="list.length">
          <div v-for="(item, index) in list" :key="index" @click.stop="scrollInView(item)">
            {{ item.name }}
            <div
              v-for="(childItem, childIndex) in item.childs"
              :key="childIndex"
              @click.stop="scrollInView(childItem)"
            >
              {{ childItem.name }}
            </div>
          </div>
        </template>
        <div v-else class="not-data">本文章暂未解析出有效的目录!</div>
      </Row>
    </a-affix>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import { Article } from '@/interface/request/article'

import { Affix } from 'ant-design-vue'
import Row from '@/components/public/Row.vue'

/**
 * 文章目录结构组件
 */
@Component({
  name: 'ArticleAnchor',
  components: {
    Row,
    AAffix: Affix,
  },
})
export default class ArticleAnchor extends Vue {
  /**
   * 锚点列表
   */
  @Prop(Array) anchorList: Article.Anchor[]
  /**
   * 浮动模式
   */
  @Prop(Boolean) affix?: boolean
  /**
   * 标题
   */
  @Prop(String) title!: string
  /**
   * 节点列表
   */
  list: Article.Anchor[] = []

  created() {
    if (this.anchorList) this.list = this.anchorList
  }

  /**
   * 解析内容锚点
   */
  parseAnchor(el: Element, tagName: keyof HTMLElementTagNameMap = 'h2') {
    const els = el.getElementsByTagName(tagName)
    const childEls: HTMLElement[] = Object.values(el.getElementsByTagName('h3'))
    this.list = Object.values(els).map((el, i) => {
      const childs = []
      const name = el.innerText
      const elTop = el.offsetTop
      const id = el.getAttribute('id')
      const elBottom = els[i + 1] ? els[i + 1].offsetTop : els[i].offsetTop + el.offsetTop

      childEls.some((child, childIndex) => {
        const { offsetTop } = child
        if (offsetTop > elTop && offsetTop < elBottom) {
          const childName = child.innerText
          const childId = child.getAttribute('id')
          childs.push({
            el: child,
            name: childName,
            link: `#${childId || name}`,
          })
          childEls.splice(childIndex, 1)
          return false
        }
        return true
      })

      return {
        el,
        name,
        link: `#${id || name}`,
        childs,
      }
    })
    return this.list
  }

  scrollInView(item) {
    item.el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}
</script>

<style lang="scss" scoped>
.article-anchor {
  /deep/ .ant-anchor-wrapper {
    background-color: transparent;
  }

  /deep/ .ant-anchor-link-title {
    color: var(--c-btn-text);
  }

  /deep/ .ant-anchor-ink::before {
    background-color: var(--c-blankslate-icon);
  }

  .not-data {
    color: var(--c-text-secondary);
  }
}
</style>
