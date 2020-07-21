const port = 7070

const title = 'vue项目最佳实践'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/best-practice', // 部署应用包时的基本URL
  devServer: {
    port:port,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://172.31.20.109:3000/`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },

  configureWebpack: {
    name: title
  },

  chainWebpack(config) {
    // 配置svg规则排除icons目录中svg文件处理
    // 目标给svg规则增加一个排除选项exclude: {'path/to/icon'}
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
    
    // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('./src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name]'})
  }
}