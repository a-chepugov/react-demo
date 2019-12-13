const packageJson = require('../package.json');

module.exports = {
	app: {
		name: packageJson.name,
		version: packageJson.version,
		description: packageJson.description,
	},
	webpack: {
		public: '/scripts/', // Обязательно `/` в конце (для файлов типа chunk)
		__webpack_hmr: '__webpack_hmr',
		heartbeat: 3000,
		source: 'react',
		bundles: {
			cache: 'build/.cache',
			web: 'build/web',
			node: 'build/node'
		}
	},

};
