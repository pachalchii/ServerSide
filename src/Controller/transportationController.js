const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {FilteringRequest} = require("../Util/Filter");
/*********************************************/
var jwt = require('jwt-simple');



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







module.exports = router;

