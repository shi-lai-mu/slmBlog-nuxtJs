<template>
  <article class="article-box" @click="openView(article.id)" :style="style">
    <i v-show="isOpen" class="slm blog-cuowu" @click.stop="closeView"></i>
    <Imager class="figure-cover" :src="article.banner" :alt="article.subject" :title="article.subject" />
    <div class="article-content">
      <h3 class="figure-subject line-ellipsis" v-text="article.subject"></h3>
      <p class="line-ellipsis double-line-ellipsis article-description" v-text="article.description"></p>
    </div>
    <div class="article-bottom">
      <div>
        <i class="slm blog-pinglun" v-text="formatPeople(article.stat.reply_num)"></i>
        <i class="slm blog-yueduliang" v-text="formatPeople(article.stat.view_num)"></i>
      </div>
      <span class="release-time" v-text="article.release_time"></span>
    </div>
  </article>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { Article as IntefArticle } from '@/interface/request/article';
import { formatPeople } from '@/utils/atricle';

import Imager from '@/components/public/Imager.vue';
import { getRelativeBrowserPos } from '@/utils/element';

/**
 * 文章内容组件
 */
@Component({
  components: {
    Imager,
  }
})
export default class ArticleView extends Vue {
  /**
   * 布局信息
   */
  @Prop(Object) layout?: any;

  /**
   * 文章基础信息
   */
  @Prop(Object) article?: IntefArticle.Base;

  /**
   * 是否为打开状态
   */
  isOpen: boolean = false;

  /**
   * 样式
   */
  style: any = {};

  task: Array<NodeJS.Timeout | number> = [];

  /**
   * 加载文章
   */
  openView(articleId: number) {
    const { $config, task, $el } = this;

    // 正在执行列队则跳出
    if (task.length) return false;
    
    this.$emit('open', articleId);
    this.isOpen = true;
    const el = $el.parentElement as Element;
    const { width, height, top, left } = el.getBoundingClientRect();
    const parentEl: any = el.children[0].parentElement;
    const parentPos = parentEl.getBoundingClientRect();

    parentEl.style.height = `${parentPos.height}px`;
    $config.GeminiScrollbar.update();
    const scrollTop = $config.GeminiScrollbar._viewElement.scrollTop;
    

    this.style = {
      position: 'fixed',
      zIndex: '999',
      top: `${top + scrollTop}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      padding: '10px',
      borderRadius: '5px',
      transition: '1s ',
    }

    task.push(setTimeout(() => {
      this.style = {
        position: 'fixed',
        zIndex: '29',
        top: `${scrollTop}px`,
        left: `0`,
        width: `100vw`,
        height: `100vh`,
        borderRadius: '5px',
        transition: '1s ',
      }
      // TODO: 此处写法为临时解决方案，修改容器为无法滚动状态，修改动画过渡时间0后top移动到0
      task.push(setTimeout(() => {
        $config.GeminiScrollbar._viewElement.style.overflow = 'initial';
        $config.GeminiScrollbar.destroy();
        this.style.top = '0';
        this.style.transition = '0s';
        this.task = [];
      }, 1000));
    }));
  }


  closeView() {
    const { $config, task } = this;
    // 正在执行列队则跳出
    if (task.length) return false;

    this.$emit('close');
    const el = this.$el.parentElement as Element;
    this.isOpen = false;
    $config.GeminiScrollbar._viewElement.style.overflow = 'scroll';
    $config.GeminiScrollbar.create();
    this.style.top = `${$config.GeminiScrollbar._viewElement.scrollTop}px`;
    task.push(setTimeout(() => {
      const { width, height, top, left } = el.getBoundingClientRect();
      this.style = {
        position: 'fixed',
        zIndex: '29',
        top: `${top + $config.GeminiScrollbar._viewElement.scrollTop}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '5px',
        transition: '1s',
      }
      task.push(setTimeout(() => {
        this.style = '';
        this.task = [];
        (<any>el.children[0].parentElement).style = '';
      }, 1000));
    }, 10));
  }


  /**
   * 格式化人数
   */
  formatPeople(v) {
    return formatPeople(v);
  }
}
</script>

<style scoped lang="scss">
  .article-box {
    background-color: inherit;
  }

  .article-frame {
    height: 0;

    .frame-content {
      height: 110vh;
    }
  }

  .is-open {
    .article-box {
      padding-top: 70px;
    }

    .article-frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
  }

</style>
