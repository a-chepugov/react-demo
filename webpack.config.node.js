const config = require("config");
const path = require("path");

const {webpack: {source}} = config;

module.exports = function (env = {}, argv) {
	const { target } = env;
	const { mode } = argv;

	return ({
		entry: `./${source}/${target}.js`,
		output: {
			path: path.join(__dirname, "/dist"),
			filename: `./${target}.js`,
			libraryTarget: 'commonjs'
		},
		target,
		mode,
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: "babel-loader"
					}
				},
				{
					test: /\.css$/,
					use: [
						"node-style-loader",
						{
							loader: "css-loader",
							options: {
								modules: true
							}
						}
					]
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: ["file-loader"]
				}
			]
		}
	})
};