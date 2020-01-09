module.exports = (env, outputPath) =>
	({
		test: /\.(graphql)(\?.*)?$/,
		exclude: /(node_modules|bower_components)/,
		use: [
			require('./cache')(env, outputPath),
			{
				loader: 'raw-loader'
			}
		]
	});
