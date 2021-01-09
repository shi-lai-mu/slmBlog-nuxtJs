<template>
  <li :class="[ 'slm', 'blog-shezhi', $store.state.themes.mainBColor ]" @click.self="showPopup = !showPopup">
    <Masks :styleList="styleList" :hide="!showPopup" @close="() => showPopup = false">
      <div class="popup-box">
        <h4 class="popup-title">网站设置</h4>
        <div class="popup-tips"></div>
        <div class="popup-content">

          <div class="row-box">
            <span class="row-title">背景</span>
            <div class="row-content"> 
              <ul>
                <li>
                   <!-- <a-switch default-checked @change="onChange" /> -->
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div :class="[ 'button', 'submit-btn', $store.state.themes.mainBColor ]" @click="() => showPopup = false">确定</div>
      </div>
    </Masks>
  </li>
</template>  

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { Switch as ASwitch } from 'ant-design-vue';

import Masks from '~/components/Masks.vue';

@Component({
  components: {
    Masks,
    ASwitch,
  },
})
export default class HeaderThemes extends Vue {
  styleList: any = {};
  /**
   * 是否显示弹窗
   */
  showPopup: boolean = false;

  created() {
    const { isMobile, setting } = this.$$store.state;
    console.log(setting.theme);
    
    // this.styleList.marginLeft = isMobile ? '0' : '-5vw';
  }

  mounted() {
    // 初始化本地配置信息
    // const { ThemesConfig } = this;
    // if (ThemesConfig.isLocalUpdate) {
    //   const callFn = {
    //     fontSize: {
    //       fn: 'fontSizeChang',
    //     },
    //     color: {
    //       fn: 'toggleMainColor',
    //       cb: (val, arr) => [ val, arr.list[val].color ],
    //     },
    //   };
    //   Object.keys(ThemesConfig).forEach(key => {
    //     const targetFn = callFn[key];
    //     if (targetFn) {
    //       const currentConifg = ThemesConfig[key];
    //       const params = targetFn.cb ? targetFn.cb(currentConifg.current, currentConifg) : [ currentConifg.current ];
    //       this[targetFn.fn].apply(this, [...params, false]);
    //     }
    //   });
    // }
  }


  @Watch('$store.state.isMobile')
  isMobileUpdate(val) {
    // this.styleList.marginLeft = val ? '0' : '-5vw';
    this.$forceUpdate();
  }


  /**
   * 切换UI主题色
   */
  toggleAntdThemes(color: string) {
    window.less
      .modifyVars({
        '@primary-color': color,
        '@link-color': color,
        '@btn-primary-bg': color,
        '@heading-color': '#fff',
      })
      .then(() => {
        console.log('成功')
      })
      .catch(error => {
        console.error('皮肤主题编译失败: ' + error)
      })
    ;
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
    this.$store.commit('setThemesMainColor', colorName);
    if (storage) {
      this.toggleAntdThemes(color16);
      this.$config.themes.color.current = colorName;
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


  // GeminiScrollbarInit(e) {
  //   setTimeout(() =>e.update());
  // }
}
</script>

<style lang="scss" scoped>
.popup-box {
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
    text-align: left;
    padding: 15px 10px 10px;
    @include themify($themes) {
      color: themed('font-lv1-color');
    }
  }
  
  div.row-box {
    padding-bottom: 0;
    margin-bottom: 10px;
    background-color: transparent;

    .row-title {
      font-size: 1.1rem;
      font-weight: bold;
      border-bottom: 0;
    }

    .row-content {
      margin-top: .5rem;
      padding: 10px;
      @include themify($themes) {
        background-color: themed('main-bg-f1-color');
      }
      border-radius: 15px;
    }
  }
}

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
