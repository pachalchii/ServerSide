const express = require('express');
var router = express.Router();
/*********************************************/
const {application, Seller, customer, sequelize, sellerPhoneNumber} = require('../../sequelize');
const { checkUser, FilteringRequest, checkToken} = require('../Util/Filter');
const {upload} = require('../Util/configuration');
/*********************************************/
var md5 = require('md5');
/*********************************************/


router.post('/register', upload.single("Image"), (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                switch (req.body.Role) {
                    case "seller":
                        sequelize.transaction().then(function (t) {
                            Seller.create(data, {transaction: t}).then(()=>{
                                t.commit();
                                //todo sms must be send
                                return res.status(200).json()

                            }).catch((error)=>{
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
                        sequelize.transaction().then(()=>{
                            customer.create(data, {
                                transaction: t
                            }).then(()=>{
                                t.commit();
                                //todo sms must be send
                                return res.status(200).json();

                            }).catch(()=>{
                                t.rollback();
                                if (error.parent.errno === 1062) {
                                    return res.status(400).json({"code":717});
                                }
                                else {
                                    return res.status(500).json({"code":500});

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

router.post('/forgetPassword/request', (req, res) => {
 try{
    FilteringRequest(req, res, (err, data) => {
        if (err) {
            return res.status(err.HttpCode).json(err.response);
        } else {
            var authcode = Math.floor(Math.random() * 90000) + 10000;
            //todo sms must be send
            data.update({AuthCode: authcode}).then(() => {
                return res.json();
            })
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
                data.update({Password: md5(req.body.Password), AuthCode: "342241"}).then(() => {
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
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                checkUser(checkToken(req, res, req.body.Role), data, (err, data) => {
                    if (!err) {
                        application.findOne().then(
                            app => {
                                if (req.body.ClientVersion === app.ClientVersion) {
                                    return res.json({"data": {"forceUpdate": {Status: false}}});
                                } else {
                                    return res.json({
                                        "data": {
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
                });
            }
        });
    } catch (e) {
        return res.status(500).json({"code": 500})
    }

});

module.exports = router;

