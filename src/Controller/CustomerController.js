const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const { } = require('../Util/configuration');
const {base64_encode,FilteringRequest, filterRequest, isThisArrayEmpty, checkToken} = require('../Util/Filter');

const {sellerPhoneNumber, orderNazarSanji, support, chat, orderProduct, Seller, products, sequelize, takhfifProduct, sellerProducts, Order, cities, addresses, customer} = require('../../sequelize');
const Op = sequelize.Op;
const asyncForEach = require('async-await-foreach');


//new

router.post('/order', (req, res) => {


    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                asyncForEach(data, async (item)=>{
                    await orderProduct.create(item);
                }).then(()=>{return res.json().status(200);})
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


//old

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
                                       return res.json();

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
                                    return res.json();

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
                                    return res.json(addresses);
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
        res.status(500).json({"code": 500});
    }
});

router.post('/order/followUp', (req, res) => {

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

