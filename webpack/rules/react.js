module.exports = (env, outputPath) => {
	const {target} = env;

	let options = {
		compilerOptions: {
			preserveWhitespace: false
		},
		cacheDirectory: './.cache/react-loader',
	};

	return {
		test: /\.jsx(?:\?.*)?$/,
		exclude: /(node_modules|bower_components)/,
		use: [
			require('./cache')(env, outputPath),
			{
				loader: 'react-loader',
				options
			}
		]
	};
};
