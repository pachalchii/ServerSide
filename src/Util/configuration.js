const multer = require("multer");


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
    dest: "./../uploads/tempUploads"
});

const DevelopMode =  require('minimist')(process.argv.slice(2)).DevelopMode || false;

const DataBaseStatus = require('minimist')(process.argv.slice(2)).DataBaseStatus || "update";

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
        message:"فروشنده عزيز لطفا در ساعات مجاز تلاش فرماييد"
    },
    715:{
        message:"کد وارد شده اشتباه است"
    },
    716:{
        message:"پارامتر role که ارسال کردید اشتباه است"
    },
    717:{
        message:"حساب کاربری با این اطلاعات قبلا ثبت نام کرده است"
    },
    718:{
        message:"ایدی وارد شده یافت نشد"
    },
    719:{
        message:"سایز عکس ارسالی مناسب نمیباشد"
    },
    720:{
        message:"عکس ارسالی در فرمت مناسب نمیباشد"
    },
    721:{
    message:"شما بیش از یکبار تلاش به تغییر پسورد کرده اید"
    },
    722:{
        message:"شما قادر به قیمت گذاری دوباره برای محصولات در یک روز نیستید"
    },
    723:{
        message:"مشکلی در محصولات انتخابی موجود است"
    },
    724:{
        message:"این شهر از قبل اضافه شده بود"
    },
    725:{
        message:"شما در این مرحله دیگر قادر به لفو سفارش نیستید"
    }


};

const UplodDirs = {
    "seller":"./../../uploads/seller/",
    "customer":"./../../uploads/customer/",
    "products":"./../../uploads/products/",


};

const ValidImageFormat = [
    ".png",
    ".jpg",
    ".jpeg",
];

const ImageLimitSize = 100000;

const BaseUrl = "/api/v1";

const DataBaseInformation = {
    host: 'localhost',
    port:"1433",
    user: 'sa',
    password: '<7552205>',
    database: 'PachalChi',
    dialect: 'mssql'

};

const TimeLimit = {
    start:11,
    finish:22
};

const ServerPort = 2323;

const SocketServerPort = 8080;

const TimeCounterForOperatorAnswering = 30 * 60 * 1000 ;

const TimeRemainingForOperatorAlert = 20 * 60 * 1000 ;

const TimeToDoingPayment = 60 * 60 * 1000 ;


module.exports = {
    statusCodes,
    BaseUrl,
    SocketServerPort,
    TimeToDoingPayment,
    ServerPort,
    TimeRemainingForOperatorAlert,
    TimeCounterForOperatorAnswering,
    TimeLimit,
    UplodDirs,
    DataBaseInformation,
    ValidImageFormat,
    DevelopMode,
    DataBaseStatus,
    ImageLimitSize,
    colors,
    JWT_SECRET,
    PASSWORD_REGEX,
    PHONENUMBER_REGEX,
    USERNAME_REGEX,
    upload
};
