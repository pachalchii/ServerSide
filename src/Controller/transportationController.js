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

router.post('/orderProduct',(req,res)=>{

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

router.post('/return',(req,res)=>{

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

module.exports = router;

