const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {checkLimitTime, filterRequest, checkToken,FilteringRequest, isThisArrayEmpty, base64_encode, addRoleInfoCheck} = require('../Util/Filter');
const {handleError, upload} = require('../Util/configuration');
const {orderNazarSanji,SellerProductsInServiceCitie,orderProduct,Order, customer, sellerOperator, PriceAndSupply,Seller, sellerProducts, sellerWareHouse, transportation, sequelize, products, unit} = require('../../sequelize');
/*********************************************/
var jwt = require('jwt-simple');
var md5 = require('md5');
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const http = require("http");


//new

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

router.put('/Pricing' , (req, res) => {

    try {

        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                switch (data.whatToDo) {
                    case "create":
                        PriceAndSupply.create(data.data).then(()=>{return res.json()});
                        break;
                    case "update":
                        data.Entity.update(data.data).then(()=>{return res.json()});
                        break
                }
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

router.put('/product',(req,res)=>{

    try {

        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({
                        Description: req.body.Description || data.Description,
                        DiscountFor0TO200: req.body.DiscountFor0TO200 || data.DiscountFor0TO200,
                        DiscountFor200TO500: req.body.DiscountFor200TO500 || data.DiscountFor200TO500,
                        DiscountFor500TO1000: req.body.DiscountFor500TO1000 || data.DiscountFor500TO1000,
                        DiscountFor1000TOUpper: req.body.DiscountFor1000TOUpper || data.DiscountFor1000TOUpper,
                        MinToSell: req.body.MinToSell || data.MinToSell,
                        UnitOfProduct : req.body.UnitOfProduct || data.UnitOfProduct,
                        SupplyOFProduct: req.body.SupplyOFProduct || data.SupplyOFProduct,
                        ShowStatus: req.body.ShowStatus || data.ShowStatus
                    }
                ).then(()=>{return res.json();});
                return res.json();
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }

});

router.post('/CancleOrderProduct',(req,res)=>{
    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({DeleteStatus: true , SellerReason:  req.body.SellerReason}).then(async ()=>{
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

router.post('/ServiceCities', (req, res) => {


    try {

        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                console.log(data)
                SellerProductsInServiceCitie.create({ SellerProductID: 1, CityID: 3 }).then(()=>{return res.json();})
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }



});

router.get('/Role', (req, res) => {


    try {

        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data[0].create(data[1]).then(()=>{return res.json()})
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }



});


//old

router.get('/Singlelist', (req, res) => {
    if (req.query.SellerID == null) {
        return res.status(400).json({"message": "SellerID not found"});
    }

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
            ID: req.query.SellerID
        }
    }).then(seller => {
        if (!isThisArrayEmpty(seller)) {
            seller.forEach(testFunction);
            return res.json(final);
        }

    });


});

router.post('/addRole', upload.single("Image"), (req, res) => {
    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {
                if (seller[0].Status){
                    if (req.body.Role == null) {
                        return res.status(400).json({"code": 703});
                    } else if (addRoleInfoCheck(req, res, req.body.Role)) {
                        var status = true;
                        switch (req.body.Role) {

                            case "seller":
                                if (req.file != null) {

                                    const tempPath = req.file.path;
                                    const targetPath = path.join(__dirname, "./../../uploads/seller/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                                    image = targetPath;
                                    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                        fs.rename(tempPath, targetPath, err => {
                                            if (err) return status= false; handleError(err, res);
                                        });
                                        fs.unlink(tempPath, err => {});
                                    } else {
                                        fs.unlink(tempPath, err => {
                                            if (err)  {status = false ;return handleError(err, res);}

                                            return res
                                                .status(403)
                                                .contentType("text/plain")
                                                .end("this format of image is not under support");
                                        });
                                    }



                                } else {
                                    image = "notSetYet";
                                }
                                if (status){
                                    sequelize.transaction().then(function (t) {
                                        Seller.create({
                                            ID: req.body.PhoneNumberID,
                                            CompanyName: req.body.CompanyName,
                                            CompleteAddressDescription: req.body.CompleteAddressDescription,
                                            Enable: true,
                                            Point: 0,
                                            RegistrationDateTime: req.body.RegistrationDateTime,
                                            GoogleMapAddressLink: req.body.GoogleMapAddressLink,
                                            LogoImage: image,
                                            OwnerFamilyName: req.body.OwnerFamilyName,
                                            OwnerName: req.body.OwnerName,
                                            Password: md5(req.body.Password),
                                            OwnerPhoneNumber: req.body.OwnerPhoneNumber,
                                            Username: req.body.Username,
                                            CompanyAddressCityID: req.body.CompanyAddressCityID,
                                            PhoneNumberID: req.body.PhoneNumberID,
                                            TypeID: 2

                                        }, {
                                            transaction: t
                                        }).then(function () {
                                            t.commit();
                                            return res.json();

                                        }).catch(function (error) {
                                            t.rollback();
                                            if (error.parent.errno === 1062) {
                                                return res.status(400).json({"code": 705})
                                            }
                                            else {
                                                return res.status(400).json({"code": 706})

                                            }
                                        });
                                    });

                                }

                                break;
                            case "wareHouse":
                                if (req.file != null) {

                                    const tempPath = req.file.path;
                                    const targetPath = path.join(__dirname, "./../../uploads/wareHouse/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                                    image = targetPath;
                                    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                        fs.rename(tempPath, targetPath, err => {
                                            if (err) {status = false;return handleError(err, res);}
                                            fs.unlink(tempPath, err => {});
                                        });
                                    } else {
                                        fs.unlink(tempPath, err => {
                                            if (err) {status=false;return handleError(err, res);}

                                            return res
                                                .status(403)
                                                .contentType("text/plain")
                                                .end("this format of image is not under support");
                                        });
                                    }


                                } else {
                                    image = "notSetYet";
                                }
                                if(status){
                                    sequelize.transaction().then(function (t) {
                                        sellerWareHouse.create({
                                            AgentFamilyName: req.body.AgentFamilyName,
                                            AgentName: req.body.AgentName,
                                            Birthdate: req.body.BirthDate,
                                            CellPhoneNumber: req.body.CellPhoneNumber,
                                            Image: image,
                                            Password: md5(req.body.Password),
                                            PhoneNumber: req.body.PhoneNumber,
                                            Point: 0,
                                            Status: true,
                                            Username: req.body.Username,
                                            WareHouseCompleteAddressDescription: req.body.WareHouseCompleteAddressDescription,
                                            WareHouseGoogleMapAddressLink: req.body.WareHouseGoogleMapAddressLink,
                                            WareHouseAddressCityID: req.body.WareHouseAddressCityID,
                                            SellerID: seller[0].ID

                                        }, {
                                            transaction: t
                                        }).then(function () {
                                            t.commit();
                                            return res.json();
                                        }).catch(function (error) {
                                            t.rollback();
                                            console.log(error)
                                            if (error.parent.errno === 1062) {
                                                return res.status(400).json({"code": 706})
                                            }
                                            else {
                                                return res.status(400).json({"code": 500})

                                            }
                                        });
                                    });

                                }


                                break;
                            case "operator" :
                                if (req.file != null) {

                                    const tempPath = req.file.path;
                                    const targetPath = path.join(__dirname, "./../../uploads/operator/" + req.body.Username + path.extname(req.file.originalname).toLowerCase());
                                    image = targetPath;
                                    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                                        fs.rename(tempPath, targetPath, err => {
                                            if (err) {status = false ;return handleError(err, res);}
                                            fs.unlink(tempPath, err => {});
                                        });
                                    } else {
                                        fs.unlink(tempPath, err => {
                                            if (err){ status = false;return handleError(err, res);}

                                            return res
                                                .status(403)
                                                .contentType("text/plain")
                                                .end("this format of image is not under support");
                                        });
                                    }


                                } else {
                                    image = "notSetYet";
                                }
                                if (status){
                                    sequelize.transaction().then(function (t) {
                                        sellerOperator.create({
                                            Birthdate: req.body.BirthDate,
                                            FamilyName: req.body.FamilyName,
                                            Image: image,
                                            Name: req.body.Name,
                                            Password: md5(req.body.Password),
                                            PhoneNumber: req.body.PhoneNumber,
                                            Point: 0,
                                            Status: true,
                                            Username: req.body.Username,
                                            SellerID: seller[0].ID
                                        }, {
                                            transaction: t
                                        }).then(function () {
                                            t.commit();
                                            return res.json();

                                        }).catch(function (error) {
                                            t.rollback();
                                            console.log(error)
                                            if (error.parent.errno === 1062) {
                                                return res.status(400).json({"code": 708})
                                            }
                                            else {
                                                return res.status(400).json({"code": 500})

                                            }
                                        });
                                    });
                                }


                                break;

                            default :
                                return res.status(404).json({"message": "invalid role type"});
                        }

                    }
                } else {
                    return res.status(404).json({"code": 900});
                }

            }
        });


    }

});

router.get('/Subtypes', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {
                if (seller[0].Status){

                    sellerWareHouse.findAll({
                        where: {
                            SellerID: seller[0].ID
                        }
                    }).then(wareHouses => {

                        sellerOperator.findAll({
                            where: {
                                SellerID: seller[0].ID
                            }
                        }).then(sellerOperator => {

                            var wareHousesfinal=[];
                            var  sellerOperatorfinal=[];
                            function wareHouseIteration(value,index) {
                                var base64str = "not Found";
                                try {
                                    base64str = base64_encode(value.Image);

                                } catch (e) {
                                    base64str = "not Found";

                                }
                                wareHousesfinal[index] = {
                                    ID: value.ID,
                                    AgentName: value.AgentName,
                                    AgentFamilyName: value.AgentFamilyName,
                                    SellerID: value.SellerID,
                                    Username: value.Username,
                                    Birthdate: value.Birthdate,
                                    PhoneNumber: value.PhoneNumber,
                                    CellPhoneNumber: value.CellPhoneNumber,
                                    Status: value.Status,
                                    Point: value.Point,
                                    Image: base64str,
                                    WareHouseAddressCityID: value.WareHouseAddressCityID
                                    , WareHouseGoogleMapAddressLink: value.WareHouseGoogleMapAddressLink,
                                    WareHouseCompleteAddressDescription: value.WareHouseCompleteAddressDescription

                                };
                            }
                            function OperatorIteration(value,index){
                                var base64str="not Found";
                                try {
                                    base64str = base64_encode(value.Image);

                                }catch (e) {
                                    base64str = "not Found";

                                }
                                sellerOperatorfinal[index]={
                                    ID:value.ID,
                                    Name:value.Name,
                                    FamilyName  :value. 	 FamilyName  ,
                                    SellerID:value.SellerID,
                                    Username:value.Username,
                                    Birthdate:value.Birthdate,
                                    PhoneNumber:value.PhoneNumber,
                                    ModelID:value. 	ModelID,
                                    Status:value. 	Status,
                                    Point:value. 	Point,
                                    Image:base64str

                                }
                            }

                                wareHouses.forEach(wareHouseIteration);
                                sellerOperator.forEach(OperatorIteration);


                            response(res, {
                                WareHouse: {wareHousesfinal},
                                Operator: {sellerOperatorfinal}
                            }).then(function(){
                                }
                            );


                        });
                    });



                } else {
                    return res.status(404).json({"code": 900});
                }



            }
        });


    }


});

router.get('/orderProduct', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {


                return res.status(400).json({"code": 700});

            } else {
                if (seller[0].Status){
                    orderProduct.findAll({where:{
                            SellerID:seller[0].id
                        }}).then(
                        orderProduct=>{
                            return res.json(orderProduct);
                        }

                    );


                } else {
                    return res.status(404).json({"code": 900});
                }




            }
        });


    }


});

router.post('/disableUser', (req, res) => {
    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {
                if (seller[0].Status){
                    if (req.body.Role == null || req.body.ID == null) {
                        return res.status(400).json({"code": 703});

                    } else {
                        switch (req.body.Role) {

                            case "seller":
                                Seller.update({Status:false},{where:{ID:req.body.ID}}).then(
                                    tes=>{
                                        return res.json();
                                    }
                                );
                                break;
                            case "wareHouse":
                                sellerWareHouse.update({Status:false},{where:{ID:req.body.ID}}).then(
                                    tes=>{
                                        return res.json();
                                    }
                                );
                                break;
                            case "operator" :
                                sellerOperator.update({Status:false},{where:{ID:req.body.ID}}).then(
                                    tes=>{
                                        return res.json();
                                    }
                                );
                                break;

                            default :
                                return res.status(404).json({"message": "invalid role type"});
                        }

                    }
                } else {
                    return res.status(404).json({"code": 900});
                }



            }
        });


    }

});

router.post('/enableUser', (req, res) => {
    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        Seller.findAll(searchQuery).then(seller => {

            if (isThisArrayEmpty(seller)) {

                return res.status(400).json({"code": 700});

            } else {
                if (seller[0].Status){
                    if (req.body.Role == null || req.body.ID == null) {
                        return res.status(400).json({"code": 703});
                    } else {
                        switch (req.body.Role) {

                            case "seller":
                                Seller.update({Status:true},{where:{ID:req.body.ID}}).then(
                                    tes=>{
                                        return res.json();
                                    }
                                );
                                break;
                            case "wareHouse":
                                sellerWareHouse.update({Status:true},{where:{ID:req.body.ID}}).then(
                                    tes=>{
                                        return res.json();
                                    }
                                );
                                break;
                            case "operator" :
                                sellerOperator.update({Status:true},{where:{ID:req.body.ID}}).then(
                                    tes=>{
                                        return res.json();
                                    }
                                );
                                break;

                            default :
                                return res.status(404).json({"message": "invalid role type"});
                        }

                    }
                } else {
                    return res.status(404).json({"code": 900});
                }



            }
        });


    }

});


module.exports = router;

