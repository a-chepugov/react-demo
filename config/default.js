const packageJson = require('../package.json');
const random = require('../helpers/random');

const output = 'build';

module.exports = {
	app: {
		name: packageJson.name,
		version: packageJson.version,
		description: packageJson.description,
	},
	webpack: {
		source: 'react',
		output,
		public: {
			web: '/scripts/', // Обязательно `/` в конце (для файлов типа chunk)
			node: __dirname + '/../' + output + '/node'
		},
		__webpack_hmr: '__webpack_hmr',
		heartbeat: 3000,
	},
	server: {
		port: process.env.PORT || random(1000, 65535),
	}
};
