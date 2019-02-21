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
    console.log(colors.fg.Green , "                  _           _ _____ _     _    _                   _ _                                _         _ \n" +
    "                 | |         | /  __ \\ |   (_)  (_)                 | (_)                              (_)       | |\n" +
    " _ __   __ _  ___| |__   __ _| | /  \\/ |__  _    _ ___    ___  _ __ | |_ _ __   ___    __ _  __ _  __ _ _ _ __   | |\n" +
    "| '_ \\ / _` |/ __| '_ \\ / _` | | |   | '_ \\| |  | / __|  / _ \\| '_ \\| | | '_ \\ / _ \\  / _` |/ _` |/ _` | | '_ \\  | |\n" +
    "| |_) | (_| | (__| | | | (_| | | \\__/\\ | | | |  | \\__ \\ | (_) | | | | | | | | |  __/ | (_| | (_| | (_| | | | | | |_|\n" +
    "| .__/ \\__,_|\\___|_| |_|\\__,_|_|\\____/_| |_|_|  |_|___/  \\___/|_| |_|_|_|_| |_|\\___|  \\__,_|\\__, |\\__,_|_|_| |_| (_)\n" +
    "| |                                                                                          __/ |                  \n" +
    "|_|                                                                                         |___/                   " +
        "\r\n",colors.Reset);


    console.log( colors.bg.Green ,  'Node Server listening on port ~~> ' ,colors.Reset , colors.fg.Blue + port ,  colors.Reset);
    if (databaseStatus){
        console.log( colors.bg.Yellow , "for importing demo content make databaseStatus false after refreshing database ." ,  colors.Reset);
    } else {
        fillDataBase();
    }
});


//todo alert uniqe alert