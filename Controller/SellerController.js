const express = require('express');
const bodyParser = require('body-parser');
const {Seller, customer} = require('./../sequelize');
var jwt = require('jwt-simple');
var md5 = require('md5');


const {colors, JWT_SECRET} = require('./../Util/myVars');
var router = express.Router();
const fs = require("fs");
const http = require("http");
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}


router.get('/list', (req, res) => {
    var final = [];

    function testFunction(value, index, array) {
        var base64str="not Found";
        try {
            base64str = base64_encode(value.logo_image);

        }catch (e) {
            base64str = "not Found";

        }

        final[index] = {
            name:value.company_name,
            image:base64str
        }
    }
    Seller.findAll().then(seller => {
        if (seller[0] != undefined){
            seller.forEach(testFunction);

        }
        res.json(final);
    });


});

module.exports = router;

