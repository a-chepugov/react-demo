const config = require('config');
const express = require('express');

const port = config.server.port;

const app = express();
app.disable('x-powered-by');

app.use(express.Router());
require('./routes')(app);

app.listen(port, () => {
	console.log('Сервер запущен')
	console.log(`http://localhost:${port}`)
});
