const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const { application,support , Seller , customer , sequelize , sellerPhoneNumber , transportation ,sellerWareHouse , sellerOperator} = require('../../sequelize');
const {checkToken, response ,isThisArrayEmpty ,  base64_encode ,loginInfoCheck , registerInfoCheck , } = require('../Util/myFunctions');
const {upload,loggererror, colors ,JWT_SECRET  ,handleError , loggerinfo } = require('../Util/myVars');
/*********************************************/
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const http = require("http");
var md5 = require('md5');
const Op = sequelize.Op;
var jwt = require('jwt-simple');
/*********************************************/




router.post('/register',upload.single("image"), (req, res) => {

    try{

        if (req.body.role == null){
            return res.status(400).json({"message":"role parameter not recieved"});
        }else {


            var role = req.body.role;
            var image ;
            switch (role) {
                case "customer":
                    registerInfoCheck(req,res,role);
                    if (req.file != null){

                        const tempPath = req.file.path;
                        const targetPath = path.join(__dirname, "./../../uploads/customer/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                        image = targetPath;
                        if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                            fs.rename(tempPath, targetPath, err => {
                                if (err) return handleError(err, res);
                            });
                        } else {
                            fs.unlink(tempPath, err => {
                                if (err) return handleError(err, res);

                                return res
                                    .status(403)
                                    .contentType("text/plain")
                                    .end("this format of image is not under support");
                            });
                        }


                    }else{
                        image = "notSetYet";
                    }
                    sequelize.transaction().then(function(t) {
                        customer.create({
                            birth_date:req.body.birth_date,
                            company_name:req.body.company_name,
                            enabled:true,
                            status:true,
                            family_name:req.body.family_name,
                            image:image,
                            name:req.body.name,
                            phone_number:req.body.phone_number,
                            password:md5(req.body.password),
                            established_date:req.body.established_date,
                            point:0,
                            registration_date_time:req.body.registration_date_time,
                            theme:req.body.theme,
                            username:req.body.username,
                            cityid:req.body.cityid

                        }, {
                            transaction: t
                        }).then(function() {
                            t.commit();
                            loggerinfo.info(req.connection.remoteAddress + " signUped as a customer with " + req.body.phone_number +" phone number");
                            return res.status(200).json();


                        }).catch(function(error) {
                            loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + error);
                            t.rollback();
                            if (error.parent.errno === 1062)
                            {
                                return res.status(400).json({"message":"customer signUped before"})
                            }
                            else {
                                return res.status(400).json({"message":"Oops! Something went wrong!"})

                            }                        });
                    });


                    break;
                case "seller":
                    registerInfoCheck(req,res,role);
                    if (req.file != null){
                        const tempPath =req.file.path;
                        const targetPath = path.join(__dirname, "./../../uploads/seller/"+req.body.username+path.extname(req.file.originalname).toLowerCase());
                        image = targetPath;

                        if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".PNG" || path.extname(req.file.originalname).toLowerCase() === ".JPG" ) {
                            fs.rename(tempPath, targetPath, err => {
                                if (err) return handleError(err, res);

                            });
                        } else {
                            fs.unlink(tempPath, err => {
                                if (err) return handleError(err, res);

                                res
                                    .status(403)
                                    .contentType("text/plain")
                                    .end("this format of image is not under support");
                            });
                        }

                    }else{
                        image = "notSetYet";
                    }

                    sequelize.transaction().then(function(t) {
                        Seller.create({
                            id:req.body.phone_numberid,
                            company_name:req.body.company_name,
                            complete_address_description:req.body.complete_address_description,
                            enabled:true,
                            point:0,
                            registration_date_time:req.body.registration_date_time,
                            google_map_address_link:req.body.google_map_address_link,
                            logo_image:image,
                            owner_family_name:req.body.owner_family_name,
                            owner_name:req.body.owner_name,
                            password:md5(req.body.password),
                            owner_phone_number:req.body.owner_phone_number,
                            username:req.body.username,
                            company_address_cityid:req.body.company_address_cityid,
                            phone_numberid:req.body.phone_numberid,
                            typeid:1

                        }, {
                            transaction: t
                        }).then(function() {
                            t.commit();
                            loggerinfo.info(req.connection.remoteAddress + " signUped as a customer with " + req.body.phone_numberid +" phone_numberid");
                            return res.status(200).json()

                        }).catch(function(error) {
                            loggererror.info(req.connection.remoteAddress +  "cause this erorr : " + error);
                            t.rollback();
                            if (error.parent.errno === 1062)
                            {
                                return res.status(400).json({"message":"seller signUped before"})
                            }
                            else {
                                console.log(error);
                                return res.status(400).json({"message":"Oops! Something went wrong!"})

                            }
                        });
                    });


                    break;
                default: return res.status(404).json({"message":"wrong role name"})
            }

        }
    }catch (e) {
        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + e);
        console.log(e)
        return res.status(500).json({"message":"Oops! Something went wrong!"})
    }



});

router.post('/login', (req, res) => {

    try{

        if (req.body.role == null){
        return res.status(400).json({"code":703});
    }else {

        var role = req.body.role;
        switch (role) {
            case "customer":
                loginInfoCheck(req,res,role);
                if (req.body.phone_number != null){
                    customer.findAll({
                        where: {
                            phone_number: req.body.phone_number, password: md5(req.body.password)
                        }
                    }).then(customer => {
                        if (!isThisArrayEmpty(customer)){
                            var payload = { phone_number: customer[0].phone_number,
                                password: customer[0].password,
                                random:Math.random()};
                            var base64str="not Found";
                            try {
                                base64str = base64_encode(customer[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);

                            response(res,{"data":{

                                    birth_date:customer[0].birth_date,
                                    image:base64str,
                                    company_name:customer[0].company_name,
                                    enabled:customer[0].enabled,
                                    status:customer[0].status,
                                    family_name:customer[0].family_name,
                                    name:customer[0].name,
                                    phone_number:customer[0].phone_number,
                                    point:customer[0].point,
                                    registration_date_time:customer[0].registration_date_time,
                                    theme:customer[0].theme,
                                    username:customer[0].username,
                                    cityid:customer[0].cityid,
                                    token:token                 }}).then(
                                loggerinfo.info(req.connection.remoteAddress + " login as customer with "+customer[0].phone_number +" phone number")
                            );

                        } else {
                            return res.status(404).json();
                        }



                    });
                } else {
                    customer.findAll({
                        where: {
                            username: req.body.username, password: md5(req.body.password)
                        }
                    }).then(customer => {
                        if (!isThisArrayEmpty(customer))
                        {
                            var payload = { phone_number: customer[0].phone_number,
                                password: customer[0].password,
                                random:Math.random()};



                            var base64str="not Found";
                            try {
                                base64str = base64_encode(customer[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);

                            response(res,{"data":{

                                    birth_date:customer[0].birth_date,
                                    image:base64str,
                                    company_name:customer[0].company_name,
                                    enabled:customer[0].enabled,
                                    status:customer[0].status,
                                    family_name:customer[0].family_name,
                                    name:customer[0].name,
                                    phone_number:customer[0].phone_number,
                                    point:customer[0].point,
                                    registration_date_time:customer[0].registration_date_time,
                                    theme:customer[0].theme,
                                    username:customer[0].username,
                                    cityid:customer[0].cityid,
                                    token:token                 }}).then(
                                loggerinfo.info(req.connection.remoteAddress + " login as customer with "+customer[0].phone_number +" phone number")
                            );

                        } else {
                            return res.status(404).json();

                        }


                    });
                }

                break;
            case "seller":
                loginInfoCheck(req,res,role);
                if (req.body.phone_number != null){
                    Seller.findAll({
                        where: {
                            owner_phone_number: req.body.phone_number, password: md5(req.body.password)
                        }
                    }).then(seller => {
                        if (!isThisArrayEmpty(seller)){
                            var payload = { owner_phone_number: seller[0].owner_phone_number,
                                password: seller[0].password,
                                random:Math.random()};


                            var base64str="not Found";
                            try {
                                base64str = base64_encode(seller[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);

                            response(res,{"data":{

                                    id:seller[0].phone_numberid,
                                    company_name:seller[0].company_name,
                                    complete_address_description:seller[0].complete_address_description,
                                    enabled:seller[0].enabled,
                                    point:seller[0].point,
                                    registration_date_time:seller[0].registration_date_time,
                                    google_map_address_link:seller[0].google_map_address_link,
                                    logo_image:base64str,
                                    owner_family_name:seller[0].owner_family_name,
                                    owner_name:seller[0].owner_name,
                                    password:seller[0].password,
                                    owner_phone_number:seller[0].owner_phone_number,
                                    username:seller[0].username,
                                    company_address_cityid:seller[0].company_address_cityid,
                                    phone_numberid:seller[0].phone_numberid,
                                    typeid:seller[0].typeid,
                                    token:token               }}).then(loggerinfo.info(req.connection.remoteAddress + " login as seller with "+seller[0].phone_numberid+" phone number"));


                        } else {
                            return res.status(404).json();
                        }



                    });
                } else {
                    Seller.findAll({
                        where: {
                            username: req.body.username, password: md5(req.body.password)
                        }
                    }).then(seller => {
                        if (!isThisArrayEmpty(seller))
                        {
                            var payload = { username: seller[0].username,
                                password: seller[0].password,
                                random:Math.random()};



                            var base64str="not Found";
                            try {
                                base64str = base64_encode(seller[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);


                            response(res,{"data":{

                                    id:seller[0].phone_numberid,
                                    company_name:seller[0].company_name,
                                    complete_address_description:seller[0].complete_address_description,
                                    enabled:seller[0].enabled,
                                    point:seller[0].point,
                                    registration_date_time:seller[0].registration_date_time,
                                    google_map_address_link:seller[0].google_map_address_link,
                                    logo_image:base64str,
                                    owner_family_name:seller[0].owner_family_name,
                                    owner_name:seller[0].owner_name,
                                    password:seller[0].password,
                                    owner_phone_number:seller[0].owner_phone_number,
                                    username:seller[0].username,
                                    company_address_cityid:seller[0].company_address_cityid,
                                    phone_numberid:seller[0].phone_numberid,
                                    typeid:seller[0].typeid,
                                    token:token               }}).then(loggerinfo.info(req.connection.remoteAddress + " login as seller with "+seller[0].phone_numberid+" phone number"));

                        } else {
                            return res.status(404).json();

                        }


                    });
                }
            break;
            case "transportation":

                loginInfoCheck(req,res,"seller"); // seller ddm chon farghi ndre
                if (req.body.phone_number != null){
                    transportation.findAll({
                        where: {
                            phone_number: req.body.phone_number, password: md5(req.body.password)
                        }
                    }).then(trans => {
                        if (!isThisArrayEmpty(trans)){
                            var payload = { phone_number: trans[0].phone_number,
                                password: trans[0].password,
                                random:Math.random()};


                            var base64str="not Found";
                            try {
                                base64str = base64_encode(trans[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);

                            response(res,{"data":{

                                    id:trans[0].phone_numberid,
                                    air_conditionar:trans[0].air_conditionar,
                                    color:trans[0].color,
                                    description:trans[0].description,
                                    family_name:trans[0].family_name,
                                    image:base64str,
                                    name:trans[0].name,
                                    pelak_number:trans[0].pelak_number,
                                    phone_number:trans[0].phone_number,
                                    point:trans[0].point,
                                    username:trans[0].username,
                                    modelid:trans[0].modelid,
                                    ware_houseid:trans[0].ware_houseid,
                                    token:token               }}).then(loggerinfo.info(req.connection.remoteAddress + " login as transportation with "+trans[0].phone_number+" phone number"));

                        } else {
                            return res.status(404).json();
                        }



                    });
                } else {
                    transportation.findAll({
                        where: {
                            username: req.body.username, password: md5(req.body.password)
                        }
                    }).then(trans => {
                        if (!isThisArrayEmpty(trans))
                        {
                            var payload = { phone_number: trans[0].phone_number,
                                password: trans[0].password,
                                random:Math.random()};



                            var base64str="not Found";
                            try {
                                base64str = base64_encode(trans[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);


                            response(res,{"data":{

                                    id:trans[0].phone_numberid,
                                    air_conditionar:trans[0].air_conditionar,
                                    color:trans[0].color,
                                    description:trans[0].description,
                                    family_name:trans[0].family_name,
                                    image:base64str,
                                    name:trans[0].name,
                                    pelak_number:trans[0].pelak_number,
                                    phone_number:trans[0].phone_number,
                                    point:trans[0].point,
                                    username:trans[0].username,
                                    modelid:trans[0].modelid,
                                    ware_houseid:trans[0].ware_houseid,
                                    token:token               }}).then(loggerinfo.info(req.connection.remoteAddress + " login as transportation with "+trans[0].phone_number+" phone number"));

                        } else {
                            return res.status(404).json();

                        }


                    });
                }
                break;
            case "wareHouse":

                loginInfoCheck(req,res,"seller"); // seller ddm chon farghi ndre
                if (req.body.phone_number != null){
                    sellerWareHouse.findAll({
                        where: {
                            phone_number: req.body.phone_number, password: md5(req.body.password)
                        }
                    }).then(wareHouse => {
                        if (!isThisArrayEmpty(wareHouse)){
                            var payload = { phone_number: wareHouse[0].phone_number,
                                password: wareHouse[0].password,
                                random:Math.random()};


                            var base64str="not Found";
                            try {
                                base64str = base64_encode(wareHouse[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);

                            response(res,{"data":{

                                    id:wareHouse[0].phone_numberid,
                                    agent_family_name :wareHouse[0].agent_family_name ,
                                    agent_name :wareHouse[0].agent_name ,
                                    birthdate :wareHouse[0].birthdate ,
                                    cell_phone_number :wareHouse[0].cell_phone_number ,
                                    image:base64str,
                                    phone_number:wareHouse[0].phone_number,
                                    point :wareHouse[0].point ,
                                    username:wareHouse[0].username,
                                    ware_house_complete_address_description:wareHouse[0].ware_house_complete_address_description,
                                    ware_house_google_map_address_link:wareHouse[0].ware_house_google_map_address_link,
                                    ware_house_address_cityidIndex :wareHouse[0]. ware_house_address_cityidIndex ,
                                    selleridIndex:wareHouse[0].selleridIndex,
                                    token:token        }}).then(loggerinfo.info(req.connection.remoteAddress + " login as wareHouse with "+wareHouse[0].phone_number+" phone number"));
                        } else {
                            return res.status(404).json();
                        }



                    });
                } else {
                    sellerWareHouse.findAll({
                        where: {
                            username: req.body.username, password: md5(req.body.password)
                        }
                    }).then(wareHouse => {
                        if (!isThisArrayEmpty(wareHouse))
                        {
                            var payload = { phone_number: wareHouse[0].phone_number,
                                password: wareHouse[0].password,
                                random:Math.random()};



                            var base64str="not Found";
                            try {
                                base64str = base64_encode(wareHouse[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);


                            response(res,{"data":{

                                    id:wareHouse[0].phone_numberid,
                                    agent_family_name :wareHouse[0].agent_family_name ,
                                    agent_name :wareHouse[0].agent_name ,
                                    birthdate :wareHouse[0].birthdate ,
                                    cell_phone_number :wareHouse[0].cell_phone_number ,
                                    image:base64str,
                                    phone_number:wareHouse[0].phone_number,
                                    username:wareHouse[0].username,
                                    point:wareHouse[0].point,
                                    ware_house_complete_address_description:wareHouse[0].ware_house_complete_address_description,
                                    ware_house_google_map_address_link:wareHouse[0].ware_house_google_map_address_link,
                                    ware_house_address_cityidIndex :wareHouse[0]. ware_house_address_cityidIndex ,
                                    selleridIndex:wareHouse[0].selleridIndex,
                                    token:token        }}).then(loggerinfo.info(req.connection.remoteAddress + " login as wareHouse with "+wareHouse[0].phone_number+" phone number"));

                        } else {
                            return res.status(404).json();

                        }


                    });
                }
                break;
            case "operator":
                loginInfoCheck(req,res,"seller"); // seller ddm chon farghi ndre
                if (req.body.phone_number != null){
                    sellerOperator.findAll({
                        where: {
                            phone_number: req.body.phone_number, password: md5(req.body.password)
                        }
                    }).then(operator => {
                        if (!isThisArrayEmpty(operator)){
                            var payload = { phone_number: operator[0].phone_number,
                                password: operator[0].password,
                                random:Math.random()};


                            var base64str="not Found";
                            try {
                                base64str = base64_encode(operator[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);

                            response(res,{"data":{

                                    id:operator[0].phone_numberid,
                                    family_name :operator[0].family_name ,
                                    name :operator[0].name ,
                                    birthdate :operator[0].birthdate ,
                                    phone_number :operator[0].phone_number ,
                                    image:base64str,
                                    point:operator[0].point,
                                    username :operator[0].username ,
                                    selleridIndex:operator[0].selleridIndex,
                                    token:token


                                }}).then(loggerinfo.info(req.connection.remoteAddress + " login as operator with "+operator[0].phone_number + " phone number"));
                        } else {
                            return res.status(404).json();
                        }



                    });
                } else {
                    sellerOperator.findAll({
                        where: {
                            username: req.body.username, password: md5(req.body.password)
                        }
                    }).then(operator => {
                        if (!isThisArrayEmpty(operator))
                        {
                            var payload = { phone_number: operator[0].phone_number,
                                password: operator[0].password,
                                random:Math.random()};



                            var base64str="not Found";
                            try {
                                base64str = base64_encode(operator[0].image);

                            }catch (e) {
                                base64str = "not Found";

                            }
                            var token = jwt.encode(payload, JWT_SECRET);


                            response(res,{"data":{

                                    id:operator[0].phone_numberid,
                                    family_name :operator[0].family_name ,
                                    name :operator[0].name ,
                                    birthdate :operator[0].birthdate ,
                                    phone_number :operator[0].phone_number ,
                                    image:base64str,
                                    point:operator[0].point,
                                    username :operator[0].username ,
                                    selleridIndex:operator[0].selleridIndex,
                                    token:token


                                }}).then(loggerinfo.info(req.connection.remoteAddress + " login as operator with "+operator[0].phone_number + " phone number"));

                        } else {
                            return res.status(404).json();

                        }


                    });
                }
                break;

            default: return res.status(404).json({"message":"wrong role name"})
        }



    }

    }catch (e) {
        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + e);
    return res.status(500).json({"message":"Oops! Something went wrong!"})
}

});

router.post('/phoneNumber',(req,res) => {
    try {
        var numberOne = "notSetYet";
        var numberTwo = "notSetYet";
        var numberThree = "notSetYet";
        var numberFour = "notSetYet";
        var numberFive = "notSetYet";

        if (req.body.phone_number1 != null)numberOne =  req.body.phone_number1;
        if (req.body.phone_number2 != null)numberTwo =  req.body.phone_number2;
        if (req.body.phone_number3 != null)numberThree =  req.body.phone_number3;
        if (req.body.phone_number4 != null)numberFour =  req.body.phone_number4;
        if (req.body.phone_number5 != null)numberFive =  req.body.phone_number5;
        sequelize.transaction().then(function(t) {
            sellerPhoneNumber.create({

                phone_number1:req.body.phone_number1,
                phone_number2:req.body.phone_number2,
                phone_number3:req.body.phone_number3,
                phone_number4:req.body.phone_number4,
                phone_number5:req.body.phone_number5,

            }, {
                transaction: t
            }).then(savedNumber => {
                t.commit();
                response(res,{"data":{"id":savedNumber.id}}).then(loggerinfo.info(req.connection.remoteAddress + " add a group of phone number with "+ savedNumber.id));

            }).catch(function(error) {
                loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + error);
                t.rollback();
                return res.status(500).json({"code":500})
            });
        });




    }  catch (e) {
        loggererror.warn(req.connection.remoteAddress +  "cause this erorr : " + e);
    return res.status(500).json({"code":500})
}
});

router.post('/forgetPassword',(req,res)=>{
     return res.status(200);
});

router.post('/tokenCheck',(req,res)=>{
    if (req.body.role ==  null)
    {
        return res.status(400).json({"code":703});
    }
    if (req.body.clientVersion ==  null)
    {
        return res.status(400).json({"code":703});
    }
    var searchQuery = checkToken(req,res,req.body.role);
    switch (req.body.role) {
        case "seller":
            Seller.findAll(searchQuery).then(seller => {
                if (isThisArrayEmpty(seller)) {

                    return res.status(400).json({"code":700});

                }else {
                    application.findAll().then(
                        app=>{
                            if (req.body.clientVersion === app[0].clientVersion) {
                                return res.json({"data":{"forceUpdate":false}});
                            }else {
                                return res.json({"data":{"forceUpdate":true}});
                            }
                        }
                    );
                }
            });
            break;
        case "customer":
            customer.findAll(searchQuery).then(customer => {
                if (isThisArrayEmpty(customer)) {

                    return res.status(400).json({"code":700});

                }else {
                    return res.json();
                }
            });
            break;
        case "operator":
            sellerOperator.findAll(searchQuery).then(operator => {
                if (isThisArrayEmpty(operator)) {

                    return res.status(400).json({"code":700});

                }else {
                    return res.json();
                }
            });
            break;
        case "wareHouse":
            sellerWareHouse.findAll(searchQuery).then(sellerWareHouse => {
                if (isThisArrayEmpty(sellerWareHouse)) {

                    return res.status(400).json({"code":700});

                }else {
                    return res.json();
                }
            });
            break;
        case "support":
            support.findAll(searchQuery).then(support => {
                if (isThisArrayEmpty(support)) {

                    return res.status(400).json({"code":700});

                }else {
                    return res.json();
                }
            });
            break;
        case "transportation":
            transportation.findAll(searchQuery).then(transportation => {
                if (isThisArrayEmpty(transportation)) {

                    return res.status(400).json({"code":700});

                }else {
                    return res.json();
                }
            });
            break;
    }

});

module.exports = router;

