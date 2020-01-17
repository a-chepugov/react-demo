const react = require( '../controllers/react' );

module.exports = ( app, ssrCell, assetsCell ) => {

	const reactHandler = react( ssrCell, assetsCell );

	app
		.get( '*', ( request, response ) =>
			reactHandler( request.originalUrl, {} )
				.pipe( response ) )
};
