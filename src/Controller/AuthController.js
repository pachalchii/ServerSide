const express = require('express');
let router = express.Router();
/*********************************************/
const {application, Seller,cities, customer, sequelize, addresses,sellerPhoneNumber} = require('../../sequelize');
const { checkUser, FilteringRequest,sendSMS, checkToken,isThisArrayEmpty,base64_encode} = require('../Util/Filter');
const {upload ,JWT_SECRET} = require('../Util/configuration');
const jwt = require("jwt-simple");
const asyncForEach = require('async-await-foreach');
/*********************************************/
let md5 = require('md5');
/*********************************************/


router.post('/register', upload.single("Image"), (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                switch (req.body.Role) {
                    case "seller":
                        sequelize.transaction().then((t)=>{
                            Seller.create(data, {transaction: t}).then(savedUser=>{
                                t.commit();
                                return res.status(200).json()

                            }).catch((error)=>{
                                console.log(error)
                                t.rollback();
                                if (error.parent.errno === 1062) {
                                    return res.status(400).json({"code":717});
                                }
                                else {
                                    console.log(error);
                                    return res.status(500).json({"code":500});

                                }
                            });
                        });
                        break;
                    case "customer":
                        sequelize.transaction().then((t)=>{
                            customer.findOne({where:{PhoneNumber:data.PhoneNumber}}).then(user=>{
                                if (user == null){
                                    customer.create(data, {
                                        transaction: t
                                    })
                                        .then(savedUser=>{
                                            t.commit();
                                            cities.findAll({where: {ID: req.body.CityID}}).then(
                                                city => {
                                                    if (!isThisArrayEmpty(city)) {

                                                        addresses.create({
                                                            CustomerID: savedUser.ID,
                                                            CityID: req.body.CityID,
                                                            GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                                            CompleteAddressDescription: req.body.CompleteAddressDescription,
                                                            CustomName: req.body.CustomName
                                                        }).then(()=>{
                                                            sendSMS(savedUser,"Register",savedUser.Name);
                                                            return res.status(200).json({PhoneNumber:savedUser.PhoneNumber});
                                                        });

                                                    } else {
                                                        return callback({
                                                            HttpCode: 404,
                                                            response: {"code": 710}
                                                        });
                                                    }
                                                }
                                            );


                                        })
                                        .catch((error)=>{
                                            t.rollback();
                                            if (error.parent.errno === 1062) {
                                                return res.status(400).json({"code":717});
                                            }
                                            else {
                                                return res.status(500).json({"code":500});

                                            }
                                        });
                                }
                                else {
                                    if (user.Name == null ){
                                        user.update(data, {
                                            transaction: t
                                        })
                                            .then(savedUser=>{
                                                t.commit();
                                                sendSMS(savedUser,"Register",savedUser.Name);
                                                cities.findAll({where: {ID: req.body.CityID}}).then(
                                                    city => {
                                                        if (!isThisArrayEmpty(city)) {
                                                            addresses.create({
                                                                CustomerID: savedUser.ID,
                                                                CityID: req.body.CityID,
                                                                GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                                                CompleteAddressDescription: req.body.CompleteAddressDescription,
                                                                CustomName: req.body.CustomName
                                                            }).then(()=>{
                                                                var payload = {
                                                                    PhoneNumber: savedUser.PhoneNumber,
                                                                    AuthCode: savedUser.AuthCode,
                                                                    Date: new Date().getTime()
                                                                };
                                                                var   base64str = base64_encode(savedUser.Image);
                                                                var token = jwt.encode(payload, JWT_SECRET);

                                                                return res.status(200).json({
                                                                    "data": {
                                                                        ID:customer.ID,
                                                                        BirthDate: savedUser.BirthDate,
                                                                        Image: base64str,
                                                                        CompanyName: savedUser.CompanyName,
                                                                        Enable: savedUser.Enable,
                                                                        Status: savedUser.Status,
                                                                        FamilyName: savedUser.FamilyName,
                                                                        Name: savedUser.Name,
                                                                        PhoneNumber: savedUser.PhoneNumber,
                                                                        Point: savedUser.Point,
                                                                        RegistrationDateTime: savedUser.RegistrationDateTime,
                                                                        Theme: savedUser.Theme,
                                                                        Username: savedUser.Username,
                                                                        Addressess:{
                                                                            CustomerID: savedUser.ID,
                                                                            CityID: req.body.CityID,
                                                                            GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                                                            CompleteAddressDescription: req.body.CompleteAddressDescription,
                                                                            CustomName: req.body.CustomName
                                                                        },
                                                                        Token: token
                                                                    }
                                                                });
                                                            });

                                                        } else {
                                                             callback({
                                                                HttpCode: 404,
                                                                response: {"code": 710}
                                                            });
                                                        }
                                                    }
                                                );


                                            })
                                            .catch((error)=>{
                                                t.rollback();
                                                if (error.parent.errno === 1062) {
                                                    return res.status(400).json({"code":717});
                                                }
                                                else {
                                                    return res.status(500).json({"code":500});

                                                }
                                            });
                                    } else {
                                        return res.status(500).json({"code":738});

                                    }

                                }
                            });

                        });
                        break;
                }
            }

        });


    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }


});

router.post('/login', (req, res) => {

    try {

        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json(data);
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }

});

router.post('/phoneNumber', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
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
            }


        });

    } catch (e) {
        return res.status(500).json({"code": 500})
    }
});

router.post('/guest/request', (req, res) => {
    try{
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                    return res.json();
            }


        });
    } catch (e) {
        return res.status(500).json({"code":500});
    }

});

router.post('/guest/verify', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {

                switch (req.body.Role) {
                    case "customer":
                        data.update({Enabled:true }).then(() => {
                            if (data.Name == null){
                                return res.json();
                            } else {
                                let  payload = {
                                    PhoneNumber: data.PhoneNumber,
                                    AuthCode: data.AuthCode,
                                    Date: new Date().getTime()
                                };

                                let    base64str = base64_encode(data.Image);

                                let  token = jwt.encode(payload, JWT_SECRET);
                                addresses.findAll({where: {CustomerID: data.ID}}).then(
                                    addresses => {
                                        let  newAdrress = [];
                                        asyncForEach(addresses, async item => {
                                            await cities.findOne({where: {ID: item.CityID}}).then(
                                                city => {
                                                    newAdrress.push({
                                                        ID: item.ID,
                                                        GoogleMapAddressLink: item.GoogleMapAddressLink,
                                                        CompleteAddressDescription: item.CompleteAddressDescription,
                                                        CustomName: item.CustomName,
                                                        CityName: city.Name
                                                    })
                                                }
                                            );
                                        }).then(answer => {
                                            return res.json( {
                                                "data": {
                                                    ID:data.ID,
                                                    BirthDate: data.BirthDate,
                                                    Image: base64str,
                                                    CompanyName: data.CompanyName,
                                                    Enable: data.Enable,
                                                    Status: data.Status,
                                                    FamilyName: data.FamilyName,
                                                    Name: data.Name,
                                                    PhoneNumber: data.PhoneNumber,
                                                    Point: data.Point,
                                                    RegistrationDateTime: data.RegistrationDateTime,
                                                    Theme: data.Theme,
                                                    Username: data.Username,
                                                    Token: token,
                                                    Addressess: newAdrress
                                                }
                                            });
                                        });

                                    }
                                );
                            }
                        })
                        break;
                    case "transportation":
                        data.update({Enabled:true }).then(() => {
                                let  payload = {
                                    PhoneNumber: data.PhoneNumber,
                                    AuthCode: data.AuthCode,
                                    Date: new Date().getTime()
                                };

                                let    base64str = base64_encode(data.Image);

                                let  token = jwt.encode(payload, JWT_SECRET);

                                            return res.json( {
                                                "data": {
                                                    ID:data.ID,
                                                    WareHouseID: data.WareHouseID,
                                                    Image: base64str,
                                                    Name: data.Name,
                                                    TransportationType: data.TransportationType,
                                                    FamilyName: data.FamilyName,
                                                    Username: data.Username,
                                                    Birthdate: data.Birthdate,
                                                    Enabled: data.Enabled,
                                                    PhoneNumber: data.PhoneNumber,
                                                    Status: data.Status,
                                                    Point: data.Point,
                                                    AirConditionar: data.AirConditionar,
                                                    Description: data.Description,
                                                    ModelID: data.ModelID,
                                                    Token: token,
                                                    PelakNumber: data.PelakNumber
                                                }
                                            });




                        })
                        break;
                }

            }
        });
    } catch (e) {
        return res.status(500).json({"code": 500})
    }

});

router.post('/forgetPassword/request', (req, res) => {
 try{
    FilteringRequest(req, res, (err, data) => {
        if (err) {
            return res.status(err.HttpCode).json(err.response);
        } else {
            let authCode = Math.floor(Math.random() * 90000) + 10000;
            sendSMS(data,"ForgetPassword",authCode);
            data.update({AuthCode: authCode}).then(() => {
                return res.json();
            })
        }
    });
} catch (e) {
    return res.status(500).json({"code":500});
}

});

router.post('/forgetPassword/resend', (req, res) => {
    try{
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {

                sendSMS(data,"ForgetPassword",data.AuthCode);
                    return res.json();
            }


        });
    } catch (e) {
        return res.status(500).json({"code":500});
    }

});

router.post('/forgetPassword/verify', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({IsForgetPasswordVerified:true , AuthCode: null}).then(() => {
                    return res.json();
                })
            }
        });
    } catch (e) {
        return res.status(500).json({"code": 500})
    }

});

router.post('/forgetPassword/changePassword', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({IsForgetPasswordVerified:false,AuthCode:null,Password:md5(req.body.Password) }).then(() => {
                    return res.json();
                })
            }
        });
    } catch (e) {
        return res.status(500).json({"code": 500})
    }

});

router.post('/tokenCheck', (req, res) => {
    try {
        FilteringRequest(req, res, (err, newdata) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                checkToken(req, res, async (err, data) =>{
                    if (!err){
                        checkUser( req.header['token']  , newdata, (err, data) => {

                                application.findOne().then(
                                    app => {
                                        if (req.body.ClientVersion === app.ClientVersion) {
                                            return res.json({"data": {
                                                "tokenStatus":"success",
                                                "forceUpdate": {Status: false}}});
                                        } else {
                                            return res.json({
                                                "data": {
                                                    "tokenStatus":"success",
                                                    "forceUpdate": {
                                                        Status: true,
                                                        UpdateMessage: app.UpdateMessage,
                                                        newVersion: app.ClientVersion,
                                                        UpdateLink: app.UpdateLink
                                                    }
                                                }
                                            });
                                        }
                                    }
                                );

                        });
                    }else {
                        application.findOne().then(
                            app => {
                                if (req.body.ClientVersion === app.ClientVersion) {
                                    return res.json({"data": {
                                            "tokenStatus":"failed",
                                            "forceUpdate": {Status: false}}});
                                } else {
                                    return res.json({
                                        "data": {
                                            "tokenStatus":"failed",
                                            "forceUpdate": {
                                                Status: true,
                                                UpdateMessage: app.UpdateMessage,
                                                newVersion: app.ClientVersion,
                                                UpdateLink: app.UpdateLink
                                            }
                                        }
                                    });
                                }
                            }
                        );
                    }
                })
            }
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({"code": 500})
    }

});

module.exports = router;

