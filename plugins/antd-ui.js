import Vue from 'vue'
import {
  Slider,
  Radio,
  message,
} from 'ant-design-vue'

Vue.config.productionTip = false;
Vue.prototype.$message = message;

Vue
  .use(Slider)
  .use(Radio)
;