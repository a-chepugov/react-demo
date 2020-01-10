const config = require('config');
const path = require('path');
const webpack = require('webpack');
const packageJson = require('../package.json');

module.exports = function (env = {}) {
	const {target, mode, watch} = env;
	console.log(`webpack > target: ${target || '??'} | mode: ${mode || '??'}`);

	const __webpack_hmr = config.webpack.__webpack_hmr;
	const heartbeat = config.webpack.heartbeat;
	const bundlePathName = config.webpack.bundles[target];
	const outputPath = path.resolve(bundlePathName);
	const publicPath = config.webpack.public;
	const sourcePath = config.webpack.source;

	//
	// const MomentLocalesPlugins = require('moment-locales-webpack-plugin');
	//
	// const plugins = (({target, mode}) => {
	// 	let plugins = [
	// 		require('./plugins/DefinePlugin')({
	// 			TARGET: JSON.stringify(target),
	// 			'process.env': {
	// 				NODE_ENV: `"${mode}"` // Запись должна быть именно с такой конфигурацией кавычек
	// 			}
	// 		}),
	// 		new MomentLocalesPlugins({
	// 			localesToKeep: ['uk', 'ru']
	// 		})
	// 	];
	//
	// 	if (mode === 'development') {
	// 		plugins = plugins.concat([
	// 			// new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({analyzerMode: 'static', openAnalyzer: false}),
	// 			// new webpack.debug.ProfilingPlugin({outputPath: `${outputPath}/profileEvents.json`}),
	// 		]);
	// 	}
	//
	// 	switch (target) {
	// 		case 'web': {
	// 			if (mode === 'development') {
	// 				plugins = plugins.concat([new webpack.HotModuleReplacementPlugin({multiStep: true})]);
	// 			}
	// 			break;
	// 		}
	// 		case 'node': {
	// 			break;
	// 		}
	// 	}
	// 	return plugins;
	// })(env);
	//
	// const devtool = mode === 'development' ? 'eval' : 'source-map';
	//
	// const splitChunksConfig = {
	// 	chunks: 'async',
	// 	minSize: 30000,
	// 	maxSize: 0,
	// 	minChunks: 1,
	// 	maxAsyncRequests: 5,
	// 	maxInitialRequests: 3,
	// 	name: true,
	// 	cacheGroups: {
	// 		vendors: {
	// 			test: /(node_modules|bower_components)/,
	// 			name: 'vendors',
	// 			chunks: 'all'
	// 		},
	// 		'default': {
	// 			minChunks: 2,
	// 			priority: -100,
	// 			reuseExistingChunk: true
	// 		}
	// 	}
	// };
	//
	// const vendorsSplitChunksList = ['react', 'moment'];
	//
	// splitChunksConfig.cacheGroups = vendorsSplitChunksList.reduce((a, name) => {
	// 	const chunkName = `vendor__${name}`;
	// 	a[chunkName] = {
	// 		test: new RegExp(`/node_modules/${name}`),
	// 		name: chunkName,
	// 		priority: 100,
	// 		chunks: 'all'
	// 	};
	// 	return a;
	// }, splitChunksConfig.cacheGroups);

	return {
		entry,
		output,
	// 	module: {rules},
	// 	plugins,
		context: path.join(__dirname),
		mode,
	// 	target,
	//
	// 	devtool,
	// 	watch,
	//
	// 	optimization: {
	// 		minimize: mode === 'production' && target === 'web',
	// 		minimizer: [
	// 			require('./plugins/UglifyjsWebpackPlugin')({compress: {collapse_vars: false, inline: true, passes: 2, keep_fargs: false}, output: {beautify: false}})
	// 		],
	// 		splitChunks: target === 'web' ? splitChunksConfig : undefined
	// 	},
	//
	// 	externals: target === 'node' ? Object.keys(packageJson.dependencies) : undefined,
	// 	resolve: {
	// 		modules: ['node_modules', 'bower_components'],
	// 		descriptionFiles: ['package.json', 'bower.json'],
	// 	}
	};
};
