const Sequelize = require('sequelize');
var cluster = require('cluster');

const citiesModel = require('./src/models/cities');
const SellerModel = require('./src/models/seller');
const addressesModel = require('./src/models/addresses');
const carModelModel = require('./src/models/CarModel');
const customerModel = require('./src/models/customer');
const orderNazarSanjiModel = require('./src/models/OrderNazarSanji');
const orderPardakhtModel = require('./src/models/OrderPardakht');
const orderProductModel = require('./src/models/OrderProduct');
const productsModel = require('./src/models/products');
const sellerOperatorModel = require('./src/models/SellerOperator');
const sellerPhoneNumberModel = require('./src/models/SellerPhoneNumber');
const sellerProductsModel = require('./src/models/SellerProducts');
const sellerTypeModel = require('./src/models/SellerType');
const sellerWareHouseModel = require('./src/models/SellerWareHouse');
const supportModel = require('./src/models/support');
const takhfifProductModel = require('./src/models/TakhfifProduct');
const transportationModel = require('./src/models/transportation');
const unitModel = require('./src/models/unit');
const applicationModel = require('./src/models/application');
const orderModel = require('./src/models/Order');
const pachalChiAdminSupportsModel = require('./src/models/PachalChiAdmins&Supports');

const AlarmsOnSellerProductsModel = require('./src/models/AlarmsOnSellerProducts');
const ChatOnOrderProductModel = require('./src/models/ChatOnOrderProduct');
const NotificationModel = require('./src/models/Notification');
const PriceAndSupplyModel = require('./src/models/PriceAndSupply');
const ProductCategoriesModel = require('./src/models/ProductCategories');
const RolesModel = require('./src/models/Roles');
const SellerProductionManagerModel = require('./src/models/SellerProductionManager');
const SellerProductsInServiceCitiesModel = require('./src/models/SellerProductsInServiceCities');




const {colors,DataBaseInformation} = require('./src/Util/configuration');
const sequelize = new Sequelize(DataBaseInformation.database, DataBaseInformation.user, DataBaseInformation.password, {
    logging: false,
  host: DataBaseInformation.host,
  dialect: DataBaseInformation.dialect,
    port:DataBaseInformation.port,
    define: {
        timestamps: false
    }
});

if (cluster.isMaster) {
    sequelize.authenticate()
        .then(() => {
            console.log(colors.bg.Black, colors.fg.White ,'Connection has been established successfully.',colors.Reset);
        })
        .catch(err => {
            console.error(colors.bg.Black, colors.fg.Red ,'Unable to connect to the database:',colors.Reset);
            process.exit()
        });
}



const Seller = SellerModel(sequelize, Sequelize);
const cities = citiesModel(sequelize, Sequelize);
const addresses = addressesModel(sequelize, Sequelize);
const car = carModelModel(sequelize, Sequelize);
const customer = customerModel(sequelize, Sequelize);
const orderNazarSanji= orderNazarSanjiModel(sequelize, Sequelize);
const orderPardakht = orderPardakhtModel(sequelize, Sequelize);
const orderProduct = orderProductModel(sequelize, Sequelize);
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
const Order = orderModel(sequelize,Sequelize);
const Support = supportModel(sequelize,Sequelize);
const pachalChiAdminSupports = pachalChiAdminSupportsModel(sequelize,Sequelize);
const AlarmsOnSellerProducts = AlarmsOnSellerProductsModel(sequelize,Sequelize);
const ChatOnOrderProduct = ChatOnOrderProductModel(sequelize,Sequelize);
const Notification = NotificationModel(sequelize,Sequelize);
const PriceAndSupply = PriceAndSupplyModel(sequelize,Sequelize);
const SellerProductsInServiceCitie = SellerProductsInServiceCitiesModel(sequelize,Sequelize);
const SellerProductionManager = SellerProductionManagerModel(sequelize,Sequelize);
const ProductCategories = ProductCategoriesModel(sequelize,Sequelize);
const Roles = RolesModel(sequelize,Sequelize);




module.exports = {
    pachalChiAdminSupports,Support,Order,ProductCategories,Roles,SellerProductsInServiceCitie,SellerProductionManager,
    sequelize,application,AlarmsOnSellerProducts,PriceAndSupply,ChatOnOrderProduct,
    Seller,cities,addresses,car,customer,orderNazarSanji,orderPardakht,orderProduct,Notification,
    sellerOperator,products,sellerPhoneNumber,sellerProducts,sellerType,sellerWareHouse,support,takhfifProduct,
    transportation,unit
};
