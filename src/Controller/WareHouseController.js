const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {sequelize,transportation,sellerWareHouse,Seller , cities , sellerType , productGroups , products , sellerProducts , unit ,  car} = require('../../sequelize');
const {loggererror,upload,selfDestroyKey , colors , loggerinfo} = require('../Util/myVars');
const {addRoleInfoCheck,base64_encode,checkToken,response , isThisArrayEmpty } = require("../Util/myFunctions");
var path = require('path');
const fs = require("fs");
var md5 = require('md5');

const rimraf = require("rimraf");
/*********************************************/


router.get('/transportation', (req, res) => {
    var searchQuery = checkToken(req, res);
    try {
        if (searchQuery) {
            sellerWareHouse.findAll(searchQuery).then(
                sellerWareHouse => {
                    if (!isThisArrayEmpty(sellerWareHouse)) {
                        if (sellerWareHouse[0].Status){
                            transportation.findAll({where:{
                                    WareHouseID:sellerWareHouse[0].ID
                                }}).then(
                                transportation=>{
                                    var  tranOperatorfinal=[];
                                    function tranIteration(value,index) {
                                        var base64str = "not Found";
                                        try {
                                            base64str = base64_encode(value.Image);

                                        } catch (e) {
                                            base64str = "not Found";

                                        }
                                        tranOperatorfinal[index] = {
                                            ID: value.ID,
                                            WareHouseID: value.WareHouseID,
                                            Name : value. 	Name ,
                                            FamilyName : value.FamilyName ,
                                            Username: value.Username,
                                            Birthdate: value.Birthdate,
                                            PhoneNumber: value.PhoneNumber,
                                            CellPhoneNumber: value.CellPhoneNumber,
                                            Status: value.Status,
                                            Point: value.Point,
                                            Image: base64str,
                                            ModelID: value.ModelID
                                            , PelakNumber: value.PelakNumber,
                                            AirConditionar: value.AirConditionar,
                                            Description:value.Description

                                        };
                                    }
                                    transportation.forEach(tranIteration);
                                    return res.json(tranOperatorfinal);
                                }
                            );
                        }else {
                            return res.status(404).json({"code": 900});

                        }


                    } else {
                        return res.status(404).json({"code": 700});
                    }
                }
            );


        }


    } catch (e) {
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
        res.status(500).json({"code": 500});


    }
});

router.post('/orderProduct', (req, res) =>{
    var searchQuery = checkToken(req, res);
    var filteringStatus = filterRequest(req, res, "WorderProduct");
    try {
        if (searchQuery && filteringStatus) {
            sellerWareHouse.findAll(searchQuery).then(ware => {
                if (!isThisArrayEmpty(ware)) {
                    if (ware[0].Status){
                        orderProduct.findAll({where: {ID: req.body.ID}}).then(res => {
                            if (!isThisArrayEmpty(res)) {
                                if (res[0].WareHouseID === ware.ID) {
                                    transportation.findAll({where:{ID:req.body.TransportarID}}).then(wareHouse=>{
                                        if (!isThisArrayEmpty(wareHouse)) {
                                            orderProduct.update({
                                                WareHouseStatus: req.body.Status,
                                                TransportarID:req.body.TransportarID
                                            }, {
                                                where: {
                                                    ID: req.body.ID
                                                }
                                            }).then(
                                                response(res, undefined).then(
                                                    loggerinfo.info("eareHouse with id : " + ware.ID + " change orderProduct with id :" + res[0].ID + " Warehouse to : " + req.body.Status)
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
                    }else {
                        return res.status(404).json({"code": 900});
                    }

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

router.post('/transportation',upload.single("Image"), (req, res) =>{
    var searchQuery = checkToken(req, res);
    try {
        if (searchQuery ) {
            sellerWareHouse.findAll(searchQuery).then(ware => {
                if (!isThisArrayEmpty(ware)) {
                    if (ware[0].Status){
                        var status = true;
                        if(addRoleInfoCheck(req, res, "transportation") ){
                            if (req.file != null) {

                                const tempPath = req.file.path;
                                const targetPath = path.join(__dirname, "./../../uploads/transportation/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                                image = targetPath;
                                if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                    fs.rename(tempPath, targetPath, err => {
                                        if (err) {status = false ;return handleError(err, res);}
                                    });
                                } else {
                                    fs.unlink(tempPath, err => {
                                        if (err)  {status = false ;return handleError(err, res);}

                                        return res
                                            .status(403)
                                            .contentType("text/plain")
                                            .end("this format of image is not under support");
                                    });
                                }

                            } else {
                                image = "notSetYet";
                            }
                            if (status)
                            {
                                sequelize.transaction().then(function (t) {
                                    transportation.create({
                                        AirConditionar: req.body.AirConditionar,
                                        Birthdate: req.body.BirthDate,
                                        Color: req.body.Color,
                                        Description: req.body.Description,
                                        FamilyName: req.body.FamilyName,
                                        Name: req.body.Name,
                                        Image: image,
                                        Point:0,
                                        PelakNumber: req.body.PelakNumber,
                                        PhoneNumber: req.body.PhoneNumber,
                                        Password: md5(req.body.Password),
                                        Status: true,
                                        WareHouseID:ware[0].ID,
                                        Username: req.body.Username,
                                        ModelID: req.body.ModelID,
                                        SellerID: ware[0].SellerID
                                    }, {
                                        transaction: t
                                    }).then(function () {
                                        t.commit();
                                        response(res, undefined).then(
                                            loggerinfo.info(req.connection.remoteAddress + "a transportation added by wareHouse with : " + req.body.PhoneNumber + " phoneNumber")
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


                            }


                        }




                    }else {
                        return res.status(404).json({"code": 900});
                    }

                } else {
                    return res.status(404).json({"code": 700});
                }
            });

        }
    }catch (e) {
        console.log(e)
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + e);
        res.status(500).json({"code":500});


    }

});

router.post('/disableUser', (req, res) => {
    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        sellerWareHouse.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {
                if (seller[0].Status){
                    if (req.body.ID == null) {
                        return res.status(400).json({"code": 703});

                    } else {

                                transportation.update({Status:false},{where:{ID:req.body.ID}}).then(
                                    tes=>{
                                        return res.json();
                                    }
                                );



                    }
                } else {
                    return res.status(404).json({"code": 900});
                }



            }
        });


    }

});

router.post('/enableUser', (req, res) => {
    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        sellerWareHouse.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {
                if (seller[0].Status){
                    if ( req.body.ID == null) {
                        return res.status(400).json({"code": 703});
                    } else {

                                transportation.update({Status:true},{where:{ID:req.body.ID}}).then(
                                    tes=>{
                                        return res.json();
                                    }
                                );


                    }
                } else {
                    return res.status(404).json({"code": 900});
                }



            }
        });


    }

});


module.exports = router;

