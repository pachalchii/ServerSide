const express = require('express');
var router = express.Router();
/*********************************************/
const {FilteringRequest} = require("../Util/Filter");
/*********************************************/



router.get('/orderProduct' , ( req , res )=>{
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

router.get('/transportation' , ( req , res )=>{
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

router.post('/transportation' , ( req , res )=>{
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

router.post('/accept', (req, res) => {


    try {
        FilteringRequest(req,res,(err,data)=>{
            if (err){
                return res.status(err.HttpCode).json(err.response);
            } else {
                data.update({Policy:true}).then(()=>{return res.json();});
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.post('/ScatteredTransportation', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json(data);
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});

router.put('/ScatteredTransportation', (req, res) => {
    try {
        FilteringRequest(req, res, (err, data) => {
            if (err) {
                return res.status(err.HttpCode).json(err.response);
            } else {
                return res.json();
            }
        });


    } catch (e) {
        res.status(500).json({"code": 500});


    }
});


module.exports = router;


