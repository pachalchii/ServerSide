const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {upload, colors, TimeToDoingPayment} = require('../Util/configuration');
const {filterRequest, isThisArrayEmpty, FilteringRequest, checkToken} = require('../Util/Filter');
const asyncForEach = require('async-await-foreach');
const {chat, support, orderProduct, Seller, orderPardakht, PriceAndSupply, SellerProductsInServiceCitie, products, sequelize, takhfifProduct, sellerProducts, Order, cities, addresses, customer} = require('../../sequelize');
const Op = sequelize.Op;

//new

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

router.put('/Pricing', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                switch (data.whatToDo) {
                    case "create":
                        PriceAndSupply.create(data.data).then(() => {
                            return res.json()
                        });
                        break;
                    case "update":
                        return res.json({code: 722});
                        break
                }
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code": 500});
    }


});

router.put('/Fee', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({OnlineFee:req.body.OnlineFee,InpalceFee:req.body.InplaceFee}).then(()=>{return res.json()});
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code": 500});
    }


});

router.put('/ProductInfo', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({
                        Description: req.body.Description || data.Description,
                        DiscountFor0TO200: req.body.DiscountFor0TO200 || data.DiscountFor0TO200,
                        DiscountFor200TO500: req.body.DiscountFor200TO500 || data.DiscountFor200TO500,
                        DiscountFor500TO1000: req.body.DiscountFor500TO1000 || data.DiscountFor500TO1000,
                        DiscountFor1000TOUpper: req.body.DiscountFor1000TOUpper || data.DiscountFor1000TOUpper,
                        MinToSell: req.body.MinToSell || data.MinToSell,
                        UnitOfProduct: req.body.UnitOfProduct || data.UnitOfProduct,
                        ShowStatus: req.body.ShowStatus || data.ShowStatus
                    }
                ).then(() => {
                    return res.json();
                });
                return res.json();
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code": 500});
    }

});

router.post('/ServiceCities', (req, res) => {


    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                SellerProductsInServiceCitie.create(data).then(() => {
                    return res.json();
                }).catch(e => {
                    return res.status(400).json({"code": 724});
                })
            }

        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }


});

router.post('/CancleOrderProduct', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({DeleteStatus: true, SellerReason: req.body.SellerReason}).then(async () => {
                    await Order.findOne({where: {ID: data.OrderID}}).then(async order => {
                        await PriceAndSupply.findAll({
                            where: {
                                DateTime: new Date().toISOString().slice(0, 10).toString(),
                                SellerProductID: data.ProductID
                            }
                        }).then(async price => {
                            await order.update({
                                SumTotal: order.SumTotal - data.SumTotal,
                                OnlineFee: order.OnlineFee - data.OnlineFee,
                                InplaceFee: order.InplaceFee - data.InplaceFee || null
                            }).then(() => {
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

router.get('/Order', (req, res) => {

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

router.get('/SubType',(req,res)=>{

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

router.put('/Order', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                orderProduct.update({SellerOperatorStatus: req.body.Status},{where:{ ID : req.body.OrderProductID }}).then(async ()=>{
                    if (!req.body.Status) {
                        orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async orderProducts => {
                            await data.update({
                                SumTotal: data.SumTotal - orderProducts.SumTotal,
                                OnlineFee: data.OnlineFee - orderProducts.OnlineFee,
                                InplaceFee: data.InplaceFee - orderProducts.InplaceFee || null
                            }).then(() => {
                                return res.json();
                            });
                        });
                    }else {
                        return res.json();
                    }
                });



            }

        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }

});

router.put('/FinalOrder', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                orderProduct.findOne({where:{ ID : req.body.OrderProductID }}).then(orderProducts=>{
                    orderProducts.update({SellerOperatorFinalStatus: req.body.Status}).then(async () => {

                        if (!req.body.Status) {
                                await data.update({
                                    SumTotal: data.SumTotal - orderProducts.SumTotal,
                                    OnlineFee: data.OnlineFee - orderProducts.OnlineFee,
                                    InplaceFee: data.InplaceFee - orderProducts.InplaceFee || null
                                });

                        }
                        await orderProduct.findAll({where: {OrderID: data.ID}}).then(async orderProducts => {
                            var status = true;
                            await asyncForEach(orderProducts, async item => {
                                if (item.SellerOperatorFinalStatus == null) {
                                    status = false;
                                }
                            }).then(() => {
                                    if (status) {
                                        //todo sms and notif
                                        data.update({OrderStatus: true}).then(async () => {
                                           await sequelize.transaction().then(function (t) {
                                                orderPardakht.create({
                                                    Mablagh: data.SumTotal,
                                                    DateTime: new Date().toString()
                                                }, {
                                                    transaction: t
                                                }).then(savedPardakht => {
                                                    data.update({PardakhtID: savedPardakht.ID});
                                                    t.commit();
                                                    setTimeout(function () {
                                                        orderPardakht.findOne({where: {ID: savedPardakht.ID}}).then(pardakht => {
                                                                if (pardakht.CodePeygiri == null) {
                                                                    data.update({OrderStatus: false});
                                                                }
                                                            }
                                                        );
                                                    }, TimeToDoingPayment);
                                                    return res.json();
                                                }).catch(function (error) {
                                                    t.rollback();
                                                    return res.status(500).json({"code": 500});
                                                });
                                            });
                                        })
                                    } else {
                                        return res.json()
                                    }

                                }
                            );

                        });
                    });
                });
            }
        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }

});





//old

router.get('/message', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        support.findAll(searchQuery).then(support => {

            if (isThisArrayEmpty(support)) {

                return res.status(400).json({"code": 700});

            } else {
                if (support[0].Status) {

                    chat.findAll({where: {[Op.or]: [{ToID: "111" + support[0].ID}, {FromID: "111" + support[0].ID}]}}).then(
                        message => {
                            return res.status(200).json(message);
                        }
                    )

                } else {
                    return res.status(404).json({"code": 900});

                }

            }
        });


    }

});

router.post('/message', (req, res) => {

    var searchQuery = checkToken(req, res);
    var requestFilter = filterRequest(req, res, "Smessage");

    if (searchQuery && requestFilter) {

        support.findAll(searchQuery).then(support => {

            if (isThisArrayEmpty(support)) {

                return res.status(400).json({"code": 700});

            } else {
                if (support[0].Status) {
                    chat.create({
                        FromID: "111" + support[0].ID,
                        ToID: "222" + req.body.ToID,
                        Message: req.body.Message,
                        DateTimeSend: new Date().getTime()

                    });
                    return res.json();
                } else {
                    return res.status(400).json({"code": 700});

                }

            }


        });


    }

});


module.exports = router;

