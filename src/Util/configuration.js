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

const PHONENUMBER_REGEX = "^(\\+98|0)?9\\d{9}$";

const PASSWORD_REGEX = "(?=.{8,})";

const USERNAME_REGEX = "^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$";

const upload = multer({
    limits: { fieldSize: 2 * 1024 * 1024 },
    dest: "./../uploads/tempUploads"
});

const DevelopMode = require('minimist')(process.argv.slice(2)).DevelopMode || false;

const DataBaseStatus = require('minimist')(process.argv.slice(2)).DataBaseStatus || "update";

const statusCodes = {

    900: {
        message: "حساب کاربری شما غیر فعال است ."
    },
    700: {
        message: "لطفا دوباره وارد شوید ."
    }
    ,
    500: {
        message: "مشكلي در سمت سرور برنامه رخ داده است ، لطفا بعدا تلاش كنيد"
    }
    ,
    701: {
        message: "سفارش مربوطه با اطلاعات فرستاده شده يافت نشد"
    }
    ,
    702: {
        message: "اين سفارش خريد مربوط به حساب شما نميباشد"
    },
    703: {
        message: "بعضي از پارامتر هاي لازم براي انجام فرايند ارسال نشده است"
    },
    704: {
        message: "مسئول انبار با اين مشخصات يافت نشد"
    },
    705: {
        message: "فروشنده مورد نظر قبلا ثبت شده است"
    },
    706: {
        message: "اين مسئول انبار قبلا در سيستم ثبت شده است"
    },
    707: {
        message: "اين راننده قبلا در سيستم ثبت شده است"
    },
    708: {
        message: "اين اپراتور فروش قبلا در سيستم ثبت شده است"
    },
    709: {
        message: "اين سفارش براي اين راننده نميباشد"
    },
    710: {
        message: "درخواست مورد نظر يافت نشد"
    },
    711: {
        message: "شماره وارد شده در فرمت مناسبی نمیباشد"
    },
    712: {
        message: "پسورد وارد شده در فرمت مناسبی نمیباشد"
    },
    713: {
        message: "نام کاربری وارد شده در فرمت مناسبی نمیباشد"
    },
    714: {
        message: "فروشنده عزيز لطفا در ساعات مجاز تلاش فرماييد"
    },
    715: {
        message: "کد وارد شده اشتباه است"
    },
    716: {
        message: "پارامتر role که ارسال کردید اشتباه است"
    },
    717: {
        message: "حساب کاربری با این اطلاعات قبلا ثبت شده است"
    },
    718: {
        message: "ایدی وارد شده یافت نشد"
    },
    719: {
        message: "سایز عکس ارسالی مناسب نمیباشد"
    },
    720: {
        message: "عکس ارسالی در فرمت مناسبی نمیباشد"
    },
    721: {
        message: "شما بیش از یکبار تلاش به تغییر پسورد کرده اید"
    },
    722: {
        message: "شما قادر به قیمت گذاری دوباره برای محصولات در یک روز نیستید"
    },
    723: {
        message: "مشکلی در محصولات انتخابی موجود است"
    },
    724: {
        message: "این شهر از قبل اضافه شده بود"
    },
    725: {
        message: "شما در این مرحله دیگر قادر به لغو سفارش نیستید"
    },
    726: {
        message: "حساب کاربری شما آنلاین نمیباشد"
    },
    727: {
        message: "شما در روز های جمعه مجاز به ایجاد تغییرات در سامانه نیستید"
    },
    728: {
        message: "پسورد قدیم و جدید یکسان نمیباشد"
    },
    729: {
        message: "شما فقط در ساعات خاصی قادر به قیمت گذاری منجمد وارداتی هستید"
    },
    730: {
        message: "مقدار پرداخت انلاین در منجمد وارداتی نمیتواند بیشتر از ۸۰٪ مقدار کل باشد"
    },
    731: {
        message: "شهر انتخابی ساپورت نمی شود"
    },
    732: {
        message: "محصول انتخابی غیر فعال میباشد"
    },
    733: {
        message: "مقدار انتخابی از موجودی محصول بیشتر میباشد"
    },
    734: {
        message: "محصول موجودی ندارد"
    },
    735: {
        message: "کف و سقف فروش رعایت نشده است"
    },
    736: {
        message: "این محصول قبلا در لیست خبر بده بوده است"
    },
    737:{
        message: "امکان تغییر بعد از پرداخت کاربر امکان پذیر نمیباشد"
    },
    738:{
        message: "قبلا این شماره ثبت نام شده است"
    },
    739:{
        message:"karbar pardakht nakarde "
    }



};

/**
 * @return {string}
 */
function AlramMessages(event) {
    switch (event) {
        case "ForgetPassword": return  "";
        case "SellerOperatorAlarm" : return  "";
        case "PostOrder": return  "";
        case "Register": return  "";
        case "FinalStatus":return  "";
        case "AddRole": return  "";
        case "transportation": return  "";
    }


}

const UplodDirs = {
    "seller": "./../../uploads/seller/",
    "slider": "./../../uploads/sliders/",
    "customer": "./../../uploads/customer/",
    "products": "./../../uploads/products/",
    "wareHouse": "./../../uploads/wareHouse/",
    "operator": "./../../uploads/operator/",
    "productionManager":"./../../uploads/productionManager/",
    "TransportationManager":"./../../uploads/TransportationManager/"


};

const ValidImageFormat = [
    ".png",
    ".jpg",
    ".jpeg",
];

const ImageLimitSize = 10000000;

const BaseUrl = "/api/v1";

const DataBaseInformation = {
    host: 'localhost',
    port: "1433",
    user: 'sa',
    password: '<7552205>',
    database: 'PachalChi',
    dialect: 'mssql'

};

const TimeLimit = {
    start: 9, //7:30
    finish: 22 //9:30
};

const MonjamedVaredatiTimeLimit = [
    11,
    13,
    15
    ];

const ServerPort = 2424;

const SocketServerPort = 8080;

const TimeCounterForOperatorAnswering = 20 * 60 * 1000;

const TokenExpiredTimeLimit = 120 * 60 * 60  * 1000;

const TimeRemainingForOperatorAlert = 10 * 60 * 1000;

const TimeToDoingPayment = 30 * 60 * 1000;


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
    AlramMessages,
    ImageLimitSize,
    MonjamedVaredatiTimeLimit,
    colors,
    TokenExpiredTimeLimit,
    JWT_SECRET,
    PASSWORD_REGEX,
    PHONENUMBER_REGEX,
    USERNAME_REGEX,
    upload
};
