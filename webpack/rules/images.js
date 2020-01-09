module.exports = function (env = {}, argv) {
	return ({
		test: /\.(png|svg|jpg|gif)$/,
		use: ["file-loader"]
	})
};
