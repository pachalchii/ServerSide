const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {checkToken, response, isThisArrayEmpty, base64_encode, addRoleInfoCheck} = require('../Util/myFunctions');
const {loggererror, loggerinfo, colors, JWT_SECRET, upload} = require('../Util/myVars');
const {Seller, sellerProducts, sellerWareHouse, sellerOperator, transportation, sequelize, products, unit} = require('../../sequelize');
/*********************************************/
var jwt = require('jwt-simple');
var md5 = require('md5');
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const http = require("http");


router.get('/list', (req, res) => {
    if (req.query.cityId == null) {
        return res.status(400).json({"message": "cityId not found"});
    }

    var final = [];

    function testFunction(value, index, array) {
        var base64str = "not Found";
        try {
            base64str = base64_encode(value.logo_image);

        } catch (e) {
            base64str = "not Found";

        }

        final[index] = {
            name: value.company_name,
            image: base64str
        }
    }

    Seller.findAll({
        where: {
            typeid: 1,
            company_address_cityid: req.params.cityId
        }
    }).then(seller => {
        if (!isThisArrayEmpty(seller)) {
            seller.forEach(testFunction);

        }
        response(res, final).then(
            loggerinfo.info(req.connection.remoteAddress + " get seller list")
        );
    });


});

router.post('/addRole', upload.single("image"), (req, res) => {
    var searchQuery = checkToken(req, res, "seller" );
    if (searchQuery !== false) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"message":"expired token"});

            }else {
                if (req.body.role == null){
                    return res.status(400).json({"message": "role not found"});
                } else if ( addRoleInfoCheck(req, res, req.body.role) ) {
                    switch (req.body.role) {

                        case "seller":
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../uploads/seller/" + req.body.username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                fs.rename(tempPath, targetPath, err => {
                                    if (err) return handleError(err, res);
                                });


                            } else {
                                image = "notSetYet";
                            }
                            sequelize.transaction().then(function (t) {
                                Seller.create({
                                    id: req.body.phone_numberid,
                                    company_name: req.body.company_name,
                                    complete_address_description: req.body.complete_address_description,
                                    enabled: true,
                                    point: 0,
                                    registration_date_time: req.body.registration_date_time,
                                    google_map_address_link: req.body.google_map_address_link,
                                    logo_image: image,
                                    owner_family_name: req.body.owner_family_name,
                                    owner_name: req.body.owner_name,
                                    password: md5(req.body.password),
                                    owner_phone_number: req.body.owner_phone_number,
                                    username: req.body.username,
                                    company_address_cityid: req.body.company_address_cityid,
                                    phone_numberid: req.body.phone_numberid,
                                    typeid: 2

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    response(res, undefined).then(
                                        loggerinfo.info(req.connection.remoteAddress + "a seller added by " + req.body.phone_numberid + " phoneNumberid")
                                    );

                                }).catch(function (error) {
                                    loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"message": "seller signUped before "})
                                    }
                                    else {
                                        return res.status(400).json({"message": "Oops! Something went wrong!"})

                                    }
                                });
                            });


                            break;
                        case "transportation":
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../uploads/transportation/" + req.body.username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                fs.rename(tempPath, targetPath, err => {
                                    if (err) return handleError(err, res);
                                });


                            } else {
                                image = "notSetYet";
                            }
                            sequelize.transaction().then(function (t) {
                                transportation.create({
                                    air_conditionar: req.body.air_conditionar,
                                    birthdate: req.body.birthdate,
                                    color: req.body.color,
                                    description: req.body.description,
                                    family_name: req.body.family_name,
                                    name: req.body.name,
                                    image: image,
                                    pelak_number: req.body.pelak_number,
                                    phone_number: req.body.phone_number,
                                    password: md5(req.body.password),
                                    status: true,
                                    username: req.body.username,
                                    modelid: req.body.modelid,
                                    ware_houseid: req.body.ware_houseid

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    response(res, undefined).then(
                                        loggerinfo.info(req.connection.remoteAddress + "a transportation added by " + req.body.phone_number + " phoneNumber")
                                    );

                                }).catch(function (error) {
                                    loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"message": "transportation signUped before "})
                                    }
                                    else {
                                        return res.status(400).json({"message": "Oops! Something went wrong!"})

                                    }
                                });
                            });


                            break;
                        case "wareHouse":
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../uploads/wareHouse/" + req.body.username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                fs.rename(tempPath, targetPath, err => {
                                    if (err) return handleError(err, res);
                                });


                            } else {
                                image = "notSetYet";
                            }
                            sequelize.transaction().then(function (t) {
                                transportation.create({
                                    agent_family_name: req.body.agent_family_name,
                                    agent_name: req.body.agent_name,
                                    birthdate: req.body.birthdate,
                                    cell_phone_number: req.body.cell_phone_number,
                                    image: image,
                                    password: md5(req.body.password),
                                    phone_number: phone_number,
                                    point: 0,
                                    status: true,
                                    username: username,
                                    ware_house_complete_address_description: req.body.ware_house_complete_address_description,
                                    ware_house_google_map_address_link: req.body.ware_house_google_map_address_link,
                                    ware_house_address_cityid: req.body.ware_house_address_cityid,
                                    sellerid: req.body.sellerid

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    response(res, undefined).then(
                                        loggerinfo.info(req.connection.remoteAddress + "a wareHouse added by " + req.body.phone_number + " phoneNumber")
                                    );
                                }).catch(function (error) {
                                    loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"message": "wareHouse signUped before "})
                                    }
                                    else {
                                        return res.status(400).json({"message": "Oops! Something went wrong!"})

                                    }
                                });
                            });


                            break;
                        case "operator" :
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../uploads/operator/" + req.body.username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                fs.rename(tempPath, targetPath, err => {
                                    if (err) return handleError(err, res);
                                });


                            } else {
                                image = "notSetYet";
                            }
                            sequelize.transaction().then(function (t) {
                                transportation.create({
                                    birthdate: req.body.birthdate,
                                    family_name: req.body.family_name,
                                    image: image,
                                    name: req.body.name,
                                    password: md5(req.body.password),
                                    phone_number: phone_number,
                                    point: 0,
                                    status: true,
                                    username: username,
                                    sellerid: req.body.sellerid

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    response(res, undefined).then(
                                        loggerinfo.info(req.connection.remoteAddress + "a operator added by " + req.body.phone_number + " phoneNumber")
                                    );
                                }).catch(function (error) {
                                    loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"message": "operator signUped before "})
                                    }
                                    else {
                                        return res.status(400).json({"message": "Oops! Something went wrong!"})

                                    }
                                });
                            });

                            break;

                        default :
                            return res.status(404).json({"message": "invalid role type"});
                    }

                }


            }
        });



    }

});

router.post('/product', upload.single("image"), (req, res) => {

    var searchQuery = checkToken(req, res, "seller" );
    if (searchQuery !== false) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"message":"expired token"});

            }else {

                if (req.file != null) {
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
                    products.findAll({where: {id: req.body.productid}}).then(
                        products => {
                            if (!isThisArrayEmpty(products)) {
                                unit.findAll({where: {id: req.body.unitid}}).then(unit => {
                                    if (isThisArrayEmpty(unit)) {
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
                        sellerid: seller[0].id,
                        unitid: req.body.unitid

                    });
                    return res.status(200).json();


                }

            }
        });



    }




});

router.put('/product', upload.single("image"), (req, res) => {

    var searchQuery = checkToken(req, res, "seller" );
    if (searchQuery !== false) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"message":"expired token"});

            }else {

                if(
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
                    sellerProducts.findAll({where: {id: req.body.sellerproductid}}).then(
                        sellerproductid => {
                            if (isThisArrayEmpty(sellerproductid)) {
                                return res.status(404).json();
                            } else {

                                if (req.file != null) {
                                    const tempPath = req.file.path;
                                    const targetPath = path.join(__dirname, "./../uploads/products/" + Math.random() + path.extname(req.file.originalname).toLowerCase());
                                    image = targetPath;
                                    fs.rename(tempPath, targetPath, err => {
                                        if (err) return handleError(err, res);
                                    });


                                } else {
                                    image = sellerproductid[0].image;
                                }

                                products.findAll({where: {id: req.body.productid}}).then(
                                    products => {
                                        if (!isThisArrayEmpty(products)) {
                                            unit.findAll({where: {id: req.body.unitid}}).then(unit => {
                                                if (isThisArrayEmpty(unit)) {
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
                                    sellerid: seller[0].id,
                                    unitid: req.body.unitid
                                }, {
                                    where: {
                                        id: sellerproductid[0].id
                                    }
                                });
                                response(res, undefined).then(
                                    loggerinfo.info(req.connection.remoteAddress + "seller with id : " + seller[0].id + " edit product with productid :" + sellerproductid[0])
                                )


                            }
                        }
                    );


                }

            }
        });



    }





});

router.get('/product', (req, res) => {

    var searchQuery = checkToken(req, res, "seller" );
    if (searchQuery !== false) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"message":"expired token"});

            }else {

                var final = [];

                function getallproducts(value, index, array) {
                    var base64str = "not Found";
                    try {
                        base64str = base64_encode(value.image);

                    } catch (e) {
                        base64str = "not Found";

                    }

                    final[index] = {
                        id: value.id,
                        description: value.description,
                        price: value.price,
                        price_date_time: value.price_date_time,
                        supply_of_product: value.supply_of_product,
                        unit_of_product: value.unit_of_product,
                        productid: value.productid,
                        sellerid: value.sellerid,
                        unitid: value.unitid,
                        image: base64str
                    }
                }

                sellerProducts.findAll(
                    {
                        where: {
                            sellerid: seller[0].id
                        }
                    }
                ).then(sellerProducts => {
                        if (!isThisArrayEmpty(sellerProducts)) {
                            sellerProducts.forEach(getallproducts);
                            response(res, final).then(
                                loggerinfo.info(req.connection.remoteAddress + "seller with id : " + seller[0].id + " get all his/her products ")
                            )

                        } else {
                            return res.status(404).json();
                        }
                    }
                );

            }
        });



    }

});

router.get('/Subtypes', (req, res) => {

    var searchQuery = checkToken(req, res, "seller" );
    if (searchQuery !== false) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"message":"expired token"});

            }else {
                var wareHouselist= [];
                var operatorlist = [];

                sellerWareHouse.findAll({
                    where: {
                        sellerid: seller[0].id
                    }
                }).then(wareHouses => {
                    wareHouselist = wareHouses;
                });

                sellerOperator.findAll({
                    where: {
                        sellerid: seller[0].id
                    }
                }).then(sellerOperator => {
                    operatorlist = sellerOperator;
                });

                response(res, {
                    wareHouse: {wareHouselist},
                    operator: {operatorlist}
                }).then(
                    loggerinfo.info(req.connection.remoteAddress + "seller with id : " + seller[0].id + "get all his/her subtypes")
                );


            }
        });



    }


});

module.exports = router;

