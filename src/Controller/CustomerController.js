const express = require('express');
let router = express.Router();
/*********************************************/
const {TimeCounterForOperatorAnswering ,AlramMessages,TimeRemainingForOperatorAlert  } = require('../Util/configuration');
const {FilteringRequest,SendAlarm} = require('../Util/Filter');
const {sellerOperator,PriceAndSupply, orderProduct, products, Order, addresses} = require('../../sequelize');
const asyncForEach = require('async-await-foreach');




router.post('/order', (req, res) => {


    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                let OrderID = data[0].ID;

                asyncForEach(data[1], async (item)=>{
                    await orderProduct.create(item);
                }).then(()=>{


                        if (new Date().getHours() < 17 ){

                            setTimeout(function(){

                                orderProduct.findAll({where:{OrderID:data[0].ID}}).then(orderProduct=>{asyncForEach(orderProduct,async item =>{
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

                            }, TimeRemainingForOperatorAlert);

                        }



                    setTimeout(function(){
                       console.log("done")
                            orderProduct.findAll({where:{OrderID:data[0].ID}}).then(orderProduct=>{
                                asyncForEach(orderProduct,async item =>{
                                    products.findOne({where:{ID:item.ProductID}}).then(products=>{
                                        if (products.Type){
                                            if ((item.SellerOperatorStatus) == null){
                                                item.update({ SellerOperatorStatus:false  , DeleteStatus: true , ReasonOFDelete: "متاسفانه مدت زمان اپراتور برای تایید سفارش به پایان رسیده است."})
                                            }
                                        }else if (!products.Type || products.Type ==null) {
                                            if (!(item.SellerOperatorStatus)){
                                                item.update({SellerOperatorStatus:false ,DeleteStatus: true , ReasonOFDelete: "متاسفانه مدت زمان اپراتور برای تایید سفارش به پایان رسیده است."})
                                            }
                                        }
                                    });
                                })


                            });


                    }, TimeCounterForOperatorAnswering);

                    return res.json().status(200);

                })
            }
        });


    } catch (e) {
        console.log(e)
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

router.post('/Star', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json();
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }


});

router.post('/payment', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {

                    return res.status(200).json(data);
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

router.delete('/Alarm', (req, res) => {

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

