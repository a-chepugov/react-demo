const config = require( 'config' );
const fs = require( 'fs' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );

const Cell = require( '../../helpers/Cell' );
const react = require( '../controllers/react' );

const __webpack_hmr = config.webpack.__webpack_hmr;
const heartbeat = config.webpack.heartbeat;
const outputDir = config.webpack.output;
const publicWeb = config.webpack.public.web;

const bundlesReady = ( ...DevMiddlewares ) => Promise.all( DevMiddlewares.map( ( item ) => new Promise( ( resolve ) => item.waitUntilValid( ( ...args ) => resolve( ...args ) ) ) ) );

const requireFromString = require( 'require-from-string' );

module.exports = ( app, assetsPaths ) => {
	const webWebpackConfig = require( '../../webpack.config.js' )( { target: 'web' }, { mode: 'development' } );
	const nodeWebpackConfig = require( '../../webpack.config.js' )( { target: 'node' }, { mode: 'development' } );

	const webCompiler = webpack( webWebpackConfig );
	const nodeCompiler = webpack( nodeWebpackConfig );

	const webDevMiddleware = webpackDevMiddleware( webCompiler, { hot: true, stats: { colors: true }, writeToDisk: false, historyApiFallback: true, lazy: false, HotModuleReplacement: true, publicPath: publicWeb, } );
	const nodeDevMiddleware = webpackDevMiddleware( nodeCompiler, { hot: true, stats: { colors: true }, writeToDisk: false, historyApiFallback: true, lazy: false, HotModuleReplacement: true, serverSideRender: true } );
	const webHotMiddleware = webpackHotMiddleware( webCompiler, { log: console.log, path: `${publicWeb}${__webpack_hmr}`, heartbeat } );
	app.use( nodeDevMiddleware );
	app.use( webDevMiddleware );
	app.use( webHotMiddleware );

	const initSsr = ( appCell, assertsCell ) =>
		bundlesReady( webDevMiddleware, nodeDevMiddleware )
			.then( ( response ) => {
				delete require.cache[path.resolve( assetsPaths.node )];
				delete require.cache[path.resolve( assetsPaths.web )];

				const assets = {
					node: require( assetsPaths.node ),
					web: require( assetsPaths.web ),
				}
				assertsCell.set( assets )

				let ssrScriptString = nodeDevMiddleware.fileSystem.readFileSync( assets.node.main.js, 'utf8' );
				let ssrScript = requireFromString( ssrScriptString );
				appCell.set( ssrScript );
			} )

	let appCell = new Cell();
	let assertsCell = new Cell();

	// Запускать переинициализацию ssr при каждом попавшем сюда запросе
	app.use( ( request, response, next ) => initSsr( appCell, assertsCell ).catch( console.error ).then( () => next() ) );

	const reactHandler = react( appCell, assertsCell );

	app
		.get( '*', ( request, response ) =>
			reactHandler( request.originalUrl, {} )
				.pipe( response ) )
};
