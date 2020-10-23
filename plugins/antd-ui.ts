import Vue from 'vue'
import {
  Slider,
  Radio,
  message,
  Row,
  Col,
} from 'ant-design-vue'
import { isServer } from '../config/system';

Vue.config.productionTip = false;

Vue.prototype.$message = isServer
  ? {
      error: () => {},
      info: () => {},
      success: () => {},
      loading: () => {},
    }
  : message
;

Vue
  .use(Slider)
  .use(Radio)
  .use(Row)
  .use(Col)
;