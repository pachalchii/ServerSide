const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {base64_encode , addRoleInfoCheck} = require('../Util/myFunctions');
const {colors, JWT_SECRET , upload } = require('../Util/myVars');
const {Seller, sellerProducts , sellerWareHouse , sellerOperator , transportation ,sequelize , products ,unit } = require('../../sequelize');
/*********************************************/
var jwt = require('jwt-simple');
var md5 = require('md5');
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const http = require("http");


router.get('/list', (req, res) => {
    var final = [];

    function testFunction(value, index, array) {
        var base64str="not Found";
        try {
            base64str = base64_encode(value.logo_image);

        }catch (e) {
            base64str = "not Found";

        }

        final[index] = {
            name:value.company_name,
            image:base64str
        }
    }
    Seller.findAll({
        where :{
            typeid :1
        }
    }).then(seller => {
        if (seller[0] != undefined){
            seller.forEach(testFunction);

        }
        res.json(final);
    });


});

router.post('/addRole',upload.single("image"),(req,res)=>{


    if (req.headers['token'] != null) {

        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.password == null || (decodedJWT.username && decodedJWT.phone_number)) {
                res.status(400).json({message: "expired token"});
            } else {
                if (decodedJWT.username != null) {
                    Seller.findAll({
                        where: {
                            username: decodedJWT.username, password: decodedJWT.password
                        }
                    }).then(seller => {

                        if (seller[0] != undefined) {



                            if (req.body.role != null){
                                addRoleInfoCheck(req,res,req.body.role)
                                switch (req.body.role) {

                                    case "seller":
                                        if (req.file != null){

                                            const tempPath = req.file.path;
                                            const targetPath = path.join(__dirname, "./../uploads/seller/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                                            image = targetPath;
                                                fs.rename(tempPath, targetPath, err => {
                                                    if (err) return handleError(err, res);
                                                });


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
                                                typeid:2

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
                                    case "transportation":
                                        if (req.file != null){

                                            const tempPath = req.file.path;
                                            const targetPath = path.join(__dirname, "./../uploads/transportation/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                                            image = targetPath;
                                                fs.rename(tempPath, targetPath, err => {
                                                    if (err) return handleError(err, res);
                                                });


                                        }else{
                                            image = "notSetYet";
                                        }
                                        sequelize.transaction().then(function(t) {
                                            transportation.create({
                                                air_conditionar :req.body. air_conditionar ,
                                                birthdate:req.body.birthdate,
                                                color:req.body.color,
                                                description:req.body.description,
                                                family_name:req.body.family_name,
                                                name:req.body.name,
                                                image:image,
                                                pelak_number:req.body.pelak_number,
                                                phone_number:req.body.phone_number,
                                                password:md5(req.body.password),
                                                status:true,
                                                username:req.body.username,
                                                modelid:req.body.modelid,
                                                ware_houseid:req.body.ware_houseid

                                            }, {
                                                transaction: t
                                            }).then(function() {
                                                t.commit();
                                                return res.status(200).json()

                                            }).catch(function(error) {
                                                console.log(error);
                                                t.rollback();
                                                return res.status(400).json({"message":"transportation signUped before"})
                                            });
                                        });


                                        break;
                                    case "wareHouse":
                                        if (req.file != null){

                                            const tempPath = req.file.path;
                                            const targetPath = path.join(__dirname, "./../uploads/wareHouse/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                                            image = targetPath;
                                                fs.rename(tempPath, targetPath, err => {
                                                    if (err) return handleError(err, res);
                                                });


                                        }else{
                                            image = "notSetYet";
                                        }
                                        sequelize.transaction().then(function(t) {
                                            transportation.create({
                                                agent_family_name :req.body.agent_family_name ,
                                                agent_name:req.body.agent_name,
                                                birthdate:req.body.birthdate,
                                                cell_phone_number:req.body.cell_phone_number,
                                                image:image,
                                                password :md5(req.body.password) ,
                                                phone_number:phone_number,
                                                point:0,
                                                status:true,
                                                username:username,
                                                ware_house_complete_address_description:req.body.ware_house_complete_address_description,
                                                ware_house_google_map_address_link:req.body.ware_house_google_map_address_link,
                                                ware_house_address_cityid:req.body.ware_house_address_cityid,
                                                sellerid:req.body.sellerid

                                            }, {
                                                transaction: t
                                            }).then(function() {
                                                t.commit();
                                                return res.status(200).json()

                                            }).catch(function(error) {
                                                console.log(error);
                                                t.rollback();
                                                return res.status(400).json({"message":"wareHouse signUped before"})
                                            });
                                        });



                                        break;
                                    case "operator" :
                                        if (req.file != null){

                                            const tempPath = req.file.path;
                                            const targetPath = path.join(__dirname, "./../uploads/operator/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                                            image = targetPath;
                                                fs.rename(tempPath, targetPath, err => {
                                                    if (err) return handleError(err, res);
                                                });


                                        }else{
                                            image = "notSetYet";
                                        }
                                        sequelize.transaction().then(function(t) {
                                            transportation.create({
                                                birthdate :req.body.birthdate ,
                                                family_name:req.body.family_name,
                                                image:image,
                                                name:req.body.name,
                                                password :md5(req.body.password) ,
                                                phone_number:phone_number,
                                                point:0,
                                                status:true,
                                                username:username,
                                                sellerid:req.body.sellerid

                                            }, {
                                                transaction: t
                                            }).then(function() {
                                                t.commit();
                                                return res.status(200).json()

                                            }).catch(function(error) {
                                                console.log(error);
                                                t.rollback();
                                                return res.status(400).json({"message":"wareHouse signUped before"})
                                            });
                                        });

                                        break;

                                    default : return res.status(404).json({"message":"invalid role type"});
                                }



                            } else {
                                return res.status(400).json({"message":"role not found"});
                            }



                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                } else {
                    Seller.findAll({
                        where: {
                            owner_phone_number: decodedJWT.owner_phone_number, password: decodedJWT.password
                        }
                    }).then(seller => {

                        if (seller[0] != undefined) {

                            if (req.body.role != null){
                                addRoleInfoCheck(req,res)
                                switch (role) {

                                    case "seller":
                                        if (req.file != null){

                                            const tempPath = req.file.path;
                                            const targetPath = path.join(__dirname, "./../uploads/seller/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                                            image = targetPath;
                                                fs.rename(tempPath, targetPath, err => {
                                                    if (err) return handleError(err, res);
                                                });


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
                                                typeid:2

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
                                    case "transportation":
                                        if (req.file != null){

                                            const tempPath = req.file.path;
                                            const targetPath = path.join(__dirname, "./../uploads/transportation/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                                            image = targetPath;
                                                fs.rename(tempPath, targetPath, err => {
                                                    if (err) return handleError(err, res);
                                                });


                                        }else{
                                            image = "notSetYet";
                                        }
                                        sequelize.transaction().then(function(t) {
                                            transportation.create({
                                                air_conditionar :req.body. air_conditionar ,
                                                birthdate:req.body.birthdate,
                                                color:req.body.color,
                                                description:req.body.description,
                                                family_name:req.body.family_name,
                                                name:req.body.name,
                                                image:image,
                                                pelak_number:req.body.pelak_number,
                                                phone_number:req.body.phone_number,
                                                password:md5(req.body.password),
                                                status:true,
                                                username:req.body.username,
                                                modelid:req.body.modelid,
                                                ware_houseid:req.body.ware_houseid

                                            }, {
                                                transaction: t
                                            }).then(function() {
                                                t.commit();
                                                return res.status(200).json()

                                            }).catch(function(error) {
                                                console.log(error);
                                                t.rollback();
                                                return res.status(400).json({"message":"transportation signUped before"})
                                            });
                                        });


                                        break;
                                    case "wareHouse":
                                        if (req.file != null){

                                            const tempPath = req.file.path;
                                            const targetPath = path.join(__dirname, "./../uploads/wareHouse/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                                            image = targetPath;
                                                fs.rename(tempPath, targetPath, err => {
                                                    if (err) return handleError(err, res);
                                                });


                                        }else{
                                            image = "notSetYet";
                                        }
                                        sequelize.transaction().then(function(t) {
                                            transportation.create({
                                                agent_family_name :req.body.agent_family_name ,
                                                agent_name:req.body.agent_name,
                                                birthdate:req.body.birthdate,
                                                cell_phone_number:req.body.cell_phone_number,
                                                image:image,
                                                password :md5(req.body.password) ,
                                                phone_number:phone_number,
                                                point:0,
                                                status:true,
                                                username:username,
                                                ware_house_complete_address_description:req.body.ware_house_complete_address_description,
                                                ware_house_google_map_address_link:req.body.ware_house_google_map_address_link,
                                                ware_house_address_cityid:req.body.ware_house_address_cityid,
                                                sellerid:req.body.sellerid

                                            }, {
                                                transaction: t
                                            }).then(function() {
                                                t.commit();
                                                return res.status(200).json()

                                            }).catch(function(error) {
                                                console.log(error);
                                                t.rollback();
                                                return res.status(400).json({"message":"wareHouse signUped before"})
                                            });
                                        });



                                        break;
                                    case "operator" :
                                        if (req.file != null){

                                            const tempPath = req.file.path;
                                            const targetPath = path.join(__dirname, "./../uploads/operator/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                                            image = targetPath;
                                                fs.rename(tempPath, targetPath, err => {
                                                    if (err) return handleError(err, res);
                                                });


                                        }else{
                                            image = "notSetYet";
                                        }
                                        sequelize.transaction().then(function(t) {
                                            transportation.create({
                                                birthdate :req.body.birthdate ,
                                                family_name:req.body.family_name,
                                                image:image,
                                                name:req.body.name,
                                                password :md5(req.body.password) ,
                                                phone_number:phone_number,
                                                point:0,
                                                status:true,
                                                username:username,
                                                sellerid:req.body.sellerid

                                            }, {
                                                transaction: t
                                            }).then(function() {
                                                t.commit();
                                                return res.status(200).json()

                                            }).catch(function(error) {
                                                console.log(error);
                                                t.rollback();
                                                return res.status(400).json({"message":"wareHouse signUped before"})
                                            });
                                        });

                                        break;

                                    default : return res.status(404).json({"message":"invalid role type"});
                                }



                            } else {
                                return res.status(400).json({"message":"role not found"});
                            }


                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                }

            }
        } catch(err) {
            console.log(err);
            res.status(400).json({"message":"expired token"});

        }





    } else {
        res.status(400).json({"message": "token not found in header"});
    }










});

router.post('/product' , upload.single("image") , (req,res)=>{
    if (req.headers['token'] != null) {

        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.password == null || (decodedJWT.username && decodedJWT.phone_number)) {
                res.status(400).json({message: "expired token"});
            } else {
                if (decodedJWT.username != null) {
                    Seller.findAll({
                        where: {
                            username: decodedJWT.username, password: decodedJWT.password
                        }
                    }).then(Seller => {

                        if (Seller[0] != undefined) {

                            if (req.file != null){
                            const tempPath = req.file.path;
                            const targetPath = path.join(__dirname, "./../uploads/products/" + Math.random() + path.extname(req.file.originalname).toLowerCase());
                            image = targetPath;
                                fs.rename(tempPath, targetPath, err => {
                                    if (err) return handleError(err, res);
                                });


                        } else {
                            image = "notSetYet";
                        }

                        if (req.body.description == null ||
                            req.body.price == null ||
                            req.body.price_date_time == null ||
                            req.body.supply_of_product == null ||
                            req.body.unit_of_product == null ||
                            req.body.productid == null ||
                            req.body.unitid == null
                        ) {
                            res.status(400).json({"message": "not enough parameter"});
                        } else {
                            products.findAll({where: {id : req.body.productid}}).then(
                                products=>{
                                    if (products[0] != undefined){
                                        unit.findAll({where:{id:req.body.unitid}}).then(unit=>{
                                            if (unit[0] == undefined){
                                                return res.status(404).json();

                                            }
                                        })
                                    } else {
                                        return res.status(404).json();
                                    }
                                }
                            );
                            sellerProducts.create({
                                description: req.body.description,
                                image: image,
                                price: req.body.price,
                                price_date_time: req.body.price_date_time,
                                supply_of_product: req.body.supply_of_product,
                                unit_of_product: req.body.unit_of_product,
                                productid: req.body.productid,
                                sellerid: Seller[0].id,
                                unitid: req.body.unitid

                            });
                            return res.status(200).json();


                        }

                      }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                } else {
                    Seller.findAll({
                        where: {
                            owner_phone_number: decodedJWT.owner_phone_number, password: decodedJWT.password
                        }
                    }).then(Seller => {

                        if (Seller[0] != undefined) {

                                if (req.file != null){
                                    const tempPath = req.file.path;
                                    const targetPath = path.join(__dirname, "./../uploads/products/" + Math.random() + path.extname(req.file.originalname).toLowerCase());
                                    image = targetPath;
                                        fs.rename(tempPath, targetPath, err => {
                                            if (err) return handleError(err, res);
                                        });


                                } else {
                                    image = "notSetYet";
                                }

                                if (req.body.description == null ||
                                    req.body.price == null ||
                                    req.body.price_date_time == null ||
                                    req.body.supply_of_product == null ||
                                    req.body.unit_of_product == null ||
                                    req.body.productid == null ||
                                    req.body.unitid == null
                                ) {
                                    res.status(400).json({"message": "not enough parameter"});
                                } else {

                                    products.findAll({where: {id : req.body.productid}}).then(
                                        products=>{
                                            console.log("slm")
                                            if (products[0] != undefined){
                                                unit.findAll({where:{id:req.body.unitid}}).then(unit=>{
                                                    if (unit[0] == undefined){
                                                        return res.status(404).json();

                                                    }
                                                })
                                            } else {
                                                return res.status(404).json();
                                            }
                                        }
                                    );
                                    sellerProducts.create({
                                        description: req.body.description,
                                        image: image,
                                        price: req.body.price,
                                        price_date_time: req.body.price_date_time,
                                        supply_of_product: req.body.supply_of_product,
                                        unit_of_product: req.body.unit_of_product,
                                        productid: req.body.productid,
                                        sellerid: Seller[0].id,
                                        unitid: req.body.unitid

                                    });
                                    return res.status(200).json();



                                }






                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                }

            }
        } catch(err) {
            console.log(err);
            res.status(400).json({"message":"expired token"});

        }





    } else {
        res.status(400).json({"message": "token not found in header"});
    }

} );

router.put('/product' , upload.single("image") , (req,res)=>{
    if (req.headers['token'] != null) {

        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.password == null || (decodedJWT.username && decodedJWT.phone_number)) {
                res.status(400).json({message: "expired token"});
            } else {
                if (decodedJWT.username != null) {
                    Seller.findAll({
                        where: {
                            username: decodedJWT.username, password: decodedJWT.password
                        }
                    }).then(Seller => {

                        if (Seller[0] != undefined) {



                            if (req.body.sellerproductid == null ||
                                req.body.description == null ||
                                req.body.price == null ||
                                req.body.price_date_time == null ||
                                req.body.supply_of_product == null ||
                                req.body.unit_of_product == null ||
                                req.body.productid == null ||
                                req.body.unitid == null
                            ) {
                                res.status(400).json({"message": "not enough parameter"});
                            } else {
                                sellerProducts.findAll({where:{id:req.body.sellerproductid}}).then(
                                    sellerproductid=>{
                                        if (sellerproductid[0] == undefined){
                                            return res.status(404).json();
                                        } else {

                                            if (req.file != null){
                                                const tempPath = req.file.path;
                                                const targetPath = path.join(__dirname, "./../uploads/products/" + Math.random() + path.extname(req.file.originalname).toLowerCase());
                                                image = targetPath;
                                                    fs.rename(tempPath, targetPath, err => {
                                                        if (err) return handleError(err, res);
                                                    });


                                            } else {
                                                image =sellerproductid[0].image ;
                                            }

                                            products.findAll({where: {id : req.body.productid}}).then(
                                                products=>{
                                                    if (products[0] != undefined){
                                                        unit.findAll({where:{id:req.body.unitid}}).then(unit=>{
                                                            if (unit[0] == undefined){
                                                                return res.status(404).json();

                                                            }
                                                        })
                                                    } else {
                                                        return res.status(404).json();
                                                    }
                                                }
                                            );
                                            sellerProducts.update({
                                                description: req.body.description,
                                                image: image,
                                                price: req.body.price,
                                                price_date_time: req.body.price_date_time,
                                                supply_of_product: req.body.supply_of_product,
                                                unit_of_product: req.body.unit_of_product,
                                                productid: req.body.productid,
                                                sellerid: Seller[0].id,
                                                unitid: req.body.unitid
                                            } , {where:{
                                                    id:sellerproductid[0].id
                                                }}   );
                                            return res.status(200).json();






                                        }
                                    }
                                );






                            }





                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                } else {
                    Seller.findAll({
                        where: {
                            owner_phone_number: decodedJWT.owner_phone_number, password: decodedJWT.password
                        }
                    }).then(Seller => {

                            if (Seller[0] != undefined) {


                                if (req.body.sellerproductid == null ||
                                    req.body.description == null ||
                                    req.body.price == null ||
                                    req.body.price_date_time == null ||
                                    req.body.supply_of_product == null ||
                                    req.body.unit_of_product == null ||
                                    req.body.productid == null ||
                                    req.body.unitid == null
                                ) {
                                    res.status(400).json({"message": "not enough parameter"});
                                } else {
                                    sellerProducts.findAll({where:{id:req.body.sellerproductid}}).then(
                                        sellerproductid=>{
                                            if (sellerproductid[0] == undefined){
                                                return res.status(404).json();
                                            } else {

                                                if (req.file != null){
                                                    const tempPath = req.file.path;
                                                    const targetPath = path.join(__dirname, "./../uploads/products/" + Math.random() +path.extname(req.file.originalname).toLowerCase());
                                                    image = targetPath;
                                                        fs.rename(tempPath, targetPath, err => {
                                                            if (err) return handleError(err, res);
                                                        });


                                                } else {
                                                    image =sellerproductid[0].image ;
                                                }

                                                products.findAll({where: {id : req.body.productid}}).then(
                                                    products=>{
                                                        if (products[0] != undefined){
                                                            unit.findAll({where:{id:req.body.unitid}}).then(unit=>{
                                                                if (unit[0] == undefined){
                                                                    return res.status(404).json();

                                                                }
                                                            })
                                                        } else {
                                                            return res.status(404).json();
                                                        }
                                                    }
                                                );

                                                sellerProducts.update({
                                                    description: req.body.description,
                                                    image: image,
                                                    price: req.body.price,
                                                    price_date_time: req.body.price_date_time,
                                                    supply_of_product: req.body.supply_of_product,
                                                    unit_of_product: req.body.unit_of_product,
                                                    productid: req.body.productid,
                                                    sellerid: Seller[0].id,
                                                    unitid: req.body.unitid
                                                } , {where:{
                                                        id:sellerproductid[0].id
                                                    }}   );
                                                return res.status(200).json();






                                            }
                                        }
                                    );






                                }

                            }else {
                                res.status(400).json({"message":"expired token"});
                            }

                    });
                }

            }
        } catch(err) {
            console.log(err);
            res.status(400).json({"message":"expired token"});

        }





    } else {
        res.status(400).json({"message": "token not found in header"});
    }

} );

router.get('/product' , (req,res)=>{
    if (req.headers['token'] != null) {

        function getallproducts(value, index, array) {
            var base64str="not Found";
            try {
                base64str = base64_encode(value.image);

            }catch (e) {
                base64str = "not Found";

            }

            final[index] = {
                id:value.id,
                description:value.description,
                price:value.price,
                price_date_time:value.price_date_time,
                supply_of_product:value.supply_of_product,
                unit_of_product:value.unit_of_product,
                productid:value.productid,
                sellerid:value.sellerid,
                unitid:value.unitid,
                image:base64str
            }
        }
        try {
            var final = [];
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.password == null || (decodedJWT.username && decodedJWT.phone_number)) {
                res.status(400).json({message: "expired token"});
            } else {
                if (decodedJWT.username != null) {
                    Seller.findAll({
                        where: {
                            username: decodedJWT.username, password: decodedJWT.password
                        }
                    }).then(Seller => {

                        if (Seller[0] != undefined) {

                        sellerProducts.findAll(
                            {where:{
                                sellerid:Seller[0].id
                                }}
                        ).then( sellerProducts=>{
                            if (sellerProducts[0] != undefined){
                                sellerProducts.forEach(getallproducts)
                                return res.json(final);

                            } else {return res.status(404).json();}
                            }
                        );

                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                } else {
                    Seller.findAll({
                        where: {
                            owner_phone_number: decodedJWT.owner_phone_number, password: decodedJWT.password
                        }
                    }).then(Seller => {

                        if (Seller[0] != undefined) {

                            sellerProducts.findAll(
                                {where:{
                                        sellerid:Seller[0].id
                                    }}
                            ).then( sellerProducts=>{
                                if (sellerProducts[0] != undefined){
                                    sellerProducts.forEach(getallproducts)
                                    return res.json(final);

                                } else {return res.status(404).json();}                                }
                            );

                        }else {
                            res.status(400).json({"message":"expired token"});
                        }

                    });
                }

            }
        } catch(err) {
            console.log(err);
            res.status(400).json({"message":"expired token"});

        }





    } else {
        res.status(400).json({"message": "token not found in header"});
    }

} );

router.get('/Subtypes' , (req,res)=>{
    if (req.headers['token'] != null) {

        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.password == null || (decodedJWT.username && decodedJWT.phone_number)) {
                res.status(400).json({message: "expired token"});
            } else {
                if (decodedJWT.username != null) {
                    Seller.findAll({
                        where: {
                            username: decodedJWT.username, password: decodedJWT.password
                        }
                    }).then(seller => {

                        if (seller[0] != undefined) {

                            sellerWareHouse.findAll({where :{
                                sellerid : seller[0].id
                                }}).then(wareHouses=>{
                                sellerOperator.findAll({where :{
                                        sellerid : seller[0].id
                                    }}).then(sellerOperator=>{

                                    return res.json({
                                        wareHouse: wareHouses ,
                                        operator: sellerOperator
                                    });

                                });
                            });


                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                } else {
                    Seller.findAll({
                        where: {
                            owner_phone_number: decodedJWT.owner_phone_number, password: decodedJWT.password
                        }
                    }).then(seller => {

                        if (seller[0] != undefined) {

                            sellerWareHouse.findAll({where :{
                                    sellerid : seller[0].id
                                }}).then(wareHouses=>{
                                wareHouselist = wareHouses;
                            });

                            sellerOperator.findAll({where :{
                                    sellerid : seller[0].id
                                }}).then(sellerOperator=>{
                                operatorlist = sellerOperator;
                            });

                            transportation.findAll({where :{
                                    sellerid : seller[0].id
                                }}).then(transportation=>{
                                tranlist = transportation;
                            });

                            return res.json({
                                wareHouse:{ wareHouselist },
                                operator:{ operatorlist },
                                transportation: { tranlist }
                            });



                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                }

            }
        } catch(err) {
            console.log(err);
            res.status(400).json({"message":"expired token"});

        }





    } else {
        res.status(400).json({"message": "token not found in header"});
    }









});

module.exports = router;

