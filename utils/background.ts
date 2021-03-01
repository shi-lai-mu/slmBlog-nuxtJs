let initClass;
/**
 * 背景canvas动画类
 */
export default class Background {

  /**
   * 默认配置
   */
  static defaultOptions: BackgroundSpace.Options = {
    grain: {
      number: 100,
      size: 1,
    },
  };

  /**
   * 当前配置
   */
  options!: BackgroundSpace.Options;

  /**
   * CanvasRenderingContext2D
   */
  ctx!: CanvasRenderingContext2D;

  /**
   * 动画对象
   */
  anObject: BackgroundSpace.AnimationObjcet = {
    grains: [],
  };

  /**
   * Canvas
   */
  canvas!: HTMLCanvasElement;

  /**
   * 命令列表
   */
  cmdList = {
    fill: () => this.ctx.fill(),
    stroke: () => this.ctx.stroke(),
    beginPath: () => this.ctx.beginPath(),
    line: (x, y) => this.ctx.lineTo(x, y),
    move: (x, y) => this.ctx.moveTo(x, y),
    fillStyle: color => this.ctx.fillStyle = color,
    strokeStyle: color => this.ctx.strokeStyle = color,
    arc: (x, y, size) => this.ctx.arc(x, y, size, 0, Math.PI * 2, false),
  };

  /**
   * 屏幕参数
   */
  screen = {
    width: 0,
    height: 0,
  };

  /**
   * 停止状态
   */
  isStop = false;

  /**
   * 背景canvas动画类
   * @param canvas  Canvas元素
   * @param options 配置
   * @param auto    实例化后是否自动初始化
   */
  constructor(canvas: HTMLCanvasElement, options?: BackgroundSpace.Options, auto = true) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw Error('CanvasRenderingContext2D is NULL!');

    // 单例模式 重置类基本设置
    if (initClass) {
      initClass.ctx = ctx;
      initClass.canvas = canvas;
      initClass.isStop = false;
      initClass.animation();
      return initClass;
    }

    this.ctx = ctx;
    this.canvas = canvas;
    this.options = options ? Object.assign({}, Background.defaultOptions, options) : Background.defaultOptions;
    this.screen = {
      width: document.body.offsetWidth,
      height: document.documentElement.clientHeight,
    };
    
    if (auto) this.init();
    initClass = this;
  }

  
  /**
   * 随机数值
   */
  private rand() {
    return Math.random();
  }

  /**
   * 随机颜色
   */
  private randColor() {
    return {
      r: 25 + Math.random() * 250,
      g: 25 + Math.random() * 250,
      b: 25 + Math.random() * 250
    }
  }


  /**
   * 初始化
   */
  private init() {
    const { grain } = this.options;
    let grainSize = grain.number;

    while (grainSize--) {
      this.anObject.grains.push(this.createGrain());
    }

    this.animation();
  }


  /**
   * 动画
   */
  private animation() {
    // 停止状态跳出动画帧
    if (this.isStop) return false;

    const { canvas, screen } = this;
    canvas.width = screen.width;
    canvas.height = screen.height;
    this.draw();
    window.requestAnimationFrame(this.animation.bind(this));
  }


  /**
   * 绘制方法
   */
  private draw() {
    const { canvas } = this;
    const { width, height } = canvas;

    this.anObject.grains.forEach((grain, i) => {
      const moveX = grain.deviation.x + grain.speed.x;
      const moveY = grain.deviation.y + grain.speed.y;

      if (grain.accelerate > .5) grain.accelerate -= .001;

      grain.x += (Math.abs(moveX) > 0.5 ? moveX / 4 : moveX) * grain.accelerate;
      grain.y += (Math.abs(moveY) > 0.5 ? moveY / 4 : moveY) * grain.accelerate;

      if (grain.prev.n) {
        // 重合位移重生
        if (grain.prev.x === grain.x || grain.prev.y === grain.y) {
          this.anObject.grains[i] = this.createGrain();
        }
        grain.prev.x = grain.x;
        grain.prev.y = grain.y;
      }
      grain.prev.n = (grain.prev.n + 1) % 2;

      const radius = grain.size * (grain.shell ? grain.shell : 1) - 2;

      if (grain.x + radius > width || grain.x - radius < radius) {
        grain.deviation.x *= -1;
        grain.speed.x *= -1;
        grain.color = this.randColor();
        grain.accelerate = 1.5;
      }

      if (grain.y + radius > height || grain.y - radius < radius) {
        grain.deviation.y *= -1
        grain.color = this.randColor();
        grain.speed.y *= -1;
        grain.accelerate = 1.5;
      }

      // 超出界限重生
      if (
        grain.y < -100
        || grain.x < -100
        || grain.y > height + 100
        || grain.x > width + 100
      ) {
        this.anObject.grains[i] = this.createGrain();
      }
      const color = `${grain.color.r},${grain.color.g},${grain.color.b}`;

      // 连线检测
      this.anObject.grains.forEach(child => {
        const dx = Math.pow(Math.pow(grain.x - child.x, 2) + Math.pow(grain.y - child.y, 2), 0.5);
        // 连线
        if (dx <= grain.size + child.size + 100) {
          this.command({
            beginPath: 1,
            move: [child.x, child.y],
            line: [grain.x, grain.y],
            strokeStyle: [`rgba(${color}, 0.1)`],
            stroke: 1
          });
        }
      });

      this.command({
        beginPath: 1,
        fillStyle: [`rgba(${color},0.2)`],
        arc: [grain.x - 0.5, grain.y - 0.5, grain.size],
        fill: 1
      });

      // 内部核心
      if (grain.isKernel) {
        this.command({
          beginPath: 1,
          fillStyle: [`rgba(${color},0.3)`],
          arc: [grain.x - 0.5, grain.y - 0.5, grain.size / 2],
          fill: 1
        })
      }

      // 大圈
      if (grain.shell) {
        this.command({
          beginPath: 1,
          strokeStyle: [`rgba(${color},0.35)`],
          arc: [grain.x - 0.5, grain.y - 0.5, grain.size * grain.shell],
          stroke: 1
        });
      }
    });
  }


  private createGrain() {
    const { screen } = this;
    return {
      x: this.rand() * screen.width - 20,
      y: this.rand() * screen.height,
      color: this.randColor(),
      size: (3 + this.rand() * 10) + (1 % window.devicePixelRatio),
      isKernel: this.rand() > 0.5,
      speed: {
        x: (this.rand() * 2 - 1) / 1.5,
        y: (this.rand() * 2 - 1) / 1.5,
      },
      deviation: {
        x: (this.rand() * 2 - 1),
        y: (this.rand() * 2 - 1),
      },
      accelerate: 1,
      prev: { x: 0, y: 0, n: 0 },
      shell: this.rand() > 0.5 ? this.rand() * 4 : false,
      time: Date.now(),
    } as BackgroundSpace.Grain;
  }


  /**
   * 命令绘制
   * @param commands 命令
   */
  private command(commands) {
    const { cmdList } = this;
    for (const cmd in commands) {
      if (cmd in cmdList) {
        typeof commands[cmd] !== 'number'
          ? cmdList[cmd](...commands[cmd])
          : cmdList[cmd](commands[cmd])
        ;
      }
    }
  }
}


export namespace BackgroundSpace {
  /**
   * 背景配置
   */
  export interface Options {
    /**
     * 粒子配置
     */
    grain: {
      /**
       * 粒子数量
       */
      number: number;
      /**
       * 粒子大小 最小值
       */
      size?: number;
    }
  }

  /**
   * 粒子
   */
  export interface Grain {
    /**
     * X轴
     */
    x: number;
    /**
     * Y轴
     */
    y: number;
    /**
     * 颜色
     */
    color: { r: number; g: number; b: number; };
    /**
     * 大小
     */
    size: number;
    /**
     * 是否有内核
     */
    isKernel: boolean;
    /**
     * 外壳
     */
    shell: number | false;
    /**
     * 偏移值
     */
    deviation: {
      /**
       * X轴偏移值
       */
      x: number;
      /**
       * Y轴偏移值
       */
      y: number;
    };
    /**
     * 速度值
     */
    speed: {
      /**
       * X轴速度值
       */
      x: number;
      /**
       * Y轴速度值
       */
      y: number;
    };
    /**
     * 加速值
     */
    accelerate: number;
    /**
     * 上次位置
     */
    prev: {
      /**
       * 上次位置X轴
       */
      x: number;
      /**
       * 上次位置Y轴
       */
      y: number;
      /**
       * 定位
       */
      n: number;
    };
    time: number;
  };


  /**
   * 动画对象
   */
  export interface AnimationObjcet {
    /**
     * 粒子对象
     */
    grains: Grain[];
  };
}
