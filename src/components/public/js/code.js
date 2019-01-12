import '@pub/css/code.css'

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
  regexp = {
    // 关键词
    'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/ig,
    // 字符串
    'string': /('[\s\S]*?')|(`[\s\S]*?`)|((?!class=)`[\s\S]*?`)/g,
    // 注释
    'annotation': /(\/\/[\s\S]*?\n)|(\/\*\*)[\n\s\S]*?\*\//ig,
    // 值
    'value': /(\s+\d+(?!:'))|(\${\w+})/g,
    // 'variable': /(\()\S+[\)]/,
    // 符号
    'operator': /((?!\*|&lt)[+\-%](?!>|=|\S+>|\(|\*))|(>=|>=|\/=|\*=|-=|\+=|\+\+|--)/g,
    // 函数、调用
    'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/ig,
    // 返回值
    'return': /\b(:?return)\b/g,
    // 键
    'key': /(this|\w+(?=\.))/g,
    // 对象键
    'key-obj': /(\w+(?=:))/g,
    // 方法
    'methods': /(\.\S+\(\))/g,
    // 标签组
    'html': /&lt[^>]*>|&lt\/[^>]*>/ig
    // 净化污染 白色
    // 'white': /[\(\),\.\:]/g
  }

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
    let isModel = /^(\/\/ (?:javascript|css|html) code-model)/img
    let search = isModel.exec(this.innerText)
    if (isModel) {
      let model = /(javascript|css|html)+/i
      search[0].replace(model, keyword => {
        // 设置类名为 model-语言
        this.$el.className = 'model-' + keyword
        this.model = keyword
      })
    }
    this.replace()
  }

  /**
   * 替换语法高亮
   */
  replace () {
    let regexp = this.regexp
    let html = this.innerText
    // 排除标签
    html = this.innerText = html.replace(/&/gm, '&amp;').replace(/</gm, '&lt;')

    for (let exp in regexp) {
      html = html.replace(regexp[exp], word => {
        return /<[^>]*>|<\/[^>]*>/ig.test(word) ? word : `<span class="${this.model}-${exp}">${word}</span>`
      })
    }
    html = html.replace(/@param {\w+} \w+ \S+/g, word => {
      return `<span class="${this.model}-param">${word}</span>`
    })
    this.line(html)
  }

  /**
   * 行数设置
   */
  line (html) {
    let htmls = '<ul class="line-ul">'
    let arr = html.split('\n')
    let annotation = 0
    for (let i = 1, l = arr.length; i < l; i++) {
      // 多行注释
      if (arr[i].indexOf('/*') > -1 || annotation) {
        // 是否为结束行
        annotation = arr[i].indexOf('*/') > -1 ? !1 : !0
        arr[i] = `<span class="${this.model}-annotation">${arr[i]}</span>`
      }
      htmls += `<li><span class="line">${i}</span>${arr[i]}</li>\n`
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
