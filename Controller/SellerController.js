const express = require('express');
const bodyParser = require('body-parser');
const { Seller } = require('./../sequelize');

const {colors} = require('./../Util/myVars');
var router = express.Router();


router.get('/list' , (req,res) => {

    Seller.findAll().then(seller=>{
        res.json(seller);
    })






});

module.exports = router;

