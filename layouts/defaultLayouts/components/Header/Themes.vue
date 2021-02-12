<template>
  <li :class="[ 'slm', 'blog-themes', $store.state.themes.mainBColor ]" @click.self="showPopup = !showPopup">
    <Masks :styleList="styleList" :hide="!showPopup" @close="() => showPopup = false">
      <div class="popup-box">
        <h4 class="popup-title">自定义主题皮肤</h4>
        <div class="popup-tips">管理字体大小、颜色和背景。这些设置会影响此浏览器上，如果登录账号将同步到云端。</div>
        <div class="popup-content">
          <div class="row-box">
            <span>字体大小</span>
            <div class="row-content slider-box">
              <i class="slm blog-Aa"></i>
              <a-slider
                class="font-size-slider"
                :marks="ThemesConfig.fontSize.marks"
                :min="ThemesConfig.fontSize.min"
                :max="ThemesConfig.fontSize.max"
                :defaultValue="ThemesConfig.fontSize.current"
                @change="fontSizeChang"/>
              <i class="slm blog-Aa big-Aa"></i>
            </div>
          </div>
          <div class="row-box">
            <span>颜色</span>
            <div class="row-content">
              <a-radio-group :default-value="ThemesConfig.color.current" size="large" class="themes-color-group">
                <a-radio-button
                  class="themes-color-item"
                  v-for="(item, index) in ThemesConfig.color.list"
                  :key="index"
                  :value="index"
                  @click="toggleMainColor(index, item.color)">
                  <div class="color-round" :style="{ backgroundColor: item.color, color: item.color}">
                    <i class="slm blog-xuanzhong" v-show="ThemesConfig.color.current === index"></i>
                  </div>
                  <i :class="`slm blog-${item.icon}`" :style="`color: ${item.iconColor || item.color}`"></i>
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <div class="row-box">
            <span>背景</span>
            <div class="row-content"> 
              <a-radio-group :default-value="ThemesConfig.backgroundColor.current" size="large" class="themes-bgcolor-group">
                <a-radio-button
                  class="themes-bgcolor-item"
                  v-for="(item, index) in ThemesConfig.backgroundColor.list"
                  :key="index"
                  :value="index"
                  :disabled="item.disable"
                  @click="toggleBGColor(index, item)">
                  <div class="color-round" :style="{ backgroundColor: item.color, color: item.fontColor }">
                    {{ item.name }}<i class="slm blog-xuanzhong" :style="{ color: 'currentColor' }"></i>
                  </div>
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>
        </div>
        <div :class="[ 'button', 'submit-btn', $store.state.themes.mainBColor ]" @click="() => showPopup = false">关闭</div>
      </div>
    </Masks>
  </li>
</template>  

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';

import Masks from '@/components/Masks.vue';
import { StateMutation } from '@/interface/state';

const ConfigModule = namespace('config');

/**
 * 头部皮肤组件
 */
@Component({
  name: 'HeaderThemes',
  components: {
    Masks,
  },
})
export default class HeaderThemes extends Vue {
  /**
   * 样式列表
   */
  styleList: any = {};
  /**
   * 是否显示弹窗
   */
  showPopup: boolean = false;
  /**
   * 设置站点参数
   */
  @ConfigModule.Mutation setWebOptions!: StateMutation;
  /**
   * 设置主题色
   */
  @ConfigModule.Mutation setThemesMainColor!: StateMutation;
  /**
   * 皮肤配置
   */
  get ThemesConfig() {
    return this.$config.themes;
  }

  initState = false;

  messageKey = 'HeaderThemesMessageKey';

  created() {
    const { ThemesConfig } = this;
    if (ThemesConfig.isLocalUpdate) {
      const callFn = {
        fontSize: {
          fn: 'fontSizeChang',
        },
        color: {
          fn: 'toggleMainColor',
          cb: (val, arr) => [ val, arr.list[val].color ],
        },
      };
      Object.keys(ThemesConfig).forEach(key => {
        const targetFn = callFn[key];
        if (targetFn) {
          const currentConifg = ThemesConfig[key];
          const params = targetFn.cb ? targetFn.cb(currentConifg.current, currentConifg) : [ currentConifg.current ];
          this[targetFn.fn].apply(this, [...params, false]);
        }
      });
    }

  }


  /**
   * 切换UI主题色
   */
  toggleAntdThemes(color: string) {
    const { messageKey, initState } = this;

    if (initState) this.$message.loading({ content: '正在切换全站主题色...', key: messageKey });
    window.less
      .modifyVars({
        '@primary-color': color,
        '@link-color': color,
        '@btn-primary-bg': color,
        '@heading-color': '#fff',
        '@text-color-inverse': color,
      })
      .then(() => initState && this.$message.success({ content: '切换成功!', key: messageKey }))
      .catch(error => {
        if (initState) this.$message.error({ content: '切换失败, 请稍后再试!', key: messageKey });
        console.error('皮肤主题编译失败: ' + error);
      })
    ;

    this.initState = true;
    return true;
  }


  /**
   * slider修改文字大小时
   */
  fontSizeChang(fontsize: number, storage: boolean = true) {
    const root: any = document.getElementsByTagName('html')[0];
    root.style = `font-size: ${fontsize}px`;
    if (storage) this.$config.themes.fontSize.current = fontsize;
  }


  /**
   * 切换主题色
   */
  toggleMainColor(colorName: string, color16: string, storage: boolean = true) {
    this.$config.themes.color.current = colorName;
    this.$$store.commit('setThemesMainColor', colorName);
    this.setThemesMainColor(colorName)
    if (storage) {
      this.toggleAntdThemes(color16);
    } else {
      const { less }: any = window;
      // 对应 index.js 等待 less.min.js 加载完成执行cb传入params
      if (less.modifyVars) {
        this.toggleAntdThemes(color16);
      } else {
        less.cb = this.toggleAntdThemes.bind(this);
        less.params = color16;
      }
    }
  }

  /**
   * 切换背景色
   */
  toggleBGColor(colorName: string, color16: string, storage: boolean = true)  {
    this.$config.themes.backgroundColor.current = colorName;
    this.setWebOptions({
      theme: {
        backgroundColor: colorName,
      }
    });
  }


  // GeminiScrollbarInit(e) {
  //   setTimeout(() =>e.update());
  // }
}
</script>

<style lang="scss" scoped>
.popup-box {
  overflow-y: scroll;
  width: 80vw;
  max-height: 90vh;
  max-width: 600px;
  min-width: 200px;
  padding: 0 10px;
  font-size: .8rem;
  text-align: center;
  @include themify($themes) {
    color: themed('font-lv1-color');
  }
  box-sizing: border-box;

  .popup-title {
    margin: 1rem 0 .3rem;
    font-size: 1.3rem;
    @include themify($themes) {
      color: themed('font-color');
    }
  }

  .popup-content {
    overflow-y: scroll;
    max-height: 70vh;
    text-align: left;
    padding: 15px 10px 10px;
    margin: 20px 0;
    @include themify($themes) {
      color: themed('font-lv1-color');
    }
  }
  
  div.row-box {
    padding-bottom: 0;
    margin-bottom: 10px;
    // background-color: transparent;

    .row-content {
      margin-top: .5rem;
      padding: 10px;
      @include themify($themes) {
        background-color: themed('main-bg-f1-color');
      }
      border-radius: 15px;
    }
  }

  .submit-btn {
    display: inline-block;
    width: 9rem;
    margin-bottom: 40px;
    font-size: 1rem;
  }

  // 文字大小拖动选择器
  .slider-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .blog-Aa {
      font-size: 1rem;
      margin: 0 10px;
    }

    .big-Aa {
      font-size: 2rem;
      vertical-align: text-bottom;
    }

    .font-size-slider {
      width: 100%;
      margin-bottom: 14px;
    }
  }

  // 主题颜色选择器
  .themes-color-group,
  .themes-bgcolor-group {
    display: flex;
    margin-bottom: -20px;
    flex-wrap: wrap;
    justify-content: space-between;

    .themes-color-item,
    .themes-bgcolor-item {
      height: auto;
      margin-bottom: 20px;
      // width: 100%;
      text-align: center;
      background-color: transparent;
      border: 0;
      box-shadow: none;

      &::before {
        display: none;
      }

      &:hover {
        border: 0 !important;
        box-shadow: none;
      }

      &:focus-within {
        outline: none;
      }
      
      .color-round {
        display: flex;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        color: #FFF;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        transition: .5s;

        & + .slm {
          display: inline-block;
          transform: translateY(5px);
        }
      }

      .slm {
        font-size: 1.5rem;
      }
    }

    .themes-bgcolor-item {
      width: 100%;
      .color-round {
        width: 100%;
        height: 70px;
        border: 1px solid;
        border-radius: 10px;

        &:hover {
          color: #FFAD1F !important;
          border-color: currentColor;
        }
      }
      
      .slm {
        display: flex;
        width: 1.1rem;
        height: 1.1rem;
        margin-left: 10px;
        font-size: .6rem;
        border: 1px solid;
        border-radius: 50%;
        justify-content: center;
        align-items: center;

        &::before {
          display: none;
        }
      }

      &.ant-radio-button-wrapper-checked .slm::before {
        display: block;
      }
    }

    .ant-radio-button-wrapper-checked .slm {
      color: #EEE;
      border-color: currentColor;
      text-shadow: 2px 1px 2px;
      transition: .5s;

      &.blog-xuanzhong {
        text-shadow: none;
      }
    }

    // .ant-radio-button-wrapper-checked .color-round {
    //   // position: relative;
    //   // z-index: 9;
    //   // box-shadow: 2px 1px 5px currentColor;
    //   // box-shadow: 0 0 20px 0px currentColor;
    //   animation: bigTransition .7s ease-out;
    // }
  }

  .themes-bgcolor-group {
    flex-wrap: initial;
  }
}

// @keyframes bigTransition {
//   0% {
//     box-shadow: 0 0 0 50vw transparent;
//     border: 0;
//   }
//   50% {
//     content: '';
//     transform: scale(15);
//     box-shadow: 0 0 0 0 transparent;
//     // background-color: transparent;
//     opacity: 1;
//   }
//   100% {
//     opacity: 0;
//     transform: scale(20);
//     border: 0;
//   }
// }

.layout-default-mobile {
  .popup-box {
    max-height: 100vh;
  }

  .themes-color-group {
    flex-wrap: wrap;

    .themes-color-item {
      width: 33.33%;
      margin-bottom: 20px;
    }
  }

  .themes-bgcolor-group {
    flex-wrap: wrap;

    .themes-color-item {
      width: 100%;
    }
  }
}
  
/deep/ .ant-radio-button-wrapper,
/deep/ .ant-slider-mark-text-active {
  color: #8899a6;
}
</style>
