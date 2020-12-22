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
        <i class="slm blog-pinglun" v-text="$tool.format.people(article.stat.bookmark_num)"></i>
        <i class="slm blog-yueduliang" v-text="$tool.format.people(article.stat.view_num)"></i>
      </div>
      <span class="release-time" v-text="$tool.format.isoToDateTime(article.createTime)"></span>
    </div>
    <ArticleContent :ssr="article" v-if="isOpen" initSkeleton />
  </article>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { Article as IntefArticle } from '@/interface/request/article';
import { formatPeople } from '@/utils/atricle';
import { articleBase } from '@/mock/article/data/index';

import { getRelativeBrowserPos } from '@/utils/element';
import { getArticleData } from '@/service/data/article';
import Imager from '@/components/public/Imager.vue';
import ArticleContent from '@/components/public/Article/Contents.vue';

/**
 * 文章内容组件
 */
@Component({
  components: {
    Imager,
    ArticleContent,
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
  @Prop(Object) ssr?: IntefArticle.Base;

  /**
   * 当前打开的文章ID
   */
  @Prop(Number) viewId?: number;

  /**
   * 是否为打开状态
   */
  isOpen: boolean = false;

  /**
   * 样式
   */
  style: any = {};

  /**
   * 任务列队
   */
  task: Array<NodeJS.Timeout | number> = [];

  /**
   * 文章内容
   */
  article?: IntefArticle.Base = articleBase;

  @Watch('viewId')
  changViewId(viewId: number) {
    if (viewId === -1 && this.isOpen) {
      this.isOpen = false;
      this.closeView();
    }
  }

  @Watch('ssr')
  ssrUpdate(data: IntefArticle.Base | number) {
    typeof data === 'number' && data !== -1
    ? getArticleData(data).then(res => this.setRenderData(res.result))
    : this.setRenderData(data);
  }

  created() {
    if (this.viewId && this.viewId !== -1) {
      this.ssrUpdate(this.viewId);
    } else {
      this.ssrUpdate(this.ssr || articleBase);
    }
  }


  /**
   * 设置渲染属性
   */
  setRenderData(data) {
    if (Object.keys(data).length === 0) {
      return this.article = this.errorData();
    }
    this.article = Object.assign(articleBase, data);
  }


  /**
   * 用户信息获取失败时返回的信息
   */
  errorData() {
    return Object.assign(articleBase, {
      id: -1,
      title: '文章信息获取失败',
    });
  }


  /**
   * 加载文章
   */
  openView(articleId: number) {
    const { $config, task, $el, isOpen } = this;

    // 正在执行列队则跳出
    if (task.length || isOpen) return false;

    // 路由定义
    window.history.pushState({ articleId }, '', `/article/${articleId}`);
    
    this.$emit('open', articleId);
    this.isOpen = true;
    const el = $el.parentElement as Element;
    const { width, height, top, left } = el.getBoundingClientRect();
    const parentEl: any = el.children[0].parentElement;
    const parentPos = parentEl.getBoundingClientRect();

    parentEl.style.height = `${parentPos.height}px`;
    // $config.GeminiScrollbar.update();
    // const scrollTop = $config.GeminiScrollbar._viewElement.scrollTop;
    const scrollTop = 0;

    this.style = {
      position: 'fixed',
      zIndex: '999',
      top: `${top + scrollTop}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      padding: '10px',
      borderRadius: '5px',
      transition: '.5s',
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
        transition: '.5s ',
      }
      // TODO: 此处写法为临时解决方案，修改容器为无法滚动状态，修改动画过渡时间0后top移动到0
      task.push(setTimeout(() => {
        // $config.GeminiScrollbar._viewElement.style.overflow = 'initial';
        // $config.GeminiScrollbar.destroy();
        this.style.top = '0';
        this.style.transition = '0s';
        this.task = [];
      }, 500));
    }));
  }


  closeView() {
    const { $config, task, isOpen} = this;
    // 正在执行列队则跳出
    // if (task.length) return false;
    if (task.length) task.forEach((v: any) => clearTimeout(v));

    if (isOpen) this.$emit('close');
    const el = this.$el.parentElement as Element;
    this.isOpen = false;
    // $config.GeminiScrollbar._viewElement.style.overflow = 'scroll';
    // $config.GeminiScrollbar.create();
    const scrollTop = 0;
    this.style.top = `${scrollTop}px`;
    task.push(setTimeout(() => {
      const { width, height, top, left } = el.getBoundingClientRect();
      this.style = {
        position: 'fixed',
        zIndex: '29',
        top: `${top + scrollTop}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '5px',
        transition: '.5s',
      }
      task.push(setTimeout(() => {
        this.style = '';
        this.task = [];
        (el.children[0].parentElement as any).style = '';
      }, 500));
    }, 10));
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
