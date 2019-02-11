const express = require('express');
const bodyParser = require('body-parser');
const {Seller , cities , sellerType , productGroups , products , sellerProducts , unit ,  car} = require('./../sequelize');
const {colors} = require('./../Util/myVars');
var router = express.Router();
var path = require('path');
const fs = require("fs");

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}


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

router.post('/category/productGroup/product', function (req, res) {
    if (req.body.id == null){res.status(400).json({"message":"id not found"});}else {
        products.findAll({where: {
            groupid: req.body.id
            }}).then(products => {
                res.json(products);

        });
    }

});

router.post('/product', function (req, res) {

    if (req.body.id == null){res.status(400).json({"message":"id not found"});}else {
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
    }
});

router.get('/unit', function (req, res) {
    unit.findAll().then(unit => {
        return res.json(unit)
    });
});

router.get('/carModel', function (req, res) {
    car.findAll().then(car => {
        return res.json(car)
    });
});



module.exports = router;

