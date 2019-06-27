const express = require('express');
var router = express.Router();
/*********************************************/
const {sendSMS,FilteringRequest} = require('../Util/Filter');
const {AlramMessages, upload} = require('../Util/configuration');
const {SellerProductsInServiceCitie,Order, PriceAndSupply,Seller, sellerProducts, sequelize} = require('../../sequelize');


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

router.get('/Singlelist',(req,res)=>{
    Seller.findOne({where:{ID:req.query.SellerID}}).then(seller=>{
        if (seller != null){
            return res.json(seller)
        }else {
            return res.status(404)
        }

    });
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

router.post('/ServiceCitiesDelete', (req, res) => {


    try {

        FilteringRequest(req, res, (err, data) => {

            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                SellerProductsInServiceCitie.destroy({where:{ID:data.ID}}).then(() => {
                    return res.json();
                }).catch(e => {
                    return res.status(400).json({"code": 724});
                })
            }

        });

    } catch (e) {
        return res.status(500).json({"code": 500});
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
                SellerProductsInServiceCitie.create(data).then(()=>{return res.json();})
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }

});

router.post('/accept', (req, res) => {


    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({Policy:true}).then(()=>{return res.json();});
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.post('/Role', upload.single("Image"),(req, res) => {


    try {

        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {

                sequelize.transaction().then(function (t) {
                    data[0].create(data[1], {
                        transaction: t
                    }).then(savedUser=> {
                        t.commit();
                        sendSMS(savedUser,AlramMessages("AddRole",""));
                        return res.json();

                    }).catch(function (error) {
                        t.rollback();
                        console.log(error)
                        if (error.parent.errno === 1062) {
                            return res.status(400).json({"code": 705})
                        }
                        else {
                            return res.status(400).json({"code": 706})

                        }
                    });
                });

            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }



});

router.get('/SubType',(req,res)=>{

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

router.post('/Enabled', (req, res) => {

    try {

        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data[0].update(data[1]).then(
                    answer=>{
                        return res.json();
                    }
                );
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }

});

router.put('/PartTime', (req, res) => {

    try {

        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({PartTime2:req.body.PartTime2}).then(()=>{
                    return res.json();
                });
            }

        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }

});



module.exports = router;

