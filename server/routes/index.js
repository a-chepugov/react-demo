const config = require( 'config' );
const path = require( 'path' );

const outputDir = config.webpack.output;

const assetsPaths = {
	node: path.join( '../..', outputDir, 'node', 'assets.json' ),
	web: path.join( '../..', outputDir, 'web', 'assets.json' )
}

module.exports = ( app ) => {
	app
		.get( '/_', ( request, response ) => response.send( config.app ) )

	process.env.NODE_ENV === 'development' ?
		require( './webpack' )( app, assetsPaths ) :
		require( './react' )( app, assetsPaths );
};
