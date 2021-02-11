import Observer from './obServer';
import { ScrollEventNS } from './index.d';
import { ScrollService } from './static.service';

// 事件容器合集
const eventElMap: ScrollEventNS.EventElMap = {};
// 绑定参数
type Options = ScrollEventNS.ScrollEventBindingOptions;
// 内置观察者
export const observer = new Observer();

export default {
  install(Vue, options: ScrollEventNS.ScrollEventUseOptions) {
    Vue.$observer = observer;

    // 防抖延迟
    let debounceNumber = options?.debounceNumber || 100;

    Vue.directive('scroll-event', {
      inserted(target: HTMLElement, params: Options) {
        // 初始化配置
        ScrollService
          .useDefaultOrConfig(params, 'transformName', undefined, options.transformName)
          .useDefaultOrConfig(params, 'transform', true, options.initTransform)

          .install(target, params, options)
        ;
      }
    });

    Vue.mixin({
      beforeDestroy() {
        ScrollService.debounce(() => ScrollService.updateListState(), debounceNumber, 'beforeDestroy');
      }
    });

  }
}
