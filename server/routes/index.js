// import ssr from './server'

// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import { StaticRouter } from 'react-router-dom'
// import { Helmet } from 'react-helmet'


module.exports = (app) => {
	// Для любого пути отсылаем шаблон по умолчанию
	// ssr - функция, возвращающая сгенерированный HTML
	app.get('*', (req, res) => {
		// const response = ssr(req.url)
		// res.send(response)
		// ReactDOMServer.renderToString();

		res.send({asfdadsf: 123123})
	})
};
