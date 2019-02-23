const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {loggerinfo,upload, colors} = require('../Util/myVars');
const {response,filterRequest,isThisArrayEmpty , checkToken} = require('../Util/myFunctions');

const {cities,addresses,customer} = require('../../sequelize');


router.post('/address', (req, res) => {
    var searchQuery = checkToken(req, res);
    var AddresFilter = filterRequest(req,res,"customerAddress");
    try {
            if (searchQuery && AddresFilter){
                customer.findAll(searchQuery).then(
                    customer=>{
                        if (!isThisArrayEmpty(customer)){
                            cities.findAll({where:{ID:req.body.CityID}}).then(
                                city=>{
                                    if (!isThisArrayEmpty(city)) {
                                        addresses.create({
                                            CustomerID:customer[0].ID,
                                            CityID:req.body.CityID,
                                            GoogleMapAddressLink:req.body.GoogleMapAddressLink,
                                            CompleteAddressDescription:req.body.CompleteAddressDescription,
                                            CustomName:req.body.CustomName
                                        });
                                        response(res,undefined).then(
                                            loggerinfo.info("user with id : "+customer[0].ID+" add a addres with ")
                                        );

                                    }else {
                                        return res.status(404).json();
                                    }
                                }
                            );



                        }else {
                            return res.status(404).json({"code": 700});
                        }
                    }
                );


            }


    } catch (e) {
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
        res.status(500).json({"code": 500});


    }

});

router.get('/address', (req, res) => {
    var searchQuery = checkToken(req, res);
    try {
        if (searchQuery ){
            customer.findAll(searchQuery).then(
                customer=>{
                    if (!isThisArrayEmpty(customer)){
                        addresses.findAll({where: {CustomerID: customer[0].ID}}).then(
                            addresses=>{
                                response(res,addresses).then(
                                    loggerinfo.info("customer with id :"+customer[0].ID+ " get all his address")
                                )
                            }
                        )


                    }else {
                        return res.status(404).json({"code": 700});
                    }
                }
            );


        }


    } catch (e) {
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
        res.status(500).json({"code": 500});


    }
});

router.post('/payment', (req, res) => {
});


module.exports = router;

