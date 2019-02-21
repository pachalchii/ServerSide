const multer = require("multer");

var log4js = require('log4js'); // include log4js

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
    } }
);


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
    dest: "./../uploads"
});

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const databaseStatus = false;

module.exports = {
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
