const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const { CleanWebpackPlugin } =require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //CSS 提取到单独的文件中
// const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports={
    mode:'development',
    devtool: 'source-map',
    context: path.resolve(__dirname,'..'),
    entry:path.resolve(__dirname,'../src'), // 入口文件,
    
    // context: __dirname,
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'../dist'),
        publicPath: '/',
        chunkFilename: 'chunk.[name].js', // 附加 Chunk 的文件名称
    },
    devServer:{
        host: 'localhost',
        port: '3000',
        historyApiFallback: true, //是否开发 HTML5 History API 网页 
        hot: true,
        inline: true,
        profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳
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
                use:['style-loader','css-loader']
                // use: ExtractTextPlugin.extract({
                //     // 转换 .css 文件需要使用的 Loader
                //     use: ['style-loader','css-loader'],
                // })
            },
            {
                test:/\.less$/i,
                use:['style-loader','css-loader','less-loader']
                // use:['style-loader','css-loader',{
                //     loader: 'less-loader',
                //     options:{
                //         javascriptEnabled: true
                //     }
                // }]
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
            },
            {
                test:/\.svg$/,
                use:[{
                    loader:'@svgr/webpack',
                    options:{
                        native: false
                    }
                }]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'平安不动产',
            favicon: './public/img/logo.jpg',
            template:path.resolve(__dirname,'../index.html'),//查找模板文件
        }),
        new CleanWebpackPlugin(),   //清空dist目录下的文件
        // new ExtractTextPlugin({
        //     filename: `[name]_[contenthash:8].css`,  // 从 .js 文件中提取出来的 .css 文件的名称
        // }),
    ],
    resolve: {
        extensions:['.js','.jsx','.json'],	//表示在import 文件时文件后缀名可以不写
        // 设置别名
        alias: {
            '@':  path.join(__dirname, '../src'),// 这样配置后 @ 可以指向 src 目录\
            '@c':  path.join(__dirname, '../config')
        }
    }
}

