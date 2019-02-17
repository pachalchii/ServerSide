const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const { Seller , transportation ,orderProduct } = require('../../sequelize');
const {JWT_SECRET , colors} = require('../Util/myVars');
/*********************************************/
var jwt = require('jwt-simple');

router.get('/order' , ( req , res )=>{
    if (req.headers['token'] != null) {

        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.password == null || (decodedJWT.username && decodedJWT.phone_number)) {
                res.status(400).json({message: "expired token"});
            } else {
                if (decodedJWT.username != null) {
                    transportation.findAll({
                        where: {
                            username: decodedJWT.username, password: decodedJWT.password
                        }
                    }).then(tran => {

                        if (tran[0] != undefined) {
                            orderProduct.findAll({
                                where: {
                                    transportarid:tran[0].id
                                }
                            }).then(orderProduct => {
                                res.json(orderProduct);

                            })
                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                } else {
                    transportation.findAll({
                        where: {
                            phone_number: decodedJWT.phone_number, password: decodedJWT.password
                        }
                    }).then(tran => {

                        if (tran[0] != undefined) {
                            orderProduct.findAll({
                                where: {
                                    transportarid:tran[0].id
                                }
                            }).then(orderProduct => {
                                res.json(orderProduct);

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
        res.status(400).json({"message": "token not found in header"});
    }

                                        });

router.post('/order',(req,res)=>{


    if (req.headers['token'] != null) {

        try {
            var decodedJWT = jwt.decode(req.headers['token'].toString(), JWT_SECRET);
            if (decodedJWT.password == null || (decodedJWT.username && decodedJWT.phone_number)) {
                res.status(400).json({message: "expired token"});
            } else {
                if (decodedJWT.username != null) {
                    transportation.findAll({
                        where: {
                            username: decodedJWT.username, password: decodedJWT.password
                        }
                    }).then(tran => {

                        if (tran[0] != undefined) {
                           if (req.body.id == null ){
                               res.status(400).json({"message":"not enough parameter"});
                           } else {
                               orderProduct.findAll({where:{
                                   id:req.body.id
                                   }}).then(order =>{
                                       if (order[0] != undefined){
                                           if (order[0].transportarid == tran[0].id){
                                               order[0].update({transportar_status: true}).then(res.status(200));
                                           } else {
                                               res.status(400).json({"message":"in mahsol baraye in ranande nemibashad"});
                                           }                                       }else {
                                           res.status(400).json({"message":"wrong id"});

                                       }
                               })
                           }




                        }else {
                            res.status(400).json({"message":"expired token"});
                        }
                    });
                } else {
                    transportation.findAll({
                        where: {
                            phone_number: decodedJWT.phone_number, password: decodedJWT.password
                        }
                    }).then(tran => {

                        if (tran[0] != undefined) {
                            if (req.body.id == null ){
                                res.status(400).json({"message":"not enough parameter"});
                            } else {
                                orderProduct.findAll({where:{
                                        id:req.body.id
                                    }}).then(order =>{
                                    if (order[0] != undefined){
                                        if (order[0].transportarid == tran[0].id){
                                            order[0].update({transportar_status: true}).then(res.status(200));
                                        } else {
                                            res.status(400).json({"message":"in mahsol baraye in ranande nemibashad"});
                                        }
                                        
                                    }else {
                                        res.status(400).json({"message":"wrong id"});

                                    }
                                })
                            }

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
        res.status(400).json({"message": "token not found in header"});
    }



});





module.exports = router;

