const multer = require("multer");
var Pusher = require('pusher');
var log4js = require('log4js'); // include log4js
var Kavenegar = require('kavenegar');

log4js.configure({
    appenders: {
        error: { type: 'dateFile', filename: 'logs/error/error', "pattern":"dd-mm-yy.log",alwaysIncludePattern:true},
        default: { type: 'dateFile', filename: 'logs/default/default', "pattern":"dd-mm-yy.log",alwaysIncludePattern:true},
        info: { type: 'dateFile', filename: 'logs/info/info', "pattern":"dd-mm-yy.log",alwaysIncludePattern:true},

    },
    categories: {
        default: { appenders: ['default'], level: 'info' },
        info: { appenders: ['info'], level: 'info' },
        error: { appenders: ['error'], level: 'error' }
    } });

var pusher = new Pusher({
    appId: 719640 ,
    key: "df6e40d402010a993107" ,
    secret:  "fcea536f8bbf208aa730" ,
    cluster: "us2",
});

var SmsApi = Kavenegar.KavenegarApi({
    apikey: '394B54306C322B487455556F65446A4837376B6C4D70454E49624F5252725438'
});

var loggererror = log4js.getLogger('info'); // initialize the var to use.

var loggerinfo = log4js.getLogger('info'); // initialize the var to use.

var selfDestroyKey = "755Amirr2205";

const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m"
    },
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
        Crimson: "\x1b[48m"
    }
};

const JWT_SECRET = "755Amirr2205";

const PHONENUMBER_REGEX = "^(\\+98|0)?9\\d{9}$" ;

const PASSWORD_REGEX = "(?=.{8,})" ;

const USERNAME_REGEX ="^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$";

const upload = multer({
    dest: "./tempUploads"
});

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const databaseStatus = false;

const statusCodes ={

    900:{
        message:"حساب کاربری شما غیر فعال شده است ."
    },
    700:{
        message:"نشست حساب کاربری شما منقضی شده است ."
    }
    ,
    500:{
        message:"مشكلي در سمت سرور برنامه رخ داده است ، لطفا بعدا تلاش كنيد"
    }
    ,
    701:{
        message:"سفارش مربوطه با اطلاعات فرستاده شده يافت نشد"
    }
    ,
    702:{
        message:"اين سفارش خريد مربوط به حساب شما نميباشد"
    },
    703:{
        message:"بعضي از پارامتر هاي لازم براي انجام فرايند ارسال نشده است"
    },
    704:{
        message:"مسئول انبار با اين مشخصات يافت نشد"
    },
    705:{
        message:"فروشنده مورد نظر قبلا ثبت شده است"
    },
    706:{
        message:"اين مسئول انبار قبلا در سيستم ثبت شده است"
    },
    707:{
        message:"اين مسئول حمل و نقل قبلا در سيستم ثبت شده است"
    },
    708:{
        message:"اين اپراتور فروش قبلا در سيستم ثبت شده است"
    },
    709:{
        message:"اين محصول براي اين راننده نميباشد"
    },
    710:{
        message:"درخواست مورد نظر يافت نشد"
    },
    711:{
        message:"شماره وارد شده در فرمت مناسبی نمیباشد"
    },
    712:{
        message:"پسورد وارد شده در فرمت مناسبی نمیباشد"
    },
    713:{
        message:"نام کاربری وارد شده در فرمت مناسبی نمیباشد"
    },
    714:{
        message:"فروشنده عزيز لطفا بين ساعات ٨ تا ١٠ تلاش فرماييد"
    }



};





module.exports = {
    statusCodes,
    SmsApi,
    selfDestroyKey,
    databaseStatus,
    colors,
    JWT_SECRET,
    PASSWORD_REGEX,
    PHONENUMBER_REGEX,
    USERNAME_REGEX,
    upload,
    handleError,
    loggererror,
    loggerinfo
};
