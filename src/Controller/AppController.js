const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {Seller, cities, sellerType, ProductCategories, products, sellerProducts, unit, car} = require('../../sequelize');
const {} = require('../Util/configuration');
const {base64_encode, checkToken, isThisArrayEmpty} = require("../Util/Filter");
var path = require('path');
const fs = require("fs");
const rimraf = require("rimraf");
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
                                       SellerImage = base64_encode(seller[0].LogoImage);
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
                    return res.json(final);
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
        default:
            return res.status(404).json();
    }
});

module.exports = router;

