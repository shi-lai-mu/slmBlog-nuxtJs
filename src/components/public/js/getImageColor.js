export default {
  /**
   * 获取图像平均色
   * @param {string} url 图像路径/URL
   */
  loadImg (url) {
    let canvas = document.createElement('canvas')
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
        ctx.drawImage(img, 0, 0)
        let imgData = ctx.getImageData(0, 0, img.width, img.height).data
        // 遍历像素 取总值
        let r = 0
        let g = 0
        let b = 0
        for (let h = 0, lh = img.height; h < lh; h++) {
          for (let w = 0, lw = img.width; w < lw; w++) {
            r += imgData[((img.width * w) + h) * 4]
            g += imgData[((img.width * w) + h) * 4 + 1]
            b += imgData[((img.width * w) + h) * 4 + 2]
          }
        }

        // 计算平均色
        let allXP = img.height * img.width
        r = parseInt(r / allXP)
        g = parseInt(r / allXP)
        b = parseInt(r / allXP)
        return `rgb(${r},${g},${b})`
      }
      // 加载错误
      img.onerror = console.error
    }
  }
}
