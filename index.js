const express = require('express');
const bodyParser = require('body-parser');
const {Seller} = require('./sequelize');
const myVars = require('./Util/myVars');
const {fillDataBase} = require('./Util/myFunctions');

const app = express();
app.use(bodyParser.json());


var appController = require('./Controller/AppController');
var customerController = require('./Controller/CustomerController');
var AuthController = require('./Controller/AuthController');
var SellerController = require('./Controller/SellerController');




app.use('/application', appController);
app.use('/customer', customerController);
app.use('/Auth', AuthController);
app.use('/seller', SellerController);




const port = 2020;
app.listen(port, () => {
    console.log( myVars.colors.bg.Green ,  'Node Server listening on port ~~> ' ,myVars.colors.Reset , myVars.colors.fg.Blue + port ,  myVars.colors.Reset);
});

fillDataBase();

//todo alert uniqe alert