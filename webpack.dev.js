/**
 * Created by OUFUHUA on 2017/6/15.
 */
const webpack = require('webpack')
const Merge = require('webpack-merge');  // 把通用配置和环境特定配置合并在一起。
const CommonConfig = require('./webpack.common.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var config = require('./config/index')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');



module.exports = function (env) {
  return Merge(CommonConfig, {
    output: {
      publicPath: config.dev.routerBaseUrl,    //  也是devServer服务器的相对路径
    },
    devtool: "cheap-eval-source-map",  // 开发环境使用  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    devServer: {
      proxy: {},  //代理api
      contentBase: './dist',  // 静态文件路径
      host: '0.0.0.0',     // 域名
      port: 8081,           // 端口
      inline: true,
      hot: true,
      quiet: true,
      historyApiFallback: true
    },
    plugins: [
      // new DashboardPlugin(dashboard.setData),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),

      new BrowserSyncPlugin(
          // BrowserSync options
          {
            // browse to http://localhost:3000/ during development
            host: 'localhost',
            port: 3000,
            // proxy the Webpack Dev Server endpoint
            // (which should be serving on http://localhost:3100/)
            // through BrowserSync
            proxy: 'http://localhost:8081/'
          },
          // plugin options

      ),

      // webpack-dev-server 强化插件
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // 错误提示
      new FriendlyErrorsPlugin()
    ]
  })
}