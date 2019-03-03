const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {transportation,sellerWareHouse,Seller , cities , sellerType , productGroups , products , sellerProducts , unit ,  car} = require('../../sequelize');
const {upload,selfDestroyKey , colors , loggerinfo} = require('../Util/myVars');
const {base64_encode,checkToken,response , isThisArrayEmpty } = require("../Util/myFunctions");
var path = require('path');
const fs = require("fs");
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
                                        wareHousesfinal[index] = {
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



module.exports = router;

