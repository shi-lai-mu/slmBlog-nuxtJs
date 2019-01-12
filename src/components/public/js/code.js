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
      let code = new Code(codeList[codeLen - 1])
      console.log(code)
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
    'annotation': /(\/\/[\s\S]*?\n)|(\/\*\*)[\n\s\S]*?\*\/|([\S\s]*?(\*)[\S\s\w]*?)/ig,
    // 值
    'value': /(\s+\d+(?!:'))/g,
    // 'variable': /(\()\S+[\)]/,
    // 符号
    'operator': /((?!\*|&lt)[+\-%](?!>|=|\S+>|\(|\*))|(>=|>=|\/=|\*=|-=|\+=|\+\+|--)/g,
    // 函数、调用
    'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/ig,
    // 返回值
    'return': /\b(:?return)\b/g,
    // 键
    'key': /(this|\w+\.)/g,
    // 对象键
    'key-obj': /((\w+:))/g,
    // 方法
    'methods': /(\.\S+\(\))/g,
    // 标签组
    'html': /&lt[^>]*>|&lt\/[^>]*>/ig
    // 净化污染 白色
    // 'white': /[\(\),\.\:]/g,
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
    html = html.replace(/&/gm, '&amp;').replace(/</gm, '&lt;')

    for (let exp in regexp) {
      html = html.replace(regexp[exp], word => {
        return /<[^>]*>|<\/[^>]*>/ig.test(word) ? word : `<span class="${exp}">${word}</span>`
      })
    }
    html = html.replace(/@param {\w+} \w+ \S+/g, word => {
      return `<span class="param">${word}</span>`
    })
    html = this.line(html)
    this.display(html)
  }

  line (html) {
    let htmls = '<ul class="line-ul">'
    let arr = html.split('\n')
    console.log(arr)
    for (let i = 1, l = arr.length; i < l; i++) {
      htmls += `<li><span class="line">${i}</span>${arr[i]}</li>\n`
    }
    htmls += '</ul>'

    return htmls
  }

  /**
   * 渲染输出
   */
  display (html) {
    this.$el.innerHTML = html
  }
}
