const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {application, support, Seller, customer, sequelize, sellerPhoneNumber, transportation, sellerWareHouse, sellerOperator} = require('../../sequelize');
const {checkPassword, checkStatus,checkUser, checkToken, checkPhone, isThisArrayEmpty, base64_encode, loginInfoCheck, registerInfoCheck} = require('../Util/myFunctions');
const {SmsApi, upload, colors, JWT_SECRET, handleError} = require('../Util/myVars');
/*********************************************/
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const http = require("http");
var md5 = require('md5');
const Op = sequelize.Op;
var jwt = require('jwt-simple');
/*********************************************/


router.post('/register', upload.single("Image"), (req, res) => {

    try {

        if (req.body.Role == null) {
            return res.status(400).json({"message": "role parameter not recieved"});
        } else {


            var role = req.body.Role;
            var image;
            var status = true;
            switch (role) {
                case "customer":
                    if (registerInfoCheck(req, res, role)) {
                        var statuss = true;
                        if (req.file != null) {

                            const tempPath = req.file.path;
                            const targetPath = path.join(__dirname, "./../../uploads/customer/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                            image = targetPath;
                            if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG") {
                                fs.rename(tempPath, targetPath, err => {
                                    if (err) {status = false;
                                    return handleError(err, res);}
                                });
                                fs.unlink(tempPath, err => {});
                            } else {
                                fs.unlink(tempPath, err => {
                                    if (err) { status = false ; return handleError(err, res);}

                                    return res
                                        .status(403)
                                        .contentType("text/plain")
                                        .end("this format of image is not under support");
                                });
                            }


                        } else {
                            image = "notSetYet";
                        }
                        if (status) {
                            sequelize.transaction().then(function (t) {
                                customer.create({
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

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    SmsApi.Send({
                                            message: "ثبت نام شما با موفقیت انجام شد",
                                            sender: "10004346",
                                            receptor: req.body.PhoneNumber
                                        },
                                        function (response, status) {

                                        });
                                    return res.status(200).json();


                                }).catch(function (error) {
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"message": "customer signUped before"})
                                    }
                                    else {
                                        return res.status(400).json({"message": "Oops! Something went wrong!"})

                                    }
                                });
                            });

                        }


                    }

                    break;
                case "seller":
                    if (registerInfoCheck(req, res, role)) {
                        if (req.file != null) {
                            const tempPath = req.file.path;
                            const targetPath = path.join(__dirname, "./../../uploads/seller/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                            image = targetPath;

                            if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG") {
                                fs.rename(tempPath, targetPath, err => {
                                    if (err) {status = false;
                                    return handleError(err, res);}
                                    fs.unlink(tempPath, err => {});

                                });
                            } else {
                                fs.unlink(tempPath, err => {
                                    if (err) {status = false ; return handleError(err, res);}

                                    res
                                        .status(403)
                                        .contentType("text/plain")
                                        .end("this format of image is not under support");
                                });
                            }

                        } else {
                            image = "notSetYet";
                        }
                        if (status) {
                            sequelize.transaction().then(function (t) {
                                Seller.create({
                                    ID: req.body.PhoneNumberID,
                                    CompanyName: req.body.CompanyName,
                                    CompleteAddressDescription: req.body.CompleteAddressDescription,
                                    Status: true,
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
                                    TypeID: 1

                                }, {
                                    transaction: t
                                }).then(function () {
                                    t.commit();
                                    SmsApi.Send({
                                            message: "ثبت نام شما با موفقیت انجام شد",
                                            sender: "10004346",
                                            receptor: req.body.PhoneNumber
                                        },
                                        function (response, status) {

                                        });
                                    return res.status(200).json()

                                }).catch(function (error) {
                                    t.rollback();
                                    if (error.parent.errno === 1062) {
                                        return res.status(400).json({"message": "seller signUped before"})
                                    }
                                    else {
                                        console.log(error);
                                        return res.status(400).json({"message": "Oops! Something went wrong!"})

                                    }
                                });
                            });
                        }

                    }

                    break;
                default:
                    return res.status(404).json({"message": "wrong role name"})
            }

        }
    } catch (e) {
        return res.status(500).json({"message": "Oops! Something went wrong!"})
    }


});

router.post('/login', (req, res) => {

    try {

        if (req.body.Role == null) {
            return res.status(400).json({"code": 703});
        } else {

            var role = req.body.Role;
            switch (role) {
                case "customer":
                    if (loginInfoCheck(req, res)) {

                        if (req.body.PhoneNumber != null) {
                            customer.findAll({
                                where: {
                                    PhoneNumber: req.body.PhoneNumber, password: md5(req.body.Password)
                                }
                            }).then(customer => {
                                if (!isThisArrayEmpty(customer)) {
                                    var payload = {
                                        PhoneNumber: customer[0].PhoneNumber,
                                        Password: customer[0].Password,
                                        random: Math.random()
                                    };
                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(customer[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);

                                    return res.json({
                                        "data": {

                                            BirthDate: customer[0].BirthDate,
                                            Image: base64str,
                                            CompanyName: customer[0].CompanyName,
                                            Enable: customer[0].Enable,
                                            Status: customer[0].Status,
                                            FamilyName: customer[0].FamilyName,
                                            Name: customer[0].Name,
                                            PhoneNumbero: customer[0].PhoneNumber,
                                            Point: customer[0].Point,
                                            RegistrationDateTime: customer[0].RegistrationDateTime,
                                            Theme: customer[0].Theme,
                                            Username: customer[0].Username,
                                            CityID: customer[0].CityID,
                                            Token: token
                                        }
                                    }).then(
                                    );

                                } else {
                                    return res.status(404).json();
                                }


                            });
                        } else {
                            customer.findAll({
                                where: {
                                    Username: req.body.Username, Password: md5(req.body.Password)
                                }
                            }).then(customer => {
                                if (!isThisArrayEmpty(customer)) {
                                    var payload = {
                                        Username: customer[0].Username,
                                        Password: customer[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(customer[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);

                                    return res.json({
                                        "data": {

                                            BirthDate: customer[0].BirthDate,
                                            Image: base64str,
                                            CompanyName: customer[0].CompanyName,
                                            Enable: customer[0].Enable,
                                            Status: customer[0].Status,
                                            FamilyName: customer[0].FamilyName,
                                            Name: customer[0].Name,
                                            PhoneNumber: customer[0].PhoneNumber,
                                            Point: customer[0].Point,
                                            RegistrationDateTime: customer[0].RegistrationDateTime,
                                            Theme: customer[0].Theme,
                                            Username: customer[0].Username,
                                            CityID: customer[0].CityID,
                                            Token: token
                                        }
                                    }).then(
                                    );

                                } else {
                                    return res.status(404).json();

                                }


                            });
                        }
                    }


                    break;
                case "seller":
                    if (loginInfoCheck(req, res)) {
                        if (req.body.PhoneNumber != null) {
                            Seller.findAll({
                                where: {
                                    OwnerPhoneNumber: req.body.PhoneNumber, password: md5(req.body.Password)
                                }
                            }).then(seller => {
                                if (!isThisArrayEmpty(seller)) {
                                    var payload = {
                                        OwnerPhoneNumber: seller[0].OwnerPhoneNumber,
                                        Password: seller[0].Password,
                                        random: Math.random()
                                    };
                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(seller[0].LogoImage);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);

                                    return res.json({
                                        "data": {

                                            ID: seller[0].PhoneNumberID,
                                            CompanyName: seller[0].CompanyName,
                                            CompleteAddressDescription: seller[0].CompleteAddressDescription,
                                            Enable: seller[0].Enable,
                                            Point: seller[0].Point,
                                            RegistrationDateTime: seller[0].RegistrationDateTime,
                                            GoogleMapAddressLink: seller[0].GoogleMapAddressLink,
                                            LogoImage: base64str,
                                            OwnerFamilyName: seller[0].OwnerFamilyName,
                                            OwnerName: seller[0].OwnerName,
                                            Password: seller[0].Password,
                                            OwnerPhoneNumber: seller[0].OwnerPhoneNumber,
                                            Username: seller[0].Username,
                                            CompanyAddressCityID: seller[0].CompanyAddressCityID,
                                            PhoneNumberID: seller[0].PhoneNumberID,
                                            TypeID: seller[0].TypeID,
                                            Token: token
                                        }
                                    });


                                } else {
                                    return res.status(404).json();
                                }


                            });
                        } else {
                            Seller.findAll({
                                where: {
                                    Username: req.body.Username, Password: md5(req.body.Password)
                                }
                            }).then(seller => {
                                if (!isThisArrayEmpty(seller)) {
                                    var payload = {
                                        Username: seller[0].Username,
                                        Password: seller[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(seller[0].LogoImage);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);


                                    response(res, {
                                        "data": {

                                            ID: seller[0].PhoneNumberID,
                                            CompanyName: seller[0].CompanyName,
                                            CompleteAddressDescriptionp: seller[0].CompleteAddressDescriptionp,
                                            Enable: seller[0].Enable,
                                            Point: seller[0].Point,
                                            RegistrationDateTime: seller[0].RegistrationDateTime,
                                            GoogleMapAddressLink: seller[0].GoogleMapAddressLink,
                                            LogoImage: base64str,
                                            OwnerFamilyName: seller[0].OwnerFamilyName,
                                            OwnerName: seller[0].OwnerName,
                                            Password: seller[0].Password,
                                            OwnerPhoneNumber: seller[0].OwnerPhoneNumber,
                                            Username: seller[0].Username,
                                            CompanyAddressCityID: seller[0].CompanyAddressCityID,
                                            PhoneNumberID: seller[0].PhoneNumberID,
                                            TypeID: seller[0].TypeID,
                                            Token: token
                                        }
                                    });

                                } else {
                                    return res.status(404).json();

                                }


                            });
                        }
                    }

                    break;
                case "transportation":
                    if (loginInfoCheck(req, res)) {
                        if (req.body.PhoneNumber != null) {
                            transportation.findAll({
                                where: {
                                    PhoneNumber: req.body.PhoneNumber, Password: md5(req.body.Password)
                                }
                            }).then(trans => {
                                if (!isThisArrayEmpty(trans)) {
                                    var payload = {
                                        PhoneNumber: trans[0].PhoneNumber,
                                        password: trans[0].password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(trans[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);

                                    return res.json({
                                        "data": {

                                            ID: trans[0].PhoneNumberID,
                                            AirConditionar: trans[0].AirConditionar,
                                            Color: trans[0].Color,
                                            Description: trans[0].Description,
                                            FamilyName: trans[0].FamilyName,
                                            Image: base64str,
                                            Name: trans[0].Name,
                                            PelakNumber: trans[0].PelakNumber,
                                            PhoneNumber: trans[0].PhoneNumber,
                                            Point: trans[0].Point,
                                            Username: trans[0].Username,
                                            ModelID: trans[0].ModelID,
                                            WareHouseID: trans[0].WareHouseID,
                                            Token: token
                                        }
                                    });

                                } else {
                                    return res.status(404).json();
                                }


                            });
                        } else {
                            transportation.findAll({
                                where: {
                                    Username: req.body.Username, Password: md5(req.body.Password)
                                }
                            }).then(trans => {
                                if (!isThisArrayEmpty(trans)) {
                                    var payload = {
                                        Username: trans[0].Username,
                                        Password: trans[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(trans[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);


                                    return res.json({
                                        "data": {

                                            ID: trans[0].PhoneNumberID,
                                            AirConditionar: trans[0].AirConditionar,
                                            Color: trans[0].Color,
                                            Description: trans[0].Description,
                                            FamilyName: trans[0].FamilyName,
                                            Image: base64str,
                                            Name: trans[0].Name,
                                            PelakNumber: trans[0].PelakNumber,
                                            PhoneNumber: trans[0].PhoneNumber,
                                            Point: trans[0].Point,
                                            Username: trans[0].Username,
                                            ModelID: trans[0].ModelID,
                                            WareHouseID: trans[0].WareHouseID,
                                            Token: token
                                        }
                                    });

                                } else {
                                    return res.status(404).json();

                                }


                            });
                        }
                    }

                    break;
                case "support":
                    if (loginInfoCheck(req, res)) {
                        if (req.body.PhoneNumber != null) {
                            support.findAll({
                                where: {
                                    PhoneNumber: req.body.PhoneNumber, password: md5(req.body.Password)
                                }
                            }).then(support => {
                                if (!isThisArrayEmpty(support)) {
                                    var payload = {
                                        PhoneNumber: support[0].PhoneNumber,
                                        Password: support[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(support[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);

                                    return res.json({
                                        "data": {

                                            ID: support[0].ID,
                                            Image: base64str,
                                            Name: support[0].Name,
                                            FamilyName: support[0].FamilyName,
                                            Username: support[0].Username,
                                            Token: token

                                        }
                                    });
                                } else {
                                    return res.status(404).json();
                                }


                            });
                        } else {
                            support.findAll({
                                where: {
                                    Username: req.body.Username, password: md5(req.body.Password)
                                }
                            }).then(support => {
                                if (!isThisArrayEmpty(support)) {
                                    var payload = {
                                        Username: support[0].Username,
                                        Password: support[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(support[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);


                                    return res.json({
                                        "data": {

                                            ID: support[0].ID,
                                            Name: support[0].Name,
                                            Image: base64str,
                                            FamilyName: support[0].FamilyName,
                                            Username: support[0].Username,
                                            Token: token

                                        }
                                    });

                                } else {
                                    return res.status(404).json();

                                }


                            });
                        }
                    }

                    break;
                case "wareHouse":
                    if (loginInfoCheck(req, res)) {

                        if (req.body.PhoneNumber != null) {
                            sellerWareHouse.findAll({
                                where: {
                                    PhoneNumber: req.body.PhoneNumber, password: md5(req.body.Password)
                                }
                            }).then(wareHouse => {
                                if (!isThisArrayEmpty(wareHouse)) {
                                    var payload = {
                                        PhoneNumber: wareHouse[0].PhoneNumber,
                                        Password: wareHouse[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(wareHouse[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);

                                    return res.json({
                                        "data": {

                                            ID: wareHouse[0].PhoneNumberID,
                                            AgentFamilyName: wareHouse[0].AgentFamilyName,
                                            AgentName: wareHouse[0].AgentName,
                                            BirthDate: wareHouse[0].BirthDate,
                                            CellPhoneNumber: wareHouse[0].CellPhoneNumber,
                                            Image: base64str,
                                            PhoneNumberID: wareHouse[0].PhoneNumber,
                                            Point: wareHouse[0].Point,
                                            Username: wareHouse[0].Username,
                                            WareHouseCompleteAddressDescriptione: wareHouse[0].WareHouseCompleteAddressDescriptione,
                                            WareHouseGoogleMapAddressLink: wareHouse[0].WareHouseGoogleMapAddressLink,
                                            WareHouseAddressCityID: wareHouse[0].WareHouseAddressCityID,
                                            SellerIDr: wareHouse[0].SellerID,
                                            Token: token
                                        }
                                    });
                                } else {
                                    return res.status(404).json();
                                }


                            });
                        } else {
                            sellerWareHouse.findAll({
                                where: {
                                    Username: req.body.Username, password: md5(req.body.Password)
                                }
                            }).then(wareHouse => {
                                if (!isThisArrayEmpty(wareHouse)) {
                                    var payload = {
                                        Username: wareHouse[0].Username,
                                        Password: wareHouse[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(wareHouse[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);


                                   return res.json({
                                        "data": {

                                            ID: wareHouse[0].PhoneNumberID,
                                            AgentFamilyName: wareHouse[0].AgentFamilyName,
                                            AgentName: wareHouse[0].AgentName,
                                            BirthDate: wareHouse[0].BirthDate,
                                            CellPhoneNumber: wareHouse[0].CellPhoneNumber,
                                            Image: base64str,
                                            PhoneNumber: wareHouse[0].PhoneNumber,
                                            Username: wareHouse[0].Username,
                                            Point: wareHouse[0].Point,
                                            WareHouseCompleteAddressDescription: wareHouse[0].WareHouseCompleteAddressDescription,
                                            WareHouseGoogleMapAddressLink: wareHouse[0].WareHouseGoogleMapAddressLink,
                                            WareHouseAddressCityID: wareHouse[0].WareHouseAddressCityID,
                                            SellerID: wareHouse[0].SellerID,
                                            Token: token
                                        }
                                    });

                                } else {
                                    return res.status(404).json();

                                }


                            });
                        }
                    }

                    break;
                case "operator":
                    if (loginInfoCheck(req, res)) {
                        if (req.body.PhoneNumber != null) {
                            sellerOperator.findAll({
                                where: {
                                    PhoneNumber: req.body.PhoneNumber, password: md5(req.body.Password)
                                }
                            }).then(operator => {
                                if (!isThisArrayEmpty(operator)) {
                                    var payload = {
                                        PhoneNumber: operator[0].PhoneNumber,
                                        Password: operator[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(operator[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);

                                    return res.json({
                                        "data": {

                                            ID: operator[0].PhoneNumberID,
                                            FamilyName: operator[0].FamilyName,
                                            Name: operator[0].Name,
                                            BirthDate: operator[0].BirthDate,
                                            PhoneNumber: operator[0].PhoneNumber,
                                            Image: base64str,
                                            Point: operator[0].Point,
                                            Username: operator[0].Username,
                                            SellerID: operator[0].SellerID,
                                            Token: token


                                        }
                                    });
                                } else {
                                    return res.status(404).json();
                                }


                            });
                        } else {
                            sellerOperator.findAll({
                                where: {
                                    Username: req.body.Username, Password: md5(req.body.Password)
                                }
                            }).then(operator => {
                                if (!isThisArrayEmpty(operator)) {
                                    var payload = {
                                        Username: operator[0].Username,
                                        Password: operator[0].Password,
                                        random: Math.random()
                                    };


                                    var base64str = "not Found";
                                    try {
                                        base64str = base64_encode(operator[0].Image);

                                    } catch (e) {
                                        base64str = "not Found";

                                    }
                                    var token = jwt.encode(payload, JWT_SECRET);


                                    return res.json({
                                        "data": {

                                            ID: operator[0].PhoneNumberID,
                                            FamilyName: operator[0].FamilyName,
                                            Name: operator[0].Name,
                                            BirthDate: operator[0].BirthDate,
                                            PhoneNumber: operator[0].PhoneNumber,
                                            Image: base64str,
                                            Point: operator[0].Point,
                                            Username: operator[0].Username,
                                            SellerID: operator[0].SellerID,
                                            Token: token


                                        }
                                    });

                                } else {
                                    return res.status(404).json();

                                }


                            });
                        }
                    }

                    break;

                default:
                    return res.status(404).json({"message": "wrong role name"})
            }


        }

    } catch (e) {
        return res.status(500).json({"message": "Oops! Something went wrong!"})
    }

});

router.post('/phoneNumber', (req, res) => {
    try {

        sequelize.transaction().then(function (t) {
            sellerPhoneNumber.create({

                PhoneNumber1: "NotSetYet" || req.body.PhoneNumber1,
                PhoneNumber2: "NotSetYet" || req.body.PhoneNumber2,
                PhoneNumber3: "NotSetYet" || req.body.PhoneNumber3,
                PhoneNumber4: "NotSetYet" || req.body.PhoneNumber4,
                PhoneNumber5: "NotSetYet" || req.body.PhoneNumber5,

            }, {
                transaction: t
            }).then(savedNumber => {
                t.commit();
                return res.json({"data": {"id": savedNumber.ID}});
            }).catch(function (error) {
                t.rollback();
                return res.status(500).json({"code": 500})
            });
        });


    } catch (e) {
        return res.status(500).json({"code": 500})
    }
});

router.post('/forgetPassword', (req, res) => {
    if (req.body.PhoneNumber == null || req.body.Role == null) {
        if (checkPhone(req,res)){
            var Entity ="";
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
                    return res.status(404).json({"message": "role is wrong "});
            }
            Entity.findAll({where: {PhoneNumber: req.body.PhoneNumber}}).then(
                objects => {
                    if (!isThisArrayEmpty(objects)) {
                        if (objects[0].Status) {
                            var authcode = Math.floor(Math.random() * 90000) + 10000;
                            Entity.update({AuthCode: authcode}, {where: {PhoneNumber: req.body.PhoneNumber}}).then(obj => {
                                return res.json();
                            })


                        } else {
                            return res.status(404).json({"code": 900});
                        }
                    } else {
                        return res.status(404).json();

                    }
                }
            );
        }else {
            return res.status(404).json({"code": 712});
        }
    } else {
        return res.status(404).json({"code": 703});

    }


});

router.post('/forgetPassword/submit', (req, res) => {
    if (req.body.PhoneNumber == null || req.body.code == null || req.body.Password == null || req.body.Role == null) {
        if (checkPassword(req, res)) {
            if (checkPhone(req,res)){

                var Entity ="";
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
                        return res.status(404).json({"message": "role is wrong "});
                }
                Entity.findAll({where: {PhoneNumber: req.body.PhoneNumber}}).then(
                    objects => {
                        if (!isThisArrayEmpty(objects)) {
                            if (objects[0].Status) {
                                if (objects[0].AuthCode === req.body.code) {

                                    Entity.update({Password: md5(req.body.Password)}, {where: {PhoneNumber: req.body.PhoneNumber}}).then(obj => {
                                        return res.json();
                                    })
                                } else {
                                    return res.status(404).json({"code": 715});
                                }
                            } else {
                                return res.status(404).json({"code": 900});
                            }
                        } else {
                            return res.status(404).json();

                        }
                    }
                );
            }else {
                return res.status(404).json({"code": 712});
            }

        }else {
            return res.status(404).json({"code": 712});
        }

    } else {
        return res.status(404).json({"code": 703});
    }


});

router.post('/tokenCheck', (req, res) => {
    if (req.body.Role == null || req.body.ClientVersion == null) {
        return res.status(400).json({"code": 703});
    }else {
        switch (req.body.Role) {
            case "seller":

                checkUser(checkToken(req, res, req.body.Role),Seller ,(err,data)=>{
                    if (!err){
                        application.findAll().then(
                            app => {
                                if (req.body.ClientVersion === app[0].ClientVersion) {
                                    return res.json({"data": {"forceUpdate": false}});
                                } else {
                                    return res.json({"data": {"forceUpdate": true}});
                                }
                            }
                        );
                    }
                });

                break;
            case "customer":
                checkUser(checkToken(req, res, req.body.Role),customer ,(err,data)=>{
                    if (!err){
                        application.findAll().then(
                            app => {
                                if (req.body.ClientVersion === app[0].ClientVersion) {
                                    return res.json({"data": {"forceUpdate": false}});
                                } else {
                                    return res.json({"data": {"forceUpdate": true}});
                                }
                            }
                        );
                    }
                });
                break;
            case "transportation":
                checkUser(checkToken(req, res, req.body.Role),transportation ,(err,data)=>{
                    if (!err){
                        application.findAll().then(
                            app => {
                                if (req.body.ClientVersion === app[0].ClientVersion) {
                                    return res.json({"data": {"forceUpdate": false}});
                                } else {
                                    return res.json({"data": {"forceUpdate": true}});
                                }
                            }
                        );
                    }
                });
                break;

        }

    }



});

module.exports = router;

