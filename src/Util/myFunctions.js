const {cities, sellerType, productGroups, products, unit, car} = require('../../sequelize');
const { orderProduct ,application } = require('../../sequelize');
const {loggererror  ,colors, PHONENUMBER_REGEX, PASSWORD_REGEX, USERNAME_REGEX , JWT_SECRET} = require('./myVars');
var jwt = require('jwt-simple');
var Kavenegar = require('kavenegar');


function smsHandler(message,phone) {
    var api = Kavenegar.KavenegarApi({
        apikey: '394B54306C322B487455556F65446A4837376B6C4D70454E49624F5252725438'});
    api.Send({
        message: message,
        sender: "100065995",
        receptor: phone
    },
        function(response, status) {
            console.log(response);
            console.log(status);
        });
    
}
function response(res, json) {

    return new Promise(resolve => {
        if (json === undefined) {
            return res.status(200).json();
        } else {
            return res.json(json);
        }
    });
}

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

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

function insertProductsGroup(value, index, array) {
    productGroups.create(
        {

            ID: value.ID,
            Name: value.Name,
            ParentID: value.ParentID
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
            GroupID: value.GroupID
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

function fillDataBase() {

    var city = [
        {ID: 1,  Name: "آذربایجان شرقی"},
        {ID: 2,  Name: "اردبیل"},
        {ID: 3,  Name: "اصفهان"},
        {ID: 4,  Name: "البرز"},
        {ID: 5,  Name: "ایلام"},
        {ID: 6,  Name: "بوشهر"},
        {ID: 7,  Name: "تهران"},
        {ID: 8,  Name: "چهارمحال و بختیاری"},
        {ID: 9,  Name: "خراسان جنوبی"},
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
        if (cities[0] === undefined) {
            city.forEach(insertCities);
            console.log(colors.bg.Green, "import  city demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, "import city demo data canceled .", colors.Reset);
        }
    });

    var type = [
        {ID: 1, Type: "شرکت اصلی"},
        {ID: 2, Type: "نماینده فروش"}

    ];
    sellerType.findAll().then(sellerType => {
        if (sellerType[0] === undefined) {
            type.forEach(insertTypes);
            console.log(colors.bg.Green, "import  SellerType demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, "import SellerType demo data canceled .", colors.Reset);
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
            console.log(colors.bg.Green, "import  car model demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, "import car model demo data canceled .", colors.Reset);
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
            console.log(colors.bg.Green, "import unit demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, "import unit demo data canceled .", colors.Reset);
        }
    });

    var productsGroupvar = [

        {ID: 2, Name: "گوساله", ParentID: null},

        {ID: 23, Name: "گوسفند", ParentID: null},

        {ID: 52, Name: "مرغ", ParentID: null},

        {ID: 96, Name: "ماهی", ParentID: null},

        {ID: 108, Name: "منجمد وارداتی", ParentID: null},

        {ID: 109, Name: "گوسفند وارداتی", ParentID: 108},
        {ID: 110, Name: "گوساله وارداتی", ParentID: 108},
        {ID: 111, Name: "ران", ParentID: 109},
        {ID: 112, Name: "سردست", ParentID: 109},
        {ID: 113, Name: "گردن", ParentID: 109},
        {ID: 114, Name: "راسته با استخوان", ParentID: 109},
        {ID: 115, Name: "راسته شاندیزی", ParentID: 109},
        {ID: 116, Name: "گردن", ParentID: 109},
        {ID: 117, Name: "قلوه گاه گوسفند", ParentID: 109},
        {ID: 118, Name: "قلوه گاه با استخوان گوسفند", ParentID: 109},
        {ID: 119, Name: "ماهیچه", ParentID: 109},


        {ID: 126, Name: "ران", ParentID: 110},
        {ID: 127, Name: "سردست", ParentID: 110},
        {ID: 128, Name: "گردن", ParentID: 110},
        {ID: 129, Name: "بغل ران", ParentID: 110},
        {ID: 130, Name: "سفید ران", ParentID: 110},
        {ID: 131, Name: "مغز ران", ParentID: 110},
        {ID: 132, Name: "راسته", ParentID: 110},
        {ID: 133, Name: "فیله", ParentID: 110},
        {ID: 134, Name: "قلوه گاه", ParentID: 110},


        {ID: 150, Name: "فراورده های گوشتی", ParentID: null}


    ];
    productGroups.findAll().then(productsgroup => {
        if (productsgroup[0] === undefined) {
            productsGroupvar.forEach(insertProductsGroup);
            console.log(colors.bg.Green, "import  products Group demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, "import  products Group demo data canceled .", colors.Reset);
        }
    });

    var productsvar = [
        {ID: 3, Name: "قلوه گاه گوساله", GroupID: 2},
        {ID: 4, Name: "خرده راسته گوساله", GroupID: 2},
        {ID: 5, Name: "گردن گوساله", GroupID: 2},
        {ID: 6, Name: "فیله گوساله", GroupID: 2},
        {ID: 7, Name: "مغز راسته گوساله", GroupID: 2},
        {ID: 8, Name: "راسته با استخوان گوساله", GroupID: 2},
        {ID: 9, Name: "دنبالیچه گوساله", GroupID: 2},
        {ID: 10, Name: "چربی گوساله", GroupID: 2},
        {ID: 11, Name: "ران ممتاز گوساله جوان", GroupID: 2},
        {ID: 12, Name: "سردست ممتاز گوساله جوان", GroupID: 2},
        {ID: 13, Name: "ران ممتاز ماده گاو", GroupID: 2},
        {ID: 14, Name: "سردست ممتاز ماده گاو", GroupID: 2},
        {ID: 15, Name: "ماهیچه گوساله", GroupID: 2},
        {ID: 16, Name: "ران با استخوان گوساله جوان", GroupID: 2},
        {ID: 17, Name: "سردست با استخوان گوساله جوان", GroupID: 2},
        {ID: 18, Name: "ران با استخوان ماده گاو", GroupID: 2},
        {ID: 19, Name: "سردست با استخوان ماده گاو ", GroupID: 2},
        {ID: 20, Name: "چرخکرده مخلوط", GroupID: 2},
        {ID: 21, Name: "چرخکرده گوساله", GroupID: 2},
        {ID: 22, Name: "خرده گوساله", GroupID: 2},


        {ID: 24, Name: "خرده گوسفند", GroupID: 23},
        {ID: 25, Name: "قلوه گاه گوسفند", GroupID: 23},
        {ID: 26, Name: "قلوه گاه با استخوان گوسفند", GroupID: 23},
        {ID: 27, Name: "خرده قلوه گاه گوسفند", GroupID: 23},
        {ID: 28, Name: "خرده راسته گوسفند", GroupID: 23},
        {ID: 29, Name: "گردن گوسفند", GroupID: 23},
        {ID: 30, Name: "گردن شقه ای گوسفند", GroupID: 23},
        {ID: 31, Name: "لاشه بدون دنبه گوسفند", GroupID: 23},
        {ID: 32, Name: "لاشه گوسفند با کله", GroupID: 23},
        {ID: 33, Name: "دنبه گوسفند", GroupID: 23},
        {ID: 34, Name: "ران ممتاز گوسفند", GroupID: 23},
        {ID: 35, Name: "ران بدون استخوان گوسفند", GroupID: 23},
        {ID: 36, Name: "سردست ممتاز گوسفند", GroupID: 23},
        {ID: 37, Name: "سردست بدون استخوان گوسفند", GroupID: 23},
        {ID: 38, Name: "راسته با استخوان گوسفند", GroupID: 23},
        {ID: 39, Name: "راسته بدون استخوان گوسفند", GroupID: 23},
        {ID: 40, Name: "مغز راسته گوسفند ( دو تکه)", GroupID: 23},
        {ID: 41, Name: "مغز راسته گوسفند ( سه تکه)", GroupID: 23},
        {ID: 42, Name: "فیله ممتاز گوسفند", GroupID: 23},
        {ID: 43, Name: "راسته شاندیزی گوسفند", GroupID: 23},
        {ID: 44, Name: "شیشلیک بدون مواد گوسفند", GroupID: 23},
        {ID: 45, Name: "شیشلیک با مواد گوسفند", GroupID: 23},
        {ID: 46, Name: "ماهیچه بدون گل گوسفند", GroupID: 23},
        {ID: 47, Name: "ماهیچه با گل گوسفند", GroupID: 23},
        {ID: 48, Name: "ماهیچه ران گوسفند", GroupID: 23},
        {ID: 49, Name: "ماهیچه برش مشهدی گوسفند", GroupID: 23},
        {ID: 50, Name: "ران و سردست بشقابی گوسفند", GroupID: 23},
        {ID: 51, Name: "ماهیچه بشقابی گوسفند", GroupID: 23},


        {ID: 53, Name: "ران بی پوست بدون کمر  300 گرمی", GroupID: 52},
        {ID: 54, Name: "ران بی پوست بدون کمر  350 گرمی", GroupID: 52},
        {ID: 55, Name: "ران بی پوست بدون کمر  400 گرمی", GroupID: 52},
        {ID: 56, Name: "ران با پوست بدون کمر  300 گرمی", GroupID: 52},
        {ID: 57, Name: "ران با پوست بدون کم  350 گرمی", GroupID: 52},
        {ID: 58, Name: "ران با پوست بدون کمر  400 گرمی", GroupID: 52},
        {ID: 59, Name: "سینه با استخوان بدون پوست  300 گرمی", GroupID: 52},
        {ID: 60, Name: "سینه با استخوان بدون پوست  350 گرمی", GroupID: 52},
        {ID: 61, Name: "سینه با استخوان بدون پوست  400 گرمی", GroupID: 52},
        {ID: 62, Name: "سینه با استخوان با پوست  300 گرمی", GroupID: 52},
        {ID: 63, Name: "سینه با استخوان با پوست  350 گرمی", GroupID: 52},
        {ID: 64, Name: "سینه با استخوان با پوست  400 گرمی", GroupID: 52},
        {ID: 65, Name: "بال با نوک", GroupID: 52},
        {ID: 66, Name: "بال بی نوک", GroupID: 52},
        {ID: 67, Name: "بازو با پوست", GroupID: 52},
        {ID: 68, Name: "بازو بی پوست", GroupID: 52},
        {ID: 69, Name: "بال و بازو سه تکه", GroupID: 52},
        {ID: 70, Name: "بال و بازو دو تکه", GroupID: 52},
        {ID: 71, Name: "گردن با پوست", GroupID: 52},
        {ID: 72, Name: "گردن بی پوست", GroupID: 52},
        {ID: 73, Name: "فیله", GroupID: 52},
        {ID: 74, Name: "مرغ کامل شکم خالی 1200 گرمی", GroupID: 52},
        {ID: 75, Name: "مرغ کامل شکم خالی 1300 گرمی", GroupID: 52},
        {ID: 76, Name: "مرغ کامل شکم خالی 1400 گرمی", GroupID: 52},
        {ID: 77, Name: "مرغ کامل شکم خالی 1500 گرمی", GroupID: 52},
        {ID: 78, Name: "مرغ کامل شکم خالی 1600 گرمی", GroupID: 52},
        {ID: 79, Name: "مرغ کامل شکم خالی 1700 گرمی", GroupID: 52},
        {ID: 80, Name: "مرغ کامل شکم خالی 1800 گرمی", GroupID: 52},
        {ID: 81, Name: "مرغ کامل شکم خالی 1900 گرمی", GroupID: 52},
        {ID: 82, Name: "مرغ کامل شکم خالی 2000 گرمی", GroupID: 52},
        {ID: 83, Name: "مرغ کامل شکم خالی 2100 گرمی", GroupID: 52},
        {ID: 84, Name: "مرغ کامل شکم خالی 2200 گرمی", GroupID: 52},
        {ID: 85, Name: "مرغ کامل شکم خالی درشت", GroupID: 52},
        {ID: 86, Name: "سینه بدون کتف ممتاز", GroupID: 52},
        {ID: 87, Name: "سینه بدون کتف معمولی", GroupID: 52},
        {ID: 88, Name: "سینه با کتف ممتاز", GroupID: 52},
        {ID: 89, Name: "سینه با کتف معمولی", GroupID: 52},
        {ID: 90, Name: "اکبر جوجه 600 گرمی", GroupID: 52},
        {ID: 91, Name: "اکبر جوجه 1000 گرمی", GroupID: 52},
        {ID: 92, Name: "اکبر جوجه 1100 گرمی", GroupID: 52},
        {ID: 93, Name: "خرده مرغ", GroupID: 52},
        {ID: 94, Name: "گوشت گردن", GroupID: 52},
        {ID: 95, Name: "خمیر مرغ", GroupID: 52},

        {ID: 97, Name: "قزل آلا 200 گرمی", GroupID: 96},
        {ID: 98, Name: "قزل آلا 2520 گرمی", GroupID: 96},
        {ID: 99, Name: "قزل آلا 300 گرمی", GroupID: 96},
        {ID: 100, Name: "قزل آلا 350 گرمی", GroupID: 96},
        {ID: 101, Name: "قزل آلا 400 گرمی", GroupID: 96},
        {ID: 102, Name: "قزل آلا 450 گرمی", GroupID: 96},
        {ID: 103, Name: "قزل آلا 500 گرمی", GroupID: 96},
        {ID: 104, Name: "تیلاپیا M", GroupID: 96},
        {ID: 105, Name: "تیلاپیا S", GroupID: 96},
        {ID: 106, Name: "سالمون", GroupID: 96},
        {ID: 107, Name: "میگو", GroupID: 96},


        {ID: 120, Name: "مغول", GroupID: 111},
        {ID: 121, Name: "استرالیا", GroupID: 111},
        {ID: 122, Name: "قزاقستان", GroupID: 111},
        {ID: 123, Name: "نیوزلند", GroupID: 111},
        {ID: 124, Name: "ارمنستان", GroupID: 111},
        {ID: 125, Name: "گرجستان", GroupID: 111},


        {ID: 135, Name: "مینروا", GroupID: 126},
        {ID: 136, Name: "جی جی", GroupID: 126},
        {ID: 137, Name: "جی جی زد", GroupID: 126},
        {ID: 138, Name: "آگرا", GroupID: 126},
        {ID: 139, Name: "استرلا", GroupID: 126},
        {ID: 140, Name: "آسترا", GroupID: 126},
        {ID: 141, Name: "فری بوی", GroupID: 126},
        {ID: 142, Name: "فریگو", GroupID: 126},
        {ID: 143, Name: "مارفریگ", GroupID: 126},
        {ID: 144, Name: "بیف کلاب", GroupID: 126},
        {ID: 145, Name: "آنجلو", GroupID: 126},
        {ID: 146, Name: "پالاتاری", GroupID: 126},
        {ID: 147, Name: "کیومیت", GroupID: 126},
        {ID: 148, Name: "متابوی", GroupID: 126},
        {ID: 149, Name: "بیگ بوی", GroupID: 126},


        {ID: 151, Name: "سوسیس", GroupID: 150},
        {ID: 152, Name: "کالباس", GroupID: 150},
        {ID: 153, Name: "همبرگر و کباب لقمه", GroupID: 150},
        {ID: 154, Name: "غذاهای آماده", GroupID: 150}
    ];
    products.findAll().then(products => {
        if (products[0] === undefined) {
            productsvar.forEach(insertProducts);
            console.log(colors.bg.Green, "import  products  demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, "import  products  demo data canceled .", colors.Reset);
        }
    });

    application.findAll().then(app => {
        if (app[0] === undefined) {
            application.create({"ID":"1",
                                "ClientVersion":"1.0.0"}).then(
                console.log(colors.bg.Green, "import  app  demo data done successfuly", colors.Reset)
        );
        } else {
            console.log(colors.bg.Red, "import  app  demo data canceled .", colors.Reset);
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
            res.status(400).json({"code":711});
            return false;
        }
        return true;


    }

}

function checkPassword(req, res) {
    if (req.body.Password != null) {
        var pattern = new RegExp(PASSWORD_REGEX);
        var status = pattern.test(req.body.Password);
        if (!status) {
            res.status(400).json({"code": 712});
            return false;
        }
        return true;


    }

}

function checkUserName(req, res) {
    if (req.body.usernamer != null) {
        var pattern = new RegExp(USERNAME_REGEX);
        var status = pattern.test(req.body.Username);
        if (!status) {
            res.status(400).json({"code": 713});
            return false;
        }
        return true;


    }

}

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

function loginInfoCheck(req, res, role) {
    switch (role) {
        case "customer":
            if (
                req.body.Password == null || (req.body.PhoneNumber == null && req.body.Username == null)

            ) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                if (req.body.PhoneNumber != null) {
                    checkPhone(req, res);
                }
                checkPassword(req, res)
            }
            ;
            break;
        case "seller":
            if (
                req.body.Password == null || (req.body.PhoneNumber == null && req.body.Username == null)

            ) {
                res.status(400).json({"code": 703});
                return false;
            } else {
                if (req.body.PhoneNumber != null) {
                    checkPhone(req, res);
                }
                checkPassword(req, res)
            }
            ;
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
                req.body.ModelID == null ||
                req.body.WareHouseID == null
            ) {
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
                req.body.WareHouseAddressCityID == null ||
                req.body.SellerID == null) {
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
                req.body.Username == null ||
                req.body.SellerID == null
            ) {
                res.status(400).json({"code": 703});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

            break;

        default :
            return res.status(404).json({"message": "invalid role type"});
    }


}

function checkToken(req, res ) {

        if (req.headers['token'] != null) {
            try{
                var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
                if (decodedJWT.Password == null || (decodedJWT.username  && decodedJWT.PhoneNumber )) {
                     res.status(400).json({message: "expired token"});
                     return false

                }else {

                    var searchQuery ;
                    if (decodedJWT.Username != null) {
                        searchQuery = {
                            where: {
                                Username: decodedJWT.Username, Password: decodedJWT.Password
                            }
                        };
                    }else {
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

                    }
                   return searchQuery;


                }




            }  catch(err) {
                loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                  res.status(400).json({"message":"expired token"});
                  return false;

            }



        } else {
            res.status(400).json({"code": 703});
              return false;
        }

}

function filterRequest(req,res,type){
    switch (type) {
        case "orderProduct":
            if (req.body.ID == null || req.body.Status == null){res.status(400).json({"code": 703}); return false;}
            if (req.body.Status){
                if (req.body.WareHouseID == null){
                    res.status(404).json({"code":703});
                    return false;
                }
            } 
            break;


        default : console.log("wrong type parameter")
    }
}

function checkLimitTime(res){
    var date = new Date();
    var current_hour = date.getHours();
    if(!(20<=current_hour<=22)){
        res.status(404).json({"code":714});
        return false;
    }else {
        return true;
    }
}

module.exports = {
    smsHandler,
    checkLimitTime,
    filterRequest,
    checkToken,
    loginInfoCheck,
    registerInfoCheck
    , fillDataBase
    , addRoleInfoCheck
    , base64_decode
    , base64_encode
    , isThisArrayEmpty
    , response

};
