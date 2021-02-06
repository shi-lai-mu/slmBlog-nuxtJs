
import Vue from 'vue'
import {
  Slider,
  Radio,
  message,
  Row,
  Col,
  Button,
} from 'ant-design-vue'
import { isServer } from '../config/system';
import VueOnScrollEvent from './vue-onscroll-event';

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
  .use(Button)

  .use(VueOnScrollEvent, {
    el: '.layout'
  })
;
