//webpack.dev.js
//引入webpack-merge用来合并配置到webpack.base.js中
const { merge } = require('webpack-merge');
//引入webpack.base.js
const base = require('./webpack.base.js')
const path = require('path')

//merge用法用来将配置内容合并到webpack.base.js中
//第一个参数是原始的webpack的配置json对象
//第二个参数是我们要合并的单独的配置对象
//他们最终会形成一个整体的大json
module.exports = merge(base,{
  //定义环境为开发环境
  mode:'development',
  devtool:'inline-source-map',//内联配置源码映射
  //配置本地服务
	devServer:{
    //配置本地的静态资源文件夹，用来让这两个文件夹内部的文件可以通过访问http地址直接展示
		static:[
			path.resolve(__dirname,'dist'),//这里是构建目标路径
			path.resolve(__dirname,'public')//这里是public部分的内容
		],
		host:'localhost',//本地服务启动后的ip地址
		port:8082,//本地服务启动的端口号
    open:true,//启动时自动打开默认浏览器
	},
	module:{
		rules:[
			{ //用来编译css代码
				test:/\.css$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'},
					{loader:'postcss-loader'},
				]
			},
			{ //用来编译sass代码
				test:/\.scss$/,
				use:[
					{loader:'style-loader'},
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			}
		]
	}
})