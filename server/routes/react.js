const react = require( '../controllers/react' );

module.exports = ( app ) =>
	( { appCell, assertsCell } ) => {
		const reactHandler = react( appCell, assertsCell );

		app
			.get( '*', ( request, response ) => {
				reactHandler( request.originalUrl, {} )
					.pipe( response )
			} )
	};
