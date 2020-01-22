const config = require( 'config' );
const express = require( 'express' );

const Cell = require( '../../helpers/Cell' );

const outputDir = config.webpack.output;
const publicWeb = config.webpack.public.web;

module.exports = ( app, assetsPaths ) => {
	app.use( publicWeb, express.static( `./${outputDir}/web/` ) );

	const assets = {
		node: require( assetsPaths.node ),
		web: require( assetsPaths.web ),
	};

	const ssr = require( assets.node.main.js )
	
	const appCell = new Cell( ssr );
	const assertsCell =  new Cell( assets );

	return ({ appCell, assertsCell });
};
