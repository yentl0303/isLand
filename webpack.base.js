
const path = require('path')
//html处理插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry:{
		index:'./src/index.js',
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js',
		publicPath:''//publicPath是生成的dist中的html文件中自动引入js和css文件时在最前面拼的一部分字符串
	},
	resolve:{
		//配置免后缀的文件类型
		extensions:['.js','.jsx','.vue','.css','.less','.scss'],
		//为全路径配置缩写@
			alias:{
				'@':path.resolve(__dirname,'src')
			}
	  },
	module: {
		rules: [
			{ //在webpack.base.js中增加file-loader用来解析文件
				test:/\.(png|jpg|jpeg|gif)$/,
				  use:[
					{loader:'file-loader'}
				  ]
			  },
		 {
			test: /\.js$/, // 将后缀名为 js 的文件进行 es6 转 es5 的处理
			exclude: /node_modules/, // 处理的目录不包括 node_modules
			use: {
			  loader: 'babel-loader', // 使用 babel-loader 来处理
			  options: {
				presets: ['@babel/preset-env'] // 固定写法
			 }
		   }
		 }
	   ]
	   },
	plugins:[//html处理插件
		new HtmlWebpackPlugin({
			template:'./public/index.html',//html模版文件位置
			filename:'index.html',//生成的html文件名，生成的html文件路径会整合base中配置的path生成到目标位置
      chunks:['index']//生成的index.html中自动引入的组件，这里设置的是entry中定义的key
		})
	]
}