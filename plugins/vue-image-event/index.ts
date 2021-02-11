import { ScrollService } from "../vue-onscroll-event/static.service";
import { ImageElement } from './index.d'

const ImgList: HTMLImageElement[] = [];

export default {
  install(Vue, options) {

    // 对插件观察者进行监听，第一次滚入视图 滚动事件
    if (Vue.$observer) {
      Vue.$observer.on(ScrollService.EVENT.FIRST_IN_VIEW, ({ target }) => {
        if (target.loadImg) {
          // 复原 原链接
          target.src = target.loadImg.src;
          // 载入成功类
          target.classList.add('load-success');
        }
      });
    } else {
      throw Error('滚动监听可能未找到可用的观察者!');
    }
    
    Vue.directive('img', {
      inserted(target: ImageElement, params) {
        if (target instanceof HTMLImageElement) {
          const Img = new Image();
          Img.onerror = () => {
            target.setAttribute('error-src', Img.src);
            Img.src = target.src = '/error.jpg';
          };
          // Img.onload = () => {
            // target.src = Img.src;
          // };
          target.loadImg = Img;
          Img.src = target.src;
          target.src = '/loading.gif';
          ImgList.push(target);
          ScrollService.install(target, {}, {
            value: {
              el: target,
            }
          });
        }
      }
    });
  }
}
