const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {checkLimitTime, filterRequest, checkToken, response, isThisArrayEmpty, base64_encode, addRoleInfoCheck} = require('../Util/myFunctions');
const {loggererror, loggerinfo, colors, JWT_SECRET, upload} = require('../Util/myVars');
const {orderNazarSanji,orderProduct,Order, customer, sellerOperator, sellerPhoneNumber,Seller, sellerProducts, sellerWareHouse, transportation, sequelize, products, unit} = require('../../sequelize');
/*********************************************/
var jwt = require('jwt-simple');
var md5 = require('md5');
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const http = require("http");




//seller or Sales Representative

router.get('/list', (req, res) => {
    if (req.query.CityID == null) {
        return res.status(400).json({"message": "cityId not found"});
    }

    var final = [];

    function testFunction(value, index, array) {
        var base64str = "not Found";
        try {
            base64str = base64_encode(value.LogoImage);

        } catch (e) {
            base64str = "not Found";

        }

        final[index] = {
            ID:value.ID,
            Name: value.CompanyName,
            Image: base64str,
            TypeID:value.TypeID,
            OwnerName:value.OwnerName,
            OwnerFamilyName:value.OwnerFamilyName,
            EstablishedDate:value.EstablishedDate,
            RegistrationDateTime:value.RegistrationDateTime,
            Point:value.Point,
            PhoneNumberID:value.PhoneNumberID,
            CompanyAddressCityID:value.CompanyAddressCityID,
            CompleteAddressDescription:value.CompleteAddressDescription,
            GoogleMapAddressLink:value.GoogleMapAddressLink,
            OwnerPhoneNumber:value.OwnerPhoneNumber

        }
    }

    Seller.findAll({
        where: {
            TypeID: 1,
            CompanyAddressCityID: req.query.CityID
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

router.get('/Singlelist', (req, res) => {
    if (req.query.SellerID == null) {
        return res.status(400).json({"message": "SellerID not found"});
    }

    var final = [];

    function testFunction(value, index, array) {
        var base64str = "not Found";
        try {
            base64str = base64_encode(value.LogoImage);

        } catch (e) {
            base64str = "not Found";

        }

        final[index] = {
            ID:value.ID,
            Name: value.CompanyName,
            Image: base64str,
            TypeID:value.TypeID,
            OwnerName:value.OwnerName,
            OwnerFamilyName:value.OwnerFamilyName,
            EstablishedDate:value.EstablishedDate,
            RegistrationDateTime:value.RegistrationDateTime,
            Point:value.Point,
            PhoneNumberID:value.PhoneNumberID,
            CompanyAddressCityID:value.CompanyAddressCityID,
            CompleteAddressDescription:value.CompleteAddressDescription,
            GoogleMapAddressLink:value.GoogleMapAddressLink,
            OwnerPhoneNumber:value.OwnerPhoneNumber
        }
    }

    Seller.findAll({
        where: {
            ID: req.query.SellerID
        }
    }).then(seller => {
        if (!isThisArrayEmpty(seller)) {
            seller.forEach(testFunction);
            response(res, final).then(
                loggerinfo.info(req.connection.remoteAddress + " get seller list")
            );
        }

    });


});

router.post('/addRole', upload.single("Image"), (req, res) => {
    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {
                if (req.body.Role == null) {
                    return res.status(400).json({"code": 703});
                } else if (addRoleInfoCheck(req, res, req.body.Role)) {
                    switch (req.body.Role) {

                        case "seller":
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../../uploads/seller/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                    fs.rename(tempPath, targetPath, err => {
                                        if (err) return handleError(err, res);
                                    });
                                } else {
                                    fs.unlink(tempPath, err => {
                                        if (err) return handleError(err, res);

                                        return res
                                            .status(403)
                                            .contentType("text/plain")
                                            .end("this format of image is not under support");
                                    });
                                }



                            } else {
                                image = "notSetYet";
                            }
                            sequelize.transaction().then(function (t) {
                                Seller.create({
                                    ID: req.body.PhoneNumberID,
                                    CompanyName: req.body.CompanyName,
                                    CompleteAddressDescription: req.body.CompleteAddressDescription,
                                    Enable: true,
                                    Point: 0,
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
                                    TypeID: 2

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
                                        return res.status(400).json({"code": 705})
                                    }
                                    else {
                                        return res.status(400).json({"code": 706})

                                    }
                                });
                            });


                            break;
                        case "transportation":
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../../uploads/transportation/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                    fs.rename(tempPath, targetPath, err => {
                                        if (err) return handleError(err, res);
                                    });
                                } else {
                                    fs.unlink(tempPath, err => {
                                        if (err) return handleError(err, res);

                                        return res
                                            .status(403)
                                            .contentType("text/plain")
                                            .end("this format of image is not under support");
                                    });
                                }

                            } else {
                                image = "notSetYet";
                            }
                            sequelize.transaction().then(function (t) {
                                transportation.create({
                                    AirConditionar: req.body.AirConditionar,
                                    BirthDate: req.body.BirthDate,
                                    Color: req.body.Color,
                                    Description: req.body.Description,
                                    FamilyName: req.body.FamilyName,
                                    Name: req.body.Name,
                                    Image: image,
                                    PelakNumber: req.body.PelakNumber,
                                    PhoneNumber: req.body.PhoneNumber,
                                    Password: md5(req.body.Password),
                                    Status: true,
                                    Username: req.body.Username,
                                    ModelID: req.body.ModelID,
                                    WareHouseID: req.body.WareHouseID

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    response(res, undefined).then(
                                        loggerinfo.info(req.connection.remoteAddress + "a transportation added by " + req.body.PhoneNumber + " phoneNumber")
                                    );

                                }).catch(function (error) {
                                    loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"code": 707})
                                    }
                                    else {
                                        return res.status(400).json({"code": 500})

                                    }
                                });
                            });


                            break;
                        case "wareHouse":
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../../uploads/wareHouse/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                    fs.rename(tempPath, targetPath, err => {
                                        if (err) return handleError(err, res);
                                    });
                                } else {
                                    fs.unlink(tempPath, err => {
                                        if (err) return handleError(err, res);

                                        return res
                                            .status(403)
                                            .contentType("text/plain")
                                            .end("this format of image is not under support");
                                    });
                                }


                            } else {
                                image = "notSetYet";
                            }
                            sequelize.transaction().then(function (t) {
                                transportation.create({
                                    AgentFamilyName: req.body.AgentFamilyName,
                                    AgentName: req.body.AgentName,
                                    BirthDate: req.body.BirthDate,
                                    CellPhoneNumber: req.body.CellPhoneNumber,
                                    Image: image,
                                    Password: md5(req.body.Password),
                                    PhoneNumber: req.body.PhoneNumber,
                                    Point: 0,
                                    Status: true,
                                    Username: req.body.Username,
                                    WareHouseCompleteAddressDescription: req.body.WareHouseCompleteAddressDescription,
                                    WareHouseGoogleMapAddressLink: req.body.WareHouseGoogleMapAddressLink,
                                    WareHouseAddressCityID: req.body.WareHouseAddressCityID,
                                    SellerID: req.body.SellerID

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    response(res, undefined).then(
                                        loggerinfo.info(req.connection.remoteAddress + "a wareHouse added by " + req.body.PhoneNumber + " phoneNumber")
                                    );
                                }).catch(function (error) {
                                    loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"code": 706})
                                    }
                                    else {
                                        return res.status(400).json({"code": 500})

                                    }
                                });
                            });


                            break;
                        case "operator" :
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../../uploads/operator/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                    fs.rename(tempPath, targetPath, err => {
                                        if (err) return handleError(err, res);
                                    });
                                } else {
                                    fs.unlink(tempPath, err => {
                                        if (err) return handleError(err, res);

                                        return res
                                            .status(403)
                                            .contentType("text/plain")
                                            .end("this format of image is not under support");
                                    });
                                }


                            } else {
                                image = "notSetYet";
                            }
                            sequelize.transaction().then(function (t) {
                                transportation.create({
                                    BirthDate: req.body.BirthDate,
                                    FamilyName: req.body.FamilyName,
                                    Image: image,
                                    Name: req.body.Name,
                                    Password: md5(req.body.Password),
                                    PhoneNumber: req.body.PhoneNumber,
                                    Point: 0,
                                    Status: true,
                                    Username: req.body.Username,
                                    SellerID: req.body.SellerID

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    response(res, undefined).then(
                                        loggerinfo.info(req.connection.remoteAddress + "a operator added by " + req.body.PhoneNumber + " phoneNumber")
                                    );
                                }).catch(function (error) {
                                    loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"code": 708})
                                    }
                                    else {
                                        return res.status(400).json({"code": 500})

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

router.post('/product', upload.single("Image"), (req, res) => {

    var timeStatus = checkLimitTime(res);
    var searchQuery = checkToken(req, res);
    if (searchQuery && timeStatus) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {

                if (req.file != null) {
                    const tempPath = req.file.path;
                    const targetPath = path.join(__dirname, "./../../uploads/products/" + Math.random() + path.extname(req.file.originalname).toLowerCase());
                    image = targetPath;
                    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                        fs.rename(tempPath, targetPath, err => {
                            if (err) return handleError(err, res);
                        });
                    } else {
                        fs.unlink(tempPath, err => {
                            if (err) return handleError(err, res);

                            return res
                                .status(403)
                                .contentType("text/plain")
                                .end("this format of image is not under support");
                        });
                    }

                } else {
                    image = "notSetYet";
                }

                if (req.body.Description == null ||
                    req.body.Price == null ||
                    req.body.PriceDateTime == null ||
                    req.body.SupplyOfProduct == null ||
                    req.body.UnitOfProduct == null ||
                    req.body.ProductID == null ||
                    req.body.UnitID == null
                ) {
                    res.status(400).json({"code": 703});
                } else {
                    var status = true;
                    products.findAll({where: {id: req.body.ProductID}}).then(
                        products => {
                            if (!isThisArrayEmpty(products)) {
                                unit.findAll({where: {ID: req.body.UnitID}}).then(unit => {
                                    if (isThisArrayEmpty(unit)) {
                                        status = false;
                                        return res.status(404).json();

                                    }
                                })
                            } else {
                                status = false;
                                return res.status(404).json();
                            }
                        }
                    );
                    if (status){

                        sellerProducts.create({
                            Description: req.body.Description,
                            Image: image,
                            Price: req.body.Price,
                            PriceDateTime: req.body.PriceDateTime,
                            SupplyOfProduct: req.body.SupplyOfProduct,
                            UnitOfProduct: req.body.UnitOfProduct,
                            ProductID: req.body.ProductID,
                            SellerID: seller[0].ID,
                            UnitID: req.body.UnitID

                        });
                        return res.status(200).json();
                    }



                }

            }
        });


    }


});

router.put('/product', upload.single("Image"), (req, res) => {

    var timeStatus = checkLimitTime(res);
    var searchQuery = checkToken(req, res);
    if (searchQuery && timeStatus) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {

                if (
                    req.body.SellerProductID == null ||
                    req.body.Description == null ||
                    req.body.Price == null ||
                    req.body.PriceDateTime == null ||
                    req.body.SupplyOfProduct == null ||
                    req.body.UnitOfProduct == null ||
                    req.body.ProductID == null ||
                    req.body.UnitID == null
                ) {
                    res.status(400).json({"code": 703});
                } else {
                    sellerProducts.findAll({where: {ID: req.body.SellerProductID}}).then(
                        sellerproductid => {
                            if (isThisArrayEmpty(sellerproductid)) {
                                return res.status(404).json();
                            } else {

                                if (req.file != null) {
                                    const tempPath = req.file.path;
                                    const targetPath = path.join(__dirname, "./../../uploads/products/" + Math.random() + path.extname(req.file.originalname).toLowerCase());
                                    image = targetPath;
                                    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                        fs.rename(tempPath, targetPath, err => {
                                            if (err) return handleError(err, res);
                                        });
                                    } else {
                                        fs.unlink(tempPath, err => {
                                            if (err) return handleError(err, res);

                                            return res
                                                .status(403)
                                                .contentType("text/plain")
                                                .end("this format of image is not under support");
                                        });
                                    }


                                } else {
                                    image = sellerproductid[0].Image;
                                }

                                products.findAll({where: {ID: req.body.ProductID}}).then(
                                    products => {
                                        if (!isThisArrayEmpty(products)) {
                                            unit.findAll({where: {ID: req.body.UnitID}}).then(unit => {
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
                                    Description: req.body.Description,
                                    Image: image,
                                    Price: req.body.Price,
                                    PriceDateTime: req.body.PriceDateTime,
                                    SupplyOfProduct: req.body.SupplyOfProduct,
                                    UnitOfProduct: req.body.UnitOfProduct,
                                    ProductID: req.body.ProductID,
                                    SellerID: seller[0].ID,
                                    UnitID: req.body.UnitID
                                }, {
                                    where: {
                                        ID: sellerproductid[0].ID
                                    }
                                });
                                response(res, undefined).then(
                                    loggerinfo.info(req.connection.remoteAddress + "seller with id : " + seller[0].ID + " edit product with productid :" + sellerproductid[0])
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

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {

                var final = [];

                function getallproducts(value, index, array) {
                    var base64str = "not Found";
                    try {
                        base64str = base64_encode(value.Image);

                    } catch (e) {
                        base64str = "not Found";

                    }

                    final[index] = {
                        ID: value.ID,
                        Description: value.Description,
                        Price: value.Price,
                        PriceDateTime: value.PriceDateTime,
                        SupplyOfProduct: value.SupplyOfProduct,
                        UnitOfProduct: value.UnitOfProduct,
                        ProductID: value.ProductID,
                        SellerID: value.SellerID,
                        UnitID: value.UnitID,
                        Image: base64str
                    }
                }

                sellerProducts.findAll(
                    {
                        where: {
                            SellerID: seller[0].ID
                        }
                    }
                ).then(sellerProducts => {
                        if (!isThisArrayEmpty(sellerProducts)) {
                            sellerProducts.forEach(getallproducts);
                            response(res, final).then(
                                loggerinfo.info(req.connection.remoteAddress + "seller with id : " + seller[0].ID + " get all his/her products ")
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

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {

                sellerWareHouse.findAll({
                    where: {
                        SellerID: seller[0].ID
                    }
                }).then(wareHouses => {

                    sellerOperator.findAll({
                        where: {
                            SellerID: seller[0].ID
                        }
                    }).then(sellerOperator => {
                        response(res, {
                            WareHouse: {wareHouses},
                            Operator: {sellerOperator}
                        }).then(
                            loggerinfo.info(req.connection.remoteAddress + "seller with id : " + seller[0].Id + "get all his/her subtypes")
                        );

                    });
                });





            }
        });


    }


});

router.get('/orderProduct', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {


                return res.status(400).json({"code": 700});

            } else {
                orderProduct.findAll({where:{
                        SellerID:seller[0].id
                    }}).then(
                    orderProduct=>{
                        return res.json(orderProduct);
                    }

                );





            }
        });


    }


});

router.get('/Order', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {
        if (req.body.OrderID == null){
            return res.status(400).json({"code": 703});
        } else {
            Seller.findAll(searchQuery).then(seller => {

                if (isThisArrayEmpty(seller)) {


                    return res.status(400).json({"code": 700});

                } else {
                    Order.findAll({where:{
                            ID:req.body.OrderID
                        }}).then(
                        order=>{
                            return res.json(order);
                        }

                    );





                }
            });
        }




    }


});

router.get('/OrderDetail', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {
        if (req.body.OrderID == null){
            return res.status(400).json({"code": 703});
        } else {
            Seller.findAll(searchQuery).then(seller => {

                if (isThisArrayEmpty(seller)) {


                    return res.status(400).json({"code": 700});

                } else {
                    Order.findAll({where:{
                            ID:req.body.OrderID
                        }}).then(
                        order=>{
                            customer.findAll({where:{ID:order[0].CustomerID}}).then(
                                customerres=>{
                                    orderNazarSanji.findAll({where:{ID:order[0].NazarSanjiID}}).then(
                                        orderNazarSanjires=>{
                                            return res.json({
                                                nazarsanji:orderNazarSanjires,
                                                customer: customerres
                                            });
                                        }
                                    )

                                }
                            )
                        }

                    );





                }
            });
        }




    }


});

router.post('/disableUser', upload.single("Image"), (req, res) => {
    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {
                if (req.body.Role == null || req.body.ID) {
                    return res.status(400).json({"code": 703});
                } else {
                    switch (req.body.Role) {

                        case "seller":
                            Seller.update({Status:false},{where:{ID:req.body.ID}}).then(
                                tes=>{
                                    return res.json();
                                }
                            );
                            break;
                        case "transportation":
                            transportation.update({Status:false},{where:{ID:req.body.ID}}).then(
                                tes=>{
                                    return res.json();
                                }
                            );
                            break;
                        case "wareHouse":
                            sellerWareHouse.update({Status:false},{where:{ID:req.body.ID}}).then(
                                tes=>{
                                    return res.json();
                                }
                            );
                            break;
                        case "operator" :
                            sellerOperator.update({Status:false},{where:{ID:req.body.ID}}).then(
                                tes=>{
                                    return res.json();
                                }
                            );
                            break;

                        default :
                            return res.status(404).json({"message": "invalid role type"});
                    }

                }


            }
        });


    }

});




//operator


router.post('/operator/product', upload.single("Image"), (req, res) => {

    var timeStatus = checkLimitTime(res);
    var searchQuery = checkToken(req, res);
    if (searchQuery && timeStatus) {

        sellerOperator.findAll(searchQuery).then(selleroperator => {

            if (isThisArrayEmpty(selleroperator)) {

                return res.status(400).json({"code": 700});

            } else {

                if (req.file != null) {
                    const tempPath = req.file.path;
                    const targetPath = path.join(__dirname, "./../../uploads/products/" + Math.random() + path.extname(req.file.originalname).toLowerCase());
                    image = targetPath;
                    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                        fs.rename(tempPath, targetPath, err => {
                            if (err) return handleError(err, res);
                        });
                    } else {
                        fs.unlink(tempPath, err => {
                            if (err) return handleError(err, res);

                            return res
                                .status(403)
                                .contentType("text/plain")
                                .end("this format of image is not under support");
                        });
                    }

                } else {
                    image = "notSetYet";
                }

                if (req.body.Description == null ||
                    req.body.Price == null ||
                    req.body.PriceDateTime == null ||
                    req.body.SupplyOfProduct == null ||
                    req.body.UnitOfProduct == null ||
                    req.body.ProductID == null ||
                    req.body.UnitID == null
                ) {
                    res.status(400).json({"code": 703});
                } else {
                    var status = true;
                    products.findAll({where: {id: req.body.ProductID}}).then(
                        products => {
                            if (!isThisArrayEmpty(products)) {
                                unit.findAll({where: {ID: req.body.UnitID}}).then(unit => {
                                    if (isThisArrayEmpty(unit)) {
                                        status= false;
                                        return res.status(404).json();

                                    }
                                })
                            } else {
                                status=false;
                                return res.status(404).json();
                            }
                        }
                    );
                    if (status){
                        sellerProducts.create({
                            Description: req.body.Description,
                            Image: image,
                            Price: req.body.Price,
                            PriceDateTime: req.body.PriceDateTime,
                            SupplyOfProduct: req.body.SupplyOfProduct,
                            UnitOfProduct: req.body.UnitOfProduct,
                            ProductID: req.body.ProductID,
                            SellerID: selleroperator[0].SellerID,
                            UnitID: req.body.UnitID

                        });
                        return res.status(200).json();
                    }



                }

            }
        });


    }


});

router.post('/operator/orderProduct', (req, res) =>{
    var searchQuery = checkToken(req, res);
    var filteringStatus = filterRequest(req, res, "orderProduct");
    try {
        if (searchQuery && filteringStatus) {
            sellerOperator.findAll(searchQuery).then(operator => {
                if (!isThisArrayEmpty(operator)) {
                    orderProduct.findAll({where: {ID: req.body.ID}}).then(res => {
                        if (!isThisArrayEmpty(res)) {
                            if (res[0].SellerOperatorID === operator.ID) {
                                sellerWareHouse.findAll({where:{ID:req.body.WareHouseID}}).then(wareHouse=>{
                                    if (!isThisArrayEmpty(wareHouse)) {
                                        orderProduct.update({
                                            SellerOperatorStatus: req.body.Status,
                                            WareHouseID:req.body.WareHouseID
                                        }, {
                                            where: {
                                                ID: req.body.ID
                                            }
                                        }).then(
                                            response(res, undefined).then(
                                                loggerinfo.info("seller operator with id : " + operator.ID + " change orderProduct with id :" + res[0].ID + " operatorStatus to : " + req.body.Status)
                                            )
                                        );
                                    }
                                    else return res.json({"code":704});
                                })
                            }
                            else {
                                return res.status(400).json({"code": 702});
                            }
                        } else {
                            res.status(404).json({"code": 701});
                            return false;
                        }

                    });
                } else {
                    return res.status(404).json({"code": 700});
                }
            });

        }
    }catch (e) {
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
        res.status(500).json({"code":500});


    }

});





module.exports = router;

