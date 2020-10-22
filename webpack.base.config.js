const path=require('path');
const Webpack = require('webpack');
const vendors=['react','react-dom'];

module.exports={
    entry:{
        vendor:vendors
    },
    output:{
        path:path.resolve(__dirname,'../dist/js'),
        filename:'[name].dll.js',
        library:'[name]_library'
    },
    plugins:[
        new Webpack.DllPlugin({
            path:path.join(__dirname,'../dist','[name]-mainfest.json'),
            name:'[name]_library',
            context:__dirname,
        })
    ]
}

