// const withTypescript = require('@zeit/next-typescript')
// // const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// /**
//  * next的配置文件，支持配置嵌套
//  */
// module.exports = withTypescript({
//   webpack(config, options) {
//     // 这里面还可以再配置哦 最后一个要return
//     // if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
//     return config
//   }
// })

const withSass = require('@zeit/next-sass')
module.exports = withSass({
})