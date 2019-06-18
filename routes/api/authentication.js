const express = require('express');
const router = express.Router();
const app = express();
const request = require('request');
const http = require('http').Server(app);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const prettyjson = require('prettyjson');

// config a console debugger
const debug = require('debug')(`${process.env.APP_NAME.toLowerCase()}:api/authentication`);

router.get('/', function(req, res) {
    res.send('Welcome to the APIs...') ;
});

router.get('/cookies', async function(req, res) {
   debug('%O', req.cookies);
   res.send(req.cookies);
});

/**
 *
 * Expose the API route
 *
 **/

module.exports = router;