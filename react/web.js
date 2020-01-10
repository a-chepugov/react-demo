import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import configureStore from './store/configureStore'

const app = (url, context, store) =>
	<Provider store={store}>
		<BrowserRouter context={context}>
			<Routes />
		</BrowserRouter>
	</Provider>

export function render(url, context, rootSelectore) {
	const store = configureStore(context);
	const App = app(url, context, store);
	return ReactDOM.render(App, document.querySelector(rootSelectore))
}

export function hydrate(url, context, rootSelector) {
	const store = configureStore(context);
	const App = app(url, context, store);
	return ReactDOM.hydrate(App, document.querySelector(rootSelector))
}

export default hydrate;
