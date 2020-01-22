const config = require( 'config' );
const fs = require( 'fs' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );

const Cell = require( '../../helpers/Cell' );

const __webpack_hmr = config.webpack.__webpack_hmr;
const heartbeat = config.webpack.heartbeat;
const outputDir = config.webpack.output;
const publicWeb = config.webpack.public.web;

const bundlesReady = ( ...DevMiddlewares ) => Promise.all( DevMiddlewares.map( ( item ) => new Promise( ( resolve ) => item.waitUntilValid( ( ...args ) => resolve( ...args ) ) ) ) );

const requireFromString = require( 'require-from-string' );

module.exports = ( app, assetsPaths ) => {
	const webWebpackConfig = require( '../../webpack.config.js' )( {}, { mode: 'development', target: 'web' } );
	const nodeWebpackConfig = require( '../../webpack.config.js' )( {}, { mode: 'development', target: 'node' } );

	const webCompiler = webpack( webWebpackConfig );
	const nodeCompiler = webpack( nodeWebpackConfig );

	const webDevMiddleware = webpackDevMiddleware( webCompiler, { hot: true, stats: false, writeToDisk: false, historyApiFallback: true, lazy: false, HotModuleReplacement: true, publicPath: publicWeb, } );
	const nodeDevMiddleware = webpackDevMiddleware( nodeCompiler, { hot: true, stats: false, writeToDisk: false, historyApiFallback: true, lazy: false, HotModuleReplacement: true, serverSideRender: true } );
	const webHotMiddleware = webpackHotMiddleware( webCompiler, { log: console.log, path: `${publicWeb}${__webpack_hmr}`, heartbeat } );
	app.use( nodeDevMiddleware );
	app.use( webDevMiddleware );
	app.use( webHotMiddleware );

	const initSsr = ( appCell, assertsCell ) =>
		bundlesReady( webDevMiddleware, nodeDevMiddleware )
			.then( ( response ) => {
				const assets = {
					node: JSON.parse( fs.readFileSync( path.join( __dirname, assetsPaths.node ), 'utf8' ) ),
					web: JSON.parse( fs.readFileSync( path.join( __dirname, assetsPaths.web ), 'utf8' ) ),
				};
				assertsCell.set( assets );

				let ssrScriptString = nodeDevMiddleware.fileSystem.readFileSync( assets.node.main.js, 'utf8' );
				let ssrScript = requireFromString( ssrScriptString );
				appCell.set( ssrScript );
			} )

	let appCell = new Cell();
	let assertsCell = new Cell();

	// Запускать переинициализацию ssr при каждом попавшем сюда запросе
	app.use( ( request, response, next ) => initSsr( appCell, assertsCell ).catch( console.error ).then( () => next() ) );

	return ({ appCell, assertsCell });
};
