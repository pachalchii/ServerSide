const express = require('express');
const bodyParser = require('body-parser');
const { Seller , customer } = require('./../sequelize');
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const http = require("http");
var md5 = require('md5');

const myVars = require('./../Util/myVars');
const myFunction = require('./../Util/myFunctions');

var router = express.Router();

// sign up
const upload = multer({
    dest: "./../uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
router.post('/register',upload.single("image"), (req, res) => {

    try{

        if (req.body.role == null){
            return res.status(400).json({"message":"role parameter not recieved"});
        }else {

            myFunction.registerInfoCheck(req,res);

            var role = req.body.role;
            switch (role) {
                case "customer":
                    var image ;
                    if (req.file != null){
                        const handleError = (err, res) => {
                            res
                                .status(500)
                                .contentType("text/plain")
                                .end("Oops! Something went wrong!");
                        };

                        const tempPath = req.file.path;
                        const targetPath = path.join(__dirname, "./../uploads/"+req.body.phone_number+".png");
                        image = targetPath;
                        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
                            fs.rename(tempPath, targetPath, err => {
                                if (err) return handleError(err, res);
                            });
                        } else {
                            fs.unlink(tempPath, err => {
                                if (err) return handleError(err, res);

                                return res
                                    .status(403)
                                    .contentType("text/plain")
                                    .end("Only .png files are allowed!");
                            });
                        }

                    }else{
                        image = "notSetYet";
                    }
                    var customerr = {
                        birth_date:req.body.birth_date,
                        company_name:req.body.company_name,
                        enabled:true,
                        family_name:req.body.family_name,
                        image:image,
                        name:req.body.name,
                        phone_number:req.body.phone_number,
                        password:md5(req.body.password),
                        point:req.body.point,
                        registration_date_time:req.body.registration_date_time,
                        theme:req.body.theme,
                        username:req.body.username,
                        cityid:req.body.cityid

                    };
                    customer.create(customerr)
                        .catch (e => {return res.status(500).json({"message":"user signUped before"})})

                    break;
                case "seller":
                    return res.status(400).json({"message":"comming soon"});
                    break;
                default: return res.status(404).json({"message":"wrong role name"})
            }

        }
    }catch (e) {
        return res.status(500).json({"message":"Oops! Something went wrong!"})
    }



});

/*//login
router.post('/login', (req, res) => {
    try{  if (req.body.role == null){
        return res.status(400).json({"message":"role parameter not recieved"});
    }else {
        var role = req.body.role;
        myFunction.loginInfoCheck(req,res);

        switch (role) {
            case "customer":
                customer.findAll({
                    where: {
                        [Op.or]: [{phone_number: req.body.phone_number}, {password: md5(req.body.password)}]
                    }
                }).then(customer => {res.status(200).json(customer)});
                break;
            case "seller":
                return res.status(400).json({"message":"comming soon"});
                break;
            default: return res.status(404).json({"message":"wrong role name"})
        }



    }

    }catch (e) {
    return res.status(500).json({"message":"Oops! Something went wrong!"})
}

});*/

module.exports = router;

