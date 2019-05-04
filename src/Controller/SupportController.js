const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {upload, colors} = require('../Util/configuration');
const {filterRequest,isThisArrayEmpty , checkToken} = require('../Util/Filter');

const { chat,support,orderProduct, Seller ,products , sequelize, takhfifProduct , sellerProducts , Order,cities,addresses,customer} = require('../../sequelize');
const Op = sequelize.Op;




router.get('/message', (req, res) => {

    var searchQuery = checkToken(req, res);
    if (searchQuery) {

        support.findAll(searchQuery).then(support => {

            if (isThisArrayEmpty(support)) {

                return res.status(400).json({"code": 700});

            } else {
                if (support[0].Status){

                    chat.findAll({where:{   [Op.or]: [{ToID: "111"+support[0].ID}, {FromID: "111"+support[0].ID}]}}).then(
                        message=>{
                            return res.status(200).json(message);
                        }

                    )

                } else {
                    return res.status(404).json({"code": 900});

                }

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
                if (support[0].Status){
                    chat.create({
                        FromID:"111"+support[0].ID,
                        ToID:"222"+req.body.ToID,
                        Message:req.body.Message,
                        DateTimeSend:new Date().getTime()

                    });
                    return res.json();
                }else {
                    return res.status(400).json({"code": 700});

                }

            }




        });


    }

});



module.exports = router;

