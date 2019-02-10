const express = require('express');
const bodyParser = require('body-parser');
const { customer } = require('./../sequelize');

const {colors} = require('./../Util/myVars');
var router = express.Router();




/*router.post('/order' , (req,res)=>{
    if (req.headers['token'] != null) {

        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
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

                            if (req.body.supply == null ||
                                req.body.)




                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                } else {
                    customer.findAll({
                        where: {
                            owner_phone_number: decodedJWT.owner_phone_number, password: decodedJWT.password
                        }
                    }).then(customer => {

                        if (customer[0] != undefined) {









                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                }

            }
        } catch(err) {
            console.log(err);
            res.status(400).json({"message":"expired token"});

        }





    } else {
        res.status(400).json({"message": "token not found in header"});
    }

} );*/

router.get('/orders' , (req,res)=>{} );

router.post('/payment' , (req,res)=>{});










module.exports = router;

