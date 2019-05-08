var cluster = require('cluster');
const {colors,DataBaseStatus,DevelopMode,DataBaseInformation} = require('./src/Util/configuration');
const {sequelize} = require('./sequelize');
const {fillDataBase} = require('./src/Util/Filter');
const cron = require("node-cron");
const fs = require("fs");
const path = require('path');

var zipFolder = require('zip-folder');

if (cluster.isMaster) {



    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();

    }


    if (DataBaseStatus === "create-drop"){

        sequelize.sync({ force: true })
            .then(() => {
                console.log(colors.bg.Black, colors.fg.White ,`DataBase create-dropped `,  colors.Reset);
                if (DevelopMode) {
                    fillDataBase();
                    console.log(colors.bg.Black, colors.fg.White ,`starting import demo data : `,  colors.Reset);
                }
            });

    }
    else if (DataBaseStatus === "update"){
        sequelize.sync({ force: false })
            .then(() => {
                console.log(colors.bg.Black, colors.fg.White ,`Database Updated`,  colors.Reset);
            });
    }

    cluster.on('exit', function (worker, code, signal) {
        console.log(colors.bg.Black, colors.fg.White,'Worker %d died', worker.id,colors.fg.White);
        cluster.fork();

    });


    cron.schedule("59 23 * * *", function() {
        console.log("start")
        for (var id in cluster.workers) {
            cluster.workers[id].kill();
        }

        var BackUpFileName = new Date();

        zipFolder(path.join(__dirname, '/uploads/'), path.join(__dirname, '/BackUp/')+BackUpFileName+'.zip', function(err) {
            if(err) {
                console.log('oh no!', err);
            } else {
                console.log("hi")

            }
        });


    });

    
} else if (cluster.isWorker){

    const express = require('express');
    const bodyParser = require('body-parser');
    const {BaseUrl} = require('./src/Util/configuration');
    const cors = require('cors');
    const app = express();
    const io = require('socket.io').listen(port);
    const morgan = require('morgan');
    const fs = require("fs");
    const helmet = require('helmet');
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'Log/access.log'), { flags: 'a' , interval: '1d' });

    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(helmet());
    app.use( BaseUrl + '/application', require('./src/Controller/AppController') );
    app.use( BaseUrl + '/support', require('./src/Controller/SupportController') );
    app.use( BaseUrl + '/customer', require('./src/Controller/CustomerController') );
    app.use( BaseUrl + '/auth', require('./src/Controller/AuthController') );
    app.use( BaseUrl + '/seller', require('./src/Controller/SellerController') );
    app.use( BaseUrl + '/transportation', require('./src/Controller/transportationController') );
    app.use( BaseUrl + '/warehouse',require('./src/Controller/WareHouseController') );

    app.get('/', function(req, res){
        res.send('pachalChi server is running ...' + cluster.worker.id);
    });



    var port = 2525;

    app.listen(port, () => {
        console.log(colors.bg.Black, colors.fg.White ,"worker with id = "+cluster.worker.id+" start working.",  colors.Reset);
    });


}











