const express = require('express');
const bodyParser = require('body-parser');
const {Seller , cities , sellerType , productGroups , products , sellerProducts} = require('./../sequelize');
const {colors} = require('./../Util/myVars');
var router = express.Router();


// get app information
router.get('/city', function (req, res) {
    cities.findAll().then(cities => {
       return res.json(cities)
    });
});

router.get('/sellerType', function (req, res) {
    sellerType.findAll().then(sellertype => {
        return res.json(sellertype)
    });
});

router.get('/category/productGroup', function (req, res) {
    productGroups.findAll().then(productGroups => {
            res.json(productGroups);

        });
});

router.get('/category/productGroup/product', function (req, res) {
    if (req.body.id == null){res.status(400).json({"message":"id not found"});}else {
        products.findAll({where: {
            groupid: req.body.id
            }}).then(products => {
            res.json(products);

        });
    }

});

router.get('/product', function (req, res) {

    if (req.body.id == null){res.status(400).json({"message":"id not found"});}else {
        sellerProducts.findAll({where: {
                productid: req.body.id
            }}).then(products => {
            res.json(products);

        });
    }
});








module.exports = router;

