
// 本地运行配置
const devServer = {
	port: 3000,
	hot: true,
	open: true,
	compress: false, // 开发环境不开启gzip压缩  加快打包速度
	historyApiFallback: true, // 解决刷新404问题
};


module.exports = {
    devServer
}
