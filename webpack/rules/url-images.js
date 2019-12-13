module.exports = (env, outputPath) =>
	({
		test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		exclude: /(node_modules|bower_components)/,
		use: [
			require('./cache')(env, outputPath),
			{
				loader: 'url-loader',
				options: {
					limit: 4096,
					name: '[hash:8]/images/[name].[ext]',
					fallback: {
						loader: 'file-loader',
						options: {
							name: '[hash:8]/images/[name].[ext]'
						}
					}
				}
			}
		]
	});
