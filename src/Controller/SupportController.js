const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {loggererror ,loggerinfo,upload, colors} = require('../Util/myVars');
const {response,filterRequest,isThisArrayEmpty , checkToken} = require('../Util/myFunctions');

const { chat,support,orderProduct, Seller ,products , sequelize, takhfifProduct , sellerProducts , Order,cities,addresses,customer} = require('../../sequelize');
const Op = sequelize.Op;




router.get('/message', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        support.findAll(searchQuery).then(support => {

            if (isThisArrayEmpty(support)) {

                return res.status(400).json({"code": 700});

            } else {

                chat.findAll({where:{   [Op.or]: [{ToID: "111"+support[0].ID}, {FromID: "111"+support[0].ID}]}}).then(
                    message=>{
                        return res.status(200).json(message);
                    }

                )

            }
        });


    }

});

router.post('/message', (req, res) => {

    var searchQuery = checkToken(req, res);
    var requestFilter = filterRequest(req, res , "Smessage");

    if (searchQuery && requestFilter) {

        support.findAll(searchQuery).then(support => {

            if (isThisArrayEmpty(support)) {

                return res.status(400).json({"code": 700});

            } else {
                chat.create({
                    FromID:"111"+support[0].ID,
                    ToID:"222"+req.body.ToID,
                    Message:req.body.Message,
                    DateTimeSend:new Date().getTime()

                });
                return res.json();
            }




        });


    }

});



module.exports = router;

