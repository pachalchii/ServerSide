const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {Seller, transportation, orderProduct} = require('../../sequelize');
const {upload, JWT_SECRET, colors} = require('../Util/configuration');
const {checkToken, isThisArrayEmpty, FilteringRequest} = require("../Util/Filter");
/*********************************************/
var jwt = require('jwt-simple');


router.get('/Order',(req,res)=>{

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

router.put('/Order',(req,res)=>{

    try {

        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({SellerOperatorStatus : req.body.Status}).then(()=>{return res.json()});
            }

        });

    } catch (e) {
        return res.status(500).json({"code":500});
    }

});

router.put('/Pricing' , (req, res) => {

    try {

        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                switch (data.whatToDo) {
                    case "create":
                        PriceAndSupply.create(data.data).then(()=>{return res.json()});
                        break;
                    case "update":
                        data.Entity.update(data.data).then(()=>{return res.json()});
                        break
                }
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }



});



module.exports = router;

