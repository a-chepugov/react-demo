const react = require( '../controllers/react' );

module.exports = ( app ) =>
	( { appCell, assertsCell } ) => {
		const reactHandler = react( appCell, assertsCell );

		app
			.get( '*', ( request, response ) => {
				const context = {};
				reactHandler.renderToNodeStream( request.originalUrl, context )
					.pipe( response )
			} )
	};
