const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {Seller , cities , sellerType , productGroups , products , sellerProducts , unit ,  car} = require('../../sequelize');
const {colors} = require('../Util/myVars');
var path = require('path');
const fs = require("fs");
/*********************************************/


router.get('/AppInfoGetter/:type' , function (req,res) {
    switch (req.params.type) {
        case "city":
            cities.findAll().then(cities => {
                return res.json(cities)
            }); break;
        case "sellerType":
            sellerType.findAll().then(sellertype => {
                return res.json(sellertype)
            }); break;
        case "productGroup"  :
            productGroups.findAll().then(productGroups => {
                res.json(productGroups);

            });break;
        case "moreproductGroup" :
            if (req.query.id == null){res.status(400).json({"message":"id not found"});}else {
                products.findAll({where: {
                        groupid: req.body.id
                    }}).then(products => {
                    res.json(products);

                });
            }break;

        case "product":
            if (req.query.id == null){res.status(400).json({"message":"id not found"});}else {
                sellerProducts.findAll({where: {
                        productid: req.body.id
                    }}).then(products => {
                    var final = [];

                    function testFunction2(value, index, array) {
                        var base64str="not Found";
                        try {
                            base64str = base64_encode(value.image);

                        }catch (e) {
                            base64str = "not Found";

                        }

                        final[index] = {
                            id:value.id,
                            description:value.description,
                            price:value.price,
                            price_date_time:value.price_date_time,
                            supply_of_product:value.supply_of_product,
                            unit_of_product:value.unit_of_product,
                            productid:value.productid,
                            sellerid:value.sellerid,
                            unitid:value.unitid,
                            image:base64str
                        }
                    }
                    if (products[0] != undefined){
                        products.forEach(testFunction2);
                    } else {return res.status(404).json();}
                    res.json(final);

                });
            } break;

        case "unit":
            unit.findAll().then(unit => {
                return res.json(unit)
            }); break;

        case "carModel":
            car.findAll().then(car => {
                return res.json(car)
            });
            break;

        default:return res.status(404).json();

    }

});



module.exports = router;

