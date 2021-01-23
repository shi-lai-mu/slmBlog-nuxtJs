<template>
  <div class="html-tree-process">
    <div class="process-main" :style="{ backgroundColor:  $store.getters.webMainThemes16Color, width: viewProcess + '%' }"></div>
    <ul class="process-disc">
      <a-tooltip placement="bottomLeft" :title="node.title" v-for="(node, key) in tree" :key="key" overlayClassName="process-tips" arrowPointAtCenter>
        <li :style="{left: key + '%'}" @click="scrollTo(node, key)"></li>
      </a-tooltip>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Tooltip as ATooltip } from 'ant-design-vue';

@Component({
  components: {
    ATooltip,
  }
})
export default class HtmlTreeProcess extends Vue {
  /**
   * 文章元素
   */
  article!: Element | null;
  /**
   * 浏览进度
   */
  viewProcess: number = 0;
  /**
   * 视图高度
   */
  viewHeight: number = 0;
  /**
   * 节点树
   */
  tree: any = {};
  /**
   * 滚动对象
   */
  scrollElement!: Element;

  mounted() {
    const articleElement = document.getElementsByClassName('article-content__container')[1];
    this.article = articleElement;
    this.viewHeight = document.body.clientHeight;

    if (articleElement) {
      this.scrollElement = articleElement;
      const h2 = articleElement.getElementsByTagName('h2');
      const currentEl = this.$parent.$el as HTMLElement;
      const bodyHeight = currentEl.scrollHeight + currentEl.offsetTop;
      Object.values(h2).forEach(el => {
        this.tree[el.offsetTop / bodyHeight * 100] = {
          title: el.innerText,
          top: el.offsetTop,
          height: el.offsetHeight,
          maxHeight: bodyHeight,
        };
      });
    }
  }


  /**
   * 滚动到指定位置
   */
  scrollTo(node, top: number) {
    this.$parent.$el.scrollTo({ top: node.top });
  }


  /**
   * 利用事件更新进度
   */
  updateProcess(e) {
    const { scrollTop, scrollHeight } = e.target;
    this.viewProcess = scrollTop / (scrollHeight - this.viewHeight) * 100;
  }
}
</script>

<style  lang="scss" scoped>
  .html-tree-process {
    position: fixed;
    z-index: 99;
    width: 100vw;
    height: 4px;
    top: 0;
    left: 0;
    cursor: pointer;
    
    &:hover {
      height: 20px;

      .process-main {
        height: 10px;
        transition: .5s;
      }

      .process-disc li {
        width: 10px;
        height: 10px;
        // transform: translateX(-5px);
        transition: .5s;
      }
    }
    
    .process-main {
      height: 4px;
      background-image: linear-gradient(
        45deg,
        rgba(255,255,255,.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255,255,255,.15) 50%,
        rgba(255,255,255,.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
      animation: progress-ani 1s linear infinite;
    }
  }
  @keyframes progress-ani {
    from { background-position: 1rem 0 }
    to { background-position: 0 0 }
  }

  .process-disc li {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    background-color: rgba($color: #000, $alpha: .2);
    border-radius: 5px;
    transition: .5s;
  }

  .ant-tooltip-open {
    background-color: rgba($color: #000, $alpha: .6) !important;
  }

</style>
