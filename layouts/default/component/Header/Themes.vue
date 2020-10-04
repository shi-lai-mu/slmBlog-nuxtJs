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
            <div class="row-content">x</div>
          </div>
          <div class="row-box">
            <span>颜色</span>
            <div class="row-content">
              <div @click="$store.commit('setThemesMainColor', 'blue')">b</div>
              <div @click="$store.commit('setThemesMainColor', 'yellow')">c</div>
              <div @click="$store.commit('setThemesMainColor', 'powder')">d</div>
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
  showPopup: boolean = true;

  @Watch('$store.state.isMobile')
  isMobileUpdate(val) {
    this.styleList.marginLeft = val ? '0' : '-5vw';
    this.$forceUpdate();
  }

  created() {
    const { isMobile } = this.$store.state;
    this.styleList.marginLeft = isMobile ? '0' : '-5vw';
  }
}
</script>

<style lang="scss" scoped>
.popup-box {
  width: 50vw;
  padding: 0 10px;
  max-width: 600px;
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
}
</style>
