import Vue from 'vue'
import {
  Slider,
  Radio,
  message,
  Row,
  Col,
} from 'ant-design-vue'

Vue.config.productionTip = false;
Vue.prototype.$message = message;

Vue
  .use(Slider)
  .use(Radio)
  .use(Row)
  .use(Col)
;