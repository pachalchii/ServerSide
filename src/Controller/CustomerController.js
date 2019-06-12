const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {TimeCounterForOperatorAnswering ,AlramMessages,TimeRemainingForOperatorAlert  } = require('../Util/configuration');
const {base64_encode,FilteringRequest,SendAlarm,sendSMS, filterRequest, isThisArrayEmpty, checkToken} = require('../Util/Filter');

const {sellerPhoneNumber, orderNazarSanji,sellerOperator, support,PriceAndSupply, chat, orderProduct, Seller, products, sequelize, takhfifProduct, sellerProducts, Order, cities, addresses, customer} = require('../../sequelize');
const Op = sequelize.Op;
const asyncForEach = require('async-await-foreach');


//new


router.post('/order', (req, res) => {


    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                var OrderID = data[0].OrderID;

                asyncForEach(data[1], async (item)=>{
                    await orderProduct.create(item);
                }).then(()=>{

                    setTimeout(function(){

                        if (new Date().getHours() < 5 ){
                            orderProduct.findAll({where:{OrderID:OrderID}}).then(orderProduct=>{asyncForEach(orderProduct,async item =>{
                                products.findOne({where:{ID:item.ProductID}}).then(products=>{
                                    if (products.Type){
                                        if (!(item.SellerOperatorStatus && item.ProductionManagerStatus)){
                                            sellerOperator.findOne({where:{ID:item.SellerOperatorID}}).then(operator=>{
                                                SendAlarm(operator,AlramMessages("SellerOperatorAlarm",item.ID));
                                            })
                                        }
                                    }else if (!products.Type || products.Type ==null) {
                                        if (!(item.SellerOperatorStatus)){

                                            sellerOperator.findOne({where:{ID:item.SellerOperatorID}}).then(operator=>{
                                                SendAlarm(operator,AlramMessages("SellerOperatorAlarm",item.ID));
                                            })

                                        }
                                    }
                                });

                            })


                            });
                        }


                    }, TimeRemainingForOperatorAlert);

                    setTimeout(function(){
                        if (new Date().getHours() < 5 ) {
                            orderProduct.findAll({where:{OrderID:OrderID}}).then(orderProduct=>{
                                asyncForEach(orderProduct,async item =>{
                                    products.findOne({where:{ID:item.ProductID}}).then(products=>{
                                        if (products.Type){
                                            if (!(item.SellerOperatorStatus && item.ProductionManagerStatus)){
                                                item.update({ SellerOperatorStatus:false ,SellerOperatorFinalStatus:false , DeleteStatus: true , ReasonOFDelete: "kotahi az operator va PM bode"})
                                            }
                                        }else if (!products.Type || products.Type ==null) {
                                            if (!(item.SellerOperatorStatus)){
                                                item.update({SellerOperatorStatus:false , SellerOperatorFinalStatus:false ,DeleteStatus: true , ReasonOFDelete: "kotahi az operator bode"})
                                            }
                                        }
                                    });
                                })


                            });
                        }

                    }, TimeCounterForOperatorAnswering);

                    return res.json().status(200);

                })
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.get('/order', (req, res) => {

    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                console.log(err)
                return res.status(err.HttpCode).json(err.response);
            } else {
               return res.json(data).status(200);
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }

});

router.post('/address', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                addresses.create(data).then(()=>{
                    return res.status(200).json();
                })
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }


});

router.put('/address', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                addresses.update(data ,  {
                    where: {
                        ID: req.body.CustomerAddressID
                    }
                }).then(()=>{return res.json().status(200)});
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }

});

router.get('/address', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json(data).status(200);
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }

});

router.post('/CancleOrder',(req,res)=>{
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({OrderStatus: false}).then(()=>{return res.json();});
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.post('/CancleOrderProduct',(req,res)=>{
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({DeleteStatus: true , CustomerReason:  req.body.CustomerReason}).then(async ()=>{
                  await  Order.findOne({where:{ID:data.OrderID}}).then(async order=>{
                      await  PriceAndSupply.findAll({where:{DateTime:new Date().toISOString().slice(0, 10).toString() ,SellerProductID : data.ProductID }}).then(async price=>{
                        await  order.update({SumTotal : order.SumTotal - data.SumTotal , OnlineFee :order.OnlineFee - data.OnlineFee ,  InplaceFee :order.InplaceFee - data.InplaceFee || null}).then(()=>{
                              return res.json();
                          });

                      })
                    });
                });
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.get('/OrderProductTimer', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json({"Time": data});
            }

        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }


});

router.get('/Alarm', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json(data);
            }

        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }


});

router.post('/Alarm', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json();
            }

        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }


});

router.post('/FinalStatus', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json();
            }

        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }


});

router.get('/search', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json(data);
            }

        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }

});




module.exports = router;

