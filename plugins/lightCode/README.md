<div align=center><img width="100 "src="https://images.gitee.com/uploads/images/2019/0130/203624_c343fd46_1774840.png" alt="SLM-BLOG LOGO"/></div>

## [SLM BLOG](http://mczyzy.cn)

> - 插件名：light[代码语法高亮组件]
> -  插件版本： v 1.0.1
> - 最后更新：2019-2-23
> - 适用于VUE的一款，轻量级代码语法高亮插件，可扩展性强
> - 已完成 CSS、HTML、JavaScript 识别渲染
----------

### 安装/使用:
#### 引入
`import Code from 'js/code'`
#### 渲染时调用parse方法
`Code.parse(this.$refs.content)`
传入为 元素，传入后会自动解析 下方包含 `<code>` 内部的代码
### 解析条件: 
Code 开头第一行加上 `// javascript code-model`
`javascript` 可更换为 `css` `html` 分别代表三种解析模式

### 混合模式：
在HTML解析模式下，内嵌js、内嵌css、行内css 也会被解析，他们之前不会互相污染
![](http://res.mczyzy.cn/img/git-img/wxxcxqd/light-code.png)
![](http://res.mczyzy.cn/img/git-img/wxxcxqd/light-code2.png)

### 扩展/自定义:
 + 插件本身是按高拓展和修改编写，所以拓展性还是比较强的，方法如下；
 + 代码解析模型可修改 `code-model.js` 以正则的方式；
 + 语言高亮颜色可修改 `code.css` 选择器格式为 `模式名称-匹配的正则名` 如js的函数 `javascript-function` 或css的关键字 `css-keyword` ；