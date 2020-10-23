const path = require('path');
const fs = require('fs');
const { generateTheme } = require('antd-theme-generator');

// 输出路径
const outputFilePath = path.join(__dirname, '../static/style/antd.less');
const antdFnFilePath = path.join(__dirname, '../static/style/antd-fn.less');
const outMinFilePath = path.join(__dirname, '../static/style/antd-min.less');
// 导出类名

const options = {
  antDir: path.join(__dirname, '../node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, '../assets/less/styles'),
  // varFile: path.join(__dirname, '../assets/less/styles/variables.less'),
  // mainLessFile: path.join(__dirname, '../assets/less/styles/index.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'
  ],
  indexFileName: 'index.html',
  outputFilePath,
}
generateTheme(options)
  .then(() => { 
    console.log('主题编译成功!');

    // 获取文件并压缩抽取处理
    let outFile = fs.readFileSync(outputFilePath).toString();
    let antdFnFile = fs.readFileSync(antdFnFilePath).toString();
    
    // 压缩
    const excludeClass = [
      'steps', // 步骤条
      // 'menu',  // 菜单/导航
      'descriptions', // 描述列表
      'dropdown', // 下拉菜单
      'calendar', // 日历
      'fullcalendar', // 填充日历
      'cascader', // 级联
      'card', // 卡片
      'badge', // 徽章
      'comment', // 评论
    ]
    const excludeReg = new RegExp(`\\.(\\w)+(-(${ excludeClass.join('|') })-)(\\S|\\s)+`, 'g')
    // outFile = outFile
    //   .replace(excludeReg, '')
    //   .replace(/\n/g, '')
    // ;
    // outFile += antdFnFile;
    outFile = outFile.split(/\n/g).map(item => {
      return item
        .replace(excludeReg, '')
        .replace(/\s+/g, ' ')
        .replace(/\s(>|\+)\s/g, '$1')
        .replace(/(:|,|})\s/g, '$1')
        .replace(/\s({)/g, '$1')
      ;
    }).join(' ')

    // 输出
    fs.writeFileSync(outMinFilePath, outFile);
  })
  .catch(error => {
    console.log('主题编译失败：', error);
  })
;
