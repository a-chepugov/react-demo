const config = require('config');
const express = require('express');
const path = require('path');

const react = require('./react');

const outputDir = config.webpack.output;
const publicWeb = config.webpack.public.web;

const Cell = require('../../helpers/Cell');

const assetsPathNode = path.join('../..', outputDir, 'node', 'assets.json');
const assetsPathWeb = path.join('../..', outputDir, 'web', 'assets.json');
const assetsNode = require(assetsPathNode);
const assetsWeb = require(assetsPathWeb);

const ssr = require(assetsNode.main.js)

module.exports = (app) => {
	app.use(publicWeb, express.static(`./${outputDir}/web/`));

	app
		.get('/_', (request, response) => response.send(config.app))

		react(app, new Cell(ssr), new Cell(assetsWeb))
};
