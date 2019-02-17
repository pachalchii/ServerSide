const multer = require("multer");

var log4js = require('log4js'); // include log4js

log4js.configure({
    appenders: {
        out: { type: 'console' },
        task: { type: 'dateFile', filename: 'logs/task',"pattern":"-dd.log", alwaysIncludePattern:true },
        result: { type: 'dateFile', filename: 'logs/result',"pattern":"-dd.log", alwaysIncludePattern:true},
        error: { type: 'dateFile', filename: 'logs/error', "pattern":"-dd.log",alwaysIncludePattern:true},
        default: { type: 'dateFile', filename: 'logs/default', "pattern":"-dd.log",alwaysIncludePattern:true},
        rate: { type: 'dateFile', filename: 'logs/rate', "pattern":"-dd.log",alwaysIncludePattern:true}
    },
    categories: {
        default: { appenders: ['out','default'], level: 'info' },
        task: { appenders: ['task'], level: 'info'},
        result: { appenders: ['result'], level: 'info' },
        error: { appenders: ['error'], level: 'error' },
        rate: { appenders: ['rate'], level: 'info' }
    } }
);


var loggerinfo = log4js.getLogger('info'); // initialize the var to use.
var loggererror = log4js.getLogger('error'); // initialize the var to use.
var loggerdebug = log4js.getLogger('debug'); // initialize the var to use.




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
    dest: "./../uploads"
});

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

module.exports = {
    colors,
    JWT_SECRET,
    PASSWORD_REGEX,
    PHONENUMBER_REGEX,
    USERNAME_REGEX,
    upload,
    handleError,
    loggerdebug,
    loggererror,
    loggerinfo
};
