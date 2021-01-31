<template>
  <div class="article-anchor">
    <a-anchor :getContainer="getContainer" :offsetTop="40" :affix="!affix">
      <a-anchor-link v-for="(item, index) in list" :key="index" :href="item.link" :title="item.name">
        <a-anchor-link v-for="(childItem, childIndex) in item.childs" :key="childIndex" :href="childItem.link" :title="childItem.name" />
      </a-anchor-link>
    </a-anchor>
  </div>
</template>

<script lang="ts">
import { Anchor } from 'ant-design-vue';
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/interface/request/article';

@Component({
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
      const name =  el.innerText;
      const id = el.getAttribute('id');
      const elTop = el.offsetTop;
      const elBottom =  (els[i + 1] ? els[i + 1].offsetTop : els[i].offsetTop + el.offsetTop);
      
      const childs = [];
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
    /deep/.ant-anchor-wrapper {
      background-color: transparent;
    }
  }
</style>