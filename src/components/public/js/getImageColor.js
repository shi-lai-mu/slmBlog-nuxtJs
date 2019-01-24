export default {
  /**
   * 获取图像平均色
   * @param {string} url 图像路径/URL
   * @param {function} cb 回调函数
   */
  loadImg (url, cb) {
    let canvas = document.createElement('canvas')
    document.body.append(canvas)
    let ctx = canvas.getContext('2d')
    // 实例化图像
    if (typeof url === 'string') {
      // 如果跨域请求图片[中介处理]
      if (/\/\//.test(url)) {
        url = `//mczyzy.cn:8080/api/getImage?url=${encodeURIComponent(url)}`
      }
      let img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.src = url
      // 加载完时
      img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        let imgData = ctx.getImageData(0, 0, img.width, img.height).data
        // 遍历像素 取总值
        let r = 0
        let g = 0
        let b = 0
        let wLength = parseInt(img.width / 5)
        let hLength = parseInt(img.height / 5)
        // 六分算法
        for (let w = 0; w < 6; w++) {
          for (let h = 0; h < 6; h++) {
            r += imgData[((wLength * w) + (hLength * h)) * 4]
            g += imgData[((wLength * w) + (hLength * h)) * 4 + 1]
            b += imgData[((wLength * w) + (hLength * h)) * 4 + 2]
          }
        }

        // 计算平均色
        r = parseInt(r / 36)
        g = parseInt(g / 36)
        b = parseInt(b / 36)
        // 返回
        let rgb = `rgb(${r},${g},${b})`
        cb && cb(rgb)
        return rgb
      }
      // 加载错误
      img.onerror = console.error
    }
  }
}
