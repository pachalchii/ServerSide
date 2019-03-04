const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const { Seller , transportation ,orderProduct } = require('../../sequelize');
const {upload,loggererror , loggerinfo ,JWT_SECRET , colors} = require('../Util/myVars');
const {checkToken ,response , isThisArrayEmpty} = require("../Util/myFunctions");
/*********************************************/
var jwt = require('jwt-simple');

router.get('/order' , ( req , res )=>{


    var searchQuery = checkToken(req, res );
    if (searchQuery !== false) {

        transportation.findAll(searchQuery).then(tran => {

            if (isThisArrayEmpty(tran)) {

                return res.status(400).json({"code":700});

            }else {
                if (tran[0].Status){
                    try{
                        orderProduct.findAll({
                            where: {
                                TransportarID:tran[0].id
                            }
                        }).then(orderProduct => {
                            response(res,orderProduct).then(
                                loggerinfo.info(req.connection.remoteAddress + "transportation with id : "+tran[0].ID+" get all his/her order" )
                            );

                        })
                    } catch(err) {
                        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                        res.status(400).json({"code":700});

                    }

                } else {
                    return res.status(404).json({"code": 900});

                }

            }
        });



    }



                                        });

router.post('/order',(req,res)=>{


    var searchQuery = checkToken(req, res );
    if (searchQuery !== false) {

        transportation.findAll(searchQuery).then(tran => {

            if (isThisArrayEmpty(tran)) {

                return res.status(400).json({"code":700});

            }else {
                if (tran[0].Status){
                    try{

                        if (req.body.ID == null ){
                            res.status(400).json({"code":703});
                        } else {
                            orderProduct.findAll({where:{
                                    ID:req.body.ID
                                }}).then(order =>{
                                if (!isThisArrayEmpty(order)){
                                    if (order[0].TransportarID === tran[0].ID){
                                        order[0].update({TransportarStatus: true}).then(
                                            transportation.update({Status : false},{where:{ID:tran[0].ID}}).then(
                                                response(res,undefined).then(loggerinfo.info(req.connection.remoteAddress + "transportation with id : "+tran[0].ID +" change product status with id : "+order[0].ID))

                                            )
                                        );
                                    } else {
                                        res.status(400).json({"code":709});
                                    }                                       }else {
                                    res.status(400).json({"code":710});

                                }
                            })
                        }
                    } catch(err) {
                        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                        res.status(400).json({"code":700});

                    }
                }else {
                    return res.status(404).json({"code": 900});
                }

            }
        });



    }


});







module.exports = router;

