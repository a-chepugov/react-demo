const config = require( 'config' );
const path = require( 'path' );

const react = require( './react' );

const outputDir = config.webpack.output;

const assetsPaths = {
	node: path.join( '../..', outputDir, 'node', 'assets.json' ),
	web: path.join( '../..', outputDir, 'web', 'assets.json' )
}

module.exports = ( app ) => {
	app
		.get( '/_', ( request, response ) => response.send( config.app ) )

	const bundlesCells = process.env.NODE_ENV === 'development' ?
		require( '../middlewares/webpack' )( app, assetsPaths ) :
		require( '../middlewares/static' )( app, assetsPaths );

	react( app )( bundlesCells );
};
