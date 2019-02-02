require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config.json');
const bodyParser = require('body-parser');
const myVars = require('./Util/myVars')
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/coustomer', require('./users/coustomer/coustomer.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const server = app.listen(port, function () {

    console.log( myVars.colors.bg.Green ,  'Node Server listening on port ' + port ,  myVars.colors.Reset);

});
