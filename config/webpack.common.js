//引入path模块，专门用于解决路径问题
const path = require('path');

// 引入插件html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //入口（从哪里进入开始解析）
  entry: './src/js/index.js',

  //出口（最终加工完的代码输出到哪里）
  output: { // 输出配置
    path: path.resolve(__dirname, '../bulid'), //输出文件路径配置
    filename: './js/[name].[hash:10].js', // 输出文件名
  },
  //所有的loader都要配置在这里,所有的loader在使用的时候都不用引入
  module: {
    //loader "干活"顺序，以及处理哪些文件，都需要在rules指明
    rules: [
      //如下规则是：
     
      //使用file-loader处理图片资源
      /*{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader', //如果不做图片转base64，可以用file-loader
            options: {
              outputPath:'img', //图片最终输出的位置,以输出文件为基准（build）
              publicPath:'../build/img',//css资源图片路径,以src文件夹为基准
            name:'[hash:5].[ext]'//修改图片名称
            }
          }
        ]
      },*/
      //使用url-loader处理图片资源
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader', //如果不做图片转base64,可以用file-loading
          options: {
            limit: 8192, //图片大小的敏感点，大于8kb不转换，小于8kb转成base64
            outputPath: 'img', //图片最终输出的位置
            publicPath: '../img', //修改图片名称
            name: '[hash:5].[ext]'
          }
        }]
      },
      //js语法检查
      {
        test: /\.js$/, // 涵盖 .js 文件
        enforce: "pre", // 预先加载好 jshint loader
        exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
        use: [{
          loader: "jshint-loader",
          options: {
            //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
            //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
            emitErrors: false,

            //jshint 默认情况下不会打断webpack编译
            //如果你想在 jshint 出现错误时，立刻停止编译
            //请设置 failOnHint 参数为true
            failOnHint: false,
            esversion: 6
          }
        }]
      },
      //babel-loader es6转es5
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
     
    ]
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      title:"webpack",
      filename:"index.html",
      template:"./src/index.html"
     })
  ],
  
}