module.exports = function ({ target } = {}) {
	return require(`./webpack/${target}`).apply(this, arguments);
};
