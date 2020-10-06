const path = require('path');
const { generateTheme } = require('antd-theme-generator');

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
  outputFilePath: path.join(__dirname, '../static/style/antd.less'),
}
generateTheme(options)
  .then(() => { 
    console.log('主题编译成功!');
  })
  .catch(error => {
    console.log('主题编译失败：', error);
  })
;