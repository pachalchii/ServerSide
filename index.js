var cluster = require('cluster');
const {colors,ServerPort,SocketServerPort,DataBaseStatus,DevelopMode} = require('./src/Util/configuration');
const {sequelize ,ChatOnOrderProduct,customer,Seller,orderProduct,sellerOperator} = require('./sequelize');
const {fillDataBase ,checkUser} = require('./src/Util/Filter');
const cron = require("node-cron");
const fs = require("fs");
const path = require('path');
const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const {BaseUrl,JWT_SECRET} = require('./src/Util/configuration');
const cors = require('cors');
const jwt = require('jwt-simple');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'Log/access.log'), { flags: 'a' , interval: '1d' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use( BaseUrl + '/application', require('./src/Controller/AppController') );
app.use( BaseUrl + '/support', require('./src/Controller/SupportController') );
app.use( BaseUrl + '/customer', require('./src/Controller/CustomerController') );
app.use( BaseUrl + '/auth', require('./src/Controller/AuthController') );
app.use( BaseUrl + '/seller', require('./src/Controller/SellerController') );
app.use( BaseUrl + '/transportation', require('./src/Controller/transportationController') );
app.use( BaseUrl + '/warehouse',require('./src/Controller/WareHouseController') );
app.use( BaseUrl + '/productManager', require('./src/Controller/ProductManagerController') );

var zipFolder = require('zip-folder');

if (cluster.isMaster) {
    if ( DevelopMode){
        cluster.fork();
    }
    else {
        var cpuCount = require('os').cpus().length;
        for (var i = 0; i < cpuCount; i += 1) {
            cluster.fork();
        }
    }
    if (DataBaseStatus === "create-drop"){
        sequelize.sync({ force: true })
            .then(() => {
                console.log(colors.bg.Black, colors.fg.White ,`DataBase create-dropped `,  colors.Reset);
                if (DevelopMode) {
                    fillDataBase();
                    console.log(colors.bg.Black, colors.fg.White ,`starting import demo data : `,  colors.Reset);
                }
            });
    }
    else if (DataBaseStatus === "update"){
        sequelize.sync({ force: false })
            .then(() => {
                console.log(colors.bg.Black, colors.fg.White ,`Database Updated`,  colors.Reset);
            });
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log(colors.bg.Black, colors.fg.White,'Worker %d died', worker.id,colors.fg.White);
        cluster.fork();

    });
    /*cron.schedule("59 23 * * *", function() {
        try {
            for (var id in cluster.workers) {
                cluster.workers[id].kill();
            }

            var BackUpFileName = new Date();

            zipFolder(path.join(__dirname, '/uploads/'), path.join(__dirname, '/BackUp/')+BackUpFileName+'.zip', function(err) {
                if(err) {
                    console.log('oh no!', err);
                } else {
                    console.log("hi")

                }
            });
        }catch (e) {

        }



    });*/


    const server = require('http').createServer();
    const io = require('socket.io')(server);
    io.on('connection', client => {

        client.on('checkToken', (data,callbackFn) => {

            function checkToken(token, callback) {

                if (token != null) {
                    try {
                        var decodedJWT = jwt.decode(token, JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username && decodedJWT.PhoneNumber && decodedJWT.OwnerPhoneNumber)) {
                            callback({HttpCode: 400, response: {"code": 700}});
                        }
                        else {
                            var searchQuery;
                            if (decodedJWT.Username != null) {
                                searchQuery = {
                                    where: {
                                        Username: decodedJWT.Username, Password: decodedJWT.Password
                                    }
                                };
                                callback("",searchQuery);
                            }
                            else if (decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) {
                                if (decodedJWT.PhoneNumber != null) {
                                    searchQuery = {
                                        where: {
                                            PhoneNumber: decodedJWT.PhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                } else {
                                    searchQuery = {
                                        where: {
                                            OwnerPhoneNumber: decodedJWT.OwnerPhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                }
                                callback("",searchQuery);
                            }
                            else {
                                callback({HttpCode: 400, response: {"code": 700}});
                            }

                        }
                    }
                    catch (err) {
                        callback({HttpCode: 400, response: {"code": 700}});
                    }


                }
                else {
                    callback({HttpCode: 400, response: {"code": 703}});
                }

            }
            try {
                var Decodeddata = JSON.parse(JSON.stringify(data));
                if (Decodeddata.token ==null || Decodeddata.OrderProductID == null){
                    client.send(JSON.stringify({"message":"parameters not sended"}));
                } else {
                    orderProduct.findOne({where:{ID:Decodeddata.OrderProductID}}).then(
                        orderProduct=>{
                            if (orderProduct != null){
                                try{
                                    checkToken(Decodeddata.token, (err, data) => {
                                        if (err) {
                                            callbackFn(JSON.stringify({"message":"expired token"}));
                                        }
                                        else {


                                            var Entity = "";
                                            checkUser(data, customer, (newErr, newData1) => {
                                                if (newErr) {
                                                    checkUser(data,Seller , (newErr, newData) => {
                                                        if (newErr) {
                                                            callbackFn(JSON.stringify({"message":"expired token"}));
                                                        }
                                                        else {
                                                            if (newData.Enabled) {
                                                                Entity = newData;
                                                            }else {callbackFn(JSON.stringify({"message":"entity is disable"}));}
                                                        }
                                                    })
                                                }
                                                else {
                                                    if (newData1.Enabled) {
                                                        Entity = newData1;
                                                    }else {callbackFn(JSON.stringify({"message":"entity is disable"}));}
                                                }

                                                ChatOnOrderProduct.findAll({where:{OrderProdutID: Decodeddata.OrderProductID}}).then( async chats=>{
                                                    var newChats = [];
                                                    asyncForEach(chats,async item =>{
                                                        var OperatorID = "";
                                                        if (item.FromRole === "seller"){OperatorID = item.FromID}
                                                        if (item.ToID === "seller"){OperatorID = item.ToID}
                                                        await sellerOperator.findOne({where:{ID:OperatorID}}).then(
                                                           async operator=>{
                                                                var newItem = {
                                                                    FromRole: item.FromRole,
                                                                    ToRole: item.ToRole,
                                                                    FromID: item.FromID,
                                                                    ToID: item.ToID,
                                                                    SeenStatus: item.SeenStatus,
                                                                    Message: item.Message,
                                                                    OperatorName:operator.ID
                                                                };
                                                                newChats.push(newItem);
                                                            }
                                                        );
                                                    }).then(()=>{
                                                        client.join(Decodeddata.OrderProductID);
                                                        callbackFn(JSON.stringify(newChats));
                                                    });

                                                });
                                            })


                                        }
                                    });

                                }catch(e)
                                {
                                    callbackFn(JSON.stringify({"message":"expired token"}));
                                }
                            } else {
                                callbackFn(JSON.stringify({"message":"order product id is wrong"}));
                            }
                        }
                    );
                }
            }catch (e) {

                callbackFn(JSON.stringify({"message":"500"}));

            }


        });

        client.on('sendMessage' , (data,callbackFn) => {

            function checkToken(token, callback) {

                if (token != null) {
                    try {
                        var decodedJWT = jwt.decode(token, JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username && decodedJWT.PhoneNumber && decodedJWT.OwnerPhoneNumber)) {
                            callback({HttpCode: 400, response: {"code": 700}});
                        }
                        else {
                            var searchQuery;
                            if (decodedJWT.Username != null) {
                                searchQuery = {
                                    where: {
                                        Username: decodedJWT.Username, Password: decodedJWT.Password
                                    }
                                };
                                callback("",searchQuery);
                            }
                            else if (decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) {
                                if (decodedJWT.PhoneNumber != null) {
                                    searchQuery = {
                                        where: {
                                            PhoneNumber: decodedJWT.PhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                } else {
                                    searchQuery = {
                                        where: {
                                            OwnerPhoneNumber: decodedJWT.OwnerPhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                }
                                callback("",searchQuery);
                            }
                            else {
                                callback({HttpCode: 400, response: {"code": 700}});
                            }

                        }
                    }
                    catch (err) {
                        callback({HttpCode: 400, response: {"code": 700}});
                    }


                }
                else {
                    callback({HttpCode: 400, response: {"code": 703}});
                }

            }
            try {
                var Decodeddata = JSON.parse(JSON.stringify(data));
                if (Decodeddata.token ==null || Decodeddata.OrderProductID == null || Decodeddata.Message == null){
                    client.send(JSON.stringify({"message":"parameters not sended"}));
                } else {
                    orderProduct.findOne({where:{ID:Decodeddata.OrderProductID}}).then(
                        orderProduct=>{
                            if (orderProduct != null){
                                try{
                                    var role = "";
                                    checkToken(Decodeddata.token, (err, data) => {
                                        if (err) {
                                            callbackFn(JSON.stringify({"message":"expired token"}));
                                        }
                                        else {


                                            var Entity = "";
                                            checkUser(data, customer, (newErr, newData1) => {
                                                if (newErr) {
                                                    checkUser(data,Seller , (newErr, newData) => {
                                                        if (newErr) {
                                                            callbackFn(JSON.stringify({"message":"expired token"}));
                                                        }
                                                        else {
                                                            if (newData.Enabled) {
                                                                role ="seller";
                                                                Entity = newData;
                                                            }else {callbackFn(JSON.stringify({"message":"entity is disable"}));}
                                                        }
                                                    })
                                                }
                                                else {
                                                    if (newData1.Enabled) {
                                                        role ="customer";
                                                        Entity = newData1;
                                                    }else {callbackFn(JSON.stringify({"message":"entity is disable"}));}
                                                }
                                                var role2 ="" ;
                                                if (role === "customer")  role2 ="seller";
                                                if (role === "seller")  role2 ="customer";

                                                orderProduct.findOne({where:{ID:Decodeddata.OrderProductID}}).then(orderProduct=>{
                                                    sellerOperator.findAll({where:{SellerID:orderProduct.SellerID}}).then(

                                                        support=>{
                                                            function randomIntInc(low, high) {
                                                                return Math.floor(Math.random() * (high - low + 1) + low)
                                                            }
                                                            var operator = randomIntInc(0,support.length);
                                                            sequelize.transaction().then(function (t) {
                                                                ChatOnOrderProduct.create({

                                                                    OrderProdutID: Decodeddata.OrderProductID,
                                                                    FromID : newData1.ID,
                                                                    FromRole:role,
                                                                    ToID :operator.ID ,
                                                                    ToRole: role2,
                                                                    SeenStatus: false,
                                                                    Message:Decodeddata.Message


                                                                }, {
                                                                    transaction: t
                                                                }).then(savedChat => {
                                                                    t.commit();
                                                                    client.in(Decodeddata.OrderProductID).emit("id", {chat:savedChat});
                                                                    callbackFn(JSON.stringify({"message":"done"}));


                                                                }).catch(function (error) {
                                                                    t.rollback();
                                                                    callbackFn(JSON.stringify({"message":"500"}));
                                                                });
                                                            });

                                                        }
                                                    )
                                                });

                                            })


                                        }
                                    });

                                }catch(e)
                                {
                                    callbackFn(JSON.stringify({"message":"expired token"}));
                                }
                            } else {
                                callbackFn(JSON.stringify({"message":"order product id is wrong"}));
                            }
                        }
                    );
                }
            }catch (e) {
                console.log(e)
                callbackFn(JSON.stringify({"message":"500"}));

            }


        });

        client.on('seen' , (data,callbackFn) => {

            function checkToken(token, callback) {

                if (token != null) {
                    try {
                        var decodedJWT = jwt.decode(token, JWT_SECRET);
                        if (decodedJWT.Password == null || (decodedJWT.username && decodedJWT.PhoneNumber && decodedJWT.OwnerPhoneNumber)) {
                            callback({HttpCode: 400, response: {"code": 700}});
                        }
                        else {
                            var searchQuery;
                            if (decodedJWT.Username != null) {
                                searchQuery = {
                                    where: {
                                        Username: decodedJWT.Username, Password: decodedJWT.Password
                                    }
                                };
                                callback("",searchQuery);
                            }
                            else if (decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) {
                                if (decodedJWT.PhoneNumber != null) {
                                    searchQuery = {
                                        where: {
                                            PhoneNumber: decodedJWT.PhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                } else {
                                    searchQuery = {
                                        where: {
                                            OwnerPhoneNumber: decodedJWT.OwnerPhoneNumber, Password: decodedJWT.Password
                                        }
                                    };
                                }
                                callback("",searchQuery);
                            }
                            else {
                                callback({HttpCode: 400, response: {"code": 700}});
                            }

                        }
                    }
                    catch (err) {
                        callback({HttpCode: 400, response: {"code": 700}});
                    }


                }
                else {
                    callback({HttpCode: 400, response: {"code": 703}});
                }

            }
            try {
                var Decodeddata = JSON.parse(JSON.stringify(data));
                if (Decodeddata.token ==null || Decodeddata.OrderProductID == null , Decodeddata.ChatID == null){
                    client.send(JSON.stringify({"message":"parameters not sended"}));
                } else {
                    orderProduct.findOne({where:{ID:Decodeddata.OrderProductID}}).then(
                        orderProduct=>{
                            if (orderProduct != null){
                                try{
                                    checkToken(Decodeddata.token, (err, data) => {
                                        if (err) {
                                            callbackFn(JSON.stringify({"message":"expired token"}));
                                        }
                                        else {


                                            var Entity = "";
                                            checkUser(data, customer, (newErr, newData1) => {
                                                if (newErr) {
                                                    checkUser(data,Seller , (newErr, newData) => {
                                                        if (newErr) {
                                                            callbackFn(JSON.stringify({"message":"expired token"}));
                                                        }
                                                        else {
                                                            if (newData.Enabled) {
                                                                Entity = newData;
                                                            }else {callbackFn(JSON.stringify({"message":"entity is disable"}));}
                                                        }
                                                    })
                                                }
                                                else {
                                                    if (newData1.Enabled) {
                                                        Entity = newData1;
                                                    }else {callbackFn(JSON.stringify({"message":"entity is disable"}));}
                                                }

                                                sequelize.transaction().then(function (t) {
                                                    ChatOnOrderProduct.update({
                                                        SeenStatus:true
                                                    },{where:{ID: Decodeddata.ChatID}}, {
                                                        transaction: t
                                                    }).then(savedChat => {
                                                        t.commit();
                                                        client.in(Decodeddata.OrderProductID).emit("id", {chat:savedChat});
                                                        callbackFn(JSON.stringify({"message":"done"}));

                                                    }).catch(function (error) {
                                                        t.rollback();
                                                        callbackFn(JSON.stringify({"message":"500"}));
                                                    });
                                                });

                                            })


                                        }
                                    });

                                }catch(e)
                                {
                                    callbackFn(JSON.stringify({"message":"expired token"}));
                                }
                            } else {
                                callbackFn(JSON.stringify({"message":"order product id is wrong"}));
                            }
                        }
                    );
                }
            }catch (e) {
                console.log(e)
                callbackFn(JSON.stringify({"message":"500"}));

            }


        });



    });
    server.listen(SocketServerPort);
    console.log(colors.bg.Black, colors.fg.White ,"socket server is up in port : "+ SocketServerPort,colors.Reset)



}

else if (cluster.isWorker){

    app.get('/', function(req, res){
        res.send('pachalChi server is running ...' + cluster.worker.id);
    });



    var port = ServerPort ;
     app.listen(port, () => {
        console.log(colors.bg.Black, colors.fg.White ,"worker with id = "+cluster.worker.id+" start working.",  colors.Reset);
    });


}











