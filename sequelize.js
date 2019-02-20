const Sequelize = require('sequelize');

const citiesModel = require('./src/models/cities');
const SellerModel = require('./src/models/seller');
const addressesModel = require('./src/models/addresses');
const carModelModel = require('./src/models/car_model');
const chatModel = require('./src/models/chat');
const customerModel = require('./src/models/customer');
const orderNazarSanjiModel = require('./src/models/order_nazar_sanji');
const orderPardakhtModel = require('./src/models/order_pardakht');
const orderProductModel = require('./src/models/order_product');
const pachalChiRolesModel = require('./src/models/pachal_chi_roles');
const productGroupsModel = require('./src/models/product_groups');
const productsModel = require('./src/models/products');
const sellerOperatorModel = require('./src/models/seller_operator');
const sellerPhoneNumberModel = require('./src/models/seller_phone_number');
const sellerProductsModel = require('./src/models/seller_products');
const sellerTypeModel = require('./src/models/seller_type');
const sellerWareHouseModel = require('./src/models/seller_ware_house');
const supportModel = require('./src/models/support');
const takhfifProductModel = require('./src/models/takhfif_product');
const transportationModel = require('./src/models/transportation');
const unitModel = require('./src/models/unit');
const applicationModel = require('./src/models/application');


const {colors , databaseStatus} = require('./src/Util/myVars');


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
const cities = citiesModel(sequelize, Sequelize);
const addresses = addressesModel(sequelize, Sequelize);
const car = carModelModel(sequelize, Sequelize);
const chat= chatModel(sequelize, Sequelize);
const customer = customerModel(sequelize, Sequelize);
const orderNazarSanji= orderNazarSanjiModel(sequelize, Sequelize);
const orderPardakht = orderPardakhtModel(sequelize, Sequelize);
const orderProduct = orderProductModel(sequelize, Sequelize);
const pachalChiRoles = pachalChiRolesModel(sequelize, Sequelize);
const productGroups = productGroupsModel(sequelize, Sequelize);
const products= productsModel(sequelize, Sequelize);
const sellerOperator = sellerOperatorModel(sequelize, Sequelize);
const sellerPhoneNumber = sellerPhoneNumberModel(sequelize, Sequelize);
const sellerProducts = sellerProductsModel(sequelize, Sequelize);
const sellerType = sellerTypeModel(sequelize, Sequelize);
const sellerWareHouse = sellerWareHouseModel(sequelize, Sequelize);
const support = supportModel(sequelize, Sequelize);
const takhfifProduct = takhfifProductModel(sequelize, Sequelize);
const transportation = transportationModel(sequelize, Sequelize);
const unit= unitModel(sequelize, Sequelize);
const application = applicationModel(sequelize,Sequelize);


sequelize.sync({ force: databaseStatus })
  .then(() => {
      if (databaseStatus){
          console.log(colors.bg.Green ,`DataBase droped and create again successfully .`,  colors.Reset)
      } else {
          console.log(colors.bg.Yellow ,`DataBase service is up without any Change successfully .`,  colors.Reset)
      }
  });

module.exports = {
    sequelize,application,
    Seller,cities,addresses,car,chat,customer,orderNazarSanji,orderPardakht,orderProduct,pachalChiRoles,productGroups,
    sellerOperator,products,sellerPhoneNumber,sellerProducts,sellerType,sellerWareHouse,support,takhfifProduct,transportation,unit
};
