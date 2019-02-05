const express = require('express');
const bodyParser = require('body-parser');
const {Seller, customer} = require('./../sequelize');
var jwt = require('jwt-simple');
var md5 = require('md5');


const {colors, JWT_SECRET} = require('./../Util/myVars');
var router = express.Router();


router.get('/list', (req, res) => {

    if (req.headers['token'] != null) {

        try {
            console.log(req.headers['token'].toString())
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            console.log(decodedJWT);
            if (decodedJWT.password == null || (decodedJWT.username && decodedJWT.phone_number)) {
                res.status(400).json({message: "expired token"});
            } else {
                if (decodedJWT.username != null) {
                    customer.findAll({
                        where: {
                            username: decodedJWT.username, password: decodedJWT.password
                        }
                    }).then(customer => {
                        if (customer[0] != undefined) {
                            Seller.findAll().then(seller => {
                                res.json(seller);
                            })
                        }else {
                            res.status(400).json({"message":"expired token"});
                        }

                    });
                } else {
                    customer.findAll({
                        where: {
                            phone_number: decodedJWT.phone_number, password: decodedJWT.password
                        }
                    }).then(customer => {
                        if (customer[0] != undefined) {
                            Seller.findAll().then(seller => {
                                res.json(seller);
                            })
                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                }

            }
        } catch(err) {
            console.log(err)
            res.status(400).json({"message":"expired token"});

        }





    } else {
        res.status(400).json({"message": "token not found in body"});
    }


});

module.exports = router;

