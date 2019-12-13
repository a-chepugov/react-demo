const express = require('express');
const routes = require('./routes');

const PORT = 8080;
const app = express();
app.use(express.static('public'));
app.use(express.static('static'));

const router = express.Router();

app.use(router);

routes(app);

app.use(express.static('./build'));
app.listen(PORT, () => {
	console.log(`SSR running on port ${PORT}`)
});
