const {cities, sellerType, productGroups, products, unit, car} = require('../../sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const { Seller , customer , sequelize , sellerPhoneNumber , transportation ,sellerWareHouse , sellerOperator} = require('../../sequelize');
const {loggererror , loggerinfo ,colors, PHONENUMBER_REGEX, PASSWORD_REGEX, USERNAME_REGEX , JWT_SECRET} = require('./myVars');
var jwt = require('jwt-simple');


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

            id: value.id,
            name: value.name
        }
    ).catch(err => {
        console.log(err)
    });
}

function insertTypes(value, index, array) {
    sellerType.create(
        {

            id: value.id,
            type: value.type
        }
    ).catch(err => {
        console.log(err)
    });
}

function insertProductsGroup(value, index, array) {
    productGroups.create(
        {

            id: value.id,
            name: value.name,
            parentid: value.parentid
        }
    ).catch(err => {
        console.log(err)
    });
}

function insertProducts(value, index, array) {
    products.create(
        {

            id: value.id,
            name: value.name,
            groupid: value.groupid
        }
    ).catch(err => {
        console.log(err)
    });
}

function insertUnits(value, index, array) {
    unit.create(
        {
            id: value.id,
            unit_name: value.unit_name
        }
    ).catch(err => {
        console.log(err)
    });
}

function insertCarModels(value, index, array) {
    car.create(
        {
            id: value.id,
            name: value.name,
            parentid: value.parentid
        }
    ).catch(err => {
        console.log(err)
    });
}

function fillDataBase() {

    var city = [
        {id: 1, name: "آذربایجان شرقی"},
        {id: 2, name: "اردبیل"},
        {id: 3, name: "اصفهان"},
        {id: 4, name: "البرز"},
        {id: 5, name: "ایلام"},
        {id: 6, name: "بوشهر"},
        {id: 7, name: "تهران"},
        {id: 8, name: "چهارمحال و بختیاری"},
        {id: 9, name: "خراسان جنوبی"},
        {id: 10, name: "خراسان رضوی"},
        {id: 11, name: "خراسان شمالی"},
        {id: 12, name: "خوزستان"},
        {id: 13, name: "زنجان"},
        {id: 14, name: "سمنان"},
        {id: 15, name: "سیستان و بلوچستان"},
        {id: 16, name: "فارس"},
        {id: 17, name: "قزوین"},
        {id: 18, name: "قم"},
        {id: 19, name: "کردستان"},
        {id: 20, name: "کرمان"},
        {id: 21, name: "کرمانشاه"},
        {id: 22, name: "کهگیلویه و بویراحمد"},
        {id: 23, name: "گلستان"},
        {id: 24, name: "گیلان"},
        {id: 25, name: "لرستان"},
        {id: 26, name: "مازندران"},
        {id: 27, name: "مرکزی"},
        {id: 28, name: "هرمزگان"},
        {id: 29, name: "همدان"},
        {id: 30, name: "یزد"},
        {id: 31, name: "آذربایجان شرقی"}


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
        {id: 1, type: "شرکت اصلی"},
        {id: 2, type: "نماینده فروش"}

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
        {id: 1, name: "نیسان", parentid: null},
        {id: 2, name: "پیکان وانت", parentid: null},
        {id: 3, name: "نیسان یخچال دار", parentid: null},
        {id: 4, name: "پراید وانت", parentid: null},
        {id: 5, name: "پرشیا وانت", parentid: null},
        {id: 6, name: "کامیون یخچال دار", parentid: null}
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
        {id: 1, unit_name: "گرم"},
        {id: 2, unit_name: "کیلو گرم"},
        {id: 3, unit_name: "تن"},
        {id: 4, unit_name: "پوند"},
        {id: 5, unit_name: "میکرو گرم"},
        {id: 6, unit_name: "اونس"},
        {id: 7, unit_name: "مثقال"},
        {id: 8, unit_name: "سیر"},
        {id: 9, unit_name: "چارک"},

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

        {id: 2, name: "گوساله", parentid: null},

        {id: 23, name: "گوسفند", parentid: null},

        {id: 52, name: "مرغ", parentid: null},

        {id: 96, name: "ماهی", parentid: null},

        {id: 108, name: "منجمد وارداتی", parentid: null},

        {id: 109, name: "گوسفند وارداتی", parentid: 108},
        {id: 110, name: "گوساله وارداتی", parentid: 108},
        {id: 111, name: "ران", parentid: 109},
        {id: 112, name: "سردست", parentid: 109},
        {id: 113, name: "گردن", parentid: 109},
        {id: 114, name: "راسته با استخوان", parentid: 109},
        {id: 115, name: "راسته شاندیزی", parentid: 109},
        {id: 116, name: "گردن", parentid: 109},
        {id: 117, name: "قلوه گاه گوسفند", parentid: 109},
        {id: 118, name: "قلوه گاه با استخوان گوسفند", parentid: 109},
        {id: 119, name: "ماهیچه", parentid: 109},


        {id: 126, name: "ران", parentid: 110},
        {id: 127, name: "سردست", parentid: 110},
        {id: 128, name: "گردن", parentid: 110},
        {id: 129, name: "بغل ران", parentid: 110},
        {id: 130, name: "سفید ران", parentid: 110},
        {id: 131, name: "مغز ران", parentid: 110},
        {id: 132, name: "راسته", parentid: 110},
        {id: 133, name: "فیله", parentid: 110},
        {id: 134, name: "قلوه گاه", parentid: 110},


        {id: 150, name: "فراورده های گوشتی", parentid: null}


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
        {id: 3, name: "قلوه گاه گوساله", groupid: 2},
        {id: 4, name: "خرده راسته گوساله", groupid: 2},
        {id: 5, name: "گردن گوساله", groupid: 2},
        {id: 6, name: "فیله گوساله", groupid: 2},
        {id: 7, name: "مغز راسته گوساله", groupid: 2},
        {id: 8, name: "راسته با استخوان گوساله", groupid: 2},
        {id: 9, name: "دنبالیچه گوساله", groupid: 2},
        {id: 10, name: "چربی گوساله", groupid: 2},
        {id: 11, name: "ران ممتاز گوساله جوان", groupid: 2},
        {id: 12, name: "سردست ممتاز گوساله جوان", groupid: 2},
        {id: 13, name: "ران ممتاز ماده گاو", groupid: 2},
        {id: 14, name: "سردست ممتاز ماده گاو", groupid: 2},
        {id: 15, name: "ماهیچه گوساله", groupid: 2},
        {id: 16, name: "ران با استخوان گوساله جوان", groupid: 2},
        {id: 17, name: "سردست با استخوان گوساله جوان", groupid: 2},
        {id: 18, name: "ران با استخوان ماده گاو", groupid: 2},
        {id: 19, name: "سردست با استخوان ماده گاو ", groupid: 2},
        {id: 20, name: "چرخکرده مخلوط", groupid: 2},
        {id: 21, name: "چرخکرده گوساله", groupid: 2},
        {id: 22, name: "خرده گوساله", groupid: 2},


        {id: 24, name: "خرده گوسفند", groupid: 23},
        {id: 25, name: "قلوه گاه گوسفند", groupid: 23},
        {id: 26, name: "قلوه گاه با استخوان گوسفند", groupid: 23},
        {id: 27, name: "خرده قلوه گاه گوسفند", groupid: 23},
        {id: 28, name: "خرده راسته گوسفند", groupid: 23},
        {id: 29, name: "گردن گوسفند", groupid: 23},
        {id: 30, name: "گردن شقه ای گوسفند", groupid: 23},
        {id: 31, name: "لاشه بدون دنبه گوسفند", groupid: 23},
        {id: 32, name: "لاشه گوسفند با کله", groupid: 23},
        {id: 33, name: "دنبه گوسفند", groupid: 23},
        {id: 34, name: "ران ممتاز گوسفند", groupid: 23},
        {id: 35, name: "ران بدون استخوان گوسفند", groupid: 23},
        {id: 36, name: "سردست ممتاز گوسفند", groupid: 23},
        {id: 37, name: "سردست بدون استخوان گوسفند", groupid: 23},
        {id: 38, name: "راسته با استخوان گوسفند", groupid: 23},
        {id: 39, name: "راسته بدون استخوان گوسفند", groupid: 23},
        {id: 40, name: "مغز راسته گوسفند ( دو تکه)", groupid: 23},
        {id: 41, name: "مغز راسته گوسفند ( سه تکه)", groupid: 23},
        {id: 42, name: "فیله ممتاز گوسفند", groupid: 23},
        {id: 43, name: "راسته شاندیزی گوسفند", groupid: 23},
        {id: 44, name: "شیشلیک بدون مواد گوسفند", groupid: 23},
        {id: 45, name: "شیشلیک با مواد گوسفند", groupid: 23},
        {id: 46, name: "ماهیچه بدون گل گوسفند", groupid: 23},
        {id: 47, name: "ماهیچه با گل گوسفند", groupid: 23},
        {id: 48, name: "ماهیچه ران گوسفند", groupid: 23},
        {id: 49, name: "ماهیچه برش مشهدی گوسفند", groupid: 23},
        {id: 50, name: "ران و سردست بشقابی گوسفند", groupid: 23},
        {id: 51, name: "ماهیچه بشقابی گوسفند", groupid: 23},


        {id: 53, name: "ران بی پوست بدون کمر  300 گرمی", groupid: 52},
        {id: 54, name: "ران بی پوست بدون کمر  350 گرمی", groupid: 52},
        {id: 55, name: "ران بی پوست بدون کمر  400 گرمی", groupid: 52},
        {id: 56, name: "ران با پوست بدون کمر  300 گرمی", groupid: 52},
        {id: 57, name: "ران با پوست بدون کم  350 گرمی", groupid: 52},
        {id: 58, name: "ران با پوست بدون کمر  400 گرمی", groupid: 52},
        {id: 59, name: "سینه با استخوان بدون پوست  300 گرمی", groupid: 52},
        {id: 60, name: "سینه با استخوان بدون پوست  350 گرمی", groupid: 52},
        {id: 61, name: "سینه با استخوان بدون پوست  400 گرمی", groupid: 52},
        {id: 62, name: "سینه با استخوان با پوست  300 گرمی", groupid: 52},
        {id: 63, name: "سینه با استخوان با پوست  350 گرمی", groupid: 52},
        {id: 64, name: "سینه با استخوان با پوست  400 گرمی", groupid: 52},
        {id: 65, name: "بال با نوک", groupid: 52},
        {id: 66, name: "بال بی نوک", groupid: 52},
        {id: 67, name: "بازو با پوست", groupid: 52},
        {id: 68, name: "بازو بی پوست", groupid: 52},
        {id: 69, name: "بال و بازو سه تکه", groupid: 52},
        {id: 70, name: "بال و بازو دو تکه", groupid: 52},
        {id: 71, name: "گردن با پوست", groupid: 52},
        {id: 72, name: "گردن بی پوست", groupid: 52},
        {id: 73, name: "فیله", groupid: 52},
        {id: 74, name: "مرغ کامل شکم خالی 1200 گرمی", groupid: 52},
        {id: 75, name: "مرغ کامل شکم خالی 1300 گرمی", groupid: 52},
        {id: 76, name: "مرغ کامل شکم خالی 1400 گرمی", groupid: 52},
        {id: 77, name: "مرغ کامل شکم خالی 1500 گرمی", groupid: 52},
        {id: 78, name: "مرغ کامل شکم خالی 1600 گرمی", groupid: 52},
        {id: 79, name: "مرغ کامل شکم خالی 1700 گرمی", groupid: 52},
        {id: 80, name: "مرغ کامل شکم خالی 1800 گرمی", groupid: 52},
        {id: 81, name: "مرغ کامل شکم خالی 1900 گرمی", groupid: 52},
        {id: 82, name: "مرغ کامل شکم خالی 2000 گرمی", groupid: 52},
        {id: 83, name: "مرغ کامل شکم خالی 2100 گرمی", groupid: 52},
        {id: 84, name: "مرغ کامل شکم خالی 2200 گرمی", groupid: 52},
        {id: 85, name: "مرغ کامل شکم خالی درشت", groupid: 52},
        {id: 86, name: "سینه بدون کتف ممتاز", groupid: 52},
        {id: 87, name: "سینه بدون کتف معمولی", groupid: 52},
        {id: 88, name: "سینه با کتف ممتاز", groupid: 52},
        {id: 89, name: "سینه با کتف معمولی", groupid: 52},
        {id: 90, name: "اکبر جوجه 600 گرمی", groupid: 52},
        {id: 91, name: "اکبر جوجه 1000 گرمی", groupid: 52},
        {id: 92, name: "اکبر جوجه 1100 گرمی", groupid: 52},
        {id: 93, name: "خرده مرغ", groupid: 52},
        {id: 94, name: "گوشت گردن", groupid: 52},
        {id: 95, name: "خمیر مرغ", groupid: 52},

        {id: 97, name: "قزل آلا 200 گرمی", groupid: 96},
        {id: 98, name: "قزل آلا 2520 گرمی", groupid: 96},
        {id: 99, name: "قزل آلا 300 گرمی", groupid: 96},
        {id: 100, name: "قزل آلا 350 گرمی", groupid: 96},
        {id: 101, name: "قزل آلا 400 گرمی", groupid: 96},
        {id: 102, name: "قزل آلا 450 گرمی", groupid: 96},
        {id: 103, name: "قزل آلا 500 گرمی", groupid: 96},
        {id: 104, name: "تیلاپیا M", groupid: 96},
        {id: 105, name: "تیلاپیا S", groupid: 96},
        {id: 106, name: "سالمون", groupid: 96},
        {id: 107, name: "میگو", groupid: 96},


        {id: 120, name: "مغول", groupid: 111},
        {id: 121, name: "استرالیا", groupid: 111},
        {id: 122, name: "قزاقستان", groupid: 111},
        {id: 123, name: "نیوزلند", groupid: 111},
        {id: 124, name: "ارمنستان", groupid: 111},
        {id: 125, name: "گرجستان", groupid: 111},


        {id: 135, name: "مینروا", groupid: 126},
        {id: 136, name: "جی جی", groupid: 126},
        {id: 137, name: "جی جی زد", groupid: 126},
        {id: 138, name: "آگرا", groupid: 126},
        {id: 139, name: "استرلا", groupid: 126},
        {id: 140, name: "آسترا", groupid: 126},
        {id: 141, name: "فری بوی", groupid: 126},
        {id: 142, name: "فریگو", groupid: 126},
        {id: 143, name: "مارفریگ", groupid: 126},
        {id: 144, name: "بیف کلاب", groupid: 126},
        {id: 145, name: "آنجلو", groupid: 126},
        {id: 146, name: "پالاتاری", groupid: 126},
        {id: 147, name: "کیومیت", groupid: 126},
        {id: 148, name: "متابوی", groupid: 126},
        {id: 149, name: "بیگ بوی", groupid: 126},


        {id: 151, name: "سوسیس", groupid: 150},
        {id: 152, name: "کالباس", groupid: 150},
        {id: 153, name: "همبرگر و کباب لقمه", groupid: 150},
        {id: 154, name: "غذاهای آماده", groupid: 150}
    ];
    products.findAll().then(products => {
        if (products[0] === undefined) {
            productsvar.forEach(insertProducts);
            console.log(colors.bg.Green, "import  products  demo data done successfuly", colors.Reset);
        } else {
            console.log(colors.bg.Red, "import  products  demo data canceled .", colors.Reset);
        }
    });


}

function isThisArrayEmpty(array) {
    return array[0] === undefined;

}

function checkPhone(req, res) {
    if (req.body.phone_number != null) {
        var pattern = new RegExp(PHONENUMBER_REGEX);
        var status = pattern.test(req.body.phone_number);
        if (!status) {
            res.status(400).json({message: "phone number is not in valid form "});
            return false;
        }
        return true;


    }

}

function checkPassword(req, res) {
    if (req.body.password != null) {
        var pattern = new RegExp(PASSWORD_REGEX);
        var status = pattern.test(req.body.password);
        if (!status) {
            res.status(400).json({message: "password valid form is The string must be eight characters or longer"});
            return false;
        }
        return true;


    }

}

function checkUserName(req, res) {
    if (req.body.username != null) {
        var pattern = new RegExp(USERNAME_REGEX);
        var status = pattern.test(req.body.password);
        if (!status) {
            res.status(400).json({message: "username is not valid "});
            return false;
        }
        return true;


    }

}

function registerInfoCheck(req, res, role) {
    switch (role) {
        case "customer":
            if (req.body.birth_date == null ||
                req.body.company_name == null ||
                req.body.family_name == null ||
                req.body.name == null ||
                req.body.password == null ||
                req.body.phone_number == null ||
                req.body.registration_date_time == null ||
                req.body.theme == null ||
                req.body.username == null ||
                req.body.cityid == null
            ) {
                res.status(400).json({message: "request body does not have all neccesery variables"});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));
            break;

        case "seller":
            if (req.body.company_name == null ||
                req.body.complete_address_description == null ||
                req.body.google_map_address_link == null ||
                req.body.owner_family_name == null ||
                req.body.owner_name == null ||
                req.body.owner_phone_number == null ||
                req.body.username == null ||
                req.body.password == null ||
                req.body.company_address_cityid == null ||
                req.body.phone_numberid == null) {
                res.status(400).json({message: "request body does not have all neccesery variables"});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));
            break;
    }


}

function loginInfoCheck(req, res, role) {
    switch (role) {
        case "customer":
            if (
                req.body.password == null || (req.body.phone_number == null && req.body.username == null)

            ) {
                res.status(400).json({message: "request body does not have all neccesery variables"});
                return false;
            } else {
                if (req.body.phone_number != null) {
                    checkPhone(req, res);
                }
                checkPassword(req, res)
            }
            ;
            break;
        case "seller":
            if (
                req.body.password == null || (req.body.phone_number == null && req.body.username == null)

            ) {
                res.status(400).json({message: "request body does not have all neccesery variables"});
                return false;
            } else {
                if (req.body.phone_number != null) {
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
            if (req.body.company_name == null ||
                req.body.complete_address_description == null ||
                req.body.google_map_address_link == null ||
                req.body.owner_family_name == null ||
                req.body.owner_name == null ||
                req.body.owner_phone_number == null ||
                req.body.username == null ||
                req.body.password == null ||
                req.body.company_address_cityid == null ||
                req.body.phone_numberid == null) {
                res.status(400).json({message: "request body does not have all neccesery variables"});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));
            break;
        case "transportation":
            if (req.body.air_conditionar == null ||
                req.body.birthdate == null ||
                req.body.color == null ||
                req.body.description == null ||
                req.body.family_name == null ||
                req.body.name == null ||
                req.body.password == null ||
                req.body.pelak_number == null ||
                req.body.phone_number == null ||
                req.body.username == null ||
                req.body.modelid == null ||
                req.body.ware_houseid == null
            ) {
                res.status(400).json({message: "request body does not have all neccesery variables"});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

            break;
        case "wareHouse":

            if (req.body.agent_family_name == null ||
                req.body.agent_name == null ||
                req.body.birthdate == null ||
                req.body.cell_phone_number == null ||
                req.body.password == null ||
                req.body.phone_number == null ||
                req.body.username == null ||
                req.body.ware_house_complete_address_description == null ||
                req.body.ware_house_google_map_address_link == null ||
                req.body.ware_house_address_cityidIndex == null ||
                req.body.selleridIndex == null) {
                res.status(400).json({message: "request body does not have all neccesery variables"});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

            break;
        case "operator" :
            if (req.body.birthdate == null ||
                req.body.family_name == null ||
                req.body.name == null ||
                req.body.password == null ||
                req.body.phone_number == null ||
                req.body.username == null ||
                req.body.selleridIndex == null
            ) {
                res.status(400).json({message: "request body does not have all neccesery variables"});
                return false;
            } else return !(!checkUserName(req, res) || !checkPhone(req, res) || !checkPassword(req, res));

            break;

        default :
            return res.status(404).json({"message": "invalid role type"});
    }


}

  function checkToken(req, res, role ) {

        if (req.headers['token'] != null) {
            try{
                var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
                if (decodedJWT.password == null || (decodedJWT.username  && decodedJWT.phone_number )) {
                     res.status(400).json({message: "expired token"});
                     return false

                }else {

                    var searchQuery ;
                    if (decodedJWT.username != null) {
                        searchQuery = {
                            where: {
                                username: decodedJWT.username, password: decodedJWT.password
                            }
                        };
                    }else {
                        searchQuery = {
                            where: {
                                owner_phone_number: decodedJWT.owner_phone_number, password: decodedJWT.password
                            }
                        };
                    }
                   return searchQuery;


                }




            }  catch(err) {
                loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                  res.status(400).json({"message":"expired token"});
                  return false;

            }



        } else {
              res.status(400).json({"message": "token not found in header"});
              return false;
        }

}


module.exports = {
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
