const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {TimeCounterForOperatorAnswering ,TimeRemainingForOperatorAlert  } = require('../Util/configuration');
const {base64_encode,FilteringRequest, filterRequest, isThisArrayEmpty, checkToken} = require('../Util/Filter');

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

                asyncForEach(data, async (item)=>{
                    await orderProduct.create(item);
                }).then(()=>{
                    setTimeout(function(){

                        orderProduct.findAll({where:{OrderID:OrderID}}).then(orderProduct=>{
                            asyncForEach(orderProduct,async item =>{
                                products.findOne({where:{ID:item.ProductID}}).then(products=>{
                                    if (products.Type){
                                        if (!(item.SellerOperatorStatus && item.ProductionManagerStatus)){
                                            sellerOperator.findOne({where:{ID:item.SellerOperatorID}}).then(operator=>{
                                                if (operator.Status){
                                                    //todo notif
                                                } else {
                                                    //todo sms
                                                }
                                            })
                                        }
                                    }else if (!products.Type || products.Type ==null) {
                                        if (!(item.SellerOperatorStatus)){

                                            sellerOperator.findOne({where:{ID:item.SellerOperatorID}}).then(operator=>{
                                                if (operator.Status){
                                                    //todo notif
                                                } else {
                                                    //todo sms
                                                }
                                            })

                                        }
                                    }
                                });

                            })


                        });

                    }, TimeRemainingForOperatorAlert);
                    setTimeout(function(){

                        orderProduct.findAll({where:{OrderID:OrderID}}).then(orderProduct=>{
                            asyncForEach(orderProduct,async item =>{
                                products.findOne({where:{ID:item.ProductID}}).then(products=>{
                                    if (products.Type){
                                        if (!(item.SellerOperatorStatus && item.ProductionManagerStatus)){
                                            item.update({DeleteStatus: true , ReasonOFDelete: "kotahi az operator va PM bode"})
                                        }
                                    }else if (!products.Type || products.Type ==null) {
                                        if (!(item.SellerOperatorStatus)){
                                            item.update({DeleteStatus: true , ReasonOFDelete: "kotahi az operator bode"})
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


//old



router.post('/search', (req, res) => {
    var requestFilter = filterRequest(req, res, "search")
    if (requestFilter) {
        products.findAll({
            where: {
                [Op.or]: [
                    {
                        Name: {
                            [Op.like]: '%' + req.body.param + '%'
                        }
                    }
                ]
            }
        }).then(ProductsList => {
            Seller.findAll({
                where: {
                    [Op.or]: [
                        {
                            CompanyName: {
                                [Op.like]: '%' + req.body.param + '%'
                            }
                        }
                    ]
                }
            }).then(Sellerlist => {
                return res.json({
                    Sellerlist,
                    ProductsList
                });
            });
        });


    }
});

router.get('/off', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        customer.findAll(searchQuery).then(customer => {

            if (isThisArrayEmpty(customer)) {

                return res.status(400).json({"code": 700});

            } else {
                if (customer[0].Status){
                    var final = [];

                    function testFunction2(value, index, array) {
                        var base64str = "not Found";
                        try {
                            base64str = base64_encode(value.Image);

                        } catch (e) {
                            base64str = "not Found";

                        }

                        final[index] = {
                            ID: value.ID,
                            Image: base64str,
                            SellerID: value.SellerID,
                            ProductID: value.ProductID,
                            Start: value.Start,
                            Finish: value.Finish,
                            PriceBefore: value.PriceBefore,
                            PriceAfter: value.PriceAfter,
                            Percentage: value.Percentage,
                            SupplyOFProduct: value.SupplyOFProduct,
                            UnitOFProduct: value.UnitOFProduct,
                            UnitID: value.UnitID,
                            PachalChiStatus: value.PachalChiStatus,
                            Enable: value.Enable,
                            Description: value.Description


                        }
                    }

                    takhfifProduct.findAll({
                        where: {
                            "Finish": {
                                [Op.gt]: new Date().getTime()
                            },
                            "Start": {
                                [Op.lte]: new Date().getTime()

                            },
                            "SupplyOFProduct": {
                                [Op.gt]: 0

                            },
                            "PachalChiStatus": true,
                            "Enable": true

                        }
                    }).then(
                        takhfif => {
                            takhfif.forEach(testFunction2);
                            return res.json(final);
                        }
                    );

                }else {
                    return res.status(404).json({"code": 900});
                }


            }
        });


    }

});

router.get('/phoneNumber', (req, res) => {

    var searchQuery = checkToken(req, res);
    var fr = filterRequest(req, res, "getPhoneNumber")
    if (searchQuery) {

        customer.findAll(searchQuery).then(customer => {

            if (isThisArrayEmpty(customer)) {

                return res.status(400).json({"code": 700});

            } else {
                if (customer[0].Status){
                    sellerPhoneNumber.findAll({
                        where: {
                            ID: req.query.SellerID
                        }
                    }).then(
                        sellerPhoneNumber => {
                            return res.json(sellerPhoneNumber);
                        }
                    );

                }else {
                    return res.status(404).json({"code": 900});
                }


            }
        });


    }


});

router.post('/Survey', (req, res) => {

    var searchQuery = checkToken(req, res);
    var requestFilter = filterRequest(req, res, "Survey");

    if (searchQuery && requestFilter) {

        customer.findAll(searchQuery).then(customer => {

            if (isThisArrayEmpty(customer)) {

                return res.status(400).json({"code": 700});

            } else {
                if (customer[0].Status){

                    sequelize.transaction().then(function (t) {
                        orderNazarSanji.create({
                            PachalChi: req.body.PachalChi,
                            Seller: req.body.Seller,
                            SellerOperator: req.body.SellerOperator,
                            Transportar: req.body.Transportar,
                            Support: req.body.Support

                        }, {
                            transaction: t
                        }).then(savedNazar => {

                            t.commit();
                            Order.update({
                                NazarSanjiID: savedNazar.ID
                            }, {
                                where: {
                                    ID: req.body.OrderID
                                }
                            }).then(finish => {
                                return res.status(200).json();
                            });


                        }).catch(function (error) {
                            t.rollback();
                            if (error.parent.errno === 1062) {
                                return res.status(400).json({"message": "customer signUped before"})
                            }
                            else {
                                return res.status(400).json({"message": "Oops! Something went wrong!"})

                            }
                        });
                    });

                }else {
                    return res.status(404).json({"code": 900});
                }


            }


        });


    }

});




module.exports = router;

