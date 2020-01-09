module.exports = function (env = {}, argv) {
	const {target} = env;

	let query;

	switch (target) {
		case 'web': {
			query = {
				presets: [['@babel/preset-env', {
					targets: {
						chrome: '40',
						firefox: '54'
					}
				}], '@babel/preset-react'],
				"plugins": ["@babel/plugin-proposal-export-default-from"]
			};
			break;
		}
		case 'node': {
			query = {
				presets: [['@babel/preset-env', {
					targets: {
						node: 'current'
					}
				}], '@babel/preset-react'],
				"plugins": ["@babel/plugin-proposal-export-default-from"]
			};
			break;
		}
	}


	return ({
		test: /\.m?js(?:\?.*)?$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: "babel-loader",
			query
		}
	})
};
