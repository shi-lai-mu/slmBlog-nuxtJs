import '~/static/css/code.css'
const __VARSION__ = '1.3.8'
// import codeModel from './code-model'
const codeModel = {
  javascript: {
    // 关键词
    'keyword': /\b(as|async|await|break|undefined|NaN|false|true|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/ig,
    // 字符串
    'string': /('[\s\S]*?')|(`[\s\S]*?`)|((?!class=)`[\s\S]*?`)/g,
    // 注释
    'annotation': /(\/\/[\s\S]*?\n)|(\/\/[\s\S]*?.*[^\n])|(\/\*\*)[\n\s\S]*?\*\//ig,
    // 值
    'value': /\${\w+}|\b\d+|(\.\.\.)\w+|(\w)+(?=,|\)| (=|\*|\+|-|%)|\n|;| \|\||\W?})/g,
    // 符号
    'operator': /((?!\*|&lt)[+\-%](?!>|=|\S+>|\(|\*))|(>=|>=|\/=|\*=|-=|\+=|\+\+|--)/g,
    // 函数、调用
    'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/ig,
    // 返回值
    'return': /\b(:?return)\b/g,
    // 键
    'key': /(this|[$_]?\w+(?=\.))/g,
    // 对象键
    'key-obj': /\w+(?=:)/g,
    // 方法
    'methods': /(\.\S+\(\))/g,
    // 标签组
    'html': /&lt[^>]*>|&lt\/[^>]*>/ig
  },
  html: {
    // 标签
    'label': /(<|&lt;)[^>]*>|(<|&lt;)\/[^>]*>/ig,
    // 属性
    'key': /[\w-]+="[\w.\s]+"/g,
    // 注释
    'annotation': /&lt;!-- [\s\S]*? -->/g
  },
  css: {
    // 选择器
    'key': /[.*\w]+[\W]?(?={)/g,
    // 颜色
    'color': /(?:rgba|rgb|hsl)\([\s\S]*?\)/ig,
    // 引用
    'string': /(src|url)\([\s\S]*?\)/g,
    // 值
    'value': /(\w+\d+[\w]+(?!:'))|#\w+|[.]?\d+/g,
    // 属性
    'keyword': /[-\w]+(?=:)/g
  }
}

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
      parseCode.display(!!parseCode.parseHTML)
      codeLen--
    }
  }
}

class Code {
  // 源文本
  Text = ''
  // 解析后的文本
  innerText = ''
  // 重渲染模式
  unDisplay = false
  // 开始渲染时间
  startTime = 0

  constructor (element) {
    const that = this
    that.startTime = Date.now()
    that.$el = element
    that.innerText = that.Text = element.innerText
    that.identify()
  }

  /**
   * 代码语言判断
   */
  identify (unDisplay) {
    // 开头判断如: "// javascript code-model"
    const that = this

    // 二次渲染模式
    if (unDisplay) {
      that.innerText = that.codeEl.innerText
      // 恢复模式
      that.innerText = `// ${that.model} code-model\n${that.innerText}`
      that.unDisplay = true
    }
    let content = that.innerText
    let isModel = /^(\/\/ (?:javascript|css|html) code-model\n)/ig
    let search = isModel.exec(content)
    if (isModel) {
      that.innerText = content.replace(isModel, '')
      let model = /(javascript|css|html)+/i
      if (search) {
        search[0].replace(model, keyword => {
          // 设置类名为 model-语言
          that.$el.className = 'model-' + keyword
          that.model = keyword

          let html = that.form()
          // 如果为 HTML 模式
          if (keyword === 'html') {
            // 内嵌 js 处理
            html = html.replace(/&lt;script>[\s\S]*?&lt;\/script>/ig, key => {
              const results = that.form(key.substring(18, key.length - 38), 'javascript')
              return `&lt;script>${results}\n<span class="html-label">&lt;/script></span>`
            })
            // 内嵌 css 处理
              .replace(/&lt;style>[\s\S]*?&lt;\/style>/ig, key => {
                const results = that.form(key.substring(17, key.length - 36), 'css')
                return `&lt;style>${results}<span class="html-label">&lt;/style></span>`
              })
            // 行内 css 处理
              .replace(/style="[\s\S]*?"/ig, key => {
                const results = that.form(key.substring(7, key.length - 1), 'css')
                return `<span class="html-key">style="<span class="model-css">${results}</span>"</span>`
              })
          }
          that.line(html)
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
    let htmls = '<ul class="code-ul">'
    let line = '<ul class="line-ul">'
    let arr = html.split('\n')
    let annotation = 0
    let i = 0
    // <span class="line">${i + 1}</span>
    for (let l = arr.length; i < l; i++) {
      // 多行注释
      if (arr[i].indexOf('/*') > -1 || annotation) {
        // 是否为结束行
        annotation = arr[i].indexOf('*/') > -1 ? !1 : !0
        arr[i] = `<span class="${ this.model }-annotation">${ arr[i] }</span>`
      }
      htmls += `<li>${arr[i] || ' '}</li>`
      line += `<li>${i + 1}</li>`
    }
    htmls += '</ul>'
    line += '</ul>'

    const that = this
    that.parseHTML = line + htmls
    that.lineNumber = i
    !that.unDisplay && that.consolePanel(htmls)
  }

  /**
   * 控制按钮添加
   */
  consolePanel (html) {
    let consolePanel = document.createElement('div')
    const that = this
    consolePanel.className = 'code-console-box'
    consolePanel.innerHTML = `<span class="code-model">${ that.model } Code</span>`

    // 添加工具
    const toolBox = document.createElement('span')
    toolBox.className = 'tool-box'
    this.tools().forEach(item => {
      const tool = document.createElement(item.type)
      tool.className = item.className
      tool.title = item.title
      tool.onclick = item.fn
      tool.innerHTML = item.html || ''

      // 子工具
      item.child && item.child.forEach(childs => {
        const child = document.createElement(childs.type)
        child.className = childs.className
        child.onclick = childs.fn
        child.innerHTML = childs.html || ''
        tool.appendChild(child)
      })
      toolBox.appendChild(tool)
    })
    consolePanel.appendChild(toolBox)

    that.$el.parentNode.insertBefore(consolePanel, that.$el)
  }

  /**
   * 渲染 输出
   */
  display (prase = true) {
    const that = this
    that.$el.innerHTML = prase ? that.parseHTML : that.innerText

    // 存入后期调用
    const children = that.$el.children
    that.lineEl = children[0]
    that.codeEl = children[1]
  }

  /**
   * 事件添加
   */
  Events = {
    keydown: e => {
      // 回车
      this.identify(1)
    }
  }

  /**
   * 工具列表
   */
  tools () {
    const that = this
    // 工具状态
    let Model = '正常'
    let activeEl = false
    const active = 'active'

    return [
      {
        type: 'i',
        title: '编辑',
        className: 'iconfont icon-Code',
        fn: function() {
          const swit = this.classList.toggle(active)

          if (activeEl && Model !== '编辑') {
            activeEl.classList.remove(active)
            activeEl = this
          }
          !activeEl && (activeEl = this)
          Model = swit ? '编辑' : '正常'

          that.codeEl.setAttribute('contenteditable', swit)
          that.$el.onkeyup = swit ? that.Events.keydown : null
          !swit && that.display(that.parseHTML)
        }
      },
      {
        type: 'i',
        title: '词组编辑',
        className: 'iconfont icon-ciyuntupucopy',
        fn: function() {
          const span = that.codeEl.getElementsByTagName('span')
          const swit = this.classList.toggle(active)

          if (activeEl && Model !== '词组') {
            activeEl.classList.remove(active)
            activeEl = this
          }
          !activeEl && (activeEl = this)
          Model = swit ? '词组' : '正常'

          for (let i = 0, len = span.length; i < len; i++) {
            const item = span[i]
            item.setAttribute('contenteditable', swit)
          }
          that.$el.onkeyup = swit ? that.Events.keydown : null
          !swit && that.display(that.parseHTML)
        }
      },
      {
        type: 'div',
        title: '关于',
        className: 'info iconfont icon-guanyu',
        fn: null,
        child: [
          {
            type: 'div',
            className: 'info-child',
            fn: null,
            html:  `<h3>关于本语法高亮组件</h3>` +
            `<p>组件作者：史莱姆</p>` +
            `<p>组件版本：${ __VARSION__ }</p>` +
            `<p>初始行数：${ that.lineNumber }</p>` +
            `<p>渲染耗时：${ Date.now() - that.startTime }ms</p>` +
            `<p>开源地址：<a href="https://github.com/shi-lai-mu/vue-light-plugin">访问GITHUB</a></p>`
          }
        ]
      },
      {
        type: 'i',
        title: '收起',
        className: 'iconfont icon-up',
        fn: function() {
          const elClass = that.$el.className
          const className = ' close'
          if (elClass.indexOf(className) === -1) {
            that.$el.className += className
            this.style.transform = 'rotate(180deg)'
            this.title = '展开'
          } else {
            that.$el.className = elClass.replace(className, '')
            this.style.transform = ''
            this.title = '收起'
          }
        }
      },
      {
        type: 'i',
        title: '关闭',
        className: 'iconfont icon-guanbi-xianxing',
        fn: function() {
          const parent = that.$el.parentElement
          parent.parentElement.removeChild(parent)
        }
      }
    ]
  }
}
