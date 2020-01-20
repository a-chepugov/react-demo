const config = require('config');
const merge = require('webpack-merge');

module.exports = function (env = {}, argv) {
	const specific = {};

	const config = merge(require('./common').apply(this, arguments), specific);

	return (config);
};
