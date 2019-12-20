const config = require('config');
const express = require('express');
const path = require('path');

const port = config.server.port;
const outputDir = config.webpack.output;
const public = config.webpack.public;

const app = express();
app.disable('x-powered-by');

app.use(public, express.static(`./${outputDir}/web/`));

const assetsPathNode = path.join('..', outputDir, 'node', 'assets.json');
const assetsPathWeb = path.join('..', outputDir, 'web', 'assets.json');

const assetsNode = require(assetsPathNode);
const assetsWeb = require(assetsPathWeb);

app.use(express.Router());

require('./routes')(app, require(assetsNode.main.js), assetsWeb);

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
});
