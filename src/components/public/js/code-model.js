export default {
  javascript: {
    // 关键词
    'keyword': /\b(?:as|async|await|break|undefined|NaN|false|true|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/ig,
    // 字符串
    'string': /('[\s\S]*?')|(`[\s\S]*?`)|((?!class=)`[\s\S]*?`)/g,
    // 注释
    'annotation': /(\/\/[\s\S]*?\n)|(\/\/[\s\S]*?.*[^\n])|(\/\*\*)[\n\s\S]*?\*\//ig,
    // 值
    'value': /(\s+\d+(?!:'))|(\${\w+})|(\d+)/g,
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
  },
  html: {
    // 值和属性
    // 'key': /[a-z]+="/ig,
    // 标签
    'label': /(<|&lt;)[^>]*>|(<|&lt;)\/[^>]*>/ig
  }
}
