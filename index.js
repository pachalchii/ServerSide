const express = require('express');
const bodyParser = require('body-parser');
const {Seller} = require('./sequelize');
const {colors,databaseStatus} = require('./src/Util/myVars');
const {fillDataBase} = require('./src/Util/myFunctions');

const app = express();
app.use(bodyParser.json());


var appController = require('./src/Controller/AppController');
var customerController = require('./src/Controller/CustomerController');
var AuthController = require('./src/Controller/AuthController');
var SellerController = require('./src/Controller/SellerController');
var transportationController = require('./src/Controller/transportationController');




app.use('/application', appController);
app.use('/customer', customerController);
app.use('/Auth', AuthController);
app.use('/seller', SellerController);
app.use('/transportation',transportationController);




const port = 1010;
app.listen(port, () => {
    console.log( colors.bg.Green ,  'Node Server listening on port ~~> ' ,colors.Reset , colors.fg.Blue + port ,  colors.Reset);
    if (databaseStatus){
        console.log( colors.bg.Yellow , "for importing demo content make databaseStatus false after refreshing database ." ,  colors.Reset);
    } else {
        fillDataBase();
    }
});


//todo alert uniqe alert