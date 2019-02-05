const express = require('express');
const bodyParser = require('body-parser');
const {Seller , cities} = require('./../sequelize');
const {colors} = require('./../Util/myVars');
var router = express.Router();

// get app information
router.get('/city', function (req, res) {
    cities.findAll().then(cities => {
       return res.json(cities)
    });
});


module.exports = router;

