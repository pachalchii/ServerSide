const express = require('express');
let router = express.Router();
/*********************************************/
const {Seller, cities,application,sellerPhoneNumber, sellerType,PriceAndSupply,SellerProductsInServiceCitie, ProductCategories, products, sellerProducts, unit, car} = require('../../sequelize');
const {statusCodes,} = require('../Util/configuration');
const {base64_encode,sendSMS,CheckForeignKey, isThisArrayEmpty} = require("../Util/Filter");
const asyncForEach = require('async-await-foreach');
/*********************************************/

router.get('/information/:type', function (req, res) {
    switch (req.params.type) {

        case "sliders":
            application.findOne({where:{ID:1}}).then(app=>{

                    let base64str1 = base64_encode(app.Slider1);
                    let base64str2 = base64_encode(app.Slider2);
                    let base64str3 = base64_encode(app.Slider3);
                    let base64str4 = base64_encode(app.Slider4);
                    let base64str5 = base64_encode(app.Slider5);

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
                CheckForeignKey(res, [{
                    ID: req.query.ID,
                    Entity: products
                }])
                    .then(status => {
                        if (status){
                            products.findAll({where: {CategoryID: req.query.ID}}).then(products => {
                                return res.json(products);
                            });
                        }
                    })
            }
            break;
        case "sellerProducts":
            if (req.query.ID == null) {
                return res.status(400).json({"code": "703"});
            } else {
                CheckForeignKey(res, [{
                    ID: req.query.ID,
                    Entity: products
                }])
                    .then(status => {
                        if (status){
                            products.findOne({where:{ID:req.query.ID}}).then(async pro=>{
                                if (pro.CategoryID === 4){
                                    await products.findAll({where:{ParentID:req.query.ID}} , {attribute:['ID']} ).then(async pros =>{
                                        pros.push(pro);
                                        let output =[];
                                        await asyncForEach(pros, async Ourproduct=>{
                                            await sellerProducts.findAll({where: {ProductID: Ourproduct.ID, }}).then( async customizeProduct => {
                                                await asyncForEach(customizeProduct,async item =>{
                                                    await Seller.findOne({where:{ID:item.SellerID}}).then(async seller=>{
                                                        await  PriceAndSupply.findOne({where:{SellerProductID : item.ID , DateTime :new Date().toISOString().slice(0, 10).toString() }}).then(async price =>{
                                                            await SellerProductsInServiceCitie.findAll({where:{SellerProductID: item.ID}}).then(
                                                                async CityServices=>{
                                                                    await  products.findOne({where:{ID:item.ProductID}}).then( async product=>{
                                                                        output.push({
                                                                            Seller:{
                                                                                Image:base64_encode(seller.LogoImage),
                                                                                Name:seller.CompanyName
                                                                            },
                                                                            Product :{
                                                                                ID:item.ID,
                                                                                Type:product.Type,
                                                                                ProductName : product.Name,
                                                                                Image: base64_encode(item.Image),
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
                                                                            PriceAndSupply : item.ShowStatus ? price : null,
                                                                            CityInService:CityServices

                                                                        });

                                                                    });
                                                                }
                                                            );

                                                        })
                                                    })
                                                });
                                            });
                                        }).then(()=>{
                                            return res.json(output);
                                        });

                                    });
                                }
                                else {
                                    await   sellerProducts.findAll({where: {ProductID: req.query.ID, ShowStatus:true}}).then(customizeProduct => {
                                        let newProducts = [];
                                        asyncForEach(customizeProduct,async item =>{
                                            await Seller.findOne({where:{ID:item.SellerID}}).then(async seller=>{
                                                await  PriceAndSupply.findOne({where:{SellerProductID : item.ID , DateTime :new Date().toISOString().slice(0, 10).toString() }}).then(async price =>{
                                                    await SellerProductsInServiceCitie.findAll({where:{SellerProductID: item.ID}}).then(
                                                        async CityServices=>{
                                                            await  products.findOne({where:{ID:item.ProductID}}).then( async product=>{
                                                                newProducts.push({
                                                                    Seller:{
                                                                        Image:base64_encode(seller.LogoImage),
                                                                        Name:seller.CompanyName
                                                                    },
                                                                    Product :{
                                                                        ID:item.ID,
                                                                        Type:product.Type,
                                                                        ProductName : product.Name,
                                                                        Image: base64_encode(item.Image),
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
                            });
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
                return res.status(400).json({"code": "703"});
            }else {
                let final = [];
                function testFunction(value, index) {
                    final[index] = {
                        ID:value.ID,
                        Name: value.CompanyName,
                        Image: base64_encode(value.LogoImage),
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
                CheckForeignKey(res, [{
                    ID: req.query.SellerID,
                    Entity: Seller
                }])
                    .then(status => {
                        if (status){
                            sellerProducts.findAll({where:{SellerID:req.query.SellerID, ShowStatus:true}}).then(async sellerProducts=>{
                                let newSellerProducts =[];
                                await asyncForEach(sellerProducts,async item=>{
                                    await  PriceAndSupply.findOne({where:{SellerProductID:item.ID  , DateTime: new Date().toISOString().slice(0, 10).toString()}}).then(
                                        async Price=>{
                                            await   SellerProductsInServiceCitie.findAll({where:{SellerProductID:item.ID}}).then( async SellerProductsInServiceCitie=>{
                                                await   products.findOne({where:{ID: item.ProductID}}).then(async product=>{
                                                    await ProductCategories.findOne({where:{ID:product.CategoryID}}, {attribute: ['ID']}).then(async category=>{
                                                        await newSellerProducts.push({
                                                            SellerProduct : {
                                                                Image: base64_encode(item.Image),
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
                                        });
                                }).then(()=>{
                                    return res.json(newSellerProducts);
                                });
                            });
                        }
                    });
            }
            break;
        case "SingleSellerProducts":
            if (req.query.SellerProductID == null) {
                return res.status(400).json({"code": "703"});
            }else {
                CheckForeignKey(res, [{
                    ID: req.query.SellerProductID,
                    Entity: sellerProducts
                }])
                    .then(status => {
                        if (status){
                            sellerProducts.findOne({where:{ID:req.query.SellerProductID, ShowStatus:true}}).then(async sellerProducts=>{
                                await  PriceAndSupply.findAll({where:{SellerProductID:sellerProducts.ID}}).then(
                                    async Price=>{
                                        await   SellerProductsInServiceCitie.findAll({where:{SellerProductID:sellerProducts.ID}}).then( async SellerProductsInServiceCitie=>{

                                            base64str = base64_encode(sellerProducts.Image);

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

                            });
                        }})
            }
            break;
        case "statusCodes":
            return res.json(statusCodes);
        default:return res.status(404).json();
    }
});

router.post('/information/applicationLink',(req)=>{
    if (req.body.PhoneNumber){
        application.findAll().then(app=>{
            sendSMS({PhoneNumber:req.body.PhoneNumber},"UpdateLink",app[0].UpdateLink);
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
                        await outPut.push(
                            {
                                sellerProduct :SP,
                                PriceAndSupply :item,
                                Product :P,
                                productImage :base64_encode(SP.Image),
                                Seller:{
                                    image:base64_encode(S.LogoImage),
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
                await outPut.push(
                    {
                        image : base64_encode(item.LogoImage),
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

