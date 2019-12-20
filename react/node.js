import React from "react";
import ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { StaticRouter } from "react-router-dom";

import Routes from "./routes";
import configureStore from './store/configureStore'

const app = (url, context, store, assets) =>
	<html>
		<body>
			<div id="app">
				<Provider store={store}>
					<StaticRouter context={context} location={url}>
						<Routes />
					</StaticRouter>
				</Provider >
			</div>
			<script src={assets.main.js}></script>
			<script dangerouslySetInnerHTML={({__html: "hydrate(undefined, {}, '#app')"})}></script>
		</body>
	</html>

export function renderToString(url, context, assets) {
	const store = configureStore(context);
	const App = app(url, context, store, assets);
	return ReactDOMServer.renderToString(App)
}

export function renderToNodeStream(url, context, assets) {
	const store = configureStore(context);
	const App = app(url, context, store, assets);
	return ReactDOMServer.renderToNodeStream(App)
}

export default renderToNodeStream;
