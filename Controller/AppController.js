const express = require('express');
const bodyParser = require('body-parser');
const {Seller , cities , sellerType} = require('./../sequelize');
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

module.exports = router;

