const log4js = require('log4js');
const logger = log4js.getLogger('amir-vatani');
const PHONENUMBER_REGEX = "^(\\+98|0)?9\\d{9}$" ;
const PASSWORD_REGEX = "(?=.{8,})" ;

function checkPhone(req , res ) {
    if (req.body.phoneNumber != null ){
        var pattern  = new RegExp(PHONENUMBER_REGEX);
        var status = pattern.test(req.body.phoneNumber);
        if (!status) {
             res.status(400).json({message : "phone number is not in valid form "});
             return false;
        }
        return true;


    }

}
function checkPassword(req , res ) {
    if (req.body.password != null ){
        var pattern  = new RegExp(PASSWORD_REGEX);
        var status = pattern.test(req.body.password);
        if (!status) {
            res.status(400).json({message : "password valid form is The string must be eight characters or longer"});
            return false;
        }
        return true;


    }

}

function registerInfoCheck (req , res){
    var vars = req.body;
    if (vars.phoneNumber == null || vars.password ==null || vars.firstName == null || vars.lastName == null  ){
        res.status(400).json({message : "request body does not have all neccesery variables"});
        return false;
    }else return !(!checkPhone(req, res) || !checkPassword(req, res));

}

module.exports = {
    checkPhone,
    registerInfoCheck
};