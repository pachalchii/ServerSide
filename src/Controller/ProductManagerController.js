const express = require('express');
let router = express.Router();
/*********************************************/
const {PriceAndSupply,AlarmsOnSellerProducts,products,sellerProducts,customer} = require('../../sequelize');
const { FilteringRequest,sendSMS} = require("../Util/Filter");
const asyncForEach = require('async-await-foreach');

/*********************************************/

router.post('/accept', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({Policy:true}).then(()=>{return res.json();});
            }
        });
    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.get('/product', (req, res) => {


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
               /* AlarmsOnSellerProducts.findAll({where:{SellerProductID: data.data.SellerProductID ,SeenStatus:false}}).then(AOSP=>{
                    asyncForEach(AOSP , async item =>{
                        await customer.findOne({where:{ID:item.CustomerID}}).then(async customer=>{
                            await sellerProducts.findOne({where:{ID:item.SellerProductID}}).then(async SP=>{
                                await products.findOne({where:{ID:SP.ProductID}}).then(async P=>{
                                    sendSMS(customer,"AddRole",P.Name)
                                });
                            });

                        });
                    })
                });*/
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

