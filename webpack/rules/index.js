module.exports = function (env = {}, argv) {
	return [
		require('./scripts').apply(this, arguments),
		// require('./styles').apply(this, arguments),
		require('./images').apply(this, arguments),
	]
};
