
export default {
  create (callback) {
    const animation = window.requestAnimationFrame || function (fn) {
      return setTimeout(fn, 1000 / 60)
    }
    const time = Date.now()
    let ani = () => {
      callback(Tween, time) && animation(ani)
    }
    ani()
  }
}
/**
 * 运动函数（默认匀速运动）
  1.Linear 匀速，  此时speed可以不填。
  2.Quad 二次方缓动效果
  3.Cubic 三次方缓动效果
  4.Quart 四次方缓动效果
  5.Quint 五次方缓动效果

  6.Sine  正弦缓动效果
  7.Expo  指数缓动效果
  8.Circ  圆形缓动函数

  9.Elastic 指数衰减正弦曲线缓动函数
  10.Back  超过范围的三次方的缓动函数
  11.Bounce 指数衰减的反弹曲线缓动函数

 * t: current time(当前时间)
 * b: beginning value(初始值)
 * c: change in value(变化量)
 * d: duration(持续时间)
 */
//  Tween.linear(t, b, c, d)
var Tween = {
  linear: function (t, b, c, d) {
    // 匀速
    return (c * t) / d + b //   t/d = prop
  },
  easeIn: function (t, b, c, d) {
    // 加速曲线
    return c * (t /= d) * t + b
  },
  easeOut: function (t, b, c, d) {
    // 减速曲线
    return -c * (t /= d) * (t - 2) + b
  },
  easeBoth: function (t, b, c, d) {
    // 加速减速曲线
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t + b
    }
    return (-c / 2) * (--t * (t - 2) - 1) + b
  },
  easeInStrong: function (t, b, c, d) {
    // 加加速曲线
    return c * (t /= d) * t * t * t + b
  },
  easeOutStrong: function (t, b, c, d) {
    // 减减速曲线
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },
  easeBothStrong: function (t, b, c, d) {
    // 加加速减减速曲线
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t * t * t + b
    }
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
  },
  elasticIn: function (t, b, c, d, a, p) {
    // 正弦衰减曲线（弹动渐入）
    let s
    if (t === 0) {
      return b
    }
    if ((t /= d) === 1) {
      return b + c
    }
    if (!p) {
      p = d * 0.3
    }
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    return (-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b)
  },
  elasticOut: function (t, b, c, d, a, p) {
    // 正弦增强曲线（弹动渐出）
    let s
    if (t === 0) {
      return b
    }
    if ((t /= d) === 1) {
      return b + c
    }
    if (!p) {
      p = d * 0.3
    }
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    return (a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b)
  },
  elasticBoth: function (t, b, c, d, a, p) {
    let s
    if (t === 0) {
      return b
    }
    if ((t /= d / 2) === 2) {
      return b + c
    }
    if (!p) {
      p = d * (0.3 * 1.5)
    }
    if (!a || a < Math.abs(c)) {
      a = c
      s = p / 4
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a)
    }
    if (t < 1) {
      return (-0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b)
    }
    return (a * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) * 0.5 + c + b)
  },
  backIn: function (t, b, c, d, s) {
    // 回退加速（回退渐入）
    if (typeof s === 'undefined') {
      s = 1.70158
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b
  },
  backOut: function (t, b, c, d, s) {
    if (typeof s === 'undefined') {
      s = 3.70158 // 回缩的距离
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },
  backBoth: function (t, b, c, d, s) {
    if (typeof s === 'undefined') {
      s = 1.70158
    }
    if ((t /= d / 2) < 1) {
      return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
    }
    return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
  },
  // 弹球减振（弹球渐出）
  bounceIn: function (t, b, c, d) {
    return c - Tween['bounceOut'](d - t, 0, c, d) + b
  },
  bounceOut: function (t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
    }
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
  },
  bounceBoth: function (t, b, c, d) {
    if (t < d / 2) {
      return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b
    }
    return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
  }
}
