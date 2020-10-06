import Vue from 'vue'
import { Slider, message } from 'ant-design-vue'

Vue.config.productionTip = false;
Vue.prototype.$message = message;

Vue
  .use(Slider)
;