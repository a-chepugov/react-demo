module.exports = function (env, outputPath) {
	const {target} = env;

	let options;
	let query;

	switch (target) {
		case 'web': {
			query = {
				presets: [['@babel/preset-env', {
					targets: {
						chrome: '40',
						firefox: '54'
					}
				}]]
			};
			break;
		}
		case 'node': {
			query = {
				presets: [['@babel/preset-env', {
					targets: {
						node: 'current'
					}
				}]]
			};
			break;
		}
	}

	return {
		test: /\.js(?:\?.*)?$/,
		exclude: target !== 'web' ? /(node_modules|bower_components)/ : undefined,
		use: [
			require('./cache')(env, outputPath),
			{
				loader: 'babel-loader',
				options,
				query
			}]
	};
};
