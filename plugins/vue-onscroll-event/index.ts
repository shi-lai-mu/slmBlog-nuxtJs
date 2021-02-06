import Observer from './obServer';
import { ScrollEventNS } from './index.d';

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
  install(Vue, options: ScrollEventNS.ScrollEventUseOptions) {

    const observer = new Observer();
    Vue.$observer = observer;

    // 防抖延迟
    let debounceNumber = options?.debounceNumber || 100;
    // 定义事件
    const scrollEvent = (e?: any) => {
      if (!e) {
        return Object.keys(eventElMap).forEach(uuid => {
          scrollEvent({ target: { scrollUUID: uuid } });
        });
      }

      const { target } = e;
      const uuid = target.scrollUUID;
      
      if (uuid && eventElMap[uuid] && eventElMap[uuid].list.length) {
        eventElMap[uuid].list.forEach(({ el, binding }) => {
          const { currentElement } = binding;
          let scrollTop = currentElement.pageYOffset || currentElement.scrollTop || document.documentElement.scrollTop;
          const isUpwards = scrollTop < binding.lastScrollTop;
          ScrollService.triggerEvent(el, binding, { isUpwards, previousClassName: binding.previousClassName });
          binding.lastScrollTop = scrollTop;
        });
      }

      observer.emit('scroll-in-el', e);
    };

    Vue.directive('scroll-event', {
      inserted(target: HTMLElement, params: Options) {
        let privateEl;
        const { el: bindingEl } = params.value;

        // 初始化配置
        ScrollService
          .useDefaultOrConfig(params, 'transformName', undefined, options.transformName)
          .useDefaultOrConfig(params, 'transform', true, options.initTransform)
        ;

        // 初始过渡类名
        if (params.transform && params.transformName) {
          target.classList.add(params.transformName)
          params.previousClassName = target.className;
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

  /**
   * 触发事件
   * @param element 触发事件的元素
   * @param params1 绑定的配置
   * @param params2 滚动方向 原class
   */
  static triggerEvent(element: HTMLElement, { value: params, modifiers, currentElement }: Options, { isUpwards, previousClassName = '' }) {
    // 是否在视野内
    const isInScrollView = (({ top, bottom }) => top < currentElement.offsetHeight && bottom > 0)(element.getBoundingClientRect());
    // 是否包含动向
    const isBiDirectional = params.down && params.up;
    // 是否修改过class
    const hasBeenApplied = element.className.trim() !== previousClassName.trim();
    // 入参为字符串
    const isDirectionAgnostic = params instanceof String;
    // 是否包含重复修饰符
    const isRepeat = !!modifiers.repeat;
    // 是否为重复触发 且 当前滚动方向为反方向
    const shouldResetAnimation = isRepeat && ((isUpwards && params.down) || (!isUpwards && params.up));

    // 未进入视野内
    if (!isInScrollView) {
      // 如果为重复且修改过class 则 重置视野外的class
      if (isDirectionAgnostic && isRepeat) {
        element.className = previousClassName;
      }
      return;
    }

    // 如果为字符串则添加params到class
    if (isDirectionAgnostic) element.classList.add(params as string);

    // 如果为重复或包含动向或未修改过class 则 添加down或up至class
    if (isRepeat || isBiDirectional || !hasBeenApplied) {
      element.classList.add(params.down || params.up);
    }

    // 是否为重复触发 且 当前滚动方向为反方向 则 重置class    
    if (shouldResetAnimation) element.className = previousClassName;
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