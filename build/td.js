require('./check-versions')()
var vConsolePlugin = require('vconsole-webpack-plugin')

process.env.NODE_ENV = 'production_td'
// console.log(process)
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var spinner = ora('building for test production...')
var onComplete = require("./onComplete")
webpackConfig.plugins.push(new vConsolePlugin({
  enable: false 
}))
spinner.start()
config.build.env.NODE_ENV = '"production_td"';
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Complete time: ' +new Date().toLocaleString() +' .\n'
    ))
    onComplete();
    // console.log(stats.toJson().assetsByChunkName)
  })
})
