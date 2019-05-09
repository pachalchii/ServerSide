const {cities, sellerType, customer,addresses, Seller,ProductCategories,sellerPhoneNumber, SellerProductionManager,sellerOperator, sellerWareHouse, transportation, products, unit, car} = require('../../sequelize');
const {application} = require('../../sequelize');
const {colors, PHONENUMBER_REGEX,ImageLimitSize,ValidImageFormat,UplodDirs, PASSWORD_REGEX, USERNAME_REGEX, JWT_SECRET} = require('./configuration');
const jwt = require('jwt-simple');
const path = require('path');
const fs = require("fs");
const md5 = require('md5');
const asyncForEach = require('async-await-foreach')


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
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
                Type:null || value.Type ,
                ParentID:value.ParentID
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
            console.log(colors.bg.Red, colors.fg.White ,"import SellerType demo data canceled .", colors.Reset);
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
            console.log(colors.bg.Red, colors.fg.White,"import car model demo data canceled .", colors.Reset);
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
            console.log(colors.bg.Red,colors.fg.White, "import unit demo data canceled .", colors.Reset);
        }
    });

    var ProductCategoriesvar = [

        {ID: 1, Name: "گوساله"},

        {ID: 2, Name: "گوسفند"},

        {ID: 3, Name: "مرغ"},

        {ID: 4, Name: "ماهی"},

        {ID: 5, Name: "منجمد وارداتی"},

        {ID: 6, Name: "فراورده های گوشتی"},

    ];
    ProductCategories.findAll().then(productsgroup => {
        if (productsgroup[0] === undefined) {
            ProductCategoriesvar.forEach(insertProductCategories);
            console.log(colors.bg.Black, colors.fg.White, "import  products Group demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red,colors.fg.White, "import  products Group demo data canceled .", colors.Reset);
        }
    });

    var productsvar = [

        {ID: "1" , Name: "خرده گوساله" , CategoryID: "1" , Type: "0" , ParentID: null },
        {ID: "2" , Name: "خرده گوساله" , CategoryID: "1" , Type: "1" , ParentID: null },
        {ID: "3" , Name: "قلوه گاه گوساله" , CategoryID: "1" , Type: "0" , ParentID: null },
        {ID: "4" , Name: "قلوه گاه گوساله" , CategoryID: "1" , Type: "1" , ParentID: null }

    /*    {ID: "5" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "6" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "7" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "8" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "9" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "10" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "11" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "12" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "13" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "14" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "15" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "16" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "17" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "18" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "19" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "20" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "21" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "22" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "23" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "24" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "25" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "26" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "27" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
        {ID: "28" , Name: "" , CategoryID: "" , Type: "" , ParentID: "" },
*/

    ];
    products.findAll().then(products => {
        if (products[0] === undefined) {
            productsvar.forEach(insertProducts);
            console.log(colors.bg.Black, colors.fg.White, "import  products  demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red,colors.fg.White, "import  products  demo data canceled .", colors.Reset);
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
            console.log(colors.bg.Red,colors.fg.White, "import  app  demo data canceled .", colors.Reset);
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

function checkToken(req, res) {

    if (req.headers['token'] != null) {
        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.Password == null || (decodedJWT.username && decodedJWT.PhoneNumber)) {
                res.status(400).json({"code": 700});
                return false

            } else {

                var searchQuery;
                if (decodedJWT.Username != null) {
                    searchQuery = {
                        where: {
                            Username: decodedJWT.Username, Password: decodedJWT.Password
                        }
                    };
                } else if (decodedJWT.PhoneNumber != null || decodedJWT.OwnerPhoneNumber != null) {
                    try {
                        searchQuery = {
                            where: {
                                PhoneNumber: decodedJWT.PhoneNumber, Password: decodedJWT.Password
                            }
                        };
                    } catch (e) {
                        searchQuery = {
                            where: {
                                OwnerPhoneNumber: decodedJWT.OwnerPhoneNumber, Password: decodedJWT.Password
                            }
                        };

                    }

                } else {
                    res.status(400).json({"code": 700});
                }
                return searchQuery;


            }


        } catch (err) {
            res.status(400).json({"code": 700});
            return false;

        }


    } else {
        res.status(400).json({"code": 703});
        return false;
    }

}

function checkLimitTime(res) {
    var date = new Date();
    var current_hour = date.getHours();
    if (!(20 <= current_hour <= 22)) {
        res.status(404).json({"code": 714});
        return false;
    } else {
        return true;
    }
}

function CheckForeignKey(res ,array) {
    return new Promise((resolve)=>{
        var status = true;
        array.forEach((value)=>{
            if (value.Id == null || value.Entity == null ){
                status= false;
                console.log("incomming array is not in the ideal style");
            }
        });
        asyncForEach(array, async item => {
           await item.Entity.findOne({where:{Id:item.Id}}).then(Model=>{
                if (Model == null) {  status = false;return res.status(400).json({"code":718}); }
            });
        }).then(() => {
            resolve(status);
        });
    });


}

function checkUser(EncodedToken, Entity, callback) {

    Entity.findAll({EncodedToken}).then(user => {
        if (!isThisArrayEmpty(user)) {
            callback("", user[0]);
        } else {
            return res.status(400).json({"code": 700});
        }
    })


}

function ImageHandler(req,res,Dir) {
    return new Promise((resolve,reject)=>{
        if (req.file != null) {
            if (req.file.size <= ImageLimitSize) {
                const tempPath = req.file.path;
                const targetPath = path.join(__dirname, Dir + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                image = targetPath;
                if (ValidImageFormat.indexOf(path.extname(req.file.originalname).toLowerCase()) !== -1) {
                    fs.rename(tempPath, targetPath, function (err){
                        if (err) {
                            fs.unlink(tempPath,()=>{
                                reject(err);
                            });
                        }else {
                            fs.unlink(tempPath,()=>{
                                resolve(targetPath);
                            });
                        }
                    });
                } else {
                    fs.unlink(tempPath, err => {
                        return res.status(400).json({"code":720});
                    });
                }


            }
            else { return res.status(400).json({"code":719}); }
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
                                                default :
                                                    SwitchStatus = false;
                                                    callback({HttpCode: 400, response: {response: "716"}});
                                            }
                                            if (SwitchStatus) {
                                                if (req.body.Role === "seller") {

                                                    Entity.findOne({where: {OwnerPhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                        if (UserModel != null) {
                                                            if (UserModel.Status) {
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
                                                            if (UserModel.Status) {
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
                                                    default :   SwitchStatus = false; callback({HttpCode: 400, response: {response: "716"}});
                                                }
                                                if (SwitchStatus){
                                                    if (req.body.Role === "seller"){
                                                        Entity.findOne({where: {OwnerPhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                if (UserModel.Status) {
                                                                    if (UserModel.AuthCode === req.body.Code) {
                                                                        callback("",UserModel);
                                                                    } else {
                                                                        callback({HttpCode: 404, response: {response: "715"}});
                                                                    }
                                                                } else {
                                                                    callback({HttpCode: 404, response: {response: "900"}});
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
                                                                        callback("",UserModel);
                                                                    } else {
                                                                        callback({HttpCode: 404, response: {response: "715"}});
                                                                    }
                                                                } else {
                                                                    callback({HttpCode: 404, response: {response: "900"}});
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
                                case "changePassword":
                                    if (req.body.PhoneNumber != null  && req.body.Password != null && req.body.Role != null) {
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
                                                    default :   SwitchStatus = false; callback({HttpCode: 400, response: {response: "716"}});
                                                }
                                                if (SwitchStatus){
                                                    if (req.body.Role === "seller"){
                                                        Entity.findOne({where: {OwnerPhoneNumber: req.body.PhoneNumber}}).then(UserModel => {
                                                            if (UserModel != null) {
                                                                if (UserModel.Status) {
                                                                    if(UserModel.IsForgetPasswordVerified){
                                                                        callback("",UserModel);
                                                                    }else {
                                                                        callback({HttpCode: 404, response: {response: "721"}});

                                                                    }
                                                                } else {
                                                                    callback({HttpCode: 404, response: {response: "900"}});
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
                                                                    if(UserModel.IsForgetPasswordVerified){
                                                                        callback("",UserModel);
                                                                    }           else {
                                                                        callback({HttpCode: 404, response: {response: "721"}});

                                                                    }                                                    } else {
                                                                    callback({HttpCode: 404, response: {response: "900"}});
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
                            if (req.body.PhoneNumber1 == null && req.body.PhoneNumber2 == null && req.body.PhoneNumber3 == null && req.body.PhoneNumber4 == null && req.body.PhoneNumber5 == null  )
                            {
                                callback({HttpCode: 400, response: {response: "703"}});

                            } else {
                                callback("","");
                            }

                        break;
                        case "login":
                        function BiuldLoginSearchQuery(req,res, callback) {
                            if (req.body.PhoneNumber != null){
                                if (req.body.Role === "seller"){
                                    callback("",
                                        {
                                            where: {
                                                OwnerPhoneNumber: req.body.PhoneNumber, password: md5(req.body.Password)
                                            }
                                        });
                                }else {
                                    callback("",
                                        {
                                            where: {
                                                PhoneNumber: req.body.PhoneNumber, password: md5(req.body.Password)
                                            }
                                        });
                                }


                            } else if (req.body.Username != null){
                                callback("",{
                                    where: {
                                        Username: req.body.Username, Password: md5(req.body.Password)
                                    }
                                }) ;
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
                                }else {
                                    InfoStatus = false;
                                }
                                if (InfoStatus){
                                    BiuldLoginSearchQuery(req,res,(err,data)=>{
                                        if (!err){
                                            switch (req.body.Role) {
                                                case "customer":
                                                    customer.findOne(data).then(customer => {
                                                        if (customer != null) {
                                                            var payload = {
                                                                Username: customer.Username,
                                                                Password: customer.Password
                                                            };
                                                            var base64str = "not Found";
                                                            try {
                                                                base64str = base64_encode(customer.Image);

                                                            } catch (e) {
                                                                base64str = "not Found";

                                                            }
                                                            var token = jwt.encode(payload, JWT_SECRET);
                                                            addresses.findAll({where:{CustomerID:customer.ID}}).then(
                                                                addresses=>{
                                                                    var newAdrress  =[];
                                                                    asyncForEach(addresses,async item =>{
                                                                        await cities.findOne({where:{ID:item.CityID}}).then(
                                                                            city=>{
                                                                                newAdrress.push({
                                                                                    ID:item.ID,
                                                                                    GoogleMapAddressLink:item.GoogleMapAddressLink,
                                                                                    CompleteAddressDescription:item.CompleteAddressDescription,
                                                                                    CustomName:item.CustomName,
                                                                                    CityName:city.Name
                                                                                })
                                                                            }
                                                                        );
                                                                    }).then(answer=>{
                                                                        callback("",{
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
                                                                                Addressess:newAdrress
                                                                            }
                                                                        })
                                                                    });

                                                                }
                                                            );

                                                        } else {
                                                            callback({HttpCode: 404, response: {response: "710"}});
                                                        }

                                                    });
                                                    break;
                                                case "seller":
                                                            Seller.findOne(data).then(seller => {
                                                                if (seller != null) {
                                                                    var payload = {
                                                                        OwnerPhoneNumber: seller.OwnerPhoneNumber,
                                                                        Password: seller.Password,
                                                                    };
                                                                    var base64str = "not Found";
                                                                    try {
                                                                        base64str = base64_encode(seller.LogoImage);

                                                                    } catch (e) {
                                                                        base64str = "not Found";

                                                                    }
                                                                    var token = jwt.encode(payload, JWT_SECRET);

                                                                    callback("",{
                                                                        "data": {

                                                                            ID: seller.PhoneNumberID,
                                                                            CompanyName: seller.CompanyName,
                                                                            CompleteAddressDescription: seller.CompleteAddressDescription,
                                                                            Enable: seller.Enable,
                                                                            Point: seller.Point,
                                                                            RegistrationDateTime: seller.RegistrationDateTime,
                                                                            GoogleMapAddressLink: seller.GoogleMapAddressLink,
                                                                            LogoImage: base64str,
                                                                            OwnerFamilyName: seller.OwnerFamilyName,
                                                                            OwnerName: seller.OwnerName,
                                                                            Password: seller.Password,
                                                                            OwnerPhoneNumber: seller.OwnerPhoneNumber,
                                                                            Username: seller.Username,
                                                                            CompanyAddressCityID: seller.CompanyAddressCityID,
                                                                            PhoneNumberID: seller.PhoneNumberID,
                                                                            TypeID: seller.TypeID,
                                                                            Token: token
                                                                        }
                                                                    });


                                                                } else {
                                                                    callback({HttpCode: 404, response: {response: "710"}});
                                                                }


                                                            });
                                                    break;
                                                case "transportation":
                                                            transportation.findOne(data).then(trans => {
                                                                if (trans != null) {
                                                                    var payload = {
                                                                        PhoneNumber: trans.PhoneNumber,
                                                                        password: trans.password,
                                                                        random: Math.random()
                                                                    };


                                                                    var base64str = "not Found";
                                                                    try {
                                                                        base64str = base64_encode(trans.Image);

                                                                    } catch (e) {
                                                                        base64str = "not Found";

                                                                    }
                                                                    var token = jwt.encode(payload, JWT_SECRET);

                                                                        callback("",{
                                                                            "data": {

                                                                                ID: trans.PhoneNumberID,
                                                                                AirConditionar: trans.AirConditionar,
                                                                                Color: trans.Color,
                                                                                Description: trans.Description,
                                                                                FamilyName: trans.FamilyName,
                                                                                Image: base64str,
                                                                                Name: trans.Name,
                                                                                PelakNumber: trans.PelakNumber,
                                                                                PhoneNumber: trans.PhoneNumber,
                                                                                Point: trans.Point,
                                                                                Username: trans.Username,
                                                                                ModelID: trans.ModelID,
                                                                                WareHouseID: trans.WareHouseID,
                                                                                Token: token
                                                                            }
                                                                        });
                                                                } else {
                                                                    callback({HttpCode: 404, response: {response: "710"}});
                                                                }


                                                            });



                                                    break;
                                                case "support":
                                                            support.findOne(data).then(support => {
                                                                if (support != null) {
                                                                    var payload = {
                                                                        PhoneNumber: support.PhoneNumber,
                                                                        Password: support.Password,
                                                                        random: Math.random()
                                                                    };


                                                                    var base64str = "not Found";
                                                                    try {
                                                                        base64str = base64_encode(support.Image);

                                                                    } catch (e) {
                                                                        base64str = "not Found";

                                                                    }
                                                                    var token = jwt.encode(payload, JWT_SECRET);

                                                                    callback("",{
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
                                                                    callback({HttpCode: 404, response: {response: "710"}});
                                                                }


                                                            });
                                                    break;
                                                case "productionManager":
                                                            SellerProductionManager.findOne(data).then(SellerProductionManager => {
                                                                if (SellerProductionManager  != null) {
                                                                    var payload = {
                                                                        PhoneNumber: SellerProductionManager.PhoneNumber,
                                                                        Password: SellerProductionManager.Password,
                                                                        random: Math.random()
                                                                    };


                                                                    var base64str = "not Found";
                                                                    try {
                                                                        base64str = base64_encode(SellerProductionManager.Image);

                                                                    } catch (e) {
                                                                        base64str = "not Found";

                                                                    }
                                                                    var token = jwt.encode(payload, JWT_SECRET);

                                                                    callback("",{
                                                                        "data": {

                                                                            ID: SellerProductionManager.PhoneNumberID,
                                                                            Name: SellerProductionManager.Name,
                                                                            FamilyName: SellerProductionManager.FamilyName,
                                                                            BirthDate: SellerProductionManager.BirthDate,
                                                                            PhoneNumber: SellerProductionManager.PhoneNumber,
                                                                            Image: base64str,
                                                                            CellPhoneNumber: SellerProductionManager.CellPhoneNumber,
                                                                            Status: SellerProductionManager.Status,
                                                                            Username: SellerProductionManager.Username,
                                                                            SellerIDr: SellerProductionManager.SellerID,
                                                                            Token: token
                                                                        }
                                                                    });
                                                                } else {
                                                                    callback({HttpCode: 404, response: {response: "710"}});
                                                                }


                                                            });
                                                    break;
                                                case "operator":
                                                            sellerOperator.findAll(data).then(operator => {
                                                                if (operator != null) {
                                                                    var payload = {
                                                                        PhoneNumber: operator.PhoneNumber,
                                                                        Password: operator.Password,
                                                                        random: Math.random()
                                                                    };


                                                                    var base64str = "not Found";
                                                                    try {
                                                                        base64str = base64_encode(operator.Image);

                                                                    } catch (e) {
                                                                        base64str = "not Found";

                                                                    }
                                                                    var token = jwt.encode(payload, JWT_SECRET);

                                                                    callback("",{
                                                                        "data": {

                                                                            ID: operator.PhoneNumberID,
                                                                            FamilyName: operator.FamilyName,
                                                                            Name: operator.Name,
                                                                            BirthDate: operator.BirthDate,
                                                                            PhoneNumber: operator.PhoneNumber,
                                                                            Image: base64str,
                                                                            Point: operator.Point,
                                                                            Username: operator.Username,
                                                                            SellerID: operator.SellerID,
                                                                            Token: token


                                                                        }
                                                                    });
                                                                } else {
                                                                    callback({HttpCode: 404, response: {response: "710"}});
                                                                }


                                                            });
                                                    break;
                                                default:callback({HttpCode: 404, response: {response: "716"}});

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
                                    break;

                                case "seller":
                                    if (req.body.CompanyName == null ||
                                        req.body.CompleteAddressDescription == null ||
                                        req.body.GoogleMapAddressLink == null ||
                                        req.body.OwnerName == null ||
                                        req.body.OwnerFamilyName == null ||
                                        req.body.OwnerPhoneNumber == null ||
                                        req.body.Username == null ||
                                        req.body.Password == null ||
                                        req.body.CompanyAddressCityID == null ||
                                        req.body.PhoneNumberID == null) {
                                        res.status(400).json({"code": 703});
                                        return false;
                                    } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));
                                    break;
                            }


                        }
                                if (req.body.Role == null) {
                                callback({HttpCode: 404, response: {response: "716"}});
                                } else {
                                    if (registerInfoCheck(req, res, req.body.Role)) {
                                            switch (req.body.Role) {
                                                case "customer":
                                                    CheckForeignKey(res,[{Id:req.body.CityID , Entity:cities}]).then(status=>{
                                                        if (status){
                                                            var image = "notSetYet";
                                                           ImageHandler(req,res,UplodDirs.customer)
                                                               .then(Image=>{
                                                                   image=Image;
                                                                   callback("",{
                                                                   BirthDate: req.body.BirthDate,
                                                                   CompanyName: req.body.CompanyName,
                                                                   Enable: true,
                                                                   Status: true,
                                                                   FamilyName: req.body.FamilyName,
                                                                   Image: image,
                                                                   Name: req.body.Name,
                                                                   PhoneNumber: req.body.PhoneNumber,
                                                                   Password: md5(req.body.Password),
                                                                   EstablishedDate: req.body.EstablishedDate,
                                                                   Point: 0,
                                                                   RegistrationDateTime: req.body.RegistrationDateTime,
                                                                   Theme: req.body.Theme,
                                                                   Username: req.body.Username,
                                                                   CityID: req.body.CityID

                                                               });})
                                                               .catch(message=>{
                                                                   console.log(message);
                                                               });
                                                        }
                                                    });
                                                    break;
                                                case "seller":
                                                    CheckForeignKey(res,[{Id:req.body.CompanyAddressCityID , Entity:cities},{Id:req.body.PhoneNumberID , Entity:sellerPhoneNumber}]).then(status=>{
                                                        if (status) {
                                                            var image = "notSetYet";
                                                            ImageHandler(req,res,UplodDirs.seller)
                                                                .then(Image=>{
                                                                    image=Image;
                                                                    callback("", {
                                                                        ID: req.body.PhoneNumberID,
                                                                        CompanyName: req.body.CompanyName,
                                                                        CompleteAddressDescription: req.body.CompleteAddressDescription,
                                                                        Status: true,
                                                                        Point: 0,
                                                                        Enable:true,
                                                                        RegistrationDateTime: req.body.RegistrationDateTime,
                                                                        GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                                                        LogoImage: image,
                                                                        OwnerFamilyName: req.body.OwnerFamilyName,
                                                                        OwnerName: req.body.OwnerName,
                                                                        Password: md5(req.body.Password),
                                                                        OwnerPhoneNumber: req.body.OwnerPhoneNumber,
                                                                        Username: req.body.Username,
                                                                        CompanyAddressCityID: req.body.CompanyAddressCityID,
                                                                        PhoneNumberID: req.body.PhoneNumberID,
                                                                        TypeID: 1

                                                                    });})
                                                                .catch(message=>{
                                                                    console.log(message);
                                                                });
                                                        }
                                                    });
                                                    break;
                                                default:callback({HttpCode: 404, response: {response: "716"}});
                                            }
                                    }
                                }


                            break;

                    }

                    break;

            }
            break;

    }

}

function filterRequest(req, res, type) {
    switch (type) {
        case "orderProduct":
            if (req.body.ID == null || req.body.Status == null) {
                res.status(400).json({"code": 703});
                return false;
            }
            else if (req.body.Status) {
                if (req.body.WareHouseID == null) {
                    res.status(404).json({"code": 703});
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
            break;
        case "WorderProduct":
            if (req.body.ID == null || req.body.Status == null) {
                res.status(400).json({"code": 703});
                return false;
            }
            else if (req.body.Status) {
                if (req.body.TransportarID == null) {
                    res.status(404).json({"code": 703});
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
            break;
            break;
        case "customerAddress":
            if (req.body.CityID == null || req.body.GoogleMapAddressLink == null || req.body.CompleteAddressDescription == null || req.body.CustomName == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                return true;
            }
            break;
        case "DoOrder":
            if (req.body.CustomerAddressID == null || req.body.DateTimeErsal == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                var products = [];
                products = req.body.products;
                var status = true;
                var tof = false;

                function productsIteration(value, index, array) {
                    if (value.SellerProductID == null || value.Supply == null) {
                        status = false;
                        if (!tof) {
                            res.status(400).json({"code": 703});
                            tof = true;
                        }
                    }
                }

                if (isThisArrayEmpty(products)) {
                    res.status(400).json({"code": 703});
                    return false;
                } else {
                    products.forEach(productsIteration);

                    return status;
                }
            }

            break;
        case "followUp":
            if (req.body.HashCode == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                return true;
            }
            break;
        case "editCustomerAddress":
            if (req.body.CustomerAddressID == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                return true;
            }
            break;
        case "message":
            console.log("hi")
            if (req.body.Message == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                return true;
            }
            break;
        case "Smessage":
            if (req.body.ToID == null || req.body.Message == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                return true;
            }
            break;
        case "search":
            if (req.body.param == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                return true;
            }
            break;
        case "Survey":
            if (req.body.OrderID == null || req.body.Support == null || req.body.Transportar == null || req.body.SellerOperator == null || req.body.Seller == null || req.body.PachalChi == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                return true;
            }
            break;
        case "getPhoneNumber":
            if (req.query.SellerID == null) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                return true;
            }
            break;


        default :
            console.log("wrong type parameter")
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
                req.body.OwnerPhoneNumber == null ||
                req.body.Username == null ||
                req.body.Password == null ||
                req.body.CompanyAddressCityID == null ||
                req.body.PhoneNumberID == null) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));
            break;
        case "transportation":
            if (req.body.AirConditionar == null ||
                req.body.BirthDate == null ||
                req.body.Color == null ||
                req.body.Description == null ||
                req.body.FamilyName == null ||
                req.body.Name == null ||
                req.body.Password == null ||
                req.body.PelakNumber == null ||
                req.body.PhoneNumber == null ||
                req.body.Username == null ||
                req.body.ModelID == null) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

            break;
        case "wareHouse":

            if (req.body.AgentFamilyName == null ||
                req.body.AgentName == null ||
                req.body.BirthDate == null ||
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

            break;
        case "operator" :
            if (req.body.BirthDate == null ||
                req.body.FamilyName == null ||
                req.body.Name == null ||
                req.body.Password == null ||
                req.body.PhoneNumber == null ||
                req.body.Username == null) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

            break;

        default :
            return res.status(404).json({"message": "invalid role type"});
    }


}




module.exports = {

    checkLimitTime,
    filterRequest,
    FilteringRequest,
    checkToken,
    checkUser,
    fillDataBase,
    addRoleInfoCheck,
    base64_encode,
    isThisArrayEmpty,

};
