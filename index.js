const express = require('express');
const bodyParser = require('body-parser');
const {SmsApi,colors,databaseStatus} = require('./src/Util/myVars');
const {smsHandler,fillDataBase} = require('./src/Util/myFunctions');
var cors = require('cors');

const {orderProduct ,Seller, customer, transportation ,sellerOperator, sellerProducts} = require('./sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors());
var io = require('socket.io').listen(port);


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


io.on('connection', function(socket) {

    socket.on('getLocation', data=>{
        if (data.token == null || data.OrderProductID == null){
            io.emit('answer', {"code":703})
        } else {
            function checkToken(data) {

                if (data.token != null) {
                    try{
                        var decodedJWT = jwt.decode(data.token.toString(), JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                            io.emit('answer', {"code":700})
                            return false

                        }else {

                            var searchQuery ;
                            if (decodedJWT.Username != null) {
                                searchQuery = {
                                    where: {
                                        Username: decodedJWT.Username, Password: decodedJWT.Password
                                    }
                                };
                            }else if (decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) {
                                try {
                                    searchQuery = {
                                        where: {
                                            PhoneNumber: decodedJWT.PhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                }catch (e) {
                                    searchQuery = {
                                        where: {
                                            OwnerPhoneNumber: decodedJWT.OwnerPhoneNumber, Password: decodedJWT.Password
                                        }
                                    };

                                }

                            }else {
                                io.emit('answer', {"code":700})
                            }
                            return searchQuery;


                        }




                    }  catch(err) {
                        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                        io.emit('answer', {"code":700})
                        return false;

                    }



                } else {
                    io.emit('answer', {"code":703})
                    return false;
                }

            }

            var searchQuery = checkToken(data );
            if (searchQuery !== false) {

                customer.findAll(searchQuery).then(cust => {

                    if (isThisArrayEmpty(cust)) {
                        io.emit('answer', {"code":700})
                    }else {
                        if (cust[0].Status){
                            orderProduct.findAll({
                                where:{
                                    ID:data.OrderProductID
                                }
                            }).then(
                                orderProduct=>{
                                    io.emit('answer', {"TrasnportarCurrentLocation ":orderProduct[0].TrasnportarCurrentLocation })

                                }

                            )

                        }else {
                            return res.status(404).json({"code": 900});
                        }


                    }
                });



            }
        }



    });

    socket.on('sendLocation', data=>{
        if (data.token == null || data.location == null){
            io.emit('answer', {"code":703})
        } else {
            function checkToken(data) {

                if (data.token != null) {
                    try{
                        var decodedJWT = jwt.decode(data.token.toString(), JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                            io.emit('answer', {"code":700})
                            return false

                        }else {

                            var searchQuery ;
                            if (decodedJWT.Username != null) {
                                searchQuery = {
                                    where: {
                                        Username: decodedJWT.Username, Password: decodedJWT.Password
                                    }
                                };
                            }else if (decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) {
                                try {
                                    searchQuery = {
                                        where: {
                                            PhoneNumber: decodedJWT.PhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                }catch (e) {
                                    searchQuery = {
                                        where: {
                                            OwnerPhoneNumber: decodedJWT.OwnerPhoneNumber, Password: decodedJWT.Password
                                        }
                                    };

                                }

                            }else {
                                io.emit('answer', {"code":700})
                            }
                            return searchQuery;


                        }




                    }  catch(err) {
                        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                        io.emit('answer', {"code":700})
                        return false;

                    }



                } else {
                    io.emit('answer', {"code":703})
                    return false;
                }

            }

            var searchQuery = checkToken(data );
            if (searchQuery !== false) {

                transportation.findAll(searchQuery).then(tran => {

                    if (isThisArrayEmpty(tran)) {
                        io.emit('answer', {"code":700})
                    }else {
                        if (tran[0].Status){
                            orderProduct.update({
                                TrasnportarCurrentLocation:data.location.toString()
                            },{
                                where:{
                                    TransportarID:tran[0].ID
                                }
                            }).then(
                                io.emit('answer', {"code":200})

                            )

                        }else {
                            return res.status(404).json({"code": 900});

                        }


                    }
                });



            }
        }



    });

    socket.on('sellerOperatorAllProductOrder' , data=>{
        if (data.token == null){
            io.emit('answer', {"code":703})
        } else {
            function checkToken(data) {

                if (data.token != null) {
                    try{
                        var decodedJWT = jwt.decode(data.token.toString(), JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                            io.emit('answer', {"code":700})
                            return false

                        }else {

                            var searchQuery ;
                            if (decodedJWT.Username != null) {
                                searchQuery = {
                                    where: {
                                        Username: decodedJWT.Username, Password: decodedJWT.Password
                                    }
                                };
                            }else if (decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) {
                                try {
                                    searchQuery = {
                                        where: {
                                            PhoneNumber: decodedJWT.PhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                }catch (e) {
                                    searchQuery = {
                                        where: {
                                            OwnerPhoneNumber: decodedJWT.OwnerPhoneNumber, Password: decodedJWT.Password
                                        }
                                    };

                                }

                            }else {
                                io.emit('answer', {"code":700})
                            }
                            return searchQuery;


                        }




                    }  catch(err) {
                        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                        io.emit('answer', {"code":700})
                        return false;

                    }



                } else {
                    io.emit('answer', {"code":703})
                    return false;
                }

            }

            var searchQuery = checkToken(data );
            if (searchQuery !== false) {

                sellerOperator.findAll(searchQuery).then(so => {

                    if (isThisArrayEmpty(so)) {
                        io.emit('answer', {"code":700})
                    }else {
                        if (so[0].Status)
                        {
                            orderProduct.findAll({where:{
                                    SellerOperatorID:so[0].ID
                                }}).then(op=>{
                                io.emit('answer', {"OrderProduct":op})

                            });
                        }else
                            {
                                return res.status(404).json({"code": 900});
                            }

                    }
                });



            }
        }
    });

    socket.on('customerProductOrder', data=>{
        if (data.token == null || data.OrderProductID == null ){
            io.emit('answer', {"code":703})
        } else {
            function checkToken(data) {

                if (data.token != null) {
                    try{
                        var decodedJWT = jwt.decode(data.token.toString(), JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                            io.emit('answer', {"code":700})
                            return false

                        }else {

                            var searchQuery ;
                            if (decodedJWT.Username != null) {
                                searchQuery = {
                                    where: {
                                        Username: decodedJWT.Username, Password: decodedJWT.Password
                                    }
                                };
                            }else if (decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) {
                                try {
                                    searchQuery = {
                                        where: {
                                            PhoneNumber: decodedJWT.PhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                }catch (e) {
                                    searchQuery = {
                                        where: {
                                            OwnerPhoneNumber: decodedJWT.OwnerPhoneNumber, Password: decodedJWT.Password
                                        }
                                    };

                                }

                            }else {
                                io.emit('answer', {"code":700})
                            }
                            return searchQuery;


                        }




                    }  catch(err) {
                        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                        io.emit('answer', {"code":700})
                        return false;

                    }



                } else {
                    io.emit('answer', {"code":703})
                    return false;
                }

            }

            var searchQuery = checkToken(data );
            if (searchQuery !== false) {

                customer.findAll(searchQuery).then(cust => {

                    if (isThisArrayEmpty(cust)) {
                        io.emit('answer', {"code":700})
                    }else {
                        if (cust[0].Status){
                            orderProduct.findAll({where: {ID: data.OrderProductID}}).then(
                                orderp => {
                                    io.emit('answer', {"Order":orderp})
                                }
                            )
                        }else {
                            return res.status(404).json({"code": 900});
                        }

                    }
                });



            }
        }



    });


});






