const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const { Seller , transportation ,orderProduct } = require('../../sequelize');
const {loggererror , loggerinfo ,JWT_SECRET , colors} = require('../Util/myVars');
const {response , isThisArrayEmpty} = require("../Util/myFunctions");
/*********************************************/
var jwt = require('jwt-simple');

router.get('/order' , ( req , res )=>{


    var searchQuery = checkToken(req, res, "seller" );
    if (searchQuery !== false) {

        transportation.findAll(searchQuery).then(tran => {

            if (isThisArrayEmpty(tran)) {

                return res.status(400).json({"message":"expired token"});

            }else {
try{
                orderProduct.findAll({
                    where: {
                        transportarid:tran[0].id
                    }
                }).then(orderProduct => {
                    response(res,orderProduct).then(
                        loggerinfo.info(req.connection.remoteAddress + "transportation with id : "+tran[0].id+" get all his/her order" )
                    );

                })
            } catch(err) {
                loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                res.status(400).json({"message":"expired token"});

            }
            }
        });



    }



                                        });

router.post('/order',(req,res)=>{


    var searchQuery = checkToken(req, res, "seller" );
    if (searchQuery !== false) {

        transportation.findAll(searchQuery).then(tran => {

            if (isThisArrayEmpty(tran)) {

                return res.status(400).json({"message":"expired token"});

            }else {
                try{

                    if (req.body.id == null ){
                        res.status(400).json({"message":"not enough parameter"});
                    } else {
                        orderProduct.findAll({where:{
                                id:req.body.id
                            }}).then(order =>{
                            if (!isThisArrayEmpty(order)){
                                if (order[0].transportarid === tran[0].id){
                                    order[0].update({transportar_status: true}).then(
                                        response(res,undefined).then(loggerinfo.info(req.connection.remoteAddress + "transportation with id : "+tran[0].id +" change product status with id : "+order[0].id))
                                    );
                                } else {
                                    res.status(400).json({"message":"in mahsol baraye in ranande nemibashad"});
                                }                                       }else {
                                res.status(400).json({"message":"wrong id"});

                            }
                        })
                    }
                } catch(err) {
                    loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + err);
                    res.status(400).json({"message":"expired token"});

                }
            }
        });



    }


});





module.exports = router;

