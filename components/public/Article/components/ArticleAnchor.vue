<template>
  <div class="article-anchor">
    <a-anchor :getContainer="getContainer" :offsetTop="40" :affix="!affix" v-if="list.length">
      <a-anchor-link v-for="(item, index) in list" :key="index" :href="item.link" :title="item.name">
        <a-anchor-link v-for="(childItem, childIndex) in item.childs" :key="childIndex" :href="childItem.link" :title="childItem.name" />
      </a-anchor-link>
    </a-anchor>
    <div class="not-data" v-else>
      本文章暂未解析出有效的目录!
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/interface/request/article';
import { Anchor } from 'ant-design-vue';

/**
 * 文章目录结构组件
 */
@Component({
  name: 'ArticleAnchor',
  components: {
    AAnchor: Anchor,
    AAnchorLink: Anchor.Link,
  }
})
export default class ArticleAnchor extends Vue {
  /**
   * 指定滚动的容器
   */
  @Prop(Function) getContainer!: () => Element;
  /**
   * 锚点列表
   */
  @Prop(Array) anchorList: Article.Anchor[];
  /**
   * 浮动模式
   */
  @Prop(Boolean) affix?: boolean;
  /**
   * 节点列表
   */
  list: Article.Anchor[] = [];

  created() {
    if (this.anchorList) this.list = this.anchorList;
  }

  /**
   * 解析内容锚点
   */
  parseAnchor(el: Element, tagName: keyof HTMLElementTagNameMap = 'h2') {
    const els = el.getElementsByTagName(tagName);
    const childEls: HTMLElement[] = Object.values(el.getElementsByTagName('h3'));
    this.list = Object.values(els).map((el, i) => {
      const childs = [];
      const name = el.innerText;
      const elTop = el.offsetTop;
      const id = el.getAttribute('id');
      const elBottom = (els[i + 1] ? els[i + 1].offsetTop : els[i].offsetTop + el.offsetTop);

      childEls.some((child, childIndex) => {
        const { offsetTop } = child;
        if (offsetTop > elTop && offsetTop < elBottom) {
          const childName = child.innerText;
          const childId = child.getAttribute('id');
          childs.push({
            name: childName,
            link: `#${childId || (child.id = name)}`,
          });
          childEls.splice(childIndex, 1);
        } else {
          return true;
        }
      });

      return {
        name,
        link: `#${id || (el.id = name)}`,
        childs,
      };
    });
    return this.list;
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