const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {Seller, transportation, orderProduct} = require('../../sequelize');
const {upload, JWT_SECRET, colors} = require('../Util/configuration');
const {checkToken, isThisArrayEmpty, FilteringRequest} = require("../Util/Filter");
/*********************************************/
var jwt = require('jwt-simple');


router.get('/Orders', (req, res) => {
    FilteringRequest(req, res, (err, data) => {


        try {
            FilteringRequest(req, res, (err, data) => {
                if (err) {
                    return res.status(err.HttpCode).json(err.response);
                } else {
                    return res.json(data);
                }
            })
        } catch (e) {
            return res.status(500).json({"code": 500})
        }

    });
});


module.exports = router;

