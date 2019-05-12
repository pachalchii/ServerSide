const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {Seller, cities, sellerType,PriceAndSupply, ProductCategories, products, sellerProducts, unit, car} = require('../../sequelize');
const {} = require('../Util/configuration');
const {base64_encode, checkToken, isThisArrayEmpty} = require("../Util/Filter");
var path = require('path');
const fs = require("fs");
const rimraf = require("rimraf");
const asyncForEach = require('async-await-foreach');
/*********************************************/
router.get('/information/:type', function (req, res) {
    switch (req.params.type) {

        case "city":
            cities.findAll().then(cities => {
                return res.json(cities);
            });
            break;
        case "sellerType":
            sellerType.findAll().then(sellertype => {
                return res.json(sellertype);
            });
            break;
        case "productCategories"  :
            ProductCategories.findAll().then(ProductCategories => {
                return res.json(ProductCategories);
            });
            break;
        case "products" :
            if (req.query.ID == null) {
                res.status(400).json({"message": "id not found"});
            } else {
                products.findAll({where: {CategoryID: req.query.ID}}).then(products => {
                    return res.json(products);
                });
            }
            break;
        case "sellerProducts":
            if (req.query.ID == null) {
                res.status(400).json({"message": "id not found"});
            } else {

                sellerProducts.findAll({where: {ProductID: req.query.ID}}).then(products => {
                    var newProducts = [];
                    asyncForEach(products,async item =>{
                        await Seller.findOne({where:{ID:item.SellerID}}).then(async seller=>{
                            item.SellerName = seller.Name;
                           await  PriceAndSupply.findOne({where:{SellerProductID : item.ID , DateTime :new Date().toISOString().slice(0, 10).toString() }}).then(price =>{
                                newProducts.push({
                                    product :item,
                                    PriceAndSupply :price

                                });
                            })
                        })

                    }).then(()=>{
                        return res.json(newProducts);
                    });

                });
            }
            break;
        case "unit":
            unit.findAll().then(unit => {
                return res.json(unit);
            });
            break;
        case "carModel":
            car.findAll().then(car => {
                return res.json(car);
            });
            break;
        case "sellerList" :
            if (req.query.CityID == null) {
                return res.status(400).json({"message": "cityId not found"});
            }else {
                var final = [];

                function testFunction(value, index, array) {
                    var base64str = "not Found";
                    try {
                        base64str = base64_encode(value.LogoImage);

                    } catch (e) {
                        base64str = "not Found";

                    }

                    final[index] = {
                        ID:value.ID,
                        Name: value.CompanyName,
                        Image: base64str,
                        TypeID:value.TypeID,
                        OwnerName:value.OwnerName,
                        OwnerFamilyName:value.OwnerFamilyName,
                        EstablishedDate:value.EstablishedDate,
                        RegistrationDateTime:value.RegistrationDateTime,
                        Point:value.Point,
                        PhoneNumberID:value.PhoneNumberID,
                        CompanyAddressCityID:value.CompanyAddressCityID,
                        CompleteAddressDescription:value.CompleteAddressDescription,
                        GoogleMapAddressLink:value.GoogleMapAddressLink,
                        OwnerPhoneNumber:value.OwnerPhoneNumber

                    }
                }
                Seller.findAll({
                    where: {
                        TypeID: 1,
                        CompanyAddressCityID: req.query.CityID
                    }
                }).then(seller => {
                    if (!isThisArrayEmpty(seller)) {
                        seller.forEach(testFunction);
                    }
                    return res.json(final);
                });
            }
        break;
        case "all":
            cities.findAll().then(cities => {
                sellerType.findAll().then(sellertype => {
                    ProductCategories.findAll().then(ProductCategories => {
                        unit.findAll().then(unit => {
                            car.findAll().then(car => {
                                return res.json({
                                    "city":cities,
                                    "sellerType":sellertype,
                                    "ProductCategories":ProductCategories,
                                    "unit":unit,
                                    "car":car
                                });
                            });
                        });
                    });
                });
            });
            break;

        default:
            return res.status(404).json();
    }
});

module.exports = router;

