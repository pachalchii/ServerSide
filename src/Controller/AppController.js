const express = require('express');
var router = express.Router();
/*********************************************/
const {Seller, cities,application,sellerPhoneNumber, sellerType,PriceAndSupply,SellerProductsInServiceCitie, ProductCategories, products, sellerProducts, unit, car} = require('../../sequelize');
const {statusCodes} = require('../Util/configuration');
const {base64_encode, checkToken, isThisArrayEmpty} = require("../Util/Filter");
var path = require('path');
const fs = require("fs");
const rimraf = require("rimraf");
const asyncForEach = require('async-await-foreach');
/*********************************************/

router.get('/information/:type', function (req, res) {
    switch (req.params.type) {

        case "sliders":
            application.findOne({where:{ID:1}}).then(app=>{
                var base64str1 = "not Found";
                try {
                    base64str1 = base64_encode(app.Slider1);

                } catch (e) {
                    base64str1 = "not Found";

                }
                var base64str2 = "not Found";
                try {
                    base64str2 = base64_encode(app.Slider2);

                } catch (e) {
                    base64str2 = "not Found";

                }
                var base64str3 = "not Found";
                try {
                    base64str3 = base64_encode(app.Slider3);

                } catch (e) {
                    base64str3 = "not Found";

                }
                var base64str4 = "not Found";
                try {
                    base64str4 = base64_encode(app.Slider4);

                } catch (e) {
                    base64str4 = "not Found";

                }
                var base64str5 = "not Found";
                try {
                    base64str5 = base64_encode(app.Slider5);

                } catch (e) {
                    base64str5 = "not Found";

                }
                return res.json({
                    Slider1:base64str1,
                    Slider2:base64str2,
                    Slider3:base64str3,
                    Slider4:base64str4,
                    Slider5:base64str5
                });
            });
            break;
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
                return res.status(400).json({"code": "703"});
            } else {
                products.findAll({where: {CategoryID: req.query.ID}}).then(products => {
                    return res.json(products);
                });
            }
            break;
        case "sellerProducts":
            if (req.query.ID == null) {
                return res.status(400).json({"code": "703"});
            } else {

                sellerProducts.findAll({where: {ProductID: req.query.ID, ShowStatus:true}}).then(customizeProduct => {
                    var newProducts = [];
                    asyncForEach(customizeProduct,async item =>{
                        await Seller.findOne({where:{ID:item.SellerID}}).then(async seller=>{
                           await  PriceAndSupply.findOne({where:{SellerProductID : item.ID , DateTime :new Date().toISOString().slice(0, 10).toString() }}).then(async price =>{
                              await SellerProductsInServiceCitie.findAll({where:{SellerProductID: item.ID}}).then(
                                  async CityServices=>{
                                    await  products.findOne({where:{ID:item.ProductID}}).then( async product=>{

                                          var base64str = "not Found";
                                          try {
                                              base64str = base64_encode(item.Image);

                                          } catch (e) {
                                              base64str = "not Found";

                                          }
                                          var base64str1 = "not Found";
                                          try {
                                              base64str1 = base64_encode(seller.LogoImage);
                                          } catch (e) {
                                              base64str1 = "not Found";

                                          }
                                          newProducts.push({
                                              Seller:{
                                                  Image:base64str1,
                                                  Name:seller.CompanyName
                                              },
                                              Product :{
                                                  Type:product.Type,
                                                  ProductName : product.Name,
                                                  Image: base64str,
                                                  SellerID:item.SellerID,
                                                  ProductID:item.ProductID,
                                                  UnitOfProduct: item.UnitOfProduct,
                                                  UnitID:item.UnitID,
                                                  MinToSell:item.MinToSell,
                                                  MaxToSell:item.MaxToSell,
                                                  ShowStatus:item.ShowStatus,
                                                  Description:item.Description,
                                                  DiscountFor0TO200: item.DiscountFor0TO200,
                                                  DiscountFor200TO500: item.DiscountFor200TO500,
                                                  DiscountFor500TO1000: item.DiscountFor500TO1000,
                                                  DiscountFor1000TOUpper: item.DiscountFor1000TOUpper,
                                              },
                                              PriceAndSupply :price,
                                              CityInService:CityServices

                                          });
                                      });
                                   }
                               );

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
                return res.status(400).json({"code": "703"});
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
                                products.findAll().then(products=>{
                                    return res.json({
                                        "city":cities,
                                        "sellerType":sellertype,
                                        "ProductCategories":ProductCategories,
                                        "unit":unit,
                                        "car":car,
                                        "products":products
                                    });
                                });
                            });
                        });
                    });
                });
            });
            break;
        case "allSellerProducts":
            if (req.query.SellerID == null) {
                return res.status(400).json({"code": "703"});
            }else {
               sellerProducts.findAll({where:{SellerID:req.query.SellerID, ShowStatus:true}}).then(
                   async sellerProducts=>{
                        var newSellerProducts =[];
                       await asyncForEach(sellerProducts,async item=>{
                          await  PriceAndSupply.findOne({where:{SellerProductID:item.ID  , DateTime: new Date().toISOString().slice(0, 10).toString()}}).then(
                                async Price=>{
                                 await   SellerProductsInServiceCitie.findAll({where:{SellerProductID:item.ID}}).then( async SellerProductsInServiceCitie=>{
                                        var base64str = "not Found";
                                        try {
                                            base64str = base64_encode(item.Image);

                                        } catch (e) {
                                            base64str = "not Found";

                                        }
                                     await   products.findOne({where:{ID: item.ProductID}}).then(async product=>{
                                         await ProductCategories.findOne({where:{ID:product.CategoryID}}).then(async category=>{
                                             await newSellerProducts.push({
                                                 SellerProduct : {
                                                     Image: base64str,
                                                     SellerID:item.SellerID,
                                                     CategoryID: category.ID,
                                                     ProductID:item.ProductID,
                                                     UnitOfProduct: item.UnitOfProduct,
                                                     UnitID:item.UnitID,
                                                     ShowStatus:item.ShowStatus,
                                                     Description:item.Description,
                                                     DiscountFor0TO200: item.DiscountFor0TO200,
                                                     DiscountFor200TO500: item.DiscountFor200TO500,
                                                     DiscountFor500TO1000: item.DiscountFor500TO1000,
                                                     DiscountFor1000TOUpper: item.DiscountFor1000TOUpper,
                                                 },
                                                 PriceAndSupply:Price,
                                                 CityInService : SellerProductsInServiceCitie

                                             });
                                         });



                                     });
                                    });
                                }
                            );
                        }).then(()=>{
                            return res.json(newSellerProducts);
                        });
                    }
                );
            }
            break;
        case "SingleSellerProducts":
            if (req.query.SellerProductID == null) {
                return res.status(400).json({"code": "703"});
            }else {
                sellerProducts.findOne({where:{ID:req.query.SellerProductID, ShowStatus:true}}).then(
                    async sellerProducts=>{
                            await  PriceAndSupply.findAll({where:{SellerProductID:sellerProducts.ID}}).then(
                                async Price=>{
                                    await   SellerProductsInServiceCitie.findAll({where:{SellerProductID:sellerProducts.ID}}).then( async SellerProductsInServiceCitie=>{
                                        var base64str = "not Found";
                                        try {
                                            base64str = base64_encode(sellerProducts.Image);

                                        } catch (e) {
                                            base64str = "not Found";

                                        }
                                        await   products.findOne({where:{ID: sellerProducts.ProductID}}).then(async product=>{
                                            await ProductCategories.findOne({where:{ID:product.CategoryID}}).then(async category=>{
                                                return res.json({
                                                    SellerProduct : {
                                                        Image: base64str,
                                                        SellerID:sellerProducts.SellerID,
                                                        CategoryID: category.ID,
                                                        MinToSell:sellerProducts.MinToSell,
                                                        ProductID:sellerProducts.ProductID,
                                                        UnitOfProduct: sellerProducts.UnitOfProduct,
                                                        UnitID:sellerProducts.UnitID,
                                                        ShowStatus:sellerProducts.ShowStatus,
                                                        Description:sellerProducts.Description,
                                                        DiscountFor0TO200: sellerProducts.DiscountFor0TO200,
                                                        DiscountFor200TO500: sellerProducts.DiscountFor200TO500,
                                                        DiscountFor500TO1000: sellerProducts.DiscountFor500TO1000,
                                                        DiscountFor1000TOUpper: sellerProducts.DiscountFor1000TOUpper,
                                                    },
                                                    PriceAndSupply:Price,
                                                    CityInService : SellerProductsInServiceCitie

                                                });
                                            })

                                        });
                                    });
                                }
                            );

                    }
                );
            }
            break;
        case "statusCodes":
            return res.json(statusCodes);
            break;


        default:
            return res.status(404).json();
    }
});

router.post('/information/applicationLink',(req,res)=>{
    if (req.body.PhoneNumber){
        var Kavenegar = require('kavenegar');
        var api = Kavenegar.KavenegarApi({
            apikey: '38304E493253685735793161654676314C497056347073715775654A45726771'
        });
        application.findAll().then(app=>{
            api.Send({
                    message: app[0].UpdateLink ,
                    sender: "10004346",
                    receptor: req.body.PhoneNumber
                },
                function (response, status) {
                    return res.json();
                });
        });

    }
});

router.get('/products' , (req,res)=>{

    PriceAndSupply.findAll({where:{DateTime:new Date().toISOString().slice(0, 10).toString()}}).then(async PS=>{
        let outPut = [];
        await asyncForEach(PS,async item=>{
            await sellerProducts.findOne({where:{ID:item.SellerProductID}}).then(async SP=>{
                await products.findOne({where:{ID:SP.ProductID}}).then(async P=>{
                    await Seller.findOne({where:{ID:SP.SellerID}}).then(async S=>{
                        var base64str = "not Found";
                        try {
                            base64str = base64_encode(SP.Image);

                        } catch (e) {
                            base64str = "not Found";

                        }
                        var base64str1 = "not Found";
                        try {
                            base64str1 = base64_encode(S.LogoImage);

                        } catch (e) {
                            base64str1 = "not Found";

                        }
                        await outPut.push(
                            {
                                sellerProduct :SP,
                                PriceAndSupply :item,
                                Product :P,
                                productImage :base64str,
                                Seller:{
                                    image:base64str1,
                                    name:S.CompanyName
                                }
                            }
                        );
                    });
                });
            })
        }).then(()=>{
            return res.json(outPut);
        });





    });
});

router.get('/sellers' , (req,res)=>{

    Seller.findAll().then(async S=>{
        let outPut = [];
        asyncForEach(S,async item =>{
            await sellerPhoneNumber.findOne({where:{ID:item.PhoneNumberID}}).then(async PN=>{
                var base64str = "not Found";
                try {
                    base64str = base64_encode(item.LogoImage);

                } catch (e) {
                    base64str = "not Found";

                }
                await outPut.push(
                    {
                        image : base64str,
                        CompanyName :item.CompanyName,
                        CompleteAddressDescription :item.CompleteAddressDescription,
                        GoogleMapAddressLink :item.GoogleMapAddressLink,
                        OwnerName :item.OwnerName,
                        OwnerFamilyName :item.OwnerFamilyName,
                        OwnerPhoneNumber :item.OwnerPhoneNumber,
                        PartTime2 :item.PartTime2,
                        CompanyAddressCityID :item.CompanyAddressCityID,
                        PhoneNumberID : PN

                    }
                );
            });
        }).then(
            ()=>{
                return res.json(outPut);
            }
        );
    });

});


module.exports = router;

