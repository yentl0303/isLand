//webpack.prod.js
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
//清理dist文件夹的插件，用来在每次执行构建的时候清空上次构建的结果防止文件缓存
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//引入抽取css样式插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(base,{
  //定义环境为生产环境
	mode:'production',
	devtool:'source-map',//独立配置源码映射
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
				]
			},
			{
				test:/\.scss$/,
				use:[
					MiniCssExtractPlugin.loader,//抽取css样式文件
					{loader:'css-loader'},
					{loader:'postcss-loader'},
					{loader:'sass-loader'}
				]
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
		//配置样式抽取插件，生成的css文件名称为[name],[name]为entry中定义的key
		new MiniCssExtractPlugin({
			filename:'[name].css'
		})
	]
})