const express = require('express');
let router = express.Router();
/*********************************************/
const { TimeToDoingPayment,upload} = require('../Util/configuration');
const {FilteringRequest,sendSMS} = require('../Util/Filter');
const asyncForEach = require('async-await-foreach');
const { orderProduct, AlarmsOnSellerProducts,products,sellerProducts,customer,orderPardakht, PriceAndSupply, SellerProductsInServiceCitie, sequelize,Order} = require('../../sequelize');


router.post('/product', upload.single("Image"), (req, res) => {

    try {

        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                sequelize.transaction().then((t)=>{
                    sellerProducts.create(data, {transaction: t}).then(savedProduct=>{
                        t.commit();
                        return res.status(200).json({"ID":savedProduct.ID})
                    }).catch((error)=>{
                        t.rollback();
                        console.log(error)
                        return res.status(500).json({"code":500});
                    });
                });

            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
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

router.put('/Pricing', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
            /*    AlarmsOnSellerProducts.findAll({where:{SellerProductID: data.data.SellerProductID ,SeenStatus:false}}).then(AOSP=>{
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
                        PriceAndSupply.create(data.data).then(() => {
                            return res.json()
                        });
                        break;
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
                data[0].update({OnlineFee:req.body.OnlineFee,InpalceFee:req.body.InplaceFee}).then(()=>{
                    Order.findOne({where:{
                        ID:data[0].OrderID
                        }}).then(async order =>{
                            order.update({
                                InpalceFee:parseInt(order.InpalceFee) + parseInt(req.body.InplaceFee) - data[0].InplaceFee,
                                OnlineFee:parseInt(order.OnlineFee) + parseInt(req.body.OnlineFee) - data[0].OnlineFee,
                            }).then(()=>{
                                globalVariable.io.to(data[1].SocketID).emit('Change', JSON.stringify({Status:true}));
                                return res.json();
                            });

                    });
                });
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
                         MaxToSell: req.body.MaxToSell || data.MaxToSell,
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

router.put('/OrderProductInfo', (req, res) => {

    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                if (req.body.ProvidedSupply != null){
                    orderProduct.findOne({where:{ID:req.body.OrderProductID}}).then( async OP=>{
                                await PriceAndSupply.findOne({where:{DateTime:new Date().toISOString().slice(0, 10).toString(),SellerProductID : OP.ProductID }}).then(async PAS=>{
                                    await Order.findOne({where:{ID:OP.OrderID}}).then(async O=>{
                                   await O.update({SumTotal:O.SumTotal - OP.SumTotal + (req.body.ProvidedSupply *(PAS.Price))}).then(async ()=>{
                                 await   OP.update({SumTotal:((req.body.ProvidedSupply)*(PAS.Price))}).then(()=>{
                                     globalVariable.io.to(data.SocketID).emit('Change', JSON.stringify({Status:true}));
                                        return res.json();
                                    });
                                });
                            });
                        });
                    });
                }

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

router.post('/ServiceCitiesDelete', (req, res) => {


    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                SellerProductsInServiceCitie.destroy({where:{ID:data.ID}}).then(() => {
                    return res.json();
                }).catch(e => {
                    console.log(e)
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
                globalVariable.io.to(data[1].SocketID).emit('Change', JSON.stringify({Status:true}));
                return res.json(data[0]);
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
                    orderProduct.findOne({where:{ID:req.body.OrderProductID}}).then(async OP=>{
                        if (OP.OnlineFee == null && OP.InpalceFee == null){
                            console.log(OP.InpalceFee)
                            console.log(OP.OnlineFee)
                            await  OP.update({InpalceFee:OP.SumTotal , OnlineFee :0}).then(async ()=>{
                                if (!req.body.Status) {
                                    orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async orderProducts => {
                                        await data[0].update({
                                            SumTotal: data[0].SumTotal - orderProducts.SumTotal,
                                            OnlineFee: data[0].OnlineFee - orderProducts.OnlineFee,
                                            InplaceFee: data[0].InplaceFee - orderProducts.InplaceFee || null
                                        }).then(() => {
                                            return res.json();
                                        });
                                    });
                                }
                                else {
                                    await orderProduct.findAll({where: {OrderID: data[0].ID}}).then(async orderProducts => {
                                        let status = true;
                                        await asyncForEach(orderProducts, async item => {
                                            if (item.SellerOperatorStatus == null) {
                                                status = false;
                                            }
                                        }).then(async () => {
                                                if (status) {
                                                    //todo sms and notif
                                                    await  data[0].update({OrderStatus: true}).then(async () => {
                                                        await sequelize.transaction().then(function (t) {
                                                            orderPardakht.create({
                                                                Mablagh: data[0].OnlineFee,
                                                                DateTime: new Date().toString()
                                                            }, {
                                                                transaction: t
                                                            }).then(savedPardakht => {
                                                                data[0].update({PardakhtID: savedPardakht.ID});
                                                                t.commit();
                                                                setTimeout(function () {

                                                                    orderPardakht.findOne({where: {ID: savedPardakht.ID}}).then(pardakht => {
                                                                            if (pardakht.CodePeygiri == null) {
                                                                                orderProduct.findAll({where:{OrderID:data[0].ID}}).then((orderps)=>{
                                                                                    asyncForEach(orderps,item=>{
                                                                                        item.update({DeleteStatus: true, ReasonOFDelete:"مدت زمان مشتری برای پرداخت به پایان رسیده است ."});
                                                                                    })
                                                                                });
                                                                                data[0].update({OrderStatus: false});
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
                                                    globalVariable.io.to(data[1].SocketID).emit('Change', JSON.stringify({Status:true}));
                                                    return res.json();

                                                }

                                            }
                                        );

                                    });

                                }

                            });
                        }else
                            {
                                if (!req.body.Status) {
                                    orderProduct.findOne({where: {ID: req.body.OrderProductID}}).then(async orderProducts => {
                                        await data[0].update({
                                            SumTotal: data[0].SumTotal - orderProducts.SumTotal,
                                            OnlineFee: data[0].OnlineFee - orderProducts.OnlineFee,
                                            InplaceFee: data[0].InplaceFee - orderProducts.InplaceFee || null
                                        }).then(() => {
                                            return res.json();
                                        });
                                    });
                                }
                                else {
                                    await orderProduct.findAll({where: {OrderID: data[0].ID}}).then(async orderProducts => {
                                        let status = true;
                                        await asyncForEach(orderProducts, async item => {
                                            if (item.SellerOperatorStatus == null) {
                                                status = false;
                                            }
                                        }).then(async () => {
                                                if (status) {
                                                    //todo sms and notif
                                                    await  data[0].update({OrderStatus: true}).then(async () => {
                                                        await sequelize.transaction().then(function (t) {
                                                            orderPardakht.create({
                                                                Mablagh: data[0].OnlineFee,
                                                                DateTime: new Date().toString()
                                                            }, {
                                                                transaction: t
                                                            }).then(savedPardakht => {
                                                                data[0].update({PardakhtID: savedPardakht.ID});
                                                                t.commit();
                                                                setTimeout(function () {

                                                                    orderPardakht.findOne({where: {ID: savedPardakht.ID}}).then(pardakht => {
                                                                            if (pardakht.CodePeygiri == null) {
                                                                                orderProduct.findAll({where:{OrderID:data[0].ID}}).then((orderps)=>{
                                                                                    asyncForEach(orderps,item=>{
                                                                                        item.update({DeleteStatus: true, ReasonOFDelete:"مدت زمان مشتری برای پرداخت به پایان رسیده است ."});
                                                                                    })
                                                                                });
                                                                                data[0].update({OrderStatus: false});
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
                                                    globalVariable.io.to(data[1].SocketID).emit('Change', JSON.stringify({Status:true}));
                                                    return res.json();

                                                }

                                            }
                                        );

                                    });

                                }
                            }
                    })

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
                                await data[0].update({
                                    SumTotal: data[0].SumTotal - orderProducts.SumTotal,
                                    OnlineFee: data[0].OnlineFee - orderProducts.OnlineFee,
                                    InplaceFee: data[0].InplaceFee - orderProducts.InplaceFee || null
                                });

                        }else
                            {
                              await  PriceAndSupply.findOne({where:{SellerProductID:orderProducts.ProductID , DateTime: new Date().toISOString().slice(0, 10).toString()}}).then(async PS=>{

                                  await  PS.update({PrimitiveSupply : PS.PrimitiveSupply - orderProducts.Supply }).then(async ()=>{

                                              globalVariable.io.to(data[1].SocketID).emit('Change', JSON.stringify({Status:true}));
                                              return res.json();
                                    });
                                });
                            }
                    });
                });
            }
        });

    } catch (e) {
        return res.status(500).json({"code": 500});
    }

});

router.post('/ScatteredTransportation', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                globalVariable.io.to(data[1].SocketID).emit('Change', JSON.stringify({Status:true}));
                return res.json(data[0]);
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.post('/ExactSupply', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                globalVariable.io.to(data.SocketID).emit('Change', JSON.stringify({Status:true}));
                return res.json();
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.post('/ShowStatus', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json();
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.put('/ScatteredTransportation', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json({data});
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.get('/pastOrders', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json(data);
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

module.exports = router;


