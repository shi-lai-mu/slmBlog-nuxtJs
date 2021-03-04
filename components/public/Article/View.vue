<template>
  <div class="article-card">
    <div
      v-if="article.id"
      :class="['article-box', { 'bg-texture': isOpen || (!isOpen && task.length)}]"
      @click="openView(article.id)" :style="style"
    >
      <template v-if="!isOpen">
        <Imager
          class="figure-cover"
          v-if="article.banner"
          :src="article.banner"
          :alt="article.subject"
          :title="article.subject"
        />
        <i class="slm blog-img-err figure-cover" v-else></i>
        <div class="article-content">
          <router-link
            :to="{ name: 'article-id', params: { id: article.id } }"
            class="figure-subject line-ellipsis"
            v-text="article.subject"
            @click.native.stop="() => {}"
          ></router-link>
          <p class="line-ellipsis double-line-ellipsis article-description" v-text="article.description"></p>
        </div>
        <div class="article-bottom">
          <div>
            <i class="slm blog-pinglun" v-text="$tool.format.people(article.stat.bookmark_num)"></i>
            <i class="slm blog-yueduliang" v-text="$tool.format.people(article.stat.view_num)"></i>
          </div>
          <span class="release-time" v-text="$tool.format.isoToDateTime(article.createTime)"></span>
        </div>
      </template>
      <ArticleContent v-if="isOpen" :ssr="article" initSkeleton />
    </div>
    <ArticleCardSkeleton v-else/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { articleBase } from '@/mock/article/data/index';
import { Article as IntefArticle } from '@/interface/request/article';
import { getPostsData } from '@/core/service/data/article';

import Imager from '@/components/public/Imager.vue';
import ArticleContent from '@/components/public/Article/Contents.vue';
import ArticleCardSkeleton from '@/components/skeleton/article/cardSkeleton.vue';

/**
 * 文章内容组件
 */
@Component({
  components: {
    Imager,
    ArticleContent,
    ArticleCardSkeleton,
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
    ? getPostsData(data).then(res => this.setRenderData(res.result))
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
    this.article = Object.assign({}, articleBase, data);
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
    const { task, $el, isOpen } = this;

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
      zIndex: '29',
      top: `${top + scrollTop}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      padding: '10px',
      borderRadius: '5px',
      transition: '0s',
    }

    task.push(setTimeout(() => {
      this.style = {
        position: 'fixed',
        zIndex: '29',
        // top: `${scrollTop + 60}px`,
        top: `0px`,
        left: '0',
        // paddingTop: '60px',
        width: '100vw',
        // height: 'calc(100vh - 60px)',
        height: '100vh',
        borderRadius: '5px',
        transition: '.5s ',
      }
      // TODO: 此处写法为临时解决方案，修改容器为无法滚动状态，修改动画过渡时间0后top移动到0
      task.push(setTimeout(() => {
        // $config.GeminiScrollbar._viewElement.style.overflow = 'initial';
        // $config.GeminiScrollbar.destroy();
        // this.style.zIndex = '31';
        // this.style.top = '60px';
        // this.style.top = '0px';
        this.style.transition = '0s';
        this.task = [];
      }, 500));
    }));
  }


  /**
   * 关闭视图
   */
  closeView() {
    const { task, isOpen} = this;
    // 正在执行列队则跳出
    // if (task.length) return false;
    if (task.length) task.forEach((v: any) => clearTimeout(v));

    if (isOpen) this.$emit('close');
    const el = this.$el.parentElement as Element;
    this.isOpen = false;
    // $config.GeminiScrollbar._viewElement.style.overflow = 'scroll';
    // $config.GeminiScrollbar.create();
    const scrollTop = 0;
    const padding = 10;
    this.style.top = `${scrollTop + 60}px`;
    
    task.push(setTimeout(() => {
      const { width, height, top, left } = el.getBoundingClientRect();
      this.style = {
        position: 'fixed',
        zIndex: '29',
        top: `${top + scrollTop + padding}px`,
        left: `${left + padding}px`,
        width: `${width - (padding * 2)}px`,
        height: `${height - (padding * 2)}px`,
        borderRadius: '5px',
        transition: '.5s',
      }
      // 透明背景
      task.push(setTimeout(() => {
        this.style = {
          ...this.style,
          opacity: '.3',
        }
      }, 350));
      task.push(setTimeout(() => {
        this.style = '';
        this.task = [];
        (el.children[0].parentElement as any).style = '';
      }, 600));
    }));
  }
}
</script>

<style  lang="scss" scoped>
  .article-card {
    width: 100%;

    /deep/ .article-layout {
      padding-top: 18px;
    }
  }
  .article-box {
    overflow: hidden;
    background-color: inherit;
  }

  .article-frame {
    height: 0;

    .frame-content {
      height: 110vh;
    }
  }

  /deep/ .line-layout .figure-cover.slm {
    line-height: 10vh;
  }

  /deep/ .figure-cover.slm {
    display: inline-block;
    width: 100%;
    line-height: 200px;
    font-size: 5vh;
    text-align: center;
    background-color: rgba($color: #FFF, $alpha: .1);

    &::before {
      opacity: .2;
    }
  }

  .article-description {
    display: block;
    height: 3em;
  }

  .is-open {
    // .article-box {
      // padding-top: 70px;
    // }

    .article-frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
  }

  .layout-default-mobile .figure-cover {
    width: 10vh !important;
    height: 10vhw !important;
  }
</style>
