const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpackbar = require("webpackbar");
const path = require("path");

const { appHtml } = require("./utils/path");
const { devServer } = require("./utils/defineSystemInfo");



module.exports = {
	entry: "./src/index",
	mode: "development",
	cache: false,
    stats: "errors-only",
	output: {
		path: path.resolve(__dirname, "dist"),
	},
	
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env", "@babel/preset-react"],
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
			},
		],
	},
	plugins: [
        new webpackbar({
            color: "blue",  // 默认green，进度条颜色支持HEX
            basic: false,   // 默认true，启用一个简单的日志报告器
            profile:false,  // 默认false，启用探查器。
        }),
		new HtmlWebpackPlugin({
			template: appHtml,
			minify: {
				// 压缩HTML文件
				removeComments: true, // 移除HTML中的注释
				collapseWhitespace: true, // 删除空白符与换行符
				minifyCSS: true, // 压缩内联css
			},
			injected: true,
		}),

		new UglifyJsPlugin({
			uglifyOptions: {
				warnings: false,
				sourceMap: true, //是否启用文件缓存
				parallel: true, //使用多进程并行运行来提高构建速度
			},
		}),
        // 清除dist目录
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[name].css",
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                notes: ['老登你好，项目正运行在http://localhost:' + devServer.port]
            },
            clearConsole: true,
        })
	],
	resolve: {
		extensions: [".js", ".jsx"],
		alias:{
			'@':path.resolve('src')
		},
	},
    devServer
};
