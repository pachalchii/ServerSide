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




module.exports = router;

