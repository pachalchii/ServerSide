const Sequelize = require('sequelize');

const citiesModel = require('./models/cities');
const SellerModel = require('./models/seller');
const addressesModel = require('./models/addresses');
const carModelModel = require('./models/car_model');
const chatModel = require('./models/chat');
const customerModel = require('./models/customer');
const orderNazarSanjiModel = require('./models/order_nazar_sanji');
const orderPardakhtModel = require('./models/order_pardakht');
const orderProductModel = require('./models/order_product');
const pachalChiRolesModel = require('./models/pachal_chi_roles');
const productGroupsModel = require('./models/product_groups');
const productsModel = require('./models/products');
const sellerOperatorModel = require('./models/seller_operator');
const sellerPhoneNumberModel = require('./models/seller_phone_number');
const sellerProductsModel = require('./models/seller_products');
const sellerTypeModel = require('./models/seller_type');
const sellerWareHouseModel = require('./models/seller_ware_house');
const supportModel = require('./models/support');
const takhfifProductModel = require('./models/takhfif_product');
const transportationModel = require('./models/transportation');
const unitModel = require('./models/unit');

const {colors} = require('./Util/myVars');


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


sequelize.sync({ force: false })
  .then(() => {
      console.log(colors.bg.Green ,`Configing DataBase done successfully .`,  colors.Reset)
  });

module.exports = {
    sequelize,
    Seller,cities,addresses,car,chat,customer,orderNazarSanji,orderPardakht,orderProduct,pachalChiRoles,productGroups,
    sellerOperator,products,sellerPhoneNumber,sellerProducts,sellerType,sellerWareHouse,support,takhfifProduct,transportation,unit
};
