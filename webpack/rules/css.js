module.exports = (env, outputPath) => {
	const {mode} = env;
	return {
		test: /\.css(?:\?.*)?$/,
		exclude: /(node_modules|bower_components)/,
		use: [
			require('./cache')(env, outputPath),
			'vue-style-loader',
			{
				loader: 'css-loader',
				options: {
					minimize: mode === 'production',
					sourceMap: mode === 'development',
					importLoaders: 2
				}
			},
			{
				loader: 'group-css-media-queries-loader',
				options: {sourceMap: false}
			},
			{
				loader: 'postcss-loader',
				options: {
					config: {ctx: require('../../postcss.config')}
				}
			}
		]
	};
};
