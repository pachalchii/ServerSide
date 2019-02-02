const config = require('config.json');
const mongoose = require('mongoose');


mongoose.connect(config.connectionString , { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = {
    coustomer : require('../users/coustomer/coustomer.model')

};