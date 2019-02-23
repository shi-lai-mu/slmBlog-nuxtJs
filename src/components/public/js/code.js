import '@pub/css/code.css'
import codeModel from './code-model'

export default {

  /**
   * parse 解析代码模板
   * @param {Element} element 需要解析的el元素
   */
  parse (element) {
    if (!(element instanceof HTMLElement)) throw Error('element is not HTMLElement!')

    let codeList = element.getElementsByTagName('code')
    let codeLen = codeList.length

    // 代码高亮函数
    while (codeLen) {
      let parseCode = new Code(codeList[codeLen - 1])
      parseCode.display()
      codeLen--
    }
  }
}

class Code {
  innerText = ''

  constructor (element) {
    this.$el = element
    this.innerText = element.innerText
    this.identify()
  }

  /**
   * 代码语言判断
   */
  identify () {
    // 开头判断如: "// javascript code-model"
    let content = this.innerText
    let isModel = /^(\/\/ (?:javascript|css|html) code-model\n)/ig
    let search = isModel.exec(content)
    if (isModel) {
      this.innerText = content.replace(isModel, '')
      let model = /(javascript|css|html)+/i
      if (search) {
        search[0].replace(model, keyword => {
          // 设置类名为 model-语言
          this.$el.className = 'model-' + keyword
          this.model = keyword

          let html = this.form()
          // 如果为 HTML 模式
          if (keyword === 'html') {
            // 内嵌 js 处理
            html = html.replace(/&lt;script>[\s\S]*?&lt;\/script>/ig, key => {
              const results = this.form(key.substring(18, key.length - 38), 'javascript')
              return `&lt;script>${results}\n<span class="html-label">&lt;/script></span>`
            })
            // 内嵌 css 处理
            html = html.replace(/&lt;style>[\s\S]*?&lt;\/style>/ig, key => {
              const results = this.form(key.substring(17, key.length - 36), 'css')
              return `&lt;style>${results}<span class="html-label">&lt;/style></span>`
            })
          }
          this.line(html)
        })
      }
    }
  }

  /**
   * 替换语法高亮
   */
  form (content, mod) {
    const model = mod || this.model
    let regexp = codeModel[model]
    let html = content || this.innerText
    // 排除标签
    if (!content) {
      html = this.innerText = html.replace(/&/gm, '&amp;').replace(/</gm, '&lt;')
    }

    // 计算条件
    for (let exp in regexp) {
      html = html.replace(regexp[exp], word => {
        if (/<[^>]*>|<\/[^>]*>/ig.test(word) ||
             exp === 'annotation' ||
             word.indexOf('annotation') === -1 ||
             model !== 'html') {
          return `<span class="${model}-${exp}">${word}</span>`
        }
        return word
      })
    }

    // 函数头部param注释
    if (model === 'javascript') {
      html = html.replace(/@param {\w+} \w+ \S+/g, word => {
        return `<span class="${model}-param">${word}</span>`
      })
    }
    return html
  }

  /**
   * 行数设置
   */
  line (html) {
    let htmls = '<ul class="line-ul">'
    let arr = html.split('\n')
    let annotation = 0
    for (let i = 0, l = arr.length; i < l; i++) {
      // 多行注释
      if (arr[i].indexOf('/*') > -1 || annotation) {
        // 是否为结束行
        annotation = arr[i].indexOf('*/') > -1 ? !1 : !0
        arr[i] = `<span class="${this.model}-annotation">${arr[i]}</span>`
      }
      htmls += `<li><span class="line">${i + 1}</span>${arr[i]}</li>\n`
    }
    htmls += '</ul>'
    this.parseHTML = htmls
  }

  /**
   * 渲染输出
   */
  display (prase = true) {
    this.$el.innerHTML = prase ? this.parseHTML : this.innerText
  }
}
