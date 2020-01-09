function getTargets(target) {
	switch (target) {
		case 'web':
			return ({
				chrome: '40',
				firefox: '54'
			});
		case 'node':
			({
				node: 'current'
			})
	}
}

module.exports = function (env, outputPath) {
	const {target} = env;

	let options;
	let query = {
		presets: [['@babel/preset-env', {
			targets: getTargets(target)
		}], '@babel/preset-react']
	};

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
