const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {loggererror, loggerinfo, upload, colors} = require('../Util/myVars');
const {base64_encode, response, filterRequest, isThisArrayEmpty, checkToken} = require('../Util/myFunctions');

const {sellerOperator,sellerPhoneNumber, orderNazarSanji, support, chat, orderProduct, Seller, products, sequelize, takhfifProduct, sellerProducts, Order, cities, addresses, customer} = require('../../sequelize');
const Op = sequelize.Op;
var randomstring = require("randomstring");


router.post('/address', (req, res) => {
    var searchQuery = checkToken(req, res);
    var AddresFilter = filterRequest(req, res, "customerAddress");
    try {
        if (searchQuery && AddresFilter) {
            customer.findAll(searchQuery).then(
                customer => {
                    if (!isThisArrayEmpty(customer)) {
                        if (customer[0].Status){
                            cities.findAll({where: {ID: req.body.CityID}}).then(
                                city => {
                                    if (!isThisArrayEmpty(city)) {
                                        addresses.create({
                                            CustomerID: customer[0].ID,
                                            CityID: req.body.CityID,
                                            GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                            CompleteAddressDescription: req.body.CompleteAddressDescription,
                                            CustomName: req.body.CustomName
                                        });
                                        response(res, undefined).then(
                                            loggerinfo.info(req.connection.remoteAddress + "user with id : " + customer[0].ID + " add a addres")
                                        );

                                    } else {
                                        return res.status(404).json();
                                    }
                                }
                            );


                        } else {
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

router.put('/address', (req, res) => {
    var searchQuery = checkToken(req, res);
    var AddresFilter = filterRequest(req, res, "editCustomerAddress");
    try {
        if (searchQuery && AddresFilter) {
            customer.findAll(searchQuery).then(
                customer => {
                    if (!isThisArrayEmpty(customer)) {
                        if (customer[0].Status){
                            if (req.body.CityID != null) {
                                cities.findAll({where: {ID: req.body.CityID}}).then(
                                    city => {
                                        if (isThisArrayEmpty(city)) {
                                            return res.status(404).json();
                                        }
                                    }
                                );
                            }
                            addresses.findAll({
                                where: {ID: req.body.CustomerAddressID}
                            }).then(address => {
                                if (!isThisArrayEmpty(address)) {
                                    var CustomerID = address[0].CustomerID;
                                    var CityID = address[0].CityID;
                                    var GoogleMapAddressLink = address[0].GoogleMapAddressLink;
                                    var CompleteAddressDescription = address[0].CompleteAddressDescription;
                                    var CustomName = address[0].CustomName;
                                    console.log(CityID)

                                    if (req.body.CityID != null) CityID = req.body.CityID;
                                    if (req.body.GoogleMapAddressLink != null) GoogleMapAddressLink = req.body.GoogleMapAddressLink;
                                    if (req.body.CompleteAddressDescription != null) CompleteAddressDescription = req.body.CompleteAddressDescription;
                                    if (req.body.CustomName != null) CustomName = req.body.CustomName;
                                    if (req.body.CustomerID != null) CustomerID = req.body.CustomerID;

                                    if (req.body.CustomerID != null) {
                                    }
                                    addresses.update({
                                        CustomerID: CustomerID,
                                        CityID: CityID,
                                        GoogleMapAddressLink: GoogleMapAddressLink,
                                        CompleteAddressDescription: CompleteAddressDescription,
                                        CustomName: CustomName
                                    }, {
                                        where: {
                                            ID: req.body.CustomerAddressID
                                        }
                                    });
                                    response(res, undefined).then(
                                        loggerinfo.info(req.connection.remoteAddress + "user with id : " + customer[0].ID + " edit a addres with ID: " + req.body.CustomerAddressID)
                                    );

                                } else {
                                    res.status(404).json({"code": 703});
                                }
                            });


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

router.get('/address', (req, res) => {
    var searchQuery = checkToken(req, res);
    try {
        if (searchQuery) {
            customer.findAll(searchQuery).then(
                customer => {
                    if (!isThisArrayEmpty(customer)) {
                        if (customer[0].Status){
                            addresses.findAll({where: {CustomerID: customer[0].ID}}).then(
                                addresses => {
                                    response(res, addresses).then(
                                        loggerinfo.info("customer with id :" + customer[0].ID + " get all his address")
                                    )
                                }
                            )

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

router.post('/order', (req, res) => {
    var searchQuery = checkToken(req, res);
    var requestFilter = filterRequest(req, res, "DoOrder");
    try {
        if (searchQuery && requestFilter) {
            customer.findAll(searchQuery).then(
                customer => {
                    if (!isThisArrayEmpty(customer)) {
                        if (customer[0].Status){
                            var productss = [];
                            productss = req.body.products;

                            sequelize.transaction().then(t => {
                                Order.create({
                                    CustomerID: customer[0].ID,
                                    OrderDateTime: new Date().getTime(),
                                    CustomerAddressID: req.body.CustomerAddressID,
                                    DateTimeErsal: req.body.DateTimeErsal,
                                    JameKol: 0,
                                    JameKolAfterTakhfif: 0,
                                    OrderStatus: false,
                                    HashCode: randomstring.generate(10)

                                }, {
                                    transaction: t
                                })
                                    .then(savedOrder => {
                                        t.commit();
                                        Order.update({HashCode: Math.floor(100000000 + Math.random() * 900000000) + savedOrder.ID}, {where: {ID: savedOrder.ID}})
                                            .then(() => {
                                                    var KolMablagh = 0;
                                                    productss.forEach((item, index) => {
                                                        sellerProducts.findAll({where: {ID: item.SellerProductID}}).then(
                                                            product => {
                                                                if (!isThisArrayEmpty(product)) {
                                                                    sellerOperator.findAll({where:{
                                                                            SellerID: product[0].SellerID
                                                                        }}).then(
                                                                        so=>{
                                                                            var item = so[Math.floor(Math.random()*so.length)];
                                                                            KolMablagh = KolMablagh + (item.Supply * product[0].Price);
                                                                            console.log(KolMablagh, 'kol mablagh is here in map');
                                                                            sequelize.transaction().then(function(t) {
                                                                                orderProduct.create({
                                                                                    SellerOperatorID:item.ID,
                                                                                    SellerOperatorStatus:false,
                                                                                    OrderID: savedOrder.ID,
                                                                                    Takhfif: item.Supply * product[0].Price,
                                                                                    ProductID: product[0].ProductID,
                                                                                    Supply: item.Supply,
                                                                                    Price: item.Supply * product[0].Price,
                                                                                    CustomerStatus: true
                                                                                }).then((savedorderProduct)=> {
                                                                                    t.commit();
                                                                                    setTimeout(()=>{
                                                                                        orderProduct.findAll({where:{ID:savedorderProduct.ID}}).then(
                                                                                            op=>{
                                                                                                if (!op[0].SellerOperatorStatus) {
                                                                                                    orderProduct.update({OrderProductStatus: false},{where:{ID:savedorderProduct.ID}})

                                                                                                }
                                                                                            }
                                                                                        )

                                                                                    },900000)

                                                                                }).catch(function(error) {
                                                                                    loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + error);
                                                                                    t.rollback();

                                                                                        return res.status(400).json({"message":"Oops! Something went wrong!"})

                                                                                                       });
                                                                            });



                                                                        }
                                                                    );

                                                                }

                                                                else {
                                                                    res.status(404).json();
                                                                    status = false;
                                                                }
                                                            }
                                                        );


                                                    });
                                                    return KolMablagh;
                                                }

                                            ).then(price=>{
                                            console.log(price,"price is here")
                                        });

                                        loggerinfo.info(req.connection.remoteAddress + " order saved  with id " + savedOrder.ID);
                                        return res.status(200).json();


                                    }).catch(function (error) {
                                    loggererror.info(req.connection.remoteAddress + "cause this erorr : " + error);
                                    console.log(error);
                                    t.rollback();
                                    return res.status(400).json({"message": "Oops! Something went wrong!"})


                                });
                            });

                            /*
                                                    if (status)
                                                    {
                                                        var statusTwo = true;

                                                      function getAllTakhfif(value ,koleTakhfif = 0 ) {
                                                          return new Promise((resolve,reject)=>{
                                                              sellerProducts.findAll({where: {ID: value.SellerProductID}}).then(
                                                                  sellerProductss => {
                                                                      var SellerID = sellerProductss[0].SellerID;
                                                                      var ProductID = sellerProductss[0].ProductID;
                                                                      takhfifProduct.findAll({
                                                                          where: {
                                                                              ProductID: ProductID
                                                                              , SellerID: SellerID
                                                                          }
                                                                      }).then(
                                                                          takhfifProduct => {
                                                                              if (!isThisArrayEmpty(takhfifProduct)) {
                                                                                  sellerProducts.findAll({where: {ID: value.SellerProductID}}).then(
                                                                                      product => {
                                                                                          if (!isThisArrayEmpty(product)) {

                                                                                              if (takhfifProduct[0].Start < new Date().getTime() < takhfifProduct[0].Finish && takhfifProduct[0].SupplyOfProduct > 0 && takhfifProduct[0].Enable && takhfifProduct[0].PachalChiStatus) {
                                                                                                  var ii = value.Supply;
                                                                                                  if (takhfifProduct[0].SupplyOfProduct > 0) {
                                                                                                      for (ii; ii > 0; ii = ii - 1) {
                                                                                                          koleTakhfif = koleTakhfif + (takhfifProduct[0].PriceBefore - takhfifProduct[0].PriceAfter);
                                                                                                      }
                                                                                                      resolve (koleTakhfif)

                                                                                                  }


                                                                                              }


                                                                                          }
                                                                                          else {
                                                                                              res.status(404).json();
                                                                                              statusTwo = false;
                                                                                          }

                                                                                      }
                                                                                  );


                                                                              }

                                                                          }
                                                                      );


                                                                  }
                                                              );
                                                          })
                                                      }

                                                      productss.forEach((item)=>{
                                                          Promise.all([getAllTakhfif(item)
                                                              .then((koleTakhfif)=>{

                                                                  if (status && statusTwo){

                                                                      sequelize.transaction().then(function(t) {
                                                                          Order.create({
                                                                              CustomerID:customer[0].ID,
                                                                              OrderDateTime:new Date().getTime(),
                                                                              CustomerAddressID:req.body.CustomerAddressID,
                                                                              DateTimeErsal:req.body.DateTimeErsal,
                                                                              JameKol:KolMablagh,
                                                                              JameKolAfterTakhfif:KolMablagh-koleTakhfif,
                                                                              OrderStatus: false,
                                                                              HashCode:randomstring.generate(10)

                                                                          }, {
                                                                              transaction: t
                                                                          }).then(savedOrder=> {
                                                                              t.commit();
                                                                              Order.update({HashCode:Math.floor(100000000 + Math.random() * 900000000).savedOrder.ID},{where:{ID:savedOrder.ID}}).then(test=>
                                                                              {
                                                                                  return res.status(200).json()

                                                                              }

                                                                          );

                                                                              loggerinfo.info(req.connection.remoteAddress + " order saved  with id " + savedOrder.ID );

                                                                          }).catch(function (error) {
                                                                              loggererror.info(req.connection.remoteAddress + "cause this erorr : " + error);
                                                                              console.log(error);
                                                                              t.rollback();
                                                                              return res.status(400).json({"message": "Oops! Something went wrong!"})


                                                                          });
                                                                      });
                                                                  }
                                                              })
                                                              .catch((err)=>{
                                                                  console.log(err);
                                                                  res.status(500).json({"code":500});
                                                                  status = false

                                                              })])
                                                      })






                                                    }*/

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

router.get('/order', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        customer.findAll(searchQuery).then(customer => {

            if (isThisArrayEmpty(customer)) {

                return res.status(400).json({"code": 700});

            } else {
                if (customer[0].Status){
                    Order.findAll({where: {CustomerID: customer[0].ID}}).then(
                        order => {
                            return res.status(200).json(order);
                        }
                    )
                }else {
                    return res.status(404).json({"code": 900});
                }



            }
        });


    }

});

router.get('/order/followUp', (req, res) => {

    var searchQuery = checkToken(req, res);
    var requestFilter = filterRequest(req, res, "followUp");

    if (searchQuery && requestFilter) {

        customer.findAll(searchQuery).then(customer => {

            if (isThisArrayEmpty(customer)) {

                return res.status(400).json({"code": 700});

            } else {
                if (customer[0].Status){

                    Order.findAll({HashCode: req.body.HashCode, CustomerID: customer[0].ID}).then(
                        order => {
                            if (!isThisArrayEmpty(order)) {

                                orderProduct.findAll({where: {OrderID: order[0].ID}}).then(productOrder => {
                                    return res.status(200).json(productOrder);
                                })


                            } else {
                                return res.status(404).json({"code": 404});
                            }
                        }
                    );
                }else {
                    return res.status(404).json({"code": 900});
                }


            }
        });


    }

});

router.get('/message', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        customer.findAll(searchQuery).then(customer => {

            if (isThisArrayEmpty(customer)) {

                return res.status(400).json({"code": 700});

            } else {
                if (customer[0].Status){
                    chat.findAll({
                        where: {
                            [Op.or]: [{ToID: "222" + customer[0].ID}, {FromID: "222" + customer[0].ID}]
                        }
                    }).then(
                        message => {
                            return res.status(200).json(message);
                        }
                    )

                }else {
                    return res.status(404).json({"code": 900});
                }

            }
        });


    }

});

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

router.post('/message', (req, res) => {

    var searchQuery = checkToken(req, res);
    var requestFilter = filterRequest(req, res, "message");

    if (searchQuery && requestFilter) {

        customer.findAll(searchQuery).then(customer => {

            if (isThisArrayEmpty(customer)) {

                return res.status(400).json({"code": 700});

            } else {
                if (customer[0].Status){
                    var supportId = "notsetyet";

                    support.findAll().then(
                        sup => {
                            function supportiter(value) {
                                if (value.status) {
                                    supportId = value.ID
                                }
                            }

                            sup.forEach(supportiter);
                            if (supportId === "notsetyet") {
                                supportId = sup[0];
                            }
                        }
                    );

                    chat.create({
                        FromID: "222" + customer[0].ID,
                        ToID: supportId,
                        Message: req.body.Message,
                        DateTimeSend: new Date().getTime()

                    });
                    return res.json();
                }else {
                    return res.status(404).json({"code": 900});
                }

            }


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
                            response(res, sellerPhoneNumber).then(
                                loggerinfo.info(req.connection.remoteAddress + "customer with id : " + customer[0].Id + "get all his/her subtypes")
                            );
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
                                loggerinfo.info(req.connection.remoteAddress + " signUped as a customer with " + req.body.PhoneNumber + " phone number");
                                return res.status(200).json();
                            });


                        }).catch(function (error) {
                            loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
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

