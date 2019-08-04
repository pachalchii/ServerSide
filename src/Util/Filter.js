const {cities, application, sellerType, Sequelize,orderNazarSanji,ChatOnOrderProduct, AlarmsOnSellerProducts, TransportationManager, orderPardakht, SellerProductsInServiceCitie, orderProduct, sequelize, PriceAndSupply, sellerProducts, customer, Order, addresses, Seller, ProductCategories, sellerPhoneNumber, SellerProductionManager, sellerOperator, sellerWareHouse,pachalChiAdminSupports, transportation, products, unit, car} = require('../../sequelize');
const {colors, PHONENUMBER_REGEX, TimeLimit,MonjamedVaredatiTimeLimit, ImageLimitSize, AlramMessages, ValidImageFormat, UplodDirs, TokenExpiredTimeLimit, PASSWORD_REGEX, USERNAME_REGEX, JWT_SECRET} = require('./configuration');
const jwt = require('jwt-simple');
const path = require('path');
const fs = require("fs");
const md5 = require('md5');
let request = require('request');
const asyncForEach = require('async-await-foreach');
const Op = Sequelize.Op;


function base64_encode(file) {
    try {
        let bitmap = fs.readFileSync(file);
        return Buffer.from(bitmap).toString('base64');
    }catch (e) {
        return "not found"
    }}

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

    let city = [
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

    let type = [
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

    let carModellet = [
        {ID: 1, Name: "نیسان", ParentID: null},
        {ID: 2, Name: "پیکان وانت", ParentID: null},
        {ID: 3, Name: "نیسان یخچال دار", ParentID: null},
        {ID: 4, Name: "پراید وانت", ParentID: null},
        {ID: 5, Name: "پرشیا وانت", ParentID: null},
        {ID: 6, Name: "کامیون یخچال دار", ParentID: null}
    ];
    car.findAll().then(car => {
        if (car[0] === undefined) {
            carModellet.forEach(insertCarModels);
            console.log(colors.bg.Black, colors.fg.White, "import  car model demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import car model demo data canceled .", colors.Reset);
        }
    });

    let unitlet = [
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
            unitlet.forEach(insertUnits);
            console.log(colors.bg.Black, colors.fg.White, "import unit demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import unit demo data canceled .", colors.Reset);
        }
    });

    let ProductCategorieslet = [

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
            ProductCategorieslet.forEach(insertProductCategories);
            console.log(colors.bg.Black, colors.fg.White, "import  products Group demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, colors.fg.White, "import  products Group demo data canceled .", colors.Reset);
        }
    });

    let productslet = [

        {ID: "1", Name: "خرده گوساله", CategoryID: "8", Type: "0", ParentID: null},
        {ID: "2", Name: "خرده گوساله", CategoryID: "8", Type: "1", ParentID: null},
        {ID: "3", Name: "قلوه گاه گوساله", CategoryID: "8", Type: "0", ParentID: null},
        {ID: "4", Name: "قلوه گاه گوساله", CategoryID: "8", Type: "1", ParentID: null}



    ];
    products.findAll().then(products => {
        if (products[0] === undefined) {
            productslet.forEach(insertProducts);
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
    });}

function isThisArrayEmpty(array) {return array[0] === undefined;}

function checkPhone(req, res) {
    if (req.body.PhoneNumber != null) {
        let pattern = new RegExp(PHONENUMBER_REGEX);
        let status = pattern.test(req.body.PhoneNumber);
        if (!status) {
            res.status(400).json({"code": 711});
            return false;
        } else {
            return true;
        }

    } else return true;}

function checkPassword(req, res) {
    if (req.body.Password != null) {
        let pattern = new RegExp(PASSWORD_REGEX);
        let status = pattern.test(req.body.Password);
        if (!status) {
            res.status(400).json({"code": 712});
            return false;
        } else {
            return true;
        }


    } else return true;}

function sendOnTelegramChannel(text) {

    let telegramBotToken = "bot648430167:AAHJ-kftpADIrG4-AR-cZqsV9YrzrFH3UPw";
    let telegramchannelid ="@PachalChiStatus";
    let URL = "https://api.telegram.org/"+telegramBotToken+"/sendMessage?chat_id="+telegramchannelid+"&text="+text+ "&parse_mode=html";
    request(encodeURI(URL), function (error, response, body) {
    });}

function checkUserName(req, res) {
    if (req.body.Username != null) {
        let pattern = new RegExp(USERNAME_REGEX);
        let status = pattern.test(req.body.Username);
        if (!status) {
            res.status(400).json({"code": 713});
            return false;
        } else {
            return true;
        }

    } else return true;}

function checkToken(req, res, callback) {

    if (req.headers['token'] != null) {
        try {
            let decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if ((decodedJWT.Password == null && decodedJWT.AuthCode == null) || (decodedJWT.Username == null && decodedJWT.PhoneNumber== null && decodedJWT.OwnerPhoneNumber== null)) {
                callback({HttpCode: 400, response: {"code": 700}});
            }
            else {
                let searchQuery;
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
                else if ((decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) && decodedJWT.Password != null) {
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
                else if (decodedJWT.PhoneNumber != null && decodedJWT.AuthCode != null){
                    searchQuery = {
                        where: {
                            PhoneNumber: decodedJWT.PhoneNumber, AuthCode: decodedJWT.AuthCode
                        }
                    };
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
    }}

function checkLimitTime(res, callback) {
    let date = new Date();
    let current_hour = date.getHours();
    if ((parseInt(TimeLimit.start) < parseInt(current_hour)) && (current_hour < parseInt(TimeLimit.finish))) {
        callback("", true);
    } else {
        callback({HttpCode: 404, response: {"code": 714}});
    }}

function CheckForeignKey(res, array) {
    return new Promise((resolve) => {
        let status = true;
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
    });}

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
    })}

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
    });}

function  FilteringRequest(req, res, callback) {
    let Entity = "";
    let SwitchStatus = true;
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
                                    break;
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
                                    if (req.body.PhoneNumber != null ||  req.body.Role == null) {
                                        if (!checkPhone(req, res)) {
                                            callback({HttpCode: 400, response: {"code": 712}});
                                        }
                                        else {
                                            let authcode ="";
                                            switch (req.body.Role) {
                                                case "customer":
                                                     authcode = Math.floor(Math.random() * 90000) + 10000;
                                                    customer.findOne({where:{PhoneNumber:req.body.PhoneNumber}}).then(cus=>{
                                                        if (cus != null){
                                                            sequelize.transaction().then((t)=>{
                                                                cus.update({AuthCode:authcode}
                                                                    , {transaction: t}).then(savedUser=>{
                                                                    t.commit();
                                                                    sendSMS(savedUser,"ForgetPassword",authcode);
                                                                    callback("","");
                                                                }).catch((error)=>{
                                                                    t.rollback();
                                                                    console.log(error);
                                                                    return res.status(500).json({"code":500});
                                                                });
                                                            });
                                                        } else {
                                                            sequelize.transaction().then((t)=>{
                                                                customer.create({AuthCode:authcode,Enabled:false ,PhoneNumber: req.body.PhoneNumber}
                                                                    , {transaction: t}).then(savedUser=>{
                                                                    t.commit();
                                                                    sendSMS(savedUser,"ForgetPassword",authcode);
                                                                    callback("","");
                                                                }).catch((error)=>{
                                                                    t.rollback();
                                                                    console.log(error);
                                                                    return res.status(500).json({"code":500});
                                                                });
                                                            });
                                                        }
                                                    });
                                                    break;
                                                case "transportation":
                                                     authcode = Math.floor(Math.random() * 90000) + 10000;
                                                    transportation.findOne({where:{PhoneNumber:req.body.PhoneNumber}}).then(cus=>{
                                                        if (cus != null){
                                                            sequelize.transaction().then((t)=>{
                                                                cus.update({AuthCode:authcode}
                                                                    , {transaction: t}).then(savedUser=>{
                                                                    t.commit();
                                                                    sendSMS(savedUser,"ForgetPassword",authcode);
                                                                    callback("","");
                                                                }).catch((error)=>{
                                                                    t.rollback();
                                                                    console.log(error);
                                                                    return res.status(500).json({"code":500});
                                                                });
                                                            });
                                                        } else {
                                                            callback({HttpCode: 404, response: {"code": 710}});
                                                        }
                                                    });
                                                    break;
                                            }


                                        }
                                    } else {
                                        callback({HttpCode: 400, response: {"code": 703}});
                                    }

                                    break;
                                case "verify":
                                    if (req.body.PhoneNumber != null && req.body.Code != null && req.body.Role != null) {
                                        switch (req.body.Role) {
                                            case "customer":
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
                                                break;
                                            case "transportation":
                                                transportation.findOne({where: {PhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
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
                                                break;
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
                                                            let payload = {
                                                                Username: customer.Username,
                                                                Password: customer.Password,
                                                                Date: new Date().getTime()
                                                            };

                                                            let   base64str = base64_encode(customer.Image);

                                                            let token = jwt.encode(payload, JWT_SECRET);
                                                            addresses.findAll({where: {CustomerID: customer.ID}}).then(
                                                                addresses => {
                                                                    let newAdrress = [];
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
                                                                                ID:customer.ID,
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
                                                            let payload = {
                                                                OwnerPhoneNumber: seller.OwnerPhoneNumber,
                                                                Password: seller.Password,
                                                                Date: new Date().getTime()
                                                            };

                                                            let   base64str = base64_encode(seller.LogoImage);

                                                            let token = jwt.encode(payload, JWT_SECRET);

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
                                                            let payload = {
                                                                PhoneNumber: trans.PhoneNumber,
                                                                Password: trans.Password,
                                                                Date: new Date().getTime()
                                                            };

                                                            let  base64str = base64_encode(trans.Image);

                                                            let token = jwt.encode(payload, JWT_SECRET);

                                                            await sellerWareHouse.findOne({where: {ID: trans.WareHouseID}}).then(async SW => {
                                                                await Seller.findOne({where: {ID: SW.SellerID}}).then(async S => {

                                                                    let    base64str1 = base64_encode(S.LogoImage);

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
                                                            let payload = {
                                                                PhoneNumber: support.PhoneNumber,
                                                                Password: support.Password,
                                                                Date: new Date().getTime()
                                                            };


                                                            let base64str = base64_encode(support.Image);

                                                            let token = jwt.encode(payload, JWT_SECRET);

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
                                                            let payload = {
                                                                PhoneNumber: SellerProductionManager.PhoneNumber,
                                                                Password: SellerProductionManager.Password,
                                                                Date: new Date().getTime()
                                                            };

                                                            let base64str = base64_encode(SellerProductionManager.Image);

                                                            let token = jwt.encode(payload, JWT_SECRET);
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
                                                            let payload = {
                                                                PhoneNumber: operator.PhoneNumber,
                                                                Password: operator.Password,
                                                                Date: new Date().getTime()
                                                            };

                                                            let  base64str = base64_encode(operator.Image);
                                                            let token = jwt.encode(payload, JWT_SECRET);
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
                                                            let payload = {
                                                                PhoneNumber: operator.PhoneNumber,
                                                                Password: operator.Password,
                                                                Date: new Date().getTime()
                                                            };

                                                            let  base64str = base64_encode(operator.Image);

                                                            let token = jwt.encode(payload, JWT_SECRET);

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
                                                            let payload = {
                                                                Username: pachalChiAdminSupports.Username,
                                                                Password: pachalChiAdminSupports.Password,
                                                                Date: new Date().getTime()
                                                            };

                                                            let  base64str = base64_encode(pachalChiAdminSupports.Image);

                                                            let token = jwt.encode(payload, JWT_SECRET);

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
                                        req.body.PhoneNumber == null ||
                                        req.body.CityID == null || req.body.GoogleMapAddressLink == null || req.body.CompleteAddressDescription == null || req.body.CustomName == null
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
                                                        Point: 0,
                                                        Status: true,
                                                        RegistrationDateTime: new Date().toString()
                                                    });
                                                })
                                                .catch(message => {
                                                    console.log(message);
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
                                                        let newSellerProducts = [];
                                                        asyncForEach(sellerProducts, async item => {
                                                            let  base64str = base64_encode(item.Image);
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
                                                                let TP = [];
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
                                                            await orderPardakht.findOne({where: {ID: order.PardakhtID}}).then(async pardakht => {
                                                                if (pardakht != null) {
                                                                    if (pardakht.code_peygiri !== undefined) {
                                                                        callback({
                                                                            HttpCode: 404,
                                                                            response: {"code": 725}
                                                                        });
                                                                    } else {
                                                                        await customer.findOne({where:{ID:order.CustomerID}}).then(async ChangeCustomer=>{
                                                                            callback("", [orderProduct,ChangeCustomer]);
                                                                        });
                                                                    }
                                                                } else {
                                                                    await customer.findOne({where:{ID:order.CustomerID}}).then(async ChangeCustomer=>{
                                                                        callback("", [orderProduct,ChangeCustomer]);
                                                                    });
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

                                        let CustomProducts = req.body.products;
                                        let status = true;
                                        let ForigenStatus = true;

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

                                                                    let TotalOrderProducts = [];
                                                                    let TotalStatus = true;


                                                                    sequelize.transaction().then( async function ( t) {
                                                                        await Order.create({
                                                                            CustomerID: newData.ID,
                                                                            OrderDateTime: new Date().getTime().toString(),
                                                                            HashCode: new Date().getTime().toString(),
                                                                            OrderStatus:true
                                                                        }, {
                                                                            transaction: t
                                                                        }).then(async savedOrder => {

                                                                            let totalSum = 0;

                                                                            await asyncForEach(req.body.products, async (item) => {
                                                                                if (TotalStatus) {
                                                                                    await SellerProductsInServiceCitie.findAll({where: {SellerProductID: item.SellerProductID}}).then(
                                                                                        async SellerProductsInServiceCitie => {
                                                                                            await addresses.findOne({where: {ID: item.CustomerAddressID}}).then(async Address => {
                                                                                                let AdreessStatus = true;
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
                                                                                                        let counter = randomIntInc(0, OfflineOperators.length - 1);
                                                                                                        if ( typeof global.SameOperator[sellerProduct.SellerID] === 'undefined'){
                                                                                                            global.SameOperator[sellerProduct.SellerID] = OfflineOperators[counter];
                                                                                                        }
                                                                                                        await products.findOne({where: {ID: sellerProduct.ProductID}}).then(async product => {
                                                                                                            if (product.Type) {
                                                                                                                if (sellerProduct.ShowStatus) {
                                                                                                                    let FinalDiscount = 0;
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
                                                                                                                                    let FinalDiscount = 0;
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
                                                                                                                                        FinalDiscount: FinalDiscount,
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
                                                                                                    let operator = randomIntInc(0, operators.length - 1);
                                                                                                    if ( typeof global.SameOperator[sellerProduct.SellerID] === 'undefined'){
                                                                                                        global.SameOperator[sellerProduct.SellerID] = operators[operator];
                                                                                                    }
                                                                                                    await products.findOne({where: {ID: sellerProduct.ProductID}}).then(async product => {
                                                                                                        if (product.Type) {
                                                                                                            if (sellerProduct.ShowStatus) {
                                                                                                                let FinalDiscount = 0;
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
                                                                                                                                let FinalDiscount = 0;
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
                                                                                                                                    FinalDiscount: FinalDiscount,
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
                                                                                            OnlineFee: '0',
                                                                                            InplaceFee: totalSum.toString()
                                                                                        }).then(() => {
                                                                                            let concat = "PachalChi-755"+savedOrder.ID;
                                                                                            sendSMS(newData,"PostOrder",concat);
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
                                                        let mine = [];
                                                        await asyncForEach(Orders, async (item, index) => {
                                                            await orderProduct.findAll({where: {OrderID: item.ID}}).then(async orderProducts => {
                                                                if (!isThisArrayEmpty(orderProducts)) {
                                                                    let OrderProducts = [];
                                                                    await asyncForEach(orderProducts, async item1 => {
                                                                        await PriceAndSupply.findOne({
                                                                            where: {
                                                                                SellerProductID: item1.ProductID,
                                                                                DateTime: new Date(parseInt(item.OrderDateTime)).toISOString().slice(0, 10).toString()
                                                                            }
                                                                        }).then(async price => {
                                                                            await sellerProducts.findOne({where: {ID: item1.ProductID}}).then(async SP => {
                                                                                await products.findOne({where: {ID: SP.ProductID}}).then(async P => {
                                                                                    await Seller.findOne({where: {ID: SP.SellerID}}).then(async seller => {
                                                                                        await ChatOnOrderProduct.count({where:{SeenStatus:false ,FromRole:true, OrderProdutID: item1.ID}}).then(async chatBadge=>{
                                                                                            if (item.PardakhtID != null ){
                                                                                                await orderPardakht.findOne({where:{ID:item.PardakhtID}}).then(async Pardakht=>{
                                                                                                    if(item1.TransportarID != null ){
                                                                                                        await transportation.findOne({where:{ID:item1.TransportarID}}).then(async transportInfo=>{

                                                                                                            let base64str = base64_encode(seller.LogoImage);

                                                                                                            let  base64str3 = base64_encode(transportInfo.Image);

                                                                                                            await OrderProducts.push({
                                                                                                                badgNumber:chatBadge,
                                                                                                                OrderProduct: item1,
                                                                                                                Pardakht:Pardakht,
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
                                                                                                    }
                                                                                                    else{
                                                                                                        let  base64str = base64_encode(seller.LogoImage);
                                                                                                        await OrderProducts.push({
                                                                                                            badgNumber:chatBadge,
                                                                                                            OrderProduct: item1,
                                                                                                            Pardakht:Pardakht,
                                                                                                            Product: P,
                                                                                                            seller: {
                                                                                                                CompanyName: seller.CompanyName,
                                                                                                                LogoImage: base64str
                                                                                                            },
                                                                                                            Price: price,
                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            } else {
                                                                                                if(item1.TransportarID != null ){
                                                                                                    await transportation.findOne({where:{ID:item1.TransportarID}}).then(async transportInfo=>{

                                                                                                        let base64str = base64_encode(seller.LogoImage);

                                                                                                        let  base64str3 = base64_encode(transportInfo.Image);

                                                                                                        await OrderProducts.push({
                                                                                                            badgNumber:chatBadge,
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
                                                                                                }
                                                                                                else{
                                                                                                    let  base64str = base64_encode(seller.LogoImage);
                                                                                                    await OrderProducts.push({
                                                                                                        badgNumber:chatBadge,
                                                                                                        OrderProduct: item1,
                                                                                                        Product: P,
                                                                                                        seller: {
                                                                                                            CompanyName: seller.CompanyName,
                                                                                                            LogoImage: base64str
                                                                                                        },
                                                                                                        Price: price,
                                                                                                    });
                                                                                                }
                                                                                            }


                                                                                        });
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
                        case "payment":
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
                                            if (req.body.OrderID == null ){
                                                callback({HttpCode: 404, response: {response: "703"}});
                                            } else {
                                                Order.findOne({where:{ID:req.body.OrderID}}).then(async O=>{
                                                    await orderPardakht.findOne({where:{ID:O.PardakhtID}}).then(async P =>{
                                                        if (parseInt(O.InplaceFee) === parseInt(O.SumTotal)){
                                                            await P.update({CodePeygiri: "InP"+new Date().getTime()}).then(()=>{callback("","");});
                                                        } else {
                                                            // etelsal be dargah
                                                        }
                                                    });
                                                });

                                            }
                                        }

                                    });
                                }
                            });

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
                        case "Star":
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

                                            if (req.body.OrderID == null ||
                                                req.body.PachalChi == null ||
                                                req.body.Seller == null ||
                                                req.body.SellerOperator == null ||
                                                req.body.Transportar == null ||
                                                req.body.Support == null
                                            ) {
                                                callback({HttpCode: 404, response: {"code": "404"}});
                                            } else {
                                                Order.findOne({
                                                    where: {
                                                        ID: req.body.OrderID,
                                                    }
                                                }).then(async Order => {
                                                    if (Order != null) {
                                                        if(Order.NazarSanjiID == null ){
                                                                sequelize.transaction().then((t) => {
                                                                    orderNazarSanji.create({
                                                                        OrderID: req.body.OrderID,
                                                                        PachalChi: req.body.PachalChi,
                                                                        Seller: req.body.Seller,
                                                                        SellerOperator: req.body.SellerOperator,
                                                                        Transportar: req.body.Transportar,
                                                                        Support: req.body.Support
                                                                    }, {transaction: t}).then(savedNazar => {
                                                                        t.commit();
                                                                        Order.update({NazarSanjiID: savedNazar.ID}).then(() => {
                                                                            callback("", "");
                                                                        });
                                                                    }).catch((error) => {
                                                                        t.rollback();
                                                                        console.log(error)
                                                                        return res.status(500).json({"code": 500});
                                                                    });
                                                                });

                                                        }else {
                                                            await orderNazarSanji.findOne({where: {ID: Order.NazarSanjiID}}).then(nazar => {
                                                                nazar.update({
                                                                    OrderID : null || req.body.OrderID  ,
                                                                    PachalChi : null || req.body.PachalChi ,
                                                                    Seller : null || req.body.Seller  ,
                                                                    SellerOperator : null || req.body.SellerOperator  ,
                                                                    Transportar : null || req.body.Transportar  ,
                                                                    Support : null || req.body.Support
                                                                }).then(()=>{
                                                                    callback('','');
                                                                });
                                                            });

                                                        }
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
                                            let newSellerList = [];
                                            await asyncForEach(Sellerlist, async item => {

                                                let base64str = base64_encode(item.Image);
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
                                                                AlarmsOnSellerProducts.findOne({where:{
                                                                        CustomerID: newData.ID,
                                                                        SellerProductID: req.body.SellerProductID

                                                                    }}).then(async alarms=>{
                                                                    if (alarms != null){

                                                                    } else
                                                                    {
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
                                                            CustomerID: newData.ID
                                                        }
                                                    }).then(
                                                        alarm => {
                                                            let newItem = [];
                                                            asyncForEach(alarm, async item => {
                                                                await PriceAndSupply.findOne({
                                                                    where: {
                                                                        DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                        SellerProductID: item.SellerProductID
                                                                    }
                                                                }).then(async price => {
                                                                    await sellerProducts.findOne({where: {ID: item.SellerProductID}}).then(async sellerP => {
                                                                        await products.findOne({where: {ID: sellerP.ProductID}}).then(async product => {
                                                                            await ProductCategories.findOne({where:{ID:product.CategoryID}}).then(async category =>{
                                                                                if (price != null && price.PrimitiveSupply > 25) {
                                                                                    await Seller.findOne({where: {ID: sellerP.SellerID}}).then(async seller => {
                                                                                        await newItem.push({
                                                                                            ID:item.ID,
                                                                                            SellerName: seller.CompanyName,
                                                                                            ProductID:product.ID,
                                                                                            Category:category,
                                                                                            SellerImage: base64_encode(seller.LogoImage )|| null,
                                                                                            SellerProductID: item.SellerProductID,
                                                                                            Supply: true,
                                                                                            SellerProductName: product.Name
                                                                                        });
                                                                                    });

                                                                                } else {
                                                                                    await Seller.findOne({where: {ID: sellerP.SellerID}}).then(async seller => {
                                                                                        await newItem.push({
                                                                                            ID:item.ID,
                                                                                            SellerName: seller.CompanyName,
                                                                                            ProductID:product.ID,
                                                                                            SellerImage:base64_encode(seller.LogoImage )|| null,
                                                                                            SellerProductID: item.SellerProductID,
                                                                                            Category:category,
                                                                                            Supply: false,
                                                                                            SellerProductName: product.Name
                                                                                        });
                                                                                    });
                                                                                }
                                                                            });
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
                                case "DELETE":
                                    if (req.body.ID == null) {
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
                                                            ID: req.body.ID,
                                                            Entity: AlarmsOnSellerProducts
                                                        }]).then(status => {

                                                            if (status) {
                                                                AlarmsOnSellerProducts.destroy({where:{ID:req.body.ID}}).then(() => {
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
                                            if (req.body.OrderProductID == null) {
                                                callback({HttpCode: 404, response: {"code": "404"}});
                                            } else {


                                                orderProduct.update({CustomerFinalStatus: true}, {where: {ID: req.body.OrderProductID}}).then(() => {
                                                    orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async OP=>{
                                                        await sellerOperator.findOne({where:{ID:OP.SellerOperatorID}}).then(async sellerOP=>{
                                                            await Seller.findOne({where:{ID:sellerOP.SellerID}}).then(async seller=>{
                                                                await sendSMS(newData,"FinalStatus",encodeURI(seller.CompanyName));
                                                            });
                                                        });
                                                    });
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
                                                        let newItems = [];
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
                                                    if (req.body.Name == null  || req.body.OrderProductID == null || req.body.FamilyName == null || req.body.ModelID == null || req.body.PhoneNumber == null || req.body.PelakNumber == null ) {
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
                                                                orderProduct.findOne({where:{ID:req.body.OrderProductID}}).then(OP=>{
                                                                    OP.update({TransportarID:savedTran.ID}).then(()=>{
                                                                        callback("",savedTran);
                                                                    });
                                                                });
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
                                                        let newSellerProducts = [];
                                                        asyncForEach(sellerProducts, async item => {
                                                            let  base64str = base64_encode(item.Image);
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
                                                                            TransportarID:item.TransportarID,
                                                                            CustomerFinalStatus: item.CustomerFinalStatus,
                                                                            TransportaionStatus:item.TransportaionStatus,
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

                                                                                        let statuss =  false;
                                                                                        let date = new Date();
                                                                                        let current_hour = date.getHours();
                                                                                        let current_Minutes = date.getMinutes();
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
                                                                                                            callback({
                                                                                                                HttpCode: 400,
                                                                                                                response: {"code": 722}
                                                                                                            });                                                                                                        }
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
                                            if (req.body.ExactSupply == null || req.body.OrderProductID == null ){
                                                callback({HttpCode: 404, response: {response: "703"}});
                                            } else {
                                                orderProduct.findOne({where:{ID:req.body.OrderProductID}}).then(async OP=>{
                                                    if (OP != null){
                                                        await OP.update({ExactSupply: req.body.ExactSupply}).then(()=>{
                                                            PriceAndSupply.findOne({where:{DateTime:new Date().toISOString().slice(0, 10).toString(),SellerProductID : OP.ProductID }}).then(PAS=>{
                                                                Order.findOne({where:{ID:OP.OrderID}}).then(O=>{
                                                                    O.update({SumTotal: O.SumTotal - OP.SumTotal + (req.body.ExactSupply* PAS.Price) }).then(()=>{
                                                                        OP.update({SumTotal : (req.body.ExactSupply* PAS.Price)}).then(async ()=>{
                                                                            await customer.findOne({where:{ID:O.CustomerID}}).then(async ChangeCustomer =>{
                                                                                callback("",ChangeCustomer);
                                                                            });
                                                                        })
                                                                    })
                                                                });
                                                            });
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
                        case "ShowStatus":
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
                                            if (req.body.ID == null || req.body.Status == null ){
                                                callback({HttpCode: 404, response: {response: "703"}});
                                            } else {
                                                sellerOperator.update({ShowStatus:req.body.Status},{where:{ID:req.body.ID}}).then(()=>{
                                                    callback("","");
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
                                                    if (req.body.Name == null  || req.body.OrderProductID == null || req.body.FamilyName == null || req.body.ModelID == null || req.body.PhoneNumber == null || req.body.PelakNumber == null ) {
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
                                                                orderProduct.findOne({where:{ID:req.body.OrderProductID}}).then(OP=>{
                                                                    OP.update({TransportarID:savedTran.ID}).then(async ()=>{
                                                                        await Order.findOne({where:{ID:OP.OrderID}}).then(async ChangeOrder=>{
                                                                            await customer.findOne({where:{ID:ChangeOrder.CustomerID}}).then(async ChangeCustomer=>{
                                                                                callback("", [savedTran,ChangeCustomer]);
                                                                            });
                                                                        })
                                                                    });
                                                                });
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
                                                            CustomerStatus: true
                                                        }
                                                    }).then(async orderProducts => {
                                                        let NewOrderProducts = [];
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
                                                                                        await transportation.findOne({where:{ID:item.TransportarID}}).then(async TRANI=>{
                                                                                            await ChatOnOrderProduct.count({where:{SeenStatus:false , OrderProdutID: item.ID}}).then(async chatBadge=>{
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
                                                                                                        ExactSupply:item.ExactSupply,
                                                                                                        chatBadgeNumber:chatBadge,
                                                                                                        DeleteStatus:item.DeleteStatus,
                                                                                                        ReasonOFDelete:item.ReasonOFDelete,
                                                                                                        SellerReason:item.SellerReason,
                                                                                                        CustomerReason:item.CustomerReason,
                                                                                                        UnitOfProduct: item.UnitOfProduct,
                                                                                                        UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                        CustomerStatus: item.CustomerStatus,
                                                                                                        SellerOperatorFinalStatus: item.SellerOperatorFinalStatus,
                                                                                                        SellerOperatorStatus: item.SellerOperatorStatus,
                                                                                                        SellerOperatorID: item.SellerOperatorID,
                                                                                                        WareHouseID: item.WareHouseID,
                                                                                                        Transportar: (TRANI == null ) ? null : {
                                                                                                            Name:TRANI.Name,
                                                                                                            FamilyName:TRANI.FamilyName
                                                                                                        },
                                                                                                        ProductionManagerStatus: item.ProductionManagerStatus,
                                                                                                        CustomerFinalStatus: item.CustomerFinalStatus,
                                                                                                        SumTotal: item.SumTotal,
                                                                                                        OnlineFee: item.OnlineFee,
                                                                                                        InplaceFee: item.InpalceFee,
                                                                                                        AvailableSupply: Price,
                                                                                                        CustomerID:NEWcustomer.ID,
                                                                                                        CustomerName: NEWcustomer.Name +" "+ NEWcustomer.FamilyName,
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
                                                                                                        chatBadgeNumber:chatBadge,
                                                                                                        ForwardingDatetime: item.ForwardingDatetime,
                                                                                                        TurnOfForwarding: item.TurnOfForwarding,
                                                                                                        CustomerAddressID: item.CustomerAddressID,
                                                                                                        ExactSupply:item.ExactSupply,
                                                                                                        FinalDiscount: item.FinalDiscount,
                                                                                                        ProductID: item.ProductID,
                                                                                                        SellerReason:item.SellerReason,
                                                                                                        CustomerReason:item.CustomerReason,
                                                                                                        DeleteStatus:item.DeleteStatus,
                                                                                                        ReasonOFDelete:item.ReasonOFDelete,
                                                                                                        DemendSupply: item.Supply,
                                                                                                        UnitOfProduct: item.UnitOfProduct,
                                                                                                        UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                        CustomerStatus: item.CustomerStatus,
                                                                                                        SellerOperatorFinalStatus: item.SellerOperatorFinalStatus,
                                                                                                        SellerOperatorStatus: item.SellerOperatorStatus,
                                                                                                        SellerOperatorID: item.SellerOperatorID,
                                                                                                        WareHouseID: item.WareHouseID,
                                                                                                        Transportar: (TRANI == null ) ? null : {
                                                                                                            Name:TRANI.Name,
                                                                                                            FamilyName:TRANI.FamilyName
                                                                                                        },                                                                                                   ProductionManagerStatus: item.ProductionManagerStatus,
                                                                                                        CustomerFinalStatus: item.CustomerFinalStatus,
                                                                                                        SumTotal: item.SumTotal,
                                                                                                        OnlineFee: item.OnlineFee,
                                                                                                        InplaceFee: item.InpalceFee,
                                                                                                        AvailableSupply: Price,
                                                                                                        CustomerID:NEWcustomer.ID,
                                                                                                        CustomerName: NEWcustomer.Name +" "+ NEWcustomer.FamilyName,
                                                                                                        product: product,
                                                                                                        pardakht: pardakht


                                                                                                    })
                                                                                                }
                                                                                            });
                                                                                        })

                                                                                    });
                                                                                });

                                                                            })

                                                                        });
                                                                    });

                                                                });
                                                            });

                                                        }).then(() => {
                                                            callback("", [NewOrderProducts , newData]);

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

                                                        orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async orderProducts => {
                                                           await Order.findOne({where: {ID: orderProducts.OrderID}}).then(async order => {
                                                                await customer.findOne({where:{ID:order.CustomerID}}).then(async ChangeCustomer=>{
                                                                    callback("", [order,ChangeCustomer]);
                                                                });
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

                                                    Order.findOne({where: {ID: orderProducts.OrderID}}).then(order => {
                                                        orderPardakht.findOne({where:{ID:order.PardakhtID}}).then(async P=>{
                                                            if(P.CodePeygiri != null){
                                                                orderProducts.update({WareHouseID: req.body.WareHouseID});
                                                                await customer.findOne({where:{ID:order.CustomerID}}).then(async ChangeCustomer=>{
                                                                    callback("", [order,ChangeCustomer]);
                                                                });
                                                            }else {
                                                                callback({HttpCode: 404, response: {"code": 739}});
                                                            }
                                                        })

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
                                                    await Order.findOne({where:{ID:orderProduct.OrderID}}).then(async order=>{
                                                        await orderPardakht.findOne({where:{ID:order.PardakhtID}}).then(async pardakht=>{
                                                            if (pardakht == null){
                                                                await customer.findOne({where:{ID:order.CustomerID}}).then(async ChangeCustomer=>{
                                                                    callback("", [orderProduct,ChangeCustomer]);
                                                                });


                                                            } else {
                                                                if (pardakht.CodePeygiri == null){

                                                                    await customer.findOne({where:{ID:order.CustomerID}}).then(async ChangeCustomer=>{
                                                                        callback("", [orderProduct,ChangeCustomer]);
                                                                    });

                                                                } else {
                                                                    callback({HttpCode: 404, response: {"code": 737}});
                                                                }
                                                            }
                                                        });
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
                                                                let TP = [];
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
                                                        let newSellerProducts = [];
                                                        asyncForEach(sellerProducts, async item => {
                                                            let  base64str = base64_encode(item.Image);
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
                                                                                SellerID: newData.SellerID,
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
                                                orderProduct.findOne({where:{ID:req.body.OrderProductID}}).then(async orderP=>{
                                                    if (orderP != null){
                                                        await orderP.update({
                                                            TransportationFare: parseInt(req.body.TransportationFare || null),
                                                            ProvidedSupply:parseInt(req.body.ProvidedSupply),
                                                            FinalDiscount:parseInt(orderP.FinalDiscount | req.body.FinalDiscount),
                                                            TurnOfForwarding:orderP.TurnOfForwarding | req.body.TurnOfForwarding
                                                        }).then(async ()=>{
                                                            await Order.findOne({where:{ID:orderP.OrderID}}).then(async ChangeOrder=>{
                                                                await customer.findOne({where:{ID:ChangeOrder.CustomerID}}).then(async ChangeCustomer=>{
                                                                    callback("",ChangeCustomer);
                                                                });
                                                            });

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
                            break
                        case "pastOrders":
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
                                            if (req.query.startDate == null || req.query.endDate == null){
                                                callback({HttpCode: 400, response: {"code": 703}});
                                            } else {
                                                Order.findAll({where:{
                                                        OrderDateTime:{
                                                            [Op.and]:{
                                                                [Op.gt]:req.query.startDate,
                                                                [Op.lt]:req.query.endDate
                                                            }
                                                        }
                                                    }}).then(async (notFinalOrders)=>{
                                                    let NewOrderProducts = [];
                                                    await asyncForEach(notFinalOrders, async ourItem=>{
                                                        await   orderProduct.findAll({where:{

                                                                OrderID:ourItem.ID,
                                                                SellerOperatorID:newData.ID


                                                            }}).then(async orderProducts => {
                                                            await asyncForEach(orderProducts, async item => {
                                                                await customer.findOne({where: {ID: ourItem.CustomerID}}).then(async NEWcustomer => {
                                                                    await PriceAndSupply.findOne({
                                                                        where: {
                                                                            DateTime: new Date().toISOString().slice(0, 10).toString(),
                                                                            SellerProductID: item.ProductID
                                                                        }
                                                                    }).then(async Price => {
                                                                        await sellerProducts.findOne({where: {ID: item.ProductID}}).then(async sellerProduct => {
                                                                            await products.findOne({where: {ID: sellerProduct.ProductID}}).then(async product => {
                                                                                await orderPardakht.findOne({where: {ID: ourItem.PardakhtID}}).then(async pardakht => {
                                                                                    await addresses.findOne({where:{ID:item.CustomerAddressID}}).then(async address =>{
                                                                                        await transportation.findOne({where:{ID:item.TransportarID}}).then(async TRANI=>{
                                                                                            if (pardakht != null)
                                                                                            {
                                                                                                await NewOrderProducts.push({
                                                                                                    ID: item.ID,
                                                                                                    RemainingTime: ourItem.OrderDateTime,
                                                                                                    OrderID: item.OrderID,
                                                                                                    CustomerAddress:address,
                                                                                                    PardakhtRemainingTime: pardakht.DateTime,
                                                                                                    ForwardingDatetime: item.ForwardingDatetime,
                                                                                                    TurnOfForwarding: item.TurnOfForwarding,
                                                                                                    CustomerAddressID: item.CustomerAddressID,
                                                                                                    FinalDiscount: item.FinalDiscount,
                                                                                                    ProductID: item.ProductID,
                                                                                                    ExactSupply:item.ExactSupply,
                                                                                                    DemendSupply: item.Supply,
                                                                                                    UnitOfProduct: item.UnitOfProduct,
                                                                                                    UnitIDOfSupply: item.UnitIDOfSupply,
                                                                                                    CustomerStatus: item.CustomerStatus,
                                                                                                    SellerOperatorFinalStatus: item.SellerOperatorFinalStatus,
                                                                                                    SellerOperatorStatus: item.SellerOperatorStatus,
                                                                                                    SellerOperatorID: item.SellerOperatorID,
                                                                                                    WareHouseID: item.WareHouseID,
                                                                                                    Transportar: (TRANI == null ) ? null : {
                                                                                                        Name:TRANI.Name,
                                                                                                        FamilyName:TRANI.FamilyName
                                                                                                    },
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
                                                                                                    RemainingTime: ourItem.OrderDateTime,
                                                                                                    OrderID: item.OrderID,
                                                                                                    CustomerAddress:address,
                                                                                                    ExactSupply:item.ExactSupply,
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
                                                                                                    Transportar: (TRANI == null ) ? null : {
                                                                                                        Name:TRANI.Name,
                                                                                                        FamilyName:TRANI.FamilyName
                                                                                                    },                                                                                                   ProductionManagerStatus: item.ProductionManagerStatus,
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
                                                                                        })

                                                                                    });
                                                                                });

                                                                            })

                                                                        });
                                                                    });

                                                                })
                                                            });

                                                        });
                                                    }).then(()=>{callback("",NewOrderProducts);})

                                                });
                                            }
                                        }

                                    });
                                }
                            });
                            break;

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

                                                let newItem = [];
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
                                                                    await transportation.findOne({where: {ID: req.body.TransportationID}}).then(async tran => {
                                                                        sendSMS(tran, "transportation",tran.Name);
                                                                        await orderProduct.findOne({where:{ID:req.body.OrderProductID}}).then(async ChangeOrderProduct=>{
                                                                            await Order.findOne({where:{ID:ChangeOrderProduct.OrderID}}).then(async ChangeOrder=>{
                                                                                await customer.findOne({where:{ID:ChangeOrder.CustomerID}}).then(async ChangeCustomer=>{
                                                                                    callback("", ChangeCustomer);
                                                                                });
                                                                            });

                                                                        });

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
                                                        let newItem = [];
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
                                                                          async  () => {
                                                                                await customer.findOne({where:{ID:order[0].CustomerID}}).then(async ChangeCustomer=>{
                                                                                    callback("", ChangeCustomer);
                                                                                });
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
                                    let Logo = base64_encode(item.LogoImage);
                                    await sellerPhoneNumber.findOne({where:{ID:item.PhoneNumberID}}).then(async PhoneNumber=>{
                                        await sellerOperator.findAll({where: {SellerID: item.ID}}).then(async SO => {
                                            await Seller.findAll({where: {SellerParentID: item.ID}}).then(async S => {
                                                await SellerProductionManager.findAll({where: {SellerID: item.ID}}).then(async PM => {
                                                    await sellerWareHouse.findAll({where: {SellerID: item.ID}}).then(async WH => {
                                                        await TransportationManager.findAll().then(async TM => {
                                                            let TP = [];
                                                            await asyncForEach(WH, async item => {
                                                                await transportation.findAll({where: {WareHouseID: item.ID}}).then(
                                                                    async Trans => {
                                                                        if (Trans != null) {
                                                                            await TP.push(Trans);
                                                                        }
                                                                    }
                                                                );
                                                            });
                                                            sellers.push({
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
                                    case "customer":
                                        customer.findOne({where: {ID: req.body.ID}}).then(
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
                                                        await asyncForEach(orders, async SecondItem=>{

                                                            if ( new Date(SecondItem.OrderDateTime).getTime() < lastOrder){
                                                                lastOrder = Date(SecondItem.OrderDateTime).getTime();
                                                            }
                                                            sum = parseInt(sum) + parseInt(SecondItem.SumTotal);
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




                                            else {
                                                callback({HttpCode: 400, response: {"code": 703}});
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
                                            else {
                                                callback({HttpCode: 400, response: {"code": 703}});
                                            }



                                        }

                                    });
                                }
                            });
                            break;
                        case "inplaceOnline":
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

                                            if (req.body.StartDate != null && req.body.EndDate != null )
                                            {
                                                Order.findAll({where:{
                                                        OrderStatus:true || null,
                                                        OrderDateTime: {
                                                            [Op.and]: {
                                                                [Op.gt]: req.body.StartDate,
                                                                [Op.lt]: req.body.EndDate
                                                            }
                                                        }
                                                    }}).then(async orders=>{
                                                    var FinalOrderProductInplace = 0 ;
                                                    var FinalOrderProductOnline =  0 ;
                                                    await asyncForEach(orders , async item =>{
                                                        FinalOrderProductInplace = FinalOrderProductInplace + parseInt(item. InplaceFee);
                                                        FinalOrderProductOnline = FinalOrderProductOnline + parseInt(item. OnlineFee);
                                                    } ).then(()=>{
                                                        callback("",{
                                                            Online :FinalOrderProductOnline,
                                                            Inpalce :FinalOrderProductInplace
                                                        });
                                                    });
                                                });
                                            }
                                            else if (req.body.StartDate == null && req.body.EndDate != null)
                                            {
                                                Order.findAll({where:{
                                                        OrderStatus:true || null,
                                                        OrderDateTime: {
                                                            [Op.lt]: req.body.EndDate
                                                        }
                                                    }}).then(async orders=>{
                                                    var FinalOrderProductInplace = 0 ;
                                                    var FinalOrderProductOnline =  0 ;
                                                    await asyncForEach(orders , async item =>{
                                                        FinalOrderProductInplace = FinalOrderProductInplace +  parseInt(item. InplaceFee);
                                                        FinalOrderProductOnline = FinalOrderProductOnline +  parseInt(item. OnlineFee);

                                                    } ).then(()=>{
                                                        callback("",{
                                                            Online :FinalOrderProductOnline,
                                                            Inpalce :FinalOrderProductInplace
                                                        });
                                                    });
                                                });
                                            }
                                            else if (req.body.StartDate != null && req.body.EndDate == null)
                                            {
                                                Order.findAll({where:{
                                                        OrderStatus:true || null,
                                                        OrderDateTime: {
                                                            [Op.gt]: req.body.StartDate
                                                        }
                                                    }}).then(async orders=>{
                                                    var FinalOrderProductInplace = 0 ;
                                                    var FinalOrderProductOnline =  0 ;
                                                    await asyncForEach(orders , async item =>{
                                                        FinalOrderProductInplace = FinalOrderProductInplace + parseInt(item. InplaceFee);
                                                        FinalOrderProductOnline = FinalOrderProductOnline + parseInt(item. OnlineFee);

                                                    } ).then(()=>{
                                                        callback("",{
                                                            Online :FinalOrderProductOnline,
                                                            Inpalce :FinalOrderProductInplace
                                                        });
                                                    });
                                                });
                                            }
                                            else {
                                                callback({HttpCode: 400, response: {"code": 703}});
                                            }



                                        }

                                    });
                                }
                            });
                            break;
                        case "financialTransaction":
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
                                            if (req.query.SellerID != null ){

                                                 sellerOperator.findAll({where:{SellerID:req.query.SellerID}}).then(async SellerOperators=>{
                                                       var NewOrderProducts = [];
                                                       await asyncForEach(SellerOperators , async  OperatorItem=>{
                                                                    await  orderProduct.findAll({
                                                                                    where: {
                                                                                        SellerOperatorID: OperatorItem.ID
                                                                                    }
                                                                                }).then(async orderProducts => {
                                                                                    await asyncForEach(orderProducts, async item => {
                                                                                        await sellerProducts.findOne({where: {ID: item.ProductID}}).then(async sellerProduct => {
                                                                                            await products.findOne({where: {ID: sellerProduct.ProductID}}).then(async product => {

                                                                                                await NewOrderProducts.push({
                                                                                                    ID: item.ID,
                                                                                                    FinalDiscount: item.FinalDiscount,
                                                                                                    ProductID: item.ProductID,
                                                                                                    SumTotal: item.SumTotal,
                                                                                                    OnlineFee: item.OnlineFee,
                                                                                                    InplaceFee: item.InpalceFee,
                                                                                                    product: product

                                                                                                });
                                                                                            })
                                                                                        });
                                                                                    });
                                                                                })

                                                       }).then(() => {
                                                           callback("", NewOrderProducts);
                                                       });
                                                });

                                            } else {
                                                callback({HttpCode: 404, response: {response: "703"}});
                                            }
                                        }
                                    });
                                }
                            });
                            break;
                        case "applicationInformation":
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
                                            customer.findAndCountAll().then(async C=>{
                                                let ActiveC = 0;
                                                let DeActive =0;
                                                await asyncForEach(C.rows,async item=>{
                                                    await  Order.findAll({where : {CustomerID: item.ID , OrderDateTime : {[Op.gt]:(parseInt(new Date().getTime().toString()) - parseInt(20*24*60*60*1000))}}}).then(async order=>{
                                                        if (order != null) {ActiveC = ActiveC +1} else {DeActive = DeActive +1 }
                                                    })
                                                }).then(()=>{
                                                    Seller.count().then(async S=>{
                                                        await sellerOperator.count().then(async SO=>{
                                                            await transportation.count({where:{TransportationType:false}}).then(async OT =>{
                                                                await transportation.count({where:{TransportationType:true}}).then(async FT =>{
                                                                    await sellerProducts.count().then(async SP=>{
                                                                        await PriceAndSupply.count({where:{DateTime:new Date().toISOString().slice(0, 10).toString()}}).then(async PAS=>{
                                                                            await Order.count().then(async OC=>{
                                                                                callback("",{
                                                                                    AllCustomer: C.count,
                                                                                    ActiveCustomer : ActiveC,
                                                                                    DeAcvtivedCustomer:DeActive,
                                                                                    Seller : S,
                                                                                    SellerOperator : SO,
                                                                                    Otransportation : OT,
                                                                                    Ftransportation : FT,
                                                                                    SellerProduct : SP,
                                                                                    PriceAndSupply: PAS,
                                                                                    Order : OC
                                                                                });
                                                                            } )
                                                                        })
                                                                    })
                                                                })
                                                            });
                                                        });
                                                    });
                                                });



                                            })
                                        }
                                    });
                                }
                            });
                            break;
                        case "Message":
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
                                            ChatOnOrderProduct.findAll({where:{OrderProdutID:null , SeenStatus: false}}).then( async data=>{
                                                let Message = [];
                                                let customers = [];
                                                await asyncForEach(data , async item =>{
                                                    if (item.ToRole){
                                                        await customer.findOne({where:{ID:item.ToID}}).then(async C=>{

                                                            if (!customers.includes(C.ID)){
                                                                await  Message.push({
                                                                    customer :{
                                                                        Name:C.Name,
                                                                        FamilyName : C.Name
                                                                    },
                                                                    Message : item
                                                                });
                                                                customers.push(C.ID)
                                                            }
                                                        });
                                                    }
                                                });
                                                callback("",Message)
                                            });

                                        }
                                    });
                                }
                            });
                            break;
                        case "getMessage":
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
                                            if (req.query.ID != null){

                                                ChatOnOrderProduct.findAll({where:{ToID:req.query.ID}}).then( async data=>{
                                                    data.forEach(item=>{
                                                        item.update({SeenStatus:true});
                                                    });
                                                    callback("",data)
                                                });

                                            }
                                            else {
                                                callback({HttpCode: 400, response: {"code": 703}});
                                            }

                                        }
                                    });
                                }
                            });
                            break;
                        case "sendSMS":
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
                                            if (req.body.type == null){
                                                callback({HttpCode: 400, response: {"code": 703}});
                                            }else
                                            {
                                                let PhoneNumbers = "";
                                                switch (req.body.type) {
                                                    case "active" :
                                                        customer.findAll().then(async customers=>{
                                                            let activeNumbers = [];
                                                            await  asyncForEach(customer , async(item) =>{
                                                                await Order.findAll({where:{CustomerID:item.ID}}).then(async orders=>{
                                                                    let lastOne = 0;
                                                                    await asyncForEach(orders , async (ordersItem) =>{
                                                                        if (ordersItem.OrderDateTime > lastOne) {lastOne = ordersItem.OrderDateTime}
                                                                    }).then(()=>{
                                                                        if (!(new Date().getTime() - lastOne > 30*24*60*60*1000)){ activeNumbers.push(item.PhoneNumber)}
                                                                    })
                                                                });
                                                            }).then(()=>{
                                                                PhoneNumbers = activeNumbers;
                                                            })
                                                        });
                                                        break;
                                                    case "deactive" :
                                                        customer.findAll().then(async customers=>{
                                                            let activeNumbers = [];
                                                            await  asyncForEach(customer , async(item) =>{
                                                                await Order.findAll({where:{CustomerID:item.ID}}).then(async orders=>{
                                                                    let lastOne = 0;
                                                                    await asyncForEach(orders , async (ordersItem) =>{
                                                                        if (ordersItem.OrderDateTime > lastOne) {lastOne = ordersItem.OrderDateTime}
                                                                    }).then(()=>{
                                                                        if ((new Date().getTime() - lastOne > 30*24*60*60*1000)){ activeNumbers.push(item.PhoneNumber)}
                                                                    })
                                                                });
                                                            }).then(()=>{
                                                                PhoneNumbers = activeNumbers;
                                                            })
                                                        });
                                                        break;
                                                    case "maxPurchaseCount" :

                                                        break;
                                                    case "maxPurchaseSum" :

                                                        break;
                                                    case "minPurchaseCount" :

                                                        break;
                                                    case "minPurchaseSum" :

                                                        break;
                                                    case "DiscountList" :

                                                        break;
                                                    case "numberOfPurchases" :

                                                        break;
                                                    case "averageOfOrderRate" :

                                                        break;
                                                    case "birthdate" :
                                                        customer.findAll({where:{BirthDate: new Date().toISOString().slice(0, 10).toString()}, attrChange:['PhoneNumber']}).then(async customersNumber=>{
                                                            PhoneNumbers = customersNumber;
                                                        });
                                                        break;
                                                    default:   callback({HttpCode: 400, response: {"code": 710}});

                                                }
                                            }

                                        }
                                    });
                                }
                            });
                            break;
                        case "sellerInfo":
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
                                            if (req.query.ID != null){

                                                Seller.findOne({where:{ID:req.query.ID }}).then(async seller=>{
                                                    if (seller != null){
                                                        orderProduct.findAll({where:{TransportarID:!null}}).then(OP=>{
                                                            callback("",{
                                                                seller :{
                                                                    CompanyName : seller.CompanyName,
                                                                    CompanyLogo : base64_encode(seller.LogoImage)
                                                                },
                                                                orderProducts : OP
                                                            });
                                                        });
                                                    }else {
                                                        callback({HttpCode: 404, response: {response: "703"}});
                                                    }
                                                })

                                            }
                                            else {
                                                callback({HttpCode: 400, response: {"code": 703}});
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
    }}

function sendSMS(Entity, template , token = "") {

    let request = require('request');


    if (Entity === Seller) {

        request(encodeURI("https://api.kavenegar.com/v1/38304E493253685735793161654676314C497056347073715775654A45726771/verify/lookup.json?receptor="+Entity.OwnerPhoneNumber+"&token="+token+"&template="+template),
            function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });
    } else {
        request(encodeURI("https://api.kavenegar.com/v1/38304E493253685735793161654676314C497056347073715775654A45726771/verify/lookup.json?receptor="+Entity.PhoneNumber+"&token="+token+"&template="+template),
            function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });
    }}

function sendNotification(Entity, Message) {
    globalVariable.io.to(Entity.SocketID).emit('notification', {Message: Message});
}

function SendAlarm(Entity, Message) {

    if (Entity.Status) {
        sendNotification(Entity, Message);
    } else {
        sendSMS(Entity, Message);
    }}


module.exports = {

    sendSMS  ,
    SendAlarm  ,
    FilteringRequest  ,
    sendOnTelegramChannel  ,
    checkToken  ,
    checkUser  ,
    CheckForeignKey,
    fillDataBase  ,
    base64_encode  ,
    isThisArrayEmpty  ,

};
