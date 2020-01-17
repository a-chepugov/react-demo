import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import configureStore from './store/configureStore'

const app = ( url, context, store ) =>
	<Provider store={store}>
		<BrowserRouter context={context}>
			<Routes />
		</BrowserRouter>
	</Provider>

export function createApp ( url, context ) {
	const store = configureStore( context );
	return app( url, context, store );
}

export function render ( url, context, rootSelector ) {
	const App = createApp( url, context );
	return ReactDOM.render( App, document.querySelector( rootSelector ) )
}

export function hydrate ( url, context, rootSelector ) {
	const App = createApp( url, context );
	return ReactDOM.hydrate( App, document.querySelector( rootSelector ) )
}
