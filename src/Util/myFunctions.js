const {cities, sellerType, productGroups, products, unit, car} = require('../../sequelize');
const { orderProduct ,application } = require('../../sequelize');
const {loggererror  ,colors, PHONENUMBER_REGEX, PASSWORD_REGEX, USERNAME_REGEX , JWT_SECRET} = require('./myVars');
var jwt = require('jwt-simple');
var Kavenegar = require('kavenegar');
var path = require('path');
const fs = require("fs");

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
    return  Buffer.from(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap =  Buffer.from(base64str, 'base64');
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

        {ID: 500, Name: "تازه", ParentID: null},



        {ID: 2, Name: "گوساله", ParentID: 500},

        {ID: 23, Name: "گوسفند", ParentID: 500},

        {ID: 52, Name: "مرغ", ParentID: 500},

        {ID: 96, Name: "ماهی", ParentID: 500},

        {ID: 108, Name: "منجمد وارداتی", ParentID: 500},

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


        {ID: 150, Name: "فراورده های گوشتی", ParentID: 500},

        {ID: 97, Name: "قزل آلا", ParentID: 96},
        {ID: 90, Name: "اکبر جوجه", ParentID: 52},
        {ID: 151, Name: "ران بی پوست بدون کمر", ParentID: 52},
        {ID: 152, Name: "ران با پوست بدون کمر", ParentID: 52},
        {ID: 153, Name: "سینه با استخوان بدون پوست", ParentID: 52},
        {ID: 154, Name: "سینه با استخوان با پوست", ParentID: 52},
        {ID: 155, Name: "مرغ کامل شکم خالی", ParentID: 52},








        {ID: 600, Name: "منجمد", ParentID: null},



        {ID: 20, Name: "گوساله", ParentID: 600},

        {ID: 230, Name: "گوسفند", ParentID: 600},

        {ID: 520, Name: "مرغ", ParentID: 600},

        {ID: 960, Name: "ماهی", ParentID: 600},

        {ID: 1080, Name: "منجمد وارداتی", ParentID: 600},

        {ID: 1090, Name: "گوسفند وارداتی", ParentID: 1080},
        {ID: 1100, Name: "گوساله وارداتی", ParentID: 1080},
        {ID: 1110, Name: "ران", ParentID: 1090},
        {ID: 1120, Name: "سردست", ParentID: 1090},
        {ID: 1130, Name: "گردن", ParentID: 1090},
        {ID: 1140, Name: "راسته با استخوان", ParentID: 1090},
        {ID: 1150, Name: "راسته شاندیزی", ParentID: 1090},
        {ID: 1160, Name: "گردن", ParentID: 1090},
        {ID: 1170, Name: "قلوه گاه گوسفند", ParentID: 1090},
        {ID: 1180, Name: "قلوه گاه با استخوان گوسفند", ParentID: 1090},
        {ID: 1190, Name: "ماهیچه", ParentID: 1090},


        {ID: 1260, Name: "ران", ParentID: 1100},
        {ID: 1270, Name: "سردست", ParentID: 1100},
        {ID: 1280, Name: "گردن", ParentID: 1100},
        {ID: 1290, Name: "بغل ران", ParentID: 1100},
        {ID: 1300, Name: "سفید ران", ParentID: 1100},
        {ID: 1310, Name: "مغز ران", ParentID: 1100},
        {ID: 1320, Name: "راسته", ParentID: 1100},
        {ID: 1330, Name: "فیله", ParentID: 1100},
        {ID: 1340, Name: "قلوه گاه", ParentID: 1100},


        {ID: 1500, Name: "فراورده های گوشتی", ParentID: 600},

        {ID: 970, Name: "قزل آلا", ParentID: 960},
        {ID: 900, Name: "اکبر جوجه", ParentID: 520},
        {ID: 1510, Name: "ران بی پوست بدون کمر", ParentID: 520},
        {ID: 1520, Name: "ران با پوست بدون کمر", ParentID: 520},
        {ID: 1530, Name: "سینه با استخوان بدون پوست", ParentID: 520},
        {ID: 1540, Name: "سینه با استخوان با پوست", ParentID: 520},
        {ID: 1550, Name: "مرغ کامل شکم خالی", ParentID: 520},







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


        {ID: 53, Name: "300 گرمی", GroupID: 151},
        {ID: 54, Name: "350 گرمی", GroupID: 151},
        {ID: 55, Name: "400 گرمی", GroupID: 151},

        {ID: 56, Name: "300 گرمی", GroupID: 152},
        {ID: 57, Name: "350 گرمی", GroupID: 152},
        {ID: 58, Name: "400 گرمی", GroupID: 152},

        {ID: 59, Name: "300 گرمی", GroupID: 153},
        {ID: 60, Name: "350 گرمی", GroupID: 153},
        {ID: 61, Name: "400 گرمی", GroupID: 153},

        {ID: 62, Name: "300 گرمی", GroupID: 154},
        {ID: 63, Name: "350 گرمی", GroupID: 154},
        {ID: 64, Name: "400 گرمی", GroupID: 154},

        {ID: 65, Name: "بال با نوک", GroupID: 52},
        {ID: 66, Name: "بال بی نوک", GroupID: 52},
        {ID: 67, Name: "بازو با پوست", GroupID: 52},
        {ID: 68, Name: "بازو بی پوست", GroupID: 52},
        {ID: 69, Name: "بال و بازو سه تکه", GroupID: 52},
        {ID: 70, Name: "بال و بازو دو تکه", GroupID: 52},
        {ID: 71, Name: "گردن با پوست", GroupID: 52},
        {ID: 72, Name: "گردن بی پوست", GroupID: 52},
        {ID: 73, Name: "فیله", GroupID: 52},

        {ID: 74, Name: "1200 گرمی", GroupID: 155},
        {ID: 75, Name: "1300 گرمی", GroupID: 155},
        {ID: 76, Name: "1400 گرمی", GroupID: 155},
        {ID: 77, Name: "1500 گرمی", GroupID: 155},
        {ID: 78, Name: "1600 گرمی", GroupID: 155},
        {ID: 79, Name: "1700 گرمی", GroupID: 155},
        {ID: 80, Name: "1800 گرمی", GroupID: 155},
        {ID: 81, Name: " 1900 گرمی", GroupID: 155},
        {ID: 82, Name: " 2000 گرمی", GroupID: 155},
        {ID: 83, Name: " 2100 گرمی", GroupID: 155},
        {ID: 84, Name: " 2200 گرمی", GroupID: 155},



        {ID: 85, Name: "مرغ کامل شکم خالی درشت", GroupID: 52},
        {ID: 86, Name: "سینه بدون کتف ممتاز", GroupID: 52},
        {ID: 87, Name: "سینه بدون کتف معمولی", GroupID: 52},
        {ID: 88, Name: "سینه با کتف ممتاز", GroupID: 52},
        {ID: 89, Name: "سینه با کتف معمولی", GroupID: 52},


        {ID: 91, Name: "600 گرمی", GroupID: 90},
        {ID: 92, Name: "1100 گرمی", GroupID: 90},
        {ID: 156, Name: "1100 گرمی", GroupID: 90},



        {ID: 93, Name: "خرده مرغ", GroupID: 52},
        {ID: 94, Name: "گوشت گردن", GroupID: 52},
        {ID: 95, Name: "خمیر مرغ", GroupID: 52},


        {ID: 98, Name: "200 گرمی", GroupID: 97},
        {ID: 99, Name: "250 گرمی", GroupID: 97},
        {ID: 100, Name: "300 گرمی", GroupID: 97},
        {ID: 101, Name: "350 گرمی", GroupID: 97},
        {ID: 102, Name: "400 گرمی", GroupID: 97},
        {ID: 103, Name: "450 گرمی", GroupID: 97},
        {ID: 155, Name: "500 گرمی", GroupID: 97},


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
        {ID: 154, Name: "غذاهای آماده", GroupID: 150},
























        {ID: 300, Name: "قلوه گاه گوساله", GroupID: 20},
        {ID: 400, Name: "خرده راسته گوساله", GroupID: 20},
        {ID: 500, Name: "گردن گوساله", GroupID: 20},
        {ID: 600, Name: "فیله گوساله", GroupID: 20},
        {ID: 700, Name: "مغز راسته گوساله", GroupID: 20},
        {ID: 800, Name: "راسته با استخوان گوساله", GroupID: 20},
        {ID: 900, Name: "دنبالیچه گوساله", GroupID: 20},
        {ID: 1000, Name: "چربی گوساله", GroupID: 20},
        {ID: 1100, Name: "ران ممتاز گوساله جوان", GroupID: 20},
        {ID: 1200, Name: "سردست ممتاز گوساله جوان", GroupID: 20},
        {ID: 1300, Name: "ران ممتاز ماده گاو", GroupID: 20},
        {ID: 1400, Name: "سردست ممتاز ماده گاو", GroupID: 20},
        {ID: 1500, Name: "ماهیچه گوساله", GroupID: 20},
        {ID: 1600, Name: "ران با استخوان گوساله جوان", GroupID: 20},
        {ID: 1700, Name: "سردست با استخوان گوساله جوان", GroupID: 20},
        {ID: 1800, Name: "ران با استخوان ماده گاو", GroupID: 20},
        {ID: 1900, Name: "سردست با استخوان ماده گاو ", GroupID: 20},
        {ID: 2000, Name: "چرخکرده مخلوط", GroupID: 20},
        {ID: 2100, Name: "چرخکرده گوساله", GroupID: 20},
        {ID: 2200, Name: "خرده گوساله", GroupID: 20},


        {ID: 2400, Name: "خرده گوسفند", GroupID: 230},
        {ID: 2500, Name: "قلوه گاه گوسفند", GroupID: 230},
        {ID: 2600, Name: "قلوه گاه با استخوان گوسفند", GroupID: 230},
        {ID: 2700, Name: "خرده قلوه گاه گوسفند", GroupID: 230},
        {ID: 2800, Name: "خرده راسته گوسفند", GroupID: 230},
        {ID: 2900, Name: "گردن گوسفند", GroupID: 230},
        {ID: 3000, Name: "گردن شقه ای گوسفند", GroupID: 230},
        {ID: 3100, Name: "لاشه بدون دنبه گوسفند", GroupID: 230},
        {ID: 3200, Name: "لاشه گوسفند با کله", GroupID: 230},
        {ID: 3300, Name: "دنبه گوسفند", GroupID: 230},
        {ID: 3400, Name: "ران ممتاز گوسفند", GroupID: 230},
        {ID: 3500, Name: "ران بدون استخوان گوسفند", GroupID: 230},
        {ID: 3600, Name: "سردست ممتاز گوسفند", GroupID: 230},
        {ID: 3700, Name: "سردست بدون استخوان گوسفند", GroupID: 230},
        {ID: 3800, Name: "راسته با استخوان گوسفند", GroupID: 230},
        {ID: 3900, Name: "راسته بدون استخوان گوسفند", GroupID: 230},
        {ID: 4000, Name: "مغز راسته گوسفند ( دو تکه)", GroupID: 230},
        {ID: 4100, Name: "مغز راسته گوسفند ( سه تکه)", GroupID: 230},
        {ID: 4200, Name: "فیله ممتاز گوسفند", GroupID: 230},
        {ID: 4300, Name: "راسته شاندیزی گوسفند", GroupID: 230},
        {ID: 4400, Name: "شیشلیک بدون مواد گوسفند", GroupID: 230},
        {ID: 4500, Name: "شیشلیک با مواد گوسفند", GroupID: 230},
        {ID: 4600, Name: "ماهیچه بدون گل گوسفند", GroupID: 230},
        {ID: 4700, Name: "ماهیچه با گل گوسفند", GroupID: 230},
        {ID: 4800, Name: "ماهیچه ران گوسفند", GroupID: 230},
        {ID: 4900, Name: "ماهیچه برش مشهدی گوسفند", GroupID: 230},
        {ID: 5000, Name: "ران و سردست بشقابی گوسفند", GroupID: 230},
        {ID: 5100, Name: "ماهیچه بشقابی گوسفند", GroupID: 230},


        {ID: 5300, Name: "300 گرمی", GroupID: 1510},
        {ID: 5400, Name: "350 گرمی", GroupID: 1510},
        {ID: 5500, Name: "400 گرمی", GroupID: 1510},

        {ID: 5600, Name: "300 گرمی", GroupID: 1520},
        {ID: 5700, Name: "350 گرمی", GroupID: 1520},
        {ID: 5800, Name: "400 گرمی", GroupID: 1520},

        {ID: 5900, Name: "300 گرمی", GroupID: 1530},
        {ID: 6000, Name: "350 گرمی", GroupID: 1530},
        {ID: 6100, Name: "400 گرمی", GroupID: 1530},

        {ID: 6200, Name: "300 گرمی", GroupID: 1540},
        {ID: 6300, Name: "350 گرمی", GroupID: 1540},
        {ID: 6400, Name: "400 گرمی", GroupID: 1540},

        {ID: 6500, Name: "بال با نوک", GroupID: 520},
        {ID: 6600, Name: "بال بی نوک", GroupID: 520},
        {ID: 6700, Name: "بازو با پوست", GroupID: 520},
        {ID: 6800, Name: "بازو بی پوست", GroupID: 520},
        {ID: 6900, Name: "بال و بازو سه تکه", GroupID: 520},
        {ID: 7000, Name: "بال و بازو دو تکه", GroupID: 520},
        {ID: 7100, Name: "گردن با پوست", GroupID: 520},
        {ID: 7200, Name: "گردن بی پوست", GroupID: 520},
        {ID: 7300, Name: "فیله", GroupID: 520},

        {ID: 7400, Name: "1200 گرمی", GroupID: 1550},
        {ID: 7500, Name: "1300 گرمی", GroupID: 1550},
        {ID: 7600, Name: "1400 گرمی", GroupID: 1550},
        {ID: 7700, Name: "1500 گرمی", GroupID: 1550},
        {ID: 7800, Name: "1600 گرمی", GroupID: 1550},
        {ID: 7900, Name: "1700 گرمی", GroupID: 1550},
        {ID: 8000, Name: "1800 گرمی", GroupID: 1550},
        {ID: 8100, Name: " 1900 گرمی", GroupID: 1550},
        {ID: 8200, Name: " 2000 گرمی", GroupID: 1550},
        {ID: 8300, Name: " 2100 گرمی", GroupID: 1550},
        {ID: 8400, Name: " 2200 گرمی", GroupID: 1550},



        {ID: 8500, Name: "مرغ کامل شکم خالی درشت", GroupID: 520},
        {ID: 8600, Name: "سینه بدون کتف ممتاز", GroupID: 520},
        {ID: 8700, Name: "سینه بدون کتف معمولی", GroupID: 520},
        {ID: 8800, Name: "سینه با کتف ممتاز", GroupID: 520},
        {ID: 8900, Name: "سینه با کتف معمولی", GroupID: 520},


        {ID: 9300, Name: "خرده مرغ", GroupID: 520},
        {ID: 9400, Name: "گوشت گردن", GroupID: 520},
        {ID: 9500, Name: "خمیر مرغ", GroupID: 520},



        {ID: 9100, Name: "600 گرمی", GroupID: 900},
        {ID: 9200, Name: "1100 گرمی", GroupID: 900},
        {ID: 15600, Name: "1100 گرمی", GroupID: 900},



        {ID: 9800, Name: "200 گرمی", GroupID: 970},
        {ID: 9900, Name: "250 گرمی", GroupID: 970},
        {ID: 10000, Name: "300 گرمی", GroupID: 970},
        {ID: 10100, Name: "350 گرمی", GroupID: 970},
        {ID: 10200, Name: "400 گرمی", GroupID: 970},
        {ID: 10300, Name: "450 گرمی", GroupID: 970},
        {ID: 15500, Name: "500 گرمی", GroupID: 970},


        {ID: 10400, Name: "تیلاپیا M", GroupID: 960},
        {ID: 10500, Name: "تیلاپیا S", GroupID: 960},
        {ID: 10600, Name: "سالمون", GroupID: 960},
        {ID: 10700, Name: "میگو", GroupID: 960},


        {ID: 12000, Name: "مغول", GroupID: 1110},
        {ID: 12100, Name: "استرالیا", GroupID: 1110},
        {ID: 12200, Name: "قزاقستان", GroupID: 1110},
        {ID: 12300, Name: "نیوزلند", GroupID: 1110},
        {ID: 12400, Name: "ارمنستان", GroupID: 1110},
        {ID: 12500, Name: "گرجستان", GroupID: 1110},


        {ID: 13500, Name: "مینروا", GroupID: 1260},
        {ID: 13600, Name: "جی جی", GroupID: 1260},
        {ID: 13700, Name: "جی جی زد", GroupID: 1260},
        {ID: 13800, Name: "آگرا", GroupID: 1260},
        {ID: 13900, Name: "استرلا", GroupID: 1260},
        {ID: 14000, Name: "آسترا", GroupID: 1260},
        {ID: 14100, Name: "فری بوی", GroupID: 1260},
        {ID: 14200, Name: "فریگو", GroupID: 1260},
        {ID: 14300, Name: "مارفریگ", GroupID: 1260},
        {ID: 14400, Name: "بیف کلاب", GroupID: 1260},
        {ID: 14500, Name: "آنجلو", GroupID: 1260},
        {ID: 14600, Name: "پالاتاری", GroupID: 1260},
        {ID: 14700, Name: "کیومیت", GroupID: 1260},
        {ID: 14800, Name: "متابوی", GroupID: 1260},
        {ID: 14900, Name: "بیگ بوی", GroupID: 1260},


        {ID: 15100, Name: "سوسیس", GroupID: 1500},
        {ID: 15200, Name: "کالباس", GroupID: 1500},
        {ID: 15300, Name: "همبرگر و کباب لقمه", GroupID: 1500},
        {ID: 15400, Name: "غذاهای آماده", GroupID: 1500}


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
        }else {
            return true;
        }

    }else return true;

}

function checkPassword(req, res) {
    if (req.body.Password != null) {
        var pattern = new RegExp(PASSWORD_REGEX);
        var status = pattern.test(req.body.Password);
        if (!status) {
            res.status(400).json({"code": 712});
            return false;
        }else {
            return true;
        }


    }else return true;

}

function checkUserName(req, res) {
    if (req.body.Username != null) {
        var pattern = new RegExp(USERNAME_REGEX);
        var status = pattern.test(req.body.Username);
        if (!status) {
            res.status(400).json({"code": 713});
            return false;
        }else {
            return true;
        }

    }else return true;

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

function loginInfoCheck(req, res) {
    if (
        req.body.Password == null || (req.body.PhoneNumber == null && req.body.Username == null)

    ) {
        res.status(400).json({"code": 703});
        return false;
    } else {
        if (checkPassword(req, res)){
            if (req.body.PhoneNumber != null) {
                return checkPhone(req, res);
            }else {
                return checkUserName(req, res);
            }
        } else {
            res.status(400).json({"code": 712});
            return false
        }

    };

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
                req.body.ModelID == null ) {
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
                req.body.WareHouseAddressCityID == null ) {
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
                req.body.Username == null ) {
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
                res.status(400).json({"code": 700});
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
                    res.status(400).json({"code":700});
                }
                return searchQuery;


            }




        }  catch(err) {
            loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
            res.status(400).json({"code":700});
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
            else if (req.body.Status){
                if (req.body.WareHouseID == null){
                    res.status(404).json({"code":703});
                    return false;
                }else{return true;}
            }else{return true;}
            break;
        case "WorderProduct":
            if (req.body.ID == null || req.body.Status == null){res.status(400).json({"code": 703}); return false;}
            else if (req.body.Status){
                if (req.body.TransportarID == null){
                    res.status(404).json({"code":703});
                    return false;
                }else{return true;}
            }else{return true;}
            break;
            break;
        case "customerAddress":
            if (req.body.CityID == null || req.body.GoogleMapAddressLink == null || req.body.CompleteAddressDescription == null || req.body.CustomName == null)
            {
                res.status(400).json({"code": 703});
                return false;
            }else{return true;}
            break;
        case "DoOrder":
            if (req.body.CustomerAddressID == null || req.body.DateTimeErsal == null ){
                res.status(400).json({"code": 703});
                return false;
            } else {
                var products = [];
                products = req.body.products;
                var status =  true;
                var tof = false;
                function productsIteration(value, index, array) {
                    if (value.SellerProductID == null|| value.Supply == null ){
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
                }else {
                    products.forEach(productsIteration);

                    return status;
                }
            }

            break;
        case "followUp":
            if (req.body.HashCode == null){
                res.status(400).json({"code": 703});
                return false;
            }else{return true;}
            break;
        case "editCustomerAddress":
            if (req.body.CustomerAddressID == null)
            {
                res.status(400).json({"code": 703});
                return false;
            }else{return true;}
            break;
        case "message":
            console.log("hi")
            if ( req.body.Message == null ){
                res.status(400).json({"code": 703});
                return false;
            }else{return true;}
            break;
        case "Smessage":
            if ( req.body.ToID == null || req.body.Message == null  ){
                res.status(400).json({"code": 703});
                return false;
            }else{return true;}
            break;
        case "search":
            if (req.body.param == null){
                res.status(400).json({"code": 703});
                return false;
            }else{return true;}
            break;
        case "Survey":
            if (req.body.OrderID == null || req.body.Support == null || req.body.Transportar == null || req.body.SellerOperator == null || req.body.Seller == null || req.body.PachalChi == null){
                res.status(400).json({"code": 703});
                return false;
            }else{return true;}
            break;
        case "getPhoneNumber":
            if (req.query.SellerID == null){
                res.status(400).json({"code": 703});
                return false;
            }else{return true;}
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

function checkStatus (searchQuery, Role){
    Role.findAll(searchQuery).then(
        entity=>{
            if (!isThisArrayEmpty(entity)) {
                if (!entity[0].Status){
                    return res.status(400).json({"code": 900});
                }
            }else {
                return res.status(400).json({"code": 700});
            }
        }
    );
}

module.exports = {
    checkStatus,
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
    ,checkPassword

};
