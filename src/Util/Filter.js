const {cities, application, sellerType, Sequelize, AlarmsOnSellerProducts, TransportationManager, orderPardakht, SellerProductsInServiceCitie, orderProduct, sequelize, PriceAndSupply, sellerProducts, customer, Order, addresses, Seller, ProductCategories, sellerPhoneNumber, SellerProductionManager, sellerOperator, sellerWareHouse,pachalChiAdminSupports, transportation, products, unit, car} = require('../../sequelize');
const {colors, PHONENUMBER_REGEX, TimeLimit,MonjamedVaredatiTimeLimit, ImageLimitSize, AlramMessages, ValidImageFormat, UplodDirs, TokenExpiredTimeLimit, PASSWORD_REGEX, USERNAME_REGEX, JWT_SECRET} = require('./configuration');
const jwt = require('jwt-simple');
const path = require('path');
const fs = require("fs");
const md5 = require('md5');
var request = require('request');
const asyncForEach = require('async-await-foreach');
const Op = Sequelize.Op;


function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString('base64');
}

function fillDataBase() {

    function insertCities(value, index, array) {
        cities.create(
            {

                ID: value.ID,
                Name: value.Name
            }
        ).catch(err => {
            console.log(err)
        });
    }

    function insertTypes(value, index, array) {
        sellerType.create(
            {

                ID: value.ID,
                Type: value.Type
            }
        ).catch(err => {
            console.log(err)
        });
    }

    function insertProductCategories(value, index, array) {
        ProductCategories.create(
            {
                ID: value.ID,
                Name: value.Name
            }
        ).catch(err => {
            console.log(err)
        });
    }

    function insertProducts(value, index, array) {
        products.create(
            {

                ID: value.ID,
                Name: value.Name,
                CategoryID: value.CategoryID,
                Type: null || value.Type,
                ParentID: value.ParentID
            }
        ).catch(err => {
            console.log(err)
        });
    }

    function insertUnits(value, index, array) {
        unit.create(
            {
                ID: value.ID,
                UnitName: value.UnitName
            }
        ).catch(err => {
            console.log(err)
        });
    }

    function insertCarModels(value, index, array) {
        car.create(
            {
                ID: value.ID,
                Name: value.Name,
                ParentID: value.ParentID
            }
        ).catch(err => {
            console.log(err)
        });
    }

    var city = [
        {ID: 1, Name: "آذربایجان شرقی"},
        {ID: 2, Name: "اردبیل"},
        {ID: 3, Name: "اصفهان"},
        {ID: 4, Name: "البرز"},
        {ID: 5, Name: "ایلام"},
        {ID: 6, Name: "بوشهر"},
        {ID: 7, Name: "تهران"},
        {ID: 8, Name: "چهارمحال و بختیاری"},
        {ID: 9, Name: "خراسان جنوبی"},
        {ID: 10, Name: "خراسان رضوی"},
        {ID: 11, Name: "خراسان شمالی"},
        {ID: 12, Name: "خوزستان"},
        {ID: 13, Name: "زنجان"},
        {ID: 14, Name: "سمنان"},
        {ID: 15, Name: "سیستان و بلوچستان"},
        {ID: 16, Name: "فارس"},
        {ID: 17, Name: "قزوین"},
        {ID: 18, Name: "قم"},
        {ID: 19, Name: "کردستان"},
        {ID: 20, Name: "کرمان"},
        {ID: 21, Name: "کرمانشاه"},
        {ID: 22, Name: "کهگیلویه و بویراحمد"},
        {ID: 23, Name: "گلستان"},
        {ID: 24, Name: "گیلان"},
        {ID: 25, Name: "لرستان"},
        {ID: 26, Name: "مازندران"},
        {ID: 27, Name: "مرکزی"},
        {ID: 28, Name: "هرمزگان"},
        {ID: 29, Name: "همدان"},
        {ID: 30, Name: "یزد"},
        {ID: 31, Name: "آذربایجان شرقی"}


    ];
    cities.findAll().then(cities => {
        if (cities[0] == undefined) {
            city.forEach(insertCities);
            console.log(colors.bg.Black, colors.fg.White, "import  city demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import city demo data canceled .", colors.Reset);
        }
    });

    var type = [
        {ID: 1, Type: "شرکت اصلی"},
        {ID: 2, Type: "نماینده فروش"}

    ];
    sellerType.findAll().then(sellerType => {
        if (sellerType[0] === undefined) {
            type.forEach(insertTypes);
            console.log(colors.bg.Black, colors.fg.White, "import  SellerType demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import SellerType demo data canceled .", colors.Reset);
        }
    });

    var carModelvar = [
        {ID: 1, Name: "نیسان", ParentID: null},
        {ID: 2, Name: "پیکان وانت", ParentID: null},
        {ID: 3, Name: "نیسان یخچال دار", ParentID: null},
        {ID: 4, Name: "پراید وانت", ParentID: null},
        {ID: 5, Name: "پرشیا وانت", ParentID: null},
        {ID: 6, Name: "کامیون یخچال دار", ParentID: null}
    ];
    car.findAll().then(car => {
        if (car[0] === undefined) {
            carModelvar.forEach(insertCarModels);
            console.log(colors.bg.Black, colors.fg.White, "import  car model demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import car model demo data canceled .", colors.Reset);
        }
    });

    var unitvar = [
        {ID: 1, UnitName: "گرم"},
        {ID: 2, UnitName: "کیلو گرم"},
        {ID: 3, UnitName: "تن"},
        {ID: 4, UnitName: "پوند"},
        {ID: 5, UnitName: "میکرو گرم"},
        {ID: 6, UnitName: "اونس"},
        {ID: 7, UnitName: "مثقال"},
        {ID: 8, UnitName: "سیر"},
        {ID: 9, UnitName: "چارک"},

    ];
    unit.findAll().then(unit => {
        if (unit[0] === undefined) {
            unitvar.forEach(insertUnits);
            console.log(colors.bg.Black, colors.fg.White, "import unit demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import unit demo data canceled .", colors.Reset);
        }
    });

    var ProductCategoriesvar = [

        {ID: 8, Name: "گوساله"},

        {ID: 7, Name: "گوسفند"},

        {ID: 6, Name: "مرغ"},

        {ID: 5, Name: "ماهی"},

        {ID: 4, Name: "منجمد وارداتی"},

        {ID: 3, Name: "فراورده پروتئینی"},

        {ID: 2, Name: "فراورده منجمد"},

        {ID: 1, Name: "مرینت ها"},



    ];
    ProductCategories.findAll().then(productsgroup => {
        if (productsgroup[0] === undefined) {
            ProductCategoriesvar.forEach(insertProductCategories);
            console.log(colors.bg.Black, colors.fg.White, "import  products Group demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import  products Group demo data canceled .", colors.Reset);
        }
    });

    var productsvar = [

        {ID: "1", Name: "خرده گوساله", CategoryID: "8", Type: "0", ParentID: null},
        {ID: "2", Name: "خرده گوساله", CategoryID: "8", Type: "1", ParentID: null},
        {ID: "3", Name: "قلوه گاه گوساله", CategoryID: "8", Type: "0", ParentID: null},
        {ID: "4", Name: "قلوه گاه گوساله", CategoryID: "8", Type: "1", ParentID: null}



    ];
    products.findAll().then(products => {
        if (products[0] === undefined) {
            productsvar.forEach(insertProducts);
            console.log(colors.bg.Black, colors.fg.White, "import  products  demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import  products  demo data canceled .", colors.Reset);
        }
    });

    application.findAll().then(app => {
        if (app[0] === undefined) {
            application.create({
                "ID": "1",
                "ClientVersion": "1.0.0",
                "UpdateLink": "1.0.0",
                "UpdateMessage": "1.0.0"
            }).then(
                console.log(colors.bg.Black, colors.fg.White, "import  app  demo data done successfuly", colors.Reset)
            );
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import  app  demo data canceled .", colors.Reset);
        }
    });


}

function isThisArrayEmpty(array) {
    return array[0] === undefined;

}

function checkPhone(req, res) {
    if (req.body.PhoneNumber != null) {
        var pattern = new RegExp(PHONENUMBER_REGEX);
        var status = pattern.test(req.body.PhoneNumber);
        if (!status) {
            res.status(400).json({"code": 711});
            return false;
        } else {
            return true;
        }

    } else return true;

}

function checkPassword(req, res) {
    if (req.body.Password != null) {
        var pattern = new RegExp(PASSWORD_REGEX);
        var status = pattern.test(req.body.Password);
        if (!status) {
            res.status(400).json({"code": 712});
            return false;
        } else {
            return true;
        }


    } else return true;

}

function sendOnTelegramChannel(text) {

    var telegramBotToken = "bot648430167:AAHJ-kftpADIrG4-AR-cZqsV9YrzrFH3UPw";
    var telegramchannelid ="@PachalChiStatus";
    var URL = "https://api.telegram.org/"+telegramBotToken+"/sendMessage?chat_id="+telegramchannelid+"&text="+text+ "&parse_mode=html";
    request(encodeURI(URL), function (error, response, body) {
    });

}

function checkUserName(req, res) {
    if (req.body.Username != null) {
        var pattern = new RegExp(USERNAME_REGEX);
        var status = pattern.test(req.body.Username);
        if (!status) {
            res.status(400).json({"code": 713});
            return false;
        } else {
            return true;
        }

    } else return true;

}

function checkToken(req, res, callback) {

    if (req.headers['token'] != null) {
        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.Password == null || (decodedJWT.Username && decodedJWT.PhoneNumber && decodedJWT.OwnerPhoneNumber)) {
                callback({HttpCode: 400, response: {"code": 700}});
            }
            else {
                var searchQuery;
                if (decodedJWT.Username != null) {
                    searchQuery = {
                        where: {
                            Username: decodedJWT.Username.toLowerCase(), Password: decodedJWT.Password
                        }
                    };
                    if (parseInt(new Date().getTime - decodedJWT.Date) >= parseInt(TokenExpiredTimeLimit)) {
                        callback({HttpCode: 400, response: {"code": 700}});
                    } else {
                        callback("", searchQuery);
                    }

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
                    if (parseInt(new Date().getTime - decodedJWT.Date) >= parseInt(TokenExpiredTimeLimit)) {
                        callback({HttpCode: 400, response: {"code": 700}});
                    } else {
                        callback("", searchQuery);
                    }
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

function checkLimitTime(res, callback) {
    var date = new Date();
    var current_hour = date.getHours();
    if ((parseInt(TimeLimit.start) < parseInt(current_hour)) && (current_hour < parseInt(TimeLimit.finish))) {
        callback("", true);
    } else {
        callback({HttpCode: 404, response: {"code": 714}});
    }
}

function CheckForeignKey(res, array) {
    return new Promise((resolve) => {
        var status = true;
        array.forEach((value) => {
            if (value.ID == null || value.Entity == null) {
                status = false;
                console.log("incomming array is not in the ideal style");
            }
        });
        asyncForEach(array, async item => {
            await item.Entity.findOne({where: {ID: item.ID}}).then(Model => {
                if (Model == null) {

                    status = false;
                }
            });
        }).then(() => {
            resolve(status);
            if (!status) return res.status(400).json({"code": 718});

        });
    });
}

function checkUser(EncodedToken, Entity, callback) {

    Entity.findOne(EncodedToken).then(user => {
        if (user != null) {
            if (Entity !== customer && Entity !== transportation) {
                if (user.Status) {

                    if (user.Enabled) {
                        callback("", user);
                    } else {
                        callback({HttpCode: 400, response: {"code": 900}});
                    }

                } else {
                    callback({HttpCode: 400, response: {"code": 726}});
                }
            } else {
                if (user.Enabled) {
                    callback("", user);
                } else {
                    callback({HttpCode: 400, response: {"code": 900}});
                }
            }
        } else {
            callback({HttpCode: 400, response: {"code": 700}});
        }
    }).catch(() => {
        callback({HttpCode: 400, response: {"code": 700}});
    })


}

function ImageHandler(req, res, Dir) {
    return new Promise((resolve, reject) => {
        if (req.file != null) {
            if (req.file.size <= ImageLimitSize) {
                const tempPath = req.file.path;
                const targetPath = path.join(__dirname, Dir + new Date().getTime() + path.extname(req.file.originalname).toLowerCase());
                image = targetPath;
                if (ValidImageFormat.indexOf(path.extname(req.file.originalname).toLowerCase()) !== -1) {
                    fs.rename(tempPath, targetPath, function (err) {
                        if (err) {
                            fs.unlink(tempPath, () => {
                                reject(err);
                            });
                        } else {
                            fs.unlink(tempPath, () => {
                                resolve(targetPath);
                            });
                        }
                    });
                } else {
                    fs.unlink(tempPath, err => {
                        return res.status(400).json({"code": 720});
                    });
                }


            }
            else {
                return res.status(400).json({"code": 719});
            }
        } else {
            resolve("notSetYet");
        }
    });
}

function FilteringRequest(req, res, callback) {

    var Entity = "";
    var SwitchStatus = true;
    switch (req.originalUrl.substring(0, 8)) {
        case "/api/v1/":
            switch (req.originalUrl.substring(8).split("/")[0]) {

                case "auth":
                    switch (req.originalUrl.substring(8).split("/")[1]) {
                        case "tokenCheck":
                            if (req.body.Role == null || req.body.ClientVersion == null) {
                                callback({HttpCode: 400, response: {code: "703"}});
                            } else {
                                switch (req.body.Role) {
                                    case "pachalchi":
                                        Entity = pachalChiAdminSupports;
                                        break;
                                    case "seller":
                                        Entity = Seller;
                                        break;
                                    case "customer":
                                        Entity = customer;
                                        break;
                                    case "productionManager":
                                        Entity = SellerProductionManager;
                                        break;
                                    case "transportation":
                                        Entity = transportation;
                                        break;
                                    case "sellerOperator":
                                        Entity = sellerOperator;
                                        break;
                                    case "transportationManager":
                                        Entity = TransportationManager;
                                        break;
                                    default :
                                        callback({HttpCode: 400, response: {code: "716"}});

                                }
                                callback("", Entity);
                            }
                            break;
                        case "forgetPassword":
                            switch (req.originalUrl.substring(8).split("/")[2]) {
                                case "request":
                                    if (req.body.PhoneNumber != null && req.body.Role != null) {
                                        if (!checkPhone(req, res)) {
                                            callback({HttpCode: 400, response: {"code": 712}});
                                        }
                                        else {
                                            switch (req.body.Role) {
                                                case "seller":
                                                    Entity = Seller;
                                                    break;
                                                case  "customer":
                                                    Entity = customer;
                                                    break;
                                                case "transportation" :
                                                    Entity = transportation;
                                                    break;
                                                case "support"   :
                                                    Entity = sellerOperator;
                                                    break;
                                                case "wareHouse":
                                                    Entity = sellerWareHouse;
                                                    break;
                                                case "sellerOperator":
                                                    Entity = sellerOperator;
                                                    break;
                                                case "transportationManager":
                                                    Entity = TransportationManager;
                                                    break;
                                                default :
                                                    SwitchStatus = false;
                                                    callback({HttpCode: 400, response: {response: "716"}});
                                            }
                                            if (SwitchStatus) {
                                                if (req.body.Role === "seller") {

                                                    Entity.findOne({where: {OwnerPhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                        if (UserModel != null) {
                                                            if (UserModel.Enabled) {
                                                                callback("", UserModel);
                                                            } else {
                                                                callback({HttpCode: 400, response: {"code": 900}})
                                                            }
                                                        } else {
                                                            callback({HttpCode: 404, response: {"code": 710}});
                                                        }
                                                    });
                                                } else {
                                                    Entity.findOne({where: {PhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                        if (UserModel != null) {
                                                            if (UserModel.Enabled) {
                                                                callback("", UserModel);
                                                            } else {
                                                                callback({HttpCode: 400, response: {"code": 900}})
                                                            }
                                                        } else {
                                                            callback({HttpCode: 404, response: {"code": 710}});
                                                        }
                                                    });
                                                }

                                            }
                                        }
                                    } else {
                                        callback({HttpCode: 400, response: {"code": 703}});
                                    }

                                    break;
                                case "resend":
                                    if (req.body.PhoneNumber != null && req.body.Role != null) {
                                        if (!checkPhone(req, res)) {
                                            callback({HttpCode: 400, response: {"code": 712}});
                                        }
                                        else {
                                            switch (req.body.Role) {
                                                case "seller":
                                                    Entity = Seller;
                                                    break;
                                                case  "customer":
                                                    Entity = customer;
                                                    break;
                                                case "transportation" :
                                                    Entity = transportation;
                                                    break;
                                                case "support"   :
                                                    Entity = sellerOperator;
                                                    break;
                                                case "wareHouse":
                                                    Entity = sellerWareHouse;
                                                    break;
                                                case "sellerOperator":
                                                    Entity = sellerOperator;
                                                    break;
                                                case "transportationManager":
                                                    Entity = TransportationManager;
                                                    break;
                                                default :
                                                    SwitchStatus = false;
                                                    callback({HttpCode: 400, response: {response: "716"}});
                                            }
                                            if (SwitchStatus) {
                                                if (req.body.Role === "seller") {

                                                    Entity.findOne({where: {OwnerPhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                        if (UserModel != null) {
                                                            if (UserModel.Enabled) {
                                                                callback("", UserModel);
                                                            } else {
                                                                callback({HttpCode: 400, response: {"code": 900}})
                                                            }
                                                        } else {
                                                            callback({HttpCode: 404, response: {"code": 710}});
                                                        }
                                                    });
                                                } else {
                                                    Entity.findOne({where: {PhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                        if (UserModel != null) {
                                                            if (UserModel.Enabled) {
                                                                callback("", UserModel);
                                                            } else {
                                                                callback({HttpCode: 400, response: {"code": 900}})
                                                            }
                                                        } else {
                                                            callback({HttpCode: 404, response: {"code": 710}});
                                                        }
                                                    });
                                                }

                                            }
                                        }
                                    } else {
                                        callback({HttpCode: 400, response: {"code": 703}});
                                    }

                                    break;
                                case "verify":
                                    if (req.body.PhoneNumber != null && req.body.Code != null && req.body.Role != null) {

                                            if (checkPhone(req, res)) {
                                                switch (req.body.Role) {
                                                    case "seller":
                                                        Entity = Seller;
                                                        break;
                                                    case  "customer":
                                                        Entity = customer;
                                                        break;
                                                    case "transportation" :
                                                        Entity = transportation;
                                                        break;
                                                    case "support"   :
                                                        Entity = sellerOperator;
                                                        break;
                                                    case "productionManager":
                                                        Entity = SellerProductionManager;
                                                        break;
                                                    case "transportationManager":
                                                        Entity = TransportationManager;
                                                        break
                                                    default :
                                                        SwitchStatus = false;
                                                        callback({HttpCode: 400, response: {response: "716"}});
                                                }
                                                if (SwitchStatus) {
                                                    if (req.body.Role === "seller") {
                                                        Entity.findOne({where: {OwnerPhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                if (UserModel.Enabled) {
                                                                    if (UserModel.AuthCode === req.body.Code) {
                                                                        callback("", UserModel);
                                                                    } else {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {response: "715"}
                                                                        });
                                                                    }
                                                                } else {
                                                                    callback({
                                                                        HttpCode: 404,
                                                                        response: {response: "900"}
                                                                    });
                                                                }
                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }
                                                        });

                                                    }
                                                    else {
                                                        Entity.findOne({where: {PhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                if (UserModel.Status) {
                                                                    if (UserModel.AuthCode === req.body.Code) {
                                                                        callback("", UserModel);
                                                                    } else {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {response: "715"}
                                                                        });
                                                                    }
                                                                } else {
                                                                    callback({
                                                                        HttpCode: 404,
                                                                        response: {response: "900"}
                                                                    });
                                                                }
                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }
                                                        });
                                                    }
                                                }

                                            } else {
                                                callback({HttpCode: 404, response: {response: "712"}});
                                            }

                                    } else {
                                        callback({HttpCode: 404, response: {response: "703"}});
                                    }
                                    break;
                                case "changePassword":
                                    if (req.body.PhoneNumber != null && req.body.Password != null && req.body.Role != null) {
                                        if (checkPassword(req, res)) {
                                            if (checkPhone(req, res)) {
                                                switch (req.body.Role) {
                                                    case "seller":
                                                        Entity = Seller;
                                                        break;
                                                    case  "customer":
                                                        Entity = customer;
                                                        break;
                                                    case "transportation" :
                                                        Entity = transportation;
                                                        break;
                                                    case "support"   :
                                                        Entity = sellerOperator;
                                                        break;
                                                    case "productionManager":
                                                        Entity = SellerProductionManager;
                                                        break;
                                                    case "transportationManager":
                                                        Entity = TransportationManager;
                                                        break
                                                    default :
                                                        SwitchStatus = false;
                                                        callback({HttpCode: 400, response: {response: "716"}});
                                                }
                                                if (SwitchStatus) {
                                                    if (req.body.Role === "seller") {
                                                        Entity.findOne({where: {OwnerPhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                if (UserModel.Status) {
                                                                    if (UserModel.IsForgetPasswordVerified) {
                                                                        callback("", UserModel);
                                                                    } else {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {response: "721"}
                                                                        });

                                                                    }
                                                                } else {
                                                                    callback({
                                                                        HttpCode: 404,
                                                                        response: {response: "900"}
                                                                    });
                                                                }
                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }
                                                        });

                                                    }
                                                    else {
                                                        Entity.findOne({where: {PhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                if (UserModel.Status) {
                                                                    if (UserModel.IsForgetPasswordVerified) {
                                                                        callback("", UserModel);
                                                                    } else {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {response: "721"}
                                                                        });

                                                                    }
                                                                } else {
                                                                    callback({
                                                                        HttpCode: 404,
                                                                        response: {response: "900"}
                                                                    });
                                                                }
                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }
                                                        });
                                                    }
                                                }

                                            } else {
                                                callback({HttpCode: 404, response: {response: "712"}});
                                            }

                                        } else {
                                            callback({HttpCode: 404, response: {response: "712"}});
                                        }

                                    } else {
                                        callback({HttpCode: 404, response: {response: "703"}});
                                    }
                                    break;
                            }
                            break;
                        case "changePassword":
                            switch (req.body.Role) {
                                case "seller":
                                    Entity = Seller;
                                    break;
                                case  "customer":
                                    Entity = customer;
                                    break;
                                case "transportation" :
                                    Entity = transportation;
                                    break;
                                case "support"   :
                                    Entity = sellerOperator;
                                    break;
                                case "productionManager":
                                    Entity = SellerProductionManager;
                                    break;
                                case "transportationManager":
                                    Entity = TransportationManager;
                                    break
                                default :
                                    SwitchStatus = false;
                                    callback({HttpCode: 400, response: {response: "716"}});
                            }
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, Entity, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if(req.body.oldPassword == null || req.body.newPassword == null){
                                                callback({HttpCode: 404, response: {"code": 703}});
                                            }else{
                                                if (newData.Password === md5(req.body.oldPassword)){
                                                    callback("",newData);
                                                } else{
                                                    callback({HttpCode: 404, response: {"code": 728}});

                                                }
                                            }
                                        }

                                    });
                                }
                            });
                                    break;
                        case "guest":
                            switch (req.originalUrl.substring(8).split("/")[2]) {
                                case "request":
                                    if (req.body.PhoneNumber != null) {
                                        if (!checkPhone(req, res)) {
                                            callback({HttpCode: 400, response: {"code": 712}});
                                        }
                                        else {
                                            var authcode = Math.floor(Math.random() * 90000) + 10000;
                                                    customer.create({AuthCode:authcode,Enabled:false ,PhoneNumber: req.body.PhoneNumber}).then(UserModel => {
                                                        sendSMS(data,AlramMessages("ForgetPassword",authcode));
                                                        callback("","");
                                                    });
                                        }
                                    } else {
                                        callback({HttpCode: 400, response: {"code": 703}});
                                    }

                                    break;
                                case "verify":
                                    if (req.body.PhoneNumber != null && req.body.Code != null ) {

                                                        customer.findOne({where: {PhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                    if (UserModel.AuthCode === req.body.Code) {
                                                                        callback("", UserModel);
                                                                    } else {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {response: "715"}
                                                                        });
                                                                    }
                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }
                                                        });
                                    } else {
                                        callback({HttpCode: 404, response: {response: "703"}});
                                    }
                                    break;
                                case "changePassword":
                                    if (req.body.PhoneNumber != null && req.body.Password != null && req.body.Role != null) {
                                        if (checkPassword(req, res)) {
                                            if (checkPhone(req, res)) {
                                                switch (req.body.Role) {
                                                    case "seller":
                                                        Entity = Seller;
                                                        break;
                                                    case  "customer":
                                                        Entity = customer;
                                                        break;
                                                    case "transportation" :
                                                        Entity = transportation;
                                                        break;
                                                    case "support"   :
                                                        Entity = sellerOperator;
                                                        break;
                                                    case "productionManager":
                                                        Entity = SellerProductionManager;
                                                        break;
                                                    case "transportationManager":
                                                        Entity = TransportationManager;
                                                        break
                                                    default :
                                                        SwitchStatus = false;
                                                        callback({HttpCode: 400, response: {response: "716"}});
                                                }
                                                if (SwitchStatus) {
                                                    if (req.body.Role === "seller") {
                                                        Entity.findOne({where: {OwnerPhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                if (UserModel.Status) {
                                                                    if (UserModel.IsForgetPasswordVerified) {
                                                                        callback("", UserModel);
                                                                    } else {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {response: "721"}
                                                                        });

                                                                    }
                                                                } else {
                                                                    callback({
                                                                        HttpCode: 404,
                                                                        response: {response: "900"}
                                                                    });
                                                                }
                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }
                                                        });

                                                    }
                                                    else {
                                                        Entity.findOne({where: {PhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                if (UserModel.Status) {
                                                                    if (UserModel.IsForgetPasswordVerified) {
                                                                        callback("", UserModel);
                                                                    } else {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {response: "721"}
                                                                        });

                                                                    }
                                                                } else {
                                                                    callback({
                                                                        HttpCode: 404,
                                                                        response: {response: "900"}
                                                                    });
                                                                }
                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }
                                                        });
                                                    }
                                                }

                                            } else {
                                                callback({HttpCode: 404, response: {response: "712"}});
                                            }

                                        } else {
                                            callback({HttpCode: 404, response: {response: "712"}});
                                        }

                                    } else {
                                        callback({HttpCode: 404, response: {response: "703"}});
                                    }
                                    break;
                            }

                            break;
                        case "phoneNumber":
                            if (req.body.PhoneNumber1 == null && req.body.PhoneNumber2 == null && req.body.PhoneNumber3 == null && req.body.PhoneNumber4 == null && req.body.PhoneNumber5 == null) {
                                callback({HttpCode: 400, response: {response: "703"}});

                            } else {
                                callback("", "");
                            }

                            break;
                        case "login":

                        function BiuldLoginSearchQuery(req, res, callback) {
                            if (req.body.PhoneNumber != null) {
                                if (req.body.Role === "seller") {
                                    callback("",
                                        {
                                            where: {
                                                OwnerPhoneNumber: req.body.PhoneNumber, Password: md5(req.body.Password)
                                            }
                                        });
                                } else {
                                    callback("",
                                        {
                                            where: {
                                                PhoneNumber: req.body.PhoneNumber, Password: md5(req.body.Password)
                                            }
                                        });
                                }


                            } else if (req.body.Username != null) {
                                callback("", {
                                    where: {
                                        Username: req.body.Username, Password: md5(req.body.Password)
                                    }
                                });
                            }
                        }

                            if (req.body.Role == null || req.body.Password == null || (req.body.Username == null && req.body.PhoneNumber == null)) {
                                callback({HttpCode: 400, response: {response: "703"}});
                            } else {
                                if (checkPassword(req, res)) {
                                    var InfoStatus = true;
                                    if (req.body.PhoneNumber != null) {
                                        InfoStatus = checkPhone(req, res);
                                    } else {
                                        InfoStatus = checkUserName(req, res);
                                    }
                                } else {
                                    InfoStatus = false;
                                }
                                if (InfoStatus) {
                                    BiuldLoginSearchQuery(req, res, (err, data) => {
                                        if (!err) {
                                            switch (req.body.Role) {
                                                case "customer":
                                                    customer.findOne(data).then(customer => {
                                                        if (customer != null) {
                                                            var payload = {
                                                                Username: customer.Username,
                                                                Password: customer.Password,
                                                                Date: new Date().getTime()
                                                            };
                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(customer.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);
                                                            addresses.findAll({where: {CustomerID: customer.ID}}).then(
                                                                addresses => {
                                                                    var newAdrress = [];
                                                                    asyncForEach(addresses, async item => {
                                                                        await cities.findOne({where: {ID: item.CityID}}).then(
                                                                            city => {
                                                                                newAdrress.push({
                                                                                    ID: item.ID,
                                                                                    GoogleMapAddressLink: item.GoogleMapAddressLink,
                                                                                    CompleteAddressDescription: item.CompleteAddressDescription,
                                                                                    CustomName: item.CustomName,
                                                                                    CityName: city.Name
                                                                                })
                                                                            }
                                                                        );
                                                                    }).then(answer => {
                                                                        callback("", {
                                                                            "data": {
                                                                                BirthDate: customer.BirthDate,
                                                                                Image: base64str,
                                                                                CompanyName: customer.CompanyName,
                                                                                Enable: customer.Enable,
                                                                                Status: customer.Status,
                                                                                FamilyName: customer.FamilyName,
                                                                                Name: customer.Name,
                                                                                PhoneNumber: customer.PhoneNumber,
                                                                                Point: customer.Point,
                                                                                RegistrationDateTime: customer.RegistrationDateTime,
                                                                                Theme: customer.Theme,
                                                                                Username: customer.Username,
                                                                                Token: token,
                                                                                Addressess: newAdrress
                                                                            }
                                                                        })
                                                                    });

                                                                }
                                                            );

                                                        } else {
                                                            callback({HttpCode: 404, response: {code: "710"}});
                                                        }

                                                    });
                                                    break;
                                                case "seller":
                                                    Seller.findOne(data).then(seller => {
                                                        if (seller != null) {
                                                            var payload = {
                                                                OwnerPhoneNumber: seller.OwnerPhoneNumber,
                                                                Password: seller.Password,
                                                                Date: new Date().getTime()
                                                            };
                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(seller.LogoImage);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);

                                                            callback("", {
                                                                "data": {

                                                                    ID: seller.ID,
                                                                    CompanyName: seller.CompanyName,
                                                                    CompleteAddressDescription: seller.CompleteAddressDescription,
                                                                    Enable: seller.Enable,
                                                                    Point: seller.Point,
                                                                    RegistrationDateTime: seller.RegistrationDateTime,
                                                                    GoogleMapAddressLink: seller.GoogleMapAddressLink,
                                                                    LogoImage: base64str,
                                                                    Policy:seller.Policy,
                                                                    PartTime2:seller.PartTime2,
                                                                    OwnerFamilyName: seller.OwnerFamilyName,
                                                                    OwnerName: seller.OwnerName,
                                                                    Password: seller.Password,
                                                                    ShowStatus: true,
                                                                    OwnerPhoneNumber: seller.OwnerPhoneNumber,
                                                                    Username: seller.Username,
                                                                    CompanyAddressCityID: seller.CompanyAddressCityID,
                                                                    PhoneNumberID: seller.PhoneNumberID,
                                                                    TypeID: seller.TypeID,
                                                                    Token: token
                                                                }
                                                            });


                                                        } else {
                                                            callback({HttpCode: 404, response: {code: "710"}});
                                                        }


                                                    });
                                                    break;
                                                case "transportation":
                                                    transportation.findOne(data).then(async trans => {
                                                        if (trans != null) {
                                                            var payload = {
                                                                PhoneNumber: trans.PhoneNumber,
                                                                Password: trans.Password,
                                                                Date: new Date().getTime()
                                                            };


                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(trans.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);

                                                            await sellerWareHouse.findOne({where: {ID: trans.WareHouseID}}).then(async SW => {
                                                                await Seller.findOne({where: {ID: SW.SellerID}}).then(async S => {

                                                                    var base64str1 = "not Found";
                                                                    try {
                                                                        base64str1 = base64_encode(S.LogoImage);

                                                                    } catch (e) {
                                                                        base64str1 = "not Found";

                                                                    }
                                                                    await callback("", {
                                                                        "data": {

                                                                            ID: trans.PhoneNumberID,
                                                                            AirConditionar: trans.AirConditionar,
                                                                            Color: trans.Color,
                                                                            Description: trans.Description,
                                                                            FamilyName: trans.FamilyName,
                                                                            Image: base64str,
                                                                            Name: trans.Name,
                                                                            SellerImage: base64str1,
                                                                            SellerName: S.CompanyName,
                                                                            PelakNumber: trans.PelakNumber,
                                                                            PhoneNumber: trans.PhoneNumber,
                                                                            Point: trans.Point,
                                                                            Username: trans.Username,
                                                                            ModelID: trans.ModelID,
                                                                            WareHouseID: trans.WareHouseID,
                                                                            Token: token
                                                                        }
                                                                    });
                                                                });
                                                            });
                                                        } else {
                                                            callback({HttpCode: 404, response: {code: "710"}});
                                                        }


                                                    });


                                                    break;
                                                case "support":
                                                    support.findOne(data).then(support => {
                                                        if (support != null) {
                                                            var payload = {
                                                                PhoneNumber: support.PhoneNumber,
                                                                Password: support.Password,
                                                                Date: new Date().getTime()
                                                            };


                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(support.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);

                                                            callback("", {
                                                                "data": {

                                                                    ID: support.ID,
                                                                    Image: base64str,
                                                                    Name: support.Name,
                                                                    FamilyName: support.FamilyName,
                                                                    Username: support.Username,
                                                                    Token: token

                                                                }
                                                            });

                                                        } else {
                                                            callback({HttpCode: 404, response: {code: "710"}});
                                                        }


                                                    });
                                                    break;
                                                case "productionManager":
                                                    SellerProductionManager.findOne(data).then(SellerProductionManager => {
                                                        if (SellerProductionManager != null) {
                                                            var payload = {
                                                                PhoneNumber: SellerProductionManager.PhoneNumber,
                                                                Password: SellerProductionManager.Password,
                                                                Date: new Date().getTime()
                                                            };


                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(SellerProductionManager.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);
                                                            Seller.findOne({where: {ID: SellerProductionManager.SellerID}}).then(seller => {
                                                                callback("", {
                                                                    "data": {

                                                                        ID: SellerProductionManager.PhoneNumberID,
                                                                        Name: SellerProductionManager.Name,
                                                                        FamilyName: SellerProductionManager.FamilyName,
                                                                        BirthDate: SellerProductionManager.Birthdate,
                                                                        PhoneNumber: SellerProductionManager.PhoneNumber,
                                                                        Image: base64str,
                                                                        Policy:SellerProductionManager.Policy,
                                                                        CellPhoneNumber: SellerProductionManager.CellPhoneNumber,
                                                                        Status: SellerProductionManager.Status,
                                                                        Username: SellerProductionManager.Username,
                                                                        SellerIDr: SellerProductionManager.SellerID,
                                                                        CompanyName: seller.CompanyName,
                                                                        Token: token
                                                                    }
                                                                });

                                                            });

                                                        } else {
                                                            callback({HttpCode: 404, response: {code: "710"}});
                                                        }


                                                    });
                                                    break;
                                                case "sellerOperator":
                                                    sellerOperator.findOne(data).then(operator => {
                                                        if (operator != null) {
                                                            var payload = {
                                                                PhoneNumber: operator.PhoneNumber,
                                                                Password: operator.Password,
                                                                Date: new Date().getTime()
                                                            };


                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(operator.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);
                                                            Seller.findOne({where: {ID: operator.SellerID}}).then(seller => {


                                                                callback("", {
                                                                    "data": {

                                                                        ID: operator.PhoneNumberID,
                                                                        FamilyName: operator.FamilyName,
                                                                        Name: operator.Name,
                                                                        BirthDate: operator.Birthdate,
                                                                        PhoneNumber: operator.PhoneNumber,
                                                                        Image: base64str,
                                                                        Point: operator.Point,
                                                                        Policy:operator.Policy,
                                                                        Username: operator.Username,
                                                                        SellerID: operator.SellerID,
                                                                        CompanyName: seller.CompanyName,
                                                                        Token: token


                                                                    }
                                                                });
                                                            });

                                                        } else {
                                                            callback({HttpCode: 404, response: {code: "710"}});
                                                        }


                                                    });
                                                    break;
                                                case "transportationManager":
                                                    TransportationManager.findOne(data).then(operator => {
                                                        if (operator != null) {
                                                            var payload = {
                                                                PhoneNumber: operator.PhoneNumber,
                                                                Password: operator.Password,
                                                                Date: new Date().getTime()
                                                            };


                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(operator.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);

                                                            callback("", {
                                                                "data": {

                                                                    ID: operator.PhoneNumberID,
                                                                    FamilyName: operator.FamilyName,
                                                                    Name: operator.Name,
                                                                    BirthDate: operator.BirthDate,
                                                                    PhoneNumber: operator.PhoneNumber,
                                                                    Image: base64str,
                                                                    Policy:operator.Policy,
                                                                    Point: operator.Point,
                                                                    Username: operator.Username,
                                                                    SellerID: operator.SellerID,
                                                                    Token: token


                                                                }
                                                            });
                                                        } else {
                                                            callback({HttpCode: 404, response: {code: "710"}});
                                                        }


                                                    });
                                                    break;
                                                case "pachalchi":
                                                    pachalChiAdminSupports.findOne(data).then(pachalChiAdminSupports => {
                                                        if (pachalChiAdminSupports != null) {
                                                            var payload = {
                                                                Username: pachalChiAdminSupports.Username,
                                                                Password: pachalChiAdminSupports.Password,
                                                                Date: new Date().getTime()
                                                            };


                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(pachalChiAdminSupports.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);

                                                            callback("", {
                                                                "data": {

                                                                    ID: pachalChiAdminSupports.PhoneNumberID,
                                                                    FamilyName: pachalChiAdminSupports.FamilyName,
                                                                    Name: pachalChiAdminSupports.Name,
                                                                    Image: base64str,
                                                                    Username: pachalChiAdminSupports.Username,
                                                                    Token: token


                                                                }
                                                            });
                                                        } else {
                                                            callback({HttpCode: 404, response: {code: "710"}});
                                                        }


                                                    });
                                                    break;
                                                default:
                                                    callback({HttpCode: 404, response: {code: "716"}});

                                            }
                                        }
                                    });
                                }

                            }
                            break;
                        case "register":

                        function registerInfoCheck(req, res, role) {
                            switch (role) {
                                case "customer":
                                    if (req.body.BirthDate == null ||
                                        req.body.CompanyName == null ||
                                        req.body.FamilyName == null ||
                                        req.body.Name == null ||
                                        req.body.Password == null ||
                                        req.body.PhoneNumber == null ||
                                        req.body.RegistrationDateTime == null ||
                                        req.body.Theme == null ||
                                        req.body.Username == null ||
                                        req.body.CityID == null
                                    ) {
                                        res.status(400).json({"code": 703});
                                        return false;
                                    } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));
                                case "seller":
                                    if (req.body.CompanyName == null ||
                                        req.body.CompleteAddressDescription == null ||
                                        req.body.GoogleMapAddressLink == null ||
                                        req.body.OwnerName == null ||
                                        req.body.OwnerFamilyName == null ||
                                        req.body.OwnerPhoneNumber == null ||
                                        req.body.Username == null ||
                                        req.body.PartTime2 == null ||
                                        req.body.Password == null ||
                                        req.body.CompanyAddressCityID == null ||
                                        req.body.PhoneNumberID == null) {
                                        res.status(400).json({"code": 703});
                                        return false;
                                    } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

                            }


                        }

                            if (req.body.Role == null) {
                                callback({HttpCode: 404, response: {code: "716"}});
                            } else {
                                if (registerInfoCheck(req, res, req.body.Role)) {
                                    switch (req.body.Role) {
                                        case "customer":
                                            CheckForeignKey(res, [{
                                                ID: req.body.CityID,
                                                Entity: cities
                                            }]).then(status => {
                                                if (status) {
                                                    ImageHandler(req, res, UplodDirs.customer)
                                                        .then(Image => {
                                                            callback("", {
                                                                BirthDate: req.body.BirthDate,
                                                                CompanyName: req.body.CompanyName,
                                                                Enabled: true,
                                                                FamilyName: req.body.FamilyName,
                                                                Image: Image,
                                                                Name: req.body.Name,
                                                                PhoneNumber: req.body.PhoneNumber,
                                                                Password: md5(req.body.Password),
                                                                EstablishedDate: req.body.EstablishedDate,
                                                                Point: 0,
                                                                Status: true,
                                                                RegistrationDateTime: req.body.RegistrationDateTime,
                                                                Theme: req.body.Theme,
                                                                Username: req.body.Username,
                                                                CityID: req.body.CityID

                                                            });
                                                        })
                                                        .catch(message => {
                                                            console.log(message);
                                                        });
                                                }
                                            });
                                            break;
                                        case "seller":
                                            CheckForeignKey(res, [{
                                                ID: req.body.CompanyAddressCityID,
                                                Entity: cities
                                            }, {
                                                ID: req.body.PhoneNumberID,
                                                Entity: sellerPhoneNumber
                                            }]).then(status => {
                                                if (status) {
                                                    ImageHandler(req, res, UplodDirs.seller)
                                                        .then(Image => {
                                                            callback("", {
                                                                PhoneNumberID: req.body.PhoneNumberID,
                                                                CompanyName: req.body.CompanyName,
                                                                CompleteAddressDescription: req.body.CompleteAddressDescription,
                                                                Point: 0,
                                                                Enabled: true,
                                                                PartTime2 : req.body.PartTime2,
                                                                RegistrationDateTime: req.body.RegistrationDateTime,
                                                                GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                                                LogoImage: Image,
                                                                Status: false,
                                                                OwnerFamilyName: req.body.OwnerFamilyName,
                                                                OwnerName: req.body.OwnerName,
                                                                Password: md5(req.body.Password),
                                                                OwnerPhoneNumber: req.body.OwnerPhoneNumber,
                                                                Username: req.body.Username,
                                                                CompanyAddressCityID: req.body.CompanyAddressCityID,
                                                                TypeID: 1

                                                            });
                                                        })
                                                        .catch(message => {
                                                            console.log(message);
                                                        });
                                                }
                                            });
                                            break;
                                        default:
                                            callback({HttpCode: 404, response: {code: "716"}});
                                    }
                                }
                            }


                            break;

                    }
                    break;
                case "seller":
                    switch (req.originalUrl.substring(8).split("/")[1]) {
                        case "product":
                            switch (req.method) {
                                case "POST":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, Seller, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    ImageHandler(req, res, UplodDirs.products)
                                                        .then(Image => {
                                                            if (req.body.Description == null ||
                                                                req.body.SupplyOfProduct == null ||
                                                                req.body.MinToSell == null ||
                                                                req.body.MaxToSell == null ||
                                                                req.body.UnitOfProduct == null ||
                                                                req.body.ProductID == null ||
                                                                req.body.UnitID == null
                                                            ) {
                                                                callback({HttpCode: 400, response: {"code": 703}});
                                                            } else {
                                                                CheckForeignKey(res, [{
                                                                    ID: req.body.UnitID,
                                                                    Entity: unit
                                                                }, {ID: req.body.ProductID, Entity: products}])
                                                                    .then(status => {
                                                                        if (status) {
                                                                            callback("", {
                                                                                Description: req.body.Description,
                                                                                Image: Image,
                                                                                MinToSell: req.body.MinToSell,
                                                                                MaxToSell:req.body.MaxToSell,
                                                                                SupplyOfProduct: req.body.SupplyOfProduct,
                                                                                UnitOfProduct: req.body.UnitOfProduct,
                                                                                ProductID: req.body.ProductID,
                                                                                SellerID: newData.ID,
                                                                                ShowStatus: true,
                                                                                UnitID: req.body.UnitID,
                                                                                DiscountFor0TO200: req.body.DiscountFor0TO200 || null,
                                                                                DiscountFor200TO500: req.body.DiscountFor200TO500 || null,
                                                                                DiscountFor500TO1000: req.body.DiscountFor500TO1000 || null,
                                                                                DiscountFor1000TOUpper: req.body.DiscountFor1000TOUpper || null
                                                                            });

                                                                        }
                                                                    });

                                                            }

                                                        })
                                                        .catch(message => {
                                                            console.log(message);
                                                        });
                                                }

                                            });
                                        }
                                    });

                                    break;
                                case "GET":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, Seller, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {

                                                    sellerProducts.findAll({where: {SellerID: newData.ID}}).then(async sellerProducts => {
                                                        var newSellerProducts = [];
                                                        asyncForEach(sellerProducts, async item => {
                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(item.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            await PriceAndSupply.findAll({
                                                                where: {
                                                                    SellerProductID: item.ID
                                                                }
                                                            }).then(async PriceAndSupply => {
                                                                await SellerProductsInServiceCitie.findAll({
                                                                    where: {
                                                                        SellerProductID: item.ID
                                                                    }
                                                                }).then(async SellerProductsInServiceCitie => {
                                                                    newSellerProducts.push({
                                                                        sellerProduct: {
                                                                            ID: item.ID,
                                                                            Image: base64str,
                                                                            SellerID: item.SellerID,
                                                                            ProductID: item.ProductID,
                                                                            UnitOfProduct: item.UnitOfProduct,
                                                                            UnitID: item.UnitID,
                                                                            MinToSell: item.MinToSell,
                                                                            ShowStatus: item.ShowStatus,
                                                                            Description: item.Description,
                                                                            DiscountFor0TO200: item.DiscountFor0TO200,
                                                                            DiscountFor200TO500: item.DiscountFor200TO500,
                                                                            DiscountFor500TO1000: item.DiscountFor500TO1000,
                                                                            DiscountFor1000TOUpper: item.DiscountFor1000TOUpper,
                                                                        },
                                                                        PriceAndSupply: PriceAndSupply[PriceAndSupply.length - 1],
                                                                        CityInService: SellerProductsInServiceCitie

                                                                    });
                                                                });
                                                            });
                                                        }).then(
                                                            () => {
                                                                callback("", newSellerProducts);
                                                            }
                                                        );
                                                    });
                                                }

                                            });
                                        }
                                    });

                                    break;
                                case "PUT":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, Seller, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    if (req.body.SellerProductID == null) {
                                                        callback({HttpCode: 404, response: {"code": 703}});
                                                    } else {
                                                        sellerProducts.findOne({where: {ID: req.body.SellerProductID}}).then(
                                                            sellerproduct => {
                                                                if (sellerproduct != null) {
                                                                    callback("", sellerproduct);

                                                                } else {
                                                                    callback({
                                                                        HttpCode: 404,
                                                                        response: {"code": 710}
                                                                    });
                                                                }

                                                            }
                                                        );
                                                    }

                                                }

                                            });
                                        }
                                    });
                                    break;
                            }
                            break;
                        case "accept":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, Seller, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                                callback("",newData);

                                        }

                                    });
                                }
                            });


                            break;
                        case "SubType":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, Seller, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {

                                            sellerOperator.findAll({where: {SellerID: newData.ID}}).then(async SO => {
                                                await Seller.findAll({where: {SellerParentID: newData.ID}}).then(async S => {
                                                    await SellerProductionManager.findAll({where: {SellerID: newData.ID}}).then(async PM => {
                                                        await sellerWareHouse.findAll({where: {SellerID: newData.ID}}).then(async WH => {
                                                            await TransportationManager.findAll({where: {SellerID: newData.ID}}).then(async TM => {
                                                                var TP = [];
                                                                await asyncForEach(WH, async item => {
                                                                    await transportation.findAll({where: {WareHouseID: item.ID}}).then(
                                                                        async Trans => {
                                                                            if (Trans != null) {
                                                                                await TP.push(Trans);
                                                                            }

                                                                        }
                                                                    );
                                                                }).then(()=>{
                                                                    callback("", {
                                                                        sellerOperator: SO,
                                                                        seller: S,
                                                                        productManager: PM,
                                                                        wareHouses: WH,
                                                                        Transportaration: TP,
                                                                        TransportationManager: TM
                                                                    });
                                                                });

                                                            });
                                                        })
                                                    })

                                                });

                                            });


                                        }

                                    });
                                }
                            });
                            break;
                        case "PartTime":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, Seller, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {

                                            if(req.body.PartTime2 == null){
                                                callback({HttpCode: 400, response: {code: "703"}});

                                            }else{
                                                callback("",newData);
                                            }

                                        }

                                    });
                                }
                            });
                            break;
                        case "ServiceCities":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, Seller, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.CityID == null || req.body.SellerProductID == null) {
                                                callback({HttpCode: 400, response: {code: "703"}});

                                            } else {
                                                sellerProducts.findOne({
                                                    where: {
                                                        SellerID: newData.ID,
                                                        ID: req.body.SellerProductID
                                                    }
                                                }).then(sellerproduct => {
                                                    if (sellerproduct != null) {
                                                        callback("", {
                                                            SellerProductID: req.body.SellerProductID,
                                                            CityID: req.body.CityID
                                                        });
                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": 710}});
                                                    }
                                                });

                                            }
                                        }

                                    });
                                }
                            });

                            break;
                        case "CancleOrderProduct":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, Seller, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.OrderProductID == null || req.body.SellerReason == null) {
                                                callback({HttpCode: 404, response: {"code": "404"}});
                                            } else {

                                                orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async orderProduct => {
                                                    if (orderProduct != null) {
                                                        await Order.findOne({where: {ID: orderProduct.OrderID}}).then(async order => {
                                                            await orderPardakht.findOne({where: {ID: order.PardakhtID}}).then(pardakht => {
                                                                if (pardakht != null) {
                                                                    if (pardakht.code_peygiri !== undefined) {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {"code": "725"}
                                                                        });
                                                                    } else {
                                                                        callback("", orderProduct);
                                                                    }
                                                                } else {
                                                                    callback("", orderProduct);
                                                                }
                                                            });

                                                        });

                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": "404"}});
                                                    }
                                                });
                                            }

                                        }

                                    });
                                }
                            });

                            break;
                        case "ServiceCitiesDelete":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, Seller, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {

                                            if (req.body.ID == null) {
                                                callback({HttpCode: 400, response: {code: "703"}});

                                            } else {
                                                SellerProductsInServiceCitie.findOne({
                                                    where: {
                                                        ID: req.body.ID
                                                    }
                                                }).then(SellerProductsInServiceCitie => {
                                                    if (SellerProductsInServiceCitie != null) {
                                                        callback("", SellerProductsInServiceCitie);
                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": 710}});
                                                    }
                                                });

                                            }
                                        }

                                    });
                                }
                            });

                            break;
                        case "Pricing":
                            checkLimitTime(res, (Timeerr, Timedata) => {
                                if (Timeerr) {
                                    callback(Timeerr);
                                } else {
                                    if (Timedata) {
                                        checkToken(req, res, (err, data) => {
                                            if (err) {
                                                callback(err);
                                            }
                                            else {
                                                checkUser(data, Seller, (newErr, newData) => {
                                                    if (newErr) {
                                                        callback(newErr);
                                                    }
                                                    else {

                                                        if (req.body.SellerProductID == null) {
                                                            callback({
                                                                HttpCode: 400,
                                                                response: {"code": 703}
                                                            });
                                                        } else {
                                                            CheckForeignKey(res, [{
                                                                ID: req.body.SellerProductID,
                                                                Entity: sellerProducts
                                                            }])
                                                                .then(status => {
                                                                    if (status) {
                                                                        PriceAndSupply.findAll({
                                                                            where: {
                                                                                SellerProductID: req.body.SellerProductID,
                                                                                DateTime: new Date().toISOString().slice(0, 10).toString()
                                                                            }
                                                                        }).then(PriceAndSupply => {

                                                                            if (!isThisArrayEmpty(PriceAndSupply)) {

                                                                                sellerProducts.findOne({where: {ID: req.body.SellerProductID}}).then(sellerProducts => {
                                                                                    products.findOne({where: {ID: sellerProducts.ProductID}}).then(product => {
                                                                                        if (product.Type) {
                                                                                            if (
                                                                                                req.body.SellerProductID == null ||
                                                                                                req.body.Price == null ||
                                                                                                req.body.Supply == null
                                                                                            ) {
                                                                                                callback({
                                                                                                    HttpCode: 400,
                                                                                                    response: {"code": 703}
                                                                                                });
                                                                                            } else {
                                                                                                callback("", {
                                                                                                    whatToDo: "update",
                                                                                                    Entity: PriceAndSupply[0],
                                                                                                    data: {
                                                                                                        SellerProductID: req.body.SellerProductID,
                                                                                                        Price: req.body.Price,
                                                                                                        AddedSupply: req.body.Supply
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        } else {
                                                                                            callback({
                                                                                                HttpCode: 400,
                                                                                                response: {"code": 722}
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                });

                                                                            }
                                                                            else {
                                                                                if (
                                                                                    req.body.SellerProductID == null ||
                                                                                    req.body.Price == null ||
                                                                                    req.body.Supply == null ||
                                                                                    req.body.UnitIDOfSupply == null
                                                                                ) {
                                                                                    callback({
                                                                                        HttpCode: 400,
                                                                                        response: {"code": 703}
                                                                                    });
                                                                                } else {
                                                                                    CheckForeignKey(res, [{
                                                                                        ID: req.body.UnitIDOfSupply,
                                                                                        Entity: unit
                                                                                    }]).then(status => {
                                                                                        if (status) {
                                                                                            callback("", {
                                                                                                whatToDo: "create",
                                                                                                data: {
                                                                                                    SellerProductID: req.body.SellerProductID,
                                                                                                    DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                                                    Price: req.body.Price,
                                                                                                    PrimitiveSupply: req.body.Supply,
                                                                                                    UnitIDOfSupply: req.body.UnitIDOfSupply
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }

                                                                            }
                                                                        });

                                                                    }
                                                                });

                                                        }

                                                    }

                                                });
                                            }
                                        });
                                    }
                                }
                            });


                            break;
                        case "Role" :
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, Seller, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.Role == null) {
                                                callback({
                                                    HttpCode: 400,
                                                    response: {"code": 703}
                                                });
                                            } else if (addRoleInfoCheck(req, res, req.body.Role)) {

                                                switch (req.body.Role) {

                                                    case "seller":

                                                        ImageHandler(req, res, UplodDirs.seller).then(Image => {
                                                            callback("", [Seller,
                                                                {
                                                                    ID: req.body.PhoneNumberID,
                                                                    CompanyName: req.body.CompanyName,
                                                                    CompleteAddressDescription: req.body.CompleteAddressDescription,
                                                                    Point: 0,
                                                                    SellerParentID: newData.ID,
                                                                    RegistrationDateTime: new Date().toString(),
                                                                    GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                                                    LogoImage: Image,
                                                                    OwnerFamilyName: req.body.OwnerFamilyName,
                                                                    OwnerName: req.body.OwnerName,
                                                                    Password: md5(req.body.Password),
                                                                    OwnerPhoneNumber: req.body.OwnerPhoneNumber,
                                                                    Username: req.body.Username,
                                                                    CompanyAddressCityID: req.body.CompanyAddressCityID,
                                                                    PhoneNumberID: req.body.PhoneNumberID,
                                                                    TypeID: 2,
                                                                    Enable: true,
                                                                    Status: true

                                                                }]
                                                            );
                                                        });

                                                        break;
                                                    case "wareHouse":

                                                        ImageHandler(req, res, UplodDirs.wareHouse).then(Image => {
                                                            callback("", [sellerWareHouse,
                                                                {
                                                                    AgentFamilyName: req.body.AgentFamilyName,
                                                                    AgentName: req.body.AgentName,
                                                                    Birthdate: req.body.BirthDate,
                                                                    CellPhoneNumber: req.body.CellPhoneNumber,
                                                                    Image: Image,
                                                                    RegistrationDateTime: new Date().toString(),
                                                                    Password: md5(req.body.Password),
                                                                    PhoneNumber: req.body.PhoneNumber,
                                                                    Point: 0,
                                                                    Username: req.body.Username,
                                                                    WareHouseCompleteAddressDescription: req.body.WareHouseCompleteAddressDescription,
                                                                    WareHouseGoogleMapAddressLink: req.body.WareHouseGoogleMapAddressLink,
                                                                    WareHouseAddressCityID: req.body.WareHouseAddressCityID,
                                                                    SellerID: newData.ID,
                                                                    Enable: true,
                                                                    Status: false

                                                                }]
                                                            );
                                                        });

                                                        break;
                                                    case "operator" :
                                                        ImageHandler(req, res, UplodDirs.operator).then(Image => {
                                                            callback("", [sellerOperator,
                                                                {
                                                                    Birthdate: req.body.BirthDate,
                                                                    FamilyName: req.body.FamilyName,
                                                                    Image: Image,
                                                                    RegistrationDateTime: new Date().toString(),
                                                                    Name: req.body.Name,
                                                                    Password: md5(req.body.Password),
                                                                    PhoneNumber: req.body.PhoneNumber,
                                                                    Point: 0,
                                                                    Username: req.body.Username,
                                                                    SellerID: newData.ID,
                                                                    Enable: true,
                                                                    Status: false
                                                                }]
                                                            );
                                                        });


                                                        break;
                                                    case "transportation":
                                                        ImageHandler(req, res, UplodDirs.operator).then(Image => {
                                                            callback("", [transportation,
                                                                {
                                                                    AirConditionar: req.body.AirConditionar,
                                                                    BirthDate: req.body.BirthDate,
                                                                    Color: req.body.Color,
                                                                    Image: Image,
                                                                    Description: req.body.Description,
                                                                    FamilyName: req.body.FamilyName,
                                                                    Name: req.body.Name,
                                                                    RegistrationDateTime: new Date().toString(),
                                                                    Password: md5(req.body.Password),
                                                                    PelakNumber: req.body.PelakNumber,
                                                                    PhoneNumber: req.body.PhoneNumber,
                                                                    Username: req.body.Username,
                                                                    WareHouseID: req.body.WareHouseID,
                                                                    ModelID: req.body.ModelID,
                                                                    Enable: true,
                                                                    Status: false
                                                                }]
                                                            );
                                                        });

                                                        break;
                                                    case "ProductionManager":
                                                        ImageHandler(req, res, UplodDirs.productionManager).then(Image => {
                                                            callback("", [SellerProductionManager,
                                                                {
                                                                    BirthDate: req.body.BirthDate,
                                                                    FamilyName: req.body.FamilyName,
                                                                    Name: req.body.Name,
                                                                    Image: Image,
                                                                    Password: md5(req.body.Password),
                                                                    PhoneNumber: req.body.PhoneNumber,
                                                                    Username: req.body.Username,
                                                                    RegistrationDateTime: new Date().toString(),
                                                                    CellPhoneNumber: req.body.CellPhoneNumber,
                                                                    Enable: true,
                                                                    Status: false,
                                                                    SellerID: newData.ID

                                                                }]
                                                            );
                                                        });

                                                        break;
                                                    case "TransportationManager":
                                                        ImageHandler(req, res, UplodDirs.TransportationManager).then(Image => {
                                                            callback("", [TransportationManager,
                                                                {
                                                                    BirthDate: req.body.BirthDate,
                                                                    FamilyName: req.body.FamilyName,
                                                                    Name: req.body.Name,
                                                                    Image: Image,
                                                                    Password: md5(req.body.Password),
                                                                    PhoneNumber: req.body.PhoneNumber,
                                                                    RegistrationDateTime: new Date().toString(),
                                                                    Username: req.body.Username,
                                                                    Enable: true,
                                                                    Status: false,
                                                                    SellerID: newData.ID,
                                                                    WareHouseID: req.body.WareHouseID

                                                                }]
                                                            );
                                                        });

                                                        break;

                                                    default :
                                                        callback({HttpCode: 400, response: {"code": 710}});
                                                }

                                            }

                                        }

                                    });
                                }
                            });

                            break;
                        case "Enabled":
                            if (req.body.Role == null || req.body.ID == null || req.body.Enabled == null) {
                                callback({
                                    HttpCode: 400,
                                    response: {"code": 703}
                                });
                            } else {
                                switch (req.body.Role) {

                                    case "seller":
                                        Seller.findOne({where: {ID: req.body.ID}}).then(
                                            seller => {
                                                if (seller != null) {
                                                    callback("", [seller, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "wareHouse":
                                        sellerWareHouse.findOne({where: {ID: req.body.ID}}).then(
                                            sellerWareHouses => {
                                                if (sellerWareHouses != null) {
                                                    callback("", [sellerWareHouses, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "operator" :
                                        sellerOperator.findOne({where: {ID: req.body.ID}}).then(
                                            sellerOperators => {
                                                if (sellerOperators != null) {
                                                    callback("", [sellerOperators, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "transportation" :
                                        transportation.findOne({where: {ID: req.body.ID}}).then(
                                            transportations => {
                                                if (transportations != null) {
                                                    callback("", [transportations, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "TransportationManager" :

                                        TransportationManager.findOne({where: {ID: req.body.ID}}).then(
                                            TransportationManagers => {
                                                if (TransportationManagers != null) {
                                                    callback("", [TransportationManagers, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "productionManager" :
                                        SellerProductionManager.findOne({where: {ID: req.body.ID}}).then(
                                            SellerProductionManagers => {
                                                if (SellerProductionManagers != null) {
                                                    callback("", [SellerProductionManagers, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;

                                    default :
                                        return res.status(404).json({"message": "invalid role type"});
                                }

                            }
                            break;


                    }
                    break;
                case "customer":
                    switch (req.originalUrl.substring(8).split("/")[1].split("?").shift()) {
                        case "order" :
                            switch (req.method) {
                                case "POST":
                                    if (isThisArrayEmpty(req.body.products)) {
                                        callback({HttpCode: 400, response: {"code": 703}});
                                    } else {
                                        global.SameOperator = [] ;

                                        var CustomProducts = req.body.products;
                                        var status = true;
                                        var ForigenStatus = true;

                                        asyncForEach(CustomProducts, async (item) => {
                                            if (ForigenStatus && status) {
                                                if (item.SellerProductID == null || item.ForwardingDatetime == null ||
                                                    item.CustomerAddressID == null || item.Supply == null || item.TurnOfForwarding == null||
                                                    item.UnitIDOfSupply == null) {
                                                    status = false;
                                                    callback({HttpCode: 400, response: {"code": 703}});
                                                } else {
                                                    await CheckForeignKey(res,
                                                        [{
                                                            ID: item.SellerProductID,
                                                            Entity: sellerProducts
                                                        },
                                                            {
                                                                ID: item.CustomerAddressID,
                                                                Entity: addresses
                                                            },
                                                            {
                                                                ID: item.UnitIDOfSupply,
                                                                Entity: unit
                                                            }]
                                                    ).then(answer => {
                                                        if (!answer) ForigenStatus = false;
                                                    });
                                                }
                                            }
                                        })
                                            .then(async () => {
                                                if (ForigenStatus && status) {

                                                    checkToken(req, res, (err, data) => {
                                                        if (err) {
                                                            callback(err);
                                                        }
                                                        else {
                                                            checkUser(data, customer, (newErr, newData) => {
                                                                if (newErr) {
                                                                    callback(newErr);
                                                                }
                                                                else {

                                                                    var TotalOrderProducts = [];
                                                                    var TotalStatus = true;


                                                                    sequelize.transaction().then( async function ( t) {
                                                                       await Order.create({
                                                                            CustomerID: newData.ID,
                                                                            OrderDateTime: new Date().toString(),
                                                                            HashCode: new Date().getTime().toString()
                                                                        }, {
                                                                            transaction: t
                                                                        }).then(async savedOrder => {
                                                                            sendSMS(newData, AlramMessages("PostOrder", savedOrder.HashCode));

                                                                            var totalSum = 0;

                                                                           await asyncForEach(req.body.products, async (item) => {
                                                                                if (TotalStatus) {
                                                                                    await SellerProductsInServiceCitie.findAll({where: {SellerProductID: item.SellerProductID}}).then(
                                                                                        async SellerProductsInServiceCitie => {
                                                                                            await addresses.findOne({where: {ID: item.CustomerAddressID}}).then(async Address => {
                                                                                                var AdreessStatus = true;
                                                                                               await asyncForEach(SellerProductsInServiceCitie, async item => {
                                                                                                    if (Address.CityID === item.CityID) {
                                                                                                        AdreessStatus = false;
                                                                                                    }
                                                                                                }).then(() => {
                                                                                                    if (!AdreessStatus) {
                                                                                                        TotalStatus = false;
                                                                                                        callback({
                                                                                                            HttpCode: 400,
                                                                                                            response: {"code": 731}
                                                                                                        });
                                                                                                    }
                                                                                                });


                                                                                            });
                                                                                        }
                                                                                    );
                                                                                    await sellerProducts.findOne({where: {ID: item.SellerProductID}}).then(async sellerProduct => {
                                                                                        if ((parseInt(sellerProduct.MinToSell )<= item.Supply)  && (item.Supply<= parseInt(sellerProduct.MaxToSell))) {
                                                                                            await sellerOperator.findAll({where: {SellerID: sellerProduct.SellerID , Status : true}}).then(async operators => {

                                                                                                if (isThisArrayEmpty(operators)) {
                                                                                                    await sellerOperator.findAll({where:{SellerID: sellerProduct.SellerID }}).then(async OfflineOperators=>{
                                                                                                        function randomIntInc(low, high) {
                                                                                                            return Math.floor(Math.random() * (high - low + 1) + low)
                                                                                                        }
                                                                                                        var counter = randomIntInc(0, OfflineOperators.length - 1);
                                                                                                        if ( typeof global.SameOperator[sellerProduct.SellerID] === 'undefined'){
                                                                                                            global.SameOperator[sellerProduct.SellerID] = OfflineOperators[counter];
                                                                                                        }
                                                                                                            await products.findOne({where: {ID: sellerProduct.ProductID}}).then(async product => {
                                                                                                            if (product.Type) {
                                                                                                                if (sellerProduct.ShowStatus) {
                                                                                                                    var FinalDiscount = 0;
                                                                                                                    if (item.Supply < 200) {
                                                                                                                        FinalDiscount = sellerProduct.DiscountFor0TO200
                                                                                                                    }
                                                                                                                    else if (item.Supply < 500 && item.Supply > 200) {
                                                                                                                        FinalDiscount = sellerProduct.DiscountFor200TO500
                                                                                                                    }
                                                                                                                    else if (item.Supply < 1000 && item.Supply > 500) {
                                                                                                                        FinalDiscount = sellerProduct.DiscountFor500TO1000
                                                                                                                    }
                                                                                                                    else if (item.Supply > 1000) {
                                                                                                                        FinalDiscount = sellerProduct.DiscountFor1000TOUpper
                                                                                                                    }
                                                                                                                    await PriceAndSupply.findOne({
                                                                                                                        where: {
                                                                                                                            DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                                                                            SellerProductID: item.SellerProductID
                                                                                                                        }
                                                                                                                    }).then(async PriceAndSupply => {
                                                                                                                        totalSum = totalSum + (item.Supply * PriceAndSupply.Price);

                                                                                                                        await TotalOrderProducts.push({
                                                                                                                            OrderID: savedOrder.ID,
                                                                                                                            SellerOperatorID: global.SameOperator[sellerProduct.SellerID].ID,
                                                                                                                            ForwardingDatetime: item.ForwardingDatetime,
                                                                                                                            CustomerAddressID: item.CustomerAddressID,
                                                                                                                            ProductID: item.SellerProductID,
                                                                                                                            TurnOfForwarding:item.TurnOfForwarding,
                                                                                                                            UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                                            Supply: item.Supply,
                                                                                                                            Seen: false,
                                                                                                                            CustomerStatus: true,
                                                                                                                            DeleteStatus: false,
                                                                                                                            SumTotal: item.Supply * PriceAndSupply.Price,
                                                                                                                            FinalDiscount: FinalDiscount
                                                                                                                        });
                                                                                                                    });


                                                                                                                } else {
                                                                                                                    TotalStatus = false;
                                                                                                                    callback({
                                                                                                                        HttpCode: 400,
                                                                                                                        response: {"code": 732}
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                if (sellerProduct.ShowStatus) {
                                                                                                                    await PriceAndSupply.findOne({
                                                                                                                        where: {
                                                                                                                            DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                                                                            SellerProductID: item.SellerProductID
                                                                                                                        }
                                                                                                                    }).then(
                                                                                                                        async  PriceAndSupply => {
                                                                                                                            if (PriceAndSupply != null) {

                                                                                                                                if (parseInt(item.Supply) > parseInt(PriceAndSupply.PrimitiveSupply)) {
                                                                                                                                    TotalStatus = false;
                                                                                                                                    callback({
                                                                                                                                        HttpCode: 400,
                                                                                                                                        response: {"code": 733}
                                                                                                                                    });
                                                                                                                                } else {

                                                                                                                                    totalSum = totalSum + (item.Supply * PriceAndSupply.Price);
                                                                                                                                    await  TotalOrderProducts.push({
                                                                                                                                        OrderID: savedOrder.ID,
                                                                                                                                        ForwardingDatetime: item.ForwardingDatetime,
                                                                                                                                        CustomerAddressID: item.CustomerAddressID,
                                                                                                                                        UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                                                        TurnOfForwarding:item.TurnOfForwarding,
                                                                                                                                        SellerOperatorID: global.SameOperator[sellerProduct.SellerID].ID,
                                                                                                                                        Seen: false,
                                                                                                                                        CustomerStatus: true,
                                                                                                                                        DeleteStatus: false,
                                                                                                                                        ProductID: item.SellerProductID,
                                                                                                                                        Supply: item.Supply,
                                                                                                                                        SumTotal: item.Supply * PriceAndSupply.Price
                                                                                                                                    });



                                                                                                                                }

                                                                                                                            } else {
                                                                                                                                TotalStatus = false;
                                                                                                                                callback({
                                                                                                                                    HttpCode: 404,
                                                                                                                                    response: {"code": 734}
                                                                                                                                });
                                                                                                                            }
                                                                                                                        }
                                                                                                                    );
                                                                                                                } else {

                                                                                                                    TotalStatus = false;
                                                                                                                    callback({
                                                                                                                        HttpCode: 400,
                                                                                                                        response: {"code": 732}
                                                                                                                    });
                                                                                                                }

                                                                                                            }
                                                                                                        })
                                                                                                    });
                                                                                                }

                                                                                                else {
                                                                                                    function randomIntInc(low, high) {
                                                                                                        return Math.floor(Math.random() * (high - low + 1) + low)
                                                                                                    }
                                                                                                    var operator = randomIntInc(0, operators.length - 1);
                                                                                                    if ( typeof global.SameOperator[sellerProduct.SellerID] === 'undefined'){
                                                                                                        global.SameOperator[sellerProduct.SellerID] = operators[operator];
                                                                                                    }
                                                                                                    await products.findOne({where: {ID: sellerProduct.ProductID}}).then(async product => {
                                                                                                        if (product.Type) {
                                                                                                            if (sellerProduct.ShowStatus) {
                                                                                                                var FinalDiscount = 0;
                                                                                                                if (item.Supply < 200) {
                                                                                                                    FinalDiscount = sellerProduct.DiscountFor0TO200
                                                                                                                }
                                                                                                                else if (item.Supply < 500 && item.Supply > 200) {
                                                                                                                    FinalDiscount = sellerProduct.DiscountFor200TO500
                                                                                                                }
                                                                                                                else if (item.Supply < 1000 && item.Supply > 500) {
                                                                                                                    FinalDiscount = sellerProduct.DiscountFor500TO1000
                                                                                                                }
                                                                                                                else if (item.Supply > 1000) {
                                                                                                                    FinalDiscount = sellerProduct.DiscountFor1000TOUpper
                                                                                                                }
                                                                                                                await PriceAndSupply.findOne({
                                                                                                                    where: {
                                                                                                                        DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                                                                        SellerProductID: item.SellerProductID
                                                                                                                    }
                                                                                                                }).then(async PriceAndSupply => {
                                                                                                                    totalSum = totalSum + (item.Supply * PriceAndSupply.Price);
                                                                                                                    await TotalOrderProducts.push({
                                                                                                                        OrderID: savedOrder.ID,
                                                                                                                        SellerOperatorID: global.SameOperator[sellerProduct.SellerID].ID,
                                                                                                                        ForwardingDatetime: item.ForwardingDatetime,
                                                                                                                        CustomerAddressID: item.CustomerAddressID,
                                                                                                                        ProductID: item.SellerProductID,
                                                                                                                        TurnOfForwarding:item.TurnOfForwarding,
                                                                                                                        UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                                        Supply: item.Supply,
                                                                                                                        Seen: false,
                                                                                                                        CustomerStatus: true,
                                                                                                                        DeleteStatus: false,
                                                                                                                        SumTotal: item.Supply * PriceAndSupply.Price,
                                                                                                                        FinalDiscount: FinalDiscount
                                                                                                                    });
                                                                                                                });


                                                                                                            } else {
                                                                                                                TotalStatus = false;
                                                                                                                callback({
                                                                                                                    HttpCode: 400,
                                                                                                                    response: {"code": 732}
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            if (sellerProduct.ShowStatus) {
                                                                                                                await PriceAndSupply.findOne({
                                                                                                                    where: {
                                                                                                                        DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                                                                        SellerProductID: item.SellerProductID
                                                                                                                    }
                                                                                                                }).then(
                                                                                                                    async  PriceAndSupply => {
                                                                                                                        if (PriceAndSupply != null) {

                                                                                                                            if (parseInt(item.Supply) > parseInt(PriceAndSupply.PrimitiveSupply)) {
                                                                                                                                TotalStatus = false;
                                                                                                                                callback({
                                                                                                                                    HttpCode: 400,
                                                                                                                                    response: {"code": 733}
                                                                                                                                });
                                                                                                                            } else {
                                                                                                                                if ( typeof global.SameOperator[sellerProduct.SellerID] === 'undefined'){
                                                                                                                                    global.SameOperator[sellerProduct.SellerID] = operators[operator];
                                                                                                                                }
                                                                                                                                totalSum = totalSum + (item.Supply * PriceAndSupply.Price);
                                                                                                                                await  TotalOrderProducts.push({
                                                                                                                                    OrderID: savedOrder.ID,
                                                                                                                                    ForwardingDatetime: item.ForwardingDatetime,
                                                                                                                                    CustomerAddressID: item.CustomerAddressID,
                                                                                                                                    UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                                                    TurnOfForwarding:item.TurnOfForwarding,
                                                                                                                                    SellerOperatorID: global.SameOperator[sellerProduct.SellerID].ID,
                                                                                                                                    Seen: false,
                                                                                                                                    CustomerStatus: true,
                                                                                                                                    DeleteStatus: false,
                                                                                                                                    ProductID: item.SellerProductID,
                                                                                                                                    Supply: item.Supply,
                                                                                                                                    SumTotal: item.Supply * PriceAndSupply.Price
                                                                                                                                });



                                                                                                                            }

                                                                                                                        } else {
                                                                                                                            TotalStatus = false;
                                                                                                                            callback({
                                                                                                                                HttpCode: 400,
                                                                                                                                response: {"code": 734}
                                                                                                                            });
                                                                                                                        }
                                                                                                                    }
                                                                                                                );
                                                                                                            } else {

                                                                                                                TotalStatus = false;
                                                                                                                callback({
                                                                                                                    HttpCode: 400,
                                                                                                                    response: {"code": 732}
                                                                                                                });
                                                                                                            }

                                                                                                        }
                                                                                                    })
                                                                                                }



                                                                                            });
                                                                                        } else {


                                                                                            TotalStatus = false;
                                                                                            callback({
                                                                                                HttpCode: 404,
                                                                                                response: {"code": 735}
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }).then(() => {
                                                                                    if (TotalStatus) {
                                                                                        t.commit();
                                                                                        savedOrder.update({
                                                                                            SumTotal: totalSum.toString(),
                                                                                            OnlineFee: totalSum.toString(),
                                                                                            InplaceFee: "0"
                                                                                        }).then(() => {
                                                                                              sendSMS(newData,AlramMessages("PostOrder",savedOrder.ID));
                                                                                            callback("", [savedOrder, TotalOrderProducts]);

                                                                                        });
                                                                                    } else {
                                                                                        t.rollback();
                                                                                    }
                                                                                }
                                                                            );


                                                                        }).catch(function (error) {
                                                                            t.rollback();
                                                                            console.log(error)
                                                                            callback({
                                                                                HttpCode: 500,
                                                                                response: {"code": 500}
                                                                            });
                                                                        });
                                                                    });

                                                                }
                                                            });
                                                        }
                                                    })


                                                }


                                            });


                                    }

                                    break;
                                case "GET":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, customer, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    Order.findAll({where: {CustomerID: newData.ID}}).then(async Orders => {
                                                        var mine = [];
                                                        await asyncForEach(Orders, async (item, index) => {
                                                            await orderProduct.findAll({where: {OrderID: item.ID}}).then(async orderProducts => {
                                                                if (!isThisArrayEmpty(orderProducts)) {
                                                                    var OrderProducts = [];
                                                                    await asyncForEach(orderProducts, async item1 => {
                                                                        await PriceAndSupply.findOne({
                                                                            where: {
                                                                                SellerProductID: item1.ProductID,
                                                                                DateTime: new Date().toISOString().slice(0, 10).toString()
                                                                            }
                                                                        }).then(async price => {
                                                                            await sellerProducts.findOne({where: {ID: item1.ProductID}}).then(async SP => {
                                                                                await products.findOne({where: {ID: SP.ProductID}}).then(async P => {
                                                                                    await Seller.findOne({where: {ID: SP.SellerID}}).then(async seller => {
                                                                                        if(item1.TransportarID != null ){
                                                                                            await transportation.findOne({where:{ID:item1.TransportarID}}).then(async transportInfo=>{
                                                                                                var base64str = "not Found";
                                                                                                try {
                                                                                                    base64str = base64_encode(seller.LogoImage);

                                                                                                } catch (e) {
                                                                                                    base64str = "not Found";

                                                                                                }   var base64str3 = "not Found";
                                                                                                try {
                                                                                                    base64str3 = base64_encode(transportInfo.Image);

                                                                                                } catch (e) {
                                                                                                    base64str3 = "not Found";

                                                                                                }
                                                                                                await OrderProducts.push({
                                                                                                    OrderProduct: item1,
                                                                                                    Product: P,
                                                                                                    Transportaion:{
                                                                                                        information:transportInfo,
                                                                                                        Image : base64str3
                                                                                                    },
                                                                                                    seller: {
                                                                                                        CompanyName: seller.CompanyName,
                                                                                                        LogoImage: base64str},
                                                                                                    Price: price,
                                                                                                });

                                                                                            });
                                                                                        }else{
                                                                                            var base64str = "not Found";
                                                                                            try {
                                                                                                base64str = base64_encode(seller.LogoImage);

                                                                                            } catch (e) {
                                                                                                base64str = "not Found";

                                                                                            }
                                                                                            await OrderProducts.push({
                                                                                                OrderProduct: item1,
                                                                                                Product: P,
                                                                                                seller: {
                                                                                                    CompanyName: seller.CompanyName,
                                                                                                    LogoImage: base64str
                                                                                                },
                                                                                                Price: price,
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                });
                                                                            });

                                                                        })
                                                                    }).then(() => {
                                                                        mine.push({
                                                                            Order: item,
                                                                            OrderProducts: OrderProducts

                                                                        });
                                                                    });
                                                                } else {
                                                                    mine.push({Order: item, OrderProducts: []});
                                                                }

                                                            });

                                                        }).then(() => {
                                                            callback("", mine)
                                                        });

                                                    });
                                                }

                                            });
                                        }
                                    });
                                    break;
                            }
                            break;
                        case "address" :
                            switch (req.method) {
                                case "POST":
                                    if (req.body.CityID == null || req.body.GoogleMapAddressLink == null || req.body.CompleteAddressDescription == null || req.body.CustomName == null) {
                                        callback({HttpCode: 404, response: {"code": "703"}});

                                    } else {
                                        checkToken(req, res, (err, data) => {
                                            if (err) {
                                                callback(err);
                                            }
                                            else {
                                                checkUser(data, customer, (newErr, newData) => {
                                                    if (newErr) {
                                                        callback(newErr);
                                                    }
                                                    else {
                                                        cities.findAll({where: {ID: req.body.CityID}}).then(
                                                            city => {
                                                                if (!isThisArrayEmpty(city)) {
                                                                    callback("", {
                                                                        CustomerID: newData.ID,
                                                                        CityID: req.body.CityID,
                                                                        GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                                                        CompleteAddressDescription: req.body.CompleteAddressDescription,
                                                                        CustomName: req.body.CustomName
                                                                    });

                                                                } else {
                                                                    return callback({
                                                                        HttpCode: 404,
                                                                        response: {"code": 710}
                                                                    });
                                                                }
                                                            }
                                                        );

                                                    }

                                                });
                                            }
                                        });
                                    }
                                    break;
                                case "PUT":
                                    if (req.body.CustomerAddressID == null) {
                                        callback({HttpCode: 404, response: {"code": "404"}});
                                    } else {
                                        checkToken(req, res, (err, data) => {
                                            if (err) {
                                                callback(err);
                                            }
                                            else {
                                                checkUser(data, customer, (newErr, newData) => {
                                                    if (newErr) {
                                                        callback(newErr);
                                                    }
                                                    else {
                                                        addresses.findAll({
                                                            where: {ID: req.body.CustomerAddressID}
                                                        }).then(address => {
                                                            if (!isThisArrayEmpty(address)) {
                                                                callback("", {
                                                                    CustomerID: req.body.CustomerID || address[0].CustomerID,
                                                                    CityID: req.body.CityID || address[0].CityID,
                                                                    GoogleMapAddressLink: req.body.GoogleMapAddressLink || address[0].GoogleMapAddressLink,
                                                                    CompleteAddressDescription: req.body.CompleteAddressDescription || address[0].CompleteAddressDescription,
                                                                    CustomName: req.body.CustomName || address[0].CustomName
                                                                });

                                                            } else {
                                                                callback({HttpCode: 404, response: {"code": 703}});
                                                            }
                                                        });
                                                    }

                                                });
                                            }
                                        });

                                    }
                                    break;
                                case "GET":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, customer, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    addresses.findAll({where: {CustomerID: newData.ID}}).then(
                                                        addresess => {
                                                            callback("", addresess);

                                                        }
                                                    );
                                                }

                                            });
                                        }
                                    });

                                    break;
                            }


                            break;
                        case "search":
                            if (req.query.param == null ) {
                                callback({HttpCode: 404, response: {"code": "703"}});
                            } else {
                                if(req.query.param === ""){
                                    callback({HttpCode: 404, response: {"code": "710"}});
                                }else{
                                    products.findAll({
                                        where: {
                                            [Op.or]: [
                                                {
                                                    Name: {
                                                        [Op.like]: '%' + req.query.param + '%'
                                                    }
                                                }
                                            ]
                                        }
                                    }).then(ProductsList => {
                                        Seller.findAll({
                                            where: {
                                                [Op.or]: [
                                                    {
                                                        CompanyName: {
                                                            [Op.like]: '%' + req.query.param + '%'
                                                        }
                                                    }
                                                ]
                                            }
                                        }).then(async Sellerlist => {
                                            var newSellerList = [];
                                            await asyncForEach(Sellerlist, async item => {
                                                var base64str = "not Found";
                                                try {
                                                    base64str = base64_encode(item.Image);

                                                } catch (e) {
                                                    base64str = "not Found";

                                                }
                                                await newSellerList.push({
                                                    ID: item.ID,
                                                    CompanyName: item.CompanyName,
                                                    Image: base64str
                                                });
                                            }).then(() => {
                                                callback("", {
                                                    newSellerList,
                                                    ProductsList
                                                });
                                            });

                                        });
                                    });
                                }
                            }
                            break;
                        case "CancleOrder":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, customer, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.OrderID == null) {
                                                callback({HttpCode: 404, response: {"code": "404"}});
                                            } else {
                                                Order.findOne({
                                                    where: {
                                                        ID: req.body.OrderID,
                                                        CustomerID: newData.ID
                                                    }
                                                }).then(async Order => {
                                                    if (Order != null) {
                                                        await orderPardakht.findOne({where: {ID: Order.PardakhtID}}).then(pardakht => {
                                                            if (pardakht != null) {
                                                                if (pardakht.code_peygiri !== undefined) {
                                                                    callback({
                                                                        HttpCode: 404,
                                                                        response: {"code": "725"}
                                                                    });
                                                                } else {
                                                                    callback("", Order);
                                                                }
                                                            } else {
                                                                callback("", Order);
                                                            }
                                                        });

                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": "404"}});
                                                    }
                                                });
                                            }
                                        }

                                    });
                                }
                            });

                            break;
                        case "CancleOrderProduct":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, customer, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.OrderProductID == null || req.body.CustomerReason == null) {
                                                callback({HttpCode: 404, response: {"code": "404"}});
                                            } else {

                                                orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async orderProduct => {
                                                    if (orderProduct != null) {
                                                        await Order.findOne({where: {ID: orderProduct.OrderID}}).then(async order => {
                                                            await orderPardakht.findOne({where: {ID: order.PardakhtID}}).then(pardakht => {
                                                                if (pardakht != null) {
                                                                    if (pardakht.code_peygiri !== undefined) {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {"code": "725"}
                                                                        });
                                                                    } else {
                                                                        callback("", orderProduct);
                                                                    }
                                                                } else {
                                                                    callback("", orderProduct);
                                                                }
                                                            });

                                                        });

                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": "404"}});
                                                    }
                                                });
                                            }

                                        }

                                    });
                                }
                            });

                            break;
                        case "OrderProductTimer":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, customer, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.query.OrderProductID == null) {
                                                callback({HttpCode: 400, response: {code: "703"}});

                                            } else {

                                                orderProduct.findOne({where: {ID: req.query.OrderProductID}}).then(async orderProduct => {
                                                    if (orderProduct != null) {
                                                        await Order.findOne({where: {ID: orderProduct.OrderID}}).then(async order => {
                                                          await  orderPardakht.findOne({where: {ID: order.PardakhtID}}).then(async pardakht => {
                                                                if (pardakht != null) {
                                                                    callback("", {
                                                                        "sellerTime": order.OrderDateTime,
                                                                        "customerTime": pardakht.DateTime
                                                                    });
                                                                } else {
                                                                    callback("", {"sellerTime": order.OrderDateTime});
                                                                }
                                                            });
                                                        });
                                                    } else {
                                                        callback({HttpCode: 404, response: {code: "710"}});
                                                    }

                                                });


                                            }
                                        }

                                    });
                                }
                            });

                            break;
                        case "Alarm" :
                            switch (req.method) {
                                case "POST":
                                    if (req.body.SellerProductID == null) {
                                        callback({HttpCode: 404, response: {"code": "703"}});

                                    } else {
                                        checkToken(req, res, (err, data) => {
                                            if (err) {
                                                callback(err);
                                            }
                                            else {
                                                checkUser(data, customer, (newErr, newData) => {
                                                    if (newErr) {
                                                        callback(newErr);
                                                    }
                                                    else {
                                                        CheckForeignKey(res, [{
                                                            ID: req.body.SellerProductID,
                                                            Entity: sellerProducts
                                                        }]).then(status => {

                                                            if (status) {
                                                                AlarmsOnSellerProducts.create({
                                                                    CustomerID: newData.ID,
                                                                    SeenStatus: false,
                                                                    SellerProductID: req.body.SellerProductID
                                                                }).then(() => {
                                                                    callback("", "");
                                                                })
                                                            }
                                                        });


                                                    }

                                                });
                                            }
                                        });
                                    }
                                    break;
                                case "GET":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, customer, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    AlarmsOnSellerProducts.findAll({
                                                        where: {
                                                            CustomerID: newData.ID,
                                                            SeenStatus: false
                                                        }
                                                    }).then(
                                                        alarm => {
                                                            var newItem = [];
                                                            asyncForEach(alarm, async item => {
                                                                await PriceAndSupply.findOne({
                                                                    where: {
                                                                        DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                        SellerProductID: item.SellerProductID
                                                                    }
                                                                }).then(async price => {
                                                                    await sellerProducts.findOne({where: {ID: item.SellerProductID}}).then(async sellerP => {
                                                                        await products.findOne({where: {ID: sellerP.ProductID}}).then(async product => {
                                                                            if (price != null && price.PrimitiveSupply > 25) {
                                                                                await Seller.findOne({where: {ID: sellerP.SellerID}}).then(async seller => {
                                                                                    await newItem.push({
                                                                                        SellerName: seller.CompanyName,
                                                                                        SellerImage: seller.LogoImage || null,
                                                                                        SellerProductID: item.SellerProductID,
                                                                                        Supply: true,
                                                                                        SellerProductName: product.Name
                                                                                    });
                                                                                    item.update({SeenStatus: true});
                                                                                });

                                                                            } else {
                                                                                await Seller.findOne({where: {ID: sellerP.SellerID}}).then(async seller => {
                                                                                    await newItem.push({
                                                                                        SellerName: seller.CompanyName,
                                                                                        SellerImage: seller.LogoImage || null,
                                                                                        SellerProductID: item.SellerProductID,
                                                                                        Supply: false,
                                                                                        SellerProductName: product.Name
                                                                                    });
                                                                                });
                                                                            }
                                                                        });
                                                                    });

                                                                });
                                                            }).then(() => {
                                                                callback("", newItem);
                                                            });

                                                        }
                                                    );
                                                }

                                            });
                                        }
                                    });

                                    break;
                            }


                            break;
                        case "FinalStatus":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, customer, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.OrderProdcutID == null) {
                                                callback({HttpCode: 404, response: {"code": "404"}});
                                            } else {
                                                sendSMS(newData, AlramMessages("FinalStatus", ""));

                                                orderProduct.update({CustomerFinalStatus: true}, {where: {ID: req.body.OrderProductID}}).then(() => {
                                                    callback("", "")
                                                })
                                            }
                                        }

                                    });
                                }
                            });
                            break;

                    }

                    break;
                case "productManager":
                    switch (req.originalUrl.substring(8).split("/")[1]) {
                        case "Order":
                            switch (req.method) {
                                case "GET":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, SellerProductionManager, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    orderProduct.findAll({
                                                        where: {
                                                            SellerOperatorStatus: null,
                                                            DeleteStatus: false,
                                                            CustomerStatus: true
                                                        }
                                                    }).then(async orderProducts => {
                                                        var newItems = [];
                                                        await asyncForEach(orderProducts, async item => {
                                                            await item.update({ProductionManagerStatus: true}).then(async () => {
                                                                await sellerProducts.findOne({where: {ID: item.ProductID}}).then(async SP => {
                                                                    await products.findOne({where: {ID: SP.ProductID}}).then(async P => {
                                                                        await PriceAndSupply.findOne({
                                                                            where: {
                                                                                SellerProductID: SP.ID,
                                                                                DateTime: new Date().toISOString().slice(0, 10).toString()
                                                                            }
                                                                        }).then(async price => {
                                                                            if (P.Type) {
                                                                                await newItems.push({
                                                                                    orderProduct: item,
                                                                                    SellerProduct: SP,
                                                                                    Product: P,
                                                                                    Price: price
                                                                                });
                                                                            }
                                                                        });
                                                                    });

                                                                });

                                                            });
                                                        });
                                                        callback("", newItems);

                                                    });


                                                }

                                            });
                                        }
                                    });
                                    break;
                                case "PUT":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, SellerProductionManager, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    if (req.body.OrderProductID == null || req.body.Status == null) {
                                                        callback({HttpCode: 404, response: {"code": 703}});
                                                    } else {

                                                        orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(orderProducts => {
                                                            callback("", orderProducts);
                                                        });

                                                    }
                                                }

                                            });
                                        }
                                    });
                                    break;

                            }
                            break;
                        case "Pricing":
                            checkLimitTime(res, (Timeerr, Timedata) => {
                                if (Timeerr) {
                                    callback(Timeerr);
                                } else {
                                    if (Timedata) {
                                        checkToken(req, res, (err, data) => {
                                            if (err) {
                                                callback(err);
                                            }
                                            else {
                                                checkUser(data, SellerProductionManager, (newErr, newData) => {
                                                    if (newErr) {
                                                        callback(newErr);
                                                    }
                                                    else {

                                                        if (req.body.SellerProductID == null) {
                                                            callback({
                                                                HttpCode: 400,
                                                                response: {"code": 703}
                                                            });
                                                        } else {
                                                            CheckForeignKey(res, [{
                                                                ID: req.body.SellerProductID,
                                                                Entity: sellerProducts
                                                            }])
                                                                .then(status => {

                                                                    if (status) {
                                                                        PriceAndSupply.findAll({
                                                                            where: {
                                                                                SellerProductID: req.body.SellerProductID,
                                                                                DateTime: new Date().toISOString().slice(0, 10).toString()
                                                                            }
                                                                        }).then(PriceAndSupply => {

                                                                            if (!isThisArrayEmpty(PriceAndSupply)) {

                                                                                sellerProducts.findOne({where: {ID: req.body.SellerProductID}}).then(sellerProducts => {
                                                                                    products.findOne({where: {ID: sellerProducts.ProductID}}).then(product => {
                                                                                        if (product.Type) {
                                                                                            if (
                                                                                                req.body.SellerProductID == null ||
                                                                                                req.body.Price == null ||
                                                                                                req.body.Supply == null
                                                                                            ) {
                                                                                                callback({
                                                                                                    HttpCode: 400,
                                                                                                    response: {"code": 703}
                                                                                                });
                                                                                            } else {
                                                                                                callback("", {
                                                                                                    whatToDo: "update",
                                                                                                    Entity: PriceAndSupply[0],
                                                                                                    data: {
                                                                                                        SellerProductID: req.body.SellerProductID,
                                                                                                        PrimitiveSupply: parseInt(PriceAndSupply[0].AddedSupply || 0 ) + parseInt(PriceAndSupply[0].PrimitiveSupply || 0),
                                                                                                        Price: req.body.Price,
                                                                                                        AddedSupply: req.body.Supply
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        } else {
                                                                                            callback({
                                                                                                HttpCode: 400,
                                                                                                response: {"code": 722}
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                });

                                                                            }
                                                                            else {
                                                                                if (
                                                                                    req.body.SellerProductID == null ||
                                                                                    req.body.Price == null ||
                                                                                    req.body.Supply == null ||
                                                                                    req.body.UnitIDOfSupply == null
                                                                                ) {
                                                                                    callback({
                                                                                        HttpCode: 400,
                                                                                        response: {"code": 703}
                                                                                    });
                                                                                } else {
                                                                                    CheckForeignKey(res, [{
                                                                                        ID: req.body.UnitIDOfSupply,
                                                                                        Entity: unit
                                                                                    }]).then(status => {
                                                                                        if (status) {
                                                                                            callback("", {
                                                                                                whatToDo: "create",
                                                                                                data: {
                                                                                                    SellerProductID: req.body.SellerProductID,
                                                                                                    DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                                                    Price: req.body.Price,
                                                                                                    PrimitiveSupply: req.body.Supply,
                                                                                                    UnitIDOfSupply: req.body.UnitIDOfSupply
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }

                                                                            }
                                                                        });

                                                                    }
                                                                });

                                                        }

                                                    }

                                                });
                                            }
                                        });
                                    }
                                }
                            });
                            break;
                        case "product":
                            switch (req.method) {
                                case "GET":

                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, SellerProductionManager, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {

                                                    sellerProducts.findAll({where: {SellerID: newData.SellerID}}).then(async sellerProducts => {
                                                        var newSellerProducts = [];
                                                        asyncForEach(sellerProducts, async item => {
                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(item.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            await PriceAndSupply.findAll({
                                                                where: {
                                                                    SellerProductID: item.ID
                                                                }
                                                            }).then(async PriceAndSupply => {
                                                                await SellerProductsInServiceCitie.findAll({
                                                                    where: {
                                                                        SellerProductID: item.ID
                                                                    }
                                                                }).then(async SellerProductsInServiceCitie => {
                                                                    newSellerProducts.push({
                                                                        sellerProduct: {
                                                                            ID: item.ID,
                                                                            Image: base64str,
                                                                            SellerID: item.SellerID,
                                                                            ProductID: item.ProductID,
                                                                            UnitOfProduct: item.UnitOfProduct,
                                                                            UnitID: item.UnitID,
                                                                            MinToSell: item.MinToSell,
                                                                            ShowStatus: item.ShowStatus,
                                                                            Description: item.Description,
                                                                            DiscountFor0TO200: item.DiscountFor0TO200,
                                                                            DiscountFor200TO500: item.DiscountFor200TO500,
                                                                            DiscountFor500TO1000: item.DiscountFor500TO1000,
                                                                            DiscountFor1000TOUpper: item.DiscountFor1000TOUpper,
                                                                        },
                                                                        PriceAndSupply: PriceAndSupply[PriceAndSupply.length - 1],
                                                                        CityInService: SellerProductsInServiceCitie

                                                                    });
                                                                });
                                                            });
                                                        }).then(
                                                            () => {
                                                                callback("", newSellerProducts);
                                                            }
                                                        );
                                                    });
                                                }

                                            });
                                        }
                                    });
                                    break;

                            }
                            break;
                        case "accept":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, SellerProductionManager, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            callback("",newData);

                                        }

                                    });
                                }
                            });


                            break;

                    }

                    break;
                case "sellerOperator":
                    switch (req.originalUrl.substring(8).split("/")[1].split("?").shift()) {
                        case "Pricing":

                            checkLimitTime(res, (Timeerr, Timedata) => {
                                if (Timeerr) {
                                    callback(Timeerr);
                                } else {
                                    if (Timedata) {
                                        checkToken(req, res, (err, data) => {
                                            if (err) {
                                                callback(err);
                                            }
                                            else {
                                                checkUser(data, sellerOperator, (newErr, newData) => {
                                                    if (newErr) {
                                                        callback(newErr);
                                                    }
                                                    else {

                                                        if (req.body.SellerProductID == null) {
                                                            callback({
                                                                HttpCode: 400,
                                                                response: {"code": 703}
                                                            });
                                                        } else {
                                                            CheckForeignKey(res, [{
                                                                ID: req.body.SellerProductID,
                                                                Entity: sellerProducts
                                                            }])
                                                                .then(status => {
                                                                    if (status) {
                                                                        sellerProducts.findOne({where:{ID:req.body.SellerProductID}}).then(async SP=>{
                                                                            await products.findOne({where:{ID:SP.ProductID}}).then(async P=>{
                                                                                if (P.CategoryID === 4){
                                                                                   await PriceAndSupply.findAll({
                                                                                        where: {
                                                                                            SellerProductID: req.body.SellerProductID,
                                                                                            DateTime: new Date().toISOString().slice(0, 10).toString()
                                                                                        }
                                                                                    }).
                                                                                    then( async PriceAndSupply => {
                                                                                        
                                                                                        var statuss =  false;
                                                                                       var date = new Date();
                                                                                       var current_hour = date.getHours();
                                                                                       var current_Minutes = date.getMinutes();
                                                                                       await asyncForEach(MonjamedVaredatiTimeLimit,async item =>{
                                                                                            if ( parseInt(current_hour) === item) {
                                                                                                if (30<parseInt(current_Minutes)<40) {
                                                                                                    statuss = true ;
                                                                                                }
                                                                                            }
                                                                                        }).then(()=>{
                                                                                            if (statuss){
                                                                                                if (!isThisArrayEmpty(PriceAndSupply)) {

                                                                                                    sellerProducts.findOne({where: {ID: req.body.SellerProductID}}).then(sellerProducts => {
                                                                                                        products.findOne({where: {ID: sellerProducts.ProductID}}).then(product => {
                                                                                                            if (product.Type) {
                                                                                                                if (
                                                                                                                    req.body.SellerProductID == null ||
                                                                                                                    req.body.Price == null ||
                                                                                                                    req.body.Supply == null
                                                                                                                ) {
                                                                                                                    callback({
                                                                                                                        HttpCode: 400,
                                                                                                                        response: {"code": 703}
                                                                                                                    });
                                                                                                                } else {
                                                                                                                    callback("", {
                                                                                                                        whatToDo: "update",
                                                                                                                        Entity: PriceAndSupply[0],
                                                                                                                        data: {
                                                                                                                            SellerProductID: req.body.SellerProductID,
                                                                                                                            Price: req.body.Price,
                                                                                                                            AddedSupply: req.body.Supply
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            } else {
                                                                                                                callback({
                                                                                                                    HttpCode: 400,
                                                                                                                    response: {"code": 722}
                                                                                                                });
                                                                                                            }
                                                                                                        });
                                                                                                    });

                                                                                                }
                                                                                                else {
                                                                                                    if (
                                                                                                        req.body.SellerProductID == null ||
                                                                                                        req.body.Price == null ||
                                                                                                        req.body.Supply == null ||
                                                                                                        req.body.UnitIDOfSupply == null
                                                                                                    ) {
                                                                                                        callback({
                                                                                                            HttpCode: 400,
                                                                                                            response: {"code": 703}
                                                                                                        });
                                                                                                    } else {
                                                                                                        CheckForeignKey(res, [{
                                                                                                            ID: req.body.UnitIDOfSupply,
                                                                                                            Entity: unit
                                                                                                        }]).then(status => {
                                                                                                            if (status) {
                                                                                                                callback("", {
                                                                                                                    whatToDo: "create",
                                                                                                                    data: {
                                                                                                                        SellerProductID: req.body.SellerProductID,
                                                                                                                        DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                                                                        Price: req.body.Price,
                                                                                                                        PrimitiveSupply: req.body.Supply,
                                                                                                                        UnitIDOfSupply: req.body.UnitIDOfSupply
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        });
                                                                                                    }

                                                                                                }
                                                                                            } else {
                                                                                                callback({
                                                                                                    HttpCode: 400,
                                                                                                    response: {"code": 729}
                                                                                                });
                                                                                            }

                                                                                       });
                                                                                    });
                                                                                }
                                                                                else {
                                                                                   await PriceAndSupply.findAll({
                                                                                        where: {
                                                                                            SellerProductID: req.body.SellerProductID,
                                                                                            DateTime: new Date().toISOString().slice(0, 10).toString()
                                                                                        }
                                                                                    }).
                                                                                    then(PriceAndSupply => {

                                                                                        if (!isThisArrayEmpty(PriceAndSupply)) {

                                                                                            sellerProducts.findOne({where: {ID: req.body.SellerProductID}}).then(sellerProducts => {
                                                                                                products.findOne({where: {ID: sellerProducts.ProductID}}).then(product => {
                                                                                                    if (product.Type) {
                                                                                                        if (
                                                                                                            req.body.SellerProductID == null ||
                                                                                                            req.body.Price == null ||
                                                                                                            req.body.Supply == null
                                                                                                        ) {
                                                                                                            callback({
                                                                                                                HttpCode: 400,
                                                                                                                response: {"code": 703}
                                                                                                            });
                                                                                                        } else {
                                                                                                            callback("", {
                                                                                                                whatToDo: "update",
                                                                                                                Entity: PriceAndSupply[0],
                                                                                                                data: {
                                                                                                                    SellerProductID: req.body.SellerProductID,
                                                                                                                    Price: req.body.Price,
                                                                                                                    AddedSupply: req.body.Supply
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    } else {
                                                                                                        callback({
                                                                                                            HttpCode: 400,
                                                                                                            response: {"code": 722}
                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            });

                                                                                        }
                                                                                        else {
                                                                                            if (
                                                                                                req.body.SellerProductID == null ||
                                                                                                req.body.Price == null ||
                                                                                                req.body.Supply == null ||
                                                                                                req.body.UnitIDOfSupply == null
                                                                                            ) {
                                                                                                callback({
                                                                                                    HttpCode: 400,
                                                                                                    response: {"code": 703}
                                                                                                });
                                                                                            } else {
                                                                                                CheckForeignKey(res, [{
                                                                                                    ID: req.body.UnitIDOfSupply,
                                                                                                    Entity: unit
                                                                                                }]).then(status => {
                                                                                                    if (status) {
                                                                                                        callback("", {
                                                                                                            whatToDo: "create",
                                                                                                            data: {
                                                                                                                SellerProductID: req.body.SellerProductID,
                                                                                                                DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                                                                Price: req.body.Price,
                                                                                                                PrimitiveSupply: req.body.Supply,
                                                                                                                UnitIDOfSupply: req.body.UnitIDOfSupply
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            }

                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        });
                                                                    }
                                                                });

                                                        }

                                                    }

                                                });
                                            }
                                        });
                                    }
                                }
                            });

                            break;
                        case "ExactSupply":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.ExactSupply == null || req.body.OrderProdutID == null ){
                                                callback({HttpCode: 404, response: {response: "703"}});
                                            } else {
                                                orderProduct.findOne({where:{ID:req.body.OrderProdutID}}).then(async OP=>{
                                                    if (OP != null){
                                                       await OP.update({ExactSupply: req.body.ExactSupply}).then(()=>{
                                                           callback("","");
                                                       });
                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": 710}});
                                                    }
                                                });
                                            }

                                            callback("",newData);

                                        }

                                    });
                                }
                            });
                            break;
                        case "accept":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            callback("",newData);

                                        }

                                    });
                                }
                            });


                            break;
                        case "ScatteredTransportation":
                            switch (req.method) {
                                case "POST":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, sellerOperator, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    if (req.body.Name == null || req.body.FamilyName == null || req.body.ModelID == null || req.body.PhoneNumber == null || req.body.PelakNumber == null ) {
                                                        callback({HttpCode: 400, response: {code: "703"}});
                                                    } else {
                                                        sequelize.transaction().then(function (t) {
                                                            transportation.create({
                                                                TransportationType: true,
                                                                Name:req.body.Name,
                                                                FamilyName:req.body.FamilyName,
                                                                ModelID:req.body.ModelID,
                                                                PhoneNumber:req.body.PhoneNumber,
                                                                PelakNumber:req.body.PelakNumber

                                                            }, {
                                                                transaction: t
                                                            }).then(savedTran => {
                                                                t.commit();
                                                                callback("",savedTran);
                                                            }).catch(function (error) {
                                                                t.rollback();
                                                                console.log(error)
                                                                return res.status(500).json({"code": 500});
                                                            });
                                                        });

                                                    }

                                                }

                                            });
                                        }
                                    });
                                    break
                                case "PUT":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, sellerOperator, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    if (req.body.ID == null  ) {
                                                        callback({HttpCode: 400, response: {code: "703"}});
                                                    } else {
                                                        transportation.findOne({where:{ID:req.body.ID}}).then(tran=>{
                                                            if (tran != null){
                                                                sequelize.transaction().then(function (t) {
                                                                    transportation.update({
                                                                        Name:req.body.Name ||tran.Name ,
                                                                        FamilyName: req.body.FamilyName ||tran.FamilyName ,
                                                                        ModelID:req.body.ModelID ||tran.ModelID ,
                                                                        PhoneNumber:  req.body.PhoneNumber ||tran.PhoneNumber ,
                                                                        PelakNumber:req.body.PelakNumber ||tran.PelakNumber

                                                                    },{where:{ID:req.body.ID}}, {
                                                                        transaction: t
                                                                    }).then(savedTran => {
                                                                        t.commit();
                                                                        callback("","");
                                                                    }).catch(function (error) {
                                                                        t.rollback();
                                                                        console.log(error)
                                                                        return res.status(500).json({"code": 500});
                                                                    });
                                                                });

                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }

                                                        });

                                                    }

                                                }

                                            });
                                        }
                                    });
                                    break;
                            }
                            break;
                        case "ServiceCities":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {

                                            if (req.body.CityID == null || req.body.SellerProductID == null) {
                                                callback({HttpCode: 400, response: {code: "703"}});

                                            } else {
                                                sellerProducts.findOne({
                                                    where: {
                                                        ID: req.body.SellerProductID
                                                    }
                                                }).then(sellerproduct => {
                                                    if (sellerproduct != null) {
                                                        callback("", {
                                                            SellerProductID: req.body.SellerProductID,
                                                            CityID: req.body.CityID
                                                        });
                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": 710}});
                                                    }
                                                });

                                            }
                                        }

                                    });
                                }
                            });

                            break;
                        case "OrderProductTimer":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.query.OrderProductID == null) {
                                                callback({HttpCode: 400, response: {code: "703"}});

                                            } else {

                                                orderProduct.findOne({where: {ID: req.query.OrderProductID}}).then(async orderProduct => {
                                                    if (orderProduct != null) {
                                                        await Order.findOne({where: {ID: orderProduct.OrderID}}).then(async order => {
                                                            orderPardakht.findOne({where: {ID: order.PardakhtID}}).then(pardakht => {
                                                                if (pardakht != null) {
                                                                    callback("", {
                                                                        "sellerTime": order.OrderDateTime,
                                                                        "customerTime": pardakht.DateTime
                                                                    });
                                                                } else {
                                                                    callback("", {"sellerTime": order.OrderDateTime});
                                                                }
                                                            });
                                                        });
                                                    } else {
                                                        callback({HttpCode: 404, response: {code: "710"}});
                                                    }

                                                });


                                            }
                                        }

                                    });
                                }
                            });

                            break;
                        case "ProductInfo":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {


                                            if (req.body.SellerProductID == null) {
                                                callback({HttpCode: 404, response: {"code": 703}});
                                            } else {

                                                sellerProducts.findOne({where: {ID: req.body.SellerProductID}}).then(
                                                    sellerproduct => {
                                                        if (sellerproduct != null) {
                                                            callback("", sellerproduct);

                                                        } else {
                                                            callback({HttpCode: 404, response: {"code": 710}});
                                                        }

                                                    }
                                                );


                                            }


                                        }

                                    });
                                }
                            });
                            break;
                        case "Order":
                            switch (req.method) {
                                case "GET":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, sellerOperator, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    orderProduct.findAll({
                                                        where: {
                                                            SellerOperatorID: newData.ID,
                                                            DeleteStatus: false,
                                                            CustomerStatus: true
                                                        }
                                                    }).then(async orderProducts => {
                                                        var NewOrderProducts = [];
                                                        await asyncForEach(orderProducts, async item => {
                                                            await Order.findOne({
                                                                where: {
                                                                    ID: item.OrderID
                                                                }
                                                            }).then(async order => {
                                                                await customer.findOne({where: {ID: order.CustomerID}}).then(async NEWcustomer => {
                                                                    await PriceAndSupply.findOne({
                                                                        where: {
                                                                            DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                            SellerProductID: item.ProductID
                                                                        }
                                                                    }).then(async Price => {
                                                                        await sellerProducts.findOne({where: {ID: item.ProductID}}).then(async sellerProduct => {
                                                                            await products.findOne({where: {ID: sellerProduct.ProductID}}).then(async product => {
                                                                                await orderPardakht.findOne({where: {ID: order.PardakhtID}}).then(async pardakht => {
                                                                                    await addresses.findOne({where:{ID:item.CustomerAddressID}}).then(async address =>{
                                                                                        if (pardakht != null)
                                                                                        {
                                                                                            await NewOrderProducts.push({
                                                                                                ID: item.ID,
                                                                                                RemainingTime: order.OrderDateTime,
                                                                                                OrderID: item.OrderID,
                                                                                                CustomerAddress:address,
                                                                                                PardakhtRemainingTime: pardakht.DateTime,
                                                                                                ForwardingDatetime: item.ForwardingDatetime,
                                                                                                TurnOfForwarding: item.TurnOfForwarding,
                                                                                                CustomerAddressID: item.CustomerAddressID,
                                                                                                FinalDiscount: item.FinalDiscount,
                                                                                                ProductID: item.ProductID,
                                                                                                DemendSupply: item.Supply,
                                                                                                UnitOfProduct: item.UnitOfProduct,
                                                                                                UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                CustomerStatus: item.CustomerStatus,
                                                                                                SellerOperatorFinalStatus: item.SellerOperatorFinalStatus,
                                                                                                SellerOperatorStatus: item.SellerOperatorStatus,
                                                                                                SellerOperatorID: item.SellerOperatorID,
                                                                                                WareHouseID: item.WareHouseID,
                                                                                                TransportarID: item.TransportarID,
                                                                                                ProductionManagerStatus: item.ProductionManagerStatus,
                                                                                                CustomerFinalStatus: item.CustomerFinalStatus,
                                                                                                SumTotal: item.SumTotal,
                                                                                                OnlineFee: item.OnlineFee,
                                                                                                InplaceFee: item.InpalceFee,
                                                                                                AvailableSupply: Price,
                                                                                                CustomerName: NEWcustomer.Name,
                                                                                                product: product,
                                                                                                pardakht: pardakht


                                                                                            })
                                                                                        }
                                                                                        else {
                                                                                            await NewOrderProducts.push({
                                                                                                ID: item.ID,
                                                                                                RemainingTime: order.OrderDateTime,
                                                                                                OrderID: item.OrderID,
                                                                                                CustomerAddress:address,
                                                                                                ForwardingDatetime: item.ForwardingDatetime,
                                                                                                TurnOfForwarding: item.TurnOfForwarding,
                                                                                                CustomerAddressID: item.CustomerAddressID,
                                                                                                FinalDiscount: item.FinalDiscount,
                                                                                                ProductID: item.ProductID,
                                                                                                DemendSupply: item.Supply,
                                                                                                UnitOfProduct: item.UnitOfProduct,
                                                                                                UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                CustomerStatus: item.CustomerStatus,
                                                                                                SellerOperatorFinalStatus: item.SellerOperatorFinalStatus,
                                                                                                SellerOperatorStatus: item.SellerOperatorStatus,
                                                                                                SellerOperatorID: item.SellerOperatorID,
                                                                                                WareHouseID: item.WareHouseID,
                                                                                                TransportarID: item.TransportarID,
                                                                                                ProductionManagerStatus: item.ProductionManagerStatus,
                                                                                                CustomerFinalStatus: item.CustomerFinalStatus,
                                                                                                SumTotal: item.SumTotal,
                                                                                                OnlineFee: item.OnlineFee,
                                                                                                InplaceFee: item.InpalceFee,
                                                                                                AvailableSupply: Price,
                                                                                                CustomerName: NEWcustomer.Name,
                                                                                                product: product,
                                                                                                pardakht: pardakht


                                                                                            })
                                                                                        }
                                                                                    });
                                                                                });

                                                                            })

                                                                        });
                                                                    });

                                                                });
                                                            });

                                                        }).then(() => {
                                                            callback("", NewOrderProducts);

                                                        });

                                                    });


                                                }

                                            });
                                        }
                                    });
                                    break;
                                case "PUT":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, sellerOperator, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    if (req.body.OrderProductID == null || req.body.Status == null) {
                                                        callback({HttpCode: 404, response: {"code": 703}});
                                                    } else {

                                                        orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(orderProducts => {
                                                            Order.findOne({where: {ID: orderProducts.OrderID}}).then(order => {
                                                                callback("", order);
                                                            });
                                                        });

                                                    }
                                                }

                                            });
                                        }
                                    });
                                    break;
                            }
                            break;
                        case "FinalOrder":

                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.OrderProductID == null || req.body.Status == null || req.body.WareHouseID == null) {
                                                callback({HttpCode: 404, response: {"code": 703}});
                                            } else {

                                                orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(orderProducts => {
                                                    orderProducts.update({WareHouseID: req.body.WareHouseID});
                                                    Order.findOne({where: {ID: orderProducts.OrderID}}).then(order => {
                                                        callback("", order);
                                                    });
                                                });

                                            }
                                        }

                                    });
                                }
                            });
                            break;
                        case "CancleOrderProduct":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (newData.Enabled) {
                                                if (req.body.OrderProductID == null || req.body.SellerReason == null) {
                                                    callback({HttpCode: 404, response: {"code": "404"}});
                                                } else {

                                                    orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async orderProduct => {
                                                        if (orderProduct != null) {
                                                            await Order.findOne({where: {ID: orderProduct.OrderID}}).then(async order => {
                                                                await orderPardakht.findOne({where: {ID: order.PardakhtID}}).then(pardakht => {
                                                                    if (pardakht != null) {
                                                                        if (pardakht.code_peygiri !== undefined) {
                                                                            callback({
                                                                                HttpCode: 404,
                                                                                response: {"code": "725"}
                                                                            });
                                                                        } else {
                                                                            callback("", orderProduct);
                                                                        }
                                                                    } else {
                                                                        callback("", orderProduct);
                                                                    }
                                                                });

                                                            });

                                                        } else {
                                                            callback({HttpCode: 404, response: {"code": "404"}});
                                                        }
                                                    });
                                                }


                                            } else {
                                                callback({HttpCode: 404, response: {"code": 900}});
                                            }
                                        }

                                    });
                                }
                            });

                            break;
                        case "Fee":

                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.OrderProductID == null || req.body.OnlineFee == null || req.body.InplaceFee == null) {
                                                callback({HttpCode: 404, response: {"code": 703}});
                                            } else {
                                                orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async orderProduct => {
                                                    await products.findOne({ID:orderProduct.ProductID}).then( product =>{
                                                        if (product.CategoryID === "4"){
                                                            
                                                            if (req.body.OnlineFee > ((orderProduct.SumTotal * 80)/100)) {
                                                                callback({HttpCode: 404, response: {"code": 730}});
                                                            }else {
                                                                if (orderProduct !== null) {
                                                                    callback("", orderProduct);
                                                                } else {
                                                                    callback({HttpCode: 404, response: {"code": 710}});
                                                                }
                                                            }
                                                            
                                                        } else {
                                                            if (orderProduct !== null) {
                                                                callback("", orderProduct);
                                                            } else {
                                                                callback({HttpCode: 404, response: {"code": 710}});
                                                            }
                                                        }
                                                        
                                                    });
                                                });

                                            }
                                        }

                                    });
                                }
                            });
                            break;
                        case "SubType":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {

                                            sellerOperator.findAll({where: {SellerID: newData.SellerID}}).then(async SO => {
                                                await Seller.findAll({where: {SellerParentID: newData.SellerID}}).then(async S => {
                                                    await SellerProductionManager.findAll({where: {SellerID: newData.SellerID}}).then(async PM => {
                                                        await sellerWareHouse.findAll({where: {SellerID: newData.SellerID}}).then(async WH => {
                                                            await TransportationManager.findAll().then(async TM => {
                                                                var TP = [];
                                                                await asyncForEach(WH, async item => {
                                                                    await transportation.findAll({where: {WareHouseID: item.ID}}).then(
                                                                        async Trans => {
                                                                            if (Trans != null) {
                                                                                await TP.push(Trans);
                                                                            }
                                                                        }
                                                                    );
                                                                });
                                                                callback("", {
                                                                    sellerOperator: SO,
                                                                    seller: S,
                                                                    productManager: PM,
                                                                    wareHouses: WH,
                                                                    Transportaration: TP,
                                                                    TransportationManager: TM
                                                                });
                                                            });
                                                        })
                                                    })

                                                });

                                            });


                                        }

                                    });
                                }
                            });
                            break;
                        case "product":
                            switch (req.method) {
                                case "GET":

                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, sellerOperator, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {

                                                    sellerProducts.findAll({where: {SellerID: newData.SellerID}}).then(async sellerProducts => {
                                                        var newSellerProducts = [];
                                                        asyncForEach(sellerProducts, async item => {
                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(item.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            await PriceAndSupply.findAll({
                                                                where: {
                                                                    SellerProductID: item.ID
                                                                }
                                                            }).then(async PriceAndSupply => {
                                                                await SellerProductsInServiceCitie.findAll({
                                                                    where: {
                                                                        SellerProductID: item.ID
                                                                    }
                                                                }).then(async SellerProductsInServiceCitie => {
                                                                    newSellerProducts.push({
                                                                        sellerProduct: {
                                                                            ID: item.ID,
                                                                            Image: base64str,
                                                                            SellerID: item.SellerID,
                                                                            ProductID: item.ProductID,
                                                                            UnitOfProduct: item.UnitOfProduct,
                                                                            UnitID: item.UnitID,
                                                                            MinToSell: item.MinToSell,
                                                                            ShowStatus: item.ShowStatus,
                                                                            Description: item.Description,
                                                                            DiscountFor0TO200: item.DiscountFor0TO200,
                                                                            DiscountFor200TO500: item.DiscountFor200TO500,
                                                                            DiscountFor500TO1000: item.DiscountFor500TO1000,
                                                                            DiscountFor1000TOUpper: item.DiscountFor1000TOUpper,
                                                                        },
                                                                        PriceAndSupply: PriceAndSupply[PriceAndSupply.length - 1],
                                                                        CityInService: SellerProductsInServiceCitie

                                                                    });
                                                                });
                                                            });
                                                        }).then(
                                                            () => {
                                                                callback("", newSellerProducts);
                                                            }
                                                        );
                                                    });
                                                }

                                            });
                                        }
                                    });
                                    break;

                            }
                            break;
                        case "ServiceCitiesDelete":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {

                                            if (req.body.ID == null) {
                                                callback({HttpCode: 400, response: {code: "703"}});

                                            } else {
                                                SellerProductsInServiceCitie.findOne({
                                                    where: {
                                                        ID: req.body.ID
                                                    }
                                                }).then(SellerProductsInServiceCitie => {
                                                    if (SellerProductsInServiceCitie != null) {
                                                        callback("", SellerProductsInServiceCitie);
                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": 710}});
                                                    }
                                                });

                                            }
                                        }

                                    });
                                }
                            });

                            break;
                        case "OrderProductInfo":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, sellerOperator, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {


                                            if (req.body.OrderProductID == null || req.body.ProvidedSupply == null || req.body.TransportationFare == null ) {
                                                callback({HttpCode: 404, response: {"code": 703}});
                                            } else {

                                                orderProduct.findOne({where:{ID:req.body.OrderProductID}}).then(orderP=>{
                                                    if (orderP != null){
                                                        var TransportationFare = null | req.body.TransportationFare;
                                                        var ProvidedSupply = req.body.ProvidedSupply;
                                                        var FinalDiscount = orderP.FinalDiscount | req.body.FinalDiscount;
                                                        var TurnOfForwarding = orderP.TurnOfForwarding | req.body.TurnOfForwarding;
                                                        orderP.update({
                                                            TransportationFare: TransportationFare,
                                                            ProvidedSupply:ProvidedSupply,
                                                            FinalDiscount:FinalDiscount,
                                                            TurnOfForwarding:TurnOfForwarding
                                                        }).then(()=>{callback("","");});
                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": 710}});

                                                    }

                                                });


                                            }


                                        }

                                    });
                                }
                            });
                            break

                    }

                    break;
                case "transportationManager":
                    switch (req.originalUrl.substring(8).split("/")[1].split("?").shift()) {
                        case "orderProduct":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, TransportationManager, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            // todo inja bug e
                                            orderProduct.findAll({
                                                where: {
                                                    WareHouseID: newData.WareHouseID,
                                                    SellerOperatorFinalStatus: true
                                                }
                                            }).then(orderProduct => {
                                                var newItem = [];
                                                asyncForEach(orderProduct, async item => {
                                                    if (parseInt(item.OnlineFee) === 0) {
                                                        await sellerProducts.findOne({where: {ID: item.ProductID}}).then(async SP => {
                                                            await products.findOne({where: {ID: SP.ProductID}}).then(async P => {
                                                                await addresses.findOne({where: {ID: item.CustomerAddressID}}).then(async address => {
                                                                    await newItem.push({
                                                                        OrderProduct: item,
                                                                        product: P,
                                                                        address: address
                                                                    });

                                                                });
                                                            })
                                                        })
                                                    } else {
                                                        await Order.findOne({where: {ID: item.OrderID}}).then(async Order => {
                                                            if (Order.PardakhtID != null) {
                                                                await orderPardakht.findOne({where: Order.PardakhtID}).then(async pardakht => {
                                                                    if (pardakht.CodePeygiri != null) {
                                                                        await sellerProducts.findOne({where: {ID: item.ProductID}}).then(async SP => {
                                                                            await products.findOne({where: {ID: SP.ProductID}}).then(async P => {
                                                                                await addresses.findOne({where: {ID: item.CustomerAddressID}}).then(async address => {
                                                                                    await newItem.push({
                                                                                        OrderProduct: item,
                                                                                        product: P,
                                                                                        address: address
                                                                                    });

                                                                                });
                                                                            })
                                                                        })
                                                                    }
                                                                })
                                                            }

                                                        })
                                                    }
                                                }).then(() => {
                                                    callback("", newItem)

                                                });


                                            })

                                        }

                                    });
                                }
                            });
                            break;
                        case "accept":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, TransportationManager, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            callback("",newData);

                                        }

                                    });
                                }
                            });


                            break;
                        case "transportation":
                            switch (req.method) {
                                case "GET":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, TransportationManager, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {

                                                    sellerWareHouse.findOne({where: {ID: newData.WareHouseID}}).then(async wareHouses => {
                                                        await transportation.findAll({where: {WareHouseID: wareHouses.ID}}).then(async trans => {
                                                            await callback("", trans);
                                                        })

                                                    })

                                                }

                                            });
                                        }
                                    });
                                    break;
                                case "POST":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, TransportationManager, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    if (req.body.TransportationID != null || req.body.OrderProductID != null) {

                                                        CheckForeignKey(res, [{
                                                            ID: req.body.OrderProductID,
                                                            Entity: orderProduct
                                                        }, {
                                                            ID: req.body.TransportationID,
                                                            Entity: transportation
                                                        }]).then(status => {
                                                            if (status) {
                                                                orderProduct.update({TransportarID: req.body.TransportationID}, {where: {ID: req.body.OrderProductID}}).then(async () => {
                                                                    await transportation.findOne({where: {ID: req.body.TransportationID}}).then(tran => {
                                                                        sendSMS(tran, AlramMessages("transportation"));
                                                                        callback("", "");
                                                                    });

                                                                });

                                                            }
                                                        });

                                                    } else {
                                                        callback({HttpCode: 400, response: {response: "703"}});
                                                    }

                                                }

                                            });
                                        }
                                    });
                                    break;
                            }

                            break;
                        case "ScatteredTransportation":
                            switch (req.method) {
                                case "POST":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, TransportationManager, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    if (req.body.Name == null || req.body.FamilyName == null || req.body.ModelID == null || req.body.PhoneNumber == null || req.body.PelakNumber == null ) {
                                                        callback({HttpCode: 400, response: {code: "703"}});
                                                    } else {
                                                        sequelize.transaction().then(function (t) {
                                                            transportation.create({
                                                                TransportationType: true,
                                                                Name:req.body.Name,
                                                                FamilyName:req.body.FamilyName,
                                                                ModelID:req.body.ModelID,
                                                                PhoneNumber:req.body.PhoneNumber,
                                                                PelakNumber:req.body.PelakNumber

                                                            }, {
                                                                transaction: t
                                                            }).then(savedTran => {
                                                                t.commit();
                                                                callback("",savedTran);
                                                            }).catch(function (error) {
                                                                t.rollback();
                                                                console.log(error)
                                                                return res.status(500).json({"code": 500});
                                                            });
                                                        });

                                                    }

                                                }

                                            });
                                        }
                                    });
                                    break
                                case "PUT":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, TransportationManager, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {
                                                    if (req.body.ID == null  ) {
                                                        callback({HttpCode: 400, response: {code: "703"}});
                                                    } else {
                                                        transportation.findOne({where:{ID:req.body.ID}}).then(tran=>{
                                                            if (tran != null){
                                                                sequelize.transaction().then(function (t) {
                                                                    transportation.update({
                                                                        Name:req.body.Name ||tran.Name ,
                                                                        FamilyName: req.body.FamilyName ||tran.FamilyName ,
                                                                        ModelID:req.body.ModelID ||tran.ModelID ,
                                                                        PhoneNumber:  req.body.PhoneNumber ||tran.PhoneNumber ,
                                                                        PelakNumber:req.body.PelakNumber ||tran.PelakNumber

                                                                    },{where:{ID:req.body.ID}}, {
                                                                        transaction: t
                                                                    }).then(savedTran => {
                                                                        t.commit();
                                                                        callback("","");
                                                                    }).catch(function (error) {
                                                                        t.rollback();
                                                                        console.log(error)
                                                                        return res.status(500).json({"code": 500});
                                                                    });
                                                                });

                                                            } else {
                                                                callback({HttpCode: 404, response: {response: "710"}});
                                                            }

                                                        });

                                                    }

                                                }

                                            });
                                        }
                                    });
                                    break;
                            }
                            break;
                    }
                    break;
                case "transportation":
                    switch (req.originalUrl.substring(8).split("/")[1].split("?").shift()) {
                        case "orderProduct":
                            switch (req.method) {
                                case "GET":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, transportation, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {

                                                    orderProduct.findAll({
                                                        where: {
                                                            TransportarID: newData.ID
                                                        }
                                                    }).then(orderProduct => {
                                                        var newItem = [];
                                                        asyncForEach(orderProduct, async item => {
                                                            await Order.findOne({where: {ID: item.OrderID}}).then(async Order => {
                                                                await customer.findOne({where: {ID: Order.CustomerID}}).then(async customer => {
                                                                    await addresses.findOne({where: {ID: item.CustomerAddressID}}).then(async address => {
                                                                        await sellerProducts.findOne({where: {ID: item.ProductID}}).then(async SellerProduct => {
                                                                            await products.findOne({where: {ID: SellerProduct.ProductID}}).then(async Product => {
                                                                                await newItem.push({
                                                                                    orderProduct: item,
                                                                                    CustomerName: customer.Name,
                                                                                    CustomerFamilyName: customer.FamilyName,
                                                                                    CustomerPhoneNumber: customer.PhoneNumber,
                                                                                    address: address,
                                                                                    product: Product

                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });

                                                        }).then(() => {
                                                            callback("", newItem)
                                                        });

                                                    })

                                                }

                                            });
                                        }
                                    });
                                    break;
                                case "POST":
                                    checkToken(req, res, (err, data) => {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            checkUser(data, transportation, (newErr, newData) => {
                                                if (newErr) {
                                                    callback(newErr);
                                                }
                                                else {

                                                    if (req.body.ID == null) {
                                                        callback({HttpCode: 400, response: {"code": 703}});
                                                    } else {
                                                        asyncForEach(req.body.ID, async item => {
                                                            await orderProduct.findAll({
                                                                where: {
                                                                    ID: item.ID
                                                                }
                                                            }).then(async order => {
                                                                if (!isThisArrayEmpty(order)) {
                                                                    if (order[0].TransportarID === newData.ID) {
                                                                        await order[0].update({TransportarStatus: true}).then(
                                                                            () => {
                                                                                callback("", "")
                                                                            }
                                                                        );
                                                                    } else {
                                                                        callback({
                                                                            HttpCode: 400,
                                                                            response: {"code": 709}
                                                                        });
                                                                    }
                                                                } else {
                                                                    callback({HttpCode: 400, response: {"code": 710}});

                                                                }
                                                            })
                                                        });
                                                    }

                                                }

                                            });
                                        }
                                    });
                                    break;
                            }
                            break;
                        case "return":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, transportation, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {

                                            if (req.body.ID == null || req.body.Amount == null || req.body.Reason == null || req.body.Status == null) {
                                                callback({HttpCode: 400, response: {"code": 703}});
                                            } else {
                                                orderProduct.findAll({
                                                    where: {
                                                        ID: req.body.ID
                                                    }
                                                }).then(order => {
                                                    if (!isThisArrayEmpty(order)) {
                                                        if (order[0].TransportarID === newData.ID) {
                                                            order[0].update({
                                                                ReturnedAmount: req.body.Amount,
                                                                ReasonOFDelete: req.body.Reason,
                                                                TransportarStatus: req.body.Status
                                                            }).then(
                                                                () => {

                                                                    callback("", "")
                                                                }
                                                            );
                                                        } else {
                                                            callback({HttpCode: 400, response: {"code": 709}});
                                                        }
                                                    } else {
                                                        callback({HttpCode: 400, response: {"code": 710}});

                                                    }
                                                })
                                            }

                                        }

                                    });
                                }
                            });
                            break;
                    }
                    break;
                case "pachalChi":
                    switch (req.originalUrl.substring(8).split("/")[1].split("?").shift()) {
                        case "slider":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, pachalChiAdminSupports, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {

                                            ImageHandler(req, res, UplodDirs.slider)
                                                .then(Image => {
                                                    if (req.body.sliderNumber == null
                                                    ) {
                                                        callback({HttpCode: 400, response: {"code": 703}});
                                                    } else {
                                                       switch (req.body.sliderNumber) {
                                                           case "1"||1:
                                                               application.update({Slider1:Image},{where:{ID:1}}).then(()=>{callback("","")});
                                                               break;
                                                           case "2"||2:
                                                               application.update({Slider2:Image},{where:{ID:1}}).then(()=>{callback("","")});
                                                               break;
                                                           case "3"||3:
                                                               application.update({Slider3:Image},{where:{ID:1}}).then(()=>{callback("","")});
                                                               break;
                                                           case "4"||4:
                                                               application.update({Slider4:Image},{where:{ID:1}}).then(()=>{callback("","")});
                                                               break;
                                                           case "5"||5:
                                                               application.update({Slider5:Image},{where:{ID:1}}).then(()=>{callback("","")});
                                                               break;
                                                           default :   {
                                                               callback({HttpCode: 404, response: {"code": 710}});
                                                           }
                                                       }

                                                    }

                                                })
                                                .catch(message => {
                                                    console.log(message);
                                                });
                                        }

                                    });
                                }
                            });
                            break;
                        case "seller":
                            let sellers = [];
                            Seller.findAll().then(async OurSeller =>{

                                await asyncForEach(OurSeller, async item =>{
                                    var Logo = "not Found";
                                    try {
                                        Logo = base64_encode(item.LogoImage);

                                    } catch (e) {
                                        Logo = "not Found";

                                    }
                                   await sellerPhoneNumber.findOne({where:{ID:item.PhoneNumberID}}).then(async PhoneNumber=>{
                                       await sellerOperator.findAll({where: {SellerID: item.ID}}).then(async SO => {
                                           await Seller.findAll({where: {SellerParentID: item.ID}}).then(async S => {
                                               await SellerProductionManager.findAll({where: {SellerID: item.ID}}).then(async PM => {
                                                   await sellerWareHouse.findAll({where: {SellerID: item.ID}}).then(async WH => {
                                                       await TransportationManager.findAll().then(async TM => {
                                                           var TP = [];
                                                           await asyncForEach(WH, async item => {
                                                               await transportation.findAll({where: {WareHouseID: item.ID}}).then(
                                                                   async Trans => {
                                                                       if (Trans != null) {
                                                                           await TP.push(Trans);
                                                                       }
                                                                   }
                                                               );
                                                           });
                                                           callback("", {
                                                               LogoImage:Logo,
                                                               ID:item.ID,
                                                               SellerParentID:item.SellerParentID,
                                                               TypeID: item.TypeID,
                                                               CompanyName:item.CompanyName,
                                                               OwnerName:item.OwnerName,
                                                               OwnerFamilyName:item.OwnerFamilyName,
                                                               PhoneNumber:PhoneNumber,
                                                               PartTime2:item.PartTime2,
                                                               EstablishedDate:item.EstablishedDate,
                                                               RegistrationDateTime:item.RegistrationDateTime,
                                                               Point:item.Point,
                                                               Status:item.Status,
                                                               Policy:item.Policy,
                                                               Enabled:item.Enabled,
                                                               CompanyAddressCityID:item.CompanyAddressCityID,
                                                               CompleteAddressDescription:item.CompleteAddressDescription,
                                                               OwnerPhoneNumber:item.OwnerPhoneNumber,
                                                               Username:item.Username,
                                                               sellerOperator: SO,
                                                               productManager: PM,
                                                               wareHouses: WH,
                                                               Transportaration: TP,
                                                               TransportationManager: TM
                                                           });
                                                       });
                                                   })
                                               })

                                           });

                                       });
                                    });

                                }).then(()=>{
                                    callback("",sellers);
                                });
                            });
                            break;
                        case "sms":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, pachalChiAdminSupports, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.Role == null || req.body.ID == null || req.body.text == null){
                                                callback({HttpCode: 400, response: {code: "703"}});
                                            } else {
                                                switch (req.body.Role) {
                                                    case "pachalchi":
                                                        Entity = pachalChiAdminSupports;
                                                        break;
                                                    case "seller":
                                                        Entity = Seller;
                                                        break;
                                                    case "customer":
                                                        Entity = customer;
                                                        break;
                                                    case "productionManager":
                                                        Entity = SellerProductionManager;
                                                        break;
                                                    case "transportation":
                                                        Entity = transportation;
                                                        break;
                                                    case "sellerOperator":
                                                        Entity = sellerOperator;
                                                        break;
                                                    case "transportationManager":
                                                        Entity = TransportationManager;
                                                        break;
                                                    default :
                                                        callback({HttpCode: 400, response: {code: "716"}});
                                                }
                                                Entity.findOne({where:{ID:req.body.ID}}).then(user=>{
                                                    if (user != null){
                                                        sendSMS(user,req.body.text);
                                                        callback("","");
                                                    } else {
                                                        callback({HttpCode: 404, response: {"code": 710}});
                                                    }
                                                });

                                            }
                                        }

                                    });
                                }
                            });
                            break;
                        case "Enabled":
                            if (req.body.Role == null || req.body.ID == null || req.body.Enabled == null) {
                                callback({
                                    HttpCode: 400,
                                    response: {"code": 703}
                                });
                            } else {
                                switch (req.body.Role) {

                                    case "seller":
                                        Seller.findOne({where: {ID: req.body.ID}}).then(
                                            seller => {
                                                if (seller != null) {
                                                    callback("", [seller, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "wareHouse":
                                        sellerWareHouse.findOne({where: {ID: req.body.ID}}).then(
                                            sellerWareHouses => {
                                                if (sellerWareHouses != null) {
                                                    callback("", [sellerWareHouses, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "operator" :
                                        sellerOperator.findOne({where: {ID: req.body.ID}}).then(
                                            sellerOperators => {
                                                if (sellerOperators != null) {
                                                    callback("", [sellerOperators, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "transportation" :
                                        transportation.findOne({where: {ID: req.body.ID}}).then(
                                            transportations => {
                                                if (transportations != null) {
                                                    callback("", [transportations, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "TransportationManager" :

                                        TransportationManager.findOne({where: {ID: req.body.ID}}).then(
                                            TransportationManagers => {
                                                if (TransportationManagers != null) {
                                                    callback("", [TransportationManagers, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;
                                    case "productionManager" :
                                        SellerProductionManager.findOne({where: {ID: req.body.ID}}).then(
                                            SellerProductionManagers => {
                                                if (SellerProductionManagers != null) {
                                                    callback("", [SellerProductionManagers, {Enabled: req.body.Enabled}]);
                                                } else {
                                                    callback({
                                                        HttpCode: 400,
                                                        response: {"code": 710}
                                                    });
                                                }
                                            }
                                        );
                                        break;

                                    default :
                                        return res.status(404).json({"message": "invalid role type"});
                                }

                            }
                            break;
                        case "customer":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, pachalChiAdminSupports, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            customer.findAll().then(customer=>{
                                                let customers = [];
                                                asyncForEach(customer,async item =>{
                                                    await Order.findAll({where:{CustomerID:item.ID,OrderStatus:true}}).then(async orders=>{
                                                        let sum = 0 ;
                                                        let lastOrder = 9999999999999999;
                                                        await asyncForEach(orders, async item=>{
                                                            if ( Date(item.OrderDateTime).getTime() < lastOrder){
                                                                lastOrder = Date(item.OrderDateTime).getTime();
                                                            }
                                                            sum = parseInt(sum) + parseInt(item.SumTotal);
                                                        });
                                                        let ActiveStatus =((new Date().getTime() - lastOrder) <= 30 * 24 * 60 * 60 * 1000);
                                                        customers.push({
                                                            customer : item ,
                                                            ActiveStatus : ActiveStatus,
                                                            sumTotal : sum
                                                        });
                                                    });
                                                }).then(()=>{
                                                    callback("",customers);
                                                });
                                            });
                                        }

                                    });
                                }
                            });
                            break;
                        case "returnProduct":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, pachalChiAdminSupports, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.StartDate == null && req.body.EndDate == null ){

                                                if (req.body.StartDate != null && req.body.EndDate != null )
                                                {
                                                    Order.findAll({where:{
                                                            OrderDateTime: {
                                                                [Op.and]: {
                                                                    [Op.gt]: req.body.StartDate,
                                                                    [Op.lt]: req.body.EndDate
                                                                }
                                                            }
                                                        }}).then(async orders=>{
                                                            let FinalOrderProduct = [];
                                                            await asyncForEach(orders , async item =>{
                                                                await orderProduct.findAll({where:{OrderID:item.ID , ReturnedAmount: !null }}).then(async orderProducts=>{
                                                                    await asyncForEach(orderProducts, async OPitem =>{
                                                                        await customer.findOne({where:{ID:item.CustomerID}}).then(async customer =>{
                                                                            await Seller.findOne({where:{ID:item.SellerID}}).then(async seller =>{
                                                                                FinalOrderProduct.push({
                                                                                    DateTime : item.OrderDateTime,
                                                                                    customer :{
                                                                                        Name:customer.Name,
                                                                                        ID:customer.ID
                                                                                    },
                                                                                    seller:{
                                                                                        CompanyName:seller.CompanyName,
                                                                                        ID:seller.ID
                                                                                    }
                                                                                    ,ReasonOfReturn:OPitem.ReasonOFDelete
                                                                                    ,ReturnedAmount:OPitem.ReturnedAmount
                                                                                });
                                                                            })
                                                                        });
                                                                    });
                                                                });
                                                            } ).then(()=>{
                                                                callback("",FinalOrderProduct);
                                                            });
                                                    });
                                                }
                                                else if (req.body.StartDate == null && req.body.EndDate != null)
                                                {
                                                    Order.findAll({where:{
                                                            OrderDateTime: {
                                                                    [Op.lt]: req.body.EndDate
                                                            }
                                                        }}).then(async orders=>{
                                                        let FinalOrderProduct = [];
                                                        await asyncForEach(orders , async item =>{
                                                            await orderProduct.findAll({where:{OrderID:item.ID , ReturnedAmount: !null }}).then(async orderProducts=>{
                                                                await asyncForEach(orderProducts, async OPitem =>{
                                                                    await customer.findOne({where:{ID:item.CustomerID}}).then(async customer =>{
                                                                        await Seller.findOne({where:{ID:item.SellerID}}).then(async seller =>{
                                                                            FinalOrderProduct.push({
                                                                                DateTime : item.OrderDateTime,
                                                                                customer :{
                                                                                    Name:customer.Name,
                                                                                    ID:customer.ID
                                                                                },
                                                                                seller:{
                                                                                    CompanyName:seller.CompanyName,
                                                                                    ID:seller.ID
                                                                                }
                                                                                ,ReasonOfReturn:OPitem.ReasonOFDelete
                                                                                ,ReturnedAmount:OPitem.ReturnedAmount
                                                                            });
                                                                        })
                                                                    });
                                                                });
                                                            });
                                                        } ).then(()=>{
                                                            callback("",FinalOrderProduct);
                                                        });
                                                    });
                                                }
                                                else if (req.body.StartDate != null && req.body.EndDate == null)
                                                {
                                                    Order.findAll({where:{
                                                            OrderDateTime: {
                                                                    [Op.lt]: req.body.EndDate
                                                            }
                                                        }}).then(async orders=>{
                                                        let FinalOrderProduct = [];
                                                        await asyncForEach(orders , async item =>{
                                                            await orderProduct.findAll({where:{OrderID:item.ID , ReturnedAmount: !null }}).then(async orderProducts=>{
                                                                await asyncForEach(orderProducts, async OPitem =>{
                                                                    await customer.findOne({where:{ID:item.CustomerID}}).then(async customer =>{
                                                                        await Seller.findOne({where:{ID:item.SellerID}}).then(async seller =>{
                                                                            FinalOrderProduct.push({
                                                                                DateTime : item.OrderDateTime,
                                                                                customer :{
                                                                                    Name:customer.Name,
                                                                                    ID:customer.ID
                                                                                },
                                                                                seller:{
                                                                                    CompanyName:seller.CompanyName,
                                                                                    ID:seller.ID
                                                                                }
                                                                                ,ReasonOfReturn:OPitem.ReasonOFDelete
                                                                                ,ReturnedAmount:OPitem.ReturnedAmount
                                                                            });
                                                                        })
                                                                    });
                                                                });
                                                            });
                                                        } ).then(()=>{
                                                            callback("",FinalOrderProduct);
                                                        });
                                                    });
                                                }



                                            }
                                        }

                                    });
                                }
                            });
                            break;
                        case "deletedProduct":
                            checkToken(req, res, (err, data) => {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    checkUser(data, pachalChiAdminSupports, (newErr, newData) => {
                                        if (newErr) {
                                            callback(newErr);
                                        }
                                        else {
                                            if (req.body.StartDate == null && req.body.EndDate == null ){

                                                if (req.body.StartDate != null && req.body.EndDate != null )
                                                {
                                                    Order.findAll({where:{
                                                            OrderDateTime: {
                                                                [Op.and]: {
                                                                    [Op.gt]: req.body.StartDate,
                                                                    [Op.lt]: req.body.EndDate
                                                                }
                                                            }
                                                        }}).then(async orders=>{
                                                        let FinalOrderProduct = [];
                                                        await asyncForEach(orders , async item =>{
                                                            await orderProduct.findAll({where:{OrderID:item.ID , DeleteStatus: true }}).then(async orderProducts=>{
                                                                await asyncForEach(orderProducts, async OPitem =>{
                                                                    await customer.findOne({where:{ID:item.CustomerID}}).then(async customer =>{
                                                                        await Seller.findOne({where:{ID:item.SellerID}}).then(async seller =>{
                                                                            FinalOrderProduct.push({
                                                                                DateTime : item.OrderDateTime,
                                                                                customer :{
                                                                                    Name:customer.Name,
                                                                                    ID:customer.ID
                                                                                },
                                                                                seller:{
                                                                                    CompanyName:seller.CompanyName,
                                                                                    ID:seller.ID
                                                                                }
                                                                                ,CustomerReason:OPitem.CustomerReason
                                                                                ,SellerReason:OPitem.SellerReason
                                                                            });
                                                                        })
                                                                    });
                                                                });
                                                            });
                                                        } ).then(()=>{
                                                            callback("",FinalOrderProduct);
                                                        });
                                                    });
                                                }
                                                else if (req.body.StartDate == null && req.body.EndDate != null)
                                                {
                                                    Order.findAll({where:{
                                                            OrderDateTime: {
                                                                [Op.lt]: req.body.EndDate
                                                            }
                                                        }}).then(async orders=>{
                                                        let FinalOrderProduct = [];
                                                        await asyncForEach(orders , async item =>{
                                                            await orderProduct.findAll({where:{OrderID:item.ID , DeleteStatus: true }}).then(async orderProducts=>{
                                                                await asyncForEach(orderProducts, async OPitem =>{
                                                                    await customer.findOne({where:{ID:item.CustomerID}}).then(async customer =>{
                                                                        await Seller.findOne({where:{ID:item.SellerID}}).then(async seller =>{
                                                                            FinalOrderProduct.push({
                                                                                DateTime : item.OrderDateTime,
                                                                                customer :{
                                                                                    Name:customer.Name,
                                                                                    ID:customer.ID
                                                                                },
                                                                                seller:{
                                                                                    CompanyName:seller.CompanyName,
                                                                                    ID:seller.ID
                                                                                }
                                                                                ,CustomerReason:OPitem.CustomerReason
                                                                                ,SellerReason:OPitem.SellerReason
                                                                            });
                                                                        })
                                                                    });
                                                                });
                                                            });
                                                        } ).then(()=>{
                                                            callback("",FinalOrderProduct);
                                                        });
                                                    });
                                                }
                                                else if (req.body.StartDate != null && req.body.EndDate == null)
                                                {
                                                    Order.findAll({where:{
                                                            OrderDateTime: {
                                                                [Op.lt]: req.body.EndDate
                                                            }
                                                        }}).then(async orders=>{
                                                        let FinalOrderProduct = [];
                                                        await asyncForEach(orders , async item =>{
                                                            await orderProduct.findAll({where:{OrderID:item.ID , DeleteStatus: true }}).then(async orderProducts=>{
                                                                await asyncForEach(orderProducts, async OPitem =>{
                                                                    await customer.findOne({where:{ID:item.CustomerID}}).then(async customer =>{
                                                                        await Seller.findOne({where:{ID:item.SellerID}}).then(async seller =>{
                                                                            FinalOrderProduct.push({
                                                                                DateTime : item.OrderDateTime,
                                                                                customer :{
                                                                                    Name:customer.Name,
                                                                                    ID:customer.ID
                                                                                },
                                                                                seller:{
                                                                                    CompanyName:seller.CompanyName,
                                                                                    ID:seller.ID
                                                                                }
                                                                                ,CustomerReason:OPitem.CustomerReason
                                                                                ,SellerReason:OPitem.SellerReason
                                                                            });
                                                                        })
                                                                    });
                                                                });
                                                            });
                                                        } ).then(()=>{
                                                            callback("",FinalOrderProduct);
                                                        });
                                                    });
                                                }



                                            }
                                        }

                                    });
                                }
                            });
                            break;
                    }

            }
            break;

    }

}

function addRoleInfoCheck(req, res, role) {

    switch (role) {

        case "seller":
            if (req.body.CompanyName == null ||
                req.body.CompleteAddressDescription == null ||
                req.body.GoogleMapAddressLink == null ||
                req.body.OwnerFamilyName == null ||
                req.body.OwnerName == null ||
                req.body.RegistrationDateTime == null ||
                req.body.OwnerPhoneNumber == null ||
                req.body.Username == null ||
                req.body.Password == null ||
                req.body.CompanyAddressCityID == null) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

        case "transportation":
            if (req.body.AirConditionar == null ||
                req.body.BirthDate == null ||
                req.body.Color == null ||
                req.body.Description == null ||
                req.body.FamilyName == null ||
                req.body.Name == null ||
                req.body.Password == null ||
                req.body.WareHouseID == null ||
                req.body.PelakNumber == null ||
                req.body.PhoneNumber == null ||
                req.body.Username == null ||
                req.body.ModelID == null) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

        case "wareHouse":

            if (req.body.AgentFamilyName == null ||
                req.body.AgentName == null ||
                req.body.Birthdate == null ||
                req.body.CellPhoneNumber == null ||
                req.body.Password == null ||
                req.body.PhoneNumber == null ||
                req.body.Username == null ||
                req.body.WareHouseCompleteAddressDescription == null ||
                req.body.WareHouseGoogleMapAddressLink == null ||
                req.body.WareHouseAddressCityID == null) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

        case "operator" :
            if (req.body.BirthDate == null ||
                req.body.FamilyName == null ||
                req.body.Name == null ||
                req.body.Password == null ||
                req.body.RegistrationDateTime == null ||
                req.body.PhoneNumber == null ||
                req.body.Username == null) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

        case "ProductionManager":
            if (req.body.BirthDate == null ||
                req.body.FamilyName == null ||
                req.body.Name == null ||
                req.body.Password == null ||
                req.body.PhoneNumber == null ||
                req.body.Username == null ||
                req.body.CellPhoneNumber == null

            ) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

        case "TransportationManager":
            if (req.body.BirthDate == null ||
                req.body.FamilyName == null ||
                req.body.Name == null ||
                req.body.Password == null ||
                req.body.PhoneNumber == null ||
                req.body.Username == null ||
                req.body.WareHouseID == null ||
                req.body.PhoneNumber == null

            ) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));


        default :
            return res.status(404).json({"message": "invalid role type"});
    }


}

function sendSMS(Entity, Message) {

    var Kavenegar = require('kavenegar');
    var api = Kavenegar.KavenegarApi({
        apikey: '38304E493253685735793161654676314C497056347073715775654A45726771'
    });
    if (Entity === Seller) {
        api.Send({
                message: Message,
                sender: "10004346",
                receptor: Entity.OwnerPhoneNumber
            },
            function (response, status) {

            });
    } else {
        api.Send({
                message: Message,
                sender: "10004346",
                receptor: Entity.PhoneNumber
            },
            function (response, status) {



            });
    }

}

function sendNotification(Entity, Message) {

    globalVariable.io.to(Entity.SocketID).emit('notification', {Message: Message});

}

function SendAlarm(Entity, Message) {

    if (Entity.Status) {
        sendNotification(Entity, Message);
    } else {
        sendSMS(Entity, Message);
    }

}


module.exports = {

    sendSMS,
    SendAlarm,
    FilteringRequest,
    sendOnTelegramChannel,
    checkToken,
    checkUser,
    fillDataBase,
    base64_encode,
    isThisArrayEmpty,

};
