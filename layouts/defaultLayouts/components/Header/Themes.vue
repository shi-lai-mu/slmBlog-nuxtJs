<template>
  <li :class="[ 'slm', 'blog-themes', $store.state.themes.mainBColor ]" @click.self="showPopup = !showPopup">
    <Masks :styleList="styleList" :show="!showPopup" @close="() => showPopup = false">
      <div class="popup-box">
        <h4 class="popup-title">
          自定义主题皮肤
        </h4>
        <div class="popup-tips">管理字体大小、颜色和背景。这些设置会影响此浏览器上，如果登录账号将同步到云端。</div>
        <div class="popup-content">
          <div class="row-box">
            <span>字体大小</span>
            <div class="row-content slider-box">
              <i class="slm blog-Aa"></i>
              <a-slider
                class="font-size-slider"
                :marks="{ 12: '', 13: '', 14: '', 15: '', 16: '', 17: '', 18: '', 19: '', 20: '' }"
                :min="12"
                :max="20"
                :defaultValue="16"
                @change="fontSizeChang"/>
              <i class="slm blog-Aa big-Aa"></i>
            </div>
          </div>
          <div class="row-box">
            <span>颜色</span>
            <div class="row-content">
              <div @click="toggleAntdThemes('#1DA1F2') && $store.commit('setThemesMainColor', 'blue')">b</div>
              <div @click="toggleAntdThemes('#FFAD1F') && $store.commit('setThemesMainColor', 'yellow')">c</div>
              <div @click="toggleAntdThemes('#E0245E') && $store.commit('setThemesMainColor', 'powder')">d</div>
              <a-radio-group default-value="a" size="large" class="themes-color-group">
                <a-radio-button value="a" class="themes-color-item">
                  1
                </a-radio-button>
                <a-radio-button value="b" class="themes-color-item">
                  Hangzhou
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <div class="row-box">
            <span>背景</span>
            <div class="row-content">x</div>
          </div>
        </div>
        <div :class="[ 'button', 'submit-btn', $store.state.themes.mainBColor ]">确定</div>
      </div>
    </Masks>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import Masks from '~/components/Masks.vue';

@Component({
  components: {
    Masks,
  },
})
export default class HeaderThemes extends Vue {
  styleList: any = {};
  /**
   * 是否显示弹窗
   */
  showPopup: boolean = false;

  @Watch('$store.state.isMobile')
  isMobileUpdate(val) {
    this.styleList.marginLeft = val ? '0' : '-5vw';
    this.$forceUpdate();
  }


  created() {
    const { isMobile } = this.$store.state;
    this.styleList.marginLeft = isMobile ? '0' : '-5vw';
    // console.log(this.$config);
    
  }


  /**
   * slider修改文字大小时
   */
  fontSizeChang(fontsize: number) {
    const root: any = document.getElementsByTagName('html')[0];
    root.style = `font-size: ${fontsize}px`;
  }


  /**
   * 切换UI主题色
   */
  toggleAntdThemes(color) {
    window.less
      .modifyVars({
        '@primary-color': color,
        '@link-color': color,
        '@btn-primary-bg': color
      })
      .then(() => {
        console.log('成功')
      })
      .catch(error => {
        alert('失败')
        console.log(error)
      })
    ;
    return true;
  }
}
</script>

<style lang="scss" scoped>
.popup-box {
  width: 50vw;
  padding: 0 10px;
  max-width: 600px;
  min-width: 450px;
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
  
  .row-box {
    margin-bottom: 10px;

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
    width: 5rem;
    margin-bottom: 20px;
    @include themify($themes) {
      color: themed('font-color');
    }
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
  .themes-color-group {
    display: flex;
    justify-content: space-between;

    .themes-color-item {
      width: 100%;
      background-color: transparent;
      border: 0;
      box-shadow: none;

      &::before {
        display: none;
      }

      &:focus-within {
        outline: none;
      }
    }
  }
}
</style>
