const path = require('path');

module.exports = (env, outputPath) =>
	({
		loader: 'cache-loader',
		options: {
			cacheDirectory: path.resolve(outputPath, '.cache-loader')
		}
	});
