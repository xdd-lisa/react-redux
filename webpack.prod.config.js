const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const { CleanWebpackPlugin } =require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');  //压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩js

module.exports={
    mode:'production',
    devtool: 'none',
    context: path.resolve(__dirname,'..'),
    entry: './src', // 入口文件,
    output:{
        path:path.resolve(__dirname,'../dist'),
        publicPath: './',
        filename:'[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js', // 附加 Chunk 的文件名称
    },
    
    module:{
        rules:[
            {
                test:/\.js|.jsx$/,
                use:{
                    loader:'babel-loader?cacheDirectory',// 缓存每次的解析结果 加载更快
                    options:{
                        presets:[
                            '@babel/preset-env','@babel/preset-react'
                        ],
                        plugins: ["react-hot-loader/babel"]
                    }
                }
            },
            {
                test:/\.css$/i,
                // use:['style-loader','css-loader']
                // 提取出 Chunk 中的 CSS 代码到单独的文件中
                use: ExtractTextPlugin.extract({
                    // 转换 .css 文件需要使用的 Loader
                    use: ['style-loader','css-loader?minimize'],// 压缩 CSS 代码
                })
            },
            {
                test:/\.less$/i,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        publicPath:'./',
                        limit:4*1024,
                    }
                }
            },
            // 字体加载器
            {
                test:/\.(woff|eot|ttf|otf)(\?.*)?$/,
                exclude: /node_modules/,
                loader:'file-loader',
                options:{
                    name:'fonts/[name].[ext]',
                    limit:10000,
                } 
            }
        ]
    },
    resolve: {
        extensions:['.js','.jsx','.json'],	//表示在import 文件时文件后缀名可以不写
        // 设置别名
        alias: {
            '@':  path.join(__dirname, '../src'),// 这样配置后 @ 可以指向 src 目录
            '@c':  path.join(__dirname, '../config')
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'平安不动产',
            favicon: './public/img/logo.jpg',
            template:path.resolve(__dirname,'../index.html'),//查找模板文件
        }),
        //清空dist目录下的文件
        new CleanWebpackPlugin(),   
        // 给输出的 CSS 文件名称加上 hash 值
        new ExtractTextPlugin({
            filename: `[name]_[contenthash:8].css`,  
        }),
        // 压缩输出的 JS 代码
        new UglifyJsPlugin({
            uglifyOptions:{
                output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false
                },
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true
                }
            }
        })
    ]
}

