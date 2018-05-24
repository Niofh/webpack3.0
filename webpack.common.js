/**
 * Created by puban on 2017/6/15.
 */
/**
 * Created by puban on 2017/6/15.
 */

// 参考网站 https://segmentfault.com/a/1190000009454172#articleHeader7

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');



var HappyPack = require('happypack');
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});


var devWebpack = require("./webpack-entries-dev");

var entries = devWebpack.entries;
var pages = devWebpack.pages;

// 生产环境打开它
// var entries = getEntry('./src/page/**/index.js', './src/page/');
// var pages = Object.keys(getEntry('./src/**/index.html', './src/page/'));

console.log(entries)
console.log(pages)


function resolve(url) {
    return path.resolve(__dirname, url);
}

var config = {
    entry: entries,
    output: {
        path: resolve('dist'), // dist目录
        filename: 'js/[name].[hash].js', // 文件名称
        chunkFilename: ".js/[id].[chunkhash].js"  // 按需加载的文件生成
    },
    externals: {
        jquery: 'window.$',  // 把jquery排除,之后引入jquery cdn减压服务器 https://www.zhihu.com/question/20227463
        mui: "mui"
    },
    resolve: {
        // 使用的扩展名
        extensions: ['.js', '.json', '.css', '.ejs', '.art'],
        // 模块别名列表
        alias: {
            '@': path.join(__dirname, '/src'),
            "config":path.join(__dirname, '/config'),
            "static": path.join(__dirname, '/static')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "src/no-babel"),
                ],
                loader: 'happypack/loader?id=happybabel',
            },


            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:
                    [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'images/[name].[hash:7].[ext]'
                            }
                        }
                    ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use:
                    [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'fonts/[name].[hash:7].[ext]'
                            }
                        }
                    ]
            }
        ]
    },

    plugins: [
        // 多线程打包
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: true
        }),


        // 全局引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery"
        }),


    ]
};


pages.forEach(function (pathname) {
    var conf = {
        filename: resolve(`dist/html/${pathname}.html`), //生成的html存放路径，相对于path
        template: resolve(`src/page/${pathname}.html`), //html模板路径
        inject: 'body',	//js插入的位置，true/'head'/'body'/false
        /*
         * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
         * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
         * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
         * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        title: '',
        //minify:false
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    if (pathname in config.entry) {
        conf.favicon = './src/images/favicon.ico';
        conf.inject = 'body';
        conf.chunks = ['jquery', 'manifest', 'vendor', pathname];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        // if (extname === '.js') {
        //   pathname = dirname
        // } else {
        //   pathname = dirname + '/' + basename;
        // }

        // 修改
        pathname = dirname + '/' + basename;
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = entry;
    }
    return entries;
}


module.exports = config;