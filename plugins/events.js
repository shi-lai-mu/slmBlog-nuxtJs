/**
 * 窗口时间去切换为 移动端 / PC端
 */
window.addEventListener('resize', resize)

function resize (e) {
  document.body.className = window.innerWidth > 840 ? 'max' : 'centre'
}
resize()

// /* 移动端右划事件 */
// this.$nextTick(() => {
//   let pointer = {}
//   let screenW = screen.availWidth / 2 / 50
//   window.addEventListener('touchstart', e => {
//     pointer = {
//       x: e.changedTouches[0].clientX,
//       y: e.changedTouches[0].clientY
//     }
//   })
//   window.addEventListener('touchend', e => {
//     if (pointer.x && Math.abs(pointer.y - e.changedTouches[0].clientY) < 30) {
//       let moveX = Math.min((e.changedTouches[0].clientX - pointer.x) / screenW, 50)
//       if (Math.abs(moveX) > 20) {
//         this.$refs.head.toggleMneu(moveX > 0)
//       }
//     }
//   })
// })
//
