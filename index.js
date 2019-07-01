const {colors, ServerPort, SocketServerPort, DataBaseStatus, DevelopMode} = require('./src/Util/configuration');
const {sequelize, ChatOnOrderProduct, transportation, TransportationManager, SellerProductionManager, customer, Seller, orderProduct, sellerOperator} = require('./sequelize');
const {fillDataBase, sendOnTelegramChannel} = require('./src/Util/Filter');
const cron = require("node-cron");
const fs = require("fs");
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {BaseUrl, JWT_SECRET} = require('./src/Util/configuration');
const cors = require('cors');
const jwt = require('jwt-simple');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'Log/access.log'), {flags: 'a', interval: '1d'});
const zipFolder = require('zip-folder');
const os = require('os');
const request = require('request');
const server = require('http').createServer();
const io = require('socket.io')(server);
const compression = require('compression');
global.globalVariable = {io: io};
process.env.NODE_ENV = 'production';
io.set('origins', '*:*');


server.listen(SocketServerPort);
console.log(colors.bg.Black, colors.fg.White, "socket server is up in port : " + SocketServerPort, colors.Reset)

io.on('connection', client => {

    function checkUser(EncodedToken, Entity, callback) {

        Entity.findOne(EncodedToken).then(user => {
            if (user != null) {
                callback("", user);
            } else {
                callback({HttpCode: 400, response: {"code": 700}});
            }
        }).catch(() => {
            callback({HttpCode: 400, response: {"code": 700}});
        })


    }


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
                        callback("", searchQuery);
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
                        callback("", searchQuery);
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

    client.on('disconnect', function () {
        try {
            client.Entity.findOne({where: {SocketID: client.id}}).then(user => {
                if (user != null) {
                    user.update({SocketID: null, Status: false});
                }
            })
        } catch (e) {

        }
    });

    client.on('online', (data) => {

        try {
            var Decodeddata = JSON.parse(data);
            if (Decodeddata.token == null || Decodeddata.Role == null) {
                client.emit('onlineAnswer', JSON.stringify({"code": "703"}));
            } else {
                var Entity = '';
                switch (Decodeddata.Role) {
                    case "seller":
                        Entity = Seller;
                        break;
                    case  "customer":
                        Entity = customer;
                        break;
                    case "transportation" :
                        Entity = transportation;
                        break;
                    case "sellerOperator"   :
                        Entity = sellerOperator;
                        break;
                    case "productionManager":
                        Entity = SellerProductionManager;
                        break;
                    case "transportationManager":
                        Entity = TransportationManager;
                        break;
                    default :
                        client.emit('onlineAnswer', JSON.stringify({"code": "716"}));
                }

                checkToken(Decodeddata.token, (err, data) => {
                    if (err) {
                        console.log(err);
                        client.emit('onlineAnswer', JSON.stringify({"code": "700"}));
                    }
                    else {
                        checkUser(data, Entity, (newErr, newData1) => {
                            if (newErr) {
                                console.log(newErr);
                                client.emit('onlineAnswer', JSON.stringify({"code": "700"}));
                            }
                            else {
                                newData1.update({Status: true, SocketID: client.id}).then(() => {
                                    client.Entity = newData1;
                                    client.emit('onlineAnswer', JSON.stringify({"code": "200"}));
                                });
                            }


                        })


                    }
                });


            }
        }
        catch (e) {
            client.emit('onlineAnswer', JSON.stringify({"code": "500"}));
        }


    });

    client.on('checkToken', (data) => {


        try {
            var Decodeddata = JSON.parse(data);
            if (Decodeddata.token == null || Decodeddata.OrderProductID == null) {
                client.emit('tokenCheckAnswer', JSON.stringify({"code": "703"}));
            } else {
                orderProduct.findOne({where: {ID: Decodeddata.OrderProductID}}).then(
                    orderProduct => {
                        if (orderProduct != null) {
                            try {
                                checkToken(Decodeddata.token, (err, data) => {
                                    if (err) {
                                        client.emit('tokenCheckAnswer', JSON.stringify({"code": "700"}));
                                    }
                                    else {


                                        var Entity = "";
                                        checkUser(data, customer, (newErr, newData1) => {
                                            if (newErr) {
                                                checkUser(data, Seller, (newErr, newData) => {
                                                    if (newErr) {
                                                        checkUser(data, sellerOperator, (newErr, newData2) => {
                                                            if (newErr) {
                                                                client.emit('tokenCheckAnswer', JSON.stringify({"code": "700"}));
                                                            }
                                                            else {
                                                                Entity = newData2;
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        Entity = newData;
                                                    }
                                                })
                                            }
                                            else {
                                                Entity = newData1;
                                            }
                                            const asyncForEach = require('async-await-foreach');

                                            ChatOnOrderProduct.findAll({where: {OrderProdutID: Decodeddata.OrderProductID}}).then(async chats => {
                                                var newChats = [];

                                                asyncForEach(chats, async item => {
                                                    var OperatorID = "";
                                                    if (item.FromRole) {
                                                        OperatorID = item.FromID
                                                    }
                                                    else {
                                                        OperatorID = item.ToID
                                                    }
                                                    await sellerOperator.findOne({where: {ID: OperatorID}}).then(
                                                        async operator => {
                                                            var newItem = {
                                                                operatorImage: operator.Image,
                                                                FromRole: item.FromRole,
                                                                ToRole: item.ToRole,
                                                                FromID: item.FromID,
                                                                ToID: item.ToID,
                                                                SeenStatus: item.SeenStatus,
                                                                Message: item.Message,
                                                                OperatorName: operator.Name,
                                                                OperatorImage: operator.Image || null

                                                            };
                                                            await newChats.push(newItem);
                                                        }
                                                    );
                                                }).then(() => {
                                                    client.join(Decodeddata.OrderProductID);
                                                    client.emit('tokenCheckAnswer', JSON.stringify(newChats));
                                                });

                                            });
                                        })


                                    }
                                });

                            } catch (e) {
                                client.emit('tokenCheckAnswer', JSON.stringify({"code": "700"}));
                            }
                        } else {
                            client.emit('tokenCheckAnswer', JSON.stringify({"code": "718"}));
                        }
                    }
                );
            }
        } catch (e) {
            client.emit('tokenCheckAnswer', JSON.stringify({"message": "500"}));
        }


    });

    client.on('sendMessage', (data) => {


        try {
            var Decodeddata = JSON.parse(data);
            if (Decodeddata.token == null || Decodeddata.OrderProductID == null || Decodeddata.Message == null) {
                client.emit('sendMessageAnswer', JSON.stringify({"code": "703"}));
            } else {
                orderProduct.findOne({where: {ID: Decodeddata.OrderProductID}}).then(
                    async orderProductss => {
                        if (orderProductss != null) {
                            try {
                                var role = "";
                                await checkToken(Decodeddata.token, async (err, data) => {
                                    if (err) {
                                        client.emit('sendMessageAnswer', JSON.stringify({"code": "700"}));
                                    }
                                    else {


                                        var Entity = "";
                                        await checkUser(data, customer, async (newErr, newData1) => {
                                            if (newErr) {
                                                await checkUser(data, Seller, async (newErr, newData) => {
                                                    if (newErr) {
                                                        await checkUser(data, sellerOperator, async (newErr, newData2) => {
                                                            if (newErr) {
                                                                client.emit('sendMessageAnswer', JSON.stringify({"code": "700"}));
                                                            }
                                                            else {
                                                                role = true;
                                                                Entity = newData2;
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        role = true;
                                                        Entity = newData;
                                                    }
                                                })
                                            }
                                            else {
                                                role = false;
                                                Entity = newData1;
                                            }

                                            orderProduct.findOne({where: {ID: Decodeddata.OrderProductID}}).then(orderProducts => {
                                                sellerOperator.findAll({where: {ID: orderProducts.SellerOperatorID}}).then(
                                                    support => {
                                                        function randomIntInc(low, high) {
                                                            return Math.floor(Math.random() * (high - low + 1) + low)
                                                        }

                                                        var counter = randomIntInc(0, support.length - 1);
                                                        sequelize.transaction().then(function (t) {
                                                            ChatOnOrderProduct.create({

                                                                OrderProdutID: Decodeddata.OrderProductID,
                                                                FromID: Entity.ID,
                                                                FromRole: role,
                                                                ToID: support[counter].ID || null,
                                                                ToRole: false,
                                                                SeenStatus: false,
                                                                Message: Decodeddata.Message


                                                            }, {
                                                                transaction: t
                                                            }).then(savedChat => {
                                                                t.commit();
                                                                client.emit('sendMessageAnswer', JSON.stringify({"code": "200"}));
                                                                globalVariable.io.to(Decodeddata.OrderProductID).emit("newMessage", {"Message": savedChat});


                                                            }).catch(function (error) {
                                                                t.rollback();
                                                                client.emit('sendMessageAnswer', JSON.stringify({"message": "500"}));
                                                            });
                                                        });

                                                    }
                                                )
                                            });

                                        })


                                    }
                                });

                            } catch (e) {
                                client.emit('sendMessageAnswer', JSON.stringify({"code": "700"}));
                            }
                        } else {
                            client.emit('sendMessageAnswer', JSON.stringify({"code": "718"}));
                        }
                    }
                );
            }
        } catch (e) {
            client.emit('sendMessageAnswer', JSON.stringify({"message": "500"}));
        }


    });

    client.on('seen', (data) => {

        try {
            var Decodeddata = JSON.parse(JSON.stringify(data));
            if (Decodeddata.token == null || Decodeddata.OrderProductID == null , Decodeddata.ChatID == null) {
                client.send(JSON.stringify({"code": "703"}));
            } else {
                orderProduct.findOne({where: {ID: Decodeddata.OrderProductID}}).then(
                    orderProduct => {
                        if (orderProduct != null) {
                            try {
                                checkToken(Decodeddata.token, (err, data) => {
                                    if (err) {
                                        callbackFn(JSON.stringify({"code": "700"}));
                                    }
                                    else {


                                        var Entity = "";
                                        checkUser(data, customer, (newErr, newData1) => {
                                            if (newErr) {
                                                checkUser(data, Seller, (newErr, newData) => {
                                                    if (newErr) {
                                                        checkUser(data, sellerOperator, (newErr, newData) => {
                                                            if (newErr) {
                                                                callbackFn(JSON.stringify({"code": "700"}));
                                                            }
                                                            else {
                                                                Entity = newData;
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        Entity = newData;
                                                    }
                                                })
                                            }
                                            else {
                                                Entity = newData1;
                                            }

                                            sequelize.transaction().then(function (t) {
                                                ChatOnOrderProduct.update({
                                                    SeenStatus: true
                                                }, {where: {ID: Decodeddata.ChatID}}, {
                                                    transaction: t
                                                }).then(savedChat => {
                                                    t.commit();
                                                    client.in(Decodeddata.OrderProductID).emit("id", {chat: savedChat});
                                                    callbackFn(JSON.stringify({"code": "200"}));

                                                }).catch(function (error) {
                                                    t.rollback();
                                                    callbackFn(JSON.stringify({"code": "500"}));
                                                });
                                            });

                                        })


                                    }
                                });

                            } catch (e) {
                                callbackFn(JSON.stringify({"code": "700"}));
                            }
                        } else {
                            callbackFn(JSON.stringify({"code": "718"}));
                        }
                    }
                );
            }
        } catch (e) {
            callbackFn(JSON.stringify({"message": "500"}));

        }


    });


});


cron.schedule("59 23 * * *", function () {

    try {
        var BackUpFileName = new Date().toISOString().slice(0, 10).toString();

        zipFolder(path.join(__dirname, '/uploads/'), path.join(__dirname, '/BackUp/') + BackUpFileName + '-images.zip', function (err) {
            if (err) {
                sendOnTelegramChannel("فراند بکاپ شبانه در تاریخ " + new Date() + " با شکست مواجه شد");
            } else {
                zipFolder(path.join(__dirname, '/Log/'), path.join(__dirname, '/BackUp/') + BackUpFileName + '-logs.zip', function (err) {
                    if (err) {
                        sendOnTelegramChannel("فراند بکاپ شبانه در تاریخ " + new Date() + " با شکست مواجه شد");
                    } else {
                        zipFolder(path.join(__dirname, '/BackUp/'), path.join(__dirname, '/BackUp/') + BackUpFileName + '-backup.zip', function (err) {
                            if (err) {
                                sendOnTelegramChannel("فراند بکاپ شبانه در تاریخ " + BackUpFileName + " با شکست مواجه شد");
                            } else {
                                fs.unlink(path.join(__dirname, '/BackUp/') + BackUpFileName + '-logs.zip', (err) => {
                                    fs.unlink(path.join(__dirname, '/BackUp/') + BackUpFileName + '-images.zip', (err) => {
                                        fs.truncate(path.join(__dirname, '/Log/access.log'), 0, function () {

                                            var access_token = "yn0joM0ZKHAAAAAAAAAAFHbGWHz2REkiknt2_lqjHq5qQt78uj-SqryQYaEfvp2v";
                                            var filename = BackUpFileName + '-images.zip';
                                            var content = fs.readFileSync(path.join(__dirname, '/BackUp/') + BackUpFileName + '-backup.zip');
                                            let optionss = {
                                                method: "POST",
                                                url: 'https://content.dropboxapi.com/2/files/upload',
                                                headers: {
                                                    "Content-Type": "application/octet-stream",
                                                    "Authorization": "Bearer " + access_token,
                                                    "Dropbox-API-Arg": "{\"path\": \"/backUps/" + BackUpFileName + '-backup.zip' + "\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false}",
                                                },
                                                body: content
                                            };

                                            request(optionss, function (err, res, body) {
                                                fs.unlink(path.join(__dirname, '/BackUp/') + BackUpFileName + '-backup.zip', (err) => {
                                                });
                                                if (err) {
                                                    sendOnTelegramChannel("فراند بکاپ شبانه در تاریخ " + BackUpFileName + " با شکست مواجه شد");
                                                } else {
                                                    sendOnTelegramChannel("فراند بکاپ شبانه در تاریخ " + BackUpFileName + " با موفقیت انجام شد");

                                                }
                                            });
                                        })
                                    });
                                });

                            }
                        });

                    }
                });

            }
        });
    } catch (e) {
        console.log(e)
    }


});
cron.schedule('30 * * * *', () => {
    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    };
    var time = process.uptime();
    var uptime = (time + "").toHHMMSS();
    var text =
        "  مدت زمان عمر سرور:" + uptime + "\r\n" +
        "  تعداد هسته های پردازنده:" + os.cpus().length + "\r\n" +
        " مموری سیستم عامل:" + os.totalmem() + "\r\n" +
        " مموری آزاد سیستم:" + os.freemem() + "\r\n" + "\r\n" + "\r\n" +
        "<a href='148.251.173.45:2424/telegramStatus'>گرفتن گزارش لحظه ای</a>";

    sendOnTelegramChannel(text);

});


sequelize.authenticate().then(() => {
        console.log(colors.bg.Black, colors.fg.White, 'Connection has been established successfully.', colors.Reset);
        if (DataBaseStatus === "create-drop") {
            sequelize.sync({force: true})
                .then(() => {
                    console.log(colors.bg.Black, colors.fg.White, `DataBase create-dropped `, colors.Reset);
                    if (DevelopMode) {
                        fillDataBase();
                        console.log(colors.bg.Black, colors.fg.White, `starting import demo data : `, colors.Reset);
                    }
                });
        }
        else if (DataBaseStatus === "update") {
            sequelize.sync({force: false})
                .then(() => {
                    console.log(colors.bg.Black, colors.fg.White, `Database Updated`, colors.Reset);
                });
        }
    });


app.listen(ServerPort, () => {
    console.log(colors.bg.Black, colors.fg.White, "Api Server is up in port : " + ServerPort, colors.Reset);
});
app.get('/', function (req, res) {
    res.send('pachalChi server is running ...');
});
app.get('/telegramStatus', function (req, res) {
    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    };
    var time = process.uptime();
    var uptime = (time + "").toHHMMSS();
    var text =
        "  مدت زمان عمر سرور:" + uptime + "\r\n" +
        "  تعداد هسته های پردازنده:" + os.cpus().length + "\r\n" +
        " مموری سیستم عامل:" + os.totalmem() + "\r\n" +
        " مموری آزاد سیستم:" + os.freemem() + "\r\n" + "\r\n" + "\r\n" + "\r\n" +
        "<a href='148.251.173.45:2424/telegramStatus'>گرفتن گزارش لحظه ای</a>";

    sendOnTelegramChannel(text);
    return res.json({message: "گزارش ارسال شد"});
});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(cors());
//app.use(compression);
app.use(helmet());

if (new Date().getDay() === 5 ) {

    app.post('*', (req, res) => {
        return res.status(400).json({"code": "727"})
    });
    app.put('*', (req, res) => {
        return res.status(400).json({"code": "727"})
    });
    app.use(BaseUrl + '/application', require('./src/Controller/AppController'));
    app.use(BaseUrl + '/sellerOperator', require('./src/Controller/sellerOperatorController'));
    app.use(BaseUrl + '/pachalChi', require('./src/Controller/PachalchiController'));
    app.use(BaseUrl + '/customer', require('./src/Controller/CustomerController'));
    app.use(BaseUrl + '/auth', require('./src/Controller/AuthController'));
    app.use(BaseUrl + '/seller', require('./src/Controller/SellerController'));
    app.use(BaseUrl + '/transportationManager', require('./src/Controller/TransportationManagerController'));
    app.use(BaseUrl + '/transportation', require('./src/Controller/transportationController'));
    app.use(BaseUrl + '/productManager', require('./src/Controller/ProductManagerController'));

} else {


    app.use(BaseUrl + '/application', require('./src/Controller/AppController'));
    app.use(BaseUrl + '/sellerOperator', require('./src/Controller/sellerOperatorController'));
    app.use(BaseUrl + '/customer', require('./src/Controller/CustomerController'));
    app.use(BaseUrl + '/pachalChi', require('./src/Controller/PachalchiController'));
    app.use(BaseUrl + '/auth', require('./src/Controller/AuthController'));
    app.use(BaseUrl + '/seller', require('./src/Controller/SellerController'));
    app.use(BaseUrl + '/transportationManager', require('./src/Controller/TransportationManagerController'));
    app.use(BaseUrl + '/transportation', require('./src/Controller/transportationController'));
    app.use(BaseUrl + '/productManager', require('./src/Controller/ProductManagerController'));


}














