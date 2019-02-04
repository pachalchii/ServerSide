const express = require('express');
const bodyParser = require('body-parser');
const {Seller} = require('./sequelize');
const myVars = require('./Util/myVars');
const {fillDataBase} = require('./Util/myFunctions');

const app = express();
app.use(bodyParser.json());


var appController = require('./Service/AppController');
var customerController = require('./Service/CustomerController');
var AuthController = require('./Service/AuthController');




app.use('/application', appController);
app.use('/customer', customerController);
app.use('/Auth', AuthController);



const port = 4040;
app.listen(port, () => {
    console.log( myVars.colors.bg.Green ,  'Node Server listening on port ~~> ' ,myVars.colors.Reset , myVars.colors.fg.Blue + port ,  myVars.colors.Reset);
});

fillDataBase();
