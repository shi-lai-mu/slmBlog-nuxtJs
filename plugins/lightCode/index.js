/**
 * -----------------------------------------------------------
 *
 *   本组件包含正则 由 史莱姆 原创编写，未参考任何组件源代码!
 *   开原地址：https://github.com/shi-lai-mu/vue-light-plugin
 *
 * -----------------------------------------------------------
 */
import './code.css'
import Code from './code_parse'

const __VARSION__ = '1.4.1'
const __AUTHOR__ = '史莱姆'

export default {

  /**
   * parse 解析代码模板
   * @param {Element} element 需要解析的el元素
   */
  parse (element) {
    if (!(element instanceof HTMLElement)) throw Error('element is not HTMLElement!')

    let codeList = element.getElementsByTagName('code')
    let codeLen = codeList.length
    const that = this

    // 解析代码函数
    while (codeLen) {
      let parseCode = new Code(codeList[codeLen - 1], that)
      parseCode.display(!!parseCode.parseHTML)
      codeLen--
    }
  },

  /**
   * 组件版本
   */
  getVersion () {
    return __VARSION__
  },

  /**
   * 获取作者
   */
  getAuthor () {
    return __AUTHOR__
  }
}
