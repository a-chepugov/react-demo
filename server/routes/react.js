const config = require('config');

module.exports = (app, ssr, assetsWeb) => {
	app
		.get('*', (request, response) => ssr.get()
			.renderToNodeStream(request.originalUrl, {}, assetsWeb.get())
			.pipe(response))
};
