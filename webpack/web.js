const config = require('config');
const webpack = require('webpack');
const merge = require('webpack-merge');

const __webpack_hmr = config.webpack.__webpack_hmr;
const heartbeat = config.webpack.heartbeat;

module.exports = function (env = {}, argv) {
	const {target} = env;
	const {mode} = argv;

	const specific = {
		plugins: [
			mode === 'development'? new webpack.HotModuleReplacementPlugin({multiStep: true}): undefined
		]
	};

	const config = merge(require('./common').apply(this, arguments), specific);

	if (mode === 'development') {
		config.entry.unshift(`webpack-hot-middleware/client?path=${__webpack_hmr}&timeout=${heartbeat}&name=${target}&reload=true&dynamicPublicPath=true`);
	}

	return (config);
};
