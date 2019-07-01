const express = require('express');
var router = express.Router();
/*********************************************/
const {FilteringRequest} = require("../Util/Filter");
const {upload} = require("../Util/configuration");

/*********************************************/



router.post('/slider', upload.single("Image"), (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {

                    return res.json();

            }

        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }


});

router.get('/seller', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {

                return res.json(data);

            }

        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }


});

router.get('/customer', (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {

                return res.json(data);

            }

        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }


});

router.post('/sms',  (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {

                return res.json();

            }

        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }


});

router.post('/returnProduct',  (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {

                return res.json(data);

            }

        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }


});

router.post('/deletedProduct',  (req, res) => {
    try {
        FilteringRequest(req,res,(err,data)=>{

            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {

                return res.json(data);

            }

        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({"code":500});
    }


});



module.exports = router;


