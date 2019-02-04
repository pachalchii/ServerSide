const express = require('express');
const bodyParser = require('body-parser');
const { Seller , customer , sequelize , sellerPhoneNumber} = require('./../sequelize');
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const http = require("http");
var md5 = require('md5');
const Op = sequelize.Op;
var jwt = require('jwt-simple');

const JWT_SECRET= '755Amirr2205';
const {colors} = require('./../Util/myVars');
const myFunction = require('./../Util/myFunctions');
const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

var router = express.Router();

// sign up
const upload = multer({
    dest: "./../uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
router.post('/register',upload.single("image"), (req, res) => {

    try{

        if (req.body.role == null){
            return res.status(400).json({"message":"role parameter not recieved"});
        }else {


            var role = req.body.role;
            var image ;
            switch (role) {
                case "customer":
                    myFunction.registerInfoCheck(req,res,role);
                    if (req.file != null){

                        const tempPath = req.file.path;
                        const targetPath = path.join(__dirname, "./../uploads/customer/"+req.body.username+".png");
                        image = targetPath;
                        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
                            fs.rename(tempPath, targetPath, err => {
                                if (err) return handleError(err, res);
                            });
                        } else {
                            fs.unlink(tempPath, err => {
                                if (err) return handleError(err, res);

                                return res
                                    .status(403)
                                    .contentType("text/plain")
                                    .end("Only .png files are allowed!");
                            });
                        }

                    }else{
                        image = "notSetYet";
                    }
                    sequelize.transaction().then(function(t) {
                        customer.create({
                            birth_date:req.body.birth_date,
                            company_name:req.body.company_name,
                            enabled:true,
                            status:true,
                            family_name:req.body.family_name,
                            image:image,
                            name:req.body.name,
                            phone_number:req.body.phone_number,
                            password:md5(req.body.password),
                            point:0,
                            registration_date_time:req.body.registration_date_time,
                            theme:req.body.theme,
                            username:req.body.username,
                            cityid:req.body.cityid

                        }, {
                            transaction: t
                        }).then(function() {
                            t.commit();
                            return res.status(200).json()

                        }).catch(function(error) {
                            console.log(error);
                            t.rollback();
                            return res.status(400).json({"message":"customer signUped before"})
                        });
                    });


                    break;
                case "seller":
                    myFunction.registerInfoCheck(req,res,role);
                    if (req.file != null){
                        const tempPath = req.file.path;
                        const targetPath = path.join(__dirname, "./../uploads/seller/"+req.body.username+".png");
                        image = targetPath;
                        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
                            fs.rename(tempPath, targetPath, err => {
                                if (err) return handleError(err, res);
                            });
                        } else {
                            fs.unlink(tempPath, err => {
                                if (err) return handleError(err, res);

                                return res
                                    .status(403)
                                    .contentType("text/plain")
                                    .end("Only .png files are allowed!");
                            });
                        }

                    }else{
                        image = "notSetYet";
                    }

                    sequelize.transaction().then(function(t) {
                        Seller.create({
                            id:req.body.phone_numberid,
                            company_name:req.body.company_name,
                            complete_address_description:req.body.complete_address_description,
                            enabled:true,
                            point:0,
                            registration_date_time:req.body.registration_date_time,
                            google_map_address_link:req.body.google_map_address_link,
                            logo_image:image,
                            owner_family_name:req.body.owner_family_name,
                            owner_name:req.body.owner_name,
                            password:md5(req.body.password),
                            owner_phone_number:req.body.owner_phone_number,
                            username:req.body.username,
                            company_address_cityid:req.body.company_address_cityid,
                            phone_numberid:req.body.phone_numberid,
                            typeid:req.body.typeid

                        }, {
                            transaction: t
                        }).then(function() {
                            t.commit();
                            return res.status(200).json()

                        }).catch(function(error) {
                            console.log(error);
                            t.rollback();
                            return res.status(400).json({"message":"seller signUped before"})
                        });
                    });


                    break;
                default: return res.status(404).json({"message":"wrong role name"})
            }

        }
    }catch (e) {
        return res.status(500).json({"message":"Oops! Something went wrong!"})
    }



});

//login
router.post('/login', (req, res) => {

    try{

        if (req.body.role == null){
        return res.status(400).json({"message":"role parameter not recieved"});
    }else {

        var role = req.body.role;
        console.log(role)
        switch (role) {
            case "customer":
                myFunction.loginInfoCheck(req,res,role);
                if (req.body.phone_number != null){
                    customer.findAll({
                        where: {
                            phone_number: req.body.phone_number, password: md5(req.body.password)
                        }
                    }).then(customer => {
                        if (customer[0] != undefined){
                            var payload = { phone_number: customer[0].phone_number,
                                password: customer[0].password,
                                random:Math.random()};


                            var token = jwt.encode(payload, JWT_SECRET);

                            res.status(200).json({"data":{

                                    birth_date:customer[0].birth_date,
                                    company_name:customer[0].company_name,
                                    enabled:customer[0].enabled,
                                    status:customer[0].status,
                                    family_name:customer[0].family_name,
                                    image:customer[0].image,
                                    name:customer[0].name,
                                    phone_number:customer[0].phone_number,
                                    point:customer[0].point,
                                    registration_date_time:customer[0].registration_date_time,
                                    theme:customer[0].theme,
                                    username:customer[0].username,
                                    cityid:customer[0].cityid,
                                    token:token                 }})
                        } else {
                            return res.status(404).json();
                        }



                    });
                } else {
                    customer.findAll({
                        where: {
                            username: req.body.username, password: md5(req.body.password)
                        }
                    }).then(customer => {
                        if (customer[0] != undefined)
                        {
                            var payload = { phone_number: customer[0].phone_number,
                                password: customer[0].password,
                                random:Math.random()};



                            var token = jwt.encode(payload, JWT_SECRET);

                            res.status(200).json({"data":{

                                    birth_date:customer[0].birth_date,
                                    company_name:customer[0].company_name,
                                    enabled:customer[0].enabled,
                                    status:customer[0].status,
                                    family_name:customer[0].family_name,
                                    image:customer[0].image,
                                    name:customer[0].name,
                                    phone_number:customer[0].phone_number,
                                    point:customer[0].point,
                                    registration_date_time:customer[0].registration_date_time,
                                    theme:customer[0].theme,
                                    username:customer[0].username,
                                    cityid:customer[0].cityid,
                                    token:token                 }})
                        } else {
                            return res.status(404).json();

                        }


                    });
                }

                break;
            case "seller":
                myFunction.loginInfoCheck(req,res,role);
                if (req.body.phone_number != null){
                    Seller.findAll({
                        where: {
                            phone_number: req.body.phone_number, password: md5(req.body.password)
                        }
                    }).then(seller => {
                        if (seller[0] != undefined){
                            var payload = { phone_number: seller[0].phone_number,
                                password: seller[0].password,
                                random:Math.random()};


                            var token = jwt.encode(payload, JWT_SECRET);

                            res.status(200).json({"data":{

                                    id:seller[0].phone_numberid,
                                    company_name:seller[0].company_name,
                                    complete_address_description:seller[0].complete_address_description,
                                    enabled:seller[0].enabled,
                                    point:seller[0].point,
                                    registration_date_time:seller[0].registration_date_time,
                                    google_map_address_link:seller[0].google_map_address_link,
                                    logo_image:seller[0].logo_image,
                                    owner_family_name:seller[0].owner_family_name,
                                    owner_name:seller[0].owner_name,
                                    password:seller[0].password,
                                    owner_phone_number:seller[0].owner_phone_number,
                                    username:seller[0].username,
                                    company_address_cityid:seller[0].company_address_cityid,
                                    phone_numberid:seller[0].phone_numberid,
                                    typeid:seller[0].typeid,
                                    token:token               }})
                        } else {
                            return res.status(404).json();
                        }



                    });
                } else {
                    Seller.findAll({
                        where: {
                            username: req.body.username, password: md5(req.body.password)
                        }
                    }).then(seller => {
                        if (seller[0] != undefined)
                        {
                            var payload = { phone_number: seller[0].phone_number,
                                password: seller[0].password,
                                random:Math.random()};



                            var token = jwt.encode(payload, JWT_SECRET);

                            res.status(200).json({"data":{

                                    id:seller[0].phone_numberid,
                                    company_name:seller[0].company_name,
                                    complete_address_description:seller[0].complete_address_description,
                                    enabled:seller[0].enabled,
                                    point:seller[0].point,
                                    registration_date_time:seller[0].registration_date_time,
                                    google_map_address_link:seller[0].google_map_address_link,
                                    logo_image:seller[0].logo_image,
                                    owner_family_name:seller[0].owner_family_name,
                                    owner_name:seller[0].owner_name,
                                    password:seller[0].password,
                                    owner_phone_number:seller[0].owner_phone_number,
                                    username:seller[0].username,
                                    company_address_cityid:seller[0].company_address_cityid,
                                    phone_numberid:seller[0].phone_numberid,
                                    typeid:seller[0].typeid,
                                    token:token
                                                    }})
                        } else {
                            return res.status(404).json();

                        }


                    });
                }
            break;

            default: return res.status(404).json({"message":"wrong role name"})
        }



    }

    }catch (e) {
    return res.status(500).json({"message":"Oops! Something went wrong!"})
}

});

//phone number
router.post('/phoneNumber',(req,res) => {
    try {
        var numberOne = "notSetYet";
        var numberTwo = "notSetYet";
        var numberThree = "notSetYet";
        var numberFour = "notSetYet";
        var numberFive = "notSetYet";

        if (req.body.phone_number1 != null)numberOne =  req.body.phone_number1;
        if (req.body.phone_number2 != null)numberTwo =  req.body.phone_number2;
        if (req.body.phone_number3 != null)numberThree =  req.body.phone_number3;
        if (req.body.phone_number4 != null)numberFour =  req.body.phone_number4;
        if (req.body.phone_number5 != null)numberFive =  req.body.phone_number5;
        sequelize.transaction().then(function(t) {
            sellerPhoneNumber.create({

                phone_number1:req.body.phone_number1,
                phone_number2:req.body.phone_number2,
                phone_number3:req.body.phone_number3,
                phone_number4:req.body.phone_number4,
                phone_number5:req.body.phone_number5,

            }, {
                transaction: t
            }).then(savedNumber => {
                t.commit();
                return res.status(200).json({"data":{"id":savedNumber.id}})

            }).catch(function(error) {
                console.log(error);
                t.rollback();
                return res.status(500).json({"message":"Oops! Something went wrong!"})
            });
        });




    }  catch (e) {
    return res.status(500).json({"message":"Oops! Something went wrong!"})
}
});

module.exports = router;

