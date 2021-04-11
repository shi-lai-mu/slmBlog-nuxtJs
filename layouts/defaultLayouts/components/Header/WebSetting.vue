<template>
  <li :class="[ 'slm', 'blog-shezhi', $store.state.themes.mainBColor ]" @click.self="showPopup = !showPopup">
    <Masks :styleList="styleList" :hide="!showPopup" @close="() => showPopup = false">
      <div class="popup-box">
        <h4 class="popup-title">网站设置<label class="web-setting__version">{{ setting.version }}</label></h4>
        <div class="popup-tips"></div>
        <div class="popup-content">

          <div class="row-box popup-item" v-for="(item, key) of setting.web" :key="key">
            <span class="row-title" v-text="item.title || `配置项${key}`"></span>
            <ul class="row-content">
              <a-row
                v-for="(value, index) in item"
                v-show="(typeof value !== 'string')"
                :class="['item-row', { 'item-row-disable': value.disable === true }]"
                :key="index"
              >

                <a-col :lg="{ span: 18 }">
                  <span class="item-row__title" v-text="value.title"></span>
                  <span class="item-row__desc" v-if="value.description" v-text="value.description"></span>
                </a-col>
                <a-col :lg="{ span: 6 }">
                  <a-switch v-if="value.type == 'switch'" :default-checked="value.enable" v-model="value.enable" @change="e => switchChange(e, value, index)"/>
                  <template v-else-if="value.type == 'timePicker'">
                    <div v-if="value.array">
                      <div v-for="(valueItem, valueIndex) in value.array" :key="valueIndex" :class="`time-picker-box__${index}`">
                        <a-time-picker
                          size="small"
                          v-model="input[`time-picker__${index}${valueIndex}`]"
                          @change="e => timePickerChang(e, valueItem, index, `time-picker__${index}${valueIndex}`)"
                          :format="'HH:mm:ss ' + valueItem[1]"
                          :class="`time-picker__${index}`"
                          :defaultValue="valueItem[0] ? moment(valueItem[0], 'HH:mm:ss') : null"
                          :placeholder="valueItem[1] + '时间'"/>
                      </div>
                    </div>
                  </template>
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
import moment from 'moment';
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { stateData as ConfigState } from '@/store/config';
import {
  Switch as ASwitch,
  TimePicker as ATimePicker
} from 'ant-design-vue';

import Masks from '@/components/Masks.vue';
import { StateMutation } from '@/interface/state';

const ConfigModule = namespace('config');

/**
 * 网站设置类
 */
@Component({
  name: 'WebSetting',
  components: {
    Masks,
    ASwitch,
    ATimePicker,
  },
  methods: {
    moment,
  }
})
export default class WebSetting extends Vue {
  /**
   * 样式列表
   */
  styleList: any = {};
  /**
   * 是否显示弹窗
   */
  showPopup: boolean = false;
  /**
   * 临时输入存储入口
   */
  input = {};
  /**
   * 站点设置
   */
  @ConfigModule.State setting!: typeof ConfigState.setting;
  /**
   * 设置站点参数
   */
  @ConfigModule.Action saveConfigServer!: StateMutation;


  /**
   * 开关滑块变动时
   */
  switchChange(e, v, key) {
    const setting = this.setting.web;
    v.enable = e;

    // 联动选项
    switch(key) {
      case 'autoToggle':
        setting.themes.autoToggleTime.disable = !e;
        // 如果切换为开启状态则检测时间是否为空，为空则填入默认时间
        if (e) {
          const arr = setting.themes.autoToggleTime.array;
          if (!arr[0][0]) arr[0][0] = '18:00:00';
          if (!arr[1][0]) arr[1][0] = '6:00:00';
          this.input['time-picker__autoToggleTime0'] = moment(arr[0][0], 'HH:mm:ss');
          this.input['time-picker__autoToggleTime1'] = moment(arr[1][0], 'HH:mm:ss');
        }
        break;
    }

    this.updateSetting();
  }


  /**
   * 时间组件变动事件
   */
  timePickerChang(e, v, key) {
    const setting = this.setting.web;
    if (e) {
      const { $H, $m, $s } = e;
      v[0] = `${$H}:${$m}:${$s}`;
    } else {
      v[0] = '';
    }
    this.updateSetting();

    // 联动选项
    switch(key) {
      case 'autoToggleTime':
        this.switchChange(!!e, setting.themes.autoToggle, 'autoToggle');
        break;
    }
  }


  /**
   * 触发更新
   */
  updateSetting() {
    this.saveConfigServer({
      ...this.setting,
      isSave: true,
    });
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
  box-sizing: border-box;

  .popup-item .row-content {
    margin-bottom: 10px;
  }

  .web-setting__version {
    margin-left: 1em;
    font-size: .7em;
  }

  .popup-title {
    margin: 1rem 0 .3rem;
    font-size: 1.3rem;
  }

  .popup-content {
    overflow-y: scroll;
    max-height: 70vh;
    text-align: left;
    padding: 15px 10px 10px;
  }

  .item-row {
    padding: 5px 0;

    &.item-row-disable {
      opacity: .3;
      transition: .5s ease-in-out;
      pointer-events: none;
    }

    .ant-col-lg-6 {
      display: flex;
      justify-content: flex-end;
    }

    .item-row__desc {
      display: block;
      font-size: .8em;
    }
  }
  div.row-box {
    padding: 10px 20px;
    margin-bottom: 15px;

    .row-title {
      font-size: 1.1rem;
      font-weight: bold;
      border-bottom: 0;
    }

    .row-content {
      margin-top: .5rem;
      padding: 10px;
      border: 1px solid var(--c-border-overlay);
      border-radius: 15px;
    }
  }

  .submit-btn {
    width: 30%;
    margin: 0 auto 20px;
  }
}

.time-picker-box__autoToggleTime {
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 2px;
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
