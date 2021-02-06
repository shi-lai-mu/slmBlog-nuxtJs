import { ScrollEventNS } from './index.d';
import ScrollAnimate from './scroll-animate'

// 元素合集
let Elements: Array<{ el: HTMLElement, binding: ScrollEventNS.ScrollEventBindingOptions }> = [];
// 计时器
let clock = {};
// 事件容器合集
const eventElMap: ScrollEventNS.EventElMap = {};
// 目标元素
// let currentElement = window;

type Options = ScrollEventNS.ScrollEventBindingOptions;

export default {
  ScrollAnimate,
  install(Vue, options: ScrollEventNS.ScrollEventUseOptions) {

    // 防抖延迟
    let debounceNumber = options?.debounceNumber || 100;
    // 定义事件
    const scrollAnimate = ScrollAnimate();
    const scrollEvent = (e?: any) => {
      if (!e) {
        return Object.keys(eventElMap).forEach(uuid => {
          scrollEvent({ target: { scrollUUID: uuid } });
        });
      }

      const { target } = e;
      const uuid = target.scrollUUID;
      
      if (uuid && eventElMap[uuid] && eventElMap[uuid].list.length) {
        let lastScrollTop = 0;
        eventElMap[uuid].list.forEach(({ el, binding }) => {
          const { currentElement } = binding;
          let scrollTop = currentElement.pageYOffset || currentElement.scrollTop || document.documentElement.scrollTop;
          const previousClassName = el.className;
          const isUpwards = scrollTop < lastScrollTop;
          scrollAnimate.run(el, binding, {isUpwards, previousClassName});
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
      }
    };

    Vue.directive('scroll-event', {
      inserted(target: HTMLElement, params: Options) {
        let privateEl;
        const { el: bindingEl } = params.value;

        ScrollService
          .useDefaultOrConfig(params, 'transformName', undefined, options.transformName)
          .useDefaultOrConfig(params, 'transform', true, options.initTransform)
        ;

        if (params.transform && params.transformName) {
          target.classList.add(params.transformName)
        }

        if (bindingEl) {
          privateEl = bindingEl instanceof Function ? bindingEl() : bindingEl;
        }
        params.currentElement = privateEl || (options.el ? document.querySelector(options.el) : window) as HTMLElement | Window | null;
        ScrollService.append(target, params);

        // 防抖结束时添加事件
        ScrollService.debounce(() => {
          Object.values(eventElMap).forEach(({ el }) => {
            el.addEventListener('scroll', scrollEvent);
          });
          scrollEvent();
        }, debounceNumber, 'inserted');
      }
    });

    Vue.mixin({
      beforeDestroy() {
        ScrollService.debounce(() => ScrollService.updateListState(), debounceNumber, 'beforeDestroy');
      }
    });

  }
}

class ScrollService {

  /**
   * 是否进入视图内
   */
  static isInScrollView(el: HTMLElement, options: Options) {
    const { top, bottom } = el.getBoundingClientRect();
    return top < options.currentElement.clientHeight && bottom > 0;
  }

  static triggerEvent() {
    
  }


  /**
   * 应用系统配置或用户配置
   * @param obj          处理对象
   * @param key          对象键
   * @param defaultValue 默认值
   * @param useOption    引入时的参数
   */
  static useDefaultOrConfig(obj: any, key: string, defaultValue: any, useOption?: any) {
    obj[key] === undefined
      ? useOption ?? defaultValue
        ? obj[key] = useOption ?? defaultValue
        : true
      : false
    ;
    return this;
  }

  /**
   * 增加成员
   */
  static append(el: HTMLElement, binding: Options) {
    let { scrollUUID } = binding.currentElement;
    if (!scrollUUID) {
      scrollUUID = (Date.now() * Math.random()).toString(16).substr(-8).replace('.', '');
      binding.currentElement.scrollUUID = scrollUUID;
      eventElMap[scrollUUID] = {
        el: binding.currentElement,
        list: [],
      };
    }
    eventElMap[scrollUUID].list.push({
      el,
      binding,
    });

    console.log({eventElMap});
    

    Elements.push({
      el,
      binding,
    });
  }

  /**
   * 删除成员
   */
  static delete(el: HTMLElement) {
    Elements.some((item, index) => {
      if (item.el === el) {
        Elements.splice(index, 1);
        return true;
      }
    });
  }

  /**
   * 定位元素
   */
  static find(el: HTMLElement) {
    const index = Elements.findIndex((item) => {
      if (item.el === el) {
        return item;
      }
    });
    return {
      index,
      item: Elements[index],
    };
  }

  /**
   * 更新列表状态排除已被销毁的元素
   */
  static updateListState() {
    Elements = Elements.filter(({ el }) => {
      if (!el.isConnected) {
        return false;
      }
      return true;
    });
  }

  /**
   * 防抖方法
   * @param cb   函数
   * @param time 延迟时间[ms]
   */
  static debounce(cb: CallableFunction, time: number = 500, tag = 'default') {
    clearTimeout(clock[tag]);
    clock[tag] = setTimeout(() => cb(), time);
  }
}