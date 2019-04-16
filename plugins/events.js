/**
 * 窗口时间去切换为 移动端 / PC端
 */
window.addEventListener('resize', resize)

function resize (e) {
  document.body.className = window.innerWidth > 840 ? 'max' : 'centre'
}
resize()
