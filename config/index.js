// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
let chalk = require('chalk')
let config = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api.ashx": {
        // target: "http://192.168.3.211/",
        // target: "http://192.168.3.214:811/",
        target: "http://192.168.3.209/",
        pathRewrite: {
          "^/api.ashx": "/WebAPI/.api"
        }
      },

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  },
  museUiThemePath: `../src/muse-ui/styles/themes/variables/tengbo.less`
}
let showMessage = [];
if (process.env.NODE_ENV === "production") {
  config.build.assetsPublicPath = "https://static.tb5632.com:7443/"
  showMessage.push("编译环境：正式环境") 
} else if (process.env.NODE_ENV === "production_td") {
  config.build.assetsPublicPath = "http://tbh5.tengbo6888.com/"
  showMessage.push("编译环境：测试环境")
}else if (process.env.NODE_ENV === "production_localtd") {
  config.build.assetsPublicPath = "./"
  showMessage.push("编译环境：本地测试")
}
showMessage.push("静态资源路径：" + config.build.assetsPublicPath + config.build.assetsSubDirectory)
showMessage.forEach(item => {
  console.log(chalk.cyan(item))
})
console.log(config.build.assetsPublicPath)
module.exports = config