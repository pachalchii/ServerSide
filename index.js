var cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const {colors,DataBaseStatus,DevelopMode,BaseUrl} = require('./src/Util/configuration');
const {fillDataBase} = require('./src/Util/Filter');
const cors = require('cors');
const {sequelize} = require('./sequelize');
const app = express();
const io = require('socket.io').listen(port);
const morgan = require('morgan');
const fs = require("fs");
const path = require('path');
const helmet = require('helmet');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'Log/access.log'), { flags: 'a' , interval: '1d' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    app.use( BaseUrl + '/application', require('./src/Controller/AppController') );
    app.use( BaseUrl + '/support', require('./src/Controller/SupportController') );
    app.use( BaseUrl + '/customer', require('./src/Controller/CustomerController') );
    app.use( BaseUrl + '/auth', require('./src/Controller/AuthController') );
    app.use( BaseUrl + '/seller', require('./src/Controller/SellerController') );
    app.use( BaseUrl + '/transportation', require('./src/Controller/transportationController') );
    app.use( BaseUrl + '/warehouse',require('./src/Controller/WareHouseController') );

    app.get('/', function(req, res){
        res.send('pachalChi server answered by WorkerId = ' + process.pid);
    });

    cluster.on('exit', function (worker) {

        console.log(colors.bg.Black, colors.fg.White,'Worker %d died :(', worker.id,colors.fg.White);
        cluster.fork();

    });


    var port = process.env.PORT || 6985;

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
        console.log(colors.bg.Black, colors.fg.White ,  'Node Server listening on port '+port ,  colors.Reset);
        if (DataBaseStatus === "create-drop"){

            sequelize.sync({ force: true })
                .then(() => {
                    console.log(colors.bg.Black, colors.fg.White ,`DataBase create-dropped `,  colors.Reset);
                    if (DevelopMode) {
                        fillDataBase();
                        console.log(colors.bg.Black, colors.fg.White ,`starting import demo data : `,  colors.Reset);
                    }
                });

        } else if (DataBaseStatus === "update"){
            sequelize.sync({ force: false })
                .then(() => {
                    console.log(colors.bg.Black, colors.fg.White ,`Database Updated`,  colors.Reset);
                });
        }

    });



} else if (cluster.isWorker){

    app.use( BaseUrl + '/application', require('./src/Controller/AppController') );
    app.use( BaseUrl + '/support', require('./src/Controller/SupportController') );
    app.use( BaseUrl + '/customer', require('./src/Controller/CustomerController') );
    app.use( BaseUrl + '/auth', require('./src/Controller/AuthController') );
    app.use( BaseUrl + '/seller', require('./src/Controller/SellerController') );
    app.use( BaseUrl + '/transportation', require('./src/Controller/transportationController') );
    app.use( BaseUrl + '/warehouse',require('./src/Controller/WareHouseController') );

    app.get('/', function(req, res){
        res.send('pachalChi server is running ...' + cluster.worker);
    });

    var port = 2525;

    app.listen(port, () => {
        console.log(colors.bg.Black, colors.fg.White ,"worker with id = "+cluster.worker.id+" start working.",  colors.Reset);
    });

}


/*io.on('connection', function(socket) {

    socket.on('getLocation', data=>{
        if (data.token == null || data.OrderProductID == null){
            socket.emit('answer', {"code":703})
        } else {
            function checkToken(data) {

                if (data.token != null) {
                    try{
                        var decodedJWT = jwt.decode(data.token.toString(), JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                            socket.emit('answer', {"code":700})
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
                                socket.emit('answer', {"code":700})
                            }
                            return searchQuery;


                        }




                    }  catch(err) {
                        socket.emit('answer', {"code":700})
                        return false;

                    }



                } else {
                    socket.emit('answer', {"code":703})
                    return false;
                }

            }

            var searchQuery = checkToken(data );
            if (searchQuery !== false) {

                customer.findAll(searchQuery).then(cust => {

                    if (isThisArrayEmpty(cust)) {
                        socket.emit('answer', {"code":700})
                    }else {
                        if (cust[0].Status){
                            orderProduct.findAll({
                                where:{
                                    ID:data.OrderProductID
                                }
                            }).then(
                                orderProduct=>{
                                    socket.emit('answer', {"TrasnportarCurrentLocation ":orderProduct[0].TrasnportarCurrentLocation })

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
            socket.emit('answer', {"code":703})
        } else {
            function checkToken(data) {

                if (data.token != null) {
                    try{
                        var decodedJWT = jwt.decode(data.token.toString(), JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                            socket.emit('answer', {"code":700})
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
                                socket.emit('answer', {"code":700})
                            }
                            return searchQuery;


                        }




                    }  catch(err) {
                        socket.emit('answer', {"code":700})
                        return false;

                    }



                } else {
                    socket.emit('answer', {"code":703})
                    return false;
                }

            }

            var searchQuery = checkToken(data );
            if (searchQuery !== false) {

                transportation.findAll(searchQuery).then(tran => {

                    if (isThisArrayEmpty(tran)) {
                        socket.emit('answer', {"code":700})
                    }else {
                        if (tran[0].Status){
                            orderProduct.update({
                                TrasnportarCurrentLocation:data.location.toString()
                            },{
                                where:{
                                    TransportarID:tran[0].ID
                                }
                            }).then(
                                socket.emit('answer', {"code":200})

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
            socket.emit('answer', {"code":703})
        } else {
            function checkToken(data) {

                if (data.token != null) {
                    try{
                        var decodedJWT = jwt.decode(data.token.toString(), JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                            socket.emit('answer', {"code":700})
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
                                socket.emit('answer', {"code":700})
                            }
                            return searchQuery;


                        }




                    }  catch(err) {
                        socket.emit('answer', {"code":700})
                        return false;

                    }



                } else {
                    socket.emit('answer', {"code":703})
                    return false;
                }

            }

            var searchQuery = checkToken(data );
            if (searchQuery !== false) {

                sellerOperator.findAll(searchQuery).then(so => {

                    if (isThisArrayEmpty(so)) {
                        socket.emit('answer', {"code":700})
                    }else {
                        if (so[0].Status)
                        {
                            orderProduct.findAll({where:{
                                    SellerOperatorID:so[0].ID
                                }}).then(op=>{
                                socket.emit('answer', {"OrderProduct":op})

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

    socket.on('customerProductOrder', (data)=>{
        console.log("hi")
        if (data.token == null || data.OrderProductID == null ){
            socket.emit('answer', {"code":703})
        } else {
            function checkToken(data) {

                if (data.token != null) {
                    try{
                        var decodedJWT = jwt.decode(data.token.toString(), JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                            socket.emit('answer', {"code":700})
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
                                socket.emit('answer', {"code":700})
                            }
                            return searchQuery;


                        }




                    }  catch(err) {
                        socket.emit('answer', {"code":700})
                        return false;

                    }



                } else {
                    socket.emit('answer', {"code":703})
                    return false;
                }

            }

            var searchQuery = checkToken(data );
            if (searchQuery !== false) {

                customer.findAll(searchQuery).then(cust => {

                    if (isThisArrayEmpty(cust)) {
                        socket.emit('answer', {"code":700})
                    }else {
                        if (cust[0].Status){
                            orderProduct.findAll({where: {ID: data.OrderProductID}}).then(
                                orderp => {
                                    socket.emit('answer', {"Order":orderp})
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

});*/






