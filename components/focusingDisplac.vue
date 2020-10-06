<template>
  <span
  v-show="styles.left !== '0'"
  :class="['focusing', { rotate } ]"
  :style="{
    left: styles.left,
    top: styles.top,
    width: styles.width,
    height: styles.height,
  }"></span>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class FocusingDisplac extends Vue {
  styles: any = {
    // backgroundColor: '#FFF',
    left: '0',
    top: '0',
    width: '5px',
    height: '5px',
    // borderRadius: '5px',
  }

  /**
   * 是否处于旋转状态
   */
  rotate: boolean = false;

  /**
   * 位移值
   */
  offsetLeft: number = 0;

  /**
   * 是否处于动画状态
   */
  animation: boolean = false;

  /**
   * 计时器下标
   */
  clock: NodeJS.Timeout[] = [];

  /**
   * 聚焦到某个元素下方
   * @param element       目标元素
   * @param parentElement 父级元素[用于计算偏移值]
   * @param animation     是否有动画
   */
  focus(
    element: Element,
    parentElement?: Element,
    animation: boolean = true,
    offset?: { x?: number; y?: number; },
    ) {
    const { styles, offsetLeft, clock } = this;

    // 动画中则跳出
    if (clock[0] || clock[1] || !element) return false;
    
    // 位置计算
    let { x, y, width, height } = element.getBoundingClientRect();
    if (parentElement) {
      const { x: parentX, y: parentY } = parentElement.getBoundingClientRect();
      x -= parentX;
      y -= parentY;
    }
    
    // 偏移及宽度计算
    const newLeft = x + (width / 2) + (offset?.x || 0) - 2.5 - parseInt(styles.left) + offsetLeft;
    if (animation) {
      const newWidth = x;
      // 往右时翻转
      if (parseInt(styles.left) > newWidth) {
        this.rotate = true;
      }
      // 长度动画
      styles.width = `${ Math.abs(newWidth - offsetLeft) }px`;

      // 动画结束进行复原
      clock[0] = setTimeout(() => {
        styles.width = '5px';
        styles.left = `${ x + (width / 2) }px`;
        this.$forceUpdate();
        // 翻转复原
        clock[1] = setTimeout(() => {
          this.rotate = false;
          this.clearClock(1);
        }, 250);
        this.clearClock(0);
      }, 250);
    } else {
      styles.left = `${ newLeft }px`;
    }
    // 记录偏移
    this.offsetLeft = x;
    styles.top = `${ height + (offset?.y || 0) }px`;
    console.log(styles);
    
    // this.$forceUpdate();
  }


  /**
   * 清除计时器
   * @param clockIndex 计时器下标
   */
  clearClock(clockIndex: number) {
    const { clock } = this;
    delete clock[clockIndex];
    clearTimeout(clock[clockIndex]);
  }
}
</script>

<style lang="scss" scoped>
.focusing {
  position: absolute;
  // background-color: #FFF;
  background-image: linear-gradient(90deg, #FFF, #AAA);
  width: 5px;
  height: 5px;
  border-radius: 5px;
  transition: width .25s ease-in-out, left .25s ease-in-out;
}
.rotate {
  transform-origin: left;
  transform: rotate(180deg);
}
</style>
