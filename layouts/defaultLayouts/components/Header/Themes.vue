<template>
  <li :class="[ 'slm', 'blog-themes', $store.state.themes.mainBColor ]" @click.self="showPopup = !showPopup">
    <Masks :styleList="styleList" :hide="!showPopup" @close="() => showPopup = false">
      <div class="popup-box" v-if="ThemesConfig">
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
                :defaultValue="setting.theme.fontSize"
                @change="fontSizeChang"/>
              <i class="slm blog-Aa big-Aa"></i>
            </div>
          </div>
          <div class="row-box">
            <span>颜色</span>
            <div class="row-content">
              <a-radio-group :default-value="setting.theme.color" size="large" class="themes-color-group">
                <a-radio-button
                  class="themes-color-item"
                  v-for="(item, index) in ThemesConfig.color.list"
                  :key="index"
                  :value="index"
                  @click="toggleMainColor(index, true)">
                  <div class="color-round" :style="{ backgroundColor: item.color, color: item.color}">
                    <i class="slm blog-xuanzhong" v-show="setting.theme.color === index"></i>
                  </div>
                  <i :class="`slm blog-${item.icon}`" :style="`color: ${item.iconColor || item.color}`"></i>
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <div class="row-box">
            <span>背景</span>
            <div class="row-content"> 
              <a-radio-group :default-value="setting.theme.backgroundColor" size="large" class="themes-bgcolor-group">
                <a-radio-button
                  class="themes-bgcolor-item"
                  v-for="(item, index) in ThemesConfig.backgroundColor.list"
                  :key="index"
                  :value="index"
                  :disabled="item.disable"
                  @click="toggleBGColor(index, true)">
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
import { StateMutation } from '@/interface/state';
import { isClient } from '@/utils/axios/lib/config';
import { stateData as ConfigState } from '@/store/config';
import { Vue, Component, namespace } from 'nuxt-property-decorator';

import Masks from '@/components/Masks.vue';

const ConfigModule = namespace('config');

/**
 * 头部皮肤组件
 */
@Component({
  name: 'HeaderThemes',
  components: {
    Masks,
  },
  computed: {
    ThemesConfig() {
      return (this as HeaderThemes).setting?.config?.theme;
    },
  }
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
   * 网站设置
   */
  @ConfigModule.State setting!: typeof ConfigState.setting;
  /**
   * 初始化状态
   */
  initState = false;
  /**
   * 消息key
   */
  messageKey = 'HeaderThemesMessageKey';

  created() {
    const ThemesConfig = this.setting.theme;
    if (isClient) {
      const callFn = {
        fontSize: {
          fn: 'fontSizeChang',
        },
        color: {
          fn: 'toggleMainColor',
        },
        backgroundColor: {
          fn: 'toggleBGColor',
        }
      };
      Object.keys(ThemesConfig).forEach(key => {
        const targetFn = callFn[key];
        if (targetFn) {
          const currentConifg = ThemesConfig[key];
          const params = targetFn.cb ? targetFn.cb(currentConifg.current, currentConifg) : [ currentConifg ];
          this[targetFn.fn].apply(this, [...params, false]);
        }
      });
    }
  }


  /**
   * slider修改文字大小时
   * @param fontSize 文字大小
   * @param isSave   是否执行保存
   */
  fontSizeChang(fontSize: number, isSave = true) {
    const root: HTMLElement = document.getElementsByTagName('html')[0];
    root.style.fontSize = `${fontSize}px`;
    this.setWebOptions({
      theme: {
        fontSize,
      },
      isSave,
    });  
  }


  /**
   * 切换主题色
   * @param colorName 主题色
   * @param isSave    是否执行保存
   */
  toggleMainColor(colorName: string, isSave = true) {
    const { initState, messageKey } = this;
    const root: HTMLElement = document.getElementsByTagName('html')[0];
    if (initState) this.$message.loading({ content: '正在切换全站主题色...', key: messageKey });
    this.setWebOptions({
      theme: {
        color: colorName
      },
      isSave,
    });
    root.classList.add('theme-color-' + colorName);
    if (initState) this.$message.success({ content: '切换成功!', key: messageKey });
    this.initState = true;
  }

  /**
   * 切换背景色
   * @param colorName 背景色
   * @param isSave    是否执行保存
   */
  toggleBGColor(colorName: string, isSave = true) {
    this.setWebOptions({
      theme: {
        backgroundColor: colorName,
      },
      isSave,
    });
  }
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
  box-sizing: border-box;

  .popup-title {
    margin: 1rem 0 .3rem;
    font-size: 1.3rem;
  }

  .popup-content {
    overflow-y: scroll;
    max-height: 70vh;
    text-align: left;
    padding: 15px 10px 10px;
    margin: 20px 0;
  }
  
  div.row-box {
    margin-bottom: 10px;

    .row-content {
      margin-top: .5rem;
      padding: 10px;
      border: 1px solid var(--c-border-overlay);
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
