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
                       transportation.findAll({where:{
                           WareHouseID:sellerWareHouse[0].ID
                           }}).then(
                               transportation=>{
                                   return res.json(transportation);
                               }
                       );

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

