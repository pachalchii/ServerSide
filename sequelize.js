const Sequelize = require('sequelize');
const SellerModel = require('./models/seller');
const myVars = require('./Util/myVars');


const sequelize = new Sequelize('pachalChi', 'root', '755amir2205', {
    logging: false,
  host: 'localhost',
  dialect: 'mysql',
    port:8889,
    define: {
        timestamps: false
    }

});

const Seller = SellerModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => {
      console.log(myVars.colors.bg.Green ,`Configing DataBase done successfully .`,  myVars.colors.Reset)
  });

module.exports = {
    Seller
};
