<template>
  <li :class="[ 'slm', 'blog-shezhi', $store.state.themes.mainBColor ]" @click.self="showPopup = !showPopup">
    <Masks :styleList="styleList" :hide="!showPopup" @close="() => showPopup = false">
      <div class="popup-box">
        <h4 class="popup-title">网站设置<label class="web-setting__version">{{ $$store.state.setting.version }}</label></h4>
        <div class="popup-tips"></div>
        <div class="popup-content">

          <div class="row-box popup-item" v-for="(item, key) of $$store.getters.webSetting" :key="key">
            <span class="row-title" v-text="item.title || `配置项${key}`"></span>
            <ul class="row-content">
              <a-row class="item-row" v-for="(value, index) in item" :key="index" v-show="typeof value !== 'string'">
                <a-col :lg="{ span: 18 }">
                  <span class="item-row__title" v-text="value.title"></span>
                  <span class="item-row__desc" v-if="value.description" v-text="value.description"></span>
                </a-col>
                <a-col :lg="{ span: 6 }">
                  <a-switch v-if="value.enable !== undefined" :default-checked="value.enable" v-model="value.enable" @change="e => switchChange(e, value)"/>
                </a-col>
              </a-row>
            </ul>
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

import Masks from '@/components/Masks.vue';

@Component({
  name: 'WebSetting',
  components: {
    Masks,
    ASwitch,
  }
})
export default class WebSetting extends Vue {
  styleList: any = {};
  /**
   * 是否显示弹窗
   */
  showPopup: boolean = false;

  created() {
    const { isMobile, setting } = this.$$store.state;
    // this.styleList.marginLeft = isMobile ? '0' : '-5vw';
    console.log(this.$$store.state.setting);
    
  }


  /**
   * 开关滑块变动时
   */
  switchChange(e, v) {
    v.enable = e;
    this.$$store.commit('setWebOptions', this.$$store.state.setting);
  }
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

  .popup-item .row-content {
    margin-bottom: 10px;
  }

  .web-setting__version {
    margin-left: 1em;
    font-size: .7em;
    @include themify($themes) {
      color: themed('font-lv3-color');
    }
  }

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
    @include themify($themes) {
      color: themed('font-lv1-color');
    }
  }

  .item-row {
    padding: 5px 0;

    .ant-col-lg-6 {
      display: flex;
      justify-content: flex-end;
    }

    .item-row__desc {
      display: block;
      font-size: .8em;
      @include themify($themes) {
        color: themed('font-lv3-color');
      }
    }
  }
  div.row-box {
    padding-bottom: 2.5px;
    margin-bottom: 15px;
    // background-color: transparent;

    .row-title {
      font-size: 1.1rem;
      font-weight: bold;
      border-bottom: 0;
    }

    .row-content {
      margin-top: .5rem;
      padding: 10px;
      @include themify($themes) {
        background-color: themed('main-bg-f2-color');
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
