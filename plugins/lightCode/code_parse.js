import codeModel from './code_mode'

class Code {
  // 源文本
  Text = ''
  // 解析后的文本
  innerText = ''
  // 重渲染模式
  unDisplay = false
  // 开始渲染时间
  startTime = 0
  // 皮肤主题
  skin = ''

  /**
   * 构造函数
   * @param {HTMLElement} element 被渲染的元素 code 标签
   * @param {Object} parent 入口的this，用于调用版本信息等接口
   */
  constructor (element, parent) {
    const that = this
    that.parent = parent

    // 渲染开始时间
    that.startTime = Date.now()
    // 渲染元素
    that.$el = element
    // 渲染文本 初始文本
    that.innerText = that.Text = element.innerText
    // 解析 代码模型 可用的代码模式
    that.codeModelType = codeModel.parseModelType()

    // 渲染入口
    that.identify()
  }


  /**
   * 代码语言判断
   */
  identify (unDisplay) {
    const that = this

    // 二次渲染模式
    if (unDisplay) {
      that.innerText = that.codeEl.innerText
      // 恢复模式
      that.unDisplay = true
    }
    // 开头判断如: "// javascript code-model"
    const codeModelType = that.codeModelType

    let content = that.innerText,
        isModel = `^(\/\/ (?:${ codeModelType.exp }) code-model\n)`,
        search = new RegExp(isModel, 'ig').exec(content)

    // 如果识别出模式
    if (isModel) {
      that.innerText = content.replace(isModel, '')
      let model = /(javascript|css|html)+/i
      if (search) {
        search[0].replace(model, keyword => {
          // 设置类名为 model-语言
          that.$el.className = `model-${ keyword } ${ that.skin }`
          that.model = keyword

          // 普通渲染
          let html = that.form()

          // 如果为 HTML 模式 [混合模式渲染]
          //    混合模式思路：找到文本内作用域后分割渲染
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
   * 渲染语法
   */
  form (content, mod) {
    const model = mod || this.model,
          regexp = codeModel[model]

    let html = content || this.innerText

    // 排除标签
    if (!content) {
      html = this.innerText = html.replace(/&/gm, '&amp;').replace(/</gm, '&lt;')
    }

    // 计算条件
    for (let exp in regexp) {
      html = html.replace(regexp[exp], word => {

        if (
          /<[^>]*>|<\/[^>]*>/ig.test(word) ||
             exp === 'annotation' ||
             word.indexOf('annotation') === -1 ||
             model !== 'html'
        ) {
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
   * 行数渲染
   */
  line (html) {
    let htmls = '<ul class="code-ul">',
        line = '<ul class="line-ul">',
        arr = html.split('\n'),annotation = 0,
        i = 0

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

    // 如果非重绘模式 则 渲染控制台
    that.unDisplay ? that.display() : that.consolePanel()
  }


  /**
   * 控制按钮添加
   */
  consolePanel () {
    let consolePanel = document.createElement('div')
    const that = this
    consolePanel.className = `code-console-box ${ that.skin }`
    consolePanel.innerHTML = `<span class="code-model">史莱姆渲染器 - ${ that.model } Code</span>`

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
    // 渲染 控制台
    that.$el.parentNode.insertBefore(consolePanel, that.$el)
  }


  /**
   * 渲染 输出
   */
  display (prase = true) {
    const that = this
    that.$el.innerHTML = prase ? that.parseHTML : that.innerText

    // 存入 后期调用
    const children = that.$el.children
    that.lineEl = children[0]
    that.codeEl = children[1]
  }


  /**
   * 事件添加
   */
  Events = {
    keydown: e => {
      // 回车 重绘渲染 模式
      this.identify(1)
    }
  }


  /**
   * 工具列表
   */
  tools () {
    const that = this,
          active = 'active'

    // 私有 工具 状态
    let Model = '正常',
        activeEl = false

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
          !swit && that.identify(1)
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
          !swit && that.identify(1)
        }
      },
      {
        type: 'i',
        title: '切换皮肤',
        className: 'iconfont icon-wodezhuti',
        fn: function() {
          that.codeEl.getElementsByTagName('span')
          this.classList.toggle(active)

          that.skin = !that.skin ? 'while' : ''
          this.parentElement.parentElement.className = 'code-console-box ' + that.skin
          that.identify(1)
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
                   `<p>组件作者：${ that.parent.getAuthor() }</p>` +
                   `<p>组件版本：${ that.parent.getVersion() }</p>` +
                   `<p>初始行数：${ that.lineNumber }</p>` +
                   `<p>渲染模式：${ that.model }</p>` +
                   `<p>渲染字数：${ that.Text.length }</p>` +
                   `<p>渲染耗时：${ Date.now() - that.startTime }ms</p>` +
                   `<br><p>开源地址：<a href="https://github.com/shi-lai-mu/vue-light-plugin">访问GITHUB</a></p>`
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

export default Code