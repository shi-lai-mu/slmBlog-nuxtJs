/**
 * YApi MockJs翻译脚本
 * @author shi-lai-mu
 * @description 把上级目录下的所有文件翻译为YApi可用的响应数据
 */
import * as globby from 'globby';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

// 编译路径
const _COMPILE_PATH_ = 'mock';

// 编译完成输出路径
const _OUT_DIST_PATH_ = path.join(_COMPILE_PATH_, 'YAPI', 'dist');

// 编译版本
const _VERSION_ = '1.2.1';


/**
 * 翻译mock为YApi
 */
export default new class YApiTranslateMock {
  /**
   * 编译路径
   */
  _compilePath: string = _COMPILE_PATH_;

  /**
   * 编译输出路径
   */
  _outDistPath: string = _OUT_DIST_PATH_;

  /**
   * 被编译文件数组
   */
  compileFiles: string[] = [];


  constructor() {
    console.log(`> json5 编译处理中...`);
    this.compileFiles = globby.sync(['**/*.(ts)', '!YAPI', '!build.ts', '!index.ts'], { cwd: path.resolve(this._compilePath), dot: true });

    this.deleteDir(path.resolve(_OUT_DIST_PATH_));

    this.each((content, filePath) => {
      this.writeFile(filePath.replace('.ts', '') + '.json5', this.contentHandle(content, filePath));
      return true;
    });
    fs.unlinkSync(path.resolve(_COMPILE_PATH_, 'YAPI', 'index.js'));
    console.log(`> json5 编译成功! 共计「${this.compileFiles.length}」个文件被编译到 ${_OUT_DIST_PATH_}`);
    
  }


  /**
   * 内容处理
   * @param content  内容
   * @param filePath 文件路径
   */
  contentHandle(content: string, filePath: string) {
    // 空格标签
    const _SPACE_TAG_ = '_SPACE_';

    content = content
      .replace(/\/\*\*[\r\n]\s+\*\s([a-zA-Z0-9\s,.()\[\]'"@:\u4e00-\u9fa5]+)[\r\n]\s+\*\/[\r\n]\s+(\w+)\:\s\{/g, `"$2": { ${_SPACE_TAG_} // $1`)
      .replace(/[\s+|\s?]\/\*\*[\r\n]\s+\*\s([a-zA-Z0-9\s,.()\[\_\]'"@:\u4e00-\u9fa5]+)[\r\n]\s+\*\/[\r\n]\s+([a-zA-Z0-9\s,.()\[\_\]'"\u4e00-\u9fa5]+)\:\s([a-zA-Z0-9\s,.()\*\[\_\]=>'"@\u4e00-\u9fa5]+),/g, ` "$2": "$3", ${_SPACE_TAG_} // $1`)
      .replace(/Random\.(\w+)\(([a-zA-Z0-9\s,.()*\[\]'"@:\u4e00-\u9fa5]+|)\)/g, '@$1')
    ;

    // 后置注释对齐
    let maxLength = 0;
    const spaceArray: string[] = [];
    const notsReg = /\/\/[a-zA-Z0-9\s,.()\[\]'"@:\u4e00-\u9fa5]+/
    content.split(/\n/g).forEach(v => {
      if (v.indexOf(_SPACE_TAG_) !== -1) {
        spaceArray.push(v);
        if (maxLength < v.replace(notsReg, '').length) maxLength = v.length;
      }
      if (v.indexOf('import') !== -1) {
        content = content.replace(v + '\n', '');
      }
    });
    spaceArray.forEach(v => {
      const middle = maxLength - v.replace(notsReg, '').length;
      const space = Array(middle).fill(' ').join('');
      content = content.replace(v, v.replace(_SPACE_TAG_, space));
    });

    // 顶部注释
    content = content
      .replace(
        /\/\*\*[\r\n]\s+\*\s([a-zA-Z0-9\s,.()\[\]'"@:\u4e00-\u9fa5]+)[\r\n]\s+\*\/[\r\n](\s)?export const (\w+) \= /g,
`/**
  * $1
  * @file      ${filePath}
  * @const     $3
  * @version   ${_VERSION_}
  * @buildTime ${this.getTime()}
  **/
`
      )
      .replace(/};/g, '}')
    return content;
  }


  /**
   * 写出文件
   * @param filePath 路径
   * @param data     数据
   */
  writeFile(filePath: string, data: string) {
    const writePath = path.resolve(_OUT_DIST_PATH_, filePath);
    mkdirp.sync(path.dirname(writePath));
    fs.writeFileSync(writePath, data);
  }


  /**
   * 遍历每个需要编译的文件
   * @param callBack 回调
   */
  each(callBack: (fileContent: string, filePath: string) => boolean) {
    const { compileFiles, _compilePath } = this;
    
    for (const filePath of compileFiles) {
      const readPath = path.resolve(path.join(_compilePath, filePath));
      if (!callBack(fs.readFileSync(readPath).toString(), filePath)) {
        break;
      }
    }
  }



  /**
   * 删除目录
   * 
   * @param targetDir 目标目录
   * @param delRoot   是否删除根
   * @param option    命令选项
   */
  deleteDir(targetDir: string, delRoot: boolean = true) {
    if (!fs.existsSync(targetDir)) return;

    // 删除目录
    delDir(targetDir);
    if (delRoot) fs.rmdirSync(targetDir);

    // 递归删除空目录
    function delDir(url) {
      fs.readdirSync(url).forEach((dir) => {
        const newUrl = path.join(url, dir);
        if(fs.existsSync(newUrl)) {
          const file = fs.statSync(newUrl);
          if (file.isDirectory()) {
            fs.readdirSync(newUrl).length ? delDir(newUrl) : fs.rmdirSync(newUrl);
          } else {
            fs.unlinkSync(newUrl);
          }
          delDir(url);
        }
      });
    }
  }


  /**
   * 输出日期
   */
  getTime() {
    const date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
}
