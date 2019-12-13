const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (uglifyOptions) => new UglifyJsPlugin({
	test: /\.js($|\?)/i,
	exclude: /node_modules/,
	cache: true,
	parallel: true,
	uglifyOptions,
	sourceMap: true
});
