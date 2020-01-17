const config = require( 'config' );
const express = require( 'express' );

const Cell = require( '../../helpers/Cell' );
const react = require( '../controllers/react' );

const outputDir = config.webpack.output;
const publicWeb = config.webpack.public.web;

module.exports = ( app, assetsPaths ) => {
	app.use( publicWeb, express.static( `./${outputDir}/web/` ) );

	const assets = {
		node: require( assetsPaths.node ),
		web: require( assetsPaths.web ),
	};

	const ssr = require( assets.node.main.js )

	const reactHandler = react( new Cell( ssr ), new Cell( assets ) );

	app
		.get( '*', ( request, response ) =>
			reactHandler( request.originalUrl, {} )
				.pipe( response ) )
};
