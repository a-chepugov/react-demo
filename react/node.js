import React from "react";
import ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { StaticRouter } from "react-router-dom";

import Routes from "./routes";
import configureStore from './store/configureStore'

const app = ( url, context, store, assets ) =>
	<html>
		<body>
			<Provider store={store}>
				<StaticRouter context={context} location={url}>
					<Routes />
				</StaticRouter>
			</Provider >
			<script src={assets.main.js}></script>
			<script dangerouslySetInnerHTML={( { __html: "hydrate(document.location.href, {}, 'body')" } )}></script>
		</body>
	</html>

function createApp ( url, context, assets ) {
	const store = configureStore( context );
	return app( url, context, store, assets );
}

export function renderToString ( url, context, assets ) {
	const App = createApp( url, context, assets );
	return ReactDOMServer.renderToString( App )
}

export function renderToNodeStream ( url, context, assets ) {
	const App = createApp( url, context, assets );
	return ReactDOMServer.renderToNodeStream( App )
}
