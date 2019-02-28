const express = require('express');
const bodyParser = require('body-parser');
const {SmsApi,colors,databaseStatus} = require('./src/Util/myVars');
const {smsHandler,fillDataBase} = require('./src/Util/myFunctions');

const app = express();
app.use(bodyParser.json());

var supportController = require('./src/Controller/SupportController');
var appController = require('./src/Controller/AppController');
var customerController = require('./src/Controller/CustomerController');
var AuthController = require('./src/Controller/AuthController');
var SellerController = require('./src/Controller/SellerController');
var transportationController = require('./src/Controller/transportationController');
var warehouseController = require('./src/Controller/WareHouseController');



app.use('/application', appController);
app.use('/support', supportController);
app.use('/customer', customerController);
app.use('/Auth', AuthController);
app.use('/seller', SellerController);
app.use('/transportation',transportationController);
app.use('/warehouse',warehouseController);



app.get('/', function(req, res){
    res.send('pachalChi server is running ...');
});



var port = process.env.PORT || 1008;


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

console.log(colors.bg.Black , colors.fg.White , "server timeZone : " + new Date().toString() ,  colors.Reset);
console.log(colors.bg.Green ,  'Node Server listening on port '+port ,  colors.Reset);
    if (databaseStatus){
        console.log( colors.bg.Yellow , "for importing demo content make databaseStatus false after refreshing database ." ,  colors.Reset);
    } else {
        fillDataBase();
    }

/*
    SmsApi.Send({
            message: "خدمات پیام کوتاه کاوه نگار",
            sender: "10004346",
            receptor: "09127255512"
        },
        function(response, status) {
            console.log(response);
            console.log(status);
        });
*/



});


