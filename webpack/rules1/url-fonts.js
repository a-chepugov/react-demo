module.exports = (env, outputPath) =>
	({
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		exclude: /(node_modules|bower_components)/,
		use: [
			require('./cache')(env, outputPath),
			{
				loader: 'url-loader',
				options: {
					limit: 4096,
					name: '[hash:8]/fonts/[name].[ext]',
					fallback: {
						loader: 'file-loader',
						options: {
							name: '[hash:8]/fonts/[name].[ext]'
						}
					}
				}
			}
		]
	});
