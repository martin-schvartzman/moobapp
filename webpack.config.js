const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry:'./reactAPP.js',
	output : {
		path : path.join(__dirname,'/public'),
		filename:'dist.js'
	},
	module : {
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:{
					loader:'babel-loader'				
				}	
			}		
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template : "./template.html"		
		}),	
	]
}