const { cities , sellerType , productGroups} = require('./../sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const {colors} = require('./../Util/myVars');

const PHONENUMBER_REGEX = "^(\\+98|0)?9\\d{9}$" ;
const PASSWORD_REGEX = "(?=.{8,})" ;
const USERNAME_REGEX ="^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$";


function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function insertCities(value, index, array) {
    cities.create(
        {

            id: index,
            name:value.name
        }
    ).catch(err=>{console.log(err)});
}
function insertTypes(value, index, array) {
    sellerType.create(
        {

            id: index,
            type:value.type
        }
    ).catch(err=>{console.log(err)});
}
function insertProductsGroup(value, index, array) {
    productGroups.create(
        {

            id: index,
            name:value.name,
            parentid:value.parentid
        }
    ).catch(err=>{console.log(err)});
}

function fillDataBase() {

    var city = [
                    { id:1 , name:"آذربایجان شرقی" },
                    { id:2 , name:"اردبیل" },
                    { id:3 , name:"اصفهان" },
                    { id:4 , name:"البرز" },
                    { id:5 , name:"ایلام" },
                    { id:6 , name:"بوشهر" },
                    { id:7 , name:"تهران" },
                    { id:8 , name:"چهارمحال و بختیاری" },
                    { id:9 , name:"خراسان جنوبی" },
                    { id:10 , name:"خراسان رضوی" },
                    { id:11 , name:"خراسان شمالی" },
                    { id:12 , name:"خوزستان" },
                    { id:13 , name:"زنجان" },
                    { id:14 , name:"سمنان" },
                    { id:15 , name:"سیستان و بلوچستان" },
                    { id:16 , name:"فارس" },
                    { id:17 , name:"قزوین" },
                    { id:18 , name:"قم" },
                    { id:19 , name:"کردستان" },
                    { id:20 , name:"کرمان" },
                    { id:21 , name:"کرمانشاه" },
                    { id:22 , name:"کهگیلویه و بویراحمد" },
                    { id:23 , name:"گلستان" },
                    { id:24 , name:"گیلان" },
                    { id:25 , name:"لرستان" },
                    { id:26 , name:"مازندران" },
                    { id:27 , name:"مرکزی" },
                    { id:28 , name:"هرمزگان" },
                    { id:29 , name:"همدان" },
                    { id:30 , name:"یزد" },
        { id:31 , name:"آذربایجان شرقی" }


    ];
    cities.findAll().then(cities => {
        if (cities[0] == undefined){
            city.forEach(insertCities);
            console.log( colors.bg.Green ,"import  city demo data done successfuly" ,  colors.Reset);
        } else {
            console.log( colors.bg.Red ,"import city demo data canceled ." ,  colors.Reset);
        }
    });

    var type = [
        { id:1 , type:"شرکت اصلی" },
        { id:2 , type:"نماینده فروش" },

                     ];
    sellerType.findAll().then(sellerType => {
        if (sellerType[0] == undefined){
            type.forEach(insertTypes);
            console.log( colors.bg.Green ,"import  SellerType demo data done successfuly" ,  colors.Reset);
        } else {
            console.log( colors.bg.Red ,"import SellerType demo data canceled ." ,  colors.Reset);
        }
    });

    var productsGroupvar = [
        {id:1 ,  name:"محصولات" , parentid: null},
        {id:2 ,  name:"گوساله" , parentid: 1},
        {id:3 ,   name:"قلوه گاه گوساله" , parentid: 2},
        {id:4 ,  name:"خرده راسته گوساله" , parentid: 2},
        {id:5 ,  name:"گردن گوساله" , parentid: 2},
        {id:6 ,  name:"فیله گوساله" , parentid: 2},
        {id:7 ,  name:"مغز راسته گوساله" , parentid: 2},
        {id:8 ,  name:"راسته با استخوان گوساله" , parentid: 2},
        {id:9 ,  name:"دنبالیچه گوساله" , parentid: 2},
        {id:10 , name:"چربی گوساله" , parentid: 2},
        {id:11 , name:"ران ممتاز گوساله جوان" , parentid: 2},
        {id:12 , name:"سردست ممتاز گوساله جوان" , parentid: 2},
        {id:13 , name:"ران ممتاز ماده گاو" , parentid: 2},
        {id:14 , name:"سردست ممتاز ماده گاو" , parentid: 2},
        {id:15 , name:"ماهیچه گوساله" , parentid: 2},
        {id:16 , name:"ران با استخوان گوساله جوان" , parentid: 2},
        {id:17 , name:"سردست با استخوان گوساله جوان" , parentid: 2},
        {id:18 , name:"ران با استخوان ماده گاو" , parentid: 2},
        {id:19 , name:"سردست با استخوان ماده گاو " , parentid: 2},
        {id:20 , name:"چرخکرده مخلوط" , parentid: 2},
        {id:21 , name:"چرخکرده گوساله" , parentid: 2},
        {id:22 , name:"خرده گوساله" , parentid: 2},
        {id:23 , name:"گوسفند" , parentid: 1},
        {id:24 , name:"خرده گوسفند" , parentid: 23},
        {id:25 , name:"قلوه گاه گوسفند" , parentid: 23},
        {id:26 , name:"قلوه گاه با استخوان گوسفند" , parentid: 23},
        {id:27 , name:"خرده قلوه گاه گوسفند" , parentid: 23},
        {id:28 , name:"خرده راسته گوسفند" , parentid: 23},
        {id:29 , name:"گردن گوسفند" , parentid: 23},
        {id:30 , name:"گردن شقه ای گوسفند" , parentid: 23},
        {id:31 , name:"لاشه بدون دنبه گوسفند" , parentid: 23},
        {id:32,  name:"لاشه گوسفند با کله" , parentid: 23},
        {id:33 , name:"دنبه گوسفند" , parentid: 23},
        {id:34,  name:"ران ممتاز گوسفند" , parentid: 23},
        {id:35 , name:"ران بدون استخوان گوسفند" , parentid: 23},
        {id:36 , name:"سردست ممتاز گوسفند" , parentid: 23},
        {id:37 , name:"سردست بدون استخوان گوسفند" , parentid: 23},
        {id:38 , name:"راسته با استخوان گوسفند" , parentid: 23},
        {id:39 , name:"راسته بدون استخوان گوسفند" , parentid: 23},
        {id:40 , name:"مغز راسته گوسفند ( دو تکه)" , parentid: 23},
        {id:41 , name:"مغز راسته گوسفند ( سه تکه)" , parentid: 23},
        {id:42 , name:"فیله ممتاز گوسفند" , parentid: 23},
        {id:43 , name:"راسته شاندیزی گوسفند" , parentid: 23},
        {id:44 , name:"شیشلیک بدون مواد گوسفند" , parentid: 23},
        {id:45 , name:"شیشلیک با مواد گوسفند" , parentid: 23},
        {id:46 , name:"ماهیچه بدون گل گوسفند" , parentid: 23},
        {id:47 , name:"ماهیچه با گل گوسفند" , parentid: 23},
        {id:48 , name:"ماهیچه ران گوسفند" , parentid: 23},
        {id:49 , name:"ماهیچه برش مشهدی گوسفند" , parentid: 23},
        {id:50 , name:"ران و سردست بشقابی گوسفند" , parentid: 23},
        {id:51 , name:"ماهیچه بشقابی گوسفند" , parentid: 23},
        {id:52 , name:"مرغ" , parentid:1},
        {id:53 , name:"ران بی پوست بدون کمر  300 گرمی" , parentid:52},
        {id:54 , name:"ران بی پوست بدون کمر  350 گرمی" , parentid:52},
        {id:55 , name:"ران بی پوست بدون کمر  400 گرمی" , parentid:52},
        {id:56 , name:"ران با پوست بدون کمر  300 گرمی" , parentid:52},
        {id:57 , name:"ران با پوست بدون کم  350 گرمی" , parentid:52},
        {id:58 , name:"ران با پوست بدون کمر  400 گرمی" , parentid:52},
        {id:59 , name:"سینه با استخوان بدون پوست  300 گرمی" , parentid:52},
        {id:60 , name:"سینه با استخوان بدون پوست  350 گرمی" , parentid:52},
        {id:61 , name:"سینه با استخوان بدون پوست  400 گرمی" , parentid:52},
        {id:62 , name:"سینه با استخوان با پوست  300 گرمی" , parentid:52},
        {id:63 , name:"سینه با استخوان با پوست  350 گرمی" , parentid:52},
        {id:64 , name:"سینه با استخوان با پوست  400 گرمی" , parentid:52},
        {id:65 , name:"بال با نوک" , parentid:52},
        {id:66 , name:"بال بی نوک" , parentid:52},
        {id:67 , name:"بازو با پوست" , parentid:52},
        {id:68 , name:"بازو بی پوست" , parentid:52},
        {id:69 , name:"بال و بازو سه تکه" , parentid:52},
        {id:70 , name:"بال و بازو دو تکه" , parentid:52},
        {id:71 , name:"گردن با پوست" , parentid:52},
        {id:72 , name:"گردن بی پوست" , parentid:52},
        {id:73 , name:"فیله" , parentid:52},
        {id:74 , name:"مرغ کامل شکم خالی 1200 گرمی" , parentid:52},
        {id:75 , name:"مرغ کامل شکم خالی 1300 گرمی" , parentid:52},
        {id:76 , name:"مرغ کامل شکم خالی 1400 گرمی" , parentid:52},
        {id:77 , name:"مرغ کامل شکم خالی 1500 گرمی" , parentid:52},
        {id:78 , name:"مرغ کامل شکم خالی 1600 گرمی" , parentid:52},
        {id:79 , name:"مرغ کامل شکم خالی 1700 گرمی" , parentid:52},
        {id:80 , name:"مرغ کامل شکم خالی 1800 گرمی" , parentid:52},
        {id:81 , name:"مرغ کامل شکم خالی 1900 گرمی" , parentid:52},
        {id:82 , name:"مرغ کامل شکم خالی 2000 گرمی" , parentid:52},
        {id:83 , name:"مرغ کامل شکم خالی 2100 گرمی" , parentid:52},
        {id:84 , name:"مرغ کامل شکم خالی 2200 گرمی" , parentid:52},
        {id:85 , name:"مرغ کامل شکم خالی درشت" , parentid:52},
        {id:86 , name:"سینه بدون کتف ممتاز" , parentid:52},
        {id:87 , name:"سینه بدون کتف معمولی" , parentid:52},
        {id:88 , name:"سینه با کتف ممتاز" , parentid:52},
        {id:89 , name:"سینه با کتف معمولی" , parentid:52},
        {id:90 , name:"اکبر جوجه 600 گرمی" , parentid:52},
        {id:91 , name:"اکبر جوجه 1000 گرمی" , parentid:52},
        {id:92 , name:"اکبر جوجه 1100 گرمی" , parentid:52},
        {id:93 , name:"خرده مرغ" , parentid:52},
        {id:94 , name:"گوشت گردن" , parentid:52},
        {id:95 , name:"خمیر مرغ" , parentid:52},
        {id:96 , name:"ماهی" , parentid:1},
        {id:97 , name:"قزل آلا 200 گرمی" , parentid:96},
        {id:98 , name:"قزل آلا 2520 گرمی" , parentid:96},
        {id:99 , name:"قزل آلا 300 گرمی" , parentid:96},
        {id:100 , name:"قزل آلا 350 گرمی" , parentid:96},
        {id:101 , name:"قزل آلا 400 گرمی" , parentid:96},
        {id:102 , name:"قزل آلا 450 گرمی" , parentid:96},
        {id:103 , name:"قزل آلا 500 گرمی" , parentid:96},
        {id:104 , name:"تیلاپیا M" , parentid:96},
        {id:105 , name:"تیلاپیا S" , parentid:96},
        {id:106 , name:"سالمون" , parentid:96},
        {id:107 , name:"میگو" , parentid:96},
        {id:108 , name:"منجمد وارداتی" , parentid:1},
        {id:109 , name:"گوسفند وارداتی" , parentid:108},
        {id:110 , name:"گوساله وارداتی" , parentid:108},
        {id:111 , name:"ران" , parentid:109},
        {id:112 , name:"سردست" , parentid:109},
        {id:113 , name:"گردن" , parentid:109},
        {id:114 , name:"راسته با استخوان" , parentid:109},
        {id:115 , name:"راسته شاندیزی" , parentid:109},
        {id:116 , name:"گردن" , parentid:109},
        {id:117 , name:"قلوه گاه گوسفند" , parentid:109},
        {id:118 , name:"قلوه گاه با استخوان گوسفند" , parentid:109},
        {id:119 , name:"ماهیچه" , parentid:109},
        {id:120 , name:"مغول" , parentid:111},
        {id:121 , name:"استرالیا" , parentid:111},
        {id:122 , name:"قزاقستان" , parentid:111},
        {id:123 , name:"نیوزلند" , parentid:111},
        {id:124 , name:"ارمنستان" , parentid:111},
        {id:125 , name:"گرجستان" , parentid:111},
        {id:126 , name:"ران" , parentid:110},
        {id:127 , name:"سردست" , parentid:110},
        {id:128 , name:"گردن" , parentid:110},
        {id:129 , name:"بغل ران" , parentid:110},
        {id:130 , name:"سفید ران" , parentid:110},
        {id:131 , name:"مغز ران" , parentid:110},
        {id:132 , name:"راسته" , parentid:110},
        {id:133 , name:"فیله" , parentid:110},
        {id:134 , name:"قلوه گاه" , parentid:110},
        {id:135 , name:"مینروا" , parentid:126},
        {id:136 , name:"جی جی" , parentid:126},
        {id:137 , name:"جی جی زد" , parentid:126},
        {id:138 , name:"آگرا" , parentid:126},
        {id:139 , name:"استرلا" , parentid:126},
        {id:140 , name:"آسترا" , parentid:126},
        {id:141 , name:"فری بوی" , parentid:126},
        {id:142 , name:"فریگو" , parentid:126},
        {id:143 , name:"مارفریگ" , parentid:126},
        {id:144 , name:"بیف کلاب" , parentid:126},
        {id:145 , name:"آنجلو" , parentid:126},
        {id:146 , name:"پالاتاری" , parentid:126},
        {id:147 , name:"کیومیت" , parentid:126},
        {id:148 , name:"متابوی" , parentid:126},
        {id:149 , name:"بیگ بوی" , parentid:126},
        {id:150 , name:"فراورده های گوشتی" , parentid:1},
        {id:151 , name:"سوسیس" , parentid:150},
        {id:152 , name:"کالباس" , parentid:150},
        {id:153 , name:"همبرگر و کباب لقمه" , parentid:150},
        {id:154 , name:"غذاهای آماده" , parentid:150}


    ];
    productGroups.findAll().then(productsgroup => {
        if (productsgroup[0] == undefined){
            productsGroupvar.forEach(insertProductsGroup);
            console.log( colors.bg.Green ,"import  products Group demo data done successfuly" ,  colors.Reset);
        } else {
            console.log( colors.bg.Red ,"import  products Group demo data canceled ." ,  colors.Reset);
        }
    });

}

function checkPhone(req , res ) {
    if (req.body.phone_number  != null ){
        var pattern  = new RegExp(PHONENUMBER_REGEX);
        var status = pattern.test(req.body.phone_number );
        if (!status) {
            res.status(400).json({message : "phone number is not in valid form "});
            return false;
        }
        return true;


    }

}
function checkPassword(req , res ) {
    if (req.body.password != null ){
        var pattern  = new RegExp(PASSWORD_REGEX);
        var status = pattern.test(req.body.password);
        if (!status) {
            res.status(400).json({message : "password valid form is The string must be eight characters or longer"});
            return false;
        }
        return true;


    }

}

function checkUserName(req , res ) {
    if (req.body.username != null ){
        var pattern  = new RegExp(USERNAME_REGEX);
        var status = pattern.test(req.body.password);
        if (!status) {
            res.status(400).json({message : "username is not valid "});
            return false;
        }
        return true;


    }

}

function registerInfoCheck (req , res , role){
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
            ){
                res.status(400).json({message : "request body does not have all neccesery variables"});
                return false;
            }else return !(!checkUserName(req,res) || !checkPhone(req, res) || !checkPassword(req, res));
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
                req.body.phone_numberid == null ||
                req.body.typeid == null
            ){
                res.status(400).json({message : "request body does not have all neccesery variables"});
                return false;
            }else return !(!checkUserName(req,res) || !checkPhone(req, res) || !checkPassword(req, res));
    }


}

function loginInfoCheck (req , res , role){
    switch (role) {
        case "customer":
            if (
                req.body.password == null || (req.body.phone_number == null && req.body.username == null)

            ){
                res.status(400).json({message : "request body does not have all neccesery variables"});
                return false;
            }else
            {
                if (req.body.phone_number != null) {
                    checkPhone(req,res);
                }
                checkPassword(req,res)
            };
            break;
        case "seller":
            if (
                req.body.password == null || (req.body.phone_number == null && req.body.username == null)

            ){
                res.status(400).json({message : "request body does not have all neccesery variables"});
                return false;
            }else
            {
                if (req.body.phone_number != null) {
                    checkPhone(req,res);
                }
                checkPassword(req,res)
            };
    }


}



module.exports = {
    loginInfoCheck,
    registerInfoCheck
    ,fillDataBase
};
