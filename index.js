const express = require('express');
const bodyParser = require('body-parser');
const {Seller} = require('./sequelize');
const myVars = require('./Util/myVars');
const myFunctions = require('./Util/myFunctions');

const app = express();
app.use(bodyParser.json());


var appController = require('./Service/AppController');
var customerController = require('./Service/CustomerController');

myFunctions.fillDataBase;


app.use('/application', appController);
app.use('/customer', customerController);


const port = 7070;
app.listen(port, () => {
    console.log( myVars.colors.bg.Green ,  'Node Server listening on port ~~> ' ,myVars.colors.Reset , myVars.colors.fg.Blue + port ,  myVars.colors.Reset);
});