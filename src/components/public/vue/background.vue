<template>
  <canvas class="canvas-bg" width="1920" height="1080" ref="canvas"></canvas>
</template>

<script>
/**
 * 背景组件
 */
export default {
  created () {
    this.$nextTick(() => {
      // canvas
      let canvas = this.$refs.canvas

      let CanvasBg = (function () {
        let ctx = canvas.getContext('2d')

        return class Canvas {
          clearInter = null
          constructor () {
            this.resize()
            this.dots = []
            // 生成球体
            for (var i = 0; i < 100; i++) {
              this.dots.push({
                x: Math.random() * canvas.width + 2,
                y: Math.random() * canvas.height + 2,
                xa: (Math.random() * 2 - 1) / 1.5,
                ya: (Math.random() * 2 - 1) / 1.5,
                color: {
                  r: Math.random() * 256,
                  g: Math.random() * 256,
                  b: Math.random() * 256
                },
                size: (3 + Math.random() * 2) + (1 % window.devicePixelRatio)
              })
            }
            window.requestAnimationFrame(this.draw.bind(this))
          }

          // 绘制函数
          draw () {
            canvas.width = screen.availWidth
            // ctx.scale(window.devicePixelRatio % 1, window.devicePixelRatio % 1)
            for (var i = 0; i < 100; i++) {
              let dot = this.dots[i]
              dot.x += dot.xa
              dot.y += dot.ya
              // 边缘碰撞检测
              dot.xa *= dot.x > (canvas.width - (dot.size / 2)) || dot.x < dot.size / 2 ? -1 : 1
              dot.ya *= dot.y > (canvas.height - (dot.size / 2)) || dot.y < dot.size / 2 ? -1 : 1

              // 绘制圆形
              ctx.fillStyle = `rgba(${dot.color.r},${dot.color.g},${dot.color.b},0.25)`
              ctx.beginPath()
              ctx.arc(dot.x - 0.5, dot.y - 0.5, dot.size, 0, 2 * Math.PI, false)
              ctx.fill()
              ctx.beginPath()
              ctx.fillStyle = `rgba(${dot.color.r},${dot.color.g},${dot.color.b},0.35)`
              ctx.arc(dot.x - 0.5, dot.y - 0.5, dot.size / 2, 0, 2 * Math.PI, false)
              ctx.fill()

              // 连线检测
              for (var j = 0; j < 100; j++) {
                let otherDot = this.dots[j]
                let dx = Math.pow(Math.pow(dot.x - otherDot.x, 2) + Math.pow(dot.y - otherDot.y, 2), 0.5)

                // 连线
                if (dx <= dot.size + otherDot.size + 50) {
                  ctx.beginPath()
                  ctx.moveTo(otherDot.x, otherDot.y)
                  ctx.lineTo(dot.x, dot.y)
                  ctx.strokeStyle = `rgba(${dot.color.r},${dot.color.g},${dot.color.b},0.1)`
                  ctx.lineWidth = 1
                  ctx.stroke()
                }
              }
            }
            window.requestAnimationFrame(this.draw.bind(this))
          }

          // 改变大小时
          resize () {
            canvas.width = screen.availWidth
            canvas.height = screen.availHeight
          }
        }
      })()

      this.CanvasBg = new CanvasBg()

      // 缩小窗口时改变canvas
      window.addEventListener('resize', () => {
        this.CanvasBg.resize()
      })
    })
  }
}
</script>

<style>
.canvas-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
