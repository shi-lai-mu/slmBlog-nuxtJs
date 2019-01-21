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
      let slef = this

      let CanvasBg = (function () {
        let ctx = canvas.getContext('2d')
        let ctxCount = 40
        let sizeMax = 5
        // pc 端配置
        if (!slef.$store.state.mobile) {
          ctxCount = 200
          sizeMax = 10
        }

        return class Canvas {
          clearInter = null
          constructor () {
            this.resize()
            this.dots = []
            // 生成球体
            for (var i = 0; i < ctxCount; i++) {
              this.dots.push({
                x: rand() * canvas.width + 2,
                y: rand() * canvas.height + 2,
                // 移动角度
                xa: (rand() * 2 - 1) / 1.5,
                ya: (rand() * 2 - 1) / 1.5,
                // 颜色
                color: {
                  r: 25 + rand() * 250,
                  g: 25 + rand() * 250,
                  b: 25 + rand() * 250
                },
                // 设备像素修复
                size: (3 + rand() * sizeMax) + (1 % window.devicePixelRatio),
                big: rand() > 0.5 ? rand() * 4 : false,
                kernel: rand() > 0.5
              })
            }
            window.requestAnimationFrame(this.draw.bind(this))

            // 随机数
            function rand () {
              return Math.random()
            }
          }

          // 绘制函数
          draw () {
            canvas.width = screen.availWidth
            // ctx.scale(window.devicePixelRatio % 1, window.devicePixelRatio)
            for (var i = 0; i < ctxCount; i++) {
              let dot = this.dots[i]
              dot.x += dot.xa
              dot.y += dot.ya
              // 边缘碰撞检测
              dot.xa *= dot.x > (canvas.width - (dot.size / 2)) || dot.x < dot.size / 2 ? -1 : 1
              dot.ya *= dot.y > (canvas.height - (dot.size / 2)) || dot.y < dot.size / 2 ? -1 : 1
              let color = `${dot.color.r},${dot.color.g},${dot.color.b}`
              // 连线检测
              for (var j = 0; j < ctxCount; j++) {
                let otherDot = this.dots[j]
                let dx = Math.pow(Math.pow(dot.x - otherDot.x, 2) + Math.pow(dot.y - otherDot.y, 2), 0.5)

                // 连线
                if (dx <= dot.size + otherDot.size + 100) {
                  dot.kernel && this.command({
                    beginPath: 1,
                    move: [otherDot.x, otherDot.y],
                    line: [dot.x, dot.y],
                    strokeStyle: [`rgba(${color},0.1)`],
                    stroke: 1
                  })
                }
              }
              // 基础圆形
              ctx.fillStyle = `rgba(${color},0.1)`
              ctx.beginPath()
              ctx.arc(dot.x - 0.5, dot.y - 0.5, dot.size, 0, 2 * Math.PI, false)
              ctx.fill()
              // 内部核心
              dot.kernel && this.command({
                beginPath: 1,
                fillStyle: [`rgba(${color},0.2)`],
                arc: [dot.x - 0.5, dot.y - 0.5, dot.size / 2],
                fill: 1
              })
              // 大圈
              dot.big && this.command({
                beginPath: 1,
                strokeStyle: [`rgba(${color},0.15)`],
                arc: [dot.x - 0.5, dot.y - 0.5, dot.size * dot.big],
                stroke: 1
              })
            }
            window.requestAnimationFrame(this.draw.bind(this))
          }

          // 命令绘制模式
          command (commands) {
            let cmdList = {
              beginPath: () => ctx.beginPath(),
              arc: (x, y, size) => ctx.arc(x, y, size, 0, Math.PI * 2, false),
              line: (x, y) => ctx.lineTo(x, y),
              move: (x, y) => ctx.moveTo(x, y),
              fillStyle: color => (ctx.fillStyle = color),
              strokeStyle: color => (ctx.strokeStyle = color),
              stroke: () => ctx.stroke(),
              fill: () => ctx.fill()
            }
            for (let cmd in commands) {
              if (cmd in cmdList) {
                cmdList[cmd](...commands[cmd])
              }
            }
          }

          // 改变大小时
          resize () {
            canvas.width = screen.availWidth
            canvas.height = screen.availHeight
            // canvas.style.height = screen.availWidth / window.devicePixelRatio
            // canvas.style.width = screen.availWidth / window.devicePixelRatio
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
