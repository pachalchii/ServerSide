const { cities , sellerType } = require('./../sequelize');
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
