module.exports = function (env = {}, argv) {
	return ({
		test: /\.css$/,
		use: [
			// "node-style-loader",
			"isomorphic-style-loader",
			{
				loader: "css-loader",
				options: {
					modules: true
				}
			}
		]
	})
};
